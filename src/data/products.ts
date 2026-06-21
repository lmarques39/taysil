export type Brand = 'KROFTOOLS' | 'JBM' | 'TAYSIL'

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
