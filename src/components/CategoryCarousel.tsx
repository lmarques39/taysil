import { Link } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight, HardHat, Zap, Wrench, Droplets, PaintBucket, Package } from 'lucide-react'
import { useCarousel } from '../hooks/useCarousel'

const categories = [
  {
    icon: HardHat,
    label: 'Higiene e Segurança',
    desc: 'Luvas, fatos de proteção e equipamentos de segurança individual para o dia a dia na oficina.',
    img: '/cat-higiene.jpg',
    accent: 'bg-red-600',
  },
  {
    icon: Zap,
    label: 'Eletricidade',
    desc: 'Gambiarras recarregáveis, lanternas de inspeção e ferramentas elétricas para cada trabalho.',
    img: '/cat-eletricidade.jpg',
    accent: 'bg-red-600',
  },
  {
    icon: Wrench,
    label: 'Mecânica',
    desc: 'Consumíveis de mecânica — anilhas, juntas e peças de serviço para todas as marcas.',
    img: '/cat-mecanica.jpg',
    accent: 'bg-red-600',
  },
  {
    icon: Droplets,
    label: 'Lavagens',
    desc: 'Produtos de limpeza e lavagem auto para manter a oficina e os veículos em perfeitas condições.',
    img: null,
    accent: 'bg-red-600',
  },
  {
    icon: PaintBucket,
    label: 'Chapa e Pintura',
    desc: 'Ferramentas e consumíveis para reparação de chapa, preparação de superfícies e pintura.',
    img: '/cat-chapa.jpg',
    accent: 'bg-red-600',
  },
  {
    icon: Package,
    label: 'Ferramentas',
    desc: 'Chaves, soquetes e ferramentas manuais das melhores marcas para uso profissional.',
    img: '/cat-ferramentas.jpg',
    accent: 'bg-red-600',
  },
]

export default function CategoryCarousel() {
  const { current, pause, resume, prev, next, goTo } = useCarousel(categories.length)

  return (
    <div
      className="relative overflow-hidden rounded-2xl shadow-sm border border-slate-100"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      {/* Track */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {categories.map(({ icon: Icon, label, desc, img, accent }) => (
          <div key={label} className="min-w-full flex flex-col sm:flex-row bg-slate-50">
            {/* Text */}
            <div className="flex-1 flex flex-col justify-center px-8 py-10 sm:px-12 sm:py-14 lg:px-16">
              <div className={`inline-flex items-center gap-2 ${accent} text-white text-xs font-semibold px-3 py-1 rounded-full w-fit mb-5`}>
                <Icon size={13} />
                {label}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">{label}</h3>
              <p className="text-slate-500 leading-relaxed mb-8 max-w-sm text-sm sm:text-base">{desc}</p>
              <Link
                to="/produtos"
                className={`inline-flex items-center gap-2 ${accent} hover:opacity-90 text-white font-semibold px-6 py-2.5 rounded-lg transition-opacity w-fit text-sm`}
              >
                Ver produtos <ArrowRight size={15} />
              </Link>
            </div>

            {/* Image */}
            <div className="sm:w-72 lg:w-96 flex items-center justify-center p-8 sm:py-10 bg-white/60">
              {img ? (
                <img
                  src={img}
                  alt={label}
                  className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 object-contain drop-shadow-md"
                />
              ) : (
                <div className={`w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 ${accent} rounded-2xl flex items-center justify-center`}>
                  <Icon size={72} className="text-white opacity-70" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white shadow-md rounded-full flex items-center justify-center transition-colors"
        aria-label="Anterior"
      >
        <ChevronLeft size={18} className="text-slate-600" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white shadow-md rounded-full flex items-center justify-center transition-colors"
        aria-label="Seguinte"
      >
        <ChevronRight size={18} className="text-slate-600" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {categories.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? 'w-5 bg-slate-700' : 'w-1.5 bg-slate-400'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
