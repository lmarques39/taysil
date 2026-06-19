const stats = [
  { value: '+3000', label: 'Referências' },
  { value: '6', label: 'Categorias' },
  { value: 'B2B', label: 'Grossista' },
]

const values = [
  { name: 'Profissionalismo', desc: 'Rigor em cada entrega' },
  { name: 'Confiança', desc: 'Relações sólidas com os nossos clientes' },
  { name: 'Eficiência', desc: 'A rapidez ao serviço do seu negócio' },
  { name: 'Coragem', desc: 'Força para crescer e inovar' },
  { name: 'Resiliência', desc: 'Superamos desafios com determinação' },
  { name: 'Integridade', desc: 'Transparência e honestidade em tudo' },
]

export default function Empresa() {
  return (
    <>
      <title>Empresa | Taysil</title>
      <meta name="description" content="Conheça a Taysil — dedicados ao comércio por grosso de produtos para o setor automóvel com profissionalismo, confiança e eficiência." />

      {/* Header with stats */}
      <section className="pt-32 pb-20 bg-slate-900 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-red-400 text-sm font-semibold uppercase tracking-widest mb-3">A empresa</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Sobre a Taysil</h1>
          <p className="text-slate-400 text-lg max-w-xl mb-10">
            Dedicados ao setor automóvel com profissionalismo, confiança e eficiência desde o primeiro dia.
          </p>
          <div className="flex gap-10 border-t border-slate-700 pt-10">
            {stats.map(({ value, label }) => (
              <div key={label}>
                <p className="text-3xl sm:text-4xl font-black text-red-500 leading-none mb-1">{value}</p>
                <p className="text-slate-400 text-xs uppercase tracking-wide">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission strip */}
      <section className="bg-red-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-white text-2xl sm:text-3xl font-bold italic leading-snug max-w-3xl">
            "Procuramos no amanhã superar a excelência do êxito de hoje."
          </p>
        </div>
      </section>

      {/* Quem Somos + Objetivos */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <div className="border-l-4 border-red-600 pl-6 mb-6">
                <h2 className="text-xl font-extrabold text-slate-900 uppercase tracking-wide">Quem Somos</h2>
              </div>
              <div className="space-y-4">
                <p className="text-slate-600 leading-relaxed">
                  A Taysil é uma empresa que se dedica ao comércio por grosso de químicos, ferramentas e consumíveis para o setor automóvel.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Com uma gama de produtos que pretende ir ao encontro das necessidades dos nossos clientes, tendo mais de 3000 referências ao dispor da mecânica, chapa e pintura, eletricidade e lavagens assim como material de proteção individual de segurança e higiene, tais como calçado e vestuário profissional.
                </p>
              </div>
            </div>
            <div>
              <div className="border-l-4 border-red-600 pl-6 mb-6">
                <h2 className="text-xl font-extrabold text-slate-900 uppercase tracking-wide">Os Nossos Objetivos</h2>
              </div>
              <div className="space-y-4">
                <p className="text-slate-600 leading-relaxed">
                  Servir os nossos clientes com materiais de qualidade a um preço justo com a rapidez necessária para o sucesso e concretização das suas tarefas.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Queremos e aceitamos a responsabilidade da exigência dos nossos clientes no cumprimento e prazos de entrega dos produtos por nós comercializados.
                </p>
                <p className="text-slate-900 font-semibold">
                  O sucesso dos nossos clientes são a nossa prioridade.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values manifesto */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-red-400 text-sm font-semibold uppercase tracking-widest mb-2">Os nossos valores</p>
          <h2 className="text-3xl font-extrabold text-white mb-12">Os pilares que nos guiam</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-10">
            {values.map(({ name, desc }) => (
              <div key={name}>
                <p className="text-2xl font-black text-red-500 mb-1">{name}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
