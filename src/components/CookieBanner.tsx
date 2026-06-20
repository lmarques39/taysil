import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const STORAGE_KEY = 'taysil_cookie_consent'

export type CookieConsent = 'accepted' | 'declined' | null

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent>(() => {
    return (localStorage.getItem(STORAGE_KEY) as CookieConsent) ?? null
  })

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setConsent('accepted')
  }

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, 'declined')
    setConsent('declined')
  }

  return { consent, accept, decline }
}

export default function CookieBanner() {
  const { consent, accept, decline } = useCookieConsent()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (consent === null) setVisible(true)
  }, [consent])

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      <div className="max-w-3xl mx-auto bg-slate-900 text-slate-300 rounded-2xl shadow-2xl ring-1 ring-white/10 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <p className="text-sm leading-relaxed flex-1">
          Este website utiliza cookies do Google Maps para mostrar a nossa localização.{' '}
          <Link to="/privacidade" className="text-red-400 hover:text-red-300 underline underline-offset-2">
            Política de Privacidade
          </Link>
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 rounded-lg transition-colors"
          >
            Recusar
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-sm font-semibold bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  )
}
