import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function NavArrowButton({ direction, onClick, disabled }: {
  direction: 'prev' | 'next'
  onClick: () => void
  disabled?: boolean
}) {
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === 'prev' ? 'Produto anterior' : 'Produto seguinte'}
      className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
    >
      <Icon size={20} />
    </button>
  )
}
