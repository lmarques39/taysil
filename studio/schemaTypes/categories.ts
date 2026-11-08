// Single source of truth for the 6 product categories used across the Studio schemas.
// Values must match CategoryId in the website (src/data/products.ts).
export const CATEGORIES = [
  { value: 'ferramentas', title: 'Ferramentas' },
  { value: 'mecanica', title: 'Mecânica' },
  { value: 'chapa-pintura', title: 'Chapa e Pintura' },
  { value: 'higiene-seguranca', title: 'Higiene e Segurança' },
  { value: 'eletricidade', title: 'Eletricidade' },
  { value: 'lavagens', title: 'Lavagens' },
] as const

export const categoryTitle = (value?: string) =>
  CATEGORIES.find((c) => c.value === value)?.title ?? 'Sem categoria'
