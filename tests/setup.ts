// tests/setup.ts
import { beforeEach, vi } from 'vitest'

// Mock de localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}

  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key]
    }),
    clear: vi.fn(() => {
      store = {}
    }),
    get length() {
      return Object.keys(store).length
    },
    key: vi.fn((index: number) => {
      const keys = Object.keys(store)
      return keys[index] || null
    }),
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
})

// Mock de window.confirm
window.confirm = vi.fn(() => true)

// Reset mocks antes de cada test
beforeEach(() => {
  vi.clearAllMocks()
  localStorageMock.clear()
})

// Exportar para uso en tests
export { localStorageMock }
