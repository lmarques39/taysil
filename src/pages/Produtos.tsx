import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Search, X, ArrowRight, SlidersHorizontal,
} from 'lucide-react'
import type { Brand } from '../data/products'
import { CATEGORIES } from '../data/categories'
import type { CategoryConfig } from '../data/categories'
import { useProductFilter } from '../hooks/useProductFilter'
import type { EnrichedProduct } from '../hooks/useProductFilter'

const BRAND_STYLES: Record<Brand, string> = {
  KROFTOOLS: 'bg-slate-800 text-white',
  JBM:       'bg-slate-700 text-white',
  TAYSIL:    'bg-red-600 text-white',
}

const BrandBadge = ({ brand }: { brand: Brand }) => (
  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wide ${BRAND_STYLES[brand]}`}>
    {brand}
  </span>
)

const ProductCard = ({ product, catConfig, onClick }: {
  product: EnrichedProduct
  catConfig: CategoryConfig | undefined
  onClick: () => void
}) => {
  const { img, name, brand, sub } = product
  const Icon = catConfig?.Icon
  const iconBg = catConfig?.iconBg
  return (
    <button
      onClick={onClick}
      className="bg-white border border-slate-100 rounded-xl overflow-hidden flex flex-row sm:flex-col hover:shadow-md hover:border-slate-200 hover:-translate-y-0.5 transition-all text-left group w-full"
    >
      <div className="w-20 h-20 sm:w-full sm:h-auto sm:aspect-square bg-slate-50 flex items-center justify-center p-2 sm:p-4 shrink-0">
        {img ? (
          <img src={img} alt={name} className="w-full h-full object-contain" loading="lazy" />
        ) : (
          <div className={`w-10 h-10 sm:w-16 sm:h-16 ${iconBg ?? 'bg-slate-200'} rounded-xl sm:rounded-2xl flex items-center justify-center`}>
            {Icon && <Icon size={18} className="text-white opacity-75" />}
          </div>
        )}
      </div>
      <div className="p-3 flex flex-col gap-1.5 flex-1 min-w-0 justify-center sm:justify-start">
        <p className="text-[10px] text-slate-400 leading-tight truncate">{sub}</p>
        <p className="text-sm font-semibold text-slate-800 leading-snug line-clamp-2 sm:flex-1">{name}</p>
        <div className="pt-0.5">
          <BrandBadge brand={brand} />
        </div>
      </div>
    </button>
  )
}

const ProductModal = ({ product, catConfig, onClose }: {
  product: EnrichedProduct
  catConfig: CategoryConfig | undefined
  onClose: () => void
}) => {
  const { img, name, brand, sub, desc, categoryLabel } = product
  const Icon = catConfig?.Icon
  const iconBg = catConfig?.iconBg

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
          aria-label="Fechar"
        >
          <X size={15} className="text-slate-600" />
        </button>

        <div className="flex justify-center mb-5 pt-2">
          {img ? (
            <img src={img} alt={name} className="w-40 h-40 object-contain" />
          ) : (
            <div className={`w-40 h-40 ${iconBg ?? 'bg-slate-200'} rounded-2xl flex items-center justify-center`}>
              {Icon && <Icon size={52} className="text-white opacity-75" />}
            </div>
          )}
        </div>

        <p className="text-[11px] text-slate-400 mb-1 uppercase tracking-wide">{sub}</p>
        <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug pr-4">{name}</h3>

        <div className="flex items-center gap-2 mb-4">
          <BrandBadge brand={brand} />
          <span className="text-xs text-slate-400">{categoryLabel}</span>
        </div>

        {desc && (
          <p className="text-sm text-slate-500 leading-relaxed mb-5">{desc}</p>
        )}

        <div className="border-t border-slate-100 pt-4">
          <Link
            to="/contactos"
            onClick={onClose}
            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors w-full"
          >
            Pedir Informação <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  )
}

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

  const sidebarContent = (
    <div className="space-y-7">
      {hasFilters && (
        <button
          onClick={clearAll}
          className="flex items-center gap-1.5 text-xs text-red-600 font-semibold hover:text-red-700 transition-colors"
        >
          <X size={12} /> Limpar filtros
        </button>
      )}

      {/* Categories */}
      <div>
        <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mb-2.5">Categorias</p>
        <nav className="space-y-0.5">
          <button
            onClick={() => handleSelectCategory(null)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              !activeCategory
                ? 'bg-slate-900 text-white font-medium'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
            }`}
          >
            Todas as categorias
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleSelectCategory(cat.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all text-left ${
                activeCategory === cat.id
                  ? `bg-slate-900 text-white font-medium border-l-2 ${cat.borderAccent} pl-[10px]`
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
              }`}
            >
              <span className={`w-5 h-5 rounded shrink-0 flex items-center justify-center transition-colors ${
                activeCategory === cat.id ? cat.iconBg : 'bg-slate-200'
              }`}>
                <cat.Icon size={11} className={activeCategory === cat.id ? 'text-white' : 'text-slate-500'} />
              </span>
              {cat.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Subcategories — only when a category is selected */}
      {activeCategory && availableSubcategories.length > 0 && (
        <div>
          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mb-2.5">Subcategoria</p>
          <div className="space-y-0.5">
            {availableSubcategories.map(([sub, count]) => (
              <button
                key={sub}
                onClick={() => updateParams({ sub: activeSubcategory === sub ? null : sub })}
                className={`w-full flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg text-xs transition-colors text-left ${
                  activeSubcategory === sub
                    ? 'bg-slate-100 text-slate-900 font-semibold'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                <span className="leading-snug">{sub}</span>
                <span className="text-[10px] text-slate-400 shrink-0">{count}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Brands */}
      <div>
        <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mb-2.5">Marca</p>
        <div className="space-y-2">
          {brandCounts.map(({ brand, count }) => count > 0 && (
            <label key={brand} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={activeBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="w-3.5 h-3.5 rounded accent-slate-800 cursor-pointer"
              />
              <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors flex-1">{brand}</span>
              <span className="text-[11px] text-slate-400">{count}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-500 leading-relaxed">
        Não encontrou o que procura?{' '}
        <Link to="/contactos" className="text-red-600 font-medium hover:underline">
          Contacte-nos
        </Link>
      </div>
    </div>
  )

  return (
    <>
      <title>Produtos | Taysil</title>
      <meta name="description" content="Explore mais de 3000 referências em ferramentas, mecânica, chapa e pintura, higiene, eletricidade e lavagens das marcas KROFTOOLS e JBM." />

      {/* Page header */}
      <section className="pt-32 pb-16 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
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
            {sidebarContent}
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
              {sidebarContent}
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
