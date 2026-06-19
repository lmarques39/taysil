import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="mb-3">
              <img src="/logo.jpg" alt="Taysil" className="h-9 w-auto object-contain" />
            </div>
            <p className="text-sm leading-relaxed">
              Profissionalismo. Confiança. Eficiência.
            </p>
            <p className="text-xs mt-3 text-slate-500">
              Comércio por grosso de produtos para o setor automóvel.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Navegação</h3>
            <ul className="space-y-2 text-sm">
              {[
                { to: '/', label: 'Início' },
                { to: '/empresa', label: 'Empresa' },
                { to: '/produtos', label: 'Produtos' },
                { to: '/catalogos', label: 'Catálogos' },
                { to: '/contactos', label: 'Contactos' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={15} className="mt-0.5 shrink-0 text-red-500" />
                <span>Rua Vasco da Gama nº33<br />Algueirão Mem-Martins 2725-152</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={15} className="shrink-0 text-red-500" />
                <a href="tel:939044050" className="hover:text-white transition-colors">939 044 050</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} className="shrink-0 text-red-500" />
                <a href="mailto:geral.taysil@gmail.com" className="hover:text-white transition-colors">
                  geral.taysil@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <p>© {new Date().getFullYear()} Taysil. Todos os direitos reservados.</p>
          <p>Developed by Luís Marques</p>
          <p>Sintra, Portugal</p>
        </div>
      </div>
    </footer>
  )
}
