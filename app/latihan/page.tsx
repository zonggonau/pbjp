"use client";
import { useEffect, useState, useCallback } from "react";

type Question = {
  id: number;
  question: string;
  options: Record<string, string>;
  answer: string;
  explanation: {
    correct: string;
    why_others_wrong?: Record<string, string>;
  };
  tags?: string[];
  difficulty?: string;
};

export default function LatihanPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState<number>(0);
  const [finished, setFinished] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<Set<number>>(new Set());
  const [showStats, setShowStats] = useState<boolean>(false);
  const [reviewMode, setReviewMode] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const response = await fetch("/api/questions?balanced=true&limit=100&groups=59");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();

        // Extract questions array from the response object
        const data = responseData.questions || responseData;

        if (!Array.isArray(data)) {
          throw new Error('Invalid data format: expected questions array');
        }

        // Pastikan mapping ke format baru
        const mapped = data.map((q: any) => ({
          id: q.id,
          question: q.question,
          options: q.options,
          answer: q.answer,
          explanation: q.explanation,
          tags: q.tags,
          difficulty: q.difficulty,
        }));
        // API sudah mengembalikan 100 soal yang balanced, tidak perlu shuffle manual
        setQuestions(mapped);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load questions:', error);
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (finished || loading) return;

      // Number keys 1-9 for answer selection
      if (e.key >= '1' && e.key <= '9') {
        const optionIndex = parseInt(e.key) - 1;
        const options = Object.keys(questions[current]?.options || {});
        if (options[optionIndex] && !showResult) {
          handleAnswer(options[optionIndex]);
        }
      }

      // Arrow keys for navigation
      if (e.key === 'ArrowRight' && current < questions.length - 1) {
        nextQuestion();
      } else if (e.key === 'ArrowLeft' && current > 0) {
        prevQuestion();
      }

      // Space to show/hide help (if answered)
      if (e.key === ' ' && userAnswers[current]) {
        e.preventDefault();
        setShowResult(!showResult);
      }

      // B to bookmark
      if (e.key === 'b' || e.key === 'B') {
        e.preventDefault();
        setBookmarkedQuestions(prev => {
          const newSet = new Set(prev);
          if (newSet.has(current)) {
            newSet.delete(current);
          } else {
            newSet.add(current);
          }
          return newSet;
        });
      }

      // R to toggle review mode
      if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        setReviewMode(!reviewMode);
      }

      // S to toggle stats
      if (e.key === 's' || e.key === 'S') {
        e.preventDefault();
        setShowStats(!showStats);
      }

      // Enter to finish
      if (e.key === 'Enter' && e.ctrlKey) {
        finishLatihan();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [current, questions, showResult, userAnswers, finished, loading]);

  // Timer and analytics
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  // Session persistence
  useEffect(() => {
    // Save progress to sessionStorage
    if (!loading && questions.length > 0) {
      const sessionData = {
        userAnswers,
        current,
        questions: questions.map(q => q.id),
        timestamp: Date.now(),
        timeSpent,
        bookmarkedQuestions: Array.from(bookmarkedQuestions)
      };
      sessionStorage.setItem('latihan_session', JSON.stringify(sessionData));
    }
  }, [userAnswers, current, questions, loading, timeSpent, bookmarkedQuestions]);

  useEffect(() => {
    // Load from sessionStorage on mount
    const savedSession = sessionStorage.getItem('latihan_session');
    if (savedSession && !loading) {
      try {
        const sessionData = JSON.parse(savedSession);
        const isRecent = Date.now() - sessionData.timestamp < 24 * 60 * 60 * 1000; // 24 hours

        if (isRecent && sessionData.questions.length === questions.length) {
          setUserAnswers(sessionData.userAnswers || {});
          setCurrent(sessionData.current || 0);
        }
      } catch (error) {
        console.error('Failed to load session:', error);
      }
    }
  }, [questions, loading]);

  const handleAnswer = useCallback((choice: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [current]: choice
    }));
    setAnswer(choice);
    setShowResult(true);
  }, [current]);

  const nextQuestion = useCallback(() => {
    if (current < questions.length - 1) {
      const nextIndex = current + 1;
      setCurrent(nextIndex);
      setAnswer(userAnswers[nextIndex] || null);
      setShowResult(!!userAnswers[nextIndex]);
    }
  }, [current, questions.length, userAnswers]);

  const prevQuestion = useCallback(() => {
    if (current > 0) {
      const prevIndex = current - 1;
      setCurrent(prevIndex);
      setAnswer(userAnswers[prevIndex] || null);
      setShowResult(!!userAnswers[prevIndex]);
    }
  }, [current, userAnswers]);

  const goToQuestion = useCallback((index: number) => {
    setCurrent(index);
    setAnswer(userAnswers[index] || null);
    setShowResult(!!userAnswers[index]);
  }, [userAnswers]);

  const calculateScore = () => {
    const correctAnswers = questions.filter((question, index) => {
      const userAnswer = userAnswers[index];
      const correctAnswer = question?.answer;
      return userAnswer && correctAnswer && userAnswer === correctAnswer;
    });
    setScore(correctAnswers.length);
  };

  const finishLatihan = () => {
    calculateScore();
    setFinished(true);
  };

  const retryLatihan = () => {
    setCurrent(0);
    setAnswer(null);
    setShowResult(false);
    setFinished(false);
    setUserAnswers({});
    // Reload questions with new balanced set
    fetch("/api/questions?balanced=true&limit=100&groups=59")
      .then((r) => r.json())
      .then((responseData) => {
        // Extract questions array from the response object
        const data = responseData.questions || responseData;
        const mapped = data.map((q: any) => ({
          id: q.id,
          question: q.question,
          options: q.options,
          answer: q.answer,
          explanation: q.explanation,
          tags: q.tags,
          difficulty: q.difficulty,
        }));
        // API sudah mengembalikan 100 soal yang balanced
        setQuestions(mapped);
      });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-black">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
          <p className="text-gray-800 dark:text-gray-200">Soal tidak tersedia</p>
        </div>
      </div>
    );
  }

  const q = questions[current];
  // Defensive: fallback if q is undefined (should not happen, but for runtime safety)
  if (!q || !q.question || !q.options) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-black">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
          <p className="text-gray-800 dark:text-gray-200">Soal tidak tersedia atau format data tidak valid.</p>
        </div>
      </div>
    );
  }
  const isCorrect = answer === q.answer;

  // Calculate statistics
  const totalAnswered = Object.keys(userAnswers).length;
  const correctCount = questions.filter((question, index) => {
    const userAnswer = userAnswers[index];
    const correctAnswer = question?.answer;
    return userAnswer && correctAnswer && userAnswer === correctAnswer;
  }).length;
  const incorrectCount = totalAnswered - correctCount;
  const percentage = totalAnswered > 0 ? Math.round((correctCount / questions.length) * 100) : 0;
  const isPassing = percentage >= 80;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black p-2 sm:p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-3 sm:p-4 lg:p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 pb-4 border-b dark:border-gray-700 gap-4">
            <div className="w-full sm:w-auto">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">✏️ Mode Latihan</h1>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Soal {current + 1} dari {questions.length} • ⏱️ {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
              </p>
              <div className="hidden lg:block text-xs text-gray-500 dark:text-gray-400 mt-1">
                💡 <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">1-9</kbd> Pilih jawaban •
                <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">←→</kbd> Navigasi •
                <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">Spasi</kbd> Lihat penjelasan •
                <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">B</kbd> Bookmark •
                <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">R</kbd> Review Mode •
                <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">S</kbd> Stats •
                <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">Ctrl+Enter</kbd> Selesaikan
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-1 sm:gap-2 w-full sm:w-auto justify-start sm:justify-end">
              <button
                onClick={() => setBookmarkedQuestions(prev => {
                  const newSet = new Set(prev);
                  if (newSet.has(current)) {
                    newSet.delete(current);
                  } else {
                    newSet.add(current);
                  }
                  return newSet;
                })}
                className={`rounded px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium transition-colors ${bookmarkedQuestions.has(current)
                    ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                  }`}
                title="Bookmark soal ini (B)"
              >
                {bookmarkedQuestions.has(current) ? '🔖' : '📌'}
              </button>
              <button
                onClick={() => setShowStats(!showStats)}
                className="rounded px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium transition-colors bg-purple-600 hover:bg-purple-700 text-white"
                title="Tampilkan statistik (S)"
              >
                📊
              </button>
              <button
                onClick={() => setReviewMode(!reviewMode)}
                className={`rounded px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium transition-colors ${reviewMode
                    ? 'bg-orange-600 hover:bg-orange-700 text-white'
                    : 'bg-gray-600 hover:bg-gray-700 text-white'
                  }`}
                title="Toggle review mode (R)"
              >
                <span className="hidden sm:inline">{reviewMode ? '📝 Review' : '📖 Normal'}</span>
                <span className="sm:hidden">{reviewMode ? '📝' : '📖'}</span>
              </button>
              <button
                onClick={finishLatihan}
                className="rounded px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium transition-colors bg-green-600 hover:bg-green-700 text-white"
              >
                <span className="hidden sm:inline">Selesaikan</span>
                <span className="sm:hidden">✓</span>
              </button>
              <a
                href="/"
                className="rounded px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <span className="hidden sm:inline">← Keluar</span>
                <span className="sm:hidden">←</span>
              </a>
            </div>
          </div>

          {/* Progress Stats */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
              <div className="text-sm text-blue-700 dark:text-blue-300">Total Soal</div>
              <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{questions.length}</div>
            </div>
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
              <div className="text-sm text-green-700 dark:text-green-300">Sudah Dijawab</div>
              <div className="text-2xl font-bold text-green-900 dark:text-green-100">{Object.keys(userAnswers).length}</div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
              <div className="text-sm text-purple-700 dark:text-purple-300">Progress</div>
              <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                {Math.round((Object.keys(userAnswers).length / questions.length) * 100)}%
              </div>
            </div>
          </div>

          {/* Advanced Stats Dashboard */}
          {showStats && (
            <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-lg">
              <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-4">📊 Advanced Analytics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-400">⏱️ Total Waktu</div>
                  <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-400">📝 Rata-rata/soal</div>
                  <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {timeSpent > 0 ? Math.round(timeSpent / totalAnswered) + 's' : '-'}
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-400">🎯 Akurasi</div>
                  <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {totalAnswered > 0 ? percentage + '%' : '0%'}
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-400">🔖 Bookmark</div>
                  <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {bookmarkedQuestions.size}
                  </div>
                </div>
              </div>

              {/* Difficulty Breakdown */}
              <div className="mt-4 pt-4 border-t border-purple-200 dark:border-purple-800">
                <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-3">📈 Performance by Difficulty</h4>
                <div className="space-y-2">
                  {['easy', 'medium', 'hard'].map(diff => {
                    const diffQuestions = questions.filter(q => q.difficulty === diff);
                    const diffAnswered = diffQuestions.filter((q, idx) => userAnswers[idx]).length;
                    const diffCorrect = diffQuestions.filter((q, idx) => userAnswers[idx] === q.answer).length;
                    const diffPercentage = diffAnswered > 0 ? Math.round((diffCorrect / diffAnswered) * 100) : 0;

                    return (
                      <div key={diff} className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">{diff}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{diffCorrect}/{diffAnswered}</span>
                          <span className={`text-xs px-2 py-1 rounded ${diffPercentage >= 80 ? 'bg-green-100 text-green-800' :
                              diffPercentage >= 60 ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                            }`}>
                            {diffPercentage}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Question Navigation */}
          <div className="mb-6 p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">Navigasi Soal:</p>
              <div className="flex flex-col xs:flex-row gap-2 w-full sm:w-auto">
                <button
                  onClick={() => {
                    const firstUnanswered = questions.findIndex((_, index) => !userAnswers[index]);
                    if (firstUnanswered !== -1) goToQuestion(firstUnanswered);
                  }}
                  className="text-xs bg-orange-600 hover:bg-orange-700 text-white px-2 py-1 rounded transition-colors w-full xs:w-auto"
                >
                  Lanjut ke Belum Dijawab
                </button>
                <button
                  onClick={() => {
                    const answeredQuestions = Object.keys(userAnswers).map(Number);
                    if (answeredQuestions.length > 0) {
                      const randomIndex = answeredQuestions[Math.floor(Math.random() * answeredQuestions.length)];
                      goToQuestion(randomIndex);
                    }
                  }}
                  className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1 rounded transition-colors w-full xs:w-auto"
                >
                  Random Sudah Dijawab
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center sm:justify-start">
              {questions.map((_, index) => {
                const isAnswered = userAnswers[index] !== undefined && userAnswers[index] !== null;
                const isCurrent = index === current;
                const isCorrect = isAnswered && userAnswers[index] === questions[index]?.answer;
                const isBookmarked = bookmarkedQuestions.has(index);

                return (
                  <button
                    key={index}
                    onClick={() => goToQuestion(index)}
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-md font-medium text-xs sm:text-sm transition-all transform hover:scale-105 relative ${isCurrent
                        ? 'bg-blue-600 text-white ring-2 ring-blue-300'
                        : isAnswered
                          ? isCorrect
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-orange-600 text-white hover:bg-orange-700'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                    title={`${isAnswered ? (isCorrect ? '✓ Benar' : '✗ Salah') : 'Belum dijawab'}${isBookmarked ? ' • 🔖 Bookmarked' : ''}`}
                  >
                    {index + 1}
                    {isBookmarked && (
                      <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full border border-white dark:border-gray-900"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Soal {current + 1} dari {questions.length}
              </p>
            </div>

            <div className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-6">
              {q.question}
            </div>

            {/* Options */}
            <div className="space-y-2 sm:space-y-3">
              {Object.entries(q.options || {}).map(([key, value]) => {
                let bgClass = "border-gray-200 dark:border-gray-700";
                let textClass = "text-gray-900 dark:text-gray-100";

                if (showResult) {
                  if (key === q.answer) {
                    bgClass = "border-green-500 bg-green-50 dark:bg-green-950/20";
                    textClass = "text-green-900 dark:text-green-100";
                  } else if (key === answer && answer !== q.answer) {
                    bgClass = "border-red-500 bg-red-50 dark:bg-red-950/20";
                    textClass = "text-red-900 dark:text-red-100";
                  }
                }

                return (
                  <button
                    key={key}
                    onClick={() => !showResult && handleAnswer(key)}
                    disabled={showResult}
                    className={`flex w-full items-start p-3 sm:p-4 rounded-lg border cursor-pointer transition-colors text-left ${answer === key && !showResult
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : bgClass
                      } ${textClass} ${!showResult ? "hover:bg-gray-50 dark:hover:bg-gray-800" : "cursor-default"
                      }`}
                  >
                    <span className="font-medium text-gray-900 dark:text-gray-100 text-sm sm:text-base">{key}.</span>
                    <span className="ml-2 text-gray-700 dark:text-gray-300 text-sm sm:text-base flex-1">{value}</span>
                    {showResult && key === q.answer && (
                      <span className="text-green-600 dark:text-green-400 ml-auto text-sm sm:text-base">✓</span>
                    )}
                    {showResult && key === answer && answer !== q.answer && (
                      <span className="text-red-600 dark:text-red-400 ml-auto text-sm sm:text-base">✗</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Help Section */}
          {showResult && (
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                💡 Penjelasan Soal {current + 1}
              </h4>
              <div className="text-blue-800 dark:text-blue-200">
                <p className="mb-2"><strong>Jawaban benar:</strong> {q.explanation?.correct || ""}</p>
                {q.explanation?.why_others_wrong && (
                  <div className="mt-3">
                    <p className="font-medium mb-2">Mengapa jawaban lain salah:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {Object.entries(q.explanation?.why_others_wrong || {}).map(([k, v]) => (
                        <li key={k}><strong>{k}.</strong> {String(v)}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* End of Latihan */}
          {finished && (
            <section className="rounded-xl bg-white p-6 shadow dark:bg-gray-900">
              <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">Hasil Latihan</h2>
              <div className="mb-6">
                <div className={`mb-4 rounded-lg p-4 ${isPassing ? 'bg-green-50 dark:bg-green-950' : 'bg-red-50 dark:bg-red-950'}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{isPassing ? '🎉' : '😔'}</span>
                    <div>
                      <h3 className={`text-xl font-bold ${isPassing ? 'text-green-900 dark:text-green-100' : 'text-red-900 dark:text-red-100'}`}>
                        {isPassing ? 'LULUS' : 'TIDAK LULUS'}
                      </h3>
                      <p className={`text-sm ${isPassing ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                        Passing Grade: 80%
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-950">
                    <div className="text-sm text-blue-700 dark:text-blue-300">Skor Anda</div>
                    <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{score}/{questions.length}</div>
                  </div>
                  <div className="rounded-lg bg-purple-50 p-4 dark:bg-purple-950">
                    <div className="text-sm text-purple-700 dark:text-purple-300">Persentase</div>
                    <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">{percentage}%</div>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={retryLatihan}
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
                >
                  Latihan Lagi
                </button>
                <a
                  href="/"
                  className="rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Kembali ke Halaman Utama
                </a>
              </div>
            </section>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center pt-4 border-t dark:border-gray-700">
            <button
              onClick={prevQuestion}
              disabled={current === 0}
              className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Sebelumnya
            </button>
            <button
              onClick={nextQuestion}
              disabled={current === questions.length - 1}
              className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Berikutnya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
