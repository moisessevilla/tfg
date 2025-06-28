// src/composables/useFormBuilderHelpers.ts
export const useFormBuilderHelpers = () => {
  const getComponentIcon = (type: string): string => {
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

  const getComponentName = (type: string): string => {
    const names: Record<string, string> = {
      'text-input': 'Campo de Texto',
      textarea: 'Área de Texto',
      select: 'Lista Desplegable',
      checkbox: 'Casilla de Verificación',
      radio: 'Botones de Radio',
      number: 'Campo Numérico',
      email: 'Campo de Email',
      date: 'Selector de Fecha',
    }
    return names[type] || 'Campo'
  }

  const getMockContent = (type: string): string => {
    const content: Record<string, string> = {
      'text-input': 'Texto de ejemplo...',
      textarea: 'Área de texto de ejemplo...',
      select: 'Selecciona una opción ▼',
      checkbox: '☑ Opción marcada',
      radio: '○ Opción seleccionada',
      number: '123',
      email: 'usuario@ejemplo.com',
      date: 'dd/mm/aaaa',
    }
    return content[type] || 'Contenido de ejemplo'
  }

  return {
    getComponentIcon,
    getComponentName,
    getMockContent,
  }
}
