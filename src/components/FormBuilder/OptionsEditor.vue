<!-- src/components/FormBuilder/OptionsEditor.vue -->
<template>
  <div class="options-editor">
    <div class="options-header">
      <label class="options-label">Opciones:</label>
      <button @click="addOption" class="btn-add-option" type="button">
        <span class="btn-icon">+</span>
        Agregar opción
      </button>
    </div>

    <div class="options-list">
      <div v-for="(option, index) in localOptions" :key="index" class="option-item">
        <div class="option-inputs">
          <div class="input-group">
            <label>Valor:</label>
            <input
              v-model="option.value"
              @input="updateOptions"
              type="text"
              class="option-input"
              placeholder="valor_opcion"
            />
          </div>
          <div class="input-group">
            <label>Etiqueta:</label>
            <input
              v-model="option.label"
              @input="updateOptions"
              type="text"
              class="option-input"
              placeholder="Texto visible"
            />
          </div>
        </div>

        <button
          @click="removeOption(index)"
          :disabled="localOptions.length <= 1"
          class="btn-remove-option"
          type="button"
          title="Eliminar opción"
        >
          <span class="btn-icon">🗑️</span>
        </button>
      </div>
    </div>

    <div class="options-preview">
      <label class="preview-label">Vista previa:</label>
      <select class="preview-select">
        <option value="">Selecciona una opción</option>
        <option v-for="option in localOptions" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

interface Option {
  value: string
  label: string
}

const props = defineProps<{
  modelValue: Option[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: Option[]]
}>()

const localOptions = ref<Option[]>([])

// Inicializar opciones locales
onMounted(() => {
  localOptions.value = [...props.modelValue]
})

// Sincronizar cambios del padre
watch(
  () => props.modelValue,
  (newValue) => {
    localOptions.value = [...newValue]
  },
  { deep: true },
)

const updateOptions = () => {
  emit('update:modelValue', [...localOptions.value])
}

const addOption = () => {
  const newIndex = localOptions.value.length + 1
  localOptions.value.push({
    value: `opcion${newIndex}`,
    label: `Opción ${newIndex}`,
  })
  updateOptions()
}

const removeOption = (index: number) => {
  if (localOptions.value.length > 1) {
    localOptions.value.splice(index, 1)
    updateOptions()
  }
}
</script>

<style>
@import '@/assets/styles/OptionsEditor.css';
</style>
