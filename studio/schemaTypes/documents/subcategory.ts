import { defineField, defineType } from 'sanity'
import { TagIcon, TagsIcon } from '@sanity/icons'
import { CATEGORIES, categoryTitle } from '../categories'

export const subcategoryType = defineType({
  name: 'subcategory',
  title: 'Subcategoria',
  type: 'document',
  icon: TagIcon,
  description:
    'Mudar o nome aqui atualiza automaticamente todos os produtos desta subcategoria no site. ' +
    'Para criar um tipo dentro de outra subcategoria (ex: "Chaves Torx" dentro de "Chaves"), escolha-a em "Dentro de".',
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
    // Optional parent: a subcategory with a parent is a 3rd level ("Ferramentas › Chaves › Chaves Torx").
    // Only one extra level, so the list on the site stays simple.
    defineField({
      name: 'parent',
      title: 'Dentro de (opcional)',
      type: 'reference',
      to: [{ type: 'subcategory' }],
      description:
        'Deixe vazio para uma subcategoria normal. Escolha outra subcategoria para esta aparecer no site dentro dela, como um tipo mais específico.',
      options: {
        disableNew: true,
        filter: ({ document }) => ({
          filter: 'category == $category && !defined(parent) && !(_id in [$id, "drafts." + $id])',
          params: {
            category: document?.category ?? '',
            id: (document?._id ?? '').replace(/^drafts\./, ''),
          },
        }),
      },
      validation: (rule) =>
        rule.custom(async (value, context) => {
          if (!value?._ref) return true
          const id = (context.document?._id ?? '').replace(/^drafts\./, '')
          if (value._ref === id) return 'Uma subcategoria não pode estar dentro dela própria.'
          const client = context.getClient({ apiVersion: '2026-06-20' })
          const { parent, children } = await client.fetch<{
            parent: { category?: string; hasParent: boolean } | null
            children: number
          }>(
            `{
              "parent": *[_id in [$ref, "drafts." + $ref]][0]{ category, "hasParent": defined(parent) },
              "children": count(*[_type == "subcategory" && parent._ref == $id])
            }`,
            { ref: value._ref, id },
          )
          if (parent?.hasParent) return 'Só é possível um nível: escolha uma subcategoria que não esteja dentro de outra.'
          if (parent?.category && parent.category !== context.document?.category)
            return 'A subcategoria escolhida pertence a outra categoria.'
          if (children > 0)
            return 'Esta subcategoria já tem outras dentro dela, por isso não pode ficar dentro de outra.'
          return true
        }),
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
    select: { title: 'name', category: 'category', parent: 'parent.name' },
    prepare: ({ title, category, parent }) => ({
      title: parent ? `${parent} › ${title}` : title,
      subtitle: categoryTitle(category),
      media: parent ? TagsIcon : TagIcon,
    }),
  },
})
