// tests/unit/stores/formBuilder.spec.ts
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
// Usar rutas relativas en lugar del alias @
import { useFormBuilderStore } from '../../../src/stores/formBuilder'

describe('FormBuilder Store - CRUD Completo', () => {
  let store: ReturnType<typeof useFormBuilderStore>

  beforeEach(() => {
    // Crear una nueva instancia de Pinia para cada test
    setActivePinia(createPinia())
    store = useFormBuilderStore()
    // Limpiar mocks
    vi.clearAllMocks()
  })

  describe('CREATE - Crear Formularios', () => {
    it('debe crear un nuevo formulario vacío', () => {
      store.newForm()

      expect(store.currentForm.id).toBeNull()
      expect(store.currentForm.name).toBe('')
      expect(store.currentForm.elements).toHaveLength(0)
    })

    it('debe agregar diferentes tipos de elementos', () => {
      store.newForm()

      // Agregar varios tipos de elementos
      store.addElement('text-input')
      store.addElement('email')
      store.addElement('select')

      expect(store.currentForm.elements).toHaveLength(3)
      expect(store.currentForm.elements[0].type).toBe('text-input')
      expect(store.currentForm.elements[1].type).toBe('email')
      expect(store.currentForm.elements[2].type).toBe('select')
    })

    it('debe guardar un formulario nuevo', () => {
      // Mock localStorage
      const setItemSpy = vi.spyOn(window.localStorage, 'setItem')

      // Crear formulario
      store.newForm()
      store.currentForm.name = 'Formulario Test'
      store.addElement('text-input')

      // Guardar
      store.saveForm()

      expect(store.currentForm.id).not.toBeNull()
      expect(store.savedForms).toHaveLength(1)
      expect(setItemSpy).toHaveBeenCalledWith('formBuilder_savedForms', expect.any(String))
    })
  })

  describe('READ - Leer Formularios', () => {
    it('debe cargar formularios guardados desde localStorage', () => {
      const mockData = [
        {
          id: 'form-1',
          name: 'Formulario 1',
          description: 'Test',
          elements: [],
        },
        {
          id: 'form-2',
          name: 'Formulario 2',
          description: 'Test 2',
          elements: [],
        },
      ]

      // Simular datos en localStorage
      window.localStorage.setItem('formBuilder_savedForms', JSON.stringify(mockData))

      // Crear nuevo store para forzar la carga desde localStorage
      const newPinia = createPinia()
      setActivePinia(newPinia)
      const newStore = useFormBuilderStore()

      expect(newStore.savedForms).toHaveLength(2)
      expect(newStore.savedForms[0].name).toBe('Formulario 1')
      expect(newStore.savedForms[1].name).toBe('Formulario 2')
    })

    it('debe cargar un formulario específico por ID', () => {
      // Primero guardar un formulario
      store.newForm()
      store.currentForm.name = 'Mi Formulario'
      store.currentForm.description = 'Descripción test'
      store.addElement('email')
      store.saveForm()

      const formId = store.currentForm.id!

      // Crear nuevo formulario para limpiar el actual
      store.newForm()

      // Cargar el formulario guardado
      store.loadForm(formId)

      expect(store.currentForm.name).toBe('Mi Formulario')
      expect(store.currentForm.description).toBe('Descripción test')
      expect(store.currentForm.elements).toHaveLength(1)
      expect(store.currentForm.elements[0].type).toBe('email')
    })
  })

  describe('UPDATE - Actualizar Formularios', () => {
    it('debe actualizar propiedades de un elemento', () => {
      store.newForm()
      store.addElement('text-input')

      const elementId = store.currentForm.elements[0].id
      const originalLabel = store.currentForm.elements[0].props.label

      store.updateElementProps(elementId, {
        label: 'Nuevo Label',
        required: true,
        placeholder: 'Nuevo placeholder',
      })

      const element = store.currentForm.elements[0]
      expect(element.props.label).toBe('Nuevo Label')
      expect(element.props.label).not.toBe(originalLabel)
      expect(element.props.required).toBe(true)
      expect(element.props.placeholder).toBe('Nuevo placeholder')
    })

    it('debe mover elementos arriba y abajo', () => {
      store.newForm()

      store.addElement('text-input')
      store.addElement('email')
      store.addElement('number')

      // Mover email (índice 1) hacia arriba (índice 0)
      store.moveElement(1, 0)

      expect(store.currentForm.elements[0].type).toBe('email')
      expect(store.currentForm.elements[1].type).toBe('text-input')

      // Mover number (ahora en índice 2) al medio (índice 1)
      store.moveElement(2, 1)

      expect(store.currentForm.elements[1].type).toBe('number')
    })

    it('debe duplicar un elemento', () => {
      store.newForm()
      store.addElement('select')

      const originalElement = store.currentForm.elements[0]
      originalElement.props.label = 'Select Original'

      store.duplicateElement(originalElement)

      expect(store.currentForm.elements).toHaveLength(2)
      expect(store.currentForm.elements[1].type).toBe('select')
      expect(store.currentForm.elements[1].props.label).toBe('Select Original (copia)')
      expect(store.currentForm.elements[1].id).not.toBe(originalElement.id)
    })
  })

  describe('DELETE - Eliminar Formularios', () => {
    it('debe eliminar un elemento del formulario', () => {
      store.newForm()

      store.addElement('text-input')
      store.addElement('email')
      store.addElement('number')

      const emailId = store.currentForm.elements[1].id

      store.removeElement(emailId)

      expect(store.currentForm.elements).toHaveLength(2)
      expect(store.currentForm.elements.find((e) => e.id === emailId)).toBeUndefined()
      expect(store.currentForm.elements[0].type).toBe('text-input')
      expect(store.currentForm.elements[1].type).toBe('number')
    })

    it('debe eliminar un formulario guardado', () => {
      // Crear y guardar dos formularios
      store.newForm()
      store.currentForm.name = 'Formulario 1'
      store.saveForm()
      const form1Id = store.currentForm.id!

      store.newForm()
      store.currentForm.name = 'Formulario 2'
      store.saveForm()

      expect(store.savedForms).toHaveLength(2)

      // Eliminar el primer formulario
      store.deleteForm(form1Id)

      expect(store.savedForms).toHaveLength(1)
      expect(store.savedForms[0].name).toBe('Formulario 2')
    })

    it('debe limpiar todos los datos', () => {
      // Agregar datos
      store.newForm()
      store.currentForm.name = 'Test'
      store.addElement('text-input')
      store.saveForm()

      expect(store.savedForms).toHaveLength(1)
      expect(store.currentForm.elements).toHaveLength(1)

      // Limpiar todo
      store.clearAllData()

      expect(store.savedForms).toHaveLength(0)
      expect(store.currentForm.elements).toHaveLength(0)
      expect(store.currentForm.name).toBe('')
    })
  })

  describe('Funcionalidades Adicionales', () => {
    it('debe exportar todos los formularios', () => {
      // Crear formularios
      store.newForm()
      store.currentForm.name = 'Form 1'
      store.saveForm()

      store.newForm()
      store.currentForm.name = 'Form 2'
      store.saveForm()

      const exported = store.exportAllForms()
      const parsed = JSON.parse(exported)

      expect(parsed).toHaveLength(2)
      expect(parsed[0].name).toBe('Form 1')
      expect(parsed[1].name).toBe('Form 2')
    })

    it('debe importar formularios desde JSON', () => {
      const formsToImport = [
        {
          id: 'imported-1',
          name: 'Formulario Importado',
          description: 'Test import',
          elements: [],
        },
      ]

      const success = store.importForms(JSON.stringify(formsToImport))

      expect(success).toBe(true)
      expect(store.savedForms).toHaveLength(1)
      expect(store.savedForms[0].name).toBe('Formulario Importado')
    })
  })

  describe('Validaciones y Casos Especiales', () => {
    it('no debe agregar elemento si el tipo no existe', () => {
      store.newForm()
      store.addElement('tipo-inexistente')

      expect(store.currentForm.elements).toHaveLength(0)
    })

    it('debe manejar correctamente formularios con múltiples checkboxes', () => {
      store.newForm()

      // Agregar varios checkboxes como en el formulario del gimnasio
      store.addElement('checkbox')
      store.updateElementProps(store.currentForm.elements[0].id, {
        label: 'Pérdida de peso',
        required: false,
      })

      store.addElement('checkbox')
      store.updateElementProps(store.currentForm.elements[1].id, {
        label: 'Ganancia de masa muscular',
        required: false,
      })

      store.addElement('checkbox')
      store.updateElementProps(store.currentForm.elements[2].id, {
        label: 'Mejorar resistencia',
        required: false,
      })

      expect(store.currentForm.elements).toHaveLength(3)
      expect(store.currentForm.elements.every((el) => el.type === 'checkbox')).toBe(true)
    })

    it('debe manejar opciones en elementos select y radio', () => {
      store.newForm()

      // Agregar select
      store.addElement('select')
      const selectId = store.currentForm.elements[0].id

      const newOptions = [
        { value: 'mensual', label: 'Mensual - 35€' },
        { value: 'trimestral', label: 'Trimestral - 90€' },
        { value: 'anual', label: 'Anual - 300€' },
      ]

      store.updateElementProps(selectId, {
        label: 'Plan de membresía',
        options: newOptions,
      })

      expect(store.currentForm.elements[0].props.options).toHaveLength(3)
      expect(store.currentForm.elements[0].props.options![0].value).toBe('mensual')
    })
  })
})
