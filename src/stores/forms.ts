import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

// Tipos para los elementos del formulario
export interface FormElementProps {
  label: string
  placeholder?: string
  required: boolean
  maxLength?: number | null
  minLength?: number | null
  rows?: number
  options?: Array<{ value: string; label: string }>
  disabled?: boolean
  readonly?: boolean
  type?: string
  helpText?: string
  showCharCount?: boolean
  pattern?: string | null
  min?: number | string | null
  max?: number | string | null
  step?: number
  showToggle?: boolean
  accept?: string
  multiple?: boolean
  maxSize?: number
  showValue?: boolean
  defaultValue?: string
  format?: string
}

export interface FormElement {
  id: string
  type: 'text' | 'textarea' | 'select' | 'checkbox' | 'radio'
  props: FormElementProps
}

export interface Form {
  id: string
  name: string
  description?: string
  elements: FormElement[]
  createdAt?: string
  updatedAt?: string
}

export const useFormsStore = defineStore('forms', () => {
  // Estado
  const forms = ref<Form[]>([])
  const currentForm = ref<Form | null>(null)

  // Computed
  const formsList = computed(() => forms.value)
  const hasCurrentForm = computed(() => currentForm.value !== null)

  // Cargar formularios del localStorage al inicializar
  const loadForms = () => {
    try {
      const savedForms = localStorage.getItem('formBuilder_forms')
      if (savedForms) {
        const parsedForms = JSON.parse(savedForms)
        forms.value = Array.isArray(parsedForms) ? parsedForms : []
      }
    } catch (error) {
      console.error('Error al cargar formularios:', error)
      forms.value = []
    }
  }

  // Guardar formularios en localStorage
  const saveForms = () => {
    try {
      localStorage.setItem('formBuilder_forms', JSON.stringify(forms.value))
    } catch (error) {
      console.error('Error al guardar formularios:', error)
    }
  }

  // Generar ID único
  const generateId = () => {
    return `form_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  // Crear un nuevo formulario
  const createForm = (name: string, description?: string): Form => {
    const newForm: Form = {
      id: generateId(),
      name,
      description: description || '',
      elements: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    forms.value.push(newForm)
    currentForm.value = newForm
    saveForms()

    return newForm
  }

  // Guardar o actualizar un formulario
  const saveForm = (form: Partial<Form> & { name: string; elements: FormElement[] }) => {
    const now = new Date().toISOString()

    // Si tiene ID, actualizar formulario existente
    if (form.id) {
      const index = forms.value.findIndex((f) => f.id === form.id)
      if (index !== -1) {
        forms.value[index] = {
          ...forms.value[index],
          ...form,
          updatedAt: now,
        }
        if (currentForm.value?.id === form.id) {
          currentForm.value = forms.value[index]
        }
      } else {
        // ID no encontrado, crear nuevo
        const newForm: Form = {
          id: form.id,
          name: form.name,
          description: form.description || '',
          elements: form.elements,
          createdAt: form.createdAt || now,
          updatedAt: now,
        }
        forms.value.push(newForm)
        currentForm.value = newForm
      }
    } else {
      // Sin ID, crear nuevo formulario
      const newForm: Form = {
        id: generateId(),
        name: form.name,
        description: form.description || '',
        elements: form.elements,
        createdAt: now,
        updatedAt: now,
      }
      forms.value.push(newForm)
      currentForm.value = newForm
    }

    saveForms()
  }

  // Obtener un formulario por ID
  const getFormById = (id: string): Form | undefined => {
    return forms.value.find((form) => form.id === id)
  }

  // Establecer formulario actual
  const setCurrentForm = (form: Form | null) => {
    currentForm.value = form
  }

  // Cargar formulario por ID como actual
  const loadFormById = (id: string): boolean => {
    const form = getFormById(id)
    if (form) {
      currentForm.value = form
      return true
    }
    return false
  }

  // Eliminar un formulario
  const deleteForm = (id: string): boolean => {
    const index = forms.value.findIndex((form) => form.id === id)
    if (index !== -1) {
      forms.value.splice(index, 1)

      // Si era el formulario actual, limpiarlo
      if (currentForm.value?.id === id) {
        currentForm.value = null
      }

      saveForms()
      return true
    }
    return false
  }

  // Duplicar un formulario
  const duplicateForm = (id: string): Form | null => {
    const originalForm = getFormById(id)
    if (!originalForm) return null

    const duplicatedForm: Form = {
      ...originalForm,
      id: generateId(),
      name: `${originalForm.name} (Copia)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      elements: originalForm.elements.map((element) => ({
        ...element,
        id: `element_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      })),
    }

    forms.value.push(duplicatedForm)
    saveForms()

    return duplicatedForm
  }

  // Exportar formulario a JSON
  const exportForm = (id: string): string | null => {
    const form = getFormById(id)
    if (!form) return null

    // Crear una copia limpia sin metadatos internos
    const exportData = {
      name: form.name,
      description: form.description,
      elements: form.elements,
    }

    return JSON.stringify(exportData, null, 2)
  }

  // Importar formulario desde JSON
  const importForm = (jsonData: string): boolean => {
    try {
      const parsedData = JSON.parse(jsonData)

      // Validar estructura básica
      if (!parsedData.name || !Array.isArray(parsedData.elements)) {
        throw new Error('Estructura de formulario inválida')
      }

      // Crear el formulario importado
      const importedForm: Form = {
        id: generateId(),
        name: parsedData.name,
        description: parsedData.description || '',
        elements: parsedData.elements.map((element: unknown) => {
          const typedElement = element as FormElement
          return {
            ...typedElement,
            id:
              typedElement.id || `element_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          }
        }),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      forms.value.push(importedForm)
      saveForms()

      return true
    } catch (error) {
      console.error('Error al importar formulario:', error)
      return false
    }
  }

  // Limpiar formulario actual
  const clearCurrentForm = () => {
    currentForm.value = null
  }

  // Limpiar todos los formularios (para desarrollo/testing)
  const clearAllForms = () => {
    forms.value = []
    currentForm.value = null
    saveForms()
  }

  // Actualizar elemento del formulario actual
  const updateCurrentFormElement = (elementId: string, updates: Partial<FormElement>) => {
    if (!currentForm.value) return false

    const elementIndex = currentForm.value.elements.findIndex((el) => el.id === elementId)
    if (elementIndex === -1) return false

    currentForm.value.elements[elementIndex] = {
      ...currentForm.value.elements[elementIndex],
      ...updates,
    }

    currentForm.value.updatedAt = new Date().toISOString()
    saveForms()
    return true
  }

  // Agregar elemento al formulario actual
  const addElementToCurrentForm = (element: FormElement) => {
    if (!currentForm.value) return false

    currentForm.value.elements.push(element)
    currentForm.value.updatedAt = new Date().toISOString()
    saveForms()
    return true
  }

  // Remover elemento del formulario actual
  const removeElementFromCurrentForm = (elementId: string) => {
    if (!currentForm.value) return false

    const elementIndex = currentForm.value.elements.findIndex((el) => el.id === elementId)
    if (elementIndex === -1) return false

    currentForm.value.elements.splice(elementIndex, 1)
    currentForm.value.updatedAt = new Date().toISOString()
    saveForms()
    return true
  }

  // Reordenar elementos del formulario actual
  const reorderCurrentFormElements = (newOrder: FormElement[]) => {
    if (!currentForm.value) return false

    currentForm.value.elements = newOrder
    currentForm.value.updatedAt = new Date().toISOString()
    saveForms()
    return true
  }

  // Inicializar el store
  loadForms()

  return {
    // Estado
    forms: formsList,
    currentForm,

    // Computed
    hasCurrentForm,

    // Métodos principales
    createForm,
    saveForm,
    getFormById,
    setCurrentForm,
    loadFormById,
    deleteForm,
    duplicateForm,
    exportForm,
    importForm,
    clearCurrentForm,
    clearAllForms,

    // Métodos para el formulario actual
    updateCurrentFormElement,
    addElementToCurrentForm,
    removeElementFromCurrentForm,
    reorderCurrentFormElements,

    // Métodos de utilidad
    loadForms,
    saveForms,
  }
})
