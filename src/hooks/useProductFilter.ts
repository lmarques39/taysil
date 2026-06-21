import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import Fuse from 'fuse.js'
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
      { name: 'categoryLabel', weight: 1.5 },
      { name: 'brand',         weight: 1   },
      { name: 'desc',          weight: 0.5 },
    ],
    threshold: 0.4,
    includeScore: true,
  }), [enriched])

  const filteredProducts = useMemo(() => {
    let pool: EnrichedProduct[] = searchQuery.trim().length >= 2
      ? fuse.search(searchQuery).map(r => r.item)
      : enriched
    if (activeCategory)           pool = pool.filter(p => p.category === activeCategory)
    if (activeSubcategory)        pool = pool.filter(p => p.sub === activeSubcategory)
    if (activeBrands.length > 0)  pool = pool.filter(p => activeBrands.includes(p.brand))
    return pool
  }, [searchQuery, activeCategory, activeSubcategory, activeBrands, fuse, enriched])

  const suggestions = useMemo(() => {
    if (searchQuery.trim().length < 2) return []
    const seen = new Set<string>()
    return fuse.search(searchQuery, { limit: 12 })
      .map(r => r.item.name)
      .filter(n => !seen.has(n) && seen.add(n))
      .slice(0, 6)
  }, [searchQuery, fuse])

  const availableSubcategories = useMemo(() => {
    const pool = activeCategory
      ? enriched.filter(p => p.category === activeCategory)
      : enriched
    const counts: Record<string, number> = {}
    pool.forEach(p => { counts[p.sub] = (counts[p.sub] ?? 0) + 1 })
    return Object.entries(counts).sort((a, b) => a[0].localeCompare(b[0]))
  }, [activeCategory, enriched])

  const brandCounts = useMemo(() => {
    const pool = activeCategory
      ? enriched.filter(p => p.category === activeCategory)
      : enriched
    return (['KROFTOOLS', 'JBM', 'TAYSIL'] as Brand[]).map(brand => ({
      brand,
      count: pool.filter(p => p.brand === brand).length,
    }))
  }, [activeCategory, enriched])

  const hasFilters = !!(activeCategory || activeSubcategory || activeBrands.length > 0 || searchQuery.trim())

  const clearAll = () => setSearchParams({}, { replace: true })

  const selectCategory = (id: CategoryId | null) =>
    updateParams({ category: id, sub: null })

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
    activeBrands,
    searchQuery,
    enriched,
    filteredProducts,
    suggestions,
    availableSubcategories,
    brandCounts,
    hasFilters,
    updateParams,
    clearAll,
    selectCategory,
    toggleBrand,
  }
}
