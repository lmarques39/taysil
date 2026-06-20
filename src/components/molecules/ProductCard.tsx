import type { EnrichedProduct } from '../../hooks/useProductFilter'
import type { CategoryConfig } from '../../data/categories'
import BrandBadge from '../atoms/BrandBadge'

export default function ProductCard({ product, catConfig, onClick }: {
  product: EnrichedProduct
  catConfig: CategoryConfig | undefined
  onClick: () => void
}) {
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
