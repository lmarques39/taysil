import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { CATEGORIES } from '../../data/categories'

const catImages: Record<string, string | null> = {
  ferramentas:         '/cat-ferramentas.jpg',
  mecanica:            '/cat-mecanica-taysil.jpg',
  'chapa-pintura':     '/cat-chapa-taysil.jpg',
  'higiene-seguranca': '/cat-higiene-taysil.jpg',
  eletricidade:        '/cat-eletricidade.jpg',
  lavagens:            '/cat-lavagens-taysil.jpg',
}

// Taysil product photos are portrait — shown whole instead of cropped to 4:3
const portraitImages = new Set([
  '/cat-mecanica-taysil.jpg',
  '/cat-chapa-taysil.jpg',
  '/cat-higiene-taysil.jpg',
  '/cat-lavagens-taysil.jpg',
])

export default function CategoryGrid() {
  return (
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
                {img && portraitImages.has(img) ? (
                  <>
                    {/* Portrait product photo: shown whole on a neutral backdrop, edges faded */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#e4e4e6] to-[#cfcfd2]" />
                    <div className="absolute inset-0 flex items-center justify-center pb-14">
                      <img
                        src={img}
                        alt={cat.label}
                        loading="lazy"
                        className="h-[88%] w-auto max-w-[90%] object-contain group-hover:scale-105 transition-transform duration-500 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]"
                      />
                    </div>
                  </>
                ) : img ? (
                  <img
                    src={img}
                    alt={cat.label}
                    loading="lazy"
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
  )
}
