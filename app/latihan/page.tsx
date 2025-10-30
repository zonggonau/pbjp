"use client";
import { useEffect, useState } from "react";

type Question = {
  id: number;
  soal: string;
  pilihan: Record<string, string>;
  jawaban_benar: string;
  penjelasan: string;
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

  useEffect(() => {
    fetch("/api/questions")
      .then((r) => r.json())
      .then((data) => {
        // Shuffle questions untuk variasi
        const shuffled = [...data].sort(() => Math.random() - 0.5);
        setQuestions(shuffled.slice(0, 20)); // Ambil 20 soal random
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleAnswer = (choice: string) => {
    setAnswer(choice);
    setShowResult(true);
    setUserAnswers(prev => ({ ...prev, [current]: choice }));
  };

  const nextQuestion = () => {
    if (current < questions.length - 1) {
      const nextIndex = current + 1;
      setCurrent(nextIndex);
      setAnswer(userAnswers[nextIndex] || null);
      setShowResult(!!userAnswers[nextIndex]);
    }
  };

  const prevQuestion = () => {
    if (current > 0) {
      const prevIndex = current - 1;
      setCurrent(prevIndex);
      setAnswer(userAnswers[prevIndex] || null);
      setShowResult(!!userAnswers[prevIndex]);
    }
  };

  const goToQuestion = (index: number) => {
    setCurrent(index);
    setAnswer(userAnswers[index] || null);
    setShowResult(!!userAnswers[index]);
  };

  const calculateScore = () => {
    const correctAnswers = questions.filter((q, index) => userAnswers[index] === q.jawaban_benar);
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
    // Reload questions with new random set
    fetch("/api/questions")
      .then((r) => r.json())
      .then((data) => {
        const shuffled = [...data].sort(() => Math.random() - 0.5);
        setQuestions(shuffled.slice(0, 20));
      });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
        <div className="rounded-md bg-white p-6 text-zinc-800 shadow dark:bg-zinc-900 dark:text-zinc-100">
          Memuat soal latihan...
        </div>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
        <div className="rounded-md bg-white p-6 text-zinc-800 shadow dark:bg-zinc-900 dark:text-zinc-100">
          Soal tidak tersedia.
        </div>
      </div>
    );
  }

  const q = questions[current];
  const isCorrect = answer === q.jawaban_benar;

  // Calculate statistics
  const totalAnswered = Object.keys(userAnswers).length;
  const correctCount = questions.filter((q, index) => userAnswers[index] === q.jawaban_benar).length;
  const incorrectCount = totalAnswered - correctCount;
  const percentage = totalAnswered > 0 ? Math.round((correctCount / questions.length) * 100) : 0;
  const isPassing = percentage >= 80;

  return (
    <div className="min-h-screen bg-zinc-50 p-4 font-sans dark:bg-black">
      <div className="mx-auto max-w-4xl">
        <header className="mb-4 flex items-center justify-between rounded-xl bg-white p-4 shadow dark:bg-zinc-900">
          <div>
            <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">✏️ Mode Latihan</h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Soal {current + 1} dari {questions.length}
            </p>
          </div>
          <a
            href="/"
            className="rounded-md border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            ← Keluar
          </a>
        </header>

        <main className="space-y-4">
          {/* Soal */}
          <section className="rounded-xl bg-white p-6 shadow dark:bg-zinc-900">
            <div className="mb-4 text-base text-zinc-900 dark:text-zinc-100">{q.soal}</div>

            {/* Pilihan */}
            <div className="space-y-2">
              {Object.entries(q.pilihan).map(([key, value]) => {
                let bgClass = "border-zinc-300 dark:border-zinc-700";
                let textClass = "text-zinc-900 dark:text-zinc-100";
                
                if (showResult) {
                  if (key === q.jawaban_benar) {
                    bgClass = "border-green-500 bg-green-50 dark:bg-green-950 dark:border-green-600";
                    textClass = "text-green-900 dark:text-green-100";
                  } else if (key === answer && answer !== q.jawaban_benar) {
                    bgClass = "border-red-500 bg-red-50 dark:bg-red-950 dark:border-red-600";
                    textClass = "text-red-900 dark:text-red-100";
                  }
                }

                return (
                  <button
                    key={key}
                    onClick={() => !showResult && handleAnswer(key)}
                    disabled={showResult}
                    className={`flex w-full items-start gap-3 rounded-md border p-4 text-left transition-colors ${bgClass} ${textClass} ${
                      !showResult ? "hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer" : "cursor-default"
                    }`}
                  >
                    <span className="font-semibold">{key}.</span>
                    <span className="flex-1 text-sm">{value}</span>
                    {showResult && key === q.jawaban_benar && (
                      <span className="text-green-600 dark:text-green-400">✓</span>
                    )}
                    {showResult && key === answer && answer !== q.jawaban_benar && (
                      <span className="text-red-600 dark:text-red-400">✗</span>
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Hasil & Penjelasan */}
          {showResult && (
            <section className={`rounded-xl p-6 shadow ${isCorrect ? "bg-green-50 dark:bg-green-950" : "bg-red-50 dark:bg-red-950"}`}>
              <div className="mb-3 flex items-center gap-2">
                {isCorrect ? (
                  <>
                    <span className="text-2xl">✓</span>
                    <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">Jawaban Benar!</h3>
                  </>
                ) : (
                  <>
                    <span className="text-2xl">✗</span>
                    <h3 className="text-lg font-semibold text-red-900 dark:text-red-100">
                      Jawaban Salah. Jawaban yang benar: {q.jawaban_benar}
                    </h3>
                  </>
                )}
              </div>
              <div className={`text-sm ${isCorrect ? "text-green-800 dark:text-green-200" : "text-red-800 dark:text-red-200"}`}>
                <strong>Penjelasan:</strong>
                <p className="mt-2">{q.penjelasan}</p>
              </div>
            </section>
          )}

          {/* End of Latihan */}
          {finished && (
            <section className="rounded-xl bg-white p-6 shadow dark:bg-zinc-900">
              <h2 className="mb-4 text-xl font-bold text-zinc-900 dark:text-zinc-100">Hasil Latihan</h2>
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
                  className="rounded-md border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-700"
                >
                  Kembali ke Halaman Utama
                </a>
              </div>
            </section>
          )}

          {/* Navigasi */}
          <div className="flex items-center justify-between rounded-xl bg-white p-4 shadow dark:bg-zinc-900">
            <button
              onClick={prevQuestion}
              disabled={current === 0}
              className="rounded-md border border-zinc-300 px-4 py-2 text-sm text-zinc-800 hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
            >
              ← Sebelumnya
            </button>

            {showResult && (
              <button
                onClick={current === questions.length - 1 ? finishLatihan : nextQuestion}
                className="rounded-md bg-blue-600 px-6 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50 dark:bg-blue-700 dark:hover:bg-blue-600"
              >
                {current === questions.length - 1 ? "Selesai" : "Lanjut →"}
              </button>
            )}

            {!showResult && (
              <button
                onClick={nextQuestion}
                disabled={current === questions.length - 1}
                className="rounded-md border border-zinc-300 px-4 py-2 text-sm text-zinc-800 hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
              >
                Lewati →
              </button>
            )}
          </div>

          {/* Question Navigation Grid */}
          <div className="rounded-xl bg-white p-6 shadow dark:bg-zinc-900">
            <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Navigasi Soal</h3>
            <div className="grid grid-cols-10 gap-2 mb-6">
              {questions.map((_, index) => {
                const isAnswered = userAnswers[index] !== undefined;
                const isCurrentQ = index === current;
                let bgColor = "bg-zinc-200 dark:bg-zinc-700";
                let textColor = "text-zinc-900 dark:text-zinc-100";
                let borderColor = "";

                if (isAnswered) {
                  const isCorrectAnswer = userAnswers[index] === questions[index].jawaban_benar;
                  if (isCorrectAnswer) {
                    bgColor = "bg-green-500 dark:bg-green-600";
                    textColor = "text-white";
                  } else {
                    bgColor = "bg-red-500 dark:bg-red-600";
                    textColor = "text-white";
                  }
                }

                if (isCurrentQ) {
                  borderColor = "ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-zinc-900";
                }

                return (
                  <button
                    key={index}
                    onClick={() => goToQuestion(index)}
                    className={`h-10 w-10 rounded-md text-sm font-semibold transition-all hover:scale-110 ${bgColor} ${textColor} ${borderColor}`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>

            {/* Statistics */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800">
                  <div className="text-xs text-zinc-600 dark:text-zinc-400">Terjawab</div>
                  <div className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{totalAnswered}/{questions.length}</div>
                </div>
                <div className="rounded-lg bg-green-50 p-3 dark:bg-green-950">
                  <div className="text-xs text-green-700 dark:text-green-400">Benar</div>
                  <div className="text-xl font-bold text-green-900 dark:text-green-100">{correctCount}</div>
                </div>
                <div className="rounded-lg bg-red-50 p-3 dark:bg-red-950">
                  <div className="text-xs text-red-700 dark:text-red-400">Salah</div>
                  <div className="text-xl font-bold text-red-900 dark:text-red-100">{incorrectCount}</div>
                </div>
                <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-950">
                  <div className="text-xs text-blue-700 dark:text-blue-400">Nilai</div>
                  <div className="text-xl font-bold text-blue-900 dark:text-blue-100">{percentage}%</div>
                </div>
              </div>
              
              {/* Status Kelulusan */}
              {totalAnswered === questions.length && (
                <div className={`rounded-lg p-3 text-center ${isPassing ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
                  <div className={`text-sm font-semibold ${isPassing ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}`}>
                    {isPassing ? '✓ LULUS' : '✗ TIDAK LULUS'} • Passing Grade: 80%
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
