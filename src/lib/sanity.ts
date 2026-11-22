import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: 'wi8pxzpf',
  dataset: 'production',
  apiVersion: '2026-06-20',
  useCdn: true,
})

// "sub": subcategory is a reference (renamable in Studio); plain "sub" text is the legacy fallback
export const PRODUCTS_QUERY = `*[_type == "product"] | order(_createdAt asc) {
  "id": _id,
  name,
  brand,
  category,
  "sub": coalesce(subcategory->name, sub),
  "img": coalesce(image.asset->url, imageUrl),
  desc,
  // Photo without background made by studio/scripts/remove-backgrounds.ts — only while it matches the current photo
  "cutout": select(defined(cutoutOf) && cutoutOf == coalesce(image.asset._ref, imageUrl) => cutout.asset->url)
}`

// Homepage category card photos, edited in Studio → "Página Inicial".
// Per category: uploaded photo wins, else the chosen product's photo, else null (site fallback).
// "cutout": background-removed copy made by studio/scripts/remove-backgrounds.ts — only used while
// it was made from the current photo, so changing the product/photo in Studio never shows a stale one.
// Sanity field names use "_" where category ids use "-".
const CATEGORY_IDS = ['ferramentas', 'mecanica', 'chapa-pintura', 'higiene-seguranca', 'eletricidade', 'lavagens']

export const HOME_CATEGORY_PHOTOS_QUERY = `*[_id == "homePage"][0].categoryPhotos{
${CATEGORY_IDS.map(id => {
  const f = id.replace(/-/g, '_')
  return `  "${id}": ${f}{
    "url": coalesce(image.asset->url, product->image.asset->url, product->imageUrl),
    "cutout": select(
      defined(cutoutOf) && cutoutOf == coalesce(image.asset._ref, product->image.asset._ref, product->imageUrl)
        => cutout.asset->url
    )
  }`
}).join(',\n')}
}`

export type HomeCategoryPhoto = { url: string | null; cutout: string | null } | null

// Catálogos page, edited in Studio → "Catálogo". Uploaded PDF wins over the pasted link.
export const CATALOGS_QUERY = `*[_type == "catalog" && defined(coalesce(file.asset, url))] | order(order asc, _createdAt asc) {
  "id": _id,
  name,
  subtitle,
  description,
  "url": coalesce(file.asset->url, url)
}`
