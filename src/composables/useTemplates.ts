// src/composables/useTemplates.ts
import { useFormBuilderStore } from '@/stores/formBuilder'
import type { Template } from '@/stores/templates'
import { ref } from 'vue'

export function useTemplates() {
  const formStore = useFormBuilderStore()

  // Definición de las plantillas deportivas
  const templates = ref<Template[]>([
    {
      id: 'football-registration',
      name: 'Inscripción Fútbol',
      description:
        'Formulario completo para inscripción en equipo de fútbol con información del jugador, experiencia y datos médicos',
      icon: '⚽',
      color: 'linear-gradient(135deg, #10b981, #059669)',
      category: 'team',
      featured: true,
      fields: 15,
      previewFields: [
        { type: 'text-input', label: 'Nombre completo' },
        { type: 'date', label: 'Fecha de nacimiento' },
        { type: 'select', label: 'Posición preferida' },
        { type: 'number', label: 'Años de experiencia' },
        { type: 'select', label: 'Categoría' },
        { type: 'text-input', label: 'Club anterior' },
        { type: 'textarea', label: 'Lesiones previas' },
        { type: 'checkbox', label: 'Certificado médico' },
      ],
      formElements: [
        {
          type: 'text-input',
          props: {
            label: 'Nombre completo',
            placeholder: 'Juan Pérez',
            required: true,
          },
        },
        {
          type: 'date',
          props: {
            label: 'Fecha de nacimiento',
            required: true,
            max: new Date().toISOString().split('T')[0],
          },
        },
        {
          type: 'email',
          props: {
            label: 'Correo electrónico',
            placeholder: 'jugador@email.com',
            required: true,
          },
        },
        {
          type: 'phone',
          props: {
            label: 'Teléfono de contacto',
            placeholder: '+34 600 00 00 00',
            required: true,
          },
        },
        {
          type: 'select',
          props: {
            label: 'Posición preferida',
            required: true,
            options: [
              { value: 'portero', label: 'Portero' },
              { value: 'defensa', label: 'Defensa' },
              { value: 'centrocampista', label: 'Centrocampista' },
              { value: 'delantero', label: 'Delantero' },
            ],
          },
        },
        {
          type: 'select',
          props: {
            label: 'Categoría',
            required: true,
            options: [
              { value: 'benjamin', label: 'Benjamín' },
              { value: 'alevin', label: 'Alevín' },
              { value: 'infantil', label: 'Infantil' },
              { value: 'cadete', label: 'Cadete' },
              { value: 'juvenil', label: 'Juvenil' },
              { value: 'senior', label: 'Senior' },
            ],
          },
        },
        {
          type: 'number',
          props: {
            label: 'Años de experiencia',
            placeholder: '0',
            min: 0,
            max: 50,
            required: false,
          },
        },
        {
          type: 'text-input',
          props: {
            label: 'Club anterior',
            placeholder: 'Nombre del club',
            required: false,
          },
        },
        {
          type: 'select',
          props: {
            label: 'Talla de camiseta',
            required: true,
            options: [
              { value: 'xs', label: 'XS' },
              { value: 's', label: 'S' },
              { value: 'm', label: 'M' },
              { value: 'l', label: 'L' },
              { value: 'xl', label: 'XL' },
              { value: 'xxl', label: 'XXL' },
            ],
          },
        },
        {
          type: 'number',
          props: {
            label: 'Número de dorsal preferido',
            placeholder: '10',
            min: 1,
            max: 99,
            required: false,
          },
        },
        {
          type: 'textarea',
          props: {
            label: 'Lesiones o condiciones médicas previas',
            placeholder: 'Describa cualquier lesión o condición médica relevante',
            rows: 4,
            required: false,
          },
        },
        {
          type: 'checkbox',
          props: {
            label: 'Tengo seguro médico deportivo',
            required: false,
          },
        },
        {
          type: 'checkbox',
          props: {
            label: 'Adjunto certificado médico',
            required: true,
          },
        },
        {
          type: 'checkbox',
          props: {
            label: 'Autorizo el uso de imágenes para fines deportivos',
            required: true,
          },
        },
        {
          type: 'checkbox',
          props: {
            label: 'Acepto las normas del club',
            required: true,
          },
        },
      ],
    },
    {
      id: 'basketball-registration',
      name: 'Inscripción Baloncesto',
      description:
        'Formulario para nuevos jugadores de baloncesto con datos físicos, experiencia y preferencias de juego',
      icon: '🏀',
      color: 'linear-gradient(135deg, #f97316, #ea580c)',
      category: 'team',
      featured: false,
      fields: 14,
      previewFields: [
        { type: 'text-input', label: 'Nombre completo' },
        { type: 'number', label: 'Altura (cm)' },
        { type: 'select', label: 'Posición de juego' },
        { type: 'radio', label: 'Mano dominante' },
        { type: 'range', label: 'Nivel de experiencia' },
      ],
      formElements: [
        {
          type: 'text-input',
          props: {
            label: 'Nombre completo',
            placeholder: 'María García',
            required: true,
          },
        },
        {
          type: 'date',
          props: {
            label: 'Fecha de nacimiento',
            required: true,
          },
        },
        {
          type: 'email',
          props: {
            label: 'Email',
            placeholder: 'jugador@email.com',
            required: true,
          },
        },
        {
          type: 'phone',
          props: {
            label: 'Teléfono',
            required: true,
          },
        },
        {
          type: 'number',
          props: {
            label: 'Altura (cm)',
            placeholder: '175',
            min: 100,
            max: 250,
            required: true,
          },
        },
        {
          type: 'number',
          props: {
            label: 'Peso (kg)',
            placeholder: '70',
            min: 30,
            max: 200,
            required: true,
          },
        },
        {
          type: 'select',
          props: {
            label: 'Posición de juego',
            required: true,
            options: [
              { value: 'base', label: 'Base' },
              { value: 'escolta', label: 'Escolta' },
              { value: 'alero', label: 'Alero' },
              { value: 'alapivot', label: 'Ala-Pívot' },
              { value: 'pivot', label: 'Pívot' },
            ],
          },
        },
        {
          type: 'radio',
          props: {
            label: 'Mano dominante',
            required: true,
            options: [
              { value: 'derecha', label: 'Derecha' },
              { value: 'izquierda', label: 'Izquierda' },
              { value: 'ambidiestro', label: 'Ambidiestro' },
            ],
          },
        },
        {
          type: 'range',
          props: {
            label: 'Nivel de experiencia (1-10)',
            min: 1,
            max: 10,
            step: 1,
            showValue: true,
            required: true,
          },
        },
        {
          type: 'text-input',
          props: {
            label: 'Equipo anterior',
            placeholder: 'Nombre del equipo',
            required: false,
          },
        },
        {
          type: 'select',
          props: {
            label: 'Talla de camiseta',
            required: true,
            options: [
              { value: 's', label: 'S' },
              { value: 'm', label: 'M' },
              { value: 'l', label: 'L' },
              { value: 'xl', label: 'XL' },
              { value: 'xxl', label: 'XXL' },
            ],
          },
        },
        {
          type: 'textarea',
          props: {
            label: 'Objetivos personales',
            placeholder: '¿Qué esperas lograr en el equipo?',
            rows: 3,
            required: false,
          },
        },
        {
          type: 'checkbox',
          props: {
            label: 'Tengo experiencia en competiciones oficiales',
            required: false,
          },
        },
        {
          type: 'checkbox',
          props: {
            label: 'Acepto el reglamento del equipo',
            required: true,
          },
        },
      ],
    },
    {
      id: 'gym-membership',
      name: 'Membresía Gimnasio',
      description:
        'Formulario de inscripción para gimnasio con objetivos, horarios y plan de entrenamiento',
      icon: '🏋️',
      color: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
      category: 'individual',
      featured: true,
      fields: 16,
      previewFields: [
        { type: 'text-input', label: 'Nombre completo' },
        { type: 'select', label: 'Plan de membresía' },
        { type: 'checkbox', label: 'Objetivos de entrenamiento' },
        { type: 'radio', label: 'Horario preferido' },
        { type: 'number', label: 'Peso actual (kg)' },
        { type: 'textarea', label: 'Condiciones médicas' },
      ],
      formElements: [
        {
          type: 'text-input',
          props: {
            label: 'Nombre completo',
            placeholder: 'Carlos Rodríguez',
            required: true,
          },
        },
        {
          type: 'date',
          props: {
            label: 'Fecha de nacimiento',
            required: true,
          },
        },
        {
          type: 'email',
          props: {
            label: 'Correo electrónico',
            required: true,
          },
        },
        {
          type: 'phone',
          props: {
            label: 'Teléfono',
            required: true,
          },
        },
        {
          type: 'select',
          props: {
            label: 'Plan de membresía',
            required: true,
            options: [
              { value: 'mensual', label: 'Mensual - 35€' },
              { value: 'trimestral', label: 'Trimestral - 90€' },
              { value: 'semestral', label: 'Semestral - 160€' },
              { value: 'anual', label: 'Anual - 300€' },
            ],
          },
        },
        {
          type: 'checkbox',
          props: {
            label: 'Pérdida de peso',
            required: false,
          },
        },
        {
          type: 'checkbox',
          props: {
            label: 'Ganancia de masa muscular',
            required: false,
          },
        },
        {
          type: 'checkbox',
          props: {
            label: 'Mejorar resistencia',
            required: false,
          },
        },
        {
          type: 'checkbox',
          props: {
            label: 'Tonificación',
            required: false,
          },
        },
        {
          type: 'checkbox',
          props: {
            label: 'Rehabilitación',
            required: false,
          },
        },
        {
          type: 'radio',
          props: {
            label: 'Horario preferido',
            required: true,
            options: [
              { value: 'mañana', label: 'Mañana (6:00 - 12:00)' },
              { value: 'tarde', label: 'Tarde (12:00 - 18:00)' },
              { value: 'noche', label: 'Noche (18:00 - 22:00)' },
            ],
          },
        },
        {
          type: 'number',
          props: {
            label: 'Peso actual (kg)',
            placeholder: '70',
            min: 30,
            max: 200,
            required: false,
          },
        },
        {
          type: 'number',
          props: {
            label: 'Altura (cm)',
            placeholder: '170',
            min: 100,
            max: 250,
            required: false,
          },
        },
        {
          type: 'textarea',
          props: {
            label: 'Condiciones médicas o lesiones',
            placeholder: 'Indique cualquier condición médica relevante',
            rows: 4,
            required: false,
          },
        },
        {
          type: 'checkbox',
          props: {
            label: 'Deseo contratar entrenador personal',
            required: false,
          },
        },
        {
          type: 'checkbox',
          props: {
            label: 'Acepto las normas del gimnasio',
            required: true,
          },
        },
      ],
    },
    {
      id: 'tennis-lessons',
      name: 'Clases de Tenis',
      description:
        'Inscripción para clases de tenis con nivel, disponibilidad y preferencias de entrenamiento',
      icon: '🎾',
      color: 'linear-gradient(135deg, #eab308, #ca8a04)',
      category: 'individual',
      featured: false,
      fields: 13,
      previewFields: [
        { type: 'text-input', label: 'Nombre completo' },
        { type: 'select', label: 'Nivel actual' },
        { type: 'radio', label: 'Tipo de clase' },
        { type: 'checkbox', label: 'Días disponibles' },
        { type: 'time', label: 'Hora preferida' },
      ],
      formElements: [
        {
          type: 'text-input',
          props: {
            label: 'Nombre completo',
            required: true,
          },
        },
        {
          type: 'email',
          props: {
            label: 'Email',
            required: true,
          },
        },
        {
          type: 'phone',
          props: {
            label: 'Teléfono',
            required: true,
          },
        },
        {
          type: 'select',
          props: {
            label: 'Nivel actual',
            required: true,
            options: [
              { value: 'principiante', label: 'Principiante' },
              { value: 'intermedio', label: 'Intermedio' },
              { value: 'avanzado', label: 'Avanzado' },
              { value: 'competicion', label: 'Competición' },
            ],
          },
        },
        {
          type: 'radio',
          props: {
            label: 'Tipo de clase',
            required: true,
            options: [
              { value: 'individual', label: 'Individual' },
              { value: 'grupo', label: 'Grupo (máx 4 personas)' },
              { value: 'pareja', label: 'En pareja' },
            ],
          },
        },
        {
          type: 'checkbox',
          props: {
            label: 'Lunes',
            required: false,
          },
        },
        {
          type: 'checkbox',
          props: {
            label: 'Martes',
            required: false,
          },
        },
        {
          type: 'checkbox',
          props: {
            label: 'Miércoles',
            required: false,
          },
        },
        {
          type: 'checkbox',
          props: {
            label: 'Jueves',
            required: false,
          },
        },
        {
          type: 'checkbox',
          props: {
            label: 'Viernes',
            required: false,
          },
        },
        {
          type: 'checkbox',
          props: {
            label: 'Sábado',
            required: false,
          },
        },
        {
          type: 'time',
          props: {
            label: 'Hora preferida de inicio',
            required: true,
          },
        },
        {
          type: 'checkbox',
          props: {
            label: 'Tengo mi propia raqueta',
            required: false,
          },
        },
      ],
    },
    {
      id: 'swimming-pool',
      name: 'Inscripción Natación',
      description:
        'Formulario para clases de natación con nivel, objetivos y disponibilidad horaria',
      icon: '🏊',
      color: 'linear-gradient(135deg, #06b6d4, #0891b2)',
      category: 'individual',
      featured: false,
      fields: 12,
      previewFields: [
        { type: 'text-input', label: 'Nombre del alumno' },
        { type: 'select', label: 'Nivel de natación' },
        { type: 'radio', label: 'Objetivo principal' },
        { type: 'select', label: 'Turno preferido' },
      ],
      formElements: [
        {
          type: 'text-input',
          props: {
            label: 'Nombre del alumno',
            required: true,
          },
        },
        {
          type: 'date',
          props: {
            label: 'Fecha de nacimiento',
            required: true,
          },
        },
        {
          type: 'text-input',
          props: {
            label: 'Nombre del padre/madre/tutor',
            placeholder: 'Para menores de edad',
            required: false,
          },
        },
        {
          type: 'email',
          props: {
            label: 'Email de contacto',
            required: true,
          },
        },
        {
          type: 'phone',
          props: {
            label: 'Teléfono',
            required: true,
          },
        },
        {
          type: 'select',
          props: {
            label: 'Nivel de natación',
            required: true,
            options: [
              { value: 'no_nada', label: 'No sabe nadar' },
              { value: 'principiante', label: 'Principiante' },
              { value: 'intermedio', label: 'Intermedio' },
              { value: 'avanzado', label: 'Avanzado' },
            ],
          },
        },
        {
          type: 'radio',
          props: {
            label: 'Objetivo principal',
            required: true,
            options: [
              { value: 'aprender', label: 'Aprender a nadar' },
              { value: 'mejorar', label: 'Mejorar técnica' },
              { value: 'ejercicio', label: 'Ejercicio y salud' },
              { value: 'competicion', label: 'Competición' },
            ],
          },
        },
        {
          type: 'select',
          props: {
            label: 'Turno preferido',
            required: true,
            options: [
              { value: 'mañana_temprano', label: 'Mañana (7:00 - 9:00)' },
              { value: 'mañana', label: 'Mañana (9:00 - 12:00)' },
              { value: 'tarde', label: 'Tarde (16:00 - 19:00)' },
              { value: 'noche', label: 'Noche (19:00 - 21:00)' },
            ],
          },
        },
        {
          type: 'checkbox',
          props: {
            label: 'Tiene miedo al agua',
            required: false,
          },
        },
        {
          type: 'textarea',
          props: {
            label: 'Alergias o condiciones médicas',
            placeholder: 'Cloro, asma, etc.',
            rows: 3,
            required: false,
          },
        },
        {
          type: 'checkbox',
          props: {
            label: 'Autorizo fotografías para uso interno',
            required: false,
          },
        },
        {
          type: 'checkbox',
          props: {
            label: 'He leído y acepto las normas de la piscina',
            required: true,
          },
        },
      ],
    },
    {
      id: 'yoga-classes',
      name: 'Clases de Yoga',
      description:
        'Inscripción para clases de yoga con estilo preferido, experiencia y objetivos personales',
      icon: '🧘',
      color: 'linear-gradient(135deg, #ec4899, #db2777)',
      category: 'wellness',
      featured: true,
      fields: 14,
      previewFields: [
        { type: 'text-input', label: 'Nombre completo' },
        { type: 'select', label: 'Estilo de yoga preferido' },
        { type: 'radio', label: 'Experiencia previa' },
        { type: 'checkbox', label: 'Objetivos' },
        { type: 'textarea', label: 'Lesiones o limitaciones' },
      ],
      formElements: [
        {
          type: 'text-input',
          props: {
            label: 'Nombre completo',
            required: true,
          },
        },
        {
          type: 'email',
          props: {
            label: 'Email',
            required: true,
          },
        },
        {
          type: 'phone',
          props: {
            label: 'Teléfono',
            required: true,
          },
        },
        {
          type: 'date',
          props: {
            label: 'Fecha de nacimiento',
            required: true,
          },
        },
        {
          type: 'select',
          props: {
            label: 'Estilo de yoga preferido',
            required: true,
            options: [
              { value: 'hatha', label: 'Hatha Yoga' },
              { value: 'vinyasa', label: 'Vinyasa' },
              { value: 'ashtanga', label: 'Ashtanga' },
              { value: 'yin', label: 'Yin Yoga' },
              { value: 'restaurativo', label: 'Yoga Restaurativo' },
              { value: 'cualquiera', label: 'No tengo preferencia' },
            ],
          },
        },
        {
          type: 'radio',
          props: {
            label: 'Experiencia previa en yoga',
            required: true,
            options: [
              { value: 'ninguna', label: 'Ninguna' },
              { value: 'menos_6_meses', label: 'Menos de 6 meses' },
              { value: '6_12_meses', label: '6-12 meses' },
              { value: 'mas_1_año', label: 'Más de 1 año' },
            ],
          },
        },
        {
          type: 'checkbox',
          props: {
            label: 'Reducir estrés',
            required: false,
          },
        },
        {
          type: 'checkbox',
          props: {
            label: 'Mejorar flexibilidad',
            required: false,
          },
        },
        {
          type: 'checkbox',
          props: {
            label: 'Fortalecer músculos',
            required: false,
          },
        },
        {
          type: 'checkbox',
          props: {
            label: 'Meditación y mindfulness',
            required: false,
          },
        },
        {
          type: 'checkbox',
          props: {
            label: 'Mejorar postura',
            required: false,
          },
        },
        {
          type: 'textarea',
          props: {
            label: 'Lesiones o limitaciones físicas',
            placeholder:
              'Por favor, indique cualquier lesión o limitación física que debamos conocer',
            rows: 4,
            required: false,
          },
        },
        {
          type: 'checkbox',
          props: {
            label: 'Estoy embarazada',
            required: false,
          },
        },
        {
          type: 'checkbox',
          props: {
            label: 'Acepto las condiciones y normativa del centro',
            required: true,
          },
        },
      ],
    },
  ])

  // Función para crear un formulario desde una plantilla
  const createFormFromTemplate = async (template: Template): Promise<string> => {
    try {
      // Crear un nuevo formulario
      formStore.newForm()

      // Establecer el nombre y descripción
      formStore.currentForm.name = template.name
      formStore.currentForm.description = template.description

      // Agregar todos los elementos de la plantilla
      template.formElements.forEach((element) => {
        formStore.addElement(element.type)

        // Obtener el último elemento agregado
        const lastElement =
          formStore.currentForm.elements[formStore.currentForm.elements.length - 1]

        // Actualizar sus propiedades
        if (lastElement) {
          formStore.updateElementProps(lastElement.id, element.props)
        }
      })

      // Guardar el formulario
      formStore.saveForm()

      return formStore.currentForm.id as string
    } catch (error) {
      console.error('Error al crear formulario desde plantilla:', error)
      throw error
    }
  }

  return {
    templates,
    createFormFromTemplate,
  }
}
