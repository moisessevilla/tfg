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
          <div class="search-wrapper">
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
            <div v-if="searchQuery && searchResults.length === 0" class="search-status no-results">
              <span class="status-icon">🔍</span>
              <span class="status-text">No se encontraron resultados para "{{ searchQuery }}"</span>
            </div>
            <div v-if="searchQuery && searchResults.length > 0" class="search-status results-found">
              <span class="status-icon">✅</span>
              <span class="status-text"
                >{{ searchResults.length }} resultado{{
                  searchResults.length !== 1 ? 's' : ''
                }}
                encontrado{{ searchResults.length !== 1 ? 's' : '' }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Links -->
    <section class="quick-links" v-if="!searchQuery">
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
      <div class="content-wrapper" :class="{ 'search-mode': searchQuery }">
        <!-- Sidebar Navigation - Ocultar en modo búsqueda -->
        <aside class="help-sidebar" v-if="!searchQuery">
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
        <div class="help-content" :class="{ 'full-width': searchQuery }">
          <!-- Search Results Container -->
          <div v-if="searchQuery" class="search-results-container">
            <div class="search-results-header">
              <h2>Resultados de búsqueda</h2>
              <button @click="clearSearch" class="clear-search-btn">
                <span class="btn-icon">✕</span>
                Limpiar búsqueda
              </button>
            </div>

            <div class="search-results-grid">
              <div
                v-for="result in searchResults"
                :key="result.id"
                class="search-result-card"
                @click="goToSection(result.sectionId)"
              >
                <div class="result-card-header">
                  <div class="result-info">
                    <h3 class="result-title">{{ result.title }}</h3>
                    <span class="result-badge">{{ result.sectionName }}</span>
                  </div>
                  <span class="result-arrow">→</span>
                </div>
                <p class="result-excerpt" v-html="highlightSearchTerm(result.excerpt)"></p>
              </div>
            </div>

            <!-- Empty search state -->
            <div v-if="searchQuery && searchResults.length === 0" class="empty-search-state">
              <div class="empty-search-icon">🔍</div>
              <h3>No encontramos resultados</h3>
              <p>Intenta con otros términos o navega por las secciones del menú</p>
              <button @click="clearSearch" class="btn-primary">
                <span class="btn-icon">📚</span>
                Ver todo el contenido
              </button>
            </div>
          </div>

          <!-- Regular Content -->
          <div v-else>
            <!-- Getting Started -->
            <section id="getting-started" class="help-section">
              <h2>🏁 Primeros Pasos</h2>
              <div class="section-content">
                <p>
                  ¡Bienvenido a Form Builder! Esta herramienta te permite crear formularios
                  dinámicos de manera visual e intuitiva.
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
                    <strong>Seleccionar:</strong> Haz clic en cualquier elemento para ver y editar
                    sus propiedades
                  </div>
                </div>
              </div>
            </section>

            <!-- Components -->
            <section id="components" class="help-section">
              <h2>🧩 Componentes Disponibles</h2>
              <div class="section-content">
                <p>
                  Form Builder incluye 15 tipos de componentes para cubrir todas tus necesidades:
                </p>

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
      </div>
    </main>

    <!-- Back to Top Button -->
    <button v-if="showBackToTop" @click="scrollToTop" class="back-to-top">
      <span class="top-icon">↑</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed, watch } from 'vue'

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

// Contenido completo de todas las secciones para búsqueda - ACTUALIZADO
const allContent = ref([
  // TÍTULOS DE SECCIONES PRINCIPALES
  {
    id: 'section-getting-started',
    sectionId: 'getting-started',
    sectionName: 'Primeros Pasos',
    title: 'Primeros Pasos',
    content:
      'Aprende cómo comenzar a usar Form Builder, desde el acceso al dashboard hasta la creación de tu primer formulario.',
  },
  {
    id: 'section-interface',
    sectionId: 'interface',
    sectionName: 'Interfaz',
    title: 'Interfaz del Editor',
    content:
      'Conoce la interfaz del editor de formularios y sus tres secciones principales: panel de componentes, área de diseño y panel de propiedades.',
  },
  {
    id: 'section-creating-forms',
    sectionId: 'creating-forms',
    sectionName: 'Crear Formularios',
    title: 'Crear y Gestionar Formularios',
    content:
      'Aprende a crear formularios desde cero, gestionar elementos, reordenar campos y todas las acciones disponibles en el editor.',
  },
  {
    id: 'section-components',
    sectionId: 'components',
    sectionName: 'Componentes Disponibles',
    title: 'Componentes Disponibles',
    content:
      'Descubre los 15 tipos de componentes disponibles en Form Builder para crear formularios completos y funcionales.',
  },
  {
    id: 'section-properties',
    sectionId: 'properties',
    sectionName: 'Propiedades',
    title: 'Propiedades de los Componentes',
    content:
      'Conoce todas las propiedades configurables de cada componente, desde las comunes hasta las específicas de cada tipo.',
  },
  {
    id: 'section-preview',
    sectionId: 'preview',
    sectionName: 'Vista Previa',
    title: 'Vista Previa',
    content:
      'Aprende a usar la vista previa para probar tu formulario antes de publicarlo, con interactividad completa y validaciones.',
  },
  {
    id: 'section-import-export',
    sectionId: 'import-export',
    sectionName: 'Importar/Exportar',
    title: 'Importar y Exportar',
    content:
      'Descubre cómo exportar tus formularios en formato JSON e importar formularios existentes para reutilizarlos.',
  },
  {
    id: 'section-tips',
    sectionId: 'tips',
    sectionName: 'Consejos',
    title: 'Consejos y Mejores Prácticas',
    content:
      'Mejores prácticas y consejos útiles para crear formularios efectivos y fáciles de usar.',
  },
  {
    id: 'section-faq',
    sectionId: 'faq',
    sectionName: 'Preguntas Frecuentes',
    title: 'Preguntas Frecuentes',
    content: 'Respuestas a las preguntas más comunes sobre el uso de Form Builder.',
  },
  // CONTENIDO DETALLADO
  {
    id: 'getting-started-1',
    sectionId: 'getting-started',
    sectionName: 'Primeros Pasos',
    title: 'Bienvenido a Form Builder',
    content:
      '¡Bienvenido a Form Builder! Esta herramienta te permite crear formularios dinámicos de manera visual e intuitiva. Desde el dashboard puedes ver todos tus formularios guardados y crear nuevos.',
  },
  {
    id: 'getting-started-2',
    sectionId: 'getting-started',
    sectionName: 'Primeros Pasos',
    title: 'Crear un Nuevo Formulario',
    content:
      'Haz clic en "Crear Nuevo Formulario" para abrir el editor visual. Arrastra componentes desde el panel izquierdo al área de diseño. Personaliza las propiedades de cada campo y guarda tu formulario.',
  },
  {
    id: 'getting-started-3',
    sectionId: 'getting-started',
    sectionName: 'Primeros Pasos',
    title: 'Accede al Dashboard',
    content:
      'Desde el dashboard puedes ver todos tus formularios guardados y crear nuevos. Es el punto de partida para gestionar todos tus formularios.',
  },
  {
    id: 'getting-started-4',
    sectionId: 'getting-started',
    sectionName: 'Primeros Pasos',
    title: 'Arrastra y Suelta',
    content:
      'Arrastra componentes desde el panel izquierdo al área de diseño. Es así de simple comenzar a construir tu formulario.',
  },
  {
    id: 'getting-started-5',
    sectionId: 'getting-started',
    sectionName: 'Primeros Pasos',
    title: 'Configura y Guarda',
    content:
      'Personaliza las propiedades de cada campo y guarda tu formulario. Cada campo puede ser configurado según tus necesidades.',
  },
  {
    id: 'interface-1',
    sectionId: 'interface',
    sectionName: 'Interfaz',
    title: 'Panel de Componentes',
    content:
      'El panel de componentes en el lado izquierdo contiene todos los tipos de campos disponibles que puedes agregar a tu formulario. Simplemente arrastra el componente deseado al área de diseño.',
  },
  {
    id: 'interface-2',
    sectionId: 'interface',
    sectionName: 'Interfaz',
    title: 'Área de Diseño',
    content:
      'El área de diseño es donde construyes tu formulario. Los componentes arrastrados aparecerán aquí y podrás reordenarlos, duplicarlos o eliminarlos.',
  },
  {
    id: 'interface-3',
    sectionId: 'interface',
    sectionName: 'Interfaz',
    title: 'Panel de Propiedades',
    content:
      'Cuando seleccionas un elemento, el panel de propiedades te permite configurar todas sus propiedades como etiqueta, placeholder, validaciones, etc.',
  },
  {
    id: 'creating-forms-1',
    sectionId: 'creating-forms',
    sectionName: 'Crear Formularios',
    title: 'Crear un Formulario',
    content:
      'Desde el Dashboard, haz clic en "Crear Nuevo Formulario". Dale un nombre descriptivo a tu formulario en la barra superior. Arrastra componentes del panel izquierdo al área central.',
  },
  {
    id: 'creating-forms-2',
    sectionId: 'creating-forms',
    sectionName: 'Crear Formularios',
    title: 'Reordenar Elementos',
    content:
      'Usa las flechas arriba/abajo en la barra de herramientas del elemento para cambiar el orden de los campos en tu formulario.',
  },
  {
    id: 'creating-forms-3',
    sectionId: 'creating-forms',
    sectionName: 'Crear Formularios',
    title: 'Duplicar y Eliminar',
    content:
      'Haz clic en el icono de duplicar para crear una copia del elemento. Usa el icono de papelera para eliminar un elemento del formulario.',
  },
  {
    id: 'creating-forms-4',
    sectionId: 'creating-forms',
    sectionName: 'Crear Formularios',
    title: 'Acciones con Elementos',
    content:
      'Reordenar, duplicar, eliminar y seleccionar elementos son acciones básicas que puedes realizar con cada campo de tu formulario.',
  },
  {
    id: 'components-1',
    sectionId: 'components',
    sectionName: 'Componentes',
    title: 'Campos de Texto',
    content:
      'Los campos de texto incluyen: texto simple para nombres o títulos, email con validación automática, contraseña con opción mostrar/ocultar, y área de texto para contenido largo.',
  },
  {
    id: 'components-2',
    sectionId: 'components',
    sectionName: 'Componentes',
    title: 'Campos de Entrada',
    content:
      'Campo numérico para valores con límites opcionales, teléfono optimizado para números telefónicos, URL para direcciones web con validación.',
  },
  {
    id: 'components-3',
    sectionId: 'components',
    sectionName: 'Componentes',
    title: 'Campos de Selección',
    content:
      'Lista desplegable (select) con opciones predefinidas, radio buttons para selección única, checkbox para casillas de verificación simples.',
  },
  {
    id: 'components-4',
    sectionId: 'components',
    sectionName: 'Componentes',
    title: 'Campos Especiales',
    content:
      'Selector de fecha con calendario, selector de hora, subida de archivos con validaciones, slider para rangos de valores, selector de color visual.',
  },
  {
    id: 'components-5',
    sectionId: 'components',
    sectionName: 'Componentes',
    title: 'Campo de Email',
    content:
      'Campo especializado para direcciones de correo electrónico con validación automática del formato.',
  },
  {
    id: 'components-6',
    sectionId: 'components',
    sectionName: 'Componentes',
    title: 'Contraseña',
    content: 'Campo seguro para contraseñas con opción de mostrar/ocultar el contenido.',
  },
  {
    id: 'components-7',
    sectionId: 'components',
    sectionName: 'Componentes',
    title: 'Lista Desplegable',
    content: 'Selector tipo dropdown con opciones predefinidas que puedes personalizar.',
  },
  {
    id: 'properties-1',
    sectionId: 'properties',
    sectionName: 'Propiedades',
    title: 'Propiedades Comunes',
    content:
      'Etiqueta: el texto que aparece sobre el campo. Placeholder: texto de ayuda dentro del campo vacío. Obligatorio: si el campo es requerido. Texto de ayuda: instrucciones adicionales.',
  },
  {
    id: 'properties-2',
    sectionId: 'properties',
    sectionName: 'Propiedades',
    title: 'Propiedades Específicas',
    content:
      'Texto/Contraseña: longitud mínima y máxima. Numérico/Slider: valores mínimo, máximo y paso. Select/Radio: lista de opciones personalizables. Archivo: tipos permitidos y tamaño máximo.',
  },
  {
    id: 'preview-1',
    sectionId: 'preview',
    sectionName: 'Vista Previa',
    title: 'Vista Previa Interactiva',
    content:
      'La vista previa te permite ver y probar tu formulario antes de publicarlo. Todos los campos funcionan como en el formulario final. Prueba las validaciones y mensajes de error.',
  },
  {
    id: 'preview-2',
    sectionId: 'preview',
    sectionName: 'Vista Previa',
    title: 'Características de Vista Previa',
    content:
      'Barra de progreso para visualizar el progreso de completado. Vista responsive para verificar cómo se ve en diferentes dispositivos.',
  },
  {
    id: 'preview-3',
    sectionId: 'preview',
    sectionName: 'Vista Previa',
    title: 'Interactividad Completa',
    content:
      'Todos los campos funcionan como en el formulario final, permitiéndote probar la experiencia completa del usuario.',
  },
  {
    id: 'preview-4',
    sectionId: 'preview',
    sectionName: 'Vista Previa',
    title: 'Validaciones',
    content:
      'Prueba las validaciones y mensajes de error para asegurarte de que tu formulario funciona correctamente.',
  },
  {
    id: 'preview-5',
    sectionId: 'preview',
    sectionName: 'Vista Previa',
    title: 'Barra de Progreso',
    content:
      'Visualiza el progreso de completado del formulario con una barra de progreso dinámica.',
  },
  {
    id: 'preview-6',
    sectionId: 'preview',
    sectionName: 'Vista Previa',
    title: 'Responsive',
    content: 'Verifica cómo se ve tu formulario en diferentes dispositivos y tamaños de pantalla.',
  },
  {
    id: 'import-export-1',
    sectionId: 'import-export',
    sectionName: 'Importar/Exportar',
    title: 'Exportar Formularios',
    content:
      'Puedes exportar tus formularios en formato JSON para hacer copias de seguridad, compartir con otros usuarios, o integrar en otras aplicaciones.',
  },
  {
    id: 'import-export-2',
    sectionId: 'import-export',
    sectionName: 'Importar/Exportar',
    title: 'Importar Formularios',
    content:
      'Importa formularios desde archivos JSON. Haz clic en "Importar JSON" en el Dashboard, selecciona el archivo o pega el contenido JSON, revisa la estructura y confirma.',
  },
  {
    id: 'tips-1',
    sectionId: 'tips',
    sectionName: 'Consejos',
    title: 'Mejores Prácticas',
    content:
      'Usa etiquetas claras y descriptivas. Marca solo campos esenciales como obligatorios. Proporciona ejemplos en placeholders. Organiza campos en orden lógico.',
  },
  {
    id: 'tips-2',
    sectionId: 'tips',
    sectionName: 'Consejos',
    title: 'Recomendaciones',
    content:
      'Agrega textos de ayuda cuando sea necesario. Siempre usa la vista previa antes de finalizar para asegurar que todo funciona correctamente.',
  },
  {
    id: 'tips-3',
    sectionId: 'tips',
    sectionName: 'Consejos',
    title: 'Nombres Descriptivos',
    content:
      'Usa etiquetas claras y descriptivas para cada campo, esto ayudará a los usuarios a entender qué información deben proporcionar.',
  },
  {
    id: 'tips-4',
    sectionId: 'tips',
    sectionName: 'Consejos',
    title: 'Campos Obligatorios',
    content:
      'Marca solo los campos esenciales como obligatorios para no abrumar a los usuarios con demasiados requisitos.',
  },
  {
    id: 'tips-5',
    sectionId: 'tips',
    sectionName: 'Consejos',
    title: 'Placeholders Útiles',
    content:
      'Proporciona ejemplos en los placeholders para guiar a los usuarios sobre el formato esperado.',
  },
  {
    id: 'tips-6',
    sectionId: 'tips',
    sectionName: 'Consejos',
    title: 'Orden Lógico',
    content:
      'Organiza los campos en un orden que tenga sentido para el usuario, agrupando información relacionada.',
  },
  {
    id: 'tips-7',
    sectionId: 'tips',
    sectionName: 'Consejos',
    title: 'Textos de Ayuda',
    content:
      'Agrega instrucciones cuando sea necesario para clarificar campos complejos o requisitos específicos.',
  },
  {
    id: 'tips-8',
    sectionId: 'tips',
    sectionName: 'Consejos',
    title: 'Prueba Siempre',
    content:
      'Usa la vista previa antes de finalizar para asegurar que todo funciona correctamente y la experiencia del usuario es óptima.',
  },
])

// El resto del código permanece igual...
// Computed: resultados de búsqueda
const searchResults = computed(() => {
  if (!searchQuery.value.trim()) return []

  const query = searchQuery.value.toLowerCase()
  const results = []

  // Buscar en el contenido principal
  for (const item of allContent.value) {
    if (item.title.toLowerCase().includes(query) || item.content.toLowerCase().includes(query)) {
      results.push({
        ...item,
        excerpt: getExcerpt(item.content, query),
      })
    }
  }

  // Buscar en FAQs
  faqs.value.forEach((faq, index) => {
    if (faq.question.toLowerCase().includes(query) || faq.answer.toLowerCase().includes(query)) {
      results.push({
        id: `faq-${index}`,
        sectionId: 'faq',
        sectionName: 'Preguntas Frecuentes',
        title: faq.question,
        content: faq.answer,
        excerpt: getExcerpt(faq.answer, query),
      })
    }
  })

  return results
})

// Methods
const filterContent = () => {
  // La búsqueda se realiza reactivamente a través del computed searchResults
}

const clearSearch = () => {
  searchQuery.value = ''
}

const getExcerpt = (text: string, query: string): string => {
  const index = text.toLowerCase().indexOf(query)
  if (index === -1) return text.substring(0, 150) + '...'

  const start = Math.max(0, index - 50)
  const end = Math.min(text.length, index + query.length + 100)
  let excerpt = text.substring(start, end)

  if (start > 0) excerpt = '...' + excerpt
  if (end < text.length) excerpt = excerpt + '...'

  return excerpt
}

const highlightSearchTerm = (text: string): string => {
  if (!searchQuery.value) return text

  const regex = new RegExp(`(${searchQuery.value})`, 'gi')
  return text.replace(regex, '<mark>$1</mark>')
}

const goToSection = (sectionId: string) => {
  // Limpiar búsqueda
  searchQuery.value = ''

  // Esperar a que el DOM se actualice
  setTimeout(() => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      activeSection.value = sectionId
    }
  }, 100)
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
  if (!searchQuery.value) {
    const sections = document.querySelectorAll('.help-section')
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect()
      if (rect.top <= 100 && rect.bottom >= 100) {
        activeSection.value = section.id
      }
    })
  }
}

// Initialize FAQs state
onMounted(() => {
  openFaqs.value = new Array(faqs.value.length).fill(false)
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// Limpiar resultados cuando se borra la búsqueda
watch(searchQuery, (newVal) => {
  if (!newVal) {
    // Restaurar vista normal
    activeSection.value = 'getting-started'
  }
})
</script>

<style scoped>
@import '@/assets/styles/HelpView.css';
</style>
