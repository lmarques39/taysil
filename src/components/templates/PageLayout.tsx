import { type ReactNode } from 'react'
import Navbar from '../organisms/Navbar'
import Footer from '../organisms/Footer'
import CookieBanner from '../organisms/CookieBanner'
import ScrollToTop from '../atoms/ScrollToTop'
import { CookieConsentProvider } from '../../context/CookieConsentContext'

export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <CookieConsentProvider>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-slate-50">
        {/* Keyboard users can jump past the menu straight to the page content (WCAG 2.4.1) */}
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-slate-900 focus:text-white focus:text-sm focus:font-semibold"
        >
          Saltar para o conteúdo
        </a>
        <Navbar />
        <main id="conteudo" tabIndex={-1} className="flex-1 focus:outline-none">{children}</main>
        <Footer />
        <CookieBanner />
      </div>
    </CookieConsentProvider>
  )
}
