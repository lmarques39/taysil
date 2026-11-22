import { Link } from 'react-router-dom'
import { Check, ChevronRight, X } from 'lucide-react'
import type { Brand, CategoryId } from '../../data/products'
import { CATEGORIES } from '../../data/categories'

type Props = {
  /** "sidebar": compact desktop column. "sheet": mobile filter panel — finger-sized rows, no extras */
  variant?: 'sidebar' | 'sheet'
  hasFilters: boolean
  clearAll: () => void
  activeCategory: CategoryId | null
  onSelectCategory: (id: CategoryId | null) => void
  availableSubcategories: [string, number][]
  activeSubcategory: string | null
  onSelectSubcategory: (sub: string | null) => void
  subcategoriesWithTypes: Set<string>
  availableSubtypes: [string, number][]
  activeSubtype: string | null
  onSelectSubtype: (tipo: string | null) => void
  activeBrands: Brand[]
  brandCounts: { brand: Brand; count: number }[]
  toggleBrand: (brand: Brand) => void
}

// Row sizes per variant (the sheet needs ~44px touch targets)
const SIZES = {
  sidebar: {
    category: 'px-3 py-2 text-sm',
    sub: 'px-3 py-1.5 text-xs',
    type: 'px-2.5 py-1.5 text-[11px]',
    brand: 'py-0.5 text-sm',
    checkbox: 'w-3.5 h-3.5',
    sectionGap: 'space-y-7',
  },
  sheet: {
    category: 'px-3 py-3 text-[15px]',
    sub: 'px-3 py-3 text-sm',
    type: 'px-3 py-2.5 text-sm',
    brand: 'py-2.5 text-[15px]',
    checkbox: 'w-5 h-5',
    sectionGap: 'space-y-6',
  },
}

// Section titles are headings, and each filter list is a named group (screen readers announce "Categorias, grupo")
const sectionTitle = 'text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-2.5'

export default function ProductSidebar({
  variant = 'sidebar',
  hasFilters,
  clearAll,
  activeCategory,
  onSelectCategory,
  availableSubcategories,
  activeSubcategory,
  onSelectSubcategory,
  subcategoriesWithTypes,
  availableSubtypes,
  activeSubtype,
  onSelectSubtype,
  activeBrands,
  brandCounts,
  toggleBrand,
}: Props) {
  const s = SIZES[variant]
  const sheet = variant === 'sheet'
  // In the mobile panel the sections sit under its "Filtros" heading (h2), on the page under the h1
  const Heading = sheet ? 'h3' : 'h2'

  return (
    <div className={s.sectionGap}>
      {/* The sheet has its own "Limpar" in the header */}
      {hasFilters && !sheet && (
        <button
          onClick={clearAll}
          className="flex items-center gap-1.5 py-1 text-xs text-red-600 font-semibold hover:text-red-700 transition-colors"
        >
          <X size={12} aria-hidden /> Limpar filtros
        </button>
      )}

      {/* Categories */}
      <div>
        <Heading id={`${variant}-titulo-categorias`} className={sectionTitle}>Categorias</Heading>
        <div role="group" aria-labelledby={`${variant}-titulo-categorias`} className="space-y-0.5">
          <button
            onClick={() => onSelectCategory(null)}
            aria-pressed={!activeCategory}
            className={`w-full text-left rounded-lg transition-colors ${s.category} ${
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
              onClick={() => onSelectCategory(cat.id)}
              aria-pressed={activeCategory === cat.id}
              className={`w-full flex items-center gap-2.5 rounded-lg transition-all text-left ${s.category} ${
                activeCategory === cat.id
                  ? `bg-slate-900 text-white font-medium border-l-2 ${cat.borderAccent} pl-[10px]`
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
              }`}
            >
              <span aria-hidden className={`w-5 h-5 rounded shrink-0 flex items-center justify-center transition-colors ${
                activeCategory === cat.id ? cat.iconBg : 'bg-slate-200'
              }`}>
                <cat.Icon size={11} className={activeCategory === cat.id ? 'text-white' : 'text-slate-500'} />
              </span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Subcategories — only when a category is selected */}
      {activeCategory && availableSubcategories.length > 0 && (
        <div>
          <Heading id={`${variant}-titulo-subcategoria`} className={sectionTitle}>Subcategoria</Heading>
          <div role="group" aria-labelledby={`${variant}-titulo-subcategoria`} className="space-y-0.5">
            {availableSubcategories.map(([sub, count]) => {
              const selected = activeSubcategory === sub
              const hasTypes = subcategoriesWithTypes.has(sub)
              const open = selected && availableSubtypes.length > 0
              return (
                <div key={sub}>
                  <button
                    onClick={() => onSelectSubcategory(selected ? null : sub)}
                    aria-expanded={hasTypes ? open : undefined}
                    aria-pressed={selected}
                    className={`w-full flex items-center justify-between gap-2 rounded-lg transition-colors text-left ${s.sub} ${
                      selected
                        ? 'bg-slate-100 text-slate-900 font-semibold'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <span className="flex items-center gap-1.5 min-w-0">
                      {/* Arrow = this subcategory has types inside it */}
                      {hasTypes && (
                        <ChevronRight
                          size={sheet ? 16 : 12}
                          aria-hidden
                          className={`shrink-0 text-slate-500 transition-transform ${open ? 'rotate-90' : ''}`}
                        />
                      )}
                      <span className="leading-snug">{sub}</span>
                    </span>
                    <span className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] text-slate-600">{count}</span>
                      {sheet && selected && !open && <Check size={16} aria-hidden className="text-slate-900" />}
                    </span>
                  </button>

                  {/* 3rd level: types inside the selected subcategory */}
                  {open && (
                    <div className={`mt-0.5 mb-1 border-l border-slate-200 space-y-0.5 ${sheet ? 'ml-4 pl-2' : 'ml-3 pl-2'}`}>
                      {availableSubtypes.map(([tipo, tipoCount]) => {
                        const typeSelected = activeSubtype === tipo
                        return (
                          <button
                            key={tipo}
                            onClick={() => onSelectSubtype(typeSelected ? null : tipo)}
                            aria-pressed={typeSelected}
                            className={`w-full flex items-center justify-between gap-2 rounded-md transition-colors text-left ${s.type} ${
                              typeSelected
                                ? 'bg-slate-100 text-slate-900 font-semibold'
                                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                            }`}
                          >
                            <span className="leading-snug">{tipo}</span>
                            <span className="flex items-center gap-2 shrink-0">
                              <span className="text-[10px] text-slate-600">{tipoCount}</span>
                              {sheet && typeSelected && <Check size={16} aria-hidden className="text-slate-900" />}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Brands */}
      <div>
        <Heading id={`${variant}-titulo-marca`} className={sectionTitle}>Marca</Heading>
        <div role="group" aria-labelledby={`${variant}-titulo-marca`} className={sheet ? '' : 'space-y-1.5'}>
          {brandCounts.map(({ brand, count }) => count > 0 && (
            <label key={brand} className={`flex items-center gap-2.5 cursor-pointer group ${sheet ? 'px-3' : ''} ${s.brand}`}>
              <input
                type="checkbox"
                checked={activeBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className={`rounded accent-slate-800 cursor-pointer ${s.checkbox}`}
              />
              <span className="text-slate-600 group-hover:text-slate-900 transition-colors flex-1">{brand}</span>
              <span className="text-[11px] text-slate-600">{count}</span>
            </label>
          ))}
        </div>
      </div>

      {!sheet && (
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-500 leading-relaxed">
          Não encontrou o que procura?{' '}
          <Link to="/contactos" className="text-red-600 font-medium hover:underline">
            Contacte-nos
          </Link>
        </div>
      )}
    </div>
  )
}
