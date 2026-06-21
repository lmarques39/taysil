import { Link } from 'react-router-dom'
import { Phone, Mail, MessageCircle } from 'lucide-react'
import GridOverlay from '../atoms/GridOverlay'

const navLinks = [
  { to: '/', label: 'Início' },
  { to: '/empresa', label: 'Empresa' },
  { to: '/produtos', label: 'Produtos' },
  { to: '/catalogos', label: 'Catálogos' },
  { to: '/contactos', label: 'Contactos' },
]

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 relative overflow-hidden">
      <GridOverlay />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Main row */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

          {/* Logo */}
          <div className="shrink-0">
            <img src="/logo.jpg" alt="Taysil" className="h-9 w-auto object-contain" />
          </div>

          {/* Nav links */}
          <nav className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-x-8 text-sm">
            {navLinks.map(({ to, label }) => (
              <Link key={to} to={to} className="hover:text-white transition-colors">
                {label}
              </Link>
            ))}
          </nav>

          {/* Contact */}
          <div className="flex flex-col items-center lg:items-end gap-2 text-sm shrink-0">
            <a href="tel:939044050" className="flex items-center gap-2 hover:text-white transition-colors tabular-nums">
              <Phone size={14} className="text-red-500 shrink-0" />
              939 044 050
            </a>
            <a href="mailto:geral.taysil@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail size={14} className="text-red-500 shrink-0" />
              geral.taysil@gmail.com
            </a>
            <a
              href="https://wa.me/351939044050"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#25D366] hover:text-[#1ebe5d] transition-colors"
            >
              <MessageCircle size={14} className="shrink-0" />
              WhatsApp
            </a>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
          <p>© {new Date().getFullYear()} Taysil. Todos os direitos reservados.</p>
          <p className="sm:text-center">Developed by Luís Marques</p>
          <div className="sm:text-right flex sm:justify-end gap-4">
            <span>Sintra, Portugal</span>
            <Link to="/privacidade" className="hover:text-slate-400 transition-colors">Privacidade</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
