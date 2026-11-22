// One-off: first 3rd-level subcategories ("tipos") as examples for the client, and links the matching
// products to them. Safe to re-run: types are createIfNotExists, products already on a type are skipped.
// Run from studio/:
//   ./node_modules/.bin/sanity exec scripts/seed-subtypes.ts --with-user-token -- --dry-run   (only lists)
//   ./node_modules/.bin/sanity exec scripts/seed-subtypes.ts --with-user-token
// Patches published docs AND existing drafts directly (like migrate-subcategories.ts).
import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2026-06-20' })
const DRY_RUN = process.argv.includes('--dry-run')

const slug = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

// Parent subcategory → types, each with the rule that picks its products by name.
// Products of the parent that match no rule stay on the parent itself.
const PLAN: { parent: string; types: { name: string; match: RegExp }[] }[] = [
  {
    parent: 'Ferramentas Manuais',
    types: [
      { name: 'Alicates', match: /alicate/i },
      { name: 'Alavancas', match: /alavanca/i },
    ],
  },
  {
    parent: 'Lâmpadas',
    types: [
      { name: 'Faróis', match: /\bH[147]\b/i },
      { name: 'Sinalização e Presença', match: /./ }, // every other bulb (P21W, R5W, W5W, C5W, T10, tubular...)
    ],
  },
  {
    parent: 'Iluminação Profissional',
    types: [
      { name: 'Gambiarras', match: /gambiarra/i },
      { name: 'Barras LED', match: /barra/i },
    ],
  },
]

type Parent = { _id: string; name: string; category: string }
type Product = { _id: string; name: string }

async function run() {
  const tx = client.transaction()
  let links = 0

  for (const { parent: parentName, types } of PLAN) {
    const parent = await client.fetch<Parent | null>(
      `*[_type == "subcategory" && name == $name && !(_id in path("drafts.**"))][0]{_id, name, category}`,
      { name: parentName },
    )
    if (!parent) {
      console.log(`⚠ Não encontrei a subcategoria "${parentName}" — ignorada`)
      continue
    }
    // Products (published + drafts) still pointing at the parent itself
    const products = await client.fetch<Product[]>(
      `*[_type == "product" && subcategory._ref == $id] | order(name asc){_id, name}`,
      { id: parent._id },
      { perspective: 'raw' },
    )
    console.log(`\n${parent.name} (${products.length} produtos)`)
    const taken = new Set<string>()

    for (const type of types) {
      const typeId = `subcategory-${slug(parent.name)}-${slug(type.name)}`
      tx.createIfNotExists({
        _id: typeId,
        _type: 'subcategory',
        name: type.name,
        category: parent.category,
        parent: { _type: 'reference', _ref: parent._id },
      })
      const matched = products.filter((p) => !taken.has(p._id) && type.match.test(p.name))
      matched.forEach((p) => taken.add(p._id))
      console.log(`  › ${type.name} (${matched.length})`)
      matched.forEach((p) => console.log(`      - ${p.name}${p._id.startsWith('drafts.') ? ' (rascunho)' : ''}`))
      matched.forEach((p) =>
        tx.patch(p._id, (patch) => patch.set({ subcategory: { _type: 'reference', _ref: typeId } })),
      )
      links += matched.length
    }
    const rest = products.filter((p) => !taken.has(p._id))
    if (rest.length) console.log(`  (ficam em "${parent.name}": ${rest.map((p) => p.name).join(', ')})`)
  }

  if (DRY_RUN) return console.log(`\nModo de teste: ${links} produtos seriam ligados a tipos. Nada foi alterado.`)
  await tx.commit()
  console.log(`\nFeito: tipos criados e ${links} produtos ligados.`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
