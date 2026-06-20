import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import type { Brand, CategoryId } from '../../data/products'
import { CATEGORIES } from '../../data/categories'

type Props = {
  hasFilters: boolean
  clearAll: () => void
  activeCategory: CategoryId | null
  onSelectCategory: (id: CategoryId | null) => void
  availableSubcategories: [string, number][]
  activeSubcategory: string | null
  updateParams: (updates: Record<string, string | null>) => void
  activeBrands: Brand[]
  brandCounts: { brand: Brand; count: number }[]
  toggleBrand: (brand: Brand) => void
}

export default function ProductSidebar({
  hasFilters,
  clearAll,
  activeCategory,
  onSelectCategory,
  availableSubcategories,
  activeSubcategory,
  updateParams,
  activeBrands,
  brandCounts,
  toggleBrand,
}: Props) {
  return (
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
            onClick={() => onSelectCategory(null)}
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
              onClick={() => onSelectCategory(cat.id)}
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
}
