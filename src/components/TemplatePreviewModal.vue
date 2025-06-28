<!-- src/components/TemplatePreviewModal.vue -->
<template>
  <div class="modal-overlay" @click="closeModal">
    <div class="modal-container" @click.stop>
      <div class="modal-header">
        <div class="header-left">
          <div class="template-icon" :style="{ background: template?.color }">
            {{ template?.icon }}
          </div>
          <div class="header-info">
            <h2>{{ template?.name }}</h2>
            <p>{{ template?.description }}</p>
            <div class="template-stats">
              <span class="stat-badge">{{ template?.fields }} campos</span>
              <span v-if="template?.featured" class="featured-badge">⭐ Popular</span>
            </div>
          </div>
        </div>
        <button @click="closeModal" class="close-btn">✕</button>
      </div>

      <div class="modal-content">
        <div class="preview-section">
          <h3>Campos incluidos en esta plantilla</h3>
          <div class="fields-list">
            <div v-for="(element, index) in template?.formElements" :key="index" class="field-item">
              <div class="field-number">{{ index + 1 }}</div>
              <div class="field-content">
                <div class="field-header">
                  <span class="field-icon">{{ getFieldIcon(element.type) }}</span>
                  <span class="field-label">{{ element.props.label }}</span>
                  <span v-if="element.props.required" class="required-badge">Obligatorio</span>
                </div>

                <div class="field-type">{{ getFieldTypeName(element.type) }}</div>

                <div v-if="element.props.placeholder" class="field-placeholder">
                  Placeholder: "{{ element.props.placeholder }}"
                </div>

                <!-- Vista previa específica por tipo de campo -->
                <div class="field-preview">
                  <!-- Campo de texto -->
                  <div v-if="element.type === 'text-input'" class="preview-input">
                    {{ element.props.placeholder || 'Texto de ejemplo...' }}
                  </div>

                  <!-- Email -->
                  <div v-else-if="element.type === 'email'" class="preview-input">
                    {{ element.props.placeholder || 'usuario@ejemplo.com' }}
                  </div>

                  <!-- Teléfono -->
                  <div v-else-if="element.type === 'phone'" class="preview-input">
                    {{ element.props.placeholder || '+34 600 00 00 00' }}
                  </div>

                  <!-- Número -->
                  <div v-else-if="element.type === 'number'" class="preview-input">
                    {{ element.props.placeholder || '0' }}
                    <span v-if="element.props.min || element.props.max" class="range-info">
                      ({{ element.props.min || 'Min' }} - {{ element.props.max || 'Max' }})
                    </span>
                  </div>

                  <!-- Fecha -->
                  <div v-else-if="element.type === 'date'" class="preview-input">
                    📅 {{ element.props.placeholder || 'dd/mm/aaaa' }}
                  </div>

                  <!-- Textarea -->
                  <div v-else-if="element.type === 'textarea'" class="preview-textarea">
                    {{ element.props.placeholder || 'Área de texto...' }}
                  </div>

                  <!-- Select -->
                  <div v-else-if="element.type === 'select'" class="preview-select">
                    <div class="select-preview">
                      {{ element.props.placeholder || 'Selecciona una opción' }} ▼
                    </div>
                    <div v-if="element.props.options" class="options-preview">
                      <span
                        v-for="(option, optIndex) in element.props.options.slice(0, 3)"
                        :key="optIndex"
                        class="option-item"
                      >
                        • {{ option.label }}
                      </span>
                      <span v-if="element.props.options.length > 3" class="more-options">
                        ... y {{ element.props.options.length - 3 }} más
                      </span>
                    </div>
                  </div>

                  <!-- Radio -->
                  <div v-else-if="element.type === 'radio'" class="preview-radio">
                    <div v-if="element.props.options" class="radio-options">
                      <div
                        v-for="(option, optIndex) in element.props.options.slice(0, 3)"
                        :key="optIndex"
                        class="radio-option"
                      >
                        ◯ {{ option.label }}
                      </div>
                      <div v-if="element.props.options.length > 3" class="more-options">
                        ... y {{ element.props.options.length - 3 }} opciones más
                      </div>
                    </div>
                  </div>

                  <!-- Checkbox -->
                  <div v-else-if="element.type === 'checkbox'" class="preview-checkbox">
                    ☐ {{ element.props.label }}
                  </div>

                  <!-- Otros tipos -->
                  <div v-else class="preview-generic">
                    {{ element.props.placeholder || `Campo de ${getFieldTypeName(element.type)}` }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="template-info">
          <div class="info-icon">💡</div>
          <div class="info-content">
            <strong>Información:</strong> Esta plantilla te ahorrará tiempo al incluir todos los
            campos necesarios para {{ template?.name?.toLowerCase() }}. Podrás personalizar cada
            campo después de crear el formulario.
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button @click="closeModal" class="btn-secondary">
          <span class="btn-icon">❌</span>
          Cancelar
        </button>
        <button @click="useTemplate" class="btn-primary">
          <span class="btn-icon">✨</span>
          Usar esta Plantilla
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Template } from '@/stores/templates'

interface Props {
  template: Template | null
}

interface Emits {
  (e: 'close'): void
  (e: 'use', template: Template): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const getFieldIcon = (type: string): string => {
  const icons: Record<string, string> = {
    'text-input': '📝',
    email: '📧',
    phone: '📱',
    number: '🔢',
    date: '📅',
    time: '⏰',
    select: '📋',
    radio: '🔘',
    checkbox: '☑️',
    textarea: '📄',
    file: '📎',
    range: '🎚️',
    password: '🔐',
    color: '🎨',
    url: '🔗',
  }
  return icons[type] || '📝'
}

const getFieldTypeName = (type: string): string => {
  const names: Record<string, string> = {
    'text-input': 'Texto',
    email: 'Email',
    phone: 'Teléfono',
    number: 'Número',
    date: 'Fecha',
    time: 'Hora',
    select: 'Selección',
    radio: 'Opción única',
    checkbox: 'Casilla',
    textarea: 'Texto largo',
    file: 'Archivo',
    range: 'Rango',
    password: 'Contraseña',
    color: 'Color',
    url: 'URL',
  }
  return names[type] || 'Campo'
}

const closeModal = () => {
  emit('close')
}

const useTemplate = () => {
  if (props.template) {
    emit('use', props.template)
  }
}
</script>

<style>
@import '@/assets/styles/TemplatePreviewModal.css';
</style>
