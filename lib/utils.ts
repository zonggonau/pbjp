export function cn(...inputs: string[]) {
  return inputs.filter(Boolean).join(' ')
}

export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  const pad = (n: number) => n.toString().padStart(2, '0')
  return `${pad(h)}:${pad(m)}:${pad(s)}`
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleString('id-ID')
}

export function calculatePercentage(score: number, total: number): number {
  return Math.round((score / total) * 100)
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function shuffle<T>(array: T[]): T[] {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

export function saveToLocalStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.error('Failed to save to localStorage:', error)
  }
}

export function getFromLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error('Failed to read from localStorage:', error)
    return defaultValue
  }
}

export function saveToSessionStorage<T>(key: string, data: T): void {
  try {
    sessionStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.error('Failed to save to sessionStorage:', error)
  }
}

export function getFromSessionStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = sessionStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error('Failed to read from sessionStorage:', error)
    return defaultValue
  }
}

// Normalize question objects coming from various legacy formats to a
// canonical shape used across the app and API consumers.
export type NormalizedQuestion = {
  id: number | string
  question: string
  options: Record<string, string>
  answer: string
  explanation: {
    correct: string
    why_others_wrong?: Record<string, string>
  }
  tags?: string[]
  difficulty?: string
}

export function normalizeQuestion(raw: any): NormalizedQuestion {
  if (!raw || typeof raw !== 'object') {
    return {
      id: raw?.id ?? -1,
      question: String(raw ?? ''),
      options: {},
      answer: '',
      explanation: { correct: '' },
    }
  }

  const id = raw.id ?? raw._id ?? raw.key ?? -1
  const question = raw.question ?? raw.soal ?? ''

  // Options may be under `options` or legacy `pilihan` and may sometimes be
  // an array or object. Prefer object; if array, map to letters.
  let options: Record<string, string> = {}
  const rawOptions = raw.options ?? raw.pilihan
  if (Array.isArray(rawOptions)) {
    const letters = 'abcdefghijklmnopqrstuvwxyz'
    rawOptions.forEach((v, i) => {
      options[letters[i] ?? String(i + 1)] = String(v)
    })
  } else if (rawOptions && typeof rawOptions === 'object') {
    options = Object.fromEntries(
      Object.entries(rawOptions).map(([k, v]) => [String(k), String(v)])
    )
  }

  const answer = raw.answer ?? raw.jawaban_benar ?? ''

  // Explanation might be an object or plain string
  let explanation: { correct: string; why_others_wrong?: Record<string, string> } = { correct: '' }
  if (typeof raw.explanation === 'string') {
    explanation.correct = raw.explanation
  } else if (raw.explanation && typeof raw.explanation === 'object') {
    explanation.correct = raw.explanation.correct ?? raw.explanation.penjelasan ?? ''
    if (raw.explanation.why_others_wrong || raw.explanation.why_others_wrong === 0) {
      explanation.why_others_wrong = raw.explanation.why_others_wrong
    } else if (raw.penjelasan && typeof raw.penjelasan === 'object') {
      explanation.why_others_wrong = raw.penjelasan.why_others_wrong
    }
  } else if (typeof raw.penjelasan === 'string') {
    explanation.correct = raw.penjelasan
  }

  return {
    id,
    question,
    options,
    answer: String(answer ?? ''),
    explanation,
    tags: raw.tags,
    difficulty: raw.difficulty,
  }
}

export function normalizeQuestions(arr: any[]): NormalizedQuestion[] {
  return (arr || []).map(normalizeQuestion)
}

export function clearSessionStorage(keys: string[]): void {
  try {
    keys.forEach(key => sessionStorage.removeItem(key))
  } catch (error) {
    console.error('Failed to clear sessionStorage:', error)
  }
}
