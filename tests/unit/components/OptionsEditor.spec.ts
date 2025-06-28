// tests/unit/components/OptionsEditor.spec.ts
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import OptionsEditor from '../../../src/components/FormBuilder/OptionsEditor.vue'

describe('OptionsEditor', () => {
  it('debe renderizar opciones iniciales', async () => {
    const options = [
      { value: 'op1', label: 'Opción 1' },
      { value: 'op2', label: 'Opción 2' },
    ]

    const wrapper = mount(OptionsEditor, {
      props: {
        modelValue: options,
      },
    })

    // Esperar a que el componente se monte completamente
    await wrapper.vm.$nextTick()

    // Verificar que las opciones se renderizan
    const optionItems = wrapper.findAll('.option-item')
    expect(optionItems).toHaveLength(2)

    // Verificar el contenido
    expect(wrapper.text()).toContain('Opción 1')
    expect(wrapper.text()).toContain('Opción 2')
  })

  it('debe agregar nueva opción', async () => {
    const wrapper = mount(OptionsEditor, {
      props: {
        modelValue: [{ value: 'op1', label: 'Opción 1' }],
      },
    })

    // Buscar y hacer clic en el botón de agregar
    const addButton = wrapper.find('button.btn-add-option')
    expect(addButton.exists()).toBe(true)

    await addButton.trigger('click')
    await wrapper.vm.$nextTick()

    // Verificar que se emitió el evento
    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toBeTruthy()
    expect(emitted![0][0]).toHaveLength(2)
  })

  it('debe eliminar una opción', async () => {
    const options = [
      { value: 'op1', label: 'Opción 1' },
      { value: 'op2', label: 'Opción 2' },
      { value: 'op3', label: 'Opción 3' },
    ]

    const wrapper = mount(OptionsEditor, {
      props: {
        modelValue: options,
      },
    })

    await wrapper.vm.$nextTick()

    // Buscar botones de eliminar
    const removeButtons = wrapper.findAll('button.btn-remove-option')
    expect(removeButtons.length).toBeGreaterThan(0)

    // Hacer clic en el segundo botón de eliminar
    await removeButtons[1].trigger('click')

    // Verificar emisión
    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toBeTruthy()

    const updatedOptions = emitted![0][0] as Array<{ value: string; label: string }>
    expect(updatedOptions).toHaveLength(2)
  })

  it('no debe permitir eliminar cuando solo hay una opción', async () => {
    const wrapper = mount(OptionsEditor, {
      props: {
        modelValue: [{ value: 'op1', label: 'Opción 1' }],
      },
    })

    await wrapper.vm.$nextTick()

    // El botón debe estar deshabilitado
    const removeButton = wrapper.find('button.btn-remove-option')
    expect(removeButton.exists()).toBe(true)

    // En Vue Test Utils, verificamos el atributo disabled
    const isDisabled =
      removeButton.element.hasAttribute('disabled') ||
      removeButton.attributes('disabled') === '' ||
      removeButton.attributes('disabled') === 'true'

    expect(isDisabled).toBe(true)
  })

  it('debe actualizar valores de opciones existentes', async () => {
    const options = [{ value: 'op1', label: 'Opción 1' }]

    const wrapper = mount(OptionsEditor, {
      props: {
        modelValue: options,
      },
    })

    await wrapper.vm.$nextTick()

    // Buscar el primer input de valor
    const valueInputs = wrapper.findAll('input.option-input')
    expect(valueInputs.length).toBeGreaterThan(0)

    // El primer input debería ser el de "valor"
    const valueInput = valueInputs[0]

    // Cambiar el valor
    await valueInput.setValue('nuevo_valor')

    // Verificar que se emitió el evento
    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toBeTruthy()
  })

  it('debe mostrar vista previa de las opciones', async () => {
    const options = [
      { value: 'op1', label: 'Primera opción' },
      { value: 'op2', label: 'Segunda opción' },
    ]

    const wrapper = mount(OptionsEditor, {
      props: {
        modelValue: options,
      },
    })

    await wrapper.vm.$nextTick()

    // Buscar el select de vista previa
    const previewSelect = wrapper.find('select.preview-select')
    expect(previewSelect.exists()).toBe(true)

    // Verificar las opciones del select
    const selectOptions = previewSelect.findAll('option')
    // Debe haber al menos las opciones + el placeholder
    expect(selectOptions.length).toBeGreaterThanOrEqual(3)
  })
})
