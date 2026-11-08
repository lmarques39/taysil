import { defineField, defineType } from 'sanity'
import { HomeIcon } from '@sanity/icons'
import { CATEGORIES as CATEGORY_LIST } from '../categories'

const CATEGORIES = CATEGORY_LIST.map(({ value, title }) => ({ name: value, title }))

// Sanity field names can't contain "-", so "chapa-pintura" becomes "chapa_pintura"
export const categoryFieldName = (id: string) => id.replace(/-/g, '_')

const categoryPhotoField = ({ name, title }: { name: string; title: string }) =>
  defineField({
    name: categoryFieldName(name),
    title,
    type: 'object',
    options: { collapsible: true, collapsed: false },
    fields: [
      defineField({
        name: 'product',
        title: 'Produto',
        type: 'reference',
        to: [{ type: 'product' }],
        description: `Escolha um produto de ${title} — a foto dele aparece no cartão da página inicial.`,
        options: {
          filter: 'category == $category && defined(coalesce(image.asset, imageUrl))',
          filterParams: { category: name },
        },
      }),
      defineField({
        name: 'image',
        title: 'Ou carregue uma foto',
        type: 'image',
        description: 'Opcional. Se carregar uma foto aqui, ela tem prioridade sobre a foto do produto.',
        options: { hotspot: true },
      }),
    ],
  })

export const homePageType = defineType({
  name: 'homePage',
  title: 'Página Inicial',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'categoryPhotos',
      title: 'Fotos das categorias',
      description:
        'Fotos dos 6 cartões "O que fornecemos" na página inicial. Se deixar uma categoria vazia, mantém-se a foto atual do site.',
      type: 'object',
      fields: CATEGORIES.map(categoryPhotoField),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Página Inicial' }),
  },
})
