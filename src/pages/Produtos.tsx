import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Search, X, ArrowRight, SlidersHorizontal,
} from 'lucide-react'
import type { Brand } from '../data/products'
import { CATEGORIES } from '../data/categories'
import { useProductFilter } from '../hooks/useProductFilter'
import type { EnrichedProduct } from '../hooks/useProductFilter'
import GridOverlay from '../components/atoms/GridOverlay'
import BrandBadge from '../components/atoms/BrandBadge'
import ProductCard from '../components/molecules/ProductCard'
import ProductModal from '../components/organisms/ProductModal'
import ProductSidebar from '../components/organisms/ProductSidebar'

export default function Produtos() {
  const {
    activeCategory,
    activeSubcategory,
    activeBrands,
    searchQuery,
    filteredProducts,
    suggestions,
    availableSubcategories,
    brandCounts,
    hasFilters,
    updateParams,
    clearAll,
    selectCategory,
    toggleBrand,
  } = useProductFilter()

  const [showSuggestions, setShowSuggestions]     = useState(false)
  const [selectedProduct, setSelectedProduct]     = useState<EnrichedProduct | null>(null)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const handleSelectCategory = (id: Parameters<typeof selectCategory>[0]) => {
    selectCategory(id)
    setMobileSidebarOpen(false)
  }

  const sidebarProps = {
    hasFilters,
    clearAll,
    activeCategory,
    onSelectCategory: handleSelectCategory,
    availableSubcategories,
    activeSubcategory,
    updateParams,
    activeBrands,
    brandCounts,
    toggleBrand,
  }

  return (
    <>
      <title>Produtos | Taysil</title>
      <meta name="description" content="Explore mais de 3000 referências em ferramentas, mecânica, chapa e pintura, higiene, eletricidade e lavagens das marcas KROFTOOLS e JBM." />

      {/* Page header */}
      <section className="pt-32 pb-16 bg-slate-900 relative overflow-hidden">
        <GridOverlay />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-red-400 text-sm font-semibold uppercase tracking-widest mb-3">Catálogo</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Produtos</h1>
          <p className="text-slate-400 text-lg max-w-xl">
            Mais de 3000 referências em 6 categorias, das marcas{' '}
            <span className="text-white font-semibold">KROFTOOLS</span> e{' '}
            <span className="text-white font-semibold">JBM</span>, para cobrir todas as necessidades da sua oficina.
          </p>
          <div className="mt-5 flex gap-2">
            {(['KROFTOOLS', 'JBM', 'TAYSIL'] as Brand[]).map(b => <BrandBadge key={b} brand={b} />)}
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-8 items-start">

          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-56 shrink-0 sticky top-24 self-start">
            <ProductSidebar {...sidebarProps} />
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">

            {/* Search bar */}
            <div className="relative mb-5">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={e => updateParams({ q: e.target.value })}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                placeholder="Pesquisar produtos... (ex: chave torx, luvas nitrilo)"
                className="w-full pl-10 pr-9 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => { updateParams({ q: null }); searchInputRef.current?.focus() }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label="Limpar pesquisa"
                >
                  <X size={15} />
                </button>
              )}

              {/* Suggestions dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-lg z-20 overflow-hidden">
                  {suggestions.map((name, i) => (
                    <button
                      key={i}
                      onMouseDown={() => { updateParams({ q: name }); setShowSuggestions(false) }}
                      className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 border-b border-slate-50 last:border-0"
                    >
                      <Search size={12} className="text-slate-300 shrink-0" />
                      <span className="truncate">{name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Active filter chips */}
            {hasFilters && (
              <div className="flex flex-wrap gap-2 mb-4">
                {activeCategory && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 text-white text-xs rounded-full font-medium">
                    {CATEGORIES.find(c => c.id === activeCategory)?.label}
                    <button onClick={() => updateParams({ category: null, sub: null })} className="hover:opacity-70 transition-opacity">
                      <X size={11} />
                    </button>
                  </span>
                )}
                {activeSubcategory && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-full">
                    {activeSubcategory}
                    <button onClick={() => updateParams({ sub: null })} className="hover:opacity-70 transition-opacity">
                      <X size={11} />
                    </button>
                  </span>
                )}
                {activeBrands.map(b => (
                  <span key={b} className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-full">
                    {b}
                    <button onClick={() => toggleBrand(b)} className="hover:opacity-70 transition-opacity">
                      <X size={11} />
                    </button>
                  </span>
                ))}
                {searchQuery.trim() && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-full">
                    &ldquo;{searchQuery}&rdquo;
                    <button onClick={() => updateParams({ q: null })} className="hover:opacity-70 transition-opacity">
                      <X size={11} />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Results count + mobile filter trigger */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-slate-500">
                <span className="font-semibold text-slate-900">{filteredProducts.length}</span>{' '}
                {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
              </p>
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="lg:hidden flex items-center gap-2 px-3 py-2 text-sm border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <SlidersHorizontal size={14} /> Filtros
              </button>
            </div>

            {/* Product grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map(product => {
                  const catConfig = CATEGORIES.find(c => c.id === product.category)
                  return (
                    <ProductCard
                      key={product.id}
                      product={product}
                      catConfig={catConfig}
                      onClick={() => setSelectedProduct(product)}
                    />
                  )
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
                  <Search size={22} className="text-slate-400" />
                </div>
                <p className="text-slate-700 font-semibold mb-1">Nenhum produto encontrado</p>
                <p className="text-slate-400 text-sm mb-5 max-w-xs">
                  Tente outras palavras ou{' '}
                  <button onClick={clearAll} className="text-red-600 hover:underline font-medium">
                    limpe os filtros
                  </button>
                  .
                </p>
              </div>
            )}

            {/* Bottom CTA */}
            <div className="mt-12 bg-slate-900 rounded-2xl p-8 text-center">
              <p className="text-white font-semibold text-lg mb-2">Precisa de uma referência específica?</p>
              <p className="text-slate-400 text-sm mb-5">
                Com mais de 3000 referências disponíveis, contacte-nos e localizamos o produto certo para a sua necessidade.
              </p>
              <Link
                to="/contactos"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg text-sm transition-colors"
              >
                Solicitar informação <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sidebar drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-72 bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              <p className="font-bold text-slate-900">Filtros</p>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
              >
                <X size={16} className="text-slate-600" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <ProductSidebar {...sidebarProps} />
            </div>
          </div>
        </div>
      )}

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          catConfig={CATEGORIES.find(c => c.id === selectedProduct.category)}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  )
}
