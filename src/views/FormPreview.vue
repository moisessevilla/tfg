<!-- src/views/FormPreview.vue -->
<template>
  <!-- Header FUERA del contenedor principal -->
  <div class="preview-header-wrapper">
    <nav class="preview-nav">
      <div class="nav-content">
        <button @click="goBack" class="nav-btn back-btn">
          <span class="nav-icon">←</span>
          Volver al Dashboard
        </button>

        <div class="nav-title">
          <h1>{{ form?.name || 'Vista Previa del Formulario' }}</h1>
          <span class="nav-subtitle">Vista previa interactiva</span>
        </div>

        <div class="nav-actions">
          <button @click="editForm" class="nav-btn edit-btn">
            <span class="nav-icon">✏️</span>
            Editar
          </button>
          <button @click="exportForm" class="nav-btn export-btn">
            <span class="nav-icon">📥</span>
            Exportar
          </button>
        </div>
      </div>
    </nav>
  </div>

  <!-- Contenedor principal con fondo gris -->
  <div class="form-preview-container">
    <main class="preview-main">
      <!-- Form Not Found -->
      <div v-if="!form" class="not-found">
        <div class="not-found-content">
          <div class="not-found-icon">❌</div>
          <h2>Formulario no encontrado</h2>
          <p>El formulario que intentas visualizar no existe o ha sido eliminado.</p>
          <button @click="goBack" class="btn-primary">Volver al Dashboard</button>
        </div>
      </div>

      <!-- Form Preview -->
      <div v-else class="form-preview-wrapper">
        <!-- Form Header -->
        <div class="form-header">
          <div class="form-header-content">
            <div class="form-title-section">
              <h2>{{ form.name }}</h2>
              <p v-if="form.description" class="form-description">{{ form.description }}</p>
            </div>

            <div class="form-stats">
              <div class="stat-item">
                <span class="stat-icon">📝</span>
                <span class="stat-text">{{ form.elements.length }} campos</span>
              </div>
              <div class="stat-item">
                <span class="stat-icon">⭐</span>
                <span class="stat-text">{{ requiredFieldsCount }} obligatorios</span>
              </div>
              <div class="stat-item">
                <span class="stat-icon">⏱️</span>
                <span class="stat-text">~{{ estimatedTime }} min</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Form Container -->
        <div class="form-container">
          <form @submit.prevent="submitForm" class="preview-form">
            <!-- Progress Indicator -->
            <div class="progress-container">
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: `${completionPercentage}%` }"></div>
              </div>
              <span class="progress-text"
                >{{ completedFields }}/{{ form.elements.length }} completados</span
              >
            </div>

            <!-- Form Fields -->
            <div class="form-fields">
              <div
                v-for="(element, index) in form.elements"
                :key="element.id"
                class="form-field"
                :class="{ 'has-error': fieldErrors[element.id] }"
              >
                <div class="field-number">{{ index + 1 }}</div>

                <!-- Text Input -->
                <div v-if="element.type === 'text-input'" class="field-content">
                  <label :for="element.id" class="field-label">
                    {{ element.props.label }}
                    <span v-if="element.props.required" class="required-indicator">*</span>
                  </label>

                  <input
                    :id="element.id"
                    v-model="formData[element.id]"
                    type="text"
                    :placeholder="element.props.placeholder"
                    :required="element.props.required"
                    :maxlength="element.props.maxLength || undefined"
                    class="field-input"
                    @blur="validateField(element)"
                  />

                  <div v-if="element.props.helpText" class="field-help">
                    {{ element.props.helpText }}
                  </div>

                  <div v-if="fieldErrors[element.id]" class="field-error">
                    {{ fieldErrors[element.id] }}
                  </div>
                </div>

                <!-- Email Input -->
                <div v-else-if="element.type === 'email'" class="field-content">
                  <label :for="element.id" class="field-label">
                    {{ element.props.label }}
                    <span v-if="element.props.required" class="required-indicator">*</span>
                  </label>

                  <input
                    :id="element.id"
                    v-model="formData[element.id]"
                    type="email"
                    :placeholder="element.props.placeholder"
                    :required="element.props.required"
                    :pattern="element.props.pattern || undefined"
                    class="field-input"
                    @blur="validateField(element)"
                  />

                  <div v-if="element.props.helpText" class="field-help">
                    {{ element.props.helpText }}
                  </div>

                  <div v-if="fieldErrors[element.id]" class="field-error">
                    {{ fieldErrors[element.id] }}
                  </div>
                </div>

                <!-- Password Input -->
                <div v-else-if="element.type === 'password'" class="field-content">
                  <label :for="element.id" class="field-label">
                    {{ element.props.label }}
                    <span v-if="element.props.required" class="required-indicator">*</span>
                  </label>

                  <div class="password-input-wrapper">
                    <input
                      :id="element.id"
                      v-model="formData[element.id]"
                      :type="showPassword[element.id] ? 'text' : 'password'"
                      :placeholder="element.props.placeholder"
                      :required="element.props.required"
                      :minlength="element.props.minLength || undefined"
                      class="field-input"
                      @blur="validateField(element)"
                    />
                    <button
                      v-if="element.props.showToggle"
                      type="button"
                      @click="togglePassword(element.id)"
                      class="password-toggle"
                    >
                      {{ showPassword[element.id] ? '👁️' : '👁️‍🗨️' }}
                    </button>
                  </div>

                  <div v-if="element.props.helpText" class="field-help">
                    {{ element.props.helpText }}
                  </div>

                  <div v-if="fieldErrors[element.id]" class="field-error">
                    {{ fieldErrors[element.id] }}
                  </div>
                </div>

                <!-- Number Input -->
                <div v-else-if="element.type === 'number'" class="field-content">
                  <label :for="element.id" class="field-label">
                    {{ element.props.label }}
                    <span v-if="element.props.required" class="required-indicator">*</span>
                  </label>

                  <input
                    :id="element.id"
                    v-model.number="formData[element.id]"
                    type="number"
                    :placeholder="element.props.placeholder"
                    :required="element.props.required"
                    :min="element.props.min || undefined"
                    :max="element.props.max || undefined"
                    :step="element.props.step || undefined"
                    class="field-input"
                    @blur="validateField(element)"
                  />

                  <div v-if="element.props.helpText" class="field-help">
                    {{ element.props.helpText }}
                  </div>

                  <div v-if="fieldErrors[element.id]" class="field-error">
                    {{ fieldErrors[element.id] }}
                  </div>
                </div>

                <!-- Phone Input -->
                <div v-else-if="element.type === 'phone'" class="field-content">
                  <label :for="element.id" class="field-label">
                    {{ element.props.label }}
                    <span v-if="element.props.required" class="required-indicator">*</span>
                  </label>

                  <input
                    :id="element.id"
                    v-model="formData[element.id]"
                    type="tel"
                    :placeholder="element.props.placeholder"
                    :required="element.props.required"
                    :pattern="element.props.pattern || undefined"
                    class="field-input"
                    @blur="validateField(element)"
                  />

                  <div v-if="element.props.helpText" class="field-help">
                    {{ element.props.helpText }}
                  </div>

                  <div v-if="fieldErrors[element.id]" class="field-error">
                    {{ fieldErrors[element.id] }}
                  </div>
                </div>

                <!-- URL Input -->
                <div v-else-if="element.type === 'url'" class="field-content">
                  <label :for="element.id" class="field-label">
                    {{ element.props.label }}
                    <span v-if="element.props.required" class="required-indicator">*</span>
                  </label>

                  <input
                    :id="element.id"
                    v-model="formData[element.id]"
                    type="url"
                    :placeholder="element.props.placeholder"
                    :required="element.props.required"
                    class="field-input"
                    @blur="validateField(element)"
                  />

                  <div v-if="element.props.helpText" class="field-help">
                    {{ element.props.helpText }}
                  </div>

                  <div v-if="fieldErrors[element.id]" class="field-error">
                    {{ fieldErrors[element.id] }}
                  </div>
                </div>

                <!-- Date Input -->
                <div v-else-if="element.type === 'date'" class="field-content">
                  <label :for="element.id" class="field-label">
                    {{ element.props.label }}
                    <span v-if="element.props.required" class="required-indicator">*</span>
                  </label>

                  <input
                    :id="element.id"
                    v-model="formData[element.id]"
                    type="date"
                    :required="element.props.required"
                    :min="element.props.min || undefined"
                    :max="element.props.max || undefined"
                    class="field-input"
                    @blur="validateField(element)"
                  />

                  <div v-if="element.props.helpText" class="field-help">
                    {{ element.props.helpText }}
                  </div>

                  <div v-if="fieldErrors[element.id]" class="field-error">
                    {{ fieldErrors[element.id] }}
                  </div>
                </div>

                <!-- Time Input -->
                <div v-else-if="element.type === 'time'" class="field-content">
                  <label :for="element.id" class="field-label">
                    {{ element.props.label }}
                    <span v-if="element.props.required" class="required-indicator">*</span>
                  </label>

                  <input
                    :id="element.id"
                    v-model="formData[element.id]"
                    type="time"
                    :required="element.props.required"
                    class="field-input"
                    @blur="validateField(element)"
                  />

                  <div v-if="element.props.helpText" class="field-help">
                    {{ element.props.helpText }}
                  </div>

                  <div v-if="fieldErrors[element.id]" class="field-error">
                    {{ fieldErrors[element.id] }}
                  </div>
                </div>

                <!-- File Input -->
                <div v-else-if="element.type === 'file'" class="field-content">
                  <label :for="element.id" class="field-label">
                    {{ element.props.label }}
                    <span v-if="element.props.required" class="required-indicator">*</span>
                  </label>

                  <div class="file-input-wrapper">
                    <input
                      :id="element.id"
                      type="file"
                      :accept="element.props.accept"
                      :multiple="element.props.multiple"
                      :required="element.props.required"
                      class="file-input-hidden"
                      @change="handleFileChange(element.id, $event)"
                    />
                    <label :for="element.id" class="file-input-label">
                      <span class="file-icon">📁</span>
                      <span class="file-text">{{
                        fileNames[element.id] ||
                        element.props.placeholder ||
                        'Seleccionar archivo...'
                      }}</span>
                    </label>
                  </div>

                  <div v-if="element.props.helpText" class="field-help">
                    {{ element.props.helpText }}
                  </div>

                  <div v-if="fieldErrors[element.id]" class="field-error">
                    {{ fieldErrors[element.id] }}
                  </div>
                </div>

                <!-- Range Input -->
                <div v-else-if="element.type === 'range'" class="field-content">
                  <label :for="element.id" class="field-label">
                    {{ element.props.label }}
                    <span v-if="element.props.required" class="required-indicator">*</span>
                  </label>

                  <div class="range-wrapper">
                    <input
                      :id="element.id"
                      v-model.number="formData[element.id]"
                      type="range"
                      :min="element.props.min || 0"
                      :max="element.props.max || 100"
                      :step="element.props.step || 1"
                      :required="element.props.required"
                      class="field-range"
                      @input="validateField(element)"
                    />
                    <span v-if="element.props.showValue" class="range-value">{{
                      formData[element.id] || element.props.min || 0
                    }}</span>
                  </div>

                  <div v-if="element.props.helpText" class="field-help">
                    {{ element.props.helpText }}
                  </div>

                  <div v-if="fieldErrors[element.id]" class="field-error">
                    {{ fieldErrors[element.id] }}
                  </div>
                </div>

                <!-- Color Input -->
                <div v-else-if="element.type === 'color'" class="field-content">
                  <label :for="element.id" class="field-label">
                    {{ element.props.label }}
                    <span v-if="element.props.required" class="required-indicator">*</span>
                  </label>

                  <div class="color-input-wrapper">
                    <input
                      :id="element.id"
                      v-model="formData[element.id]"
                      type="color"
                      :required="element.props.required"
                      class="field-color"
                      @change="validateField(element)"
                    />
                    <span class="color-value">{{
                      formData[element.id] || element.props.defaultValue || '#000000'
                    }}</span>
                  </div>

                  <div v-if="element.props.helpText" class="field-help">
                    {{ element.props.helpText }}
                  </div>

                  <div v-if="fieldErrors[element.id]" class="field-error">
                    {{ fieldErrors[element.id] }}
                  </div>
                </div>

                <!-- Textarea -->
                <div v-else-if="element.type === 'textarea'" class="field-content">
                  <label :for="element.id" class="field-label">
                    {{ element.props.label }}
                    <span v-if="element.props.required" class="required-indicator">*</span>
                  </label>

                  <textarea
                    :id="element.id"
                    :value="String(formData[element.id] || '')"
                    @input="formData[element.id] = ($event.target as HTMLTextAreaElement).value"
                    :placeholder="element.props.placeholder"
                    :required="element.props.required"
                    :rows="element.props.rows || 4"
                    class="field-textarea"
                    @blur="validateField(element)"
                  ></textarea>

                  <div v-if="element.props.helpText" class="field-help">
                    {{ element.props.helpText }}
                  </div>

                  <div v-if="fieldErrors[element.id]" class="field-error">
                    {{ fieldErrors[element.id] }}
                  </div>
                </div>

                <!-- Select -->
                <div v-else-if="element.type === 'select'" class="field-content">
                  <label :for="element.id" class="field-label">
                    {{ element.props.label }}
                    <span v-if="element.props.required" class="required-indicator">*</span>
                  </label>

                  <select
                    :id="element.id"
                    v-model="formData[element.id]"
                    :required="element.props.required"
                    class="field-select"
                    @blur="validateField(element)"
                  >
                    <option value="">
                      {{ element.props.placeholder || 'Selecciona una opción' }}
                    </option>
                    <option
                      v-for="option in element.props.options"
                      :key="option.value"
                      :value="option.value"
                    >
                      {{ option.label }}
                    </option>
                  </select>

                  <div v-if="element.props.helpText" class="field-help">
                    {{ element.props.helpText }}
                  </div>

                  <div v-if="fieldErrors[element.id]" class="field-error">
                    {{ fieldErrors[element.id] }}
                  </div>
                </div>

                <!-- Checkbox -->
                <div v-else-if="element.type === 'checkbox'" class="field-content">
                  <label class="checkbox-label">
                    <input
                      :id="element.id"
                      v-model="formData[element.id]"
                      type="checkbox"
                      :required="element.props.required"
                      class="field-checkbox"
                      @change="validateField(element)"
                    />
                    <span class="checkbox-text">
                      {{ element.props.label }}
                      <span v-if="element.props.required" class="required-indicator">*</span>
                    </span>
                  </label>

                  <div v-if="element.props.helpText" class="field-help">
                    {{ element.props.helpText }}
                  </div>

                  <div v-if="fieldErrors[element.id]" class="field-error">
                    {{ fieldErrors[element.id] }}
                  </div>
                </div>

                <!-- Radio -->
                <div v-else-if="element.type === 'radio'" class="field-content">
                  <fieldset class="radio-fieldset">
                    <legend class="field-label">
                      {{ element.props.label }}
                      <span v-if="element.props.required" class="required-indicator">*</span>
                    </legend>

                    <div class="radio-options">
                      <label
                        v-for="option in element.props.options"
                        :key="option.value"
                        class="radio-label"
                      >
                        <input
                          v-model="formData[element.id]"
                          type="radio"
                          :value="option.value"
                          :name="element.id"
                          :required="element.props.required"
                          class="field-radio"
                          @change="validateField(element)"
                        />
                        <span class="radio-text">{{ option.label }}</span>
                      </label>
                    </div>
                  </fieldset>

                  <div v-if="element.props.helpText" class="field-help">
                    {{ element.props.helpText }}
                  </div>

                  <div v-if="fieldErrors[element.id]" class="field-error">
                    {{ fieldErrors[element.id] }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Form Actions -->
            <div class="form-actions">
              <button type="button" @click="resetForm" class="btn-secondary">
                <span class="btn-icon">🔄</span>
                Limpiar Formulario
              </button>

              <button type="submit" class="btn-primary" :disabled="!isFormValid">
                <span class="btn-icon">📤</span>
                Enviar Formulario
              </button>
            </div>
          </form>

          <!-- Success Message -->
          <div v-if="showSuccess" class="success-message">
            <div class="success-content">
              <div class="success-icon">✅</div>
              <h3>¡Formulario enviado exitosamente!</h3>
              <p>Todos los datos han sido procesados correctamente.</p>
              <button @click="resetForm" class="btn-primary">Enviar Otro</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFormBuilderStore, type FormElement } from '@/stores/formBuilder'

const route = useRoute()
const router = useRouter()
const formStore = useFormBuilderStore()

// Estado
const formData = ref<Record<string, string | number | boolean | string[] | File[]>>({})
const fieldErrors = ref<Record<string, string>>({})
const showSuccess = ref(false)
const showPassword = ref<Record<string, boolean>>({})
const fileNames = ref<Record<string, string>>({})

// Computed
const form = computed(() => {
  const formId = route.params.id as string
  return formStore.savedForms.find((f) => f.id === formId)
})

const requiredFieldsCount = computed(() => {
  return form.value?.elements.filter((el) => el.props.required).length || 0
})

const estimatedTime = computed(() => {
  if (!form.value) return 0
  // Estimar 30 segundos por campo
  return Math.ceil(form.value.elements.length * 0.5)
})

const completedFields = computed(() => {
  if (!form.value) return 0
  return form.value.elements.filter((element) => {
    const value = formData.value[element.id]
    return value !== '' && value !== null && value !== undefined
  }).length
})

const completionPercentage = computed(() => {
  if (!form.value || form.value.elements.length === 0) return 0
  return (completedFields.value / form.value.elements.length) * 100
})

const isFormValid = computed(() => {
  if (!form.value) return false

  // Verificar campos obligatorios
  const requiredFields = form.value.elements.filter((el) => el.props.required)
  return requiredFields.every((element) => {
    const value = formData.value[element.id]
    return value !== '' && value !== null && value !== undefined
  })
})

// Métodos
onMounted(() => {
  initializeFormData()
})

const initializeFormData = () => {
  if (form.value) {
    form.value.elements.forEach((element) => {
      if (element.type === 'checkbox') {
        formData.value[element.id] = false
      } else if (element.type === 'number' || element.type === 'range') {
        formData.value[element.id] = (element.props.min as number) || 0
      } else if (element.type === 'color') {
        formData.value[element.id] = element.props.defaultValue || '#000000'
      } else if (element.type === 'file') {
        formData.value[element.id] = ''
        fileNames.value[element.id] = ''
      } else {
        formData.value[element.id] = ''
      }
    })
  }
}

const validateField = (element: FormElement) => {
  const value = formData.value[element.id]

  // Limpiar error previo
  delete fieldErrors.value[element.id]

  // Validar campo obligatorio
  if (element.props.required && (!value || value === '')) {
    fieldErrors.value[element.id] = 'Este campo es obligatorio'
    return false
  }

  // Validar longitud máxima
  if (
    element.props.maxLength &&
    typeof value === 'string' &&
    value.length > element.props.maxLength
  ) {
    fieldErrors.value[element.id] = `Máximo ${element.props.maxLength} caracteres`
    return false
  }

  // Validar longitud mínima
  if (
    element.props.minLength &&
    typeof value === 'string' &&
    value.length < element.props.minLength
  ) {
    fieldErrors.value[element.id] = `Mínimo ${element.props.minLength} caracteres`
    return false
  }

  // Validaciones específicas por tipo
  if (element.type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value as string)) {
      fieldErrors.value[element.id] = 'Ingrese un email válido'
      return false
    }
  }

  if (element.type === 'url' && value) {
    try {
      new URL(value as string)
    } catch {
      fieldErrors.value[element.id] = 'Ingrese una URL válida'
      return false
    }
  }

  if (element.type === 'number' || element.type === 'range') {
    const numValue = Number(value)
    if (
      element.props.min !== null &&
      element.props.min !== undefined &&
      numValue < Number(element.props.min)
    ) {
      fieldErrors.value[element.id] = `El valor mínimo es ${element.props.min}`
      return false
    }
    if (
      element.props.max !== null &&
      element.props.max !== undefined &&
      numValue > Number(element.props.max)
    ) {
      fieldErrors.value[element.id] = `El valor máximo es ${element.props.max}`
      return false
    }
  }

  return true
}

const submitForm = () => {
  // Validar todos los campos
  let hasErrors = false
  if (form.value) {
    form.value.elements.forEach((element) => {
      if (!validateField(element)) {
        hasErrors = true
      }
    })
  }

  if (!hasErrors) {
    console.log('Datos del formulario:', formData.value)
    showSuccess.value = true

    // Scroll to success message
    setTimeout(() => {
      document.querySelector('.success-message')?.scrollIntoView({
        behavior: 'smooth',
      })
    }, 100)
  }
}

const resetForm = () => {
  showSuccess.value = false
  fieldErrors.value = {}
  fileNames.value = {}
  showPassword.value = {}
  initializeFormData()
}

const togglePassword = (fieldId: string) => {
  showPassword.value[fieldId] = !showPassword.value[fieldId]
}

const handleFileChange = (fieldId: string, event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
    const files = Array.from(input.files)
    const fileNamesList = files.map((f) => f.name).join(', ')
    formData.value[fieldId] = files
    fileNames.value[fieldId] = fileNamesList

    // Validar tamaño de archivo si está especificado
    const element = form.value?.elements.find((el) => el.id === fieldId)
    if (element?.props.maxSize) {
      const maxSizeBytes = element.props.maxSize * 1024 * 1024
      const oversizedFiles = files.filter((f) => f.size > maxSizeBytes)
      if (oversizedFiles.length > 0) {
        fieldErrors.value[fieldId] =
          `Archivo(s) demasiado grande(s). Máximo ${element.props.maxSize}MB`
      }
    }
  }
}

const goBack = () => {
  router.push('/')
}

const editForm = () => {
  if (form.value?.id) {
    formStore.loadForm(form.value.id)
    router.push('/builder')
  }
}

const exportForm = () => {
  if (form.value) {
    const dataStr = JSON.stringify(form.value, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${form.value.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`
    link.click()
    URL.revokeObjectURL(url)
  }
}
</script>

<style scoped>
@import '@/assets/styles/FormPreview.css';
</style>
