export type Brand = 'KROFTOOLS' | 'JBM' | 'OSRAM' | 'M-TECH' | 'TOOLHUB' | 'TAYSIL'

export const BRANDS: Brand[] = ['KROFTOOLS', 'JBM', 'OSRAM', 'M-TECH', 'TOOLHUB', 'TAYSIL']

export type CategoryId =
  | 'ferramentas'
  | 'mecanica'
  | 'chapa-pintura'
  | 'higiene-seguranca'
  | 'eletricidade'
  | 'lavagens'

export type Product = {
  id: string
  name: string
  brand: Brand
  category: CategoryId
  sub: string | null
  /** Optional 3rd level, inside "sub" (e.g. sub "Chaves", sub2 "Chaves Torx") */
  sub2: string | null
  img: string | null
  desc: string
  /** Client's internal reference (e.g. "0710-234307 FER"), used in enquiries */
  sku?: string | null
  /** Same photo without background (null until the background-removal script has run) */
  cutout?: string | null
}
