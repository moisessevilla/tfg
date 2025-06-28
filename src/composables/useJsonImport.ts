// src/composables/useJsonImport.ts
import { ref } from 'vue'
import { useFormBuilderStore } from '@/stores/formBuilder'
import type { Form, FormElement, FormElementProps } from '@/stores/formBuilder'

// Interfaz para datos importados que coincida con la estructura actual
interface ImportedFormData {
  id?: string
  name: string
  description?: string
  elements: Array<{
    id?: string
    type: string
    component?: string
    props: {
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
    validation?: {
      required: boolean
      rules: string[]
    }
  }>
}

export const useJsonImport = () => {
  const formStore = useFormBuilderStore()

  const isImporting = ref(false)
  const importError = ref<string>('')
  const importSuccess = ref(false)

  // Mapeo de tipos antiguos a nuevos
  const typeMapping: Record<string, string> = {
    text: 'text-input',
    textarea: 'textarea',
    select: 'select',
    checkbox: 'checkbox',
    radio: 'radio',
    number: 'number',
    email: 'email',
    phone: 'phone',
    date: 'date',
    time: 'time',
    file: 'file',
    range: 'range',
    password: 'password',
    color: 'color',
    url: 'url',
  }

  // Mapeo de componentes
  const componentMapping: Record<string, string> = {
    'text-input': 'TextInput',
    textarea: 'TextArea',
    select: 'SelectInput',
    checkbox: 'CheckboxInput',
    radio: 'RadioGroup',
    number: 'NumberInput',
    email: 'EmailInput',
    phone: 'PhoneInput',
    date: 'DatePicker',
    time: 'TimePicker',
    file: 'FileUpload',
    range: 'RangeSlider',
    password: 'PasswordInput',
    color: 'ColorPicker',
    url: 'UrlInput',
  }

  // Lista de todos los tipos válidos (tanto antiguos como nuevos)
  const validTypes = new Set([
    // Tipos nuevos
    'text-input',
    'email',
    'password',
    'number',
    'phone',
    'url',
    'textarea',
    'select',
    'checkbox',
    'radio',
    'date',
    'time',
    'file',
    'range',
    'color',
    // Tipos antiguos para compatibilidad
    'text',
  ])

  // Validar la estructura del JSON
  const validateFormStructure = (data: unknown): data is ImportedFormData => {
    if (!data || typeof data !== 'object') {
      throw new Error('El archivo debe contener un objeto JSON válido')
    }

    const formData = data as Record<string, unknown>

    if (!formData.name || typeof formData.name !== 'string') {
      throw new Error('El formulario debe tener un nombre válido')
    }

    if (!Array.isArray(formData.elements)) {
      throw new Error('El formulario debe contener un array de elementos')
    }

    // Validar cada elemento
    for (let i = 0; i < formData.elements.length; i++) {
      const element = formData.elements[i] as Record<string, unknown>

      if (!element.type || typeof element.type !== 'string') {
        throw new Error(`Elemento ${i + 1}: debe tener un tipo válido`)
      }

      // Verificar si el tipo es válido
      if (!validTypes.has(element.type as string)) {
        throw new Error(
          `Elemento ${i + 1}: tipo "${element.type}" no válido. Tipos permitidos: ${Array.from(validTypes).join(', ')}`,
        )
      }

      if (!element.props || typeof element.props !== 'object') {
        throw new Error(`Elemento ${i + 1}: debe tener propiedades válidas`)
      }

      const props = element.props as Record<string, unknown>
      if (!props.label || typeof props.label !== 'string') {
        throw new Error(`Elemento ${i + 1}: debe tener una etiqueta válida`)
      }

      // Validaciones específicas por tipo
      const elementType = typeMapping[element.type as string] || element.type
      if (
        (elementType === 'select' || elementType === 'radio') &&
        (!props.options || !Array.isArray(props.options) || props.options.length === 0)
      ) {
        throw new Error(
          `Elemento ${i + 1}: elementos de tipo "${elementType}" deben tener opciones válidas`,
        )
      }
    }

    return true
  }

  // Generar ID único
  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9)
  }

  // Normalizar y convertir los datos importados
  const normalizeFormData = (data: ImportedFormData): Form => {
    const normalizedElements: FormElement[] = data.elements.map((element) => {
      // Mapear tipo antiguo a nuevo si es necesario
      const normalizedType = typeMapping[element.type] || element.type

      // Crear props completo con todos los campos posibles
      const normalizedProps: FormElementProps = {
        label: element.props.label,
        placeholder: element.props.placeholder || '',
        required: Boolean(element.props.required),
        maxLength: element.props.maxLength || null,
        minLength: element.props.minLength || null,
        rows: element.props.rows || 4,
        options: element.props.options || undefined,
        disabled: element.props.disabled || false,
        readonly: element.props.readonly || false,
        type: element.props.type,
        helpText: element.props.helpText || '',
        showCharCount: element.props.showCharCount || false,
        pattern: element.props.pattern || null,
        min: element.props.min || null,
        max: element.props.max || null,
        step: element.props.step || 1,
        showToggle: element.props.showToggle || false,
        accept: element.props.accept || undefined,
        multiple: element.props.multiple || false,
        maxSize: element.props.maxSize || undefined,
        showValue: element.props.showValue || false,
        defaultValue: element.props.defaultValue || undefined,
        format: element.props.format || undefined,
      }

      return {
        id: element.id || generateId(),
        type: normalizedType,
        component: element.component || componentMapping[normalizedType] || 'TextInput',
        props: normalizedProps,
        validation: element.validation || {
          required: Boolean(element.props.required),
          rules: [],
        },
      }
    })

    return {
      id: data.id || generateId(),
      name: data.name,
      description: data.description || '',
      elements: normalizedElements,
    }
  }

  // Importar desde archivo
  const importFromFile = async (file: File): Promise<boolean> => {
    importError.value = ''
    importSuccess.value = false
    isImporting.value = true

    try {
      // Validar tipo de archivo
      if (!file.name.toLowerCase().endsWith('.json')) {
        throw new Error('Solo se permiten archivos JSON (.json)')
      }

      // Validar tamaño del archivo (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('El archivo es demasiado grande (máximo 5MB)')
      }

      // Leer el archivo
      const fileContent = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (e) => resolve(e.target?.result as string)
        reader.onerror = () => reject(new Error('Error al leer el archivo'))
        reader.readAsText(file)
      })

      // Parsear JSON
      let parsedData: unknown
      try {
        parsedData = JSON.parse(fileContent)
      } catch {
        throw new Error('El archivo no contiene un JSON válido')
      }

      // Validar estructura
      validateFormStructure(parsedData)

      // Normalizar datos
      const normalizedForm = normalizeFormData(parsedData as ImportedFormData)

      // Verificar si ya existe un formulario con el mismo nombre
      const existingForm = formStore.savedForms.find(
        (form: Form) => form.name === normalizedForm.name,
      )
      if (existingForm) {
        const confirmOverwrite = confirm(
          `Ya existe un formulario con el nombre "${normalizedForm.name}". ¿Deseas sobrescribirlo?`,
        )
        if (!confirmOverwrite) {
          // Si el usuario cancela, preguntar si quiere crear una copia
          const createCopy = confirm(
            `¿Deseas crear una copia del formulario con un nombre diferente?`,
          )
          if (!createCopy) {
            // Si no quiere crear copia, cancelar completamente la importación
            importSuccess.value = false
            return false
          }
          // Si acepta crear una copia, añadir sufijo al nombre
          normalizedForm.name = `${normalizedForm.name} (Importado ${new Date().toLocaleString()})`
          normalizedForm.id = generateId() // Generar nuevo ID para evitar conflictos
        } else {
          // Si acepta sobrescribir, usar el ID del formulario existente
          normalizedForm.id = existingForm.id
        }
      }

      // Cargar el formulario en el store
      formStore.currentForm = normalizedForm
      formStore.saveForm()

      importSuccess.value = true
      return true
    } catch (error) {
      importError.value = error instanceof Error ? error.message : 'Error desconocido al importar'
      return false
    } finally {
      isImporting.value = false
    }
  }

  // Importar desde texto JSON
  const importFromText = async (jsonText: string): Promise<boolean> => {
    importError.value = ''
    importSuccess.value = false
    isImporting.value = true

    try {
      if (!jsonText.trim()) {
        throw new Error('El texto JSON no puede estar vacío')
      }

      // Parsear JSON
      let parsedData: unknown
      try {
        parsedData = JSON.parse(jsonText)
      } catch {
        throw new Error('El texto no contiene un JSON válido')
      }

      // Validar estructura
      validateFormStructure(parsedData)

      // Normalizar datos
      const normalizedForm = normalizeFormData(parsedData as ImportedFormData)

      // Verificar si ya existe un formulario con el mismo nombre
      const existingForm = formStore.savedForms.find(
        (form: Form) => form.name === normalizedForm.name,
      )
      if (existingForm) {
        const confirmOverwrite = confirm(
          `Ya existe un formulario con el nombre "${normalizedForm.name}". ¿Deseas sobrescribirlo?`,
        )
        if (!confirmOverwrite) {
          // Si el usuario cancela, preguntar si quiere crear una copia
          const createCopy = confirm(
            `¿Deseas crear una copia del formulario con un nombre diferente?`,
          )
          if (!createCopy) {
            // Si no quiere crear copia, cancelar completamente la importación
            importSuccess.value = false
            return false
          }
          // Si acepta crear una copia, añadir sufijo al nombre
          normalizedForm.name = `${normalizedForm.name} (Importado ${new Date().toLocaleString()})`
          normalizedForm.id = generateId() // Generar nuevo ID para evitar conflictos
        } else {
          // Si acepta sobrescribir, usar el ID del formulario existente
          normalizedForm.id = existingForm.id
        }
      }

      // Cargar el formulario en el store
      formStore.currentForm = normalizedForm
      formStore.saveForm()

      importSuccess.value = true
      return true
    } catch (error) {
      importError.value = error instanceof Error ? error.message : 'Error desconocido al importar'
      return false
    } finally {
      isImporting.value = false
    }
  }

  // Generar JSON de ejemplo actualizado
  const generateExampleJson = (): string => {
    const exampleForm = {
      id: 'e5091de9-0810-41b1-a0c6-a3b5638e48da',
      name: 'Membresía Gimnasio',
      description:
        'Formulario de inscripción para gimnasio con objetivos, horarios y plan de entrenamiento',
      elements: [
        {
          id: '96689611-8f3b-4380-84d2-9958e81a23c4',
          type: 'text-input',
          component: 'TextInput',
          props: {
            label: 'Nombre completo',
            placeholder: 'Carlos Rodríguez',
            required: true,
            maxLength: null,
          },
          validation: {
            required: false,
            rules: [],
          },
        },
        {
          id: '26add18b-140a-4fbb-ab6a-7a6bc4fbccb3',
          type: 'date',
          component: 'DatePicker',
          props: {
            label: 'Fecha de nacimiento',
            placeholder: 'dd/mm/aaaa',
            required: true,
            min: null,
            max: null,
            format: 'DD/MM/YYYY',
          },
          validation: {
            required: false,
            rules: [],
          },
        },
        {
          id: '5d2689d8-e51e-4ead-8b68-fba9e9d84f24',
          type: 'email',
          component: 'EmailInput',
          props: {
            label: 'Correo electrónico',
            placeholder: 'usuario@ejemplo.com',
            required: true,
            pattern: '^[^@]+@[^@]+.[^@]+$',
          },
          validation: {
            required: false,
            rules: [],
          },
        },
        {
          id: '905a546c-7b80-4d16-a41c-4dda8830bacf',
          type: 'phone',
          component: 'PhoneInput',
          props: {
            label: 'Teléfono',
            placeholder: '+34 600 00 00 00',
            required: true,
            pattern: null,
          },
          validation: {
            required: false,
            rules: [],
          },
        },
        {
          id: 'e91d15e5-1b29-4746-a066-9eddcd746788',
          type: 'select',
          component: 'SelectInput',
          props: {
            label: 'Plan de membresía',
            placeholder: '',
            required: true,
            options: [
              { value: 'mensual', label: 'Mensual - 35€' },
              { value: 'trimestral', label: 'Trimestral - 90€' },
              { value: 'semestral', label: 'Semestral - 160€' },
              { value: 'anual', label: 'Anual - 300€' },
            ],
          },
          validation: {
            required: false,
            rules: [],
          },
        },
        {
          id: '6f8286eb-409b-4ad7-801e-e99e9a42946b',
          type: 'checkbox',
          component: 'CheckboxInput',
          props: {
            label: 'Pérdida de peso',
            placeholder: '',
            required: false,
          },
          validation: {
            required: false,
            rules: [],
          },
        },
        {
          id: '2e7cb6c8-9501-4cb7-8f4d-b93c81296f5d',
          type: 'radio',
          component: 'RadioGroup',
          props: {
            label: 'Horario preferido',
            placeholder: '',
            required: true,
            options: [
              { value: 'mañana', label: 'Mañana (6:00 - 12:00)' },
              { value: 'tarde', label: 'Tarde (12:00 - 18:00)' },
              { value: 'noche', label: 'Noche (18:00 - 22:00)' },
            ],
          },
          validation: {
            required: false,
            rules: [],
          },
        },
        {
          id: '6eed9f53-89a9-4fd0-8751-414ab48b11eb',
          type: 'number',
          component: 'NumberInput',
          props: {
            label: 'Peso actual (kg)',
            placeholder: '70',
            required: false,
            min: 30,
            max: 200,
            step: 1,
          },
          validation: {
            required: false,
            rules: [],
          },
        },
        {
          id: '2f51a29a-5e27-446f-8603-5586f24b09e1',
          type: 'textarea',
          component: 'TextArea',
          props: {
            label: 'Condiciones médicas o lesiones',
            placeholder: 'Indique cualquier condición médica relevante',
            required: false,
            rows: 4,
          },
          validation: {
            required: false,
            rules: [],
          },
        },
      ],
    }

    return JSON.stringify(exampleForm, null, 2)
  }

  // Limpiar estados
  const clearImportState = () => {
    importError.value = ''
    importSuccess.value = false
    isImporting.value = false
  }

  return {
    // Estado
    isImporting,
    importError,
    importSuccess,

    // Métodos
    importFromFile,
    importFromText,
    generateExampleJson,
    clearImportState,
  }
}
