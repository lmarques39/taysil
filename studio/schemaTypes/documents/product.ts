import { defineField, defineType } from 'sanity'
import { PackageIcon } from '@sanity/icons'

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
        list: [
          { title: 'Ferramentas', value: 'ferramentas' },
          { title: 'Mecânica', value: 'mecanica' },
          { title: 'Chapa e Pintura', value: 'chapa-pintura' },
          { title: 'Higiene e Segurança', value: 'higiene-seguranca' },
          { title: 'Eletricidade', value: 'eletricidade' },
          { title: 'Lavagens', value: 'lavagens' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sub',
      title: 'Subcategoria',
      type: 'string',
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
      subtitle: 'brand',
    },
  },
})
