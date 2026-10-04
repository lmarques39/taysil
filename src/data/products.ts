export type Brand = 'KROFTOOLS' | 'JBM' | 'OSRAM' | 'M-TECH' | 'TAYSIL'

export const BRANDS: Brand[] = ['KROFTOOLS', 'JBM', 'OSRAM', 'M-TECH', 'TAYSIL']

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
  sub: string
  img: string | null
  desc: string
}
