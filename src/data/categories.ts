import type { LucideIcon } from 'lucide-react'
import { HardHat, Zap, Settings, Droplets, PaintBucket, Wrench } from 'lucide-react'
import type { CategoryId } from './products'

export type CategoryConfig = {
  id: CategoryId
  label: string
  Icon: LucideIcon
  iconBg: string
  textAccent: string
  borderAccent: string
}

export const CATEGORIES: CategoryConfig[] = [
  { id: 'ferramentas',       label: 'Ferramentas',        Icon: Wrench,      iconBg: 'bg-orange-500',  textAccent: 'text-orange-600',  borderAccent: 'border-orange-500'  },
  { id: 'mecanica',          label: 'Mecânica',            Icon: Settings,    iconBg: 'bg-blue-600',    textAccent: 'text-blue-700',    borderAccent: 'border-blue-600'    },
  { id: 'chapa-pintura',     label: 'Chapa e Pintura',     Icon: PaintBucket, iconBg: 'bg-violet-600',  textAccent: 'text-violet-700',  borderAccent: 'border-violet-600'  },
  { id: 'higiene-seguranca', label: 'Higiene e Segurança', Icon: HardHat,     iconBg: 'bg-emerald-600', textAccent: 'text-emerald-700', borderAccent: 'border-emerald-600' },
  { id: 'eletricidade',      label: 'Eletricidade',        Icon: Zap,         iconBg: 'bg-amber-500',   textAccent: 'text-amber-600',   borderAccent: 'border-amber-500'   },
  { id: 'lavagens',          label: 'Lavagens',            Icon: Droplets,    iconBg: 'bg-cyan-500',    textAccent: 'text-cyan-700',    borderAccent: 'border-cyan-500'    },
]
