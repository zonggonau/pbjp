'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

type Question = {
  id: number
  soal: string
  pilihan: Record<string, string>
  jawaban_benar: string
  penjelasan?: string
}

type Attempt = {
  id: string
  name: string
  date: string
  score: number
  total: number
  pass: boolean
  durationSeconds: number
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const TOTAL_QUESTIONS = 100
const DURATION_SECONDS = 2 * 60 * 60

export default function QuizPage() {
  const [name, setName] = useState('')
  const [questions, setQuestions] = useState<Question[] | null>(null)
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [remaining, setRemaining] = useState(DURATION_SECONDS)
  const [loading, setLoading] = useState(true)
  const [showExplanation, setShowExplanation] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    try {
      const n = localStorage.getItem('pbjp_nama') || ''
      setName(n)
      if (!n) {
        window.location.href = '/'
        return
      }
    } catch {}

    ;(async () => {
      try {
        const res = await fetch('/api/questions', { cache: 'no-store' })
        const all: Question[] = await res.json()
        const picked = shuffle(all).slice(0, Math.min(TOTAL_QUESTIONS, all.length))
        setQuestions(picked)
        setLoading(false)
        try {
          const saved = sessionStorage.getItem('pbjp_timer_remaining')
          if (saved) setRemaining(parseInt(saved, 10))
        } catch {}
      } catch {
        setLoading(false)
      }
    })()
  }, [])

  useEffect(() => {
    if (loading) return
    if (timerRef.current) clearInterval(timerRef.current as any)
    timerRef.current = setInterval(() => {
      setRemaining((s) => {
        const next = s - 1
        try {
          sessionStorage.setItem('pbjp_timer_remaining', String(Math.max(next, 0)))
        } catch {}
        if (next <= 0) {
          clearInterval(timerRef.current as any)
          submit()
          return 0
        }
        return next
      })
    }, 1000)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current as any)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  // Close explanation modal when switching questions
  useEffect(() => {
    setShowExplanation(false)
  }, [current])

  const total = questions?.length || 0

  const formattedTime = useMemo(() => {
    const h = Math.floor(remaining / 3600)
    const m = Math.floor((remaining % 3600) / 60)
    const s = remaining % 60
    const pad = (n: number) => n.toString().padStart(2, '0')
    return `${pad(h)}:${pad(m)}:${pad(s)}`
  }, [remaining])

  function setAnswer(idx: number, choice: string) {
    setAnswers((prev) => ({ ...prev, [idx]: choice }))
  }

  function submit() {
    if (!questions || total === 0) return
    let score = 0
    for (let i = 0; i < total; i++) {
      const ans = answers[i]
      if (ans && ans === questions[i].jawaban_benar) score += 1
    }
    const pass = score >= Math.ceil(total * 0.65)
    const durationSeconds = DURATION_SECONDS - remaining
    const attempt: Attempt = {
      id: String(Date.now()),
      name: name || 'Peserta',
      date: new Date().toISOString(),
      score,
      total,
      pass,
      durationSeconds,
    }
    try {
      const raw = localStorage.getItem('pbjp_history')
      const arr: Attempt[] = raw ? JSON.parse(raw) : []
      arr.unshift(attempt)
      localStorage.setItem('pbjp_history', JSON.stringify(arr.slice(0, 100)))
      sessionStorage.setItem('pbjp_last_result', JSON.stringify(attempt))
      // Save answers and questions for review
      sessionStorage.setItem('pbjp_quiz_answers', JSON.stringify(answers))
      sessionStorage.setItem('pbjp_quiz_questions', JSON.stringify(questions.map(q => q.id)))
      sessionStorage.removeItem('pbjp_timer_remaining')
    } catch {}
    window.location.href = '/result'
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
        <div className="rounded-md bg-white p-6 text-zinc-800 shadow dark:bg-zinc-900 dark:text-zinc-100">Memuat soal...</div>
      </div>
    )
  }

  if (!questions || total === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
        <div className="rounded-md bg-white p-6 text-zinc-800 shadow dark:bg-zinc-900 dark:text-zinc-100">Soal tidak tersedia.</div>
      </div>
    )
  }

  const q = questions[current]
  const currentAnswer = answers[current]

  return (
    <div className="flex min-h-screen justify-center bg-zinc-50 p-4 font-sans dark:bg-black">
      <main className="flex w-full max-w-5xl flex-col gap-4 rounded-xl bg-white p-6 shadow dark:bg-zinc-900">
        <header className="flex items-center justify-between border-b border-zinc-200 pb-4 dark:border-zinc-800">
          <div className="text-sm text-zinc-700 dark:text-zinc-300">Peserta: <span className="font-medium">{name}</span></div>
          <div className="flex items-center gap-3">
            <div className="rounded-md bg-zinc-100 px-3 py-1 text-sm font-semibold text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">{formattedTime}</div>
            <button
              className="h-10 rounded-md bg-red-600 px-4 text-white hover:bg-red-700 active:bg-red-800"
              onClick={submit}
            >
              Akhiri Ujian
            </button>
          </div>
        </header>

        {/* Question Navigator Grid */}
        <div className="rounded-md border border-zinc-200 p-4 dark:border-zinc-800">
          <div className="mb-2 text-xs text-zinc-600 dark:text-zinc-400">Navigasi Soal</div>
          <div className="grid grid-cols-10 gap-2 sm:grid-cols-20">
            {Array.from({ length: total }, (_, i) => {
              const isAnswered = answers[i] !== undefined
              const isActive = i === current
              let bgClass = 'bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200' // gray: not answered
              if (isActive) bgClass = 'bg-blue-600 text-white' // blue: active
              else if (isAnswered) bgClass = 'bg-green-600 text-white' // green: answered
              
              return (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-8 w-8 rounded-md text-xs font-medium transition-colors hover:opacity-80 ${bgClass}`}
                >
                  {i + 1}
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-xs text-zinc-600 dark:text-zinc-400">Soal {current + 1} dari {total}</div>
          {q.penjelasan && (
            <button
              onClick={() => setShowExplanation(prev => !prev)}
              className="flex items-center gap-1 rounded-md bg-blue-100 px-2 py-1 text-xs text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800"
              title={showExplanation ? "Tutup penjelasan" : "Lihat penjelasan"}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Help</span>
            </button>
          )}
        </div>
        <section className="flex flex-col gap-4">
          <div className="whitespace-pre-wrap text-base text-zinc-900 dark:text-zinc-100">{q.soal}</div>
          <div className="flex flex-col gap-2">
            {Object.entries(q.pilihan).map(([k, v]) => (
              <label key={k} className={`flex cursor-pointer items-start gap-3 rounded-md border p-3 text-zinc-900 dark:text-zinc-100 ${currentAnswer === k ? 'border-zinc-900 dark:border-zinc-200' : 'border-zinc-300 dark:border-zinc-700'}`}>
                <input
                  type="radio"
                  name={`q_${current}`}
                  value={k}
                  checked={currentAnswer === k}
                  onChange={() => setAnswer(current, k)}
                  className="mt-1"
                />
                <div className="text-sm text-zinc-900 dark:text-zinc-100">
                  <span className="font-medium">{k}.</span> {v}
                </div>
              </label>
            ))}
          </div>
        </section>
        <footer className="mt-2 border-t border-zinc-200 pt-4 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <button
              className="h-10 rounded-md border border-zinc-300 px-4 text-zinc-800 hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
              onClick={() => setCurrent((i) => Math.max(0, i - 1))}
              disabled={current === 0}
            >
              Sebelumnya
            </button>
            <button
              className="h-10 rounded-md border border-zinc-300 px-4 text-zinc-800 hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
              onClick={() => setCurrent((i) => Math.min(total - 1, i + 1))}
              disabled={current === total - 1}
            >
              Berikutnya
            </button>
          </div>

          {/* Inline Explanation */}
          {showExplanation && q.penjelasan && (
            <div className="mt-4 rounded-md border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950">
              <h4 className="mb-2 text-sm font-semibold text-blue-900 dark:text-blue-200">
                💡 Penjelasan Soal {current + 1}
              </h4>
              <div className="whitespace-pre-wrap text-sm text-blue-800 dark:text-blue-200">
                {q.penjelasan}
              </div>
            </div>
          )}
        </footer>
      </main>
    </div>
  )
}
