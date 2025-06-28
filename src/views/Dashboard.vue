<!-- src/views/Dashboard.vue -->
<template>
  <div class="dashboard">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-text">
          <h1>Formularios dinámicos</h1>
          <p>
            Crea, gestiona y despliega formularios dinámicos a partir de componentes básicos de
            manera intuitiva
          </p>
        </div>
        <div class="hero-stats">
          <div class="stat-card">
            <div class="stat-number">{{ savedForms.length }}</div>
            <div class="stat-label">Formularios</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">{{ totalElements }}</div>
            <div class="stat-label">Elementos</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">{{ totalRequired }}</div>
            <div class="stat-label">Obligatorios</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Actions Section -->
    <section class="actions-section">
      <div class="actions-container">
        <button @click="createNewForm" class="btn-primary-large">
          <span class="btn-icon">✨</span>
          <span class="btn-content">
            <span class="btn-title">Crear Nuevo Formulario</span>
            <span class="btn-subtitle">Comienza desde cero con nuestro builder visual</span>
          </span>
        </button>

        <div class="quick-actions">
          <button class="quick-action" @click="openImportModal">
            <span class="action-icon">📂</span>
            <span class="action-text">Importar JSON</span>
          </button>
          <button class="quick-action" @click="showTemplates">
            <span class="action-icon">📋</span>
            <span class="action-text">Plantillas</span>
          </button>
          <!--
          <button class="quick-action" @click="showHelp">
            <span class="action-icon">❓</span>
            <span class="action-text">Ayuda</span>
          </button>
        --></div>
      </div>
    </section>

    <!-- Forms Grid Section -->
    <section class="forms-section">
      <div class="section-header">
        <h2>Tus Formularios</h2>
        <div class="section-actions">
          <div class="search-box">
            <span class="search-icon">🔍</span>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Buscar formularios..."
              class="search-input"
            />
          </div>
          <select v-model="sortBy" class="sort-select">
            <option value="name">Ordenar por nombre</option>
            <option value="created">Más recientes</option>
            <option value="elements">Más elementos</option>
          </select>
        </div>
      </div>

      <div class="forms-grid">
        <div
          v-for="form in filteredForms"
          :key="form.id || ''"
          class="form-card"
          @click="selectForm(form)"
          :class="{
            selected: selectedFormId === form.id,
            'menu-active': activeMenu === form.id,
          }"
        >
          <div class="form-card-header">
            <div class="form-title-section">
              <h3>{{ form.name }}</h3>
              <div class="form-badges">
                <span class="badge elements-badge"> {{ form.elements.length }} elementos </span>
                <span v-if="getRequiredCount(form) > 0" class="badge required-badge">
                  {{ getRequiredCount(form) }} obligatorios
                </span>
              </div>
            </div>
            <div class="form-menu">
              <button @click.stop="toggleMenu(form.id!)" class="menu-btn">⋮</button>
              <div v-if="activeMenu === form.id" class="menu-dropdown">
                <button @click.stop="editForm(form.id!)" class="menu-item">
                  <span class="menu-icon">✏️</span>
                  Editar
                </button>
                <button @click.stop="previewForm(form.id!)" class="menu-item">
                  <span class="menu-icon">👁️</span>
                  Vista Previa
                </button>
                <button @click.stop="duplicateForm(form.id!)" class="menu-item">
                  <span class="menu-icon">📋</span>
                  Duplicar
                </button>
                <button @click.stop="exportForm(form)" class="menu-item">
                  <span class="menu-icon">📥</span>
                  Exportar
                </button>
                <hr class="menu-divider" />
                <button @click.stop="deleteForm(form.id!)" class="menu-item danger">
                  <span class="menu-icon">🗑️</span>
                  Eliminar
                </button>
              </div>
            </div>
          </div>

          <div class="form-description">
            {{ form.description || 'Sin descripción' }}
          </div>

          <div class="form-preview">
            <div class="preview-elements">
              <div
                v-for="element in form.elements.slice(0, 3)"
                :key="element.id"
                class="preview-element"
              >
                <span class="element-icon">{{ getElementIcon(element.type) }}</span>
                <span class="element-name">{{ element.props.label }}</span>
              </div>
              <div v-if="form.elements.length > 3" class="more-elements">
                +{{ form.elements.length - 3 }} más
              </div>
            </div>
          </div>

          <div class="form-card-actions">
            <button @click.stop="editForm(form.id!)" class="btn-secondary">
              <span class="btn-icon">✏️</span>
              Editar
            </button>
            <button @click.stop="previewForm(form.id!)" class="btn-outline">
              <span class="btn-icon">👁️</span>
              Vista Previa
            </button>
          </div>
        </div>

        <!-- Estado vacío mejorado -->
        <div v-if="savedForms.length === 0" class="empty-state">
          <div class="empty-illustration">
            <div class="empty-icon">📝</div>
            <div class="empty-shapes">
              <div class="shape shape-1"></div>
              <div class="shape shape-2"></div>
              <div class="shape shape-3"></div>
            </div>
          </div>
          <h3>¡Crea tu primer formulario!</h3>
          <p>Diseña formularios interactivos y dinámicos con nuestro constructor visual</p>
          <div class="empty-actions">
            <button @click="createNewForm" class="btn-primary">
              <span class="btn-icon">🚀</span>
              Comenzar Ahora
            </button>
            <button @click="openImportModal" class="btn-outline">
              <span class="btn-icon">📂</span>
              Importar JSON
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal de Importación -->
    <JsonImportModal
      :is-open="showImportModal"
      @close="closeImportModal"
      @imported="handleFormImported"
    />

    <!-- Toast de notificación -->
    <div v-if="showNotification" class="notification-toast" :class="notificationType">
      <span class="toast-icon">
        {{ notificationType === 'success' ? '✅' : '❌' }}
      </span>
      <span class="toast-message">{{ notificationMessage }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import JsonImportModal from '@/components/JsonImportModal.vue'
import { useDashboard } from '@/composables/useDashboard'
import { ref } from 'vue'

// Usar el composable que contiene toda la lógica
const {
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
  //showHelp,
  selectForm,
  toggleMenu,

  // Utilities
  getRequiredCount,
  getElementIcon,
} = useDashboard()

// Estado para el modal de importación
const showImportModal = ref(false)

// Estado para notificaciones
const showNotification = ref(false)
const notificationMessage = ref('')
const notificationType = ref<'success' | 'error'>('success')

// Funciones para el modal de importación
const openImportModal = () => {
  showImportModal.value = true
}

const closeImportModal = () => {
  showImportModal.value = false
}

const handleFormImported = () => {
  // Mostrar notificación de éxito
  showSuccessNotification('¡Formulario importado exitosamente!')

  // Cerrar el modal
  closeImportModal()
}

// Funciones para notificaciones
const showSuccessNotification = (message: string) => {
  notificationMessage.value = message
  notificationType.value = 'success'
  showNotification.value = true
  setTimeout(() => {
    showNotification.value = false
  }, 3000)
}
</script>

<style scoped>
@import '@/assets/styles/Dashboard.css';
</style>
