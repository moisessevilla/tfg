<!-- src/views/TemplatesView.vue -->
<template>
  <div class="templates-container">
    <!-- Header -->
    <header class="templates-header">
      <div class="header-content">
        <button @click="goBack" class="btn-back">
          <span class="btn-icon">←</span>
          Volver al Dashboard
        </button>
        <h1>Plantillas de Formularios</h1>
        <div class="header-badge">
          <span class="badge-icon">🏆</span>
          Deportes
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="templates-hero">
      <div class="hero-content">
        <div class="hero-left">
          <div class="hero-icon">📋</div>
          <h2>Plantillas Prediseñadas</h2>
          <p>Ahorra tiempo con nuestras plantillas profesionales para centros deportivos</p>
        </div>

        <!-- Components Showcase -->
        <div class="components-showcase">
          <div class="mac-window">
            <div class="mac-window-header">
              <div class="window-controls">
                <span class="control-btn close"></span>
                <span class="control-btn minimize"></span>
                <span class="control-btn maximize"></span>
              </div>
              <div class="window-title">Componentes Disponibles</div>
            </div>
            <div class="mac-window-content">
              <div class="components-grid">
                <div class="component-showcase-item">
                  <span class="showcase-icon">📝</span>
                  <span class="showcase-name">Texto</span>
                </div>
                <div class="component-showcase-item">
                  <span class="showcase-icon">📧</span>
                  <span class="showcase-name">Email</span>
                </div>
                <div class="component-showcase-item">
                  <span class="showcase-icon">🔐</span>
                  <span class="showcase-name">Contraseña</span>
                </div>
                <div class="component-showcase-item">
                  <span class="showcase-icon">🔢</span>
                  <span class="showcase-name">Número</span>
                </div>
                <div class="component-showcase-item">
                  <span class="showcase-icon">📱</span>
                  <span class="showcase-name">Teléfono</span>
                </div>
                <div class="component-showcase-item">
                  <span class="showcase-icon">🔗</span>
                  <span class="showcase-name">URL</span>
                </div>
                <div class="component-showcase-item">
                  <span class="showcase-icon">📄</span>
                  <span class="showcase-name">Área de Texto</span>
                </div>
                <div class="component-showcase-item">
                  <span class="showcase-icon">📋</span>
                  <span class="showcase-name">Selección</span>
                </div>
                <div class="component-showcase-item">
                  <span class="showcase-icon">☑️</span>
                  <span class="showcase-name">Checkbox</span>
                </div>
                <div class="component-showcase-item">
                  <span class="showcase-icon">🔘</span>
                  <span class="showcase-name">Radio</span>
                </div>
                <div class="component-showcase-item">
                  <span class="showcase-icon">📅</span>
                  <span class="showcase-name">Fecha</span>
                </div>
                <div class="component-showcase-item">
                  <span class="showcase-icon">⏰</span>
                  <span class="showcase-name">Hora</span>
                </div>
                <div class="component-showcase-item">
                  <span class="showcase-icon">📎</span>
                  <span class="showcase-name">Archivo</span>
                </div>
                <div class="component-showcase-item">
                  <span class="showcase-icon">🎚️</span>
                  <span class="showcase-name">Rango</span>
                </div>
                <div class="component-showcase-item">
                  <span class="showcase-icon">🎨</span>
                  <span class="showcase-name">Color</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Filter -->
    <section class="categories-section">
      <div class="categories-container">
        <button
          v-for="category in categories"
          :key="category.id"
          @click="selectedCategory = category.id"
          :class="['category-btn', { active: selectedCategory === category.id }]"
        >
          <span class="category-icon">{{ category.icon }}</span>
          <span class="category-name">{{ category.name }}</span>
        </button>
      </div>
    </section>

    <!-- Templates Grid -->
    <main class="templates-main">
      <div class="templates-grid">
        <div
          v-for="template in filteredTemplates"
          :key="template.id"
          class="template-card"
          :class="{ featured: template.featured }"
        >
          <div class="template-header">
            <div class="template-icon-wrapper" :style="{ background: template.color }">
              <span class="template-icon">{{ template.icon }}</span>
            </div>
            <div class="template-badges">
              <span class="badge-count"> {{ template.fields }} campos </span>
              <span v-if="template.featured" class="badge-featured"> ⭐ Popular </span>
            </div>
          </div>

          <div class="template-body">
            <h3>{{ template.name }}</h3>
            <p>{{ template.description }}</p>

            <div class="template-preview">
              <div class="preview-title">Campos incluidos:</div>
              <ul class="preview-fields">
                <li v-for="(field, index) in template.previewFields.slice(0, 4)" :key="index">
                  <span class="field-icon">{{ getFieldIcon(field.type) }}</span>
                  <span class="field-name">{{ field.label }}</span>
                </li>
                <li v-if="template.previewFields.length > 4" class="more-fields">
                  +{{ template.previewFields.length - 4 }} campos más
                </li>
              </ul>
            </div>
          </div>

          <div class="template-footer">
            <button @click="previewTemplate(template)" class="btn-secondary">
              <span class="btn-icon">👁️</span>
              Vista Previa
            </button>
            <button @click="useTemplate(template)" class="btn-primary">
              <span class="btn-icon">✨</span>
              Usar Plantilla
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredTemplates.length === 0" class="empty-state">
        <div class="empty-icon">🔍</div>
        <h3>No hay plantillas en esta categoría</h3>
        <p>Prueba seleccionando otra categoría o vuelve a "Todas"</p>
      </div>
    </main>

    <!-- Template Preview Modal -->
    <TemplatePreviewModal
      v-if="showPreviewModal"
      :template="selectedTemplate"
      @close="closePreviewModal"
      @use="useTemplate"
    />

    <!-- Loading State -->
    <div v-if="isCreating" class="loading-overlay">
      <div class="loading-content">
        <div class="loading-spinner">⏳</div>
        <h3>Creando formulario...</h3>
        <p>Aplicando la plantilla seleccionada</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TemplatePreviewModal from '@/components/TemplatePreviewModal.vue'
import { useTemplates } from '@/composables/useTemplates'
import type { Template } from '@/stores/templates'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { templates, createFormFromTemplate } = useTemplates()

// State
const selectedCategory = ref('all')
const showPreviewModal = ref(false)
const selectedTemplate = ref<Template | null>(null)
const isCreating = ref(false)

// Categories
const categories = ref([
  { id: 'all', name: 'Todas', icon: '🏅' },
  { id: 'team', name: 'Deportes de Equipo', icon: '👥' },
  { id: 'individual', name: 'Deportes Individuales', icon: '🏃' },
  { id: 'wellness', name: 'Bienestar', icon: '🧘' },
])

// Computed
const filteredTemplates = computed(() => {
  if (selectedCategory.value === 'all') {
    return templates.value
  }
  return templates.value.filter((t) => t.category === selectedCategory.value)
})

// Methods
const goBack = () => {
  router.push('/')
}

const getFieldIcon = (type: string): string => {
  const icons: Record<string, string> = {
    'text-input': '📝',
    email: '📧',
    phone: '📱',
    number: '🔢',
    date: '📅',
    select: '📋',
    radio: '🔘',
    checkbox: '☑️',
    textarea: '📄',
  }
  return icons[type] || '📝'
}

const previewTemplate = (template: Template) => {
  selectedTemplate.value = template
  showPreviewModal.value = true
}

const closePreviewModal = () => {
  showPreviewModal.value = false
  selectedTemplate.value = null
}

const useTemplate = async (template: Template) => {
  isCreating.value = true
  closePreviewModal()

  try {
    // Crear el formulario a partir de la plantilla
    await createFormFromTemplate(template)

    // Navegar al editor con el nuevo formulario
    setTimeout(() => {
      router.push('/builder')
    }, 1000)
  } catch (error) {
    console.error('Error creando formulario desde plantilla:', error)
    isCreating.value = false
  }
}
</script>

<style scoped>
@import '@/assets/styles/TemplatesView.css';
</style>
