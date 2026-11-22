import type { Template } from 'sanity'

// "New subcategory" starting points with fields already filled, used by the Subcategorias menu
// and by the "+ Novo…" links in the product's subcategory picker. They need parameters, so they're
// kept out of the global "Create new" menu (see sanity.config.ts).
export const TEMPLATE_IN_CATEGORY = 'subcategory-in-category'
export const TEMPLATE_WITH_PARENT = 'subcategory-with-parent'

export const subcategoryTemplates: Template[] = [
  {
    id: TEMPLATE_IN_CATEGORY,
    title: 'Subcategoria nesta categoria',
    schemaType: 'subcategory',
    parameters: [{ name: 'category', type: 'string' }],
    value: ({ category }: { category: string }) => ({ category }),
  },
  {
    id: TEMPLATE_WITH_PARENT,
    title: 'Tipo dentro desta subcategoria',
    schemaType: 'subcategory',
    parameters: [
      { name: 'category', type: 'string' },
      { name: 'parentId', type: 'string' },
    ],
    value: ({ category, parentId }: { category: string; parentId: string }) => ({
      category,
      parent: { _type: 'reference', _ref: parentId },
    }),
  },
]

export const PARAMETERIZED_TEMPLATES = new Set([TEMPLATE_IN_CATEGORY, TEMPLATE_WITH_PARENT])
