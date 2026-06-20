import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { X, ArrowRight } from 'lucide-react'
import type { EnrichedProduct } from '../../hooks/useProductFilter'
import type { CategoryConfig } from '../../data/categories'
import BrandBadge from '../atoms/BrandBadge'
import NavArrowButton from '../atoms/NavArrowButton'
import ModalDotPagination from '../molecules/ModalDotPagination'

export default function ProductModal({
  product,
  catConfig,
  onClose,
  onPrev,
  onNext,
  canGoPrev = false,
  canGoNext = false,
  currentIndex = 0,
  total = 1,
}: {
  product: EnrichedProduct
  catConfig: CategoryConfig | undefined
  onClose: () => void
  onPrev?: () => void
  onNext?: () => void
  canGoPrev?: boolean
  canGoNext?: boolean
  currentIndex?: number
  total?: number
}) {
  const { img, name, brand, sub, desc, categoryLabel } = product
  const Icon = catConfig?.Icon
  const iconBg = catConfig?.iconBg
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const hasNav = !!(onPrev || onNext)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight' && canGoNext) onNext?.()
      if (e.key === 'ArrowLeft' && canGoPrev) onPrev?.()
    }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose, onNext, onPrev, canGoNext, canGoPrev])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return
    const dx = e.changedTouches[0].clientX - touchStart.current.x
    const dy = e.changedTouches[0].clientY - touchStart.current.y
    touchStart.current = null
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 60) {
      if (dx < 0 && canGoNext) onNext?.()
      if (dx > 0 && canGoPrev) onPrev?.()
    } else if (dy > 80 && Math.abs(dy) > Math.abs(dx)) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      onClick={onClose}
    >
      {hasNav && (
        <>
          <div className="absolute left-4 hidden sm:flex" onClick={e => e.stopPropagation()}>
            <NavArrowButton direction="prev" onClick={() => onPrev?.()} disabled={!canGoPrev} />
          </div>
          <div className="absolute right-4 hidden sm:flex" onClick={e => e.stopPropagation()}>
            <NavArrowButton direction="next" onClick={() => onNext?.()} disabled={!canGoNext} />
          </div>
        </>
      )}

      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 relative"
        onClick={e => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
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

        {hasNav && (
          <div className="mb-4">
            <ModalDotPagination total={total} current={currentIndex} />
          </div>
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
