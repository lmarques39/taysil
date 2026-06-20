import { type ReactNode } from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import CookieBanner from '../organisms/CookieBanner'
import { CookieConsentProvider } from '../../context/CookieConsentContext'

export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <CookieConsentProvider>
      <div className="flex flex-col min-h-screen bg-slate-50">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
      </div>
    </CookieConsentProvider>
  )
}
