import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import GridOverlay from '../components/atoms/GridOverlay'
import CategoryGrid from '../components/organisms/CategoryGrid'
import ProofStrip from '../components/organisms/ProofStrip'

const proofPoints = [
  { value: '+3000', label: 'Referências', detail: 'Ferramentas, mecânica, higiene e muito mais.' },
  { value: '6',     label: 'Categorias',  detail: 'Uma gama completa para qualquer tipo de oficina.' },
  { value: 'B2B',   label: 'Grossista',   detail: 'Preços profissionais para o seu negócio.' },
]

export default function Home() {
  return (
    <>
      <title>Taysil – Ferramentas e Consumíveis Automóvel | Sintra</title>
      <meta name="description" content="Comércio por grosso de químicos, ferramentas e consumíveis para o setor automóvel em Sintra. Mais de 3000 referências das marcas KROFTOOLS e JBM." />

      {/* Hero — split screen */}
      <section className="min-h-screen flex flex-col lg:flex-row">

        {/* Left: editorial dark panel */}
        <div className="lg:w-[55%] bg-slate-900 flex items-center relative">
          <GridOverlay />
          <div className="relative w-full px-8 pt-28 pb-14 lg:px-16 lg:pt-0 lg:pb-0">
            <div className="flex items-center gap-2 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-red-400 text-xs font-semibold uppercase tracking-widest">Sintra, Portugal</span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-extrabold text-white leading-[1.05] tracking-tight mb-6">
              Tudo o que<br />a sua oficina<br />
              <span className="text-red-500">precisa.</span>
            </h1>

            <p className="text-slate-400 text-lg max-w-sm mb-10 leading-relaxed">
              Mais de 3000 referências em ferramentas, mecânica, higiene e consumíveis para profissionais do setor automóvel.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-14">
              <Link
                to="/produtos"
                className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-7 py-3.5 rounded-lg transition-colors"
              >
                Ver Produtos <ArrowRight size={17} />
              </Link>
              <Link
                to="/contactos"
                className="inline-flex items-center justify-center gap-2 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-semibold px-7 py-3.5 rounded-lg transition-colors"
              >
                Contacte-nos
              </Link>
            </div>

            <div className="flex gap-8 pt-8">
              {proofPoints.map(({ value, label }) => (
                <div key={label} className="flex flex-col items-center w-24">
                  <p className="text-2xl font-black text-white">{value}</p>
                  <p className="text-slate-500 text-xs uppercase tracking-wide mt-1 text-center">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: gears photo */}
        <div className="lg:w-[45%] h-72 sm:h-96 lg:h-auto relative overflow-hidden">
          <img
            src="/hero-gears.webp"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/25" />
        </div>
      </section>

      <CategoryGrid />
      <ProofStrip points={proofPoints} />

      {/* CTA */}
      <section className="py-20 bg-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Pronto para encomendar?
          </h2>
          <p className="text-red-100 text-lg mb-10 max-w-md mx-auto">
            Fale connosco e descubra como a Taysil pode servir a sua oficina.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link
              to="/contactos"
              className="inline-flex items-center gap-2 bg-white text-red-600 hover:bg-red-50 font-bold px-8 py-3.5 rounded-lg transition-colors"
            >
              Contactar <ArrowRight size={17} />
            </Link>
            <a
              href="tel:939044050"
              className="text-white text-xl font-semibold tabular-nums hover:text-red-100 transition-colors"
            >
              939 044 050
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
