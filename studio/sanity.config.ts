import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes, SINGLETONS } from './schemaTypes'
import { structure } from './structure'
import { subcategoryTemplates, PARAMETERIZED_TEMPLATES } from './templates'

const SINGLETON_ACTIONS = new Set(['publish', 'discardChanges', 'restore'])

export default defineConfig({
  name: 'taysil',
  title: 'Taysil',
  projectId: 'wi8pxzpf',
  dataset: 'production',
  plugins: [
    structureTool({ structure }),
  ],
  schema: {
    types: schemaTypes,
    // Hide singletons from the global "Create new" menu; add the pre-filled subcategory templates
    templates: (templates) => [
      ...templates.filter(({ schemaType }) => !SINGLETONS.has(schemaType)),
      ...subcategoryTemplates,
    ],
  },
  document: {
    // Pre-filled templates need a category/parent, so they're only offered where that's known
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === 'global' ? prev.filter((t) => !PARAMETERIZED_TEMPLATES.has(t.templateId)) : prev,
    // Singletons can only be edited and published, not duplicated or deleted
    actions: (input, context) =>
      SINGLETONS.has(context.schemaType)
        ? input.filter(({ action }) => action && SINGLETON_ACTIONS.has(action))
        : input,
  },
})
