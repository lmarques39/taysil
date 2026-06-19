import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { CATEGORIES } from '../data/categories'

const catImages: Record<string, string | null> = {
  ferramentas:       '/cat-ferramentas.jpg',
  mecanica:          '/cat-mecanica.jpg',
  'chapa-pintura':   '/cat-chapa.jpg',
  'higiene-seguranca': '/cat-higiene.jpg',
  eletricidade:      '/cat-eletricidade.jpg',
  lavagens:          null,
}

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
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
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
              <a
                href="tel:939044050"
                className="inline-flex items-center justify-center gap-2 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-semibold px-7 py-3.5 rounded-lg transition-colors tabular-nums"
              >
                939 044 050
              </a>
            </div>

            <div className="flex gap-12 border-t border-slate-800 pt-8">
              {proofPoints.map(({ value, label }) => (
                <div key={label}>
                  <p className="text-2xl font-black text-white">{value}</p>
                  <p className="text-slate-500 text-xs uppercase tracking-wide mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: gears photo */}
        <div className="lg:w-[45%] h-72 sm:h-96 lg:h-auto relative overflow-hidden">
          <img
            src="/hero-gears.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/25" />
        </div>
      </section>

      {/* Category grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-red-500 text-sm font-semibold uppercase tracking-widest mb-3">O que fornecemos</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              6 categorias, tudo num só lugar.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CATEGORIES.map(cat => {
              const img = catImages[cat.id]
              const Icon = cat.Icon
              return (
                <Link
                  key={cat.id}
                  to={`/produtos?category=${cat.id}`}
                  className="group relative overflow-hidden rounded-2xl aspect-[4/3] flex flex-col justify-end bg-slate-900"
                >
                  {img ? (
                    <img
                      src={img}
                      alt={cat.label}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                      <Icon size={72} className="text-red-500 opacity-30" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                  <div className="relative p-6">
                    <p className="text-white font-bold text-lg leading-tight">{cat.label}</p>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-400 group-hover:text-red-400 transition-colors">
                      Ver produtos <ArrowRight size={13} />
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Proof strip */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {proofPoints.map(({ value, label, detail }) => (
              <div key={label} className="text-center sm:text-left">
                <p className="text-5xl font-black text-red-500 mb-2">{value}</p>
                <p className="text-white font-semibold text-sm uppercase tracking-wide mb-2">{label}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
