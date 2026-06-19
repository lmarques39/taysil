import { useState, useEffect, useRef } from 'react'
import { HardHat, Zap, Settings, Droplets, PaintBucket, Wrench, ChevronRight, ChevronDown } from 'lucide-react'

const BRAND_KROFTOOLS = 'KROFTOOLS'
const BRAND_JBM = 'JBM'

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
    subcategories: [
      {
        name: 'Ferramentas Manuais',
        items: ['Chaves de caixa e acessórios', 'Alicates e sargentos', 'Catracas e extensões', 'Chaves dinamométricas', 'Martelos e cinzéis', 'Bits e pontas'],
      },
      {
        name: 'Ferramentas Pneumáticas',
        items: ['Aparafusadoras de impacto', 'Lixadeiras pneumáticas', 'Pistolas de ar comprimido', 'Manutenção de pneus', 'Enroladores de mangueira'],
      },
      {
        name: 'Ferramentas Elétricas s/ Fio',
        items: ['Berbequins 20V / 12V', 'Aparafusadoras a bateria', 'Serras circulares', 'Lixadeiras elétricas', 'Baterias e carregadores'],
      },
      {
        name: 'Ferramentas Hidráulicas',
        items: ['Macacos hidráulicos de rodas', 'Macacos tipo garrafa', 'Cavaletes e suportes', 'Prensas hidráulicas', 'Guindastes de oficina'],
      },
      {
        name: 'Equipamento de Oficina',
        items: ['Carros de ferramentas', 'Bancadas e armários', 'Módulos de arrumação', 'Mesas de trabalho', 'Pavimentação de oficina'],
      },
      {
        name: 'Conjuntos e Kits',
        items: ['Conjuntos de ferramentas em mala', 'Jogos de chaves de caixa', 'Kits de pontas', 'Caixas / maletas profissionais'],
      },
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
    subcategories: [
      {
        name: 'Ferramenta Especial de Motor',
        items: ['Extratores e desmultiplicadores', 'Reparação de roscas', 'Kits de bujões de drenagem', 'Cilindros e êmbolos', 'Sistema de embreagem'],
      },
      {
        name: 'Ferramentas de Sincronismo',
        items: ['Fiat / Alfa Romeo', 'BMW / MINI', 'Ford / PSA', 'VAG (Volkswagen, Audi, Seat, Skoda)', 'Mercedes-Benz', 'Renault / Dacia / Nissan'],
      },
      {
        name: 'Sistema de Travões',
        items: ['Sangradores de travões', 'Reposicionadores de pinças', 'Ferramentas de manutenção', 'Cilindros de travão'],
      },
      {
        name: 'Lubrificação e Combustível',
        items: ['Bombas de abastecimento diesel', 'Bombas de ureia (AdBlue)', 'Coletores e baldes de óleo', 'Bombas de enchimento / extração', 'Pistolas de sucção'],
      },
      {
        name: 'Suspensão e Direção',
        items: ['Extratores de rótulas', 'Ferramentas de molas', 'Ferramentas de amortecedores', 'Desmultiplicadores de força'],
      },
      {
        name: 'Ar Condicionado e Refrigeração',
        items: ['Ferramentas de AC', 'Sistema de refrigeração', 'Termómetros', 'Equipamento de climatização'],
      },
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
    subcategories: [
      {
        name: 'Reparação de Carroçaria',
        items: ['Ferramentas de conformação', 'Saca-molas de portas', 'Ferramentas de amolgamento', 'Espátulas e raspadeiras', 'Ferramentas de alinhamento'],
      },
      {
        name: 'Substituição de Vidros',
        items: ['Cortadores de junta de poliuretano', 'Ferramentas de remoção de para-brisas', 'Kits de instalação', 'Arames de corte'],
      },
      {
        name: 'Restauração de Faróis',
        items: ['Kits de polimento de faróis', 'Abrasivos progressivos', 'Vernizes de proteção UV', 'Lâmpadas de inspeção'],
      },
      {
        name: 'Preparação e Abrasivos',
        items: ['Lixas e discos de lixa', 'Lixadeiras orbitais', 'Discos de desbaste', 'Blocos de lixar'],
      },
      {
        name: 'Detailing e Polimento',
        items: ['Máquinas de polir', 'Esponjas de polimento', 'Compostos abrasivos', 'Aplicadores profissionais'],
      },
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
    desc: 'Equipamentos de proteção individual, vestuário profissional e produtos de higiene e segurança para oficina.',
    subcategories: [
      {
        name: 'Equipamento de Proteção Individual (EPI)',
        items: ['Luvas de proteção mecânica', 'Óculos de segurança', 'Protetores auditivos', 'Máscaras e respiradores', 'Viseiras de proteção'],
      },
      {
        name: 'Vestuário Profissional',
        items: ['Fatos-macaco de trabalho', 'Calças e jaquetas técnicas', 'Calçado de segurança', 'Colete de alta visibilidade'],
      },
      {
        name: 'Primeiros Socorros e Emergência',
        items: ['Kits de primeiros socorros', 'Kits de emergência automóvel', 'Extintores', 'Cobertores de emergência'],
      },
      {
        name: 'Sinalização e Delimitação',
        items: ['Triângulos de pré-sinalização', 'Cones de sinalização', 'Fitas de delimitação', 'Sinalizadores luminosos'],
      },
      {
        name: 'Higiene Industrial',
        items: ['Dispensadores de desinfetante', 'Produtos de limpeza de mãos', 'Medidor de qualidade do ar', 'Contentores de resíduos'],
      },
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
    desc: 'Ferramentas e equipamentos para diagnóstico elétrico, manutenção de baterias, iluminação e mobilidade elétrica.',
    subcategories: [
      {
        name: 'Manutenção de Baterias',
        items: ['Arrancadores de emergência', 'Carregadores de bateria', 'Testadores de bateria', 'Medição de corrente e tensão'],
      },
      {
        name: 'Diagnóstico e Regulação',
        items: ['Ferramentas de regulação e teste', 'Multímetros profissionais', 'Pinças amperímetricas', 'Ferramentas de inspeção visual'],
      },
      {
        name: 'Soldadura e Reparação',
        items: ['Soldadoras de inversor', 'Removedor de parafusos por indução', 'Ferramentas de reparação elétrica', 'Reparação de sistema elétrico'],
      },
      {
        name: 'Iluminação Profissional',
        items: ['Lâmpadas de inspeção LED', 'Gambiarras recarregáveis', 'Lanternas de cabeça', 'Focos de trabalho LED', 'Pirilampos de sinalização'],
      },
      {
        name: 'Mobilidade Elétrica (EV)',
        items: ['Cabos de carregamento para VE', 'Carregadores de veículo elétrico', 'Ferramentas com isolamento 1000V', 'Equipamento de diagnóstico EV'],
      },
    ],
  },
  {
    id: 'lavagens',
    icon: Droplets,
    label: 'Lavagens',
    accent: 'border-cyan-500',
    iconBg: 'bg-cyan-500',
    textAccent: 'text-cyan-700',
    brands: [BRAND_JBM],
    desc: 'Produtos químicos, consumíveis e equipamentos de limpeza automóvel para manutenção e apresentação dos veículos.',
    subcategories: [
      {
        name: 'Limpeza Exterior',
        items: ['Shampoos e detergentes automóvel', 'Pré-lavagem e espuma ativa', 'Limpa-jantes', 'Limpa-pneus', 'Limpa-vidros exterior'],
      },
      {
        name: 'Detailing e Proteção',
        items: ['Ceras de carnaúba e sintéticas', 'Polimentos e compostos', 'Sealants de pintura', 'Quick detailer', 'Nano-cerâmica'],
      },
      {
        name: 'Limpeza Interior',
        items: ['Limpa-estofos e alcatifas', 'Limpa-plásticos e borrachas', 'Limpa-vidros interior', 'Odorizadores profissionais'],
      },
      {
        name: 'Cuidados com Pneus e Jantes',
        items: ['Acessórios de pneus', 'Brilhante de pneus', 'Limpa-jantes ácido e neutro', 'Contrapesos e válvulas'],
      },
      {
        name: 'Consumíveis de Lavagem',
        items: ['Panos e microfibras profissionais', 'Esponjas e aplicadores', 'Escovas de lavagem', 'Luvas de pelo de cordeiro'],
      },
    ],
  },
]

const BrandBadge = ({ brand }) => (
  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold tracking-wide
    ${brand === BRAND_KROFTOOLS
      ? 'bg-slate-800 text-white'
      : 'bg-blue-700 text-white'
    }`}>
    {brand}
  </span>
)

export default function Produtos() {
  const [activeId, setActiveId] = useState(categories[0].id)
  const [expandedId, setExpandedId] = useState(categories[0].id)
  const sectionRefs = useRef({})

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
          <div className="flex-1 min-w-0 space-y-16">
            {categories.map(({ id, label, icon: Icon, iconBg, textAccent, accent, brands, desc, image, subcategories }) => (
              <section
                key={id}
                id={id}
                ref={el => sectionRefs.current[id] = el}
                className="scroll-mt-24"
              >
                {/* Category header — click to expand/collapse */}
                <button
                  className={`w-full flex items-start gap-4 pb-6 border-b-2 ${accent} text-left cursor-pointer group`}
                  onClick={() => setExpandedId(expandedId === id ? null : id)}
                >
                  {image ? (
                    <img
                      src={image}
                      alt={label}
                      className="w-16 h-16 rounded-xl object-contain bg-white border border-slate-100 p-1 shrink-0"
                    />
                  ) : (
                    <div className={`w-16 h-16 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}>
                      <Icon size={28} className="text-white" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h2 className="text-2xl font-bold text-slate-900">{label}</h2>
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

                {/* Subcategory grid — only when expanded */}
                {expandedId === id && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-8">
                    {subcategories.map(({ name, items }) => (
                      <div key={name} className="bg-white border border-slate-100 rounded-xl p-5 hover:border-slate-200 hover:shadow-sm transition-all">
                        <h3 className={`font-semibold text-sm ${textAccent} mb-3 flex items-center gap-1.5`}>
                          <ChevronRight size={13} />
                          {name}
                        </h3>
                        <ul className="space-y-1.5">
                          {items.map(item => (
                            <li key={item} className="flex items-start gap-2 text-xs text-slate-500">
                              <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-300 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))}

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
    </>
  )
}
