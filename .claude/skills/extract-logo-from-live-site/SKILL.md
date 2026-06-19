---
name: extract-logo-from-live-site
description: Extract a logo image from a live website (including Next.js sites) using Playwright, download it to public/, and apply it to the navbar, footer, and browser tab favicon.
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

## Notes
- If the logo has a white background and the navbar/footer is dark, the white box is acceptable and matches the original branding.
- If you need a transparent version, ask the client for an SVG/PNG with transparency; do not try to CSS-hack transparency out of a JPEG.
