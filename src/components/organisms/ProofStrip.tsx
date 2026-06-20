import GridOverlay from '../atoms/GridOverlay'

type ProofPoint = { value: string; label: string; detail: string }

export default function ProofStrip({ points }: { points: ProofPoint[] }) {
  return (
    <section className="py-16 bg-slate-900 relative overflow-hidden">
      <GridOverlay />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {points.map(({ value, label, detail }) => (
            <div key={label} className="flex flex-col items-center text-center">
              <p className="text-5xl font-black text-red-500 mb-2">{value}</p>
              <p className="text-white font-semibold text-sm uppercase tracking-wide mb-2">{label}</p>
              <p className="text-slate-400 text-sm leading-relaxed">{detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
