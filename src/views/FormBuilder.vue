<!-- src/views/FormBuilder.vue -->
<template>
  <div class="form-builder">
    <!-- Barra superior -->
    <header class="builder-header">
      <div class="builder-header-content">
        <div class="header-left">
          <button @click="goBack" class="btn-back">
            <span class="btn-icon">←</span>
            <span class="btn-text">Volver a Dashboard</span>
          </button>
        </div>

        <div class="header-center">
          <button @click="clearForm" class="btn-clear" title="Vaciar formulario">
            <span class="btn-icon">🗑️</span>
            <span class="btn-text">Vaciar Formulario</span>
          </button>
          <input
            v-model="currentForm.name"
            class="form-name-input"
            placeholder="Nuevo Formulario"
          />
        </div>

        <div class="header-right">
          <button @click="saveForm" class="btn-save">
            <span class="btn-icon">💾</span>
            <span class="btn-text">Guardar</span>
          </button>
          <button @click="previewForm" class="btn-preview">
            <span class="btn-icon">👁️</span>
            <span class="btn-text">Vista Previa</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Contenedor principal con ancho máximo -->
    <div class="builder-container">
      <!-- Área principal del builder -->
      <div class="builder-main">
        <!-- Panel de componentes (izquierda) -->
        <aside class="components-panel">
          <div class="panel-header">
            <h3>
              <span class="panel-icon">🧩</span>
              Componentes
            </h3>
          </div>
          <div class="components-list">
            <div
              v-for="component in availableComponents"
              :key="component.id"
              class="component-item"
              draggable="true"
              @dragstart="onDragStart($event, component)"
            >
              <span class="component-icon">{{ getComponentIcon(component.id) }}</span>
              <span class="component-name">{{ component.name }}</span>
              <span class="drag-hint">⋮⋮</span>
            </div>
          </div>
        </aside>

        <!-- Canvas del formulario (centro) -->
        <main class="form-canvas">
          <div class="canvas-header">
            <div class="canvas-title">
              <h3>
                <span class="canvas-icon">🎨</span>
                Diseño del Formulario
              </h3>
              <span class="element-count">{{ currentForm.elements.length }} elementos</span>
            </div>
          </div>

          <div class="canvas-content">
            <div
              class="canvas-area"
              :class="{ dragover: isDragging }"
              @drop="onDrop"
              @dragover.prevent
              @dragenter.prevent="isDragging = true"
              @dragleave.prevent="isDragging = false"
            >
              <div v-if="currentForm.elements.length === 0" class="canvas-empty">
                <div class="empty-icon">📋</div>
                <h4>Comienza a diseñar tu formulario</h4>
                <p>Arrastra componentes desde el panel izquierdo para empezar</p>
              </div>

              <div
                v-for="(element, index) in currentForm.elements"
                :key="element.id"
                class="form-element"
                :class="{ selected: selectedElement?.id === element.id }"
                @click="selectElement(element)"
              >
                <div class="element-toolbar">
                  <div class="toolbar-group">
                    <button
                      @click="moveElementUp(index)"
                      :disabled="index === 0"
                      class="toolbar-btn"
                      title="Subir"
                    >
                      ↑
                    </button>
                    <button
                      @click="moveElementDown(index)"
                      :disabled="index === currentForm.elements.length - 1"
                      class="toolbar-btn"
                      title="Bajar"
                    >
                      ↓
                    </button>
                  </div>
                  <div class="toolbar-group">
                    <button @click="duplicateElement(element)" class="toolbar-btn" title="Duplicar">
                      📋
                    </button>
                    <button
                      @click="removeElement(element.id)"
                      class="toolbar-btn delete"
                      title="Eliminar"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                <!-- Renderizado del elemento -->
                <div class="element-content">
                  <div class="element-preview">
                    <div class="element-type-badge">
                      {{ getComponentIcon(element.type) }} {{ getComponentName(element.type) }}
                    </div>
                    <div class="element-label">{{ element.props.label }}</div>
                    <div class="element-mock-input" :class="`mock-${element.type}`">
                      <span v-if="element.props.placeholder" class="mock-placeholder">
                        {{ element.props.placeholder }}
                      </span>
                      <span v-else class="mock-content">{{ getMockContent(element.type) }}</span>
                    </div>
                    <div v-if="element.props.required" class="element-required">
                      * Campo obligatorio
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <!-- Panel de propiedades (derecha) -->
        <aside class="properties-panel">
          <div class="panel-header">
            <h3>
              <span class="panel-icon">⚙️</span>
              Propiedades
            </h3>
          </div>

          <div class="panel-content">
            <div v-if="!selectedElement" class="no-selection">
              <div class="no-selection-icon">🎯</div>
              <h4>Ningún elemento seleccionado</h4>
              <p>Haz clic en un elemento del formulario para editar sus propiedades</p>
            </div>

            <div v-else class="properties-form">
              <div class="selected-element-info">
                <div class="selected-badge">
                  <span class="selected-icon">{{ getComponentIcon(selectedElement.type) }}</span>
                  <span class="selected-name">{{ getComponentName(selectedElement.type) }}</span>
                </div>
              </div>

              <div class="property-section">
                <h4>Configuración Básica</h4>

                <div class="property-group">
                  <label class="property-label">Etiqueta del campo</label>
                  <input
                    v-model="selectedElement.props.label"
                    type="text"
                    class="property-input"
                    placeholder="Ej: Nombre completo"
                  />
                </div>

                <div class="property-group" v-if="selectedElement.type !== 'checkbox'">
                  <label class="property-label">Texto de ayuda (placeholder)</label>
                  <input
                    v-model="selectedElement.props.placeholder"
                    type="text"
                    class="property-input"
                    placeholder="Ej: Introduce tu nombre..."
                  />
                </div>

                <div class="property-group checkbox-group">
                  <label class="checkbox-property">
                    <input
                      v-model="selectedElement.props.required"
                      type="checkbox"
                      class="property-checkbox"
                    />
                    <span class="checkbox-label">
                      <span class="checkbox-icon">✓</span>
                      Campo obligatorio
                    </span>
                  </label>
                </div>

                <!-- Editor de opciones para select y radio -->
                <div
                  v-if="
                    (selectedElement.type === 'select' || selectedElement.type === 'radio') &&
                    selectedElement.props.options
                  "
                  class="property-group"
                >
                  <OptionsEditor v-model="selectedElement.props.options" />
                </div>

                <!-- Propiedades específicas para text-input y textarea -->
                <div v-if="selectedElement.props.maxLength !== undefined" class="property-group">
                  <label class="property-label">Longitud máxima</label>
                  <input
                    v-model.number="selectedElement.props.maxLength"
                    type="number"
                    class="property-input"
                    min="1"
                    placeholder="Ej: 100"
                  />
                </div>

                <div v-if="selectedElement.props.minLength !== undefined" class="property-group">
                  <label class="property-label">Longitud mínima</label>
                  <input
                    v-model.number="selectedElement.props.minLength"
                    type="number"
                    class="property-input"
                    min="1"
                    placeholder="Ej: 8"
                  />
                </div>

                <div v-if="selectedElement.props.rows !== undefined" class="property-group">
                  <label class="property-label">Número de filas</label>
                  <input
                    v-model.number="selectedElement.props.rows"
                    type="number"
                    class="property-input"
                    min="2"
                    max="10"
                    placeholder="Ej: 4"
                  />
                </div>

                <!-- Propiedades para campos numéricos y rangos -->
                <div
                  v-if="selectedElement.type === 'number' || selectedElement.type === 'range'"
                  class="property-group"
                >
                  <label class="property-label">Valor mínimo</label>
                  <input
                    v-model.number="selectedElement.props.min"
                    type="number"
                    class="property-input"
                    placeholder="Ej: 0"
                  />
                </div>

                <div
                  v-if="selectedElement.type === 'number' || selectedElement.type === 'range'"
                  class="property-group"
                >
                  <label class="property-label">Valor máximo</label>
                  <input
                    v-model.number="selectedElement.props.max"
                    type="number"
                    class="property-input"
                    placeholder="Ej: 100"
                  />
                </div>

                <div
                  v-if="selectedElement.type === 'number' || selectedElement.type === 'range'"
                  class="property-group"
                >
                  <label class="property-label">Incremento (step)</label>
                  <input
                    v-model.number="selectedElement.props.step"
                    type="number"
                    class="property-input"
                    min="0.1"
                    placeholder="Ej: 1"
                  />
                </div>

                <div v-if="selectedElement.type === 'range'" class="property-group checkbox-group">
                  <label class="checkbox-property">
                    <input
                      v-model="selectedElement.props.showValue"
                      type="checkbox"
                      class="property-checkbox"
                    />
                    <span class="checkbox-label">
                      <span class="checkbox-icon">✓</span>
                      Mostrar valor actual
                    </span>
                  </label>
                </div>

                <!-- Propiedades para campos de fecha -->
                <div v-if="selectedElement.type === 'date'" class="property-group">
                  <label class="property-label">Fecha mínima</label>
                  <input v-model="selectedElement.props.min" type="date" class="property-input" />
                </div>

                <div v-if="selectedElement.type === 'date'" class="property-group">
                  <label class="property-label">Fecha máxima</label>
                  <input v-model="selectedElement.props.max" type="date" class="property-input" />
                </div>

                <!-- Propiedades para archivos -->
                <div v-if="selectedElement.type === 'file'" class="property-group">
                  <label class="property-label">Tipos de archivo permitidos</label>
                  <input
                    v-model="selectedElement.props.accept"
                    type="text"
                    class="property-input"
                    placeholder="Ej: .pdf,.doc,.jpg"
                  />
                </div>

                <div v-if="selectedElement.type === 'file'" class="property-group checkbox-group">
                  <label class="checkbox-property">
                    <input
                      v-model="selectedElement.props.multiple"
                      type="checkbox"
                      class="property-checkbox"
                    />
                    <span class="checkbox-label">
                      <span class="checkbox-icon">✓</span>
                      Permitir múltiples archivos
                    </span>
                  </label>
                </div>

                <div v-if="selectedElement.type === 'file'" class="property-group">
                  <label class="property-label">Tamaño máximo (MB)</label>
                  <input
                    v-model.number="selectedElement.props.maxSize"
                    type="number"
                    class="property-input"
                    min="1"
                    placeholder="Ej: 5"
                  />
                </div>

                <!-- Propiedades para contraseña -->
                <div
                  v-if="selectedElement.type === 'password'"
                  class="property-group checkbox-group"
                >
                  <label class="checkbox-property">
                    <input
                      v-model="selectedElement.props.showToggle"
                      type="checkbox"
                      class="property-checkbox"
                    />
                    <span class="checkbox-label">
                      <span class="checkbox-icon">✓</span>
                      Mostrar botón para ver/ocultar
                    </span>
                  </label>
                </div>

                <!-- Propiedades para color -->
                <div v-if="selectedElement.type === 'color'" class="property-group">
                  <label class="property-label">Color por defecto</label>
                  <input
                    v-model="selectedElement.props.defaultValue"
                    type="color"
                    class="property-input"
                  />
                </div>

                <!-- Texto de ayuda -->
                <div class="property-group">
                  <label class="property-label">Texto de ayuda</label>
                  <textarea
                    v-model="selectedElement.props.helpText"
                    class="property-textarea"
                    placeholder="Texto de ayuda opcional..."
                    rows="2"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>

    <!-- Toast de notificación para guardado -->
    <div v-if="showSaveNotification" class="notification-toast" :class="notificationType">
      <span class="toast-icon">
        {{ notificationType === 'success' ? '✅' : '❌' }}
      </span>
      <span class="toast-message">{{ saveMessage }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import OptionsEditor from '@/components/FormBuilder/OptionsEditor.vue'
import { useFormBuilderHelpers } from '@/composables/useFormBuilderHelpers'
import {
  useFormBuilderStore,
  type AvailableComponent,
  type FormElement,
} from '@/stores/formBuilder'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const formStore = useFormBuilderStore()

// Usar composable para helpers
const { getComponentIcon, getComponentName, getMockContent } = useFormBuilderHelpers()

// Manejar la carga del formulario basándose en la ruta
onMounted(() => {
  // Si hay un ID en la ruta, intentar cargar ese formulario
  if (route.params.id) {
    const formId = route.params.id as string
    formStore.loadForm(formId)
  }
  // Si no hay ID y no hay formulario actual cargado, crear uno nuevo
  else if (!formStore.currentForm.id && formStore.currentForm.elements.length === 0) {
    formStore.newForm()
  }
  // Si ya hay un formulario cargado (desde otra vista), mantenerlo
})

// Estado para notificaciones
const showSaveNotification = ref(false)
const saveMessage = ref('')
const notificationType = ref<'success' | 'error'>('success')

// Estado para drag and drop
const isDragging = ref(false)

const currentForm = computed(() => formStore.currentForm)
const availableComponents = computed(() => formStore.availableComponents)
const selectedElement = computed(() => formStore.selectedElement)

const goBack = () => {
  // Si hay elementos en el formulario, mostrar confirmación
  if (currentForm.value.elements.length > 0) {
    const message = currentForm.value.id
      ? '¿Estás seguro de que quieres salir? Los cambios no guardados se perderán.'
      : '¿Estás seguro de que quieres salir? Perderás el diseño actual del formulario si no lo has guardado.'

    if (confirm(message)) {
      router.push('/')
    }
  } else {
    // Si no hay elementos, navegar directamente
    router.push('/')
  }
}

const saveForm = () => {
  // Validar que el formulario tenga elementos
  if (currentForm.value.elements.length === 0) {
    saveMessage.value = 'No puedes guardar un formulario vacío. Agrega al menos un campo.'
    notificationType.value = 'error'
    showSaveNotification.value = true

    setTimeout(() => {
      showSaveNotification.value = false
    }, 4000)
    return
  }

  // Validar que el formulario tenga nombre
  if (!currentForm.value.name.trim()) {
    saveMessage.value = 'Por favor, asigna un nombre al formulario.'
    notificationType.value = 'error'
    showSaveNotification.value = true

    setTimeout(() => {
      showSaveNotification.value = false
    }, 4000)
    return
  }

  // Validar nombre duplicado
  const nameExists = formStore.savedForms.some(
    (form) =>
      form.name.toLowerCase() === currentForm.value.name.trim().toLowerCase() &&
      form.id !== currentForm.value.id,
  )

  if (nameExists) {
    saveMessage.value = 'Ya existe un formulario con ese nombre. Por favor, elige otro nombre.'
    notificationType.value = 'error'
    showSaveNotification.value = true

    setTimeout(() => {
      showSaveNotification.value = false
    }, 4000)
    return
  }

  const isNewForm = !currentForm.value.id
  formStore.saveForm()

  // Mostrar mensaje apropiado
  if (isNewForm) {
    saveMessage.value = 'Formulario creado y guardado correctamente'
  } else {
    saveMessage.value = 'Cambios guardados correctamente'
  }

  notificationType.value = 'success'
  showSaveNotification.value = true

  // Ocultar notificación después de 3 segundos
  setTimeout(() => {
    showSaveNotification.value = false
  }, 3000)
}

const previewForm = () => {
  // Validar que el formulario tenga elementos
  if (currentForm.value.elements.length === 0) {
    saveMessage.value = 'No puedes previsualizar un formulario vacío. Agrega al menos un campo.'
    notificationType.value = 'error'
    showSaveNotification.value = true

    setTimeout(() => {
      showSaveNotification.value = false
    }, 4000)
    return
  }

  // Validar que el formulario tenga nombre
  if (!currentForm.value.name.trim()) {
    saveMessage.value = 'Por favor, asigna un nombre al formulario antes de previsualizarlo.'
    notificationType.value = 'error'
    showSaveNotification.value = true

    setTimeout(() => {
      showSaveNotification.value = false
    }, 4000)
    return
  }

  // Validar nombre duplicado
  const nameExists = formStore.savedForms.some(
    (form) =>
      form.name.toLowerCase() === currentForm.value.name.trim().toLowerCase() &&
      form.id !== currentForm.value.id,
  )

  if (nameExists) {
    saveMessage.value =
      'Ya existe un formulario con ese nombre. Por favor, elige otro nombre antes de previsualizar.'
    notificationType.value = 'error'
    showSaveNotification.value = true

    setTimeout(() => {
      showSaveNotification.value = false
    }, 4000)
    return
  }

  // Si no tiene ID, guardarlo primero
  if (!currentForm.value.id) {
    formStore.saveForm()

    // Mostrar mensaje específico para vista previa
    saveMessage.value = 'Preparando vista previa...'
    notificationType.value = 'success'
    showSaveNotification.value = true

    setTimeout(() => {
      showSaveNotification.value = false
    }, 1500)

    // Esperar un poco antes de navegar
    setTimeout(() => {
      router.push(`/preview/${currentForm.value.id}`)
    }, 300)
  } else {
    // Si ya existe, navegar directamente
    router.push(`/preview/${currentForm.value.id}`)
  }
}

const selectElement = (element: FormElement) => {
  formStore.selectElement(element)
}

const removeElement = (elementId: string) => {
  formStore.removeElement(elementId)
}

const duplicateElement = (element: FormElement) => {
  formStore.duplicateElement(element)
}

const moveElementUp = (index: number) => {
  formStore.moveElement(index, index - 1)
}

const moveElementDown = (index: number) => {
  formStore.moveElement(index, index + 1)
}

const clearForm = () => {
  // Confirmar si hay elementos en el formulario
  if (currentForm.value.elements.length > 0 || currentForm.value.name.trim()) {
    if (
      confirm(
        '¿Estás seguro de que quieres vaciar el formulario? Se perderán todos los elementos y el nombre.',
      )
    ) {
      // Vaciar el formulario
      formStore.newForm()

      // Mostrar notificación
      saveMessage.value = 'Formulario vaciado correctamente'
      notificationType.value = 'success'
      showSaveNotification.value = true

      setTimeout(() => {
        showSaveNotification.value = false
      }, 2000)
    }
  }
}

// Drag and Drop
const onDragStart = (event: DragEvent, component: AvailableComponent) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData('application/json', JSON.stringify(component))
  }
}

const onDrop = (event: DragEvent) => {
  event.preventDefault()
  isDragging.value = false
  if (event.dataTransfer) {
    const componentData = JSON.parse(event.dataTransfer.getData('application/json'))
    formStore.addElement(componentData.id)
  }
}
</script>

<style scoped>
@import '@/assets/styles/FormBuilder.css';
</style>
