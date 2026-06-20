import type { Brand } from '../../data/products'

const BRAND_STYLES: Record<Brand, string> = {
  KROFTOOLS: 'bg-slate-800 text-white',
  JBM:       'bg-slate-700 text-white',
  TAYSIL:    'bg-red-600 text-white',
}

export default function BrandBadge({ brand }: { brand: Brand }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wide ${BRAND_STYLES[brand]}`}>
      {brand}
    </span>
  )
}
