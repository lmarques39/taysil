const phones = [
  { number: '939 044 050', href: 'tel:939044050', label: 'Telemóvel' },
  { number: '963 495 811', href: 'tel:963495811', label: 'Telemóvel' },
  { number: '216 019 522', href: 'tel:216019522', label: 'Fixo' },
]

export default function Contactos() {
  return (
    <>
      <title>Contactos | Taysil</title>
      <meta name="description" content="Entre em contacto com a Taysil. Rua Vasco da Gama nº33, Algueirão Mem-Martins. Tel: 939 044 050 | 216 019 522. Email: geral.taysil@gmail.com." />

      {/* Header with primary phone */}
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
          <p className="text-red-400 text-sm font-semibold uppercase tracking-widest mb-3">Fale Connosco</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Contactos</h1>
          <p className="text-slate-400 text-lg max-w-xl mb-10">
            Estamos disponíveis para o ajudar. Contacte-nos por telefone, e-mail ou venha visitar-nos.
          </p>
          <div>
            <p className="text-slate-500 text-xs uppercase tracking-widest mb-2">Linha principal</p>
            <a
              href="tel:939044050"
              className="text-3xl sm:text-4xl font-black text-red-400 hover:text-white transition-colors tracking-tight"
            >
              939 044 050
            </a>
          </div>
        </div>
      </section>

      {/* Info + Map */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Left: contact details */}
            <div>
              {/* Morada */}
              <div className="mb-10">
                <div className="border-l-4 border-red-600 pl-4 mb-4">
                  <h3 className="text-sm font-extrabold text-red-500 uppercase tracking-wide">Morada</h3>
                </div>
                <address className="not-italic text-slate-600 leading-relaxed">
                  Rua Vasco da Gama nº33<br />
                  Algueirão Mem-Martins<br />
                  2725-152, Sintra
                </address>
                <a
                  href="https://maps.google.com/?q=38.80546,-9.34012"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
                >
                  Ver no mapa →
                </a>
              </div>

              {/* Telefone */}
              <div className="mb-10">
                <div className="border-l-4 border-red-600 pl-4 mb-4">
                  <h3 className="text-sm font-extrabold text-red-500 uppercase tracking-wide">Telefone</h3>
                </div>
                <ul className="space-y-3">
                  {phones.map(({ number, href, label }) => (
                    <li key={href} className="flex items-baseline justify-between">
                      <a
                        href={href}
                        className="text-lg font-bold text-slate-900 hover:text-red-600 transition-colors tabular-nums"
                      >
                        {number}
                      </a>
                      <span className="text-xs text-slate-400 uppercase tracking-wide">{label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Email */}
              <div className="mb-10">
                <div className="border-l-4 border-red-600 pl-4 mb-4">
                  <h3 className="text-sm font-extrabold text-red-500 uppercase tracking-wide">Email</h3>
                </div>
                <a
                  href="mailto:geral.taysil@gmail.com"
                  className="text-lg font-bold text-slate-900 hover:text-red-600 transition-colors"
                >
                  geral.taysil@gmail.com
                </a>
              </div>

              {/* Horário */}
              <div>
                <div className="border-l-4 border-red-600 pl-4 mb-4">
                  <h3 className="text-sm font-extrabold text-red-500 uppercase tracking-wide">Horário</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Segunda – Sexta</span>
                    <span className="font-semibold text-slate-900 tabular-nums">09:00 – 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Sábado – Domingo</span>
                    <span className="text-slate-400">Encerrado</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: map */}
            <div className="rounded-xl overflow-hidden ring-1 ring-slate-100 h-[500px] lg:h-full lg:min-h-[520px]">
              <iframe
                title="Localização Taysil"
                src="https://maps.google.com/maps?q=38.80546,-9.34012&z=16&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block', minHeight: 520 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
