import { defineField, defineType } from 'sanity'
import { TagIcon } from '@sanity/icons'
import { CATEGORIES, categoryTitle } from '../categories'

export const subcategoryType = defineType({
  name: 'subcategory',
  title: 'Subcategoria',
  type: 'document',
  icon: TagIcon,
  description:
    'Mudar o nome aqui atualiza automaticamente todos os produtos desta subcategoria no site.',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'string',
      description: 'A subcategoria aparece no site dentro desta categoria.',
      options: { list: [...CATEGORIES], layout: 'radio' },
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Categoria e nome',
      name: 'categoryName',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'name', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: { title: 'name', category: 'category' },
    prepare: ({ title, category }) => ({ title, subtitle: categoryTitle(category) }),
  },
})
