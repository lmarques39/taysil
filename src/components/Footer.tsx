import { Link } from 'react-router-dom'
import { Phone, Mail } from 'lucide-react'

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
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Main row */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

          {/* Logo */}
          <div className="shrink-0">
            <img src="/logo.jpg" alt="Taysil" className="h-9 w-auto object-contain" />
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm">
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
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
          <p>© {new Date().getFullYear()} Taysil. Todos os direitos reservados.</p>
          <p className="sm:text-center">Developed by Luís Marques</p>
          <p className="sm:text-right">Sintra, Portugal</p>
        </div>

      </div>
    </footer>
  )
}
