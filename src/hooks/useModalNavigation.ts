import { useState, useCallback } from 'react'
import type { EnrichedProduct } from './useProductFilter'

export function useModalNavigation(products: EnrichedProduct[]) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const selectedIndex = selectedId ? products.findIndex(p => p.id === selectedId) : -1
  const selectedProduct = selectedIndex >= 0 ? products[selectedIndex] : null

  const open = useCallback((product: EnrichedProduct) => {
    setSelectedId(product.id)
  }, [])

  const close = useCallback(() => setSelectedId(null), [])

  const goNext = useCallback(() => {
    setSelectedId(prev => {
      if (prev === null) return prev
      const idx = products.findIndex(p => p.id === prev)
      return idx >= 0 && idx < products.length - 1 ? products[idx + 1].id : prev
    })
  }, [products])

  const goPrev = useCallback(() => {
    setSelectedId(prev => {
      if (prev === null) return prev
      const idx = products.findIndex(p => p.id === prev)
      return idx > 0 ? products[idx - 1].id : prev
    })
  }, [products])

  const canGoNext = selectedIndex >= 0 && selectedIndex < products.length - 1
  const canGoPrev = selectedIndex > 0

  return {
    selectedProduct,
    selectedIndex: Math.max(0, selectedIndex),
    open,
    close,
    goNext,
    goPrev,
    canGoNext,
    canGoPrev,
    total: products.length,
  }
}
