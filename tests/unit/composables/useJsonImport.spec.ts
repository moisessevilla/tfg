// tests/unit/composables/useJsonImport.spec.ts
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { useJsonImport } from '../../../src/composables/useJsonImport'

describe('useJsonImport', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('debe importar JSON válido', async () => {
    const { importFromText, importSuccess } = useJsonImport()

    const validJson = JSON.stringify({
      name: 'Test Form',
      elements: [
        {
          type: 'text-input',
          props: {
            label: 'Nombre',
            required: true,
          },
        },
      ],
    })

    const result = await importFromText(validJson)
    expect(result).toBe(true)
    expect(importSuccess.value).toBe(true)
  })

  it('debe rechazar JSON sin nombre', async () => {
    const { importFromText, importError } = useJsonImport()

    const invalidJson = JSON.stringify({
      elements: [],
    })

    const result = await importFromText(invalidJson)
    expect(result).toBe(false)
    expect(importError.value).toContain('nombre válido')
  })

  it('debe convertir tipos antiguos', async () => {
    const { importFromText } = useJsonImport()

    const oldFormat = JSON.stringify({
      name: 'Old Format',
      elements: [
        {
          type: 'text', // tipo antiguo
          props: { label: 'Campo' },
        },
      ],
    })

    const result = await importFromText(oldFormat)
    expect(result).toBe(true)
  })
})
