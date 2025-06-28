<template>
  <div v-if="isOpen" class="modal-overlay" @click="closeModal">
    <div class="modal-container" @click.stop>
      <div class="modal-header">
        <h2>
          <span class="modal-icon">📂</span>
          Importar Formulario desde JSON
        </h2>
        <button @click="closeModal" class="close-btn">✕</button>
      </div>

      <div class="modal-content">
        <!-- Pestañas -->
        <div class="tabs">
          <button :class="['tab', { active: activeTab === 'file' }]" @click="activeTab = 'file'">
            <span class="tab-icon">📁</span>
            Subir Archivo
          </button>
          <button :class="['tab', { active: activeTab === 'text' }]" @click="activeTab = 'text'">
            <span class="tab-icon">📝</span>
            Pegar JSON
          </button>
          <button
            :class="['tab', { active: activeTab === 'example' }]"
            @click="activeTab = 'example'"
          >
            <span class="tab-icon">💡</span>
            Ejemplo
          </button>
        </div>

        <!-- Contenido de las pestañas -->
        <div class="tab-content">
          <!-- Pestaña: Subir Archivo -->
          <div v-if="activeTab === 'file'" class="tab-panel">
            <div class="upload-area" :class="{ 'drag-over': isDragOver }">
              <input
                ref="fileInput"
                type="file"
                accept=".json"
                @change="handleFileSelect"
                class="file-input"
              />

              <div
                class="drop-zone"
                @dragover.prevent="isDragOver = true"
                @dragleave.prevent="isDragOver = false"
                @drop.prevent="handleFileDrop"
                @click="fileInput?.click()"
              >
                <div class="drop-icon">📤</div>
                <p class="drop-text"><strong>Haz clic aquí</strong> o arrastra tu archivo JSON</p>
                <p class="drop-hint">Solo archivos .json (máximo 5MB)</p>
              </div>
            </div>

            <div v-if="selectedFile" class="file-info">
              <div class="file-details">
                <span class="file-icon">📄</span>
                <div class="file-meta">
                  <div class="file-name">{{ selectedFile.name }}</div>
                  <div class="file-size">{{ formatFileSize(selectedFile.size) }}</div>
                </div>
              </div>
              <div class="file-actions">
                <button @click="processFile" :disabled="isImporting" class="btn-primary">
                  <span v-if="isImporting" class="loading-spinner">⏳</span>
                  <span v-else class="btn-icon">📥</span>
                  {{ isImporting ? 'Importando...' : 'Importar Archivo' }}
                </button>
              </div>
            </div>
          </div>

          <!-- Pestaña: Pegar JSON -->
          <div v-if="activeTab === 'text'" class="tab-panel">
            <div class="json-editor">
              <label for="jsonText" class="editor-label"> Pega tu JSON aquí: </label>
              <textarea
                id="jsonText"
                v-model="jsonText"
                placeholder="Pega el contenido JSON de tu formulario aquí..."
                class="json-textarea"
                rows="15"
              ></textarea>
            </div>

            <div class="editor-actions">
              <button @click="validateJson" :disabled="!jsonText.trim()" class="btn-outline">
                <span class="btn-icon">✓</span>
                Validar JSON
              </button>
              <button
                @click="processText"
                :disabled="isImporting || !jsonText.trim()"
                class="btn-primary"
              >
                <span v-if="isImporting" class="loading-spinner">⏳</span>
                <span v-else class="btn-icon">📥</span>
                {{ isImporting ? 'Importando...' : 'Importar JSON' }}
              </button>
            </div>
          </div>

          <!-- Pestaña: Ejemplo -->
          <div v-if="activeTab === 'example'" class="tab-panel">
            <div class="example-section">
              <h3>
                <span class="section-icon">💡</span>
                Estructura del JSON Actualizada
              </h3>
              <p class="example-description">
                Tu archivo JSON debe seguir esta estructura actualizada para importarse
                correctamente. El sistema es compatible con formatos antiguos y los convertirá
                automáticamente:
              </p>

              <div class="code-block">
                <div class="code-header">
                  <span class="code-title">Ejemplo de formulario JSON (Formato actualizado)</span>
                  <button @click="copyExample" class="copy-btn">
                    <span class="copy-icon">📋</span>
                    {{ copied ? 'Copiado!' : 'Copiar' }}
                  </button>
                </div>
                <pre class="code-content">{{ exampleJson }}</pre>
              </div>

              <div class="field-types">
                <h4>Tipos de campos soportados:</h4>
                <div class="types-grid">
                  <div class="type-item">
                    <span class="type-icon">📝</span>
                    <strong>text-input</strong> - Campo de texto
                  </div>
                  <div class="type-item">
                    <span class="type-icon">📧</span>
                    <strong>email</strong> - Campo de email
                  </div>
                  <div class="type-item">
                    <span class="type-icon">🔐</span>
                    <strong>password</strong> - Campo de contraseña
                  </div>
                  <div class="type-item">
                    <span class="type-icon">🔢</span>
                    <strong>number</strong> - Campo numérico
                  </div>
                  <div class="type-item">
                    <span class="type-icon">📱</span>
                    <strong>phone</strong> - Campo de teléfono
                  </div>
                  <div class="type-item">
                    <span class="type-icon">🔗</span>
                    <strong>url</strong> - Campo de URL
                  </div>
                  <div class="type-item">
                    <span class="type-icon">📄</span>
                    <strong>textarea</strong> - Área de texto
                  </div>
                  <div class="type-item">
                    <span class="type-icon">📋</span>
                    <strong>select</strong> - Lista desplegable
                  </div>
                  <div class="type-item">
                    <span class="type-icon">☑️</span>
                    <strong>checkbox</strong> - Casilla de verificación
                  </div>
                  <div class="type-item">
                    <span class="type-icon">🔘</span>
                    <strong>radio</strong> - Botones de radio
                  </div>
                  <div class="type-item">
                    <span class="type-icon">📅</span>
                    <strong>date</strong> - Selector de fecha
                  </div>
                  <div class="type-item">
                    <span class="type-icon">⏰</span>
                    <strong>time</strong> - Selector de hora
                  </div>
                  <div class="type-item">
                    <span class="type-icon">📎</span>
                    <strong>file</strong> - Subida de archivos
                  </div>
                  <div class="type-item">
                    <span class="type-icon">🎚️</span>
                    <strong>range</strong> - Control deslizante
                  </div>
                  <div class="type-item">
                    <span class="type-icon">🎨</span>
                    <strong>color</strong> - Selector de color
                  </div>
                </div>
              </div>

              <div class="compatibility-note">
                <div class="note-icon">ℹ️</div>
                <div class="note-content">
                  <strong>Compatibilidad:</strong> El sistema acepta tanto formatos antiguos (tipo
                  "text") como nuevos (tipo "text-input"). Los formatos antiguos se convertirán
                  automáticamente.
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Mensajes de estado -->
        <div v-if="importError" class="alert alert-error">
          <span class="alert-icon">❌</span>
          <div class="alert-content">
            <strong>Error al importar:</strong>
            <p>{{ importError }}</p>
          </div>
        </div>

        <div v-if="importSuccess" class="alert alert-success">
          <span class="alert-icon">✅</span>
          <div class="alert-content">
            <strong>¡Formulario importado exitosamente!</strong>
            <p>El formulario se ha cargado en el editor. Puedes editarlo y guardarlo.</p>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button @click="closeModal" class="btn-secondary">
          <span class="btn-icon">❌</span>
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useJsonImport } from '@/composables/useJsonImport'

interface Props {
  isOpen: boolean
}

interface Emits {
  (e: 'close'): void
  (e: 'imported'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Composable para importación
const {
  isImporting,
  importError,
  importSuccess,
  importFromFile,
  importFromText,
  generateExampleJson,
  clearImportState,
} = useJsonImport()

// Estado local
const activeTab = ref<'file' | 'text' | 'example'>('file')
const selectedFile = ref<File | null>(null)
const jsonText = ref('')
const isDragOver = ref(false)
const fileInput = ref<HTMLInputElement>()
const copied = ref(false)

// JSON de ejemplo
const exampleJson = computed(() => generateExampleJson())

// Limpiar estado al abrir/cerrar modal
watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      clearImportState()
      selectedFile.value = null
      jsonText.value = ''
      activeTab.value = 'file'
    }
  },
)

// Limpiar estado cuando cambia de pestaña
watch(activeTab, () => {
  clearImportState()
})

// Cerrar modal
const closeModal = () => {
  emit('close')
}

// Manejo de archivos
const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    selectedFile.value = input.files[0]
    clearImportState()
  }
}

const handleFileDrop = (event: DragEvent) => {
  isDragOver.value = false
  if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
    selectedFile.value = event.dataTransfer.files[0]
    clearImportState()
  }
}

// Procesar archivo
const processFile = async () => {
  if (!selectedFile.value) return

  const success = await importFromFile(selectedFile.value)
  if (success) {
    setTimeout(() => {
      emit('imported')
      closeModal()
    }, 1500)
  }
}

// Procesar texto JSON
const processText = async () => {
  if (!jsonText.value.trim()) return

  const success = await importFromText(jsonText.value)
  if (success) {
    setTimeout(() => {
      emit('imported')
      closeModal()
    }, 1500)
  }
}

// Validar JSON sin importar
const validateJson = () => {
  try {
    JSON.parse(jsonText.value)
    alert('✅ JSON válido')
  } catch (error) {
    alert('❌ JSON inválido: ' + (error as Error).message)
  }
}

// Copiar ejemplo
const copyExample = async () => {
  try {
    await navigator.clipboard.writeText(exampleJson.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch {
    // Fallback para navegadores que no soportan clipboard API
    const textArea = document.createElement('textarea')
    textArea.value = exampleJson.value
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
}

// Formatear tamaño de archivo
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
</script>

<style>
@import '@/assets/styles/JsonImportModal.css';
</style>
