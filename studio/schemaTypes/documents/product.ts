import { defineField, defineType } from 'sanity'
import { PackageIcon } from '@sanity/icons'
import { CATEGORIES } from '../categories'

export const productType = defineType({
  name: 'product',
  title: 'Produto',
  type: 'document',
  icon: PackageIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nome',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'brand',
      title: 'Marca',
      type: 'string',
      options: {
        list: [
          { title: 'KROFTOOLS', value: 'KROFTOOLS' },
          { title: 'JBM', value: 'JBM' },
          { title: 'OSRAM', value: 'OSRAM' },
          { title: 'M-TECH', value: 'M-TECH' },
          { title: 'TOOLHUB', value: 'TOOLHUB' },
          { title: 'TAYSIL', value: 'TAYSIL' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [...CATEGORIES],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subcategory',
      title: 'Subcategoria',
      type: 'reference',
      to: [{ type: 'subcategory' }],
      description:
        'Escolha da lista (mostra só as subcategorias da categoria escolhida). Para criar uma nova, use "Criar novo" ou a secção Subcategoria.',
      options: {
        filter: ({ document }) => ({
          filter: 'category == $category',
          params: { category: document?.category ?? '' },
        }),
      },
      validation: (rule) =>
        rule.custom(async (value, context) => {
          if (!value?._ref) return true
          const client = context.getClient({ apiVersion: '2026-06-20' })
          const subCategory = await client.fetch<string | null>(
            '*[_id in [$id, "drafts." + $id]][0].category',
            { id: value._ref },
          )
          return !subCategory || subCategory === context.document?.category
            ? true
            : 'Esta subcategoria pertence a outra categoria.'
        }),
    }),
    // Legacy free-text subcategory — migrated to "subcategory" references. Kept hidden so old data still reads.
    defineField({
      name: 'sub',
      title: 'Subcategoria (antiga)',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'sku',
      title: 'Referência Interna',
      type: 'string',
      description: 'Código interno do cliente (ex: 0710-234307 FER)',
    }),
    defineField({
      name: 'image',
      title: 'Imagem (upload)',
      type: 'image',
      description: 'Faça upload de uma imagem do produto a partir do seu computador',
      options: { hotspot: true },
    }),
    defineField({
      name: 'imageUrl',
      title: 'URL da Imagem (alternativo)',
      type: 'url',
      description: 'Alternativa ao upload — cole o URL da imagem. A imagem carregada tem prioridade.',
    }),
    defineField({
      name: 'desc',
      title: 'Descrição',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      brand: 'brand',
      sub: 'subcategory.name',
      media: 'image',
    },
    prepare: ({ title, brand, sub, media }) => ({
      title,
      subtitle: [brand, sub].filter(Boolean).join(' · '),
      media,
    }),
  },
})
