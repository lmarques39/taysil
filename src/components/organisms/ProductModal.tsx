import { useEffect, useRef, useState } from 'react'
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
  const touchStart = useRef<{ x: number; y: number; inDesc: boolean } | null>(null)
  const descRef = useRef<HTMLDivElement>(null)
  const [descHasMore, setDescHasMore] = useState(false)

  const updateDescFade = () => {
    const el = descRef.current
    if (!el) return setDescHasMore(false)
    setDescHasMore(el.scrollHeight - el.scrollTop - el.clientHeight > 4)
  }

  // Reset description scroll when navigating between products
  useEffect(() => {
    descRef.current?.scrollTo({ top: 0 })
    updateDescFade()
  }, [product])

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
    touchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      inDesc: !!descRef.current?.contains(e.target as Node),
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return
    const dx = e.changedTouches[0].clientX - touchStart.current.x
    const dy = e.changedTouches[0].clientY - touchStart.current.y
    const inDesc = touchStart.current.inDesc
    touchStart.current = null
    // Vertical swipes inside the description scroll the text, not close the modal
    if (inDesc && Math.abs(dy) > Math.abs(dx)) return
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
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm lg:max-w-4xl max-h-[90dvh] overflow-y-auto p-6 lg:p-10 relative"
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

        <div className="lg:flex lg:items-center lg:gap-10">
          <div className="flex justify-center mb-5 pt-2 lg:mb-0 lg:pt-0 lg:w-1/2 lg:shrink-0">
            {img ? (
              <img src={img} alt={name} className="w-40 h-40 lg:w-full lg:h-96 object-contain" />
            ) : (
              <div className={`w-40 h-40 lg:w-full lg:h-96 ${iconBg ?? 'bg-slate-200'} rounded-2xl flex items-center justify-center`}>
                {Icon && <Icon size={52} className="text-white opacity-75" />}
              </div>
            )}
          </div>

          <div className="lg:flex-1 lg:min-w-0">
            <p className="text-[11px] text-slate-400 mb-1 uppercase tracking-wide">{sub}</p>
            <h3 className="text-lg lg:text-2xl font-bold text-slate-900 mb-3 leading-snug pr-4">{name}</h3>

            <div className="flex items-center gap-2 mb-4">
              <BrandBadge brand={brand} />
              <span className="text-xs text-slate-400">{categoryLabel}</span>
            </div>

            {desc && (
              <div
                ref={descRef}
                onScroll={updateDescFade}
                className={`max-h-52 lg:max-h-72 overflow-y-auto overscroll-contain pr-2 mb-5 [scrollbar-width:thin] ${
                  descHasMore ? '[mask-image:linear-gradient(to_bottom,black_65%,transparent)]' : ''
                }`}
              >
                <p className="text-sm text-slate-500 leading-relaxed whitespace-pre-line">{desc.trim()}</p>
              </div>
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
      </div>
    </div>
  )
}
