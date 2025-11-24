'use client'

import { useState, useEffect } from 'react'

// Constants
const STORAGE_KEY = 'quiz-progress'
const CURRENT_VERSION_KEY = 'current-quiz-version'

export const TOTAL_QUESTIONfS = 100; // Updated to match the new data structure with 100 questions

export interface Question {
  id: number
  soal: string
  pilihan: Record<string, string>
  jawaban_benar: string
  penjelasan?: string
}

export function useQuestions(count?: number) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch('/api/questions', { cache: 'no-store' })
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const allQuestions: Question[] = await response.json()
        
        if (!Array.isArray(allQuestions)) {
          throw new Error('Invalid data format')
        }
        
        const shuffled = allQuestions.sort(() => Math.random() - 0.5)
        const selected = count ? shuffled.slice(0, Math.min(count, allQuestions.length)) : shuffled
        
        setQuestions(selected)
      } catch (err) {
        console.error('Failed to load questions:', err)
        setError(err instanceof Error ? err.message : 'Failed to load questions')
      } finally {
        setLoading(false)
      }
    }

    loadQuestions()
  }, [count])

  const refetch = () => {
    const loadQuestions = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch('/api/questions', { cache: 'no-store' })
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const allQuestions: Question[] = await response.json()
        
        if (!Array.isArray(allQuestions)) {
          throw new Error('Invalid data format')
        }
        
        const shuffled = allQuestions.sort(() => Math.random() - 0.5)
        const selected = count ? shuffled.slice(0, Math.min(count, allQuestions.length)) : shuffled
        
        setQuestions(selected)
      } catch (err) {
        console.error('Failed to load questions:', err)
        setError(err instanceof Error ? err.message : 'Failed to load questions')
      } finally {
        setLoading(false)
      }
    }

    loadQuestions()
  }

  return { questions, loading, error, refetch }
}
