import { FileText, ExternalLink } from 'lucide-react'

const catalogs = [
  {
    name: 'KROFTOOLS',
    subtitle: 'Catálogo Geral 2025',
    description: 'Ferramentas profissionais para oficinas automóvel. Gama completa de equipamentos e acessórios.',
    url: 'https://kroftools.sharepoint.com/sites/externo/Kroftools/Forms/AllItems.aspx?viewid=6575a712%2D5b03%2D44ec%2Db41a%2D833cdc2de8ba&ga=1&id=%2Fsites%2Fexterno%2FKroftools%2F05%20%2D%20Cat%C3%A1logos%20KROFTOOLS%2FCat%C3%A1logo%20geral%202025%2FPT%20%2D%20ESP%2FK25%20PT%20ES%2Epdf&parent=%2Fsites%2Fexterno%2FKroftools%2F05%20%2D%20Cat%C3%A1logos%20KROFTOOLS%2FCat%C3%A1logo%20geral%202025%2FPT%20%2D%20ESP',
    color: 'from-slate-700 to-slate-900',
    accent: 'bg-orange-500',
  },
  {
    name: 'JBM',
    subtitle: 'Catálogo 2026',
    description: 'Vasta gama de ferramentas e equipamentos para diagnóstico, mecânica e manutenção automóvel.',
    url: 'https://publi.jbmcamp.com/CATALOGO/2026/PT_CAT2026_JBM_LQ.pdf',
    color: 'from-blue-800 to-blue-950',
    accent: 'bg-blue-500',
  },
]

export default function Catalogos() {
  return (
    <>
      <title>Catálogos | Taysil</title>
      <meta name="description" content="Consulte e descarregue os catálogos PDF das marcas KROFTOOLS e JBM disponíveis na Taysil." />

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
          <p className="text-red-400 text-sm font-semibold uppercase tracking-widest mb-3">Documentação</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Catálogos</h1>
          <p className="text-slate-400 text-lg max-w-xl">
            Consulte os catálogos das nossas marcas parceiras e descubra a gama completa de produtos disponíveis.
          </p>
        </div>
      </section>

      {/* Catalogs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {catalogs.map(({ name, subtitle, description, url, color, accent }) => (
              <div
                key={name}
                className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-slate-100"
              >
                {/* Card header */}
                <div className={`bg-gradient-to-br ${color} p-8 relative overflow-hidden`}>
                  <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/5 rounded-full" />
                  <div className="absolute -right-2 -bottom-2 w-16 h-16 bg-white/5 rounded-full" />
                  <div className={`w-12 h-12 ${accent} rounded-xl flex items-center justify-center mb-4`}>
                    <FileText size={24} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-extrabold text-white tracking-wide">{name}</h2>
                  <p className="text-white/70 text-sm mt-1">{subtitle}</p>
                </div>

                {/* Card body */}
                <div className="p-6">
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">{description}</p>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold px-4 py-3 rounded-lg text-sm transition-colors"
                  >
                    <ExternalLink size={16} /> Ver Catálogo PDF
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-slate-400">
              Os catálogos são disponibilizados em formato PDF e abrem num novo separador.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
