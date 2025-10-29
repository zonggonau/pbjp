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
  };

  const nextQuestion = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setAnswer(null);
      setShowResult(false);
    }
  };

  const prevQuestion = () => {
    if (current > 0) {
      setCurrent(current - 1);
      setAnswer(null);
      setShowResult(false);
    }
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
                onClick={nextQuestion}
                disabled={current === questions.length - 1}
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

          {/* Progress Bar */}
          <div className="rounded-xl bg-white p-4 shadow dark:bg-zinc-900">
            <div className="mb-2 flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-400">
              <span>Progress Latihan</span>
              <span>{Math.round(((current + 1) / questions.length) * 100)}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
              <div
                className="h-full bg-blue-600 transition-all duration-300 dark:bg-blue-500"
                style={{ width: `${((current + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
