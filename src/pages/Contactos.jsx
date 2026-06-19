import { MapPin, Phone, Mail, Clock } from 'lucide-react'

const phones = [
  { number: '939 044 050', href: 'tel:939044050', type: 'Telemóvel' },
  { number: '963 495 811', href: 'tel:963495811', type: 'Telemóvel' },
  { number: '216 019 522', href: 'tel:216019522', type: 'Fixo' },
]

export default function Contactos() {
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
          <p className="text-red-400 text-sm font-semibold uppercase tracking-widest mb-3">Fale Connosco</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Contactos</h1>
          <p className="text-slate-400 text-lg max-w-xl">
            Estamos disponíveis para o ajudar. Contacte-nos por telefone, e-mail ou venha visitar-nos.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">

            {/* Address */}
            <div className="rounded-2xl border border-slate-100 p-6 shadow-sm">
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center mb-4">
                <MapPin size={20} className="text-red-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-3">Morada</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Rua Vasco da Gama nº33<br />
                Algueirão Mem-Martins<br />
                2725-152
              </p>
              <a
                href="https://maps.google.com/?q=38.80546,-9.34012"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-4 text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
              >
                Ver no mapa
              </a>
            </div>

            {/* Phones */}
            <div className="rounded-2xl border border-slate-100 p-6 shadow-sm">
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center mb-4">
                <Phone size={20} className="text-red-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-3">Telefone</h3>
              <ul className="space-y-3">
                {phones.map(({ number, href, type }) => (
                  <li key={href} className="flex items-center justify-between">
                    <a
                      href={href}
                      className="text-slate-700 hover:text-red-600 font-medium text-sm transition-colors"
                    >
                      {number}
                    </a>
                    <span className="text-xs text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">{type}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Email + Hours */}
            <div className="rounded-2xl border border-slate-100 p-6 shadow-sm">
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center mb-4">
                <Mail size={20} className="text-red-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-3">Email</h3>
              <a
                href="mailto:geral.taysil@gmail.com"
                className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors break-all"
              >
                geral.taysil@gmail.com
              </a>

              <div className="mt-6 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={16} className="text-slate-400" />
                  <span className="text-sm font-medium text-slate-900">Horário</span>
                </div>
                <div className="text-sm text-slate-500 space-y-1">
                  <div className="flex justify-between">
                    <span>Seg – Sex</span>
                    <span className="font-medium text-slate-700">09:00 – 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sáb – Dom</span>
                    <span className="font-medium text-slate-700">Encerrado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm" style={{ height: 420 }}>
            <iframe
              title="Localização Taysil"
              src="https://maps.google.com/maps?q=38.80546,-9.34012&z=16&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  )
}
