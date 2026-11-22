// Taysil contact details — one place for every phone/email/WhatsApp link on the site.

export const EMAIL = 'geral.taysil@gmail.com'
const WHATSAPP_NUMBER = '351939044050' // international format, no "+" (wa.me requirement)

export type Phone = { display: string; tel: string; label: string }

// tel: links carry the country code, so they also work from phones with a foreign SIM
export const PHONES: Phone[] = [
  { display: '939 044 050', tel: 'tel:+351939044050', label: 'Telemóvel' },
  { display: '936 645 930', tel: 'tel:+351936645930', label: 'Telemóvel' },
  { display: '216 019 522', tel: 'tel:+351216019522', label: 'Fixo' },
]
export const MAIN_PHONE = PHONES[0]

/** mailto: link, optionally with a pre-filled subject and body */
export function mailtoHref(subject?: string, body?: string) {
  const params = new URLSearchParams()
  if (subject) params.set('subject', subject)
  if (body) params.set('body', body)
  // URLSearchParams encodes spaces as "+", which some mail apps show literally — use %20
  const query = params.toString().replace(/\+/g, '%20')
  return `mailto:${EMAIL}${query ? `?${query}` : ''}`
}

/** WhatsApp chat link, optionally with a pre-filled message */
export function whatsappHref(message?: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}${message ? `?text=${encodeURIComponent(message)}` : ''}`
}

/** Email about one product, pre-filled with its name and internal reference */
export function productEnquiryEmail(name: string, sku?: string | null) {
  const product = sku ? `${name} (ref. ${sku})` : name
  return mailtoHref(
    `Pedido de informação – ${name}`,
    `Olá,\n\nGostaria de pedir informação (preço e disponibilidade) sobre:\n${product}\n\nObrigado.`,
  )
}
