// tests/unit/components/JsonImportModal.spec.ts
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import JsonImportModal from '../../../src/components/JsonImportModal.vue'

describe('JsonImportModal', () => {
  beforeEach(() => {
    // Inicializar Pinia antes de cada test
    setActivePinia(createPinia())
  })

  it('debe mostrar modal cuando isOpen es true', () => {
    const wrapper = mount(JsonImportModal, {
      props: {
        isOpen: true,
      },
    })

    expect(wrapper.find('.modal-overlay').exists()).toBe(true)
  })

  it('debe ocultar modal cuando isOpen es false', () => {
    const wrapper = mount(JsonImportModal, {
      props: {
        isOpen: false,
      },
    })

    expect(wrapper.find('.modal-overlay').exists()).toBe(false)
  })

  it('debe emitir close al hacer clic en cerrar', async () => {
    const wrapper = mount(JsonImportModal, {
      props: {
        isOpen: true,
      },
    })

    await wrapper.find('.close-btn').trigger('click')

    expect(wrapper.emitted('close')).toBeTruthy()
  })
})
