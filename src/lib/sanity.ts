import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: 'wi8pxzpf',
  dataset: 'production',
  apiVersion: '2026-06-20',
  useCdn: true,
})

// "sub": subcategory is a reference (renamable in Studio); plain "sub" text is the legacy fallback.
// A subcategory can sit inside another one ("Chaves › Chaves Torx"): then "sub" is the parent
// and "sub2" the chosen one, so the site always filters by the 2nd level first, then the 3rd.
export const PRODUCTS_QUERY = `*[_type == "product"] | order(_createdAt asc) {
  "id": _id,
  name,
  brand,
  category,
  "sub": coalesce(subcategory->parent->name, subcategory->name, sub),
  "sub2": select(defined(subcategory->parent) => subcategory->name, null),
  "img": coalesce(image.asset->url, imageUrl),
  desc
}`

// Homepage category card photos, edited in Studio → "Página Inicial".
// Per category: uploaded photo wins, else the chosen product's photo, else null (site fallback).
// Sanity field names use "_" where category ids use "-".
const CATEGORY_IDS = ['ferramentas', 'mecanica', 'chapa-pintura', 'higiene-seguranca', 'eletricidade', 'lavagens']

export const HOME_CATEGORY_PHOTOS_QUERY = `*[_id == "homePage"][0].categoryPhotos{
${CATEGORY_IDS.map(id => {
  const f = id.replace(/-/g, '_')
  return `  "${id}": coalesce(${f}.image.asset->url, ${f}.product->image.asset->url, ${f}.product->imageUrl)`
}).join(',\n')}
}`

// Catálogos page, edited in Studio → "Catálogo". Uploaded PDF wins over the pasted link.
export const CATALOGS_QUERY = `*[_type == "catalog" && defined(coalesce(file.asset, url))] | order(order asc, _createdAt asc) {
  "id": _id,
  name,
  subtitle,
  description,
  "url": coalesce(file.asset->url, url)
}`
