// src/types/templates.ts

export interface TemplateField {
  type: string
  label: string
}

export interface FormElementTemplate {
  type: string
  component?: string
  props: {
    label: string
    placeholder?: string
    required: boolean
    options?: Array<{ value: string; label: string }>
    min?: number | string | null
    max?: number | string | null
    step?: number
    rows?: number
    showValue?: boolean
    pattern?: string | null
    minLength?: number
    maxLength?: number | null
    accept?: string
    multiple?: boolean
    maxSize?: number
    format?: string
    showToggle?: boolean
    defaultValue?: string
    helpText?: string
    disabled?: boolean
    readonly?: boolean
    showCharCount?: boolean
    type?: string
  }
  validation?: {
    required: boolean
    rules: string[]
  }
}

export interface Template {
  id: string
  name: string
  description: string
  icon: string
  color: string
  category: 'all' | 'team' | 'individual' | 'wellness'
  featured: boolean
  fields: number
  previewFields: TemplateField[]
  formElements: FormElementTemplate[]
}

// Interfaces para importación JSON
export interface ImportableForm {
  id?: string
  name: string
  description?: string
  elements: Array<ImportableFormElement>
}

export interface ImportableFormElement {
  id?: string
  type: string
  component?: string
  props: {
    label: string
    placeholder?: string
    required: boolean
    maxLength?: number | null
    minLength?: number | null
    rows?: number
    options?: Array<{ value: string; label: string }>
    disabled?: boolean
    readonly?: boolean
    type?: string
    helpText?: string
    showCharCount?: boolean
    pattern?: string | null
    min?: number | string | null
    max?: number | string | null
    step?: number
    showToggle?: boolean
    accept?: string
    multiple?: boolean
    maxSize?: number
    showValue?: boolean
    defaultValue?: string
    format?: string
  }
  validation?: {
    required: boolean
    rules: string[]
  }
}
