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
  const [selectedSession, setSelectedSession] = useState<number>(1);

  const loadQuestions = useCallback(async (session: number) => {
    setLoading(true);
    try {
      // Use session-based fetching: 6 sessions total for ~586 questions
      const response = await fetch(`/api/questions?session=${session}&total_sessions=6`);
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
      let mapped = data.map((q: any) => ({
        id: q.id,
        question: q.question,
        options: q.options,
        answer: q.answer,
        explanation: q.explanation,
        tags: q.tags,
        difficulty: q.difficulty,
      }));

      // Check for saved session to restore order
      const savedSession = sessionStorage.getItem(`latihan_session_${session}`);
      let shouldShuffle = true;

      if (savedSession) {
        try {
          const sessionData = JSON.parse(savedSession);
          // Check if saved questions match the fetched data (by checking if all IDs exist)
          // We assume the set of IDs is the same since it's deterministic from API
          if (sessionData.questions && sessionData.questions.length === mapped.length) {
            // Create a map for quick lookup
            const questionMap = new Map(mapped.map((q: any) => [q.id, q]));

            // Reconstruct the array based on saved order
            const reordered = sessionData.questions.map((id: number) => questionMap.get(id)).filter((q: any) => q !== undefined);

            if (reordered.length === mapped.length) {
              mapped = reordered;
              shouldShuffle = false;
            }
          }
        } catch (e) {
          console.error("Error parsing saved session for order:", e);
        }
      }

      if (shouldShuffle) {
        // Fisher-Yates shuffle
        for (let i = mapped.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [mapped[i], mapped[j]] = [mapped[j], mapped[i]];
        }
      }

      setQuestions(mapped);
      setLoading(false);
      // State reset is handled by the useEffect that checks for saved session
    } catch (error) {
      console.error('Failed to load questions:', error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadQuestions(selectedSession);
  }, [selectedSession, loadQuestions]);

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
        bookmarkedQuestions: Array.from(bookmarkedQuestions),
        finished,
        score
      };
      sessionStorage.setItem(`latihan_session_${selectedSession}`, JSON.stringify(sessionData));
    }
  }, [userAnswers, current, questions, loading, timeSpent, bookmarkedQuestions, finished, score, selectedSession]);

  useEffect(() => {
    // Load from sessionStorage when questions change or session changes
    if (!loading && questions.length > 0) {
      const savedSession = sessionStorage.getItem(`latihan_session_${selectedSession}`);
      if (savedSession) {
        try {
          const sessionData = JSON.parse(savedSession);
          // Verify if the saved session matches current questions (simple check by length or first ID)
          // Since questions are deterministic per session, this should be safe enough
          if (sessionData.questions && sessionData.questions.length === questions.length && sessionData.questions[0] === questions[0].id) {
            setUserAnswers(sessionData.userAnswers || {});
            setCurrent(sessionData.current || 0);
            setTimeSpent(sessionData.timeSpent || 0);
            setBookmarkedQuestions(new Set(sessionData.bookmarkedQuestions || []));
            setFinished(sessionData.finished || false);
            setScore(sessionData.score || 0);
            return;
          }
        } catch (error) {
          console.error('Failed to load session:', error);
        }
      }

      // If no valid session found, reset state
      setCurrent(0);
      setAnswer(null);
      setShowResult(false);
      setFinished(false);
      setUserAnswers({});
      setBookmarkedQuestions(new Set());
      setStartTime(Date.now());
      setTimeSpent(0);
      setScore(0);
    }
  }, [questions, loading, selectedSession]);

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
    return correctAnswers.length;
  };

  const finishLatihan = () => {
    const finalScore = calculateScore();
    setFinished(true);

    // Save result to history
    const result = {
      id: Date.now().toString(),
      name: `Latihan Sesi ${selectedSession}`,
      date: new Date().toISOString(),
      score: finalScore,
      total: questions.length,
      pass: (finalScore / questions.length) * 100 >= 80,
      durationSeconds: timeSpent,
      type: 'latihan',
      session: selectedSession
    };

    try {
      const history = JSON.parse(localStorage.getItem('pbjp_history') || '[]');
      history.unshift(result);
      localStorage.setItem('pbjp_history', JSON.stringify(history.slice(0, 100)));
    } catch (error) {
      console.error('Error saving history:', error);
    }

    // State will be saved by useEffect
  };

  const retryLatihan = () => {
    if (confirm('Apakah Anda yakin ingin mengulang latihan ini? Progress akan dihapus.')) {
      sessionStorage.removeItem(`latihan_session_${selectedSession}`);
      loadQuestions(selectedSession); // This will trigger fetch, and the useEffect will see no session and reset
    }
  };

  const resetSession = () => {
    if (confirm('Mulai baru akan menghapus semua progress sesi ini. Lanjutkan?')) {
      sessionStorage.removeItem(`latihan_session_${selectedSession}`);
      loadQuestions(selectedSession);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-gray-800">Soal tidak tersedia</p>
        </div>
      </div>
    );
  }

  const q = questions[current];
  // Defensive: fallback if q is undefined (should not happen, but for runtime safety)
  if (!q || !q.question || !q.options) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-gray-800">Soal tidak tersedia atau format data tidak valid.</p>
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
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-3 sm:p-4 lg:p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 pb-4 border-b gap-4">
            <div className="w-full sm:w-auto">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">✏️ Mode Latihan</h1>

              {/* Session Selector */}
              <div className="flex flex-wrap gap-2 my-2">
                {[1, 2, 3, 4, 5, 6].map((sess) => (
                  <button
                    key={sess}
                    onClick={() => {
                      if (sess !== selectedSession) {
                        if (Object.keys(userAnswers).length > 0 && !finished) {
                          if (confirm('Ganti sesi akan mereset progress saat ini. Lanjutkan?')) {
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

              <p className="text-xs sm:text-sm text-gray-600">
                Soal {current + 1} dari {questions.length} • ⏱️ {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
              </p>
              <div className="hidden lg:block text-xs text-gray-500 mt-1">
                💡 <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">1-9</kbd> Pilih jawaban •
                <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">←→</kbd> Navigasi •
                <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">Spasi</kbd> Lihat penjelasan •
                <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">B</kbd> Bookmark •
                <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">R</kbd> Review Mode •
                <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">S</kbd> Stats •
                <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">Ctrl+Enter</kbd> Selesaikan
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
                  : 'bg-gray-200 hover:bg-gray-300:bg-gray-600 text-gray-700'
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
                onClick={resetSession}
                className="rounded px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium transition-colors bg-red-600 hover:bg-red-700 text-white"
                title="Hapus progress dan mulai baru"
              >
                <span className="hidden sm:inline">↺ Baru</span>
                <span className="sm:hidden">↺</span>
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
                className="rounded px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50:bg-gray-800"
              >
                <span className="hidden sm:inline">← Keluar</span>
                <span className="sm:hidden">←</span>
              </a>
            </div>
          </div>

          {/* Progress Stats */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-sm text-blue-700">Total Soal</div>
              <div className="text-2xl font-bold text-blue-900">{questions.length}</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-sm text-green-700">Sudah Dijawab</div>
              <div className="text-2xl font-bold text-green-900">{Object.keys(userAnswers).length}</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-sm text-purple-700">Progress</div>
              <div className="text-2xl font-bold text-purple-900">
                {Math.round((Object.keys(userAnswers).length / questions.length) * 100)}%
              </div>
            </div>
          </div>

          {/* Advanced Stats Dashboard */}
          {showStats && (
            <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-4">📊 Advanced Analytics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-3 rounded-lg">
                  <div className="text-sm text-gray-600">⏱️ Total Waktu</div>
                  <div className="text-lg font-bold text-gray-900">
                    {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
                  </div>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <div className="text-sm text-gray-600">📝 Rata-rata/soal</div>
                  <div className="text-lg font-bold text-gray-900">
                    {timeSpent > 0 ? Math.round(timeSpent / totalAnswered) + 's' : '-'}
                  </div>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <div className="text-sm text-gray-600">🎯 Akurasi</div>
                  <div className="text-lg font-bold text-gray-900">
                    {totalAnswered > 0 ? percentage + '%' : '0%'}
                  </div>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <div className="text-sm text-gray-600">🔖 Bookmark</div>
                  <div className="text-lg font-bold text-gray-900">
                    {bookmarkedQuestions.size}
                  </div>
                </div>
              </div>

              {/* Difficulty Breakdown */}
              <div className="mt-4 pt-4 border-t border-purple-200">
                <h4 className="font-medium text-purple-800 mb-3">📈 Performance by Difficulty</h4>
                <div className="space-y-2">
                  {['easy', 'medium', 'hard'].map(diff => {
                    const diffQuestions = questions.filter(q => q.difficulty === diff);
                    const diffAnswered = diffQuestions.filter((q, idx) => userAnswers[idx]).length;
                    const diffCorrect = diffQuestions.filter((q, idx) => userAnswers[idx] === q.answer).length;
                    const diffPercentage = diffAnswered > 0 ? Math.round((diffCorrect / diffAnswered) * 100) : 0;

                    return (
                      <div key={diff} className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 capitalize">{diff}</span>
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
          <div className="mb-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
              <p className="text-sm text-gray-600">Navigasi Soal:</p>
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
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300:bg-gray-600'
                      }`}
                    title={`${isAnswered ? (isCorrect ? '✓ Benar' : '✗ Salah') : 'Belum dijawab'}${isBookmarked ? ' • 🔖 Bookmarked' : ''}`}
                  >
                    {index + 1}
                    {isBookmarked && (
                      <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full border border-white"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-gray-600">
                Soal {current + 1} dari {questions.length}
              </p>
            </div>

            <div className="text-lg font-medium text-gray-900 mb-6">
              {q.question}
            </div>

            {/* Options */}
            <div className="space-y-2 sm:space-y-3">
              {Object.entries(q.options || {}).map(([key, value]) => {
                let bgClass = "border-gray-200";
                let textClass = "text-gray-900";

                if (showResult) {
                  if (key === q.answer) {
                    bgClass = "border-green-500 bg-green-50";
                    textClass = "text-green-900";
                  } else if (key === answer && answer !== q.answer) {
                    bgClass = "border-red-500 bg-red-50";
                    textClass = "text-red-900";
                  }
                }

                return (
                  <button
                    key={key}
                    onClick={() => !showResult && handleAnswer(key)}
                    disabled={showResult}
                    className={`flex w-full items-start p-3 sm:p-4 rounded-lg border cursor-pointer transition-colors text-left ${answer === key && !showResult
                      ? 'border-blue-500 bg-blue-50'
                      : bgClass
                      } ${textClass} ${!showResult ? "hover:bg-gray-50:bg-gray-800" : "cursor-default"
                      }`}
                  >
                    <span className="font-medium text-gray-900 text-sm sm:text-base">{key}.</span>
                    <span className="ml-2 text-gray-700 text-sm sm:text-base flex-1">{value}</span>
                    {showResult && key === q.answer && (
                      <span className="text-green-600 ml-auto text-sm sm:text-base">✓</span>
                    )}
                    {showResult && key === answer && answer !== q.answer && (
                      <span className="text-red-600 ml-auto text-sm sm:text-base">✗</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Help Section */}
          {showResult && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">
                💡 Penjelasan Soal {current + 1}
              </h4>
              <div className="text-blue-800">
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
            <section className="rounded-xl bg-white p-6 shadow">
              <h2 className="mb-4 text-xl font-bold text-gray-900">Hasil Latihan</h2>
              <div className="mb-6">
                <div className={`mb-4 rounded-lg p-4 ${isPassing ? 'bg-green-50' : 'bg-red-50'}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{isPassing ? '🎉' : '😔'}</span>
                    <div>
                      <h3 className={`text-xl font-bold ${isPassing ? 'text-green-900' : 'text-red-900'}`}>
                        {isPassing ? 'LULUS' : 'TIDAK LULUS'}
                      </h3>
                      <p className={`text-sm ${isPassing ? 'text-green-700' : 'text-red-700'}`}>
                        Passing Grade: 80%
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="rounded-lg bg-blue-50 p-4">
                    <div className="text-sm text-blue-700">Skor Anda</div>
                    <div className="text-2xl font-bold text-blue-900">{score}/{questions.length}</div>
                  </div>
                  <div className="rounded-lg bg-purple-50 p-4">
                    <div className="text-sm text-purple-700">Persentase</div>
                    <div className="text-2xl font-bold text-purple-900">{percentage}%</div>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={retryLatihan}
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700:bg-blue-600"
                >
                  {isPassing ? 'Ulang Latihan (Reset)' : 'Ulang Latihan'}
                </button>
                <a
                  href="/"
                  className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50:bg-gray-800"
                >
                  Kembali ke Halaman Utama
                </a>
              </div>
            </section>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center pt-4 border-t">
            <button
              onClick={prevQuestion}
              disabled={current === 0}
              className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Sebelumnya
            </button>
            <button
              onClick={nextQuestion}
              disabled={current === questions.length - 1}
              className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Berikutnya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
