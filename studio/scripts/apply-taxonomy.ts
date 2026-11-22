// One-off (2026-11): organises the catalogue into subcategories › types, from the reviewed proposal
// in taxonomia-2026-11.json (product id → subcategory, type). Safe to re-run: reuses existing
// subcategories/types by name, creates only the missing ones, and only patches products whose
// subcategory actually changes.
// Run from studio/:
//   ./node_modules/.bin/sanity exec scripts/apply-taxonomy.ts --with-user-token -- --dry-run   (only reports)
//   ./node_modules/.bin/sanity exec scripts/apply-taxonomy.ts --with-user-token
// Also: renames "Ferramentas Elétricas" → "Ferramentas Elétricas e Pneumáticas" and trims names with
// stray spaces (" Calçado profissional"). Patches published docs AND existing drafts directly.
import { getCliClient } from 'sanity/cli'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const client = getCliClient({ apiVersion: '2026-06-20' })
const DRY_RUN = process.argv.includes('--dry-run')

type Row = { id: string; category: string; sub: string; tipo: string | null; name: string }
type Sub = { _id: string; name: string; category: string; parentId: string | null }
type Mutation = { label: string; run: (tx: ReturnType<typeof client.transaction>) => void }

const RENAMES: Record<string, string> = { 'ferramentas|Ferramentas Elétricas': 'Ferramentas Elétricas e Pneumáticas' }

const slug = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

async function run() {
  const rows: Row[] = JSON.parse(readFileSync(join(process.cwd(), 'scripts', 'taxonomia-2026-11.json'), 'utf8'))
  const subs = await client.fetch<Sub[]>(
    `*[_type == "subcategory" && !(_id in path("drafts.**"))]{_id, name, category, "parentId": parent._ref}`,
  )
  const creates: Mutation[] = []
  const fixes: Mutation[] = []

  // --- Level 2: existing (by category + trimmed name) or new
  const level2 = new Map<string, string>() // "category|name" → id
  for (const s of subs.filter((s) => !s.parentId)) {
    const renamed = RENAMES[`${s.category}|${s.name.trim()}`]
    const wanted = renamed ?? s.name.trim()
    level2.set(`${s.category}|${wanted}`, s._id)
    if (wanted !== s.name) {
      fixes.push({ label: `nome: "${s.name}" → "${wanted}"`, run: (tx) => tx.patch(s._id, (p) => p.set({ name: wanted })) })
    }
  }
  const subId = (category: string, proposedName: string) => {
    // The mapping uses the names from the proposal; follow renames so re-runs find the renamed one
    const name = RENAMES[`${category}|${proposedName}`] ?? proposedName
    const key = `${category}|${name}`
    let id = level2.get(key)
    if (!id) {
      id = `subcategory-${slug(category)}-${slug(name)}`
      level2.set(key, id)
      const doc = { _id: id, _type: 'subcategory', name, category }
      creates.push({ label: `subcategoria: ${category} › ${name}`, run: (tx) => tx.createIfNotExists(doc) })
    }
    return id
  }

  // --- Level 3: existing (by parent + name) or new
  const level3 = new Map<string, string>() // "parentId|name" → id
  for (const s of subs.filter((s) => s.parentId)) level3.set(`${s.parentId}|${s.name.trim()}`, s._id)
  const typeId = (category: string, sub: string, parentId: string, name: string) => {
    const key = `${parentId}|${name}`
    let id = level3.get(key)
    if (!id) {
      id = `subcategory-${slug(category)}-${slug(sub)}-${slug(name)}`
      level3.set(key, id)
      const doc = { _id: id, _type: 'subcategory', name, category, parent: { _type: 'reference', _ref: parentId } }
      creates.push({ label: `tipo: ${category} › ${sub} › ${name}`, run: (tx) => tx.createIfNotExists(doc) })
    }
    return id
  }

  // --- Products: published + drafts, only when the subcategory changes
  const current = await client.fetch<{ _id: string; ref: string | null }[]>(
    `*[_type == "product"]{_id, "ref": subcategory._ref}`,
    {},
    { perspective: 'raw' },
  )
  const refOf = new Map(current.map((p) => [p._id, p.ref]))
  const patches: Mutation[] = []
  const perCategory: Record<string, number> = {}
  let unchanged = 0
  for (const r of rows) {
    const parent = subId(r.category, r.sub)
    const target = r.tipo ? typeId(r.category, r.sub, parent, r.tipo) : parent
    for (const id of [r.id, `drafts.${r.id}`]) {
      if (!refOf.has(id)) continue
      if (refOf.get(id) === target) { unchanged++; continue }
      perCategory[r.category] = (perCategory[r.category] ?? 0) + 1
      patches.push({
        label: `${r.name}${id.startsWith('drafts.') ? ' (rascunho)' : ''}`,
        run: (tx) => tx.patch(id, (p) => p.set({ subcategory: { _type: 'reference', _ref: target } })),
      })
    }
  }

  console.log(`Subcategorias e tipos a criar: ${creates.length}`)
  creates.forEach((m) => console.log(`  + ${m.label}`))
  console.log(`\nCorreções de nome: ${fixes.length}`)
  fixes.forEach((m) => console.log(`  ~ ${m.label}`))
  console.log(`\nProdutos a ligar: ${patches.length} (já certos: ${unchanged})`)
  Object.entries(perCategory).forEach(([c, n]) => console.log(`  ${c}: ${n}`))

  if (DRY_RUN) return console.log('\nModo de teste: nada foi alterado.')

  // Subcategories first (products reference them), in batches
  const batches = [creates, fixes, patches]
  for (const group of batches) {
    for (let i = 0; i < group.length; i += 150) {
      const tx = client.transaction()
      group.slice(i, i + 150).forEach((m) => m.run(tx))
      await tx.commit({ visibility: 'async' })
    }
  }
  console.log(`\nFeito: ${creates.length} criadas, ${fixes.length} nomes corrigidos, ${patches.length} produtos ligados.`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
