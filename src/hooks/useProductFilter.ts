import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import Fuse from 'fuse.js'
import { BRANDS } from '../data/products'
import type { Brand, CategoryId, Product } from '../data/products'
import { CATEGORIES } from '../data/categories'
import { sanityClient, PRODUCTS_QUERY } from '../lib/sanity'

export type EnrichedProduct = Product & { categoryLabel: string }

export function useProductFilter() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    sanityClient.fetch<Product[]>(PRODUCTS_QUERY)
      .then(data => { setProducts(data); setLoading(false) })
      .catch(() => { setLoading(false); setError(true) })
  }, [])

  const activeCategory    = searchParams.get('category') as CategoryId | null
  const activeSubcategory = searchParams.get('sub')
  // 3rd level ("tipo"), only meaningful inside the selected subcategory
  const activeSubtype     = activeSubcategory ? searchParams.get('tipo') : null
  const activeBrands      = (searchParams.get('brands')?.split(',').filter(Boolean) ?? []) as Brand[]
  const searchQuery       = searchParams.get('q') ?? ''

  const updateParams = (updates: Record<string, string | null>) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev)
      Object.entries(updates).forEach(([k, v]) => {
        if (v === null || v === '') next.delete(k)
        else next.set(k, v)
      })
      return next
    }, { replace: true })
  }

  const enriched = useMemo<EnrichedProduct[]>(() =>
    products.map(p => ({
      ...p,
      categoryLabel: CATEGORIES.find(c => c.id === p.category)?.label ?? '',
    }))
  , [products])

  const fuse = useMemo(() => new Fuse<EnrichedProduct>(enriched, {
    keys: [
      { name: 'name',          weight: 3   },
      { name: 'sub',           weight: 2   },
      { name: 'sub2',          weight: 2   },
      { name: 'categoryLabel', weight: 1.5 },
      { name: 'brand',         weight: 1   },
      { name: 'desc',          weight: 0.5 },
    ],
    // Each word is matched on its own, so keep it a bit stricter than a whole-phrase search
    threshold: 0.3,
    ignoreDiacritics: true,
    includeScore: true,
  }), [enriched])

  // Every word typed must match (in any field): "anticongelante amarelo" only returns
  // yellow antifreeze, not every antifreeze. Results are ranked by their combined score.
  const searchAllWords = useMemo(() => (query: string): EnrichedProduct[] => {
    const words = query.trim().split(/\s+/).filter(w => w.length >= 2)
    if (words.length === 0) return []
    let scores: Map<string, { item: EnrichedProduct; score: number }> | null = null
    for (const word of words) {
      const next = new Map<string, { item: EnrichedProduct; score: number }>()
      for (const { item, score = 0 } of fuse.search(word)) {
        if (scores && !scores.has(item.id)) continue
        next.set(item.id, { item, score: (scores?.get(item.id)?.score ?? 0) + score })
      }
      scores = next
      if (scores.size === 0) break
    }
    return [...(scores?.values() ?? [])].sort((a, b) => a.score - b.score).map(r => r.item)
  }, [fuse])

  const filteredProducts = useMemo(() => {
    let pool: EnrichedProduct[] = searchQuery.trim().length >= 2
      ? searchAllWords(searchQuery)
      : enriched
    if (activeCategory)           pool = pool.filter(p => p.category === activeCategory)
    if (activeSubcategory)        pool = pool.filter(p => p.sub === activeSubcategory)
    if (activeSubtype)            pool = pool.filter(p => p.sub2 === activeSubtype)
    if (activeBrands.length > 0)  pool = pool.filter(p => activeBrands.includes(p.brand))
    return pool
  }, [searchQuery, activeCategory, activeSubcategory, activeSubtype, activeBrands, searchAllWords, enriched])

  const suggestions = useMemo(() => {
    if (searchQuery.trim().length < 2) return []
    const seen = new Set<string>()
    return searchAllWords(searchQuery)
      .map(p => p.name)
      .filter(n => !seen.has(n) && seen.add(n))
      .slice(0, 6)
  }, [searchQuery, searchAllWords])

  // Counts follow the selected category AND brands, so picking a distributor shows how many
  // of its products are in each subcategory. Subcategories with none of them disappear,
  // except the one currently selected (so it can still be unselected).
  const brandsKey = activeBrands.join(',')
  const availableSubcategories = useMemo(() => {
    const pool = enriched.filter(p =>
      (!activeCategory || p.category === activeCategory) &&
      (activeBrands.length === 0 || activeBrands.includes(p.brand))
    )
    const counts: Record<string, number> = {}
    // Products without a subcategory yet are simply left out of this list (no "null" entry)
    pool.forEach(p => { if (p.sub) counts[p.sub] = (counts[p.sub] ?? 0) + 1 })
    if (activeSubcategory && !(activeSubcategory in counts)) counts[activeSubcategory] = 0
    return Object.entries(counts).sort((a, b) => a[0].localeCompare(b[0]))
  }, [activeCategory, activeSubcategory, brandsKey, enriched]) // eslint-disable-line react-hooks/exhaustive-deps

  // Subcategories that have types inside them (3rd level), so the filter list can show they expand
  const subcategoriesWithTypes = useMemo(() => new Set(
    enriched
      .filter(p => p.sub && p.sub2 && (!activeCategory || p.category === activeCategory))
      .map(p => p.sub as string)
  ), [activeCategory, enriched])

  // 3rd level: the types inside the selected subcategory, counted the same way.
  // Products of that subcategory without a type still show under the subcategory itself.
  const availableSubtypes = useMemo(() => {
    if (!activeSubcategory) return []
    const counts: Record<string, number> = {}
    enriched.forEach(p => {
      if (
        p.sub2 && p.sub === activeSubcategory &&
        (!activeCategory || p.category === activeCategory) &&
        (activeBrands.length === 0 || activeBrands.includes(p.brand))
      ) counts[p.sub2] = (counts[p.sub2] ?? 0) + 1
    })
    if (activeSubtype && !(activeSubtype in counts)) counts[activeSubtype] = 0
    return Object.entries(counts).sort((a, b) => a[0].localeCompare(b[0]))
  }, [activeCategory, activeSubcategory, activeSubtype, brandsKey, enriched]) // eslint-disable-line react-hooks/exhaustive-deps

  const brandCounts = useMemo(() => {
    const pool = activeCategory
      ? enriched.filter(p => p.category === activeCategory)
      : enriched
    return BRANDS.map(brand => ({
      brand,
      count: pool.filter(p => p.brand === brand).length,
    }))
  }, [activeCategory, enriched])

  const hasFilters = !!(activeCategory || activeSubcategory || activeSubtype || activeBrands.length > 0 || searchQuery.trim())

  const clearAll = () => setSearchParams({}, { replace: true })

  const selectCategory = (id: CategoryId | null) =>
    updateParams({ category: id, sub: null, tipo: null })

  // Picking (or unpicking) a subcategory always resets the type inside it
  const selectSubcategory = (sub: string | null) =>
    updateParams({ sub, tipo: null })

  const selectSubtype = (tipo: string | null) =>
    updateParams({ tipo })

  const toggleBrand = (brand: Brand) => {
    const next = activeBrands.includes(brand)
      ? activeBrands.filter(b => b !== brand)
      : [...activeBrands, brand]
    updateParams({ brands: next.join(',') || null })
  }

  return {
    loading,
    error,
    activeCategory,
    activeSubcategory,
    activeSubtype,
    activeBrands,
    searchQuery,
    enriched,
    filteredProducts,
    suggestions,
    availableSubcategories,
    availableSubtypes,
    subcategoriesWithTypes,
    brandCounts,
    hasFilters,
    updateParams,
    clearAll,
    selectCategory,
    selectSubcategory,
    selectSubtype,
    toggleBrand,
  }
}
