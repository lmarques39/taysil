import { useState } from 'react'

type Props = {
  src: string
  alt: string
  /** Classes for the <img> box (size), e.g. "w-full h-full" */
  className?: string
  /** Shadow for cut-outs; defaults to a soft one under the product */
  shadowClassName?: string
  loading?: 'lazy' | 'eager'
}

/** How a photo is shown, decided from its own pixels once it loads */
type Look = 'cutout' | 'white' | 'photo'

const SHADOW = 'drop-shadow-[0_10px_12px_rgba(15,23,42,0.22)]'
const LOOK_CLASS: Record<Look, string> = {
  cutout: '',                       // + shadow, so the product sits on the card
  white: 'mix-blend-multiply',      // white background melts into the card; supplier reflections stay natural
  photo: '',
}

// Sanity's CDN resizes on the fly and serves WebP (keeping transparency) with auto=format.
// fit=max: fit inside the box, never enlarge (a 133×460 cut-out must not become 800×2766).
// One size for card AND modal, so opening a product reuses the photo the browser already has.
// The CDN also sends CORS headers for the site's own domains, so its pixels can be read.
const isSanity = (src: string) => src.startsWith('https://cdn.sanity.io/')
const sized = (src: string) => (isSanity(src) ? `${src}?w=800&h=800&fit=max&auto=format` : src)

/**
 * - cutout: background removed — a good part of the border AND of the photo is see-through
 *   (some opaque photos have a 1px transparent edge, so the border alone isn't enough)
 * - white: plain white background (supplier packshots)
 * - photo: anything else, or pixels not readable (no CORS)
 */
function detectLook(img: HTMLImageElement): Look {
  try {
    const k = Math.min(1, 256 / Math.max(img.naturalWidth, img.naturalHeight))
    const w = Math.max(2, Math.round(img.naturalWidth * k)), h = Math.max(2, Math.round(img.naturalHeight * k))
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return 'photo'
    ctx.drawImage(img, 0, 0, w, h)
    const { data } = ctx.getImageData(0, 0, w, h)

    let border = 0, clear = 0, white = 0
    const check = (x: number, y: number) => {
      const i = (y * w + x) * 4
      border++
      if (data[i + 3] < 128) clear++
      else if (data[i + 3] >= 250 && data[i] >= 235 && data[i + 1] >= 235 && data[i + 2] >= 235) white++
    }
    for (let x = 0; x < w; x++) { check(x, 0); check(x, h - 1) }
    for (let y = 1; y < h - 1; y++) { check(0, y); check(w - 1, y) }

    let clearTotal = 0
    for (let i = 3; i < data.length; i += 4) if (data[i] < 128) clearTotal++

    if (clear / border > 0.25 && clearTotal / (w * h) > 0.05) return 'cutout'
    if (white / border > 0.9) return 'white'
    return 'photo'
  } catch {
    return 'photo'
  }
}

/** Product photo shown whole (object-contain), styled by what it is: cut-out, white packshot or photo. */
export default function ProductPhoto({ src, alt, className = '', shadowClassName = SHADOW, loading = 'lazy' }: Props) {
  // Result belongs to the photo it was measured for, so a new src starts undecided without an effect
  const [detected, setDetected] = useState<{ src: string; look: Look } | null>(null)
  const look = detected?.src === src ? detected.look : null

  return (
    <img
      src={sized(src)}
      alt={alt}
      loading={loading}
      crossOrigin={isSanity(src) ? 'anonymous' : undefined}
      onLoad={e => setDetected({ src, look: detectLook(e.currentTarget) })}
      className={`object-contain transition-opacity duration-200 ${look ? 'opacity-100' : 'opacity-0'} ${
        look ? LOOK_CLASS[look] : ''
      } ${look === 'cutout' ? shadowClassName : ''} ${className}`}
    />
  )
}
