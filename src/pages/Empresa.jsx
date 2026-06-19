import { Target, Heart, Users } from 'lucide-react'

const sections = [
  {
    icon: Users,
    title: 'Quem Somos',
    color: 'bg-blue-600',
    content: [
      'A Taysil é uma empresa que se dedica ao comércio por grosso de químicos, ferramentas e consumíveis para o setor automóvel.',
      'Com uma gama de produtos que pretende ir ao encontro das necessidades dos nossos clientes, tendo mais de 3000 referências ao dispor da mecânica, chapa e pintura, eletricidade e lavagens assim como material de proteção individual de segurança e higiene, tais como calçado e vestuário profissional.',
    ],
  },
  {
    icon: Target,
    title: 'Os Nossos Objetivos',
    color: 'bg-red-600',
    content: [
      'Servir os nossos clientes com materiais de qualidade a um preço justo com a rapidez necessária para o sucesso e concretização das suas tarefas.',
      'Queremos e aceitamos a responsabilidade da exigência dos nossos clientes no cumprimento e prazos de entrega dos produtos por nós comercializados.',
      'O sucesso dos nossos clientes são a nossa prioridade.',
    ],
  },
  {
    icon: Heart,
    title: 'Os Nossos Valores',
    color: 'bg-purple-600',
    content: [
      'A coragem, a resiliência e a integridade são valores que regem a Taysil.',
      'Procuramos no amanhã superar a excelência do êxito de hoje.',
    ],
  },
]

const values = ['Profissionalismo', 'Confiança', 'Eficiência', 'Coragem', 'Resiliência', 'Integridade']

export default function Empresa() {
  return (
    <>
      {/* Page header */}
      <section className="pt-32 pb-16 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-red-400 text-sm font-semibold uppercase tracking-widest mb-3">A empresa</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Sobre a Taysil</h1>
          <p className="text-slate-400 text-lg max-w-xl">
            Dedicados ao setor automóvel com profissionalismo, confiança e eficiência desde o primeiro dia.
          </p>
        </div>
      </section>

      {/* Sections */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {sections.map(({ icon: Icon, title, color, content }) => (
              <div key={title} className="rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className={`${color} p-6`}>
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-3">
                    <Icon size={20} className="text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-white">{title}</h2>
                </div>
                <div className="p-6 space-y-3">
                  {content.map((para, i) => (
                    <p key={i} className="text-slate-600 text-sm leading-relaxed">{para}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values pills */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Os pilares que nos guiam</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {values.map((v) => (
              <span
                key={v}
                className="px-5 py-2 rounded-full bg-slate-900 text-white text-sm font-medium tracking-wide"
              >
                {v}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
