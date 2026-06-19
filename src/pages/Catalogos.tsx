import { ExternalLink } from 'lucide-react'

const catalogs = [
  {
    name: 'KROFTOOLS',
    subtitle: 'Catálogo Geral · 2025',
    description:
      'Ferramentas profissionais para oficinas automóvel. Gama completa de equipamentos e acessórios para mecânica, chapa e pintura, eletricidade e muito mais.',
    url: 'https://kroftools.sharepoint.com/sites/externo/Kroftools/Forms/AllItems.aspx?viewid=6575a712%2D5b03%2D44ec%2Db41a%2D833cdc2de8ba&ga=1&id=%2Fsites%2Fexterno%2FKroftools%2F05%20%2D%20Cat%C3%A1logos%20KROFTOOLS%2FCat%C3%A1logo%20geral%202025%2FPT%20%2D%20ESP%2FK25%20PT%20ES%2Epdf&parent=%2Fsites%2Fexterno%2FKroftools%2F05%20%2D%20Cat%C3%A1logos%20KROFTOOLS%2FCat%C3%A1logo%20geral%202025%2FPT%20%2D%20ESP',
  },
  {
    name: 'JBM',
    subtitle: 'Catálogo · 2026',
    description:
      'Vasta gama de ferramentas e equipamentos para diagnóstico, mecânica e manutenção automóvel. Edição 2026 com as mais recentes referências.',
    url: 'https://publi.jbmcamp.com/CATALOGO/2026/PT_CAT2026_JBM_LQ.pdf',
  },
]

export default function Catalogos() {
  return (
    <>
      <title>Catálogos | Taysil</title>
      <meta name="description" content="Consulte e descarregue os catálogos PDF das marcas KROFTOOLS e JBM disponíveis na Taysil." />

      {/* Page header */}
      <section className="pt-32 pb-16 bg-slate-900 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
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

      {/* Catalog list */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="divide-y divide-slate-100">
            {catalogs.map(({ name, subtitle, description, url }) => (
              <div
                key={name}
                className="py-14 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8"
              >
                <div>
                  <div className="border-l-4 border-red-600 pl-6 mb-4">
                    <p className="text-slate-400 text-xs uppercase tracking-widest mb-2">{subtitle}</p>
                    <h2 className="text-3xl sm:text-4xl font-black text-slate-900">{name}</h2>
                  </div>
                  <p className="text-slate-600 leading-relaxed max-w-lg">{description}</p>
                </div>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors text-sm"
                >
                  <ExternalLink size={16} />
                  Ver Catálogo PDF
                </a>
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-400 pt-6">
            Os catálogos são disponibilizados em formato PDF e abrem num novo separador.
          </p>
        </div>
      </section>
    </>
  )
}
