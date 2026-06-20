import { createContext, useContext, useState, type ReactNode } from 'react'

const STORAGE_KEY = 'taysil_cookie_consent'

export type CookieConsent = 'accepted' | 'declined' | null

type CookieConsentContextValue = {
  consent: CookieConsent
  accept: () => void
  decline: () => void
}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null)

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<CookieConsent>(
    () => (localStorage.getItem(STORAGE_KEY) as CookieConsent) ?? null
  )

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setConsent('accepted')
  }

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, 'declined')
    setConsent('declined')
  }

  return (
    <CookieConsentContext.Provider value={{ consent, accept, decline }}>
      {children}
    </CookieConsentContext.Provider>
  )
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext)
  if (!ctx) throw new Error('useCookieConsent must be used within CookieConsentProvider')
  return ctx
}
