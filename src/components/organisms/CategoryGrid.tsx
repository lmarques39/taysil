import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { CATEGORIES } from '../../data/categories'
import { sanityClient, HOME_CATEGORY_PHOTOS_QUERY, type HomeCategoryPhoto } from '../../lib/sanity'
import ProductPhoto from '../atoms/ProductPhoto'

// Fallback images, used when the client hasn't chosen a photo in Sanity ("Página Inicial")
const catImages: Record<string, string | null> = {
  ferramentas:         '/cat-ferramentas.jpg',
  mecanica:            '/cat-mecanica-taysil.png',
  'chapa-pintura':     '/cat-chapa-taysil.png',
  'higiene-seguranca': '/cat-higiene-taysil.png',
  eletricidade:        '/cat-eletricidade.jpg',
  lavagens:            '/cat-lavagens-taysil.png',
}

// Fallback product cut-outs (transparent PNG), shown whole; the other fallbacks fill the card (cover)
const containedFallbacks = new Set([
  '/cat-mecanica-taysil.png',
  '/cat-chapa-taysil.png',
  '/cat-higiene-taysil.png',
  '/cat-lavagens-taysil.png',
])

type PhotoState = 'loading' | Record<string, HomeCategoryPhoto>
type CardPhoto = { src: string; cover: boolean }

function cardPhoto(categoryId: string, cms: HomeCategoryPhoto): CardPhoto | null {
  // Cut-out made by the background-removal script
  if (cms?.cutout) return { src: cms.cutout, cover: false }
  // Photo chosen in Studio, not cut out yet: shown whole (gets the shadow if it's already a transparent PNG)
  if (cms?.url) return { src: cms.url, cover: false }
  const fallback = catImages[categoryId]
  if (!fallback) return null
  return { src: fallback, cover: !containedFallbacks.has(fallback) }
}

// Light backdrop behind cut-out products
const BACKDROP = 'bg-[radial-gradient(ellipse_at_50%_35%,#f4f4f5_0%,#e4e4e7_45%,#c9c9cf_100%)]'

export default function CategoryGrid() {
  const [cmsPhotos, setCmsPhotos] = useState<PhotoState>('loading')

  useEffect(() => {
    sanityClient
      .fetch<Record<string, HomeCategoryPhoto> | null>(HOME_CATEGORY_PHOTOS_QUERY)
      .then(data => setCmsPhotos(data ?? {}))
      .catch(() => setCmsPhotos({}))
  }, [])

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-red-500 text-sm font-semibold uppercase tracking-widest mb-3">O que fornecemos</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            6 categorias, tudo num só lugar.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.map(cat => {
            const photo = cmsPhotos === 'loading' ? null : cardPhoto(cat.id, cmsPhotos[cat.id])
            const Icon = cat.Icon
            return (
              <Link
                key={cat.id}
                to={`/produtos?category=${cat.id}`}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] flex flex-col justify-end bg-slate-900"
              >
                {cmsPhotos === 'loading' ? (
                  <div className={`absolute inset-0 ${BACKDROP}`} />
                ) : photo && !photo.cover ? (
                  <>
                    {/* Product on a light backdrop — a cut-out stands on it with a soft shadow */}
                    <div className={`absolute inset-0 ${BACKDROP}`} />
                    <div className="absolute inset-0 flex items-center justify-center pt-6 pb-20 px-8 group-hover:scale-105 transition-transform duration-500">
                      <ProductPhoto
                        src={photo.src}
                        alt={cat.label}
                        className="w-full h-full"
                        shadowClassName="drop-shadow-[0_14px_14px_rgba(15,23,42,0.28)]"
                      />
                    </div>
                  </>
                ) : photo ? (
                  <img
                    src={photo.src}
                    alt={cat.label}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                    <Icon size={72} className="text-red-500 opacity-30" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                <div className="relative p-6">
                  <p className="text-white font-bold text-lg leading-tight">{cat.label}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-400 group-hover:text-red-400 transition-colors">
                    Ver produtos <ArrowRight size={13} />
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
