---
name: extract-logo-from-live-site
description: Extract images (logo or CSS background) from a live website (including Next.js sites) using Playwright, download them to public/, and apply them to the project.
---

## When to use
When rebuilding or modernizing a client's website and you need to reuse their existing logo without having access to their source assets.

## Steps

### 1. Navigate to the live site
```
browser_navigate → https://www.client-site.com
```

### 2. Find the logo's resolved src URL
```
browser_evaluate → () => document.querySelector('img[alt="Logo Alt Text"]')?.src
```
Returns the full resolved URL. **Gotcha for Next.js sites:** the URL will look like
`https://site.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.abc123.jpg&w=640&q=75`
— this is Next.js's image optimization proxy. Use this URL directly with curl; it serves the actual image.

### 3. Download to `public/`
```bash
curl -s "<resolved-url>" -o public/logo.jpg
file public/logo.jpg  # verify it's a real image file
```

### 4. Use in Navbar
Replace any placeholder element with:
```jsx
<img src="/logo.jpg" alt="Brand Name" className="h-8 w-auto object-contain" />
```
Adjust `h-8` / `h-10` to taste. Use `object-contain` to preserve aspect ratio.

### 5. Use in Footer
```jsx
<img src="/logo.jpg" alt="Brand Name" className="h-9 w-auto object-contain" />
```
Slightly taller than the navbar version works well for footer branding blocks.

### 6. Update the browser tab favicon (`index.html`)
```html
<link rel="icon" type="image/jpeg" href="/logo.jpg" />
```
Replace any existing `<link rel="icon" ...>` line. Modern browsers support JPEG favicons; no conversion needed.

---

## Extracting CSS background images

When the image you need is a CSS `background-image` (not an `<img>` tag), use this snippet:

```js
browser_evaluate → () => {
  const els = [...document.querySelectorAll('*')].filter(el => {
    const bg = window.getComputedStyle(el).backgroundImage;
    return bg && bg !== 'none';
  });
  return els.map(el => ({
    cls: el.className.toString().slice(0, 80),
    bg: window.getComputedStyle(el).backgroundImage
  }));
}
```

The `bg` value will look like `url("https://site.com/_next/static/media/gears.abc123.jpg")` — strip the `url("…")` wrapper and curl the inner URL directly.

**Example** — Taysil hero image:
```bash
curl -sL "https://www.taysil.pt/_next/static/media/gears.9554ab88.jpg" -o public/hero-gears.jpg
```
Then in JSX: `style={{ backgroundImage: 'url(/hero-gears.jpg)' }}` with a dark overlay div on top.

## Notes
- If the logo has a white background and the navbar/footer is dark, the white box is acceptable and matches the original branding.
- If you need a transparent version, ask the client for an SVG/PNG with transparency; do not try to CSS-hack transparency out of a JPEG.
