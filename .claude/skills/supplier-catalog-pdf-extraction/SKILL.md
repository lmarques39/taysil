---
name: supplier-catalog-pdf-extraction
description: Install pypdf, locate a supplier's catalog PDF, and extract the table of contents to get real product categories and subcategory names for the Produtos page. Use when updating or expanding Taysil's product data from KROFTOOLS or JBM.
---

## When to use
When a supplier's catalog PDF needs to be mined for product category names and subcategory lists to populate `src/pages/Produtos.jsx`. Better than the website nav for JBM (which buries categories); better than guessing product names.

## Step 1 — Install pypdf
```bash
pip3 install pypdf
```

## Step 2 — Find the catalog PDF URL
JBM serves catalogs from a **different subdomain** than the main site. The main site is `jbmcamp.com` but catalogs come from `publi.jbmcamp.com`. The pattern:
```
https://publi.jbmcamp.com/CATALOGO/<year>/PT_CAT<year>_JBM_LQ.pdf
```
Current known URL (2026 catalog): `https://publi.jbmcamp.com/CATALOGO/2026/PT_CAT2026_JBM_LQ.pdf`

**Gotcha:** Navigating to the JBM catalog download page (`jbmcamp.com/pt/descargas-de-catalogos.html`) triggers the browser to open a new tab with the PDF URL — use `browser_snapshot` after navigating there to spot it in the "Open tabs" list.

KROFTOOLS 2025 catalog links from cld.pt — these may DNS-fail from non-EU environments. Use the JBM PDF instead, or fall back to KROFTOOLS website navigation.

## Step 3 — Download the PDF
```bash
curl -sL --max-time 60 "<pdf-url>" -o /tmp/catalog.pdf
wc -c /tmp/catalog.pdf   # sanity check size
file /tmp/catalog.pdf    # confirm "PDF document"
```
JBM 2026 is 156MB / 468 pages — allow up to 60s.

## Step 4 — Extract the table of contents
Pages 2–5 of the JBM catalog contain the full category index as embedded text. Read them:
```python
from pypdf import PdfReader
reader = PdfReader("/tmp/catalog.pdf")
for i in range(min(15, len(reader.pages))):
    text = reader.pages[i].extract_text()
    if text and text.strip():
        print(f"\n--- PAGE {i+1} ---")
        print(text)
```
Run as: `python3 << 'EOF' ... EOF`

**What you get:** Page 2 lists all major sections with page numbers. Pages 3–5 break each section into subcategories. This is the authoritative list of product lines to populate `subcategories` arrays in `Produtos.jsx`.

## Step 5 — Map to Taysil's 6 categories
JBM → Taysil mapping used in this project:
| JBM section | Taysil category |
|---|---|
| Ferramentas Manuais, Ferramentas Pneumáticas, Elétricas s/ Fio, Hidráulicas, Mobiliário | **Ferramentas** |
| Ferramenta Especial, Sincronismo, Travões, Lubrificação, Suspensão, AC | **Mecânica** |
| Ferramentas para Carroçaria, Restauração Faróis, Vidros, Detailing | **Chapa e Pintura** |
| Segurança e EPI, Roupas de Trabalho, Primeiros Socorros, Sinalização | **Higiene e Segurança** |
| Elétricas (baterias, soldadura, diagnóstico), Luzes, Mobilidade EV | **Eletricidade** |
| Cuidados com Veículo, Detailing, Consumíveis limpeza | **Lavagens** |

## Notes
- Many catalog pages are image-based (no extractable text). The TOC pages (2–5) are text-based and reliable.
- For KROFTOOLS subcategories, the website footer nav is faster than the PDF: navigate to `kroftools.com/pt/` and read the footer link list — it gives all category URLs directly.
- See [[supplier-references]] for current known URLs.
