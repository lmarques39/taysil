import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { HomeIcon } from '@sanity/icons'
import { schemaTypes, SINGLETONS } from './schemaTypes'

const SINGLETON_ACTIONS = new Set(['publish', 'discardChanges', 'restore'])

export default defineConfig({
  name: 'taysil',
  title: 'Taysil',
  projectId: 'wi8pxzpf',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Conteúdo')
          .items([
            S.listItem()
              .title('Página Inicial')
              .icon(HomeIcon)
              .child(S.document().schemaType('homePage').documentId('homePage')),
            S.divider(),
            ...S.documentTypeListItems().filter((item) => !SINGLETONS.has(item.getId() ?? '')),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
    // Hide singletons from the global "Create new" menu
    templates: (templates) => templates.filter(({ schemaType }) => !SINGLETONS.has(schemaType)),
  },
  document: {
    // Singletons can only be edited and published, not duplicated or deleted
    actions: (input, context) =>
      SINGLETONS.has(context.schemaType)
        ? input.filter(({ action }) => action && SINGLETON_ACTIONS.has(action))
        : input,
  },
})
