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
