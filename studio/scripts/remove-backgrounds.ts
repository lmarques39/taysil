// Removes the background of the product photos and of the homepage category photos, so the site
// shows the products cut out on a clean card ("Foto sem fundo (automática)" in Studio).
// For each photo:
//   - already has a transparent background → the site uses it as is, nothing to do
//   - already cut out from this same photo  → skipped
//   - otherwise → background removed on this Mac (Apple Vision, see removebg.swift) and the PNG uploaded
// The site only uses a cut-out while it matches the current photo, so re-run this after the client
// adds or changes photos (until then the site shows the original photo).
//
// Run from studio/ (macOS, needs Xcode Command Line Tools for `swiftc`):
//   ./node_modules/.bin/sanity exec scripts/remove-backgrounds.ts --with-user-token -- --dry-run
//       only makes the cut-outs in scripts/.bin/cutouts/ and a review page (revisao.html) — nothing changes in Sanity
//   ./node_modules/.bin/sanity exec scripts/remove-backgrounds.ts --with-user-token
//       uploads the cut-outs and links them in Sanity
//   add --force to redo every cut-out, --skip=<id>,<id> to leave photos out (ids shown on the review page)
//   --only=<id>,<id> processes just those products; --holes also clears background seen through the
//   product (inside handles, loops, chains) — plain-background photos only, use it on products that need it:
//   ... -- --only=<id>,<id> --holes --force
// Patches published documents AND existing drafts directly (like migrate-subcategories.ts),
// so the client's unpublished changes aren't published by us.
import { getCliClient } from 'sanity/cli'
import { spawnSync, execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { CATEGORIES } from '../schemaTypes/categories'
import { categoryFieldName } from '../schemaTypes/documents/homePage'

const client = getCliClient({ apiVersion: '2026-06-20' })
const DRY_RUN = process.argv.includes('--dry-run')
const FORCE = process.argv.includes('--force')
const HOLES = process.argv.includes('--holes')
const ONLY = new Set(
  (process.argv.find((a) => a.startsWith('--only='))?.slice('--only='.length) ?? '').split(',').filter(Boolean),
)
const SKIP = new Set(
  (process.argv.find((a) => a.startsWith('--skip='))?.slice('--skip='.length) ?? '').split(',').filter(Boolean),
)

const SCRIPTS = join(process.cwd(), 'scripts')
const SWIFT = join(SCRIPTS, 'removebg.swift')
const BIN_DIR = join(SCRIPTS, '.bin')
const TOOL = join(BIN_DIR, 'removebg')
const OUT_DIR = join(BIN_DIR, 'cutouts')

// A photo slot that can get a cut-out: a product's image, or a homepage category photo
type Slot = {
  docId: string          // document to patch (published or draft)
  path: string           // where cutout/cutoutOf live ("" = top level of the document)
  label: string          // shown in the log and on the review page
  source: string | null  // asset id or pasted URL of the current photo
  url: string | null
  cutoutOf: string | null
  hasCutout: boolean
}
type Result =
  | { kind: 'transparent' }
  | { kind: 'cutout'; key: string; assetId?: string }
  | { kind: 'failed'; reason: string }

const homeFields = CATEGORIES.map((c) => ({ field: categoryFieldName(c.value), title: c.title }))

const QUERY = `{
  "products": *[_type == "product" && defined(coalesce(image.asset, imageUrl))] | order(name asc) {
    _id, name,
    "source": coalesce(image.asset._ref, imageUrl),
    "url": coalesce(image.asset->url, imageUrl),
    cutoutOf,
    "hasCutout": defined(cutout.asset)
  },
  "home": *[_id in ["homePage", "drafts.homePage"]]{
    _id,
    "photos": categoryPhotos{
${homeFields
  .map(
    ({ field }) => `      "${field}": ${field}{
        "source": coalesce(image.asset._ref, product->image.asset._ref, product->imageUrl),
        "url": coalesce(image.asset->url, product->image.asset->url, product->imageUrl),
        cutoutOf,
        "hasCutout": defined(cutout.asset)
      }`,
  )
  .join(',\n')}
    }
  }
}`

type Photo = Pick<Slot, 'source' | 'url' | 'cutoutOf' | 'hasCutout'>
type QueryResult = {
  products: (Photo & { _id: string; name: string })[]
  home: { _id: string; photos: Record<string, Photo | null> | null }[]
}

const isDraft = (id: string) => id.startsWith('drafts.')
const baseId = (id: string) => id.replace(/^drafts\./, '')
const fileKey = (source: string) => source.replace(/[^a-zA-Z0-9-]+/g, '_').slice(-80)

function buildTool() {
  if (!existsSync(SWIFT)) throw new Error(`Não encontrei ${SWIFT} — corra o script a partir da pasta studio/.`)
  if (existsSync(TOOL) && statSync(TOOL).mtimeMs >= statSync(SWIFT).mtimeMs) return
  console.log('A compilar a ferramenta de recorte (só na primeira vez)...')
  mkdirSync(BIN_DIR, { recursive: true })
  execFileSync('swiftc', ['-O', SWIFT, '-o', TOOL], { stdio: 'inherit' })
}

// One result per source photo, so drafts, published docs and the homepage share the same cut-out/upload
const cache = new Map<string, Promise<Result>>()

async function cut(source: string, url: string): Promise<Result> {
  const key = fileKey(source)
  const input = join(OUT_DIR, `${key}.original`)
  const output = join(OUT_DIR, `${key}.png`)
  const res = await fetch(url)
  if (!res.ok) return { kind: 'failed', reason: `download falhou (${res.status})` }
  writeFileSync(input, Buffer.from(await res.arrayBuffer()))

  const tool = spawnSync(TOOL, [...(HOLES ? ['--holes'] : []), input, output], { encoding: 'utf8' })
  rmSync(input, { force: true })
  if (tool.status === 3) return { kind: 'transparent' }
  if (tool.status === 2) return { kind: 'failed', reason: 'não encontrei o produto na foto' }
  if (tool.status !== 0) return { kind: 'failed', reason: (tool.stderr || tool.error?.message || 'erro').trim() }
  if (DRY_RUN) return { kind: 'cutout', key }

  const asset = await client.assets.upload('image', readFileSync(output), { filename: `${key}-sem-fundo.png` })
  return { kind: 'cutout', key, assetId: asset._id }
}

function slotsFrom(data: QueryResult): Slot[] {
  const products = data.products.map((p) => ({
    docId: p._id,
    path: '',
    label: `${p.name}${isDraft(p._id) ? ' (rascunho)' : ''}`,
    ...p,
  }))
  const home = data.home.flatMap((doc) =>
    homeFields.map(({ field, title }) => ({
      docId: doc._id,
      path: `categoryPhotos.${field}.`,
      label: `Página Inicial › ${title}${isDraft(doc._id) ? ' (rascunho)' : ''}`,
      source: null,
      url: null,
      cutoutOf: null,
      hasCutout: false,
      ...(doc.photos?.[field] ?? {}),
    })),
  )
  return [...home, ...products]
}

function reviewPage(rows: { label: string; id: string; key: string }[]) {
  const cards = rows
    .map(
      (r) => `<figure><div><img src="${r.key}.png" loading="lazy"></div><figcaption>${r.label
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')}<small>${r.id}</small></figcaption></figure>`,
    )
    .join('\n')
  return `<!doctype html><meta charset="utf-8"><title>Revisão dos recortes</title>
<style>
  body{font:14px system-ui;margin:24px;background:#fff;color:#0f172a}
  p{color:#475569;max-width:70ch}
  main{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px}
  figure{margin:0}
  figure div{aspect-ratio:1;background:#f8fafc;border-radius:12px;display:flex;align-items:center;justify-content:center;padding:20px}
  img{max-width:100%;max-height:100%;filter:drop-shadow(0 10px 12px rgba(15,23,42,.22))}
  figcaption{margin-top:6px;font-weight:600}
  small{display:block;font-weight:400;color:#94a3b8;font-size:11px;word-break:break-all}
</style>
<h1>Revisão dos recortes (${rows.length})</h1>
<p>Se algum recorte estiver mal, corra o script real com <code>--skip=</code> e o id por baixo dessa foto
(vários separados por vírgulas): essa foto fica como está no site.</p>
<main>${cards}</main>`
}

async function main() {
  buildTool()
  mkdirSync(OUT_DIR, { recursive: true })

  const slots = slotsFrom(await client.fetch<QueryResult>(QUERY, {}, { perspective: 'raw' }))
  if (DRY_RUN) console.log(`Modo de teste: nada é alterado no Sanity.\n`)

  const tx = client.transaction()
  const review = new Map<string, { label: string; id: string; key: string }>()
  const counts = { cut: 0, done: 0, transparent: 0, failed: 0, skipped: 0 }
  let changes = 0

  for (const slot of slots) {
    if (!slot.source || !slot.url) continue // homepage category without a chosen photo
    const id = baseId(slot.docId)
    if (ONLY.size && !ONLY.has(id)) continue
    if (SKIP.has(id) || SKIP.has(slot.source)) {
      counts.skipped++
      console.log(`  ${slot.label}: deixada de fora (--skip)`)
      if (slot.hasCutout || slot.cutoutOf) {
        tx.patch(slot.docId, (p) => p.unset([`${slot.path}cutout`, `${slot.path}cutoutOf`]))
        changes++
      }
      continue
    }
    if (!FORCE && slot.hasCutout && slot.cutoutOf === slot.source) {
      counts.done++
      continue
    }

    if (!cache.has(slot.source)) cache.set(slot.source, cut(slot.source, slot.url))
    const result = await cache.get(slot.source)!

    if (result.kind === 'failed') {
      counts.failed++
      console.log(`  ${slot.label}: ⚠ ${result.reason} — o site mostra a foto original`)
    } else if (result.kind === 'transparent') {
      counts.transparent++
      if (slot.hasCutout || slot.cutoutOf) {
        tx.patch(slot.docId, (p) => p.unset([`${slot.path}cutout`, `${slot.path}cutoutOf`]))
        changes++
      }
    } else {
      counts.cut++
      review.set(slot.source, { label: slot.label, id, key: result.key })
      if (!DRY_RUN) {
        tx.patch(slot.docId, (p) =>
          p.set({
            [`${slot.path}cutout`]: { _type: 'image', asset: { _type: 'reference', _ref: result.assetId } },
            [`${slot.path}cutoutOf`]: slot.source,
          }),
        )
        changes++
      }
    }
  }

  console.log(
    `\nRecortadas: ${counts.cut} · já recortadas: ${counts.done} · já transparentes (usadas tal como estão): ${counts.transparent}` +
      ` · falharam: ${counts.failed} · deixadas de fora: ${counts.skipped}`,
  )

  if (DRY_RUN) {
    const page = join(OUT_DIR, 'revisao.html')
    writeFileSync(page, reviewPage([...review.values()]))
    console.log(`\nReveja os recortes em: ${page}\nNada foi alterado no Sanity (modo de teste).`)
    return
  }
  if (changes === 0) return console.log('Nada a alterar no Sanity.')
  await tx.commit()
  console.log(`Feito: ${changes} documento(s) atualizado(s) no Sanity.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
