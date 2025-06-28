// src/stores/formBuilder.ts
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

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
  type: string
  component: string
  props: FormElementProps
  validation: {
    required: boolean
    rules: string[]
  }
}

export interface Form {
  id: string | null
  name: string
  description: string
  elements: FormElement[]
}

export interface AvailableComponent {
  id: string
  name: string
  icon: string
  component: string
  defaultProps: FormElementProps
}

// Clave para localStorage
const STORAGE_KEY = 'formBuilder_savedForms'

// Función helper para cargar datos del localStorage
const loadFromStorage = (): Form[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    console.log(
      'Cargando desde localStorage:',
      stored ? JSON.parse(stored).length + ' formularios' : 'ningún formulario',
    )
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error loading forms from localStorage:', error)
    return []
  }
}

// Función helper para guardar en localStorage
const saveToStorage = (forms: Form[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(forms))
    console.log('Guardado en localStorage:', forms.length + ' formularios')
  } catch (error) {
    console.error('Error saving forms to localStorage:', error)
  }
}

export const useFormBuilderStore = defineStore('formBuilder', {
  state: () => ({
    availableComponents: [
      {
        id: 'text-input',
        name: 'Campo de Texto',
        icon: 'text-cursor-input',
        component: 'TextInput',
        defaultProps: {
          label: 'Campo de texto',
          placeholder: 'Introduce texto...',
          required: false,
          maxLength: null,
        },
      },
      {
        id: 'email',
        name: 'Campo de Email',
        icon: 'email',
        component: 'EmailInput',
        defaultProps: {
          label: 'Correo electrónico',
          placeholder: 'usuario@ejemplo.com',
          required: false,
          pattern: '^[^@]+@[^@]+.[^@]+$',
        },
      },
      {
        id: 'password',
        name: 'Campo de Contraseña',
        icon: 'lock',
        component: 'PasswordInput',
        defaultProps: {
          label: 'Contraseña',
          placeholder: '••••••••',
          required: false,
          minLength: 8,
          showToggle: true,
        },
      },
      {
        id: 'number',
        name: 'Campo Numérico',
        icon: 'number',
        component: 'NumberInput',
        defaultProps: {
          label: 'Número',
          placeholder: '0',
          required: false,
          min: null,
          max: null,
          step: 1,
        },
      },
      {
        id: 'phone',
        name: 'Campo de Teléfono',
        icon: 'phone',
        component: 'PhoneInput',
        defaultProps: {
          label: 'Teléfono',
          placeholder: '+34 600 00 00 00',
          required: false,
          pattern: null,
        },
      },
      {
        id: 'url',
        name: 'Campo de URL',
        icon: 'link',
        component: 'UrlInput',
        defaultProps: {
          label: 'Sitio web',
          placeholder: 'https://ejemplo.com',
          required: false,
        },
      },
      {
        id: 'textarea',
        name: 'Área de Texto',
        icon: 'text',
        component: 'TextArea',
        defaultProps: {
          label: 'Área de texto',
          placeholder: 'Introduce texto largo...',
          required: false,
          rows: 4,
        },
      },
      {
        id: 'select',
        name: 'Lista Desplegable',
        icon: 'chevron-down',
        component: 'SelectInput',
        defaultProps: {
          label: 'Selecciona una opción',
          placeholder: '',
          required: false,
          options: [
            { value: 'opcion1', label: 'Opción 1' },
            { value: 'opcion2', label: 'Opción 2' },
          ],
        },
      },
      {
        id: 'checkbox',
        name: 'Casilla de Verificación',
        icon: 'check-square',
        component: 'CheckboxInput',
        defaultProps: {
          label: 'Acepto los términos',
          placeholder: '',
          required: false,
        },
      },
      {
        id: 'radio',
        name: 'Botones de Radio',
        icon: 'radio-button',
        component: 'RadioGroup',
        defaultProps: {
          label: 'Selecciona una opción',
          placeholder: '',
          required: false,
          options: [
            { value: 'si', label: 'Sí' },
            { value: 'no', label: 'No' },
          ],
        },
      },
      {
        id: 'date',
        name: 'Selector de Fecha',
        icon: 'calendar',
        component: 'DatePicker',
        defaultProps: {
          label: 'Fecha',
          placeholder: 'dd/mm/aaaa',
          required: false,
          min: null,
          max: null,
          format: 'DD/MM/YYYY',
        },
      },
      {
        id: 'time',
        name: 'Selector de Hora',
        icon: 'clock',
        component: 'TimePicker',
        defaultProps: {
          label: 'Hora',
          placeholder: 'HH:mm',
          required: false,
          format: '24h',
        },
      },
      {
        id: 'file',
        name: 'Subida de Archivos',
        icon: 'upload',
        component: 'FileUpload',
        defaultProps: {
          label: 'Archivo',
          placeholder: 'Seleccionar archivo...',
          required: false,
          accept: '*',
          multiple: false,
          maxSize: 5, // MB
        },
      },
      {
        id: 'range',
        name: 'Control Deslizante',
        icon: 'slider',
        component: 'RangeSlider',
        defaultProps: {
          label: 'Valor',
          placeholder: '',
          required: false,
          min: 0,
          max: 100,
          step: 1,
          showValue: true,
        },
      },
      {
        id: 'color',
        name: 'Selector de Color',
        icon: 'palette',
        component: 'ColorPicker',
        defaultProps: {
          label: 'Color',
          placeholder: '',
          required: false,
          defaultValue: '#3b82f6',
        },
      },
    ] as AvailableComponent[],

    currentForm: {
      id: null,
      name: '',
      description: '',
      elements: [],
    } as Form,

    // ¡IMPORTANTE! Cargar formularios guardados desde localStorage al inicializar
    savedForms: loadFromStorage(),
    selectedElement: null as FormElement | null,
  }),

  actions: {
    addElement(componentType: string) {
      const component = this.availableComponents.find((c) => c.id === componentType)
      if (!component) return

      const newElement: FormElement = {
        id: uuidv4(),
        type: componentType,
        component: component.component,
        props: { ...component.defaultProps },
        validation: {
          required: component.defaultProps.required || false,
          rules: [],
        },
      }

      this.currentForm.elements.push(newElement)
    },

    removeElement(elementId: string) {
      const index = this.currentForm.elements.findIndex((el) => el.id === elementId)
      if (index > -1) {
        this.currentForm.elements.splice(index, 1)
        if (this.selectedElement?.id === elementId) {
          this.selectedElement = null
        }
      }
    },

    selectElement(element: FormElement) {
      this.selectedElement = element
    },

    updateElementProps(elementId: string, newProps: Partial<FormElementProps>) {
      const element = this.currentForm.elements.find((el) => el.id === elementId)
      if (element) {
        element.props = { ...element.props, ...newProps }
      }
    },

    duplicateElement(element: FormElement) {
      const newElement: FormElement = {
        ...element,
        id: uuidv4(),
        props: {
          ...element.props,
          label: `${element.props.label} (copia)`,
        },
      }

      const originalIndex = this.currentForm.elements.findIndex((el) => el.id === element.id)
      this.currentForm.elements.splice(originalIndex + 1, 0, newElement)
    },

    moveElement(fromIndex: number, toIndex: number) {
      if (toIndex >= 0 && toIndex < this.currentForm.elements.length) {
        const element = this.currentForm.elements.splice(fromIndex, 1)[0]
        this.currentForm.elements.splice(toIndex, 0, element)
      }
    },

    reorderElements(newOrder: FormElement[]) {
      this.currentForm.elements = newOrder
    },

    saveForm() {
      if (!this.currentForm.id) {
        this.currentForm.id = uuidv4()
      }

      const existingIndex = this.savedForms.findIndex((f) => f.id === this.currentForm.id)
      if (existingIndex > -1) {
        this.savedForms[existingIndex] = { ...this.currentForm }
      } else {
        this.savedForms.push({ ...this.currentForm })
      }

      // ¡IMPORTANTE! Guardar en localStorage cada vez que se guarda un formulario
      saveToStorage(this.savedForms)
    },

    loadForm(formId: string) {
      const form = this.savedForms.find((f) => f.id === formId)
      if (form) {
        this.currentForm = { ...form }
      }
    },

    deleteForm(formId: string) {
      const index = this.savedForms.findIndex((f) => f.id === formId)
      if (index > -1) {
        this.savedForms.splice(index, 1)
        // ¡IMPORTANTE! Guardar en localStorage después de eliminar
        saveToStorage(this.savedForms)
      }
    },

    newForm() {
      this.currentForm = {
        id: null,
        name: '',
        description: '',
        elements: [],
      }
      this.selectedElement = null
    },

    // Método para limpiar todos los datos (útil para desarrollo/testing)
    clearAllData() {
      this.savedForms = []
      this.currentForm = {
        id: null,
        name: '',
        description: '',
        elements: [],
      }
      this.selectedElement = null
      localStorage.removeItem(STORAGE_KEY)
    },

    // Método para exportar todos los formularios
    exportAllForms() {
      return JSON.stringify(this.savedForms, null, 2)
    },

    // Método para importar formularios
    importForms(formsJson: string) {
      try {
        const importedForms = JSON.parse(formsJson)
        if (Array.isArray(importedForms)) {
          this.savedForms = importedForms
          saveToStorage(this.savedForms)
          return true
        }
        return false
      } catch (error) {
        console.error('Error importing forms:', error)
        return false
      }
    },
  },
})
