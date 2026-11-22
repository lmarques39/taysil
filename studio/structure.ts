import type { StructureBuilder, StructureResolver } from 'sanity/structure'
import { AddIcon, EditIcon, FolderIcon, HomeIcon, PackageIcon, TagIcon, TagsIcon, ThListIcon } from '@sanity/icons'
import { CATEGORIES } from './schemaTypes/categories'
import { SINGLETONS } from './schemaTypes'
import { TEMPLATE_IN_CATEGORY, TEMPLATE_WITH_PARENT } from './templates'

const API_VERSION = '2026-06-20'

/**
 * Studio menu. "Subcategorias" is organised as Categoria › Subcategoria › (editar, tipos, produtos),
 * with "new" buttons that already fill in the category and, for types, the "Dentro de" field.
 */
export const structure: StructureResolver = (S, context) => {
  const client = context.getClient({ apiVersion: API_VERSION })

  // One subcategory: edit it, see/create the types inside it, see its products
  const subcategoryHub = async (id: string) => {
    const doc = await client.fetch<{ name?: string; category?: string } | null>(
      '*[_id in [$id, "drafts." + $id]][0]{name, category}',
      { id },
    )
    const name = doc?.name ?? 'Subcategoria'
    const category = doc?.category ?? ''
    const newType = () =>
      S.document()
        .schemaType('subcategory')
        .documentId(crypto.randomUUID())
        .initialValueTemplate(TEMPLATE_WITH_PARENT, { category, parentId: id })

    return S.list()
      .title(name)
      .items([
        S.listItem().id('edit').title(`Editar “${name}”`).icon(EditIcon)
          .child(S.document().schemaType('subcategory').documentId(id)),
        S.listItem().id('types').title(`Tipos dentro de ${name}`).icon(TagsIcon)
          .child(
            S.documentList()
              .title(`Tipos em ${name}`)
              .schemaType('subcategory')
              .apiVersion(API_VERSION)
              .filter('_type == "subcategory" && parent._ref == $id')
              .params({ id })
              .defaultOrdering([{ field: 'name', direction: 'asc' }])
              .initialValueTemplates([S.initialValueTemplateItem(TEMPLATE_WITH_PARENT, { category, parentId: id })]),
          ),
        S.listItem().id('new-type').title(`Novo tipo dentro de ${name}`).icon(AddIcon).child(newType),
        S.divider(),
        S.listItem().id('products').title(`Produtos em ${name}`).icon(PackageIcon)
          .child(
            S.documentList()
              .title(`Produtos em ${name}`)
              .schemaType('product')
              .apiVersion(API_VERSION)
              // Its own products and the products of the types inside it
              .filter('_type == "product" && (subcategory._ref == $id || subcategory->parent._ref == $id)')
              .params({ id })
              .defaultOrdering([{ field: 'name', direction: 'asc' }]),
          ),
      ])
  }

  // Subcategories of one category (types are inside each subcategory)
  const categorySubcategories = (S: StructureBuilder, category: { value: string; title: string }) =>
    S.documentList()
      .title(category.title)
      .schemaType('subcategory')
      .apiVersion(API_VERSION)
      .filter('_type == "subcategory" && category == $category && !defined(parent)')
      .params({ category: category.value })
      .defaultOrdering([{ field: 'name', direction: 'asc' }])
      .initialValueTemplates([S.initialValueTemplateItem(TEMPLATE_IN_CATEGORY, { category: category.value })])
      .child(subcategoryHub)

  const subcategories = S.listItem()
    .id('subcategorias')
    .title('Subcategorias')
    .icon(TagIcon)
    .child(
      S.list()
        .title('Subcategorias por categoria')
        .items([
          ...CATEGORIES.map((category) =>
            S.listItem().id(`cat-${category.value}`).title(category.title).icon(FolderIcon)
              .child(categorySubcategories(S, category)),
          ),
          S.divider(),
          S.documentTypeListItem('subcategory').title('Todas (lista simples)').icon(ThListIcon),
        ]),
    )

  return S.list()
    .title('Conteúdo')
    .items([
      S.listItem()
        .title('Página Inicial')
        .icon(HomeIcon)
        .child(S.document().schemaType('homePage').documentId('homePage')),
      S.divider(),
      ...S.documentTypeListItems().flatMap((item) => {
        const id = item.getId() ?? ''
        if (SINGLETONS.has(id)) return []
        // The plain subcategory list is replaced by the organised one, in the same place
        return id === 'subcategory' ? [subcategories] : [item]
      }),
    ])
}
