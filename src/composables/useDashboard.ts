// src/composables/useDashboard.ts
import { useFormBuilderStore } from '@/stores/formBuilder'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Form, FormElement } from '@/stores/formBuilder'

export function useDashboard() {
  const router = useRouter()
  const formStore = useFormBuilderStore()

  // Reactive state
  const searchQuery = ref('')
  const sortBy = ref('name')
  const selectedFormId = ref<string | null>(null)
  const activeMenu = ref<string | null>(null)

  // Computed properties
  const savedForms = computed(() => formStore.savedForms)

  const totalElements = computed(() =>
    savedForms.value.reduce((total: number, form: Form) => total + form.elements.length, 0),
  )

  const totalRequired = computed(() =>
    savedForms.value.reduce(
      (total: number, form: Form) =>
        total + form.elements.filter((el: FormElement) => el.props.required).length,
      0,
    ),
  )

  const filteredForms = computed(() => {
    const forms = savedForms.value.filter((form: Form) =>
      form.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
    )

    // Ordenar
    forms.sort((a: Form, b: Form) => {
      switch (sortBy.value) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'elements':
          return b.elements.length - a.elements.length
        default:
          return 0
      }
    })

    return forms
  })

  // Form actions
  const createNewForm = () => {
    formStore.newForm()
    router.push('/builder')
  }

  const editForm = (formId: string) => {
    formStore.loadForm(formId)
    router.push('/builder')
  }

  const previewForm = (formId: string) => {
    router.push(`/preview/${formId}`)
  }

  const deleteForm = (formId: string) => {
    // Cerramos el menú primero
    activeMenu.value = null

    if (confirm('¿Estás seguro de que quieres eliminar este formulario?')) {
      console.log('Eliminando formulario:', formId)
      console.log('Formularios antes:', formStore.savedForms.length)

      formStore.deleteForm(formId)

      console.log('Formularios después:', formStore.savedForms.length)

      if (selectedFormId.value === formId) {
        selectedFormId.value = null
      }
    }
  }

  const duplicateForm = (formId: string) => {
    // Cerramos el menú primero
    activeMenu.value = null

    // Buscar el formulario original
    const originalForm = formStore.savedForms.find((f: Form) => f.id === formId)
    if (!originalForm) {
      console.error('Formulario no encontrado para duplicar:', formId)
      return
    }

    // Función helper para generar ID único
    const generateId = () => {
      return Date.now().toString(36) + Math.random().toString(36).substr(2)
    }

    // Crear una copia con nuevo ID y nombre
    const duplicatedForm: Form = {
      ...originalForm,
      id: generateId(), // Nuevo ID único
      name: `${originalForm.name} (Copia)`,
      // Crear copias profundas de los elementos para evitar referencias compartidas
      elements: originalForm.elements.map((element: FormElement) => ({
        ...element,
        id: generateId(), // Nuevo ID para cada elemento
        props: { ...element.props },
        validation: { ...element.validation },
      })),
    }

    // Agregar directamente al array y guardar
    formStore.savedForms.push(duplicatedForm)
    // El store automáticamente guardará en localStorage a través de su método saveForm
    // Pero para asegurar la persistencia inmediata, podemos usar directamente localStorage
    try {
      localStorage.setItem('formBuilder_savedForms', JSON.stringify(formStore.savedForms))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }

    console.log('Formulario duplicado exitosamente:', duplicatedForm.name)
  }

  const exportForm = (form: Form) => {
    const dataStr = JSON.stringify(form, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${form.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`
    link.click()
    URL.revokeObjectURL(url)
    activeMenu.value = null
  }

  // Quick actions
  const showTemplates = () => {
    // Mostrar plantillas
    router.push('/templates')
    console.log('Mostrar plantillas')
  }

  const showHelp = () => {
    // Mostrar ayuda
    console.log('Navegando a la vista de ayuda')
    router.push({ name: 'help' }).catch((err) => {
      console.error('Error navegando a help:', err)
    })
  }

  // UI interactions
  const selectForm = (form: Form) => {
    selectedFormId.value = selectedFormId.value === form.id ? null : form.id
  }

  const toggleMenu = (formId: string) => {
    activeMenu.value = activeMenu.value === formId ? null : formId
  }

  // Utilities
  const getRequiredCount = (form: Form) => {
    return form.elements.filter((el: FormElement) => el.props.required).length
  }

  const getElementIcon = (type: string): string => {
    const icons: Record<string, string> = {
      'text-input': '📝',
      textarea: '📄',
      select: '📋',
      checkbox: '☑️',
      radio: '🔘',
      number: '🔢',
      email: '📧',
      date: '📅',
      time: '⏰',
      file: '📎',
      range: '🎚️',
      phone: '📱',
      password: '🔐',
      color: '🎨',
      url: '🔗',
    }
    return icons[type] || '📝'
  }

  // Event handlers
  const handleClickOutside = (event: Event) => {
    const target = event.target as HTMLElement
    if (!target.closest('.form-menu')) {
      activeMenu.value = null
    }
  }

  // Lifecycle
  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })

  return {
    // State
    searchQuery,
    sortBy,
    selectedFormId,
    activeMenu,

    // Computed
    savedForms,
    totalElements,
    totalRequired,
    filteredForms,

    // Actions
    createNewForm,
    editForm,
    previewForm,
    deleteForm,
    duplicateForm,
    exportForm,
    showTemplates,
    showHelp,
    selectForm,
    toggleMenu,

    // Utilities
    getRequiredCount,
    getElementIcon,
  }
}
