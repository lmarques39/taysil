import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Truck, Award, Users, Wrench, Zap, Droplets, PaintBucket, HardHat, Package } from 'lucide-react'

const stats = [
  { value: '3000+', label: 'Referências' },
  { value: '6', label: 'Categorias' },
  { value: '100%', label: 'Compromisso' },
]

const features = [
  {
    icon: ShieldCheck,
    title: 'Qualidade Garantida',
    desc: 'Produtos certificados de marcas de referência para o setor automóvel.',
  },
  {
    icon: Truck,
    title: 'Entrega Eficiente',
    desc: 'Cumprimos prazos de entrega com a rapidez que o seu negócio precisa.',
  },
  {
    icon: Award,
    title: 'Preço Justo',
    desc: 'Materiais de qualidade a preços competitivos sem compromisso na exigência.',
  },
  {
    icon: Users,
    title: 'Foco no Cliente',
    desc: 'O sucesso dos nossos clientes é a nossa prioridade máxima.',
  },
]

const categories = [
  { icon: HardHat, label: 'Higiene e Segurança', color: 'bg-green-600', path: '/produtos' },
  { icon: Zap, label: 'Eletricidade', color: 'bg-yellow-500', path: '/produtos' },
  { icon: Wrench, label: 'Mecânica', color: 'bg-blue-600', path: '/produtos' },
  { icon: Droplets, label: 'Lavagens', color: 'bg-cyan-500', path: '/produtos' },
  { icon: PaintBucket, label: 'Chapa e Pintura', color: 'bg-purple-600', path: '/produtos' },
  { icon: Package, label: 'Ferramentas', color: 'bg-orange-500', path: '/produtos' },
]

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-600/8 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16">
          <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/30 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-red-300 text-sm font-medium">Sintra, Portugal</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6">
            O que precisa,
            <br />
            <span className="text-red-500">num só lugar.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-4">
            Na Taysil, garantimos a qualidade e variedade de produtos para o setor automóvel.
          </p>
          <p className="text-base text-slate-400 max-w-xl mx-auto mb-10">
            Dos químicos aos consumíveis, das ferramentas à higiene e proteção individual.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/produtos"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors"
            >
              Ver Produtos <ArrowRight size={18} />
            </Link>
            <Link
              to="/contactos"
              className="inline-flex items-center gap-2 border border-slate-500 hover:border-slate-300 text-slate-300 hover:text-white font-semibold px-8 py-3.5 rounded-lg transition-colors"
            >
              Contactar
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-3 gap-6 max-w-md mx-auto">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">{value}</div>
                <div className="text-xs text-slate-400 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
          <div className="w-0.5 h-8 bg-slate-400 rounded-full animate-bounce" />
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Porque a Taysil?</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Com mais de 3000 referências ao dispor, servimos mecânica, chapa e pintura, eletricidade, lavagens e proteção individual.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group p-6 rounded-xl border border-slate-100 hover:border-red-100 hover:shadow-lg hover:shadow-red-50 transition-all"
              >
                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-100 transition-colors">
                  <Icon size={22} className="text-red-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product categories preview */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">Categorias</h2>
              <p className="text-slate-500">Soluções completas para todos os departamentos da sua oficina.</p>
            </div>
            <Link
              to="/produtos"
              className="hidden sm:inline-flex items-center gap-1 text-red-600 hover:text-red-700 font-medium text-sm transition-colors"
            >
              Ver todos <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(({ icon: Icon, label, color, path }) => (
              <Link
                key={label}
                to={path}
                className="group flex flex-col items-center gap-3 p-5 bg-white rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all text-center"
              >
                <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon size={22} className="text-white" />
                </div>
                <span className="text-xs font-medium text-slate-700 leading-tight">{label}</span>
              </Link>
            ))}
          </div>

          <div className="mt-6 text-center sm:hidden">
            <Link to="/produtos" className="inline-flex items-center gap-1 text-red-600 font-medium text-sm">
              Ver todos os produtos <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Pronto para encomendar?
          </h2>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">
            Entre em contacto connosco e saiba como a Taysil pode ser o seu parceiro de confiança.
          </p>
          <Link
            to="/contactos"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors"
          >
            Falar Connosco <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  )
}
