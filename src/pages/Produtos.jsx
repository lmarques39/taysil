import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { HardHat, Zap, Settings, Droplets, PaintBucket, Wrench, ChevronRight, ChevronDown, X, Search, ArrowRight } from 'lucide-react'

const BRAND_KROFTOOLS = 'KROFTOOLS'
const BRAND_JBM = 'JBM'
const BRAND_TAYSIL = 'TAYSIL'

const categories = [
  {
    id: 'ferramentas',
    icon: Wrench,
    label: 'Ferramentas',
    accent: 'border-orange-500',
    iconBg: 'bg-orange-500',
    textAccent: 'text-orange-600',
    brands: [BRAND_KROFTOOLS, BRAND_JBM],
    image: '/cat-ferramentas.jpg',
    desc: 'Gama completa de ferramentas manuais, elétricas, pneumáticas e hidráulicas de marcas profissionais.',
    products: [
      { img: '/cat-ferramentas.jpg',                        name: 'Chave de Boca',                             brand: BRAND_KROFTOOLS, sub: 'Ferramenta Manual',      desc: 'Chave combinada de boca e luneta em aço crómio-vanádio. Acabamento acetinado anti-reflexo e anti-escorregamento.' },
      { img: '/products/krof-chave-boca-luneta.jpg',        name: 'Chave de Boca Luneta',                      brand: BRAND_KROFTOOLS, sub: 'Ferramenta Manual',      desc: 'Chave combinada boca-luneta com perfil anti-escorregamento e tratamento superficial de proteção contra corrosão.' },
      { img: '/products/jbm-extensor-chaves.jpg',           name: 'Extensor Universal de Chaves 340mm',        brand: BRAND_JBM,       sub: 'Ferramenta Manual',      desc: 'Extensor articulado universal compatível com catracas ¼", ⅜" e ½". 340mm de comprimento para acesso a zonas difíceis.' },
      { img: '/products/jbm-chaves-torx.jpg',               name: 'Conjunto de Chaves Torx Coloridas',         brand: BRAND_JBM,       sub: 'Ferramenta Manual',      desc: 'Jogo de chaves Torx com código de cores por tamanho. Inclui T6 a T50 em aço crómio-vanádio tratado.' },
      { img: '/products/jbm-carro-ferramentas.jpg',         name: 'Carro de Ferramentas XL 8 Gavetas',         brand: BRAND_JBM,       sub: 'Equipamento de Oficina', desc: 'Carro de oficina com 8 gavetas de grande capacidade, rodas giratórias com travão e estrutura em aço com revestimento epóxi.' },
    ],
    subcategories: [
      { name: 'Ferramentas Manuais',         items: ['Chaves de caixa e acessórios', 'Alicates e sargentos', 'Catracas e extensões', 'Chaves dinamométricas', 'Martelos e cinzéis', 'Bits e pontas'] },
      { name: 'Ferramentas Pneumáticas',     items: ['Aparafusadoras de impacto', 'Lixadeiras pneumáticas', 'Pistolas de ar comprimido', 'Manutenção de pneus', 'Enroladores de mangueira'] },
      { name: 'Ferramentas Elétricas s/ Fio',items: ['Berbequins 20V / 12V', 'Aparafusadoras a bateria', 'Serras circulares', 'Lixadeiras elétricas', 'Baterias e carregadores'] },
      { name: 'Ferramentas Hidráulicas',     items: ['Macacos hidráulicos de rodas', 'Macacos tipo garrafa', 'Cavaletes e suportes', 'Prensas hidráulicas', 'Guindastes de oficina'] },
      { name: 'Equipamento de Oficina',      items: ['Carros de ferramentas', 'Bancadas e armários', 'Módulos de arrumação', 'Mesas de trabalho', 'Pavimentação de oficina'] },
      { name: 'Conjuntos e Kits',            items: ['Conjuntos de ferramentas em mala', 'Jogos de chaves de caixa', 'Kits de pontas', 'Caixas / maletas profissionais'] },
    ],
  },
  {
    id: 'mecanica',
    icon: Settings,
    label: 'Mecânica',
    accent: 'border-blue-600',
    iconBg: 'bg-blue-600',
    textAccent: 'text-blue-700',
    brands: [BRAND_KROFTOOLS, BRAND_JBM],
    image: '/cat-mecanica.jpg',
    desc: 'Ferramentas especiais e consumíveis para motor, transmissão, suspensão, travões e lubrificação.',
    products: [
      { img: '/cat-mecanica.jpg',                     name: 'Anilhas Injetor Cobre',                   brand: BRAND_KROFTOOLS, sub: 'Ferramenta Específica',    desc: 'Conjunto de anilhas de vedação em cobre para injetores diesel. Alta resistência térmica até 300°C, vários tamanhos incluídos.' },
      { img: '/products/krof-bits.jpg',               name: 'Bits de Alta Resistência',                brand: BRAND_KROFTOOLS, sub: 'Ferramenta Específica',    desc: 'Bits de encaixe ¼" em aço S2 temperado. Alta resistência ao torque e vida útil prolongada em uso profissional.' },
      { img: '/products/jbm-macaco-hidraulico.jpg',   name: 'Macaco Hidráulico 3T Baixo Perfil',       brand: BRAND_JBM,       sub: 'Ferramentas Hidráulicas',  desc: 'Macaco hidráulico de 3 toneladas com altura mínima de 80mm. Ideal para viaturas desportivas e rebaixadas.' },
      { img: '/products/jbm-carretel-oleo.jpg',       name: 'Carretel de Mangueira para Óleo 15m',     brand: BRAND_JBM,       sub: 'Lubrificação',             desc: 'Carretel de parede com 15m de mangueira para distribuição de óleo. Retração automática e ligação BSP ½".' },
    ],
    subcategories: [
      { name: 'Ferramenta Especial de Motor',    items: ['Extratores e desmultiplicadores', 'Reparação de roscas', 'Kits de bujões de drenagem', 'Cilindros e êmbolos', 'Sistema de embreagem'] },
      { name: 'Ferramentas de Sincronismo',      items: ['Fiat / Alfa Romeo', 'BMW / MINI', 'Ford / PSA', 'VAG (Volkswagen, Audi, Seat, Skoda)', 'Mercedes-Benz', 'Renault / Dacia / Nissan'] },
      { name: 'Sistema de Travões',              items: ['Sangradores de travões', 'Reposicionadores de pinças', 'Ferramentas de manutenção', 'Cilindros de travão'] },
      { name: 'Lubrificação e Combustível',      items: ['Bombas de abastecimento diesel', 'Bombas de ureia (AdBlue)', 'Coletores e baldes de óleo', 'Bombas de enchimento / extração', 'Pistolas de sucção'] },
      { name: 'Suspensão e Direção',             items: ['Extratores de rótulas', 'Ferramentas de molas', 'Ferramentas de amortecedores', 'Desmultiplicadores de força'] },
      { name: 'Ar Condicionado e Refrigeração', items: ['Ferramentas de AC', 'Sistema de refrigeração', 'Termómetros', 'Equipamento de climatização'] },
    ],
  },
  {
    id: 'chapa-pintura',
    icon: PaintBucket,
    label: 'Chapa e Pintura',
    accent: 'border-violet-600',
    iconBg: 'bg-violet-600',
    textAccent: 'text-violet-700',
    brands: [BRAND_KROFTOOLS, BRAND_JBM],
    image: '/cat-chapa.jpg',
    desc: 'Equipamentos especializados para reparação de carroçaria, substituição de vidros e acabamento.',
    products: [
      { img: '/cat-chapa.jpg',                        name: 'Saca Molas de Portas',                    brand: BRAND_KROFTOOLS, sub: 'Reparação de Carroçaria', desc: 'Ferramenta para remoção de molas de retenção em portas de automóvel. Compatível com a maioria das marcas europeias e asiáticas.' },
      { img: '/products/krof-kit-farois.jpg',         name: 'Kit Restauração de Faróis',               brand: BRAND_KROFTOOLS, sub: 'Restauração de Faróis',   desc: 'Kit completo para restauração de faróis oxidados. Inclui lixas progressivas, composto de polimento e verniz UV de proteção.' },
      { img: '/products/krof-agulha-parabrisa.jpg',   name: 'Agulha p/ Fio Cortar Para-Brisas',        brand: BRAND_KROFTOOLS, sub: 'Substituição de Vidros',  desc: 'Agulha profissional para corte do cordão de poliuretano em operações de substituição de para-brisas. Lâmina em aço inox.' },
      { img: '/products/jbm-kit-amolgadelas.jpg',     name: 'Kit Reparação de Amolgadelas 11 pcs',     brand: BRAND_JBM,       sub: 'Reparação de Carroçaria', desc: 'Kit de 11 peças para reparação de amolgadelas sem pintura (PDR). Inclui ventosas, alavancas e martelos de carroçaria.' },
      { img: '/products/jbm-ventosa.jpg',             name: 'Ventosa de Extração Ø70mm',               brand: BRAND_JBM,       sub: 'Reparação de Carroçaria', desc: 'Ventosa de sucção Ø70mm para extração e reposicionamento de painéis de carroçaria. Pega ergonómica antiderrapante.' },
    ],
    subcategories: [
      { name: 'Reparação de Carroçaria',  items: ['Ferramentas de conformação', 'Saca-molas de portas', 'Ferramentas de amolgamento', 'Espátulas e raspadeiras', 'Ferramentas de alinhamento'] },
      { name: 'Substituição de Vidros',   items: ['Cortadores de junta de poliuretano', 'Ferramentas de remoção de para-brisas', 'Kits de instalação', 'Arames de corte'] },
      { name: 'Restauração de Faróis',    items: ['Kits de polimento de faróis', 'Abrasivos progressivos', 'Vernizes de proteção UV', 'Lâmpadas de inspeção'] },
      { name: 'Preparação e Abrasivos',   items: ['Lixas e discos de lixa', 'Lixadeiras orbitais', 'Discos de desbaste', 'Blocos de lixar'] },
      { name: 'Detailing e Polimento',    items: ['Máquinas de polir', 'Esponjas de polimento', 'Compostos abrasivos', 'Aplicadores profissionais'] },
    ],
  },
  {
    id: 'higiene-seguranca',
    icon: HardHat,
    label: 'Higiene e Segurança',
    accent: 'border-emerald-600',
    iconBg: 'bg-emerald-600',
    textAccent: 'text-emerald-700',
    brands: [BRAND_KROFTOOLS, BRAND_JBM],
    image: '/cat-higiene.jpg',
    desc: 'Equipamentos de proteção individual, vestuário profissional e produtos de higiene e segurança para oficina.',
    products: [
      { img: '/cat-higiene.jpg',                  name: 'Luvas PU de Proteção Mecânica',          brand: BRAND_KROFTOOLS, sub: 'EPI',                    desc: 'Luvas de trabalho com palma em poliuretano para proteção mecânica nível 1. Dorso em nylon respirável, tamanhos S a XXL.' },
      { img: '/products/jbm-luvas-nitrilo.jpg',   name: 'Luvas de Nitrilo Descartáveis (100 un.)',brand: BRAND_JBM,       sub: 'EPI',                    desc: 'Luvas descartáveis em nitrilo sem pó, resistentes a óleos e produtos químicos. Embalagem de 100 unidades, tamanhos S a XL.' },
      { img: '/products/jbm-colete.jpg',           name: 'Colete de Trabalho Cinzento-Preto',      brand: BRAND_JBM,       sub: 'Vestuário Profissional', desc: 'Colete multibolsos profissional em tecido ripstop cinzento e preto. Múltiplos bolsos funcionais e ajuste por velcro lateral.' },
    ],
    subcategories: [
      { name: 'Equipamento de Proteção Individual (EPI)', items: ['Luvas de proteção mecânica', 'Óculos de segurança', 'Protetores auditivos', 'Máscaras e respiradores', 'Viseiras de proteção'] },
      { name: 'Vestuário Profissional',                   items: ['Fatos-macaco de trabalho', 'Calças e jaquetas técnicas', 'Calçado de segurança', 'Colete de alta visibilidade'] },
      { name: 'Primeiros Socorros e Emergência',          items: ['Kits de primeiros socorros', 'Kits de emergência automóvel', 'Extintores', 'Cobertores de emergência'] },
      { name: 'Sinalização e Delimitação',                items: ['Triângulos de pré-sinalização', 'Cones de sinalização', 'Fitas de delimitação', 'Sinalizadores luminosos'] },
      { name: 'Higiene Industrial',                       items: ['Dispensadores de desinfetante', 'Produtos de limpeza de mãos', 'Medidor de qualidade do ar', 'Contentores de resíduos'] },
    ],
  },
  {
    id: 'eletricidade',
    icon: Zap,
    label: 'Eletricidade',
    accent: 'border-amber-500',
    iconBg: 'bg-amber-500',
    textAccent: 'text-amber-600',
    brands: [BRAND_KROFTOOLS, BRAND_JBM],
    image: '/cat-eletricidade.jpg',
    desc: 'Ferramentas e equipamentos para diagnóstico elétrico, manutenção de baterias, iluminação e mobilidade elétrica.',
    products: [
      { img: '/cat-eletricidade.jpg',           name: 'Gambiarra 5W LED com Carregador',         brand: BRAND_KROFTOOLS, sub: 'Iluminação Profissional', desc: 'Lâmpada de inspeção LED 5W recarregável via USB. Cabo de 5m, gancho de suspensão e proteção em borracha resistente a impactos.' },
      { img: '/products/jbm-lanterna.jpg',      name: 'Lâmpada LED de Bolso 120LM',              brand: BRAND_JBM,       sub: 'Iluminação Profissional', desc: 'Lanterna compacta de bolso com 120 lúmens. Foco regulável, resistente a impactos, alimentada por 3 pilhas AAA.' },
      { img: '/products/jbm-foco-solar.jpg',    name: 'Foco LED Portátil Imantado Solar 800LM',  brand: BRAND_JBM,       sub: 'Iluminação Profissional', desc: 'Projector LED portátil de 800 lúmens com carregamento solar e base magnética integrada. Autonomia até 6h em modo baixo.' },
    ],
    subcategories: [
      { name: 'Manutenção de Baterias',     items: ['Arrancadores de emergência', 'Carregadores de bateria', 'Testadores de bateria', 'Medição de corrente e tensão'] },
      { name: 'Diagnóstico e Regulação',    items: ['Ferramentas de regulação e teste', 'Multímetros profissionais', 'Pinças amperímetricas', 'Ferramentas de inspeção visual'] },
      { name: 'Soldadura e Reparação',      items: ['Soldadoras de inversor', 'Removedor de parafusos por indução', 'Ferramentas de reparação elétrica', 'Reparação de sistema elétrico'] },
      { name: 'Iluminação Profissional',    items: ['Lâmpadas de inspeção LED', 'Gambiarras recarregáveis', 'Lanternas de cabeça', 'Focos de trabalho LED', 'Pirilampos de sinalização'] },
      { name: 'Mobilidade Elétrica (EV)',   items: ['Cabos de carregamento para VE', 'Carregadores de veículo elétrico', 'Ferramentas com isolamento 1000V', 'Equipamento de diagnóstico EV'] },
    ],
  },
  {
    id: 'lavagens',
    icon: Droplets,
    label: 'Lavagens',
    accent: 'border-cyan-500',
    iconBg: 'bg-cyan-500',
    textAccent: 'text-cyan-700',
    brands: [BRAND_JBM, BRAND_TAYSIL],
    desc: 'Produtos químicos, consumíveis e equipamentos de limpeza automóvel para manutenção e apresentação dos veículos.',
    products: [
      { img: '/products/jbm-carretel-mangueira.jpg', name: 'Carretel de Mangueira de Água 15+1.5m',  brand: BRAND_JBM,    sub: 'Equipamento de Lavagem',  desc: 'Carretel de parede com 15m de mangueira principal e 1.5m de extensão. Retração automática e ligação rápida incluída.' },
      { img: null,                                    name: 'Champô Automóvel Profissional',           brand: BRAND_TAYSIL, sub: 'Limpeza Exterior',         desc: 'Champô de alta espuma para lavagem manual. Formulação pH neutro que não danifica ceras ou revestimentos cerâmicos.' },
      { img: null,                                    name: 'Desengordurante Universal em Spray',      brand: BRAND_TAYSIL, sub: 'Limpeza Exterior',         desc: 'Desengordurante em spray para remoção de óleo, graxa e betume em motor, jantes e carroçaria. Seguro em plásticos e metais.' },
      { img: null,                                    name: 'Limpa-Jantes Concentrado',                brand: BRAND_TAYSIL, sub: 'Limpeza Exterior',         desc: 'Produto concentrado para limpeza profunda de jantes em liga leve e aço. Formulação neutra remove pó de travão e sujidade.' },
      { img: null,                                    name: 'Microfibras de Lavagem (Pack 10)',         brand: BRAND_TAYSIL, sub: 'Consumíveis de Lavagem',   desc: 'Pack de 10 panos de microfibra 40×40cm para secagem e polimento. Alta absorção, laváveis até 60°C e sem risco de riscos.' },
    ],
    subcategories: [
      { name: 'Limpeza Exterior',          items: ['Shampoos e detergentes automóvel', 'Pré-lavagem e espuma ativa', 'Limpa-jantes', 'Limpa-pneus', 'Limpa-vidros exterior'] },
      { name: 'Detailing e Proteção',      items: ['Ceras de carnaúba e sintéticas', 'Polimentos e compostos', 'Sealants de pintura', 'Quick detailer', 'Nano-cerâmica'] },
      { name: 'Limpeza Interior',          items: ['Limpa-estofos e alcatifas', 'Limpa-plásticos e borrachas', 'Limpa-vidros interior', 'Odorizadores profissionais'] },
      { name: 'Cuidados com Pneus',        items: ['Acessórios de pneus', 'Brilhante de pneus', 'Limpa-jantes ácido e neutro', 'Contrapesos e válvulas'] },
      { name: 'Consumíveis de Lavagem',    items: ['Panos e microfibras profissionais', 'Esponjas e aplicadores', 'Escovas de lavagem', 'Luvas de pelo de cordeiro'] },
    ],
  },
]

const BrandBadge = ({ brand }) => {
  const styles = {
    [BRAND_KROFTOOLS]: 'bg-slate-800 text-white',
    [BRAND_JBM]:       'bg-blue-700 text-white',
    [BRAND_TAYSIL]:    'bg-red-600 text-white',
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold tracking-wide ${styles[brand] ?? 'bg-slate-200 text-slate-700'}`}>
      {brand}
    </span>
  )
}

const ProductCard = ({ img, name, brand, sub, iconBg, Icon, onClick }) => (
  <button
    onClick={onClick}
    className="bg-white border border-slate-100 rounded-xl p-4 flex flex-col items-center text-center gap-2.5 hover:shadow-md hover:border-slate-200 hover:-translate-y-0.5 transition-all w-full"
  >
    {img ? (
      <img src={img} alt={name} className="w-20 h-20 object-contain" />
    ) : (
      <div className={`w-20 h-20 ${iconBg} rounded-2xl flex items-center justify-center`}>
        <Icon size={28} className="text-white opacity-75" />
      </div>
    )}
    <p className="text-xs font-medium text-slate-800 leading-snug line-clamp-2 flex-1">{name}</p>
    <div className="flex flex-col items-center gap-1">
      <span className="text-[10px] text-slate-400">{sub}</span>
      <BrandBadge brand={brand} />
    </div>
  </button>
)

const ProductModal = ({ product, onClose }) => {
  const { img, name, brand, sub, desc, iconBg, Icon, categoryLabel } = product

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
          aria-label="Fechar"
        >
          <X size={15} className="text-slate-600" />
        </button>

        <div className="flex justify-center mb-5 pt-2">
          {img ? (
            <img src={img} alt={name} className="w-40 h-40 object-contain" />
          ) : (
            <div className={`w-40 h-40 ${iconBg} rounded-2xl flex items-center justify-center`}>
              <Icon size={52} className="text-white opacity-75" />
            </div>
          )}
        </div>

        <p className="text-[11px] text-slate-400 mb-1 uppercase tracking-wide">{sub}</p>
        <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug pr-4">{name}</h3>

        <div className="flex items-center gap-2 mb-4">
          <BrandBadge brand={brand} />
          <span className="text-xs text-slate-400">{categoryLabel}</span>
        </div>

        {desc && (
          <p className="text-sm text-slate-500 leading-relaxed mb-5">{desc}</p>
        )}

        <div className="border-t border-slate-100 pt-4">
          <Link
            to="/contactos"
            onClick={onClose}
            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors w-full"
          >
            Pedir Informação <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  )
}

function filterSubcategories(subcategories, query) {
  if (!query.trim()) return subcategories
  const q = query.toLowerCase()
  return subcategories
    .map(({ name, items }) => ({
      name,
      items: name.toLowerCase().includes(q) ? items : items.filter(item => item.toLowerCase().includes(q)),
    }))
    .filter(({ name, items }) => name.toLowerCase().includes(q) || items.length > 0)
}

export default function Produtos() {
  const [activeId, setActiveId] = useState(categories[0].id)
  const [expandedId, setExpandedId] = useState(categories[0].id)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const sectionRefs = useRef({})

  useEffect(() => {
    setSearchQuery('')
  }, [expandedId])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-30% 0px -65% 0px' }
    )
    categories.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id) => {
    setExpandedId(id)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      {/* Page header */}
      <section className="pt-32 pb-16 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.15) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-red-400 text-sm font-semibold uppercase tracking-widest mb-3">Catálogo</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Produtos</h1>
          <p className="text-slate-400 text-lg max-w-xl">
            Mais de 3000 referências em 6 categorias, das marcas <span className="text-white font-semibold">KROFTOOLS</span> e <span className="text-white font-semibold">JBM</span>, para cobrir todas as necessidades da sua oficina.
          </p>
          <div className="mt-5 flex gap-2">
            <BrandBadge brand={BRAND_KROFTOOLS} />
            <BrandBadge brand={BRAND_JBM} />
            <BrandBadge brand={BRAND_TAYSIL} />
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-10 items-start">

          {/* Sticky sidebar */}
          <aside className="hidden lg:block w-52 shrink-0 sticky top-24">
            <p className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold mb-3">Categorias</p>
            <nav className="space-y-0.5">
              {categories.map(({ id, label, icon: Icon, iconBg, accent }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left
                    ${activeId === id
                      ? `bg-slate-900 text-white border-l-2 ${accent} pl-[10px]`
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                    }`}
                >
                  <span className={`w-6 h-6 rounded-md ${activeId === id ? iconBg : 'bg-slate-200'} flex items-center justify-center shrink-0 transition-colors`}>
                    <Icon size={13} className={activeId === id ? 'text-white' : 'text-slate-500'} />
                  </span>
                  {label}
                </button>
              ))}
            </nav>

            <div className="mt-8 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-500 leading-relaxed">
              Não encontrou o que procura?{' '}
              <a href="/contactos" className="text-red-600 font-medium hover:underline">
                Contacte-nos
              </a>
            </div>
          </aside>

          {/* Category sections */}
          <div className="flex-1 min-w-0 space-y-6">
            {categories.map(({ id, label, icon: Icon, iconBg, textAccent, accent, brands, desc, image, products, subcategories }) => {
              const filtered = filterSubcategories(subcategories, searchQuery)
              return (
                <section
                  key={id}
                  id={id}
                  ref={el => sectionRefs.current[id] = el}
                  className="scroll-mt-24 border border-slate-100 rounded-2xl overflow-hidden"
                >
                  {/* Category header — click to expand/collapse */}
                  <button
                    className="w-full flex items-start gap-4 p-6 text-left hover:bg-slate-50 transition-colors group"
                    onClick={() => setExpandedId(expandedId === id ? null : id)}
                  >
                    {image ? (
                      <img src={image} alt={label} className="w-14 h-14 rounded-xl object-contain bg-white border border-slate-100 p-1 shrink-0" />
                    ) : (
                      <div className={`w-14 h-14 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}>
                        <Icon size={24} className="text-white" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h2 className="text-xl font-bold text-slate-900">{label}</h2>
                        <div className="flex gap-1.5">
                          {brands.map(b => <BrandBadge key={b} brand={b} />)}
                        </div>
                      </div>
                      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                    </div>
                    <ChevronDown
                      size={20}
                      className={`shrink-0 mt-1 text-slate-400 transition-transform duration-200 ${expandedId === id ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* Expanded content */}
                  {expandedId === id && (
                    <div className={`border-t-2 ${accent} px-6 pb-8 pt-6 space-y-8`}>

                      {/* Featured products */}
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">Produtos em destaque</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                          {products.map((p) => (
                            <ProductCard
                              key={p.name}
                              {...p}
                              iconBg={iconBg}
                              Icon={Icon}
                              onClick={() => setSelectedProduct({ ...p, iconBg, Icon, categoryLabel: label })}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="border-t border-slate-100" />

                      {/* Subcategory reference with search */}
                      <div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 shrink-0">O que encontra nesta categoria</p>
                          <div className="relative sm:ml-auto w-full sm:w-56">
                            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            <input
                              type="text"
                              value={searchQuery}
                              onChange={e => setSearchQuery(e.target.value)}
                              placeholder="Filtrar itens..."
                              className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-slate-300 text-slate-700 placeholder:text-slate-400"
                            />
                          </div>
                        </div>

                        {filtered.length > 0 ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                            {filtered.map(({ name, items }) => (
                              <div key={name} className="bg-slate-50 rounded-xl p-4">
                                <h3 className={`font-semibold text-xs ${textAccent} mb-2.5 flex items-center gap-1.5`}>
                                  <ChevronRight size={12} />
                                  {name}
                                </h3>
                                <ul className="space-y-1">
                                  {items.map(item => (
                                    <li key={item} className="flex items-start gap-2 text-[11px] text-slate-500">
                                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-300 shrink-0" />
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-slate-400 py-4 text-center">
                            Nenhum item encontrado para "<span className="text-slate-600">{searchQuery}</span>".
                          </p>
                        )}
                      </div>

                    </div>
                  )}
                </section>
              )
            })}

            {/* Bottom CTA */}
            <div className="bg-slate-900 rounded-2xl p-8 text-center">
              <p className="text-white font-semibold text-lg mb-2">Precisa de uma referência específica?</p>
              <p className="text-slate-400 text-sm mb-5">
                Com mais de 3000 referências disponíveis, contacte-nos e localizamos o produto certo para a sua necessidade.
              </p>
              <a
                href="/contactos"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg text-sm transition-colors"
              >
                Solicitar informação
              </a>
            </div>
          </div>
        </div>
      </div>

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </>
  )
}
