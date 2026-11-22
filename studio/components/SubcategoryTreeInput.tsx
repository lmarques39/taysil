import { useEffect, useMemo, useState } from 'react'
import { set, unset, useClient, useFormValue, type ObjectInputProps, type Reference } from 'sanity'
import { IntentLink } from 'sanity/router'
import { Box, Button, Card, Flex, Spinner, Stack, Text } from '@sanity/ui'
import { categoryTitle } from '../schemaTypes/categories'
import { TEMPLATE_IN_CATEGORY, TEMPLATE_WITH_PARENT } from '../templates'

type Sub = { _id: string; name: string; parentId: string | null; count: number }

// Published subcategories of the category, with how many published products use each one
const QUERY = `*[_type == "subcategory" && category == $category && !(_id in path("drafts.**"))] | order(name asc) {
  _id, name, "parentId": parent._ref,
  "count": count(*[_type == "product" && subcategory._ref == ^._id && !(_id in path("drafts.**"))])
}`

/**
 * Product → Subcategoria: instead of a search box, shows every subcategory of the chosen category as a
 * tree (types inside their subcategory) and picks one with a click. Stores the same reference as before.
 */
export function SubcategoryTreeInput(props: ObjectInputProps<Reference>) {
  const { value, onChange, readOnly } = props
  const client = useClient({ apiVersion: '2026-06-20' })
  const category = useFormValue(['category']) as string | undefined
  const [subs, setSubs] = useState<Sub[] | null>(null)

  // Load the list, and reload it whenever a subcategory is created/renamed (e.g. in another tab)
  useEffect(() => {
    if (!category) return
    let alive = true
    const load = () => client.fetch<Sub[]>(QUERY, { category }).then((r) => alive && setSubs(r))
    setSubs(null)
    load()
    const sub = client.listen('*[_type == "subcategory"]', {}, { visibility: 'query' }).subscribe(() => load())
    return () => {
      alive = false
      sub.unsubscribe()
    }
  }, [client, category])

  const { roots, children } = useMemo(() => {
    const ids = new Set((subs ?? []).map((s) => s._id))
    const kids = new Map<string, Sub[]>()
    const top: Sub[] = []
    for (const s of subs ?? []) {
      if (s.parentId && ids.has(s.parentId)) kids.set(s.parentId, [...(kids.get(s.parentId) ?? []), s])
      else top.push(s)
    }
    return { roots: top, children: kids }
  }, [subs])

  if (!category) {
    return (
      <Card padding={3} radius={2} tone="caution" border>
        <Text size={1}>Escolha primeiro a categoria acima — depois aparecem aqui as subcategorias dela.</Text>
      </Card>
    )
  }
  if (!subs) {
    return (
      <Flex padding={3} gap={2} align="center">
        <Spinner muted />
        <Text size={1} muted>A carregar subcategorias…</Text>
      </Flex>
    )
  }

  const selectedId = value?._ref
  const selected = subs.find((s) => s._id === selectedId)
  // "+ Novo tipo" is offered under the subcategory currently chosen (or the parent of the chosen type)
  const openParentId = selected ? (selected.parentId ?? selected._id) : undefined
  const pick = (id: string) => !readOnly && onChange(set({ _type: 'reference', _ref: id }))

  const renderRow = (sub: Sub) => {
    const isSelected = sub._id === selectedId
    return (
      <Card
        key={sub._id}
        as="button"
        type="button"
        onClick={() => pick(sub._id)}
        disabled={readOnly}
        padding={2}
        radius={2}
        tone={isSelected ? 'primary' : 'default'}
        pressed={isSelected}
        style={{ width: '100%', textAlign: 'left', cursor: readOnly ? 'default' : 'pointer' }}
      >
        <Flex align="center" gap={2}>
          <span
            aria-hidden
            style={{
              width: 14, height: 14, borderRadius: '50%', flex: 'none',
              border: `2px solid ${isSelected ? 'var(--card-focus-ring-color)' : 'var(--card-border-color)'}`,
              boxShadow: isSelected ? 'inset 0 0 0 3px var(--card-bg-color)' : undefined,
              background: isSelected ? 'var(--card-focus-ring-color)' : undefined,
            }}
          />
          <Box flex={1}>
            <Text size={1} weight={isSelected ? 'semibold' : 'regular'}>{sub.name}</Text>
          </Box>
          <Text size={1} muted>{sub.count}</Text>
        </Flex>
      </Card>
    )
  }

  const linkStyle = { fontSize: 13, textDecoration: 'none', display: 'inline-block', padding: '6px 8px' }

  return (
    <Stack space={2}>
      <Card padding={1} radius={2} border>
        <Stack space={1}>
          {roots.length === 0 && (
            <Box padding={2}>
              <Text size={1} muted>Ainda não há subcategorias em {categoryTitle(category)}.</Text>
            </Box>
          )}
          {roots.map((root) => (
            <Stack key={root._id} space={1}>
              {renderRow(root)}
              {(children.get(root._id)?.length || openParentId === root._id) && (
                <Box style={{ marginLeft: 18, paddingLeft: 6, borderLeft: '1px solid var(--card-border-color)' }}>
                  <Stack space={1}>
                    {(children.get(root._id) ?? []).map(renderRow)}
                    {openParentId === root._id && !readOnly && (
                      <IntentLink
                        intent="create"
                        params={[{ type: 'subcategory', template: TEMPLATE_WITH_PARENT }, { category, parentId: root._id }]}
                        style={linkStyle}
                      >
                        + Novo tipo dentro de {root.name}
                      </IntentLink>
                    )}
                  </Stack>
                </Box>
              )}
            </Stack>
          ))}
          {!readOnly && (
            <IntentLink
              intent="create"
              params={[{ type: 'subcategory', template: TEMPLATE_IN_CATEGORY }, { category }]}
              style={linkStyle}
            >
              + Nova subcategoria em {categoryTitle(category)}
            </IntentLink>
          )}
        </Stack>
      </Card>
      <Flex align="center" gap={2}>
        <Box flex={1}>
          <Text size={1} muted>
            {selected
              ? <>Escolhido: <strong>{selected.parentId ? `${subs.find((s) => s._id === selected.parentId)?.name ?? ''} › ` : ''}{selected.name}</strong></>
              : selectedId
                ? 'A subcategoria escolhida não pertence a esta categoria — escolha outra.'
                : 'Nenhuma subcategoria escolhida.'}
          </Text>
        </Box>
        {selectedId && !readOnly && (
          <Button mode="bleed" fontSize={1} padding={2} text="Limpar" onClick={() => onChange(unset())} />
        )}
      </Flex>
    </Stack>
  )
}
