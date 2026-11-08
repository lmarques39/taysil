import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: 'wi8pxzpf',
  dataset: 'production',
  apiVersion: '2026-06-20',
  useCdn: true,
})

export const PRODUCTS_QUERY = `*[_type == "product"] | order(_createdAt asc) {
  "id": _id,
  name,
  brand,
  category,
  sub,
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
