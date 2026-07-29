# Taysil

Modernized website and product catalog for [Taysil](https://taysil.pt), a Portuguese B2B wholesale distributor of automotive parts and tools based in Algueirão-Mem-Martins, Sintra.

**Live:** https://taysil-demo.vercel.app

## Stack

- [Vite](https://vitejs.dev/) + [React 19](https://react.dev/) + [React Router v7](https://reactrouter.com/)
- [TypeScript](https://www.typescriptlang.org/) (strict mode)
- [Tailwind CSS v4](https://tailwindcss.com/) (via `@tailwindcss/vite`, no config file)
- [Sanity CMS](https://www.sanity.io/) — product catalog and content management
- [Fuse.js](https://www.fusejs.io/) — fuzzy product search
- [Lucide React](https://lucide.dev/) — icons

## Project structure

```
src/
  pages/            Home, Empresa, Produtos, Catálogos, Contactos
  components/
    atoms/          GridOverlay, BrandBadge, NavArrowButton, DotIndicator
    molecules/      ProductCard, ModalDotPagination
    organisms/      Navbar, Footer, CategoryGrid, ProductModal, ProductSidebar, ...
    templates/      PageLayout
  hooks/            useProductFilter, useCarousel, useModalNavigation
  context/          CookieConsentContext
  data/             products.ts (types only), categories.ts
  lib/              sanity.ts (Sanity client)
studio/             Sanity Studio config + schema (deployed separately)
public/             Static assets, product images, SEO files
```

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

Other scripts:

```bash
npm run build       # production build
npm run preview     # preview the production build locally
npm run typecheck   # tsc --noEmit
```

## Product data (Sanity)

Product data is managed in Sanity CMS, not hardcoded. The frontend fetches products via GROQ in `src/hooks/useProductFilter.ts`.

- Studio: https://taysil.sanity.studio/
- Project ID: `wi8pxzpf`, dataset: `production`

Schema changes must be deployed via the Sanity MCP tools (`deploy_schema` + `deploy_studio`) rather than the Sanity CLI — `sanity schema deploy` crashes on some machines.

## Deployment

Hosted on [Vercel](https://vercel.com/), connected to GitHub for automatic deploys.

- `main` → production (https://taysil-demo.vercel.app)
- `dev` → preview deployment

Workflow: branch off `dev`, push, verify on the preview URL, then open a PR into `main`.

## Roadmap

1. ✅ **Phase 1** — Sanity CMS product catalog (complete)
2. **Phase 2** — Supabase for user accounts and order history
3. **Phase 3** — Stripe checkout + AT-certified invoicing for full e-commerce

## License

Private project — all rights reserved.
