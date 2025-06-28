// tests/unit/views/Dashboard.spec.ts
import { mount } from '@vue/test-utils'
import type { Pinia } from 'pinia'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useFormBuilderStore } from '../../../src/stores/formBuilder'
import Dashboard from '../../../src/views/Dashboard.vue'

// Mock del router
const mockRouter = {
  push: vi.fn(),
}

describe('Dashboard View', () => {
  let pinia: Pinia

  beforeEach(() => {
    // Crear nueva instancia de Pinia para cada test
    pinia = createPinia()
    setActivePinia(pinia)

    // Limpiar mocks
    vi.clearAllMocks()
  })

  it('debe mostrar estado vacío cuando no hay formularios', async () => {
    const wrapper = mount(Dashboard, {
      global: {
        plugins: [pinia],
        mocks: {
          $router: mockRouter,
        },
        stubs: {
          RouterLink: true,
        },
      },
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.find('.empty-state').exists()).toBe(true)
    expect(wrapper.text()).toContain('¡Crea tu primer formulario!')
  })

  it('debe mostrar formularios guardados', async () => {
    const store = useFormBuilderStore()

    // Agregar formulario de prueba directamente al store
    store.savedForms = [
      {
        id: 'test-123',
        name: 'Mi Formulario Test',
        description: 'Descripción test',
        elements: [],
      },
    ]

    const wrapper = mount(Dashboard, {
      global: {
        plugins: [pinia],
        mocks: {
          $router: mockRouter,
        },
        stubs: {
          RouterLink: true,
        },
      },
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.find('.form-card').exists()).toBe(true)
    expect(wrapper.text()).toContain('Mi Formulario Test')
  })

  it('debe navegar al builder al crear nuevo formulario', async () => {
    const wrapper = mount(Dashboard, {
      global: {
        plugins: [pinia],
        mocks: {
          $router: mockRouter,
        },
        stubs: {
          RouterLink: true,
        },
      },
    })

    // Buscar y hacer clic en el botón
    const createButton = wrapper.find('.btn-primary-large')
    await createButton.trigger('click')

    // Verificar que se llamó al router
    expect(mockRouter.push).toHaveBeenCalledWith('/builder')
  })
})
