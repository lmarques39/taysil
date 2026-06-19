---
name: vite-react-tailwind-v4-manual-setup
description: Manually scaffold a Vite + React + Tailwind CSS v4 project in a non-empty directory (where npm create vite fails). Use when the target dir already has files and the interactive scaffolder cancels.
---

## When to use
`npm create vite@latest . -- --template react` cancels if the directory is non-empty. Use this manual procedure instead.

## Steps

### 1. Init package.json with `type: module`
```bash
npm init -y
```
Then update `package.json` to add `"type": "module"` and the scripts block:
```json
{
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### 2. Install dependencies
```bash
npm install react react-dom react-router-dom
npm install -D vite @vitejs/plugin-react tailwindcss @tailwindcss/vite
```
Optional but recommended: `npm install lucide-react`

### 3. Create `vite.config.js`
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```
**Gotcha:** Tailwind v4 uses `@tailwindcss/vite` — NOT PostCSS. Do NOT create `postcss.config.js` or `tailwind.config.js`; they are not needed and will cause conflicts.

### 4. Create `index.html` at the project root
```html
<!doctype html>
<html lang="pt">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/jpeg" href="/logo.jpg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### 5. Create `src/index.css`
```css
@import "tailwindcss";
```
That single line activates all of Tailwind v4. Custom theme tokens use `@theme { }` blocks here if needed.

### 6. Create `src/main.jsx`
```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode><App /></StrictMode>
)
```

### 7. Create `src/App.jsx` and page/component files under `src/`

### 8. Verify
```bash
npm run dev
# Expected: VITE ready on http://localhost:5173
curl -s -o /dev/null -w "%{http_code}" http://localhost:5173  # should return 200
```

## Key differences from Tailwind v3
- No `tailwind.config.js`
- No `postcss.config.js`
- Plugin is `@tailwindcss/vite`, imported in `vite.config.js`
- CSS entry point uses `@import "tailwindcss"` instead of `@tailwind base/components/utilities`
