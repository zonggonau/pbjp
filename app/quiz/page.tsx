'use client'

import { useEffect, useState } from 'react'

interface Question {
  id: number
  question: string
  options: { [key: string]: string }
  answer: string
  explanation: {
    correct: string
    why_others_wrong?: { [key: string]: string }
  }
  tags: string[]
  difficulty: string
}

export default function QuizPage() {
  const [mounted, setMounted] = useState(false)
  const [name, setName] = useState('')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: string }>({})
  const [timeLeft, setTimeLeft] = useState(7200)
  const [quizStarted, setQuizStarted] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])
  const [selectedSession, setSelectedSession] = useState<number>(1)

  useEffect(() => {
    setMounted(true)
    const savedName = localStorage.getItem('pbjp_nama')
    if (savedName) {
      setName(savedName)
    } else {
      window.location.href = '/'
    }
  }, [])

  useEffect(() => {
    if (!mounted) return;

    // Load questions from API with session-based distribution
    const loadQuestions = async () => {
      // Check for saved session first
      const savedSession = sessionStorage.getItem(`quiz_session_${selectedSession}`)
      if (savedSession) {
        try {
          const sessionData = JSON.parse(savedSession)
          if (sessionData.questions && sessionData.questions.length > 0) {
            setQuestions(sessionData.questions)
            setAnswers(sessionData.answers || {})
            setTimeLeft(sessionData.timeLeft || 7200)
            setCurrentQuestion(sessionData.currentQuestion || 0)
            setQuizStarted(sessionData.quizStarted || false)

            // Resume timer if it was started
            if (sessionData.quizStarted) {
              // Small delay to ensure UI is ready
              setTimeout(() => setQuizStarted(true), 100)
            }
            return
          }
        } catch (e) {
          console.error("Error parsing saved quiz session:", e)
        }
      }

      try {
        const response = await fetch(`/api/questions?session=${selectedSession}&total_sessions=4`)
        const data = await response.json()

        if (data.questions && Array.isArray(data.questions)) {
          setQuestions(data.questions)
        } else if (data.error) {
          console.error('API Error:', data.error)
          setQuestions([])
        } else {
          const questionsArray = Array.isArray(data) ? data : [data]
          setQuestions(questionsArray)
        }

        // Reset quiz state when session changes (and no saved session found)
        setCurrentQuestion(0)
        setAnswers({})
        setTimeLeft(7200)
        setQuizStarted(false)
        setTimeout(() => setQuizStarted(true), 1000)

      } catch (error) {
        console.error('Error loading questions:', error)
        setQuestions([])
      }
    }

    loadQuestions()
  }, [mounted, selectedSession])

  // Save session state
  useEffect(() => {
    if (questions.length > 0) {
      const sessionData = {
        questions,
        answers,
        timeLeft,
        currentQuestion,
        quizStarted,
        timestamp: Date.now()
      }
      sessionStorage.setItem(`quiz_session_${selectedSession}`, JSON.stringify(sessionData))
    }
  }, [questions, answers, timeLeft, currentQuestion, quizStarted, selectedSession])

  useEffect(() => {
    if (!mounted || !quizStarted || timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmitQuiz()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [mounted, quizStarted, timeLeft])

  useEffect(() => {
    if (mounted) {
      // Initial start logic handled by loadQuestions now
    }
  }, [mounted])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleAnswerSelect = (questionIndex: number, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer
    }))
  }

  const handleSubmitQuiz = () => {
    const score = Object.entries(answers).reduce((acc, [index, answer]) => {
      const questionIndex = parseInt(index)
      if (questions[questionIndex] && questions[questionIndex].answer === answer) {
        return acc + 1
      }
      return acc
    }, 0)

    const passed = score >= 80
    const timeTaken = 7200 - timeLeft

    const result = {
      id: Date.now().toString(),
      name: name || 'Peserta',
      date: new Date().toISOString(),
      score: score,
      total: questions.length,
      passed: passed,
      durationSeconds: timeTaken,
      type: 'tryout',
      session: selectedSession
    }

    try {
      const history = JSON.parse(localStorage.getItem('pbjp_history') || '[]')
      history.unshift(result)
      localStorage.setItem('pbjp_history', JSON.stringify(history.slice(0, 100)))

      sessionStorage.setItem('pbjp_last_result', JSON.stringify(result))
      sessionStorage.setItem('pbjp_quiz_answers', JSON.stringify(answers))
      sessionStorage.setItem('pbjp_quiz_questions', JSON.stringify(questions.map(q => q.id)))

      // Clear current session progress
      sessionStorage.removeItem(`quiz_session_${selectedSession}`)
    } catch (error) {
      console.error('Error saving results:', error)
    }

    window.location.href = '/result'
  }

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-gray-800">Soal tidak tersedia</p>
        </div>
      </div>
    )
  }

  const currentQ = questions[currentQuestion]
  const totalQuestions = questions.length

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b">
            <div>
              <p className="text-sm text-gray-600">Peserta:</p>
              <p className="font-semibold text-gray-900">{name}</p>

              {/* Session Selector */}
              <div className="flex flex-wrap gap-2 mt-2">
                {[1, 2, 3, 4].map((sess) => (
                  <button
                    key={sess}
                    onClick={() => {
                      if (sess !== selectedSession) {
                        if (Object.keys(answers).length > 0) {
                          if (confirm('Ganti sesi akan mereset ujian saat ini. Lanjutkan?')) {
                            sessionStorage.removeItem(`quiz_session_${selectedSession}`);
                            setSelectedSession(sess);
                          }
                        } else {
                          setSelectedSession(sess);
                        }
                      }
                    }}
                    className={`px-2 py-1 text-xs rounded border transition-colors ${selectedSession === sess
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                  >
                    Sesi {sess}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 px-3 py-2 rounded-lg">
                <p className="font-mono font-semibold text-gray-900">{formatTime(timeLeft)}</p>
              </div>
              <button
                onClick={handleSubmitQuiz}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Akhiri Ujian
              </button>
            </div>
          </div>

          {/* Question Navigation */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Navigasi Soal:</p>
            <div className="flex flex-wrap gap-2">
              {questions.map((_, index) => {
                const isAnswered = answers[index] !== undefined
                const isCurrent = index === currentQuestion

                return (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestion(index)}
                    className={`w-10 h-10 rounded-md font-medium text-sm transition-colors ${isCurrent
                      ? 'bg-blue-600 text-white'
                      : isAnswered
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300:bg-gray-600'
                      }`}
                  >
                    {index + 1}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Question */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-4">
              Soal {currentQuestion + 1} dari {totalQuestions}
            </p>

            <div className="text-lg font-medium text-gray-900 mb-6">
              {currentQ.question}
            </div>

            {/* Options */}
            <div className="space-y-3">
              {Object.entries(currentQ.options || {}).map(([key, value]) => (
                <label
                  key={key}
                  className={`flex items-start p-4 rounded-lg border cursor-pointer transition-colors ${answers[currentQuestion] === key
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:bg-gray-50:bg-gray-800'
                    }`}
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestion}`}
                    value={key}
                    checked={answers[currentQuestion] === key}
                    onChange={() => handleAnswerSelect(currentQuestion, key)}
                    className="mt-1 mr-3"
                  />
                  <div className="flex-1">
                    <span className="font-medium text-gray-900">{key}.</span>
                    <span className="ml-2 text-gray-700">{value}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-4 border-t">
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Sebelumnya
            </button>
            <button
              onClick={() => setCurrentQuestion(Math.min(totalQuestions - 1, currentQuestion + 1))}
              disabled={currentQuestion === totalQuestions - 1}
              className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Berikutnya
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
