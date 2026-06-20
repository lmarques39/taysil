import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { X, ArrowRight } from 'lucide-react'
import type { EnrichedProduct } from '../../hooks/useProductFilter'
import type { CategoryConfig } from '../../data/categories'
import BrandBadge from '../atoms/BrandBadge'

export default function ProductModal({ product, catConfig, onClose }: {
  product: EnrichedProduct
  catConfig: CategoryConfig | undefined
  onClose: () => void
}) {
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
