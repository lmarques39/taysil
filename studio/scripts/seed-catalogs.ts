// One-off: create the two existing catalogs as Sanity documents (safe to re-run — never overwrites).
// Run from studio/:  ./node_modules/.bin/sanity exec scripts/seed-catalogs.ts --with-user-token
import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2026-06-20' })

const catalogs = [
  {
    _id: 'catalog-kroftools',
    name: 'KROFTOOLS',
    subtitle: 'Catálogo Geral · 2025',
    description:
      'Ferramentas profissionais para oficinas automóvel. Gama completa de equipamentos e acessórios para mecânica, chapa e pintura, eletricidade e muito mais.',
    url: 'https://kroftools.sharepoint.com/sites/externo/Kroftools/Forms/AllItems.aspx?viewid=6575a712%2D5b03%2D44ec%2Db41a%2D833cdc2de8ba&ga=1&id=%2Fsites%2Fexterno%2FKroftools%2F05%20%2D%20Cat%C3%A1logos%20KROFTOOLS%2FCat%C3%A1logo%20geral%202025%2FPT%20%2D%20ESP%2FK25%20PT%20ES%2Epdf&parent=%2Fsites%2Fexterno%2FKroftools%2F05%20%2D%20Cat%C3%A1logos%20KROFTOOLS%2FCat%C3%A1logo%20geral%202025%2FPT%20%2D%20ESP',
    order: 1,
  },
  {
    _id: 'catalog-jbm',
    name: 'JBM',
    subtitle: 'Catálogo · 2026',
    description:
      'Vasta gama de ferramentas e equipamentos para diagnóstico, mecânica e manutenção automóvel. Edição 2026 com as mais recentes referências.',
    url: 'https://publi.jbmcamp.com/CATALOGO/2026/PT_CAT2026_JBM_LQ.pdf',
    order: 2,
  },
]

const tx = client.transaction()
catalogs.forEach((c) => tx.createIfNotExists({ _type: 'catalog', ...c }))
tx.commit()
  .then(() => console.log(`Catalogs ready: ${catalogs.map((c) => c.name).join(', ')}`))
  .catch((err) => { console.error(err); process.exit(1) })
