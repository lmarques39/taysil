import { useState } from 'react'

type Props = {
  src: string
  alt: string
  /**
   * Whether the photo has no background (a cut-out PNG). Cut-outs get a soft shadow under the product.
   * 'auto' (default) checks the photo's border once it loads — so a transparent PNG uploaded by the
   * client looks right before the background-removal script has run.
   */
  transparent?: boolean | 'auto'
  /** Classes for the <img> box (size), e.g. "w-full h-full" */
  className?: string
  /** Shadow for cut-outs; defaults to a soft one under the product */
  shadowClassName?: string
  loading?: 'lazy' | 'eager'
}

const SHADOW = 'drop-shadow-[0_10px_12px_rgba(15,23,42,0.22)]'

// Sanity's CDN resizes on the fly and serves WebP (keeping transparency) with auto=format.
// fit=max: fit inside the box, never enlarge (a 133×460 cut-out must not become 800×2766).
// One size for card AND modal, so opening a product reuses the photo the browser already has.
// The CDN also sends CORS headers for the site's own domains, so its pixels can be read.
const isSanity = (src: string) => src.startsWith('https://cdn.sanity.io/')
const sized = (src: string) => (isSanity(src) ? `${src}?w=800&h=800&fit=max&auto=format` : src)

/** True when the background was removed: a good part of the border is see-through... */
function hasTransparentBackground(img: HTMLImageElement): boolean {
  try {
    const k = Math.min(1, 256 / Math.max(img.naturalWidth, img.naturalHeight))
    const w = Math.max(2, Math.round(img.naturalWidth * k)), h = Math.max(2, Math.round(img.naturalHeight * k))
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return false
    ctx.drawImage(img, 0, 0, w, h)
    const { data } = ctx.getImageData(0, 0, w, h)
    let border = 0, clear = 0
    const check = (x: number, y: number) => { border++; if (data[(y * w + x) * 4 + 3] < 128) clear++ }
    for (let x = 0; x < w; x++) { check(x, 0); check(x, h - 1) }
    for (let y = 1; y < h - 1; y++) { check(0, y); check(w - 1, y) }
    // ...and a real share of the whole photo is see-through (some opaque photos have a 1px transparent edge)
    let clearTotal = 0
    for (let i = 3; i < data.length; i += 4) if (data[i] < 128) clearTotal++
    return clear / border > 0.25 && clearTotal / (w * h) > 0.05
  } catch {
    return false // pixels not readable (no CORS): treat as a normal photo
  }
}

/** Product photo shown whole (object-contain); cut-outs get a soft shadow so they sit on the card. */
export default function ProductPhoto({
  src,
  alt,
  transparent = 'auto',
  className = '',
  shadowClassName = SHADOW,
  loading = 'lazy',
}: Props) {
  // Result belongs to the photo it was measured for, so a new src starts undecided without an effect
  const [detected, setDetected] = useState<{ src: string; transparent: boolean } | null>(null)
  const isCutout = transparent === 'auto' ? detected?.src === src && detected.transparent : transparent

  return (
    <img
      src={sized(src)}
      alt={alt}
      loading={loading}
      crossOrigin={transparent === 'auto' && isSanity(src) ? 'anonymous' : undefined}
      onLoad={transparent === 'auto' ? e => setDetected({ src, transparent: hasTransparentBackground(e.currentTarget) }) : undefined}
      className={`object-contain ${isCutout ? shadowClassName : ''} ${className}`}
    />
  )
}
