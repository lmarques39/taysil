import { defineField, defineType } from 'sanity'
import { DocumentPdfIcon } from '@sanity/icons'

export const catalogType = defineType({
  name: 'catalog',
  title: 'Catálogo',
  type: 'document',
  icon: DocumentPdfIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nome',
      type: 'string',
      description: 'Título grande no site (ex: KROFTOOLS, JBM, TAYSIL).',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'string',
      description: 'Linha pequena por cima do nome (ex: Catálogo Geral · 2026).',
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'file',
      title: 'Ficheiro PDF (upload)',
      type: 'file',
      description: 'Carregue o PDF do catálogo a partir do computador.',
      options: { accept: 'application/pdf' },
    }),
    defineField({
      name: 'url',
      title: 'Link do catálogo (alternativo)',
      type: 'url',
      description: 'Alternativa ao upload — cole o link do fornecedor. O PDF carregado tem prioridade.',
    }),
    defineField({
      name: 'order',
      title: 'Ordem',
      type: 'number',
      description: 'Posição na página (1 aparece primeiro).',
      initialValue: 10,
    }),
  ],
  validation: (rule) =>
    rule.custom((doc) =>
      doc?.file || doc?.url ? true : 'Carregue um PDF ou cole o link do catálogo.',
    ),
  orderings: [
    { title: 'Ordem na página', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'subtitle' },
  },
})
