<!-- src/views/HelpView.vue -->
<template>
  <div class="help-container">
    <!-- Header -->
    <!--
    <header class="help-header">
      <div class="header-content">
        <button @click="goBack" class="btn-back">
          <span class="btn-icon">←</span>
          Volver al Dashboard
        </button>
        <h1>Centro de Ayuda</h1>
        <div class="help-version">v1.0.0</div>
      </div>
    </header>
    -->
    <!-- Hero Section actualizada -->
    <section class="help-hero">
      <div class="hero-content">
        <!-- Columna izquierda: Contenido de texto -->
        <div class="hero-text-column">
          <div class="hero-icon">❓</div>
          <h2>¿Cómo podemos ayudarte?</h2>
          <p>Encuentra respuestas a tus preguntas y aprende a usar Form Builder</p>
        </div>

        <!-- Columna derecha: Campo de búsqueda centrado -->
        <div class="hero-search-column">
          <div class="search-box">
            <span class="search-icon">🔍</span>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Buscar en la ayuda..."
              class="search-input"
              @input="filterContent"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Links -->
    <section class="quick-links">
      <div class="section-container">
        <div class="links-grid">
          <a href="#getting-started" class="quick-link-card">
            <span class="link-icon">🚀</span>
            <span class="link-text">Comenzar</span>
          </a>
          <a href="#creating-forms" class="quick-link-card">
            <span class="link-icon">📝</span>
            <span class="link-text">Crear Formularios</span>
          </a>
          <a href="#components" class="quick-link-card">
            <span class="link-icon">🧩</span>
            <span class="link-text">Componentes</span>
          </a>
          <a href="#import-export" class="quick-link-card">
            <span class="link-icon">📤</span>
            <span class="link-text">Importar/Exportar</span>
          </a>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <main class="help-main">
      <div class="content-wrapper">
        <!-- Sidebar Navigation -->
        <aside class="help-sidebar">
          <nav class="sidebar-nav">
            <h3>Contenido</h3>
            <ul class="nav-list">
              <li>
                <a href="#getting-started" :class="{ active: activeSection === 'getting-started' }"
                  >🏁 Primeros Pasos</a
                >
              </li>
              <li>
                <a href="#interface" :class="{ active: activeSection === 'interface' }"
                  >🖥️ Interfaz</a
                >
              </li>
              <li>
                <a href="#creating-forms" :class="{ active: activeSection === 'creating-forms' }"
                  >📋 Crear Formularios</a
                >
              </li>
              <li>
                <a href="#components" :class="{ active: activeSection === 'components' }"
                  >🧩 Componentes Disponibles</a
                >
              </li>
              <li>
                <a href="#properties" :class="{ active: activeSection === 'properties' }"
                  >⚙️ Propiedades</a
                >
              </li>
              <li>
                <a href="#preview" :class="{ active: activeSection === 'preview' }"
                  >👁️ Vista Previa</a
                >
              </li>
              <li>
                <a href="#import-export" :class="{ active: activeSection === 'import-export' }"
                  >💾 Importar/Exportar</a
                >
              </li>
              <li><a href="#tips" :class="{ active: activeSection === 'tips' }">💡 Consejos</a></li>
              <li>
                <a href="#faq" :class="{ active: activeSection === 'faq' }"
                  >❓ Preguntas Frecuentes</a
                >
              </li>
            </ul>
          </nav>
        </aside>

        <!-- Content Area -->
        <div class="help-content">
          <!-- Getting Started -->
          <section id="getting-started" class="help-section">
            <h2>🏁 Primeros Pasos</h2>
            <div class="section-content">
              <p>
                ¡Bienvenido a Form Builder! Esta herramienta te permite crear formularios dinámicos
                de manera visual e intuitiva.
              </p>

              <div class="steps-container">
                <div class="step-card">
                  <div class="step-number">1</div>
                  <h4>Accede al Dashboard</h4>
                  <p>
                    Desde el dashboard puedes ver todos tus formularios guardados y crear nuevos.
                  </p>
                </div>

                <div class="step-card">
                  <div class="step-number">2</div>
                  <h4>Crea un Nuevo Formulario</h4>
                  <p>Haz clic en "Crear Nuevo Formulario" para abrir el editor visual.</p>
                </div>

                <div class="step-card">
                  <div class="step-number">3</div>
                  <h4>Arrastra y Suelta</h4>
                  <p>Arrastra componentes desde el panel izquierdo al área de diseño.</p>
                </div>

                <div class="step-card">
                  <div class="step-number">4</div>
                  <h4>Configura y Guarda</h4>
                  <p>Personaliza las propiedades de cada campo y guarda tu formulario.</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Interface -->
          <section id="interface" class="help-section">
            <h2>🖥️ Interfaz del Editor</h2>
            <div class="section-content">
              <p>El editor de formularios está dividido en tres secciones principales:</p>

              <div class="interface-grid">
                <div class="interface-item">
                  <h4>📋 Panel de Componentes (Izquierda)</h4>
                  <p>
                    Contiene todos los tipos de campos disponibles que puedes agregar a tu
                    formulario. Simplemente arrastra el componente deseado al área de diseño.
                  </p>
                </div>

                <div class="interface-item">
                  <h4>🎨 Área de Diseño (Centro)</h4>
                  <p>
                    Aquí es donde construyes tu formulario. Los componentes arrastrados aparecerán
                    aquí y podrás reordenarlos, duplicarlos o eliminarlos.
                  </p>
                </div>

                <div class="interface-item">
                  <h4>⚙️ Panel de Propiedades (Derecha)</h4>
                  <p>
                    Cuando seleccionas un elemento, aquí puedes configurar todas sus propiedades
                    como etiqueta, placeholder, validaciones, etc.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <!-- Creating Forms -->
          <section id="creating-forms" class="help-section">
            <h2>📋 Crear y Gestionar Formularios</h2>
            <div class="section-content">
              <h3>Crear un Formulario</h3>
              <ol class="numbered-list">
                <li>Desde el Dashboard, haz clic en "Crear Nuevo Formulario"</li>
                <li>Dale un nombre descriptivo a tu formulario en la barra superior</li>
                <li>Arrastra componentes del panel izquierdo al área central</li>
                <li>Configura las propiedades de cada campo en el panel derecho</li>
                <li>Haz clic en "Guardar" cuando hayas terminado</li>
              </ol>

              <h3>Acciones con Elementos</h3>
              <div class="actions-grid">
                <div class="action-item">
                  <span class="action-icon">↕️</span>
                  <strong>Reordenar:</strong> Usa las flechas arriba/abajo en la barra de
                  herramientas del elemento
                </div>
                <div class="action-item">
                  <span class="action-icon">📋</span>
                  <strong>Duplicar:</strong> Haz clic en el icono de duplicar para crear una copia
                  del elemento
                </div>
                <div class="action-item">
                  <span class="action-icon">🗑️</span>
                  <strong>Eliminar:</strong> Haz clic en el icono de papelera para eliminar un
                  elemento
                </div>
                <div class="action-item">
                  <span class="action-icon">👆</span>
                  <strong>Seleccionar:</strong> Haz clic en cualquier elemento para ver y editar sus
                  propiedades
                </div>
              </div>
            </div>
          </section>

          <!-- Components -->
          <section id="components" class="help-section">
            <h2>🧩 Componentes Disponibles</h2>
            <div class="section-content">
              <p>Form Builder incluye 15 tipos de componentes para cubrir todas tus necesidades:</p>

              <div class="components-grid">
                <div class="component-card">
                  <span class="component-icon">📝</span>
                  <h4>Campo de Texto</h4>
                  <p>Para entrada de texto corto como nombres o títulos</p>
                </div>

                <div class="component-card">
                  <span class="component-icon">📧</span>
                  <h4>Campo de Email</h4>
                  <p>Con validación automática de formato de correo</p>
                </div>

                <div class="component-card">
                  <span class="component-icon">🔐</span>
                  <h4>Contraseña</h4>
                  <p>Campo seguro con opción de mostrar/ocultar</p>
                </div>

                <div class="component-card">
                  <span class="component-icon">🔢</span>
                  <h4>Campo Numérico</h4>
                  <p>Para valores numéricos con límites opcionales</p>
                </div>

                <div class="component-card">
                  <span class="component-icon">📱</span>
                  <h4>Teléfono</h4>
                  <p>Optimizado para números telefónicos</p>
                </div>

                <div class="component-card">
                  <span class="component-icon">🔗</span>
                  <h4>URL</h4>
                  <p>Para direcciones web con validación</p>
                </div>

                <div class="component-card">
                  <span class="component-icon">📄</span>
                  <h4>Área de Texto</h4>
                  <p>Para textos largos y descripciones</p>
                </div>

                <div class="component-card">
                  <span class="component-icon">📋</span>
                  <h4>Lista Desplegable</h4>
                  <p>Selector con opciones predefinidas</p>
                </div>

                <div class="component-card">
                  <span class="component-icon">☑️</span>
                  <h4>Checkbox</h4>
                  <p>Casilla de verificación simple</p>
                </div>

                <div class="component-card">
                  <span class="component-icon">🔘</span>
                  <h4>Radio</h4>
                  <p>Selección única entre varias opciones</p>
                </div>

                <div class="component-card">
                  <span class="component-icon">📅</span>
                  <h4>Fecha</h4>
                  <p>Selector de fecha con calendario</p>
                </div>

                <div class="component-card">
                  <span class="component-icon">⏰</span>
                  <h4>Hora</h4>
                  <p>Selector de hora</p>
                </div>

                <div class="component-card">
                  <span class="component-icon">📎</span>
                  <h4>Archivo</h4>
                  <p>Subida de archivos con validaciones</p>
                </div>

                <div class="component-card">
                  <span class="component-icon">🎚️</span>
                  <h4>Slider</h4>
                  <p>Control deslizante para rangos</p>
                </div>

                <div class="component-card">
                  <span class="component-icon">🎨</span>
                  <h4>Color</h4>
                  <p>Selector de color visual</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Properties -->
          <section id="properties" class="help-section">
            <h2>⚙️ Propiedades de los Componentes</h2>
            <div class="section-content">
              <p>Cada componente tiene propiedades específicas que puedes configurar:</p>

              <div class="properties-list">
                <div class="property-item">
                  <h4>📌 Propiedades Comunes</h4>
                  <ul>
                    <li><strong>Etiqueta:</strong> El texto que aparece sobre el campo</li>
                    <li><strong>Placeholder:</strong> Texto de ayuda dentro del campo vacío</li>
                    <li><strong>Obligatorio:</strong> Si el campo es requerido</li>
                    <li><strong>Texto de ayuda:</strong> Instrucciones adicionales</li>
                  </ul>
                </div>

                <div class="property-item">
                  <h4>🔧 Propiedades Específicas</h4>
                  <ul>
                    <li><strong>Texto/Contraseña:</strong> Longitud mínima y máxima</li>
                    <li><strong>Numérico/Slider:</strong> Valores mínimo, máximo y paso</li>
                    <li><strong>Select/Radio:</strong> Lista de opciones personalizables</li>
                    <li><strong>Archivo:</strong> Tipos permitidos y tamaño máximo</li>
                    <li><strong>Fecha:</strong> Rango de fechas permitidas</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <!-- Preview -->
          <section id="preview" class="help-section">
            <h2>👁️ Vista Previa</h2>
            <div class="section-content">
              <p>La vista previa te permite ver y probar tu formulario antes de publicarlo:</p>

              <div class="preview-features">
                <div class="feature-card">
                  <h4>🎯 Interactividad Completa</h4>
                  <p>Todos los campos funcionan como en el formulario final</p>
                </div>

                <div class="feature-card">
                  <h4>✅ Validaciones</h4>
                  <p>Prueba las validaciones y mensajes de error</p>
                </div>

                <div class="feature-card">
                  <h4>📊 Barra de Progreso</h4>
                  <p>Visualiza el progreso de completado del formulario</p>
                </div>

                <div class="feature-card">
                  <h4>📱 Responsive</h4>
                  <p>Verifica cómo se ve en diferentes dispositivos</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Import/Export -->
          <section id="import-export" class="help-section">
            <h2>💾 Importar y Exportar</h2>
            <div class="section-content">
              <h3>📥 Exportar Formularios</h3>
              <p>Puedes exportar tus formularios en formato JSON para:</p>
              <ul>
                <li>Hacer copias de seguridad</li>
                <li>Compartir con otros usuarios</li>
                <li>Integrar en otras aplicaciones</li>
              </ul>

              <h3>📤 Importar Formularios</h3>
              <p>Importa formularios desde archivos JSON mediante:</p>
              <ol class="numbered-list">
                <li>Haz clic en "Importar JSON" en el Dashboard</li>
                <li>Selecciona el archivo o pega el contenido JSON</li>
                <li>Revisa la estructura y confirma la importación</li>
              </ol>

              <div class="info-box">
                <span class="info-icon">ℹ️</span>
                <p>
                  El formato JSON debe seguir la estructura específica de Form Builder para
                  importarse correctamente.
                </p>
              </div>
            </div>
          </section>

          <!-- Tips -->
          <section id="tips" class="help-section">
            <h2>💡 Consejos y Mejores Prácticas</h2>
            <div class="section-content">
              <div class="tips-grid">
                <div class="tip-card">
                  <span class="tip-icon">🏷️</span>
                  <h4>Nombres Descriptivos</h4>
                  <p>Usa etiquetas claras y descriptivas para cada campo</p>
                </div>

                <div class="tip-card">
                  <span class="tip-icon">🎯</span>
                  <h4>Campos Obligatorios</h4>
                  <p>Marca solo los campos esenciales como obligatorios</p>
                </div>

                <div class="tip-card">
                  <span class="tip-icon">📝</span>
                  <h4>Placeholders Útiles</h4>
                  <p>Proporciona ejemplos en los placeholders</p>
                </div>

                <div class="tip-card">
                  <span class="tip-icon">🔄</span>
                  <h4>Orden Lógico</h4>
                  <p>Organiza los campos en un orden que tenga sentido</p>
                </div>

                <div class="tip-card">
                  <span class="tip-icon">💬</span>
                  <h4>Textos de Ayuda</h4>
                  <p>Agrega instrucciones cuando sea necesario</p>
                </div>

                <div class="tip-card">
                  <span class="tip-icon">🧪</span>
                  <h4>Prueba Siempre</h4>
                  <p>Usa la vista previa antes de finalizar</p>
                </div>
              </div>
            </div>
          </section>

          <!-- FAQ -->
          <section id="faq" class="help-section">
            <h2>❓ Preguntas Frecuentes</h2>
            <div class="section-content">
              <div class="faq-list">
                <div class="faq-item" v-for="(faq, index) in faqs" :key="index">
                  <button @click="toggleFaq(index)" class="faq-question">
                    <span>{{ faq.question }}</span>
                    <span class="faq-toggle">{{ openFaqs[index] ? '−' : '+' }}</span>
                  </button>
                  <div v-if="openFaqs[index]" class="faq-answer">
                    <p>{{ faq.answer }}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Contact -->
          <section id="contact" class="help-section">
            <h2>📧 ¿Necesitas más ayuda?</h2>
            <div class="section-content">
              <div class="contact-card">
                <p>Si no encontraste la respuesta que buscabas, puedes:</p>
                <ul>
                  <li>Revisar la documentación técnica completa</li>
                  <li>Contactar al equipo de soporte</li>
                  <li>Reportar un problema o sugerencia</li>
                </ul>
                <div class="contact-info">
                  <p><strong>Proyecto:</strong> Form Builder VIU</p>
                  <p><strong>Versión:</strong> 1.0.0</p>
                  <p><strong>Año:</strong> 2025</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>

    <!-- Back to Top Button -->
    <button v-if="showBackToTop" @click="scrollToTop" class="back-to-top">
      <span class="top-icon">↑</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
// import { useRouter } from 'vue-router'

// const router = useRouter()

// State
const searchQuery = ref('')
const activeSection = ref('getting-started')
const showBackToTop = ref(false)
const openFaqs = ref<boolean[]>([])

// FAQs data
const faqs = ref([
  {
    question: '¿Cómo puedo duplicar un formulario completo?',
    answer:
      'En el Dashboard, haz clic en el menú (tres puntos) del formulario que deseas duplicar y selecciona "Duplicar". Se creará una copia con el nombre "(Copia)" que puedes editar.',
  },
  {
    question: '¿Puedo cambiar el orden de los campos después de agregarlos?',
    answer:
      'Sí, cada elemento tiene botones de flecha arriba y abajo en su barra de herramientas. Úsalos para mover el elemento a la posición deseada.',
  },
  {
    question: '¿Qué tipos de archivos puedo permitir en el campo de subida?',
    answer:
      'Puedes especificar los tipos de archivo permitidos usando extensiones (ej: .pdf,.jpg,.doc) o tipos MIME. Configúralo en las propiedades del campo de archivo.',
  },
  {
    question: '¿Los formularios se guardan automáticamente?',
    answer:
      'No, debes hacer clic en el botón "Guardar" para guardar los cambios. Los formularios guardados persisten en el navegador usando localStorage.',
  },
  {
    question: '¿Puedo usar el mismo formulario en múltiples páginas?',
    answer:
      'Sí, puedes exportar el formulario en formato JSON y luego importarlo donde lo necesites, o integrar el JSON en tu aplicación.',
  },
  {
    question: '¿Hay límite en la cantidad de campos que puedo agregar?',
    answer:
      'No hay un límite técnico, pero por experiencia de usuario se recomienda mantener los formularios concisos y no exceder 20-30 campos.',
  },
])

// Methods
//const goBack = () => {
//  router.push('/')
//}

const filterContent = () => {
  // Implementar filtrado de contenido basado en searchQuery
  console.log('Filtering content:', searchQuery.value)
}

const toggleFaq = (index: number) => {
  openFaqs.value[index] = !openFaqs.value[index]
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300

  // Update active section based on scroll position
  const sections = document.querySelectorAll('.help-section')
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect()
    if (rect.top <= 100 && rect.bottom >= 100) {
      activeSection.value = section.id
    }
  })
}

// Initialize FAQs state
onMounted(() => {
  openFaqs.value = new Array(faqs.value.length).fill(false)
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
@import '@/assets/styles/HelpView.css';
</style>
