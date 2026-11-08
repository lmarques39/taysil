// One-off migration: free-text product.sub → subcategory documents + product.subcategory references.
// Run from studio/:  ./node_modules/.bin/sanity exec scripts/migrate-subcategories.ts --with-user-token
// The old "sub" text is kept (hidden) so the live site keeps working until the new query ships.
// Patches published docs AND existing drafts directly, so a client's unpublished draft isn't
// published by us, and publishing it later doesn't drop the new reference.
import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2026-06-20' })

const slug = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

type Row = { _id: string; category: string; sub: string }

async function run() {
  const rows = await client.fetch<Row[]>(
    `*[_type == "product" && defined(sub) && sub != ""]{_id, category, sub}`,
    {},
    { perspective: 'raw' },
  )

  const subs = new Map<string, { name: string; category: string }>()
  rows.forEach((r) => subs.set(`subcategory-${slug(r.sub)}`, { name: r.sub.trim(), category: r.category }))

  const tx = client.transaction()
  subs.forEach(({ name, category }, _id) => tx.createIfNotExists({ _id, _type: 'subcategory', name, category }))
  rows.forEach((r) =>
    tx.patch(r._id, (p) =>
      p.set({ subcategory: { _type: 'reference', _ref: `subcategory-${slug(r.sub)}` } }),
    ),
  )
  await tx.commit({ visibility: 'sync' })
  console.log(`Created/kept ${subs.size} subcategories, linked ${rows.length} product docs.`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
