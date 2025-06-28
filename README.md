# TFG
Creación de Formularios Dinámicos a partir de Componentes Básicos.

📋 Descripción
Vue Form Builder es una aplicación web que revoluciona la creación de formularios dinámicos mediante una interfaz visual intuitiva. Diseñada para usuarios sin conocimientos técnicos, permite construir formularios complejos arrastrando y soltando componentes, con validaciones avanzadas y lógica condicional.
🎯 ¿Para quién es?

👔 Empresas: Digitaliza procesos sin depender del departamento IT
🎓 Educadores: Crea evaluaciones y encuestas personalizadas
🏥 Sector Salud: Genera formularios médicos adaptados
🏢 Administración: Automatiza la recolección de datos
💻 Desarrolladores: Prototipa formularios rápidamente

✨ Características Principales
🎨 Constructor Visual

Drag & Drop intuitivo: Arrastra componentes desde el panel lateral
15 tipos de campos: Texto, email, fecha, archivos, selectores, y más
Vista previa en tiempo real: Ve los cambios instantáneamente
Panel de propiedades: Configura cada campo sin código

🔧 Funcionalidades Avanzadas

Validaciones inteligentes: Email, teléfono, patrones personalizados
Lógica condicional: Muestra/oculta campos según respuestas
Plantillas predefinidas: Formularios deportivos listos para usar
Exportación/Importación JSON: Máxima portabilidad

💾 Sin Dependencias

100% Offline: Funciona sin conexión a internet
Sin servidor: Todo se ejecuta en el navegador
Datos locales: Información segura en LocalStorage
Costo cero: Sin licencias ni suscripciones

🖼️ Capturas de Pantalla
<div align="center">
  <img src="docs/images/dashboard.png" alt="Dashboard" width="45%" />
  <img src="docs/images/builder.png" alt="Constructor" width="45%" />
</div>
🚀 Inicio Rápido
Requisitos Previos

Node.js 18+
NPM 8+

Instalación
bash# Clonar el repositorio
git clone https://github.com/tu-usuario/vue-form-builder.git
cd vue-form-builder

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
Abre http://localhost:5173 en tu navegador ¡y empieza a crear!
📖 Cómo Funciona
1️⃣ Dashboard Principal
Al iniciar, verás tus formularios guardados. Haz clic en "Crear Nuevo Formulario" para comenzar.
2️⃣ Constructor de Formularios
La interfaz se divide en tres secciones:

Izquierda: Paleta de componentes disponibles
Centro: Canvas donde construyes tu formulario
Derecha: Propiedades del elemento seleccionado

3️⃣ Agregar Campos

Arrastra un componente desde la paleta
Suéltalo en el canvas central
Haz clic para configurar sus propiedades
Reordena arrastrando los campos

4️⃣ Configurar Propiedades
Cada campo puede personalizarse:

Etiqueta y placeholder
Validaciones (requerido, mínimo, máximo)
Mensajes de ayuda
Lógica condicional

5️⃣ Vista Previa y Guardar

Click en "Vista Previa" para probar el formulario
"Guardar" almacena el formulario localmente
"Exportar" genera un archivo JSON

🛠️ Tecnologías Utilizadas

Vue 3.3 - Framework progresivo de JavaScript
TypeScript - Tipado estático para mayor robustez
Pinia - Gestión de estado moderna y eficiente
Vite - Build tool ultrarrápido
VeeValidate - Validación de formularios potente
SortableJS - Drag & drop fluido

📂 Estructura del Proyecto
vue-form-builder/
├── src/
│   ├── components/        # Componentes reutilizables
│   ├── views/            # Vistas principales
│   ├── stores/           # Estado global (Pinia)
│   ├── composables/      # Lógica reutilizable
│   ├── assets/           # Estilos y recursos
│   └── types/            # Definiciones TypeScript
├── public/               # Archivos estáticos
└── tests/               # Pruebas unitarias

🤝 Contribuir
¡Las contribuciones son bienvenidas! Por favor:

Fork el proyecto
Crea tu rama de feature (git checkout -b feature/AmazingFeature)
Commit tus cambios (git commit -m 'Add some AmazingFeature')
Push a la rama (git push origin feature/AmazingFeature)
Abre un Pull Request

📄 Licencia
Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para más detalles.
👨‍💻 Autor
Moisés Sevilla Corrales

GitHub: @moisessevilla
