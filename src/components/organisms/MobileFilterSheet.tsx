import { useEffect, useRef, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { useDialogFocus } from '../../hooks/useDialogFocus'

type Props = {
  onClose: () => void
  /** Footer button: close and bring the product list into view */
  onShowResults: () => void
  /** Products matching the current filters — filters apply live, the button just shows the result */
  resultCount: number
  hasFilters: boolean
  clearAll: () => void
  children: ReactNode
}

/**
 * Mobile filter panel that slides up from the bottom (the usual pattern in online shops).
 * It stays open while picking category › subcategory › type, and the footer button says how many
 * products are left — tapping it closes the panel and shows them.
 */
export default function MobileFilterSheet({ onClose, onShowResults, resultCount, hasFilters, clearAll, children }: Props) {
  const sheetRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  // Focus goes to "Fechar filtros", stays inside the panel, and returns to the "Filtros" button on close
  useDialogFocus(sheetRef, closeRef)

  // Esc closes; the page behind doesn't scroll while the panel is open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const label =
    resultCount === 0 ? 'Nenhum produto com estes filtros'
    : resultCount === 1 ? 'Ver 1 produto'
    : `Ver ${resultCount} produtos`

  return (
    <div ref={sheetRef} className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-labelledby="filter-sheet-title">
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm motion-safe:animate-fade-in"
        onClick={onClose}
      />
      <div className="absolute inset-x-0 bottom-0 max-h-[88dvh] bg-white rounded-t-2xl shadow-2xl flex flex-col motion-safe:animate-sheet-up">
        {/* Handle + header */}
        <div className="shrink-0 pt-2.5 px-5 border-b border-slate-100">
          <div className="mx-auto w-10 h-1 rounded-full bg-slate-200" aria-hidden />
          <div className="flex items-center justify-between py-3">
            <h2 id="filter-sheet-title" className="font-bold text-slate-900 text-lg">Filtros</h2>
            <div className="flex items-center gap-2">
              {hasFilters && (
                <button
                  onClick={clearAll}
                  className="px-3 py-2 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
                >
                  Limpar
                </button>
              )}
              <button
                ref={closeRef}
                onClick={onClose}
                aria-label="Fechar filtros"
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
              >
                <X size={18} aria-hidden className="text-slate-600" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-5">{children}</div>

        {/* Footer: result count, closes the panel */}
        <div className="shrink-0 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] border-t border-slate-100 bg-white">
          <button
            onClick={onShowResults}
            disabled={resultCount === 0}
            className="w-full py-3.5 rounded-xl bg-slate-900 text-white font-semibold text-[15px] hover:bg-slate-800 transition-colors disabled:bg-slate-200 disabled:text-slate-500"
          >
            {label}
          </button>
        </div>
      </div>
    </div>
  )
}
