import DotIndicator from '../atoms/DotIndicator'

export default function ModalDotPagination({ total, current }: {
  total: number
  current: number
}) {
  if (total <= 1) return null

  if (total <= 8) {
    return (
      <div className="flex items-center justify-center gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <DotIndicator key={i} active={i === current} />
        ))}
      </div>
    )
  }

  return (
    <p className="text-center text-xs text-slate-400">
      {current + 1} <span className="text-slate-300">/</span> {total}
    </p>
  )
}
