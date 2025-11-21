"use client";
import { useEffect, useState } from "react";
import { normalizeQuestion, NormalizedQuestion } from "../../lib/utils";

export default function ReviewPage() {
  const [questions, setQuestions] = useState<NormalizedQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "correct" | "wrong" | "unanswered">("all");

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load questions
        const res = await fetch("/api/questions");
        const rawQuestions = await res.json();
        const allQuestions = (rawQuestions || []).map((q: any) => normalizeQuestion(q));
        
        // Load answers from sessionStorage
        const savedAnswers = sessionStorage.getItem("pbjp_quiz_answers");
        if (savedAnswers) {
          setAnswers(JSON.parse(savedAnswers));
        }
        
        // Get the questions that were in the quiz
        const savedQuestions = sessionStorage.getItem("pbjp_quiz_questions");
        if (savedQuestions) {
          const questionIds = JSON.parse(savedQuestions);
          const quizQuestions = allQuestions.filter((q: any) =>
            questionIds.includes(q.id)
          );
          setQuestions(quizQuestions);
        } else {
          setQuestions(allQuestions);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Failed to load data:", error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
        <div className="rounded-md bg-white p-6 text-zinc-800 shadow dark:bg-zinc-900 dark:text-zinc-100">
          Memuat review...
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
        <div className="rounded-md bg-white p-6 text-zinc-800 shadow dark:bg-zinc-900 dark:text-zinc-100">
          <p>Data review tidak ditemukan.</p>
          <a href="/" className="mt-4 inline-block text-blue-600 underline">
            Kembali ke Beranda
          </a>
        </div>
      </div>
    );
  }

  const filteredQuestions = questions.filter((q, idx) => {
    const userAnswer = answers[idx];
    if (filter === "correct") return userAnswer === q.answer;
    if (filter === "wrong") return userAnswer && userAnswer !== q.answer;
    if (filter === "unanswered") return !userAnswer;
    return true;
  });

  const correctCount = questions.filter((q, idx) => answers[idx] === q.answer).length;
  const wrongCount = questions.filter((q, idx) => answers[idx] && answers[idx] !== q.answer).length;
  const unansweredCount = questions.filter((_, idx) => !answers[idx]).length;

  return (
    <div className="min-h-screen bg-zinc-50 p-4 font-sans dark:bg-black">
      <div className="mx-auto max-w-4xl">
        <header className="mb-6 flex items-center justify-between rounded-xl bg-white p-6 shadow dark:bg-zinc-900">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              📝 Review Jawaban
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Lihat semua jawaban dan penjelasannya
            </p>
          </div>
          <a
            href="/"
            className="rounded-md border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            ← Kembali
          </a>
        </header>

        {/* Statistics Summary */}
        <div className="mb-6 grid gap-4 sm:grid-cols-4">
          <div className="rounded-lg bg-white p-4 shadow dark:bg-zinc-900">
            <div className="text-sm text-zinc-600 dark:text-zinc-400">Total Soal</div>
            <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {questions.length}
            </div>
          </div>
          <div className="rounded-lg bg-green-50 p-4 shadow dark:bg-green-950">
            <div className="text-sm text-green-700 dark:text-green-300">Benar</div>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">
              {correctCount}
            </div>
          </div>
          <div className="rounded-lg bg-red-50 p-4 shadow dark:bg-red-950">
            <div className="text-sm text-red-700 dark:text-red-300">Salah</div>
            <div className="text-2xl font-bold text-red-900 dark:text-red-100">
              {wrongCount}
            </div>
          </div>
          <div className="rounded-lg bg-amber-50 p-4 shadow dark:bg-amber-950">
            <div className="text-sm text-amber-700 dark:text-amber-300">Tidak Dijawab</div>
            <div className="text-2xl font-bold text-amber-900 dark:text-amber-100">
              {unansweredCount}
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="mb-6 flex gap-2 rounded-xl bg-white p-4 shadow dark:bg-zinc-900">
          <button
            onClick={() => setFilter("all")}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              filter === "all"
                ? "bg-blue-600 text-white"
                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            }`}
          >
            Semua ({questions.length})
          </button>
          <button
            onClick={() => setFilter("correct")}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              filter === "correct"
                ? "bg-green-600 text-white"
                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            }`}
          >
            ✓ Benar ({correctCount})
          </button>
          <button
            onClick={() => setFilter("wrong")}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              filter === "wrong"
                ? "bg-red-600 text-white"
                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            }`}
          >
            ✗ Salah ({wrongCount})
          </button>
          <button
            onClick={() => setFilter("unanswered")}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              filter === "unanswered"
                ? "bg-amber-600 text-white"
                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            }`}
          >
            ⊘ Tidak Dijawab ({unansweredCount})
          </button>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {filteredQuestions.map((q, originalIdx) => {
            const idx = questions.indexOf(q);
            const userAnswer = answers[idx];
            const isCorrect = userAnswer === q.answer;
            const isAnswered = !!userAnswer;

            return (
              <div
                key={q.id}
                className={`rounded-xl p-6 shadow ${
                  !isAnswered
                    ? "bg-amber-50 dark:bg-amber-950"
                    : isCorrect
                    ? "bg-green-50 dark:bg-green-950"
                    : "bg-red-50 dark:bg-red-950"
                }`}
              >
                {/* Question Header */}
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex gap-3">
                    <div
                      className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${
                        !isAnswered
                          ? "bg-amber-600"
                          : isCorrect
                          ? "bg-green-600"
                          : "bg-red-600"
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-base text-zinc-900 dark:text-zinc-100">
                        {q.question}
                      </p>
                    </div>
                  </div>
                  <div className="ml-2">
                    {!isAnswered ? (
                      <span className="text-2xl">⊘</span>
                    ) : isCorrect ? (
                      <span className="text-2xl text-green-600">✓</span>
                    ) : (
                      <span className="text-2xl text-red-600">✗</span>
                    )}
                  </div>
                </div>

                {/* Options */}
                <div className="mb-4 space-y-2">
                  {Object.entries(q.options || {}).map(([key, value]) => {
                    const isUserChoice = userAnswer === key;
                    const isCorrectAnswer = q.answer === key;

                    let bgClass = "bg-white dark:bg-zinc-900";
                    let borderClass = "border-zinc-300 dark:border-zinc-700";
                    let textClass = "text-zinc-900 dark:text-zinc-100";

                    if (isCorrectAnswer) {
                      bgClass = "bg-green-100 dark:bg-green-900";
                      borderClass = "border-green-500 dark:border-green-600";
                      textClass = "text-green-900 dark:text-green-100";
                    } else if (isUserChoice && !isCorrect) {
                      bgClass = "bg-red-100 dark:bg-red-900";
                      borderClass = "border-red-500 dark:border-red-600";
                      textClass = "text-red-900 dark:text-red-100";
                    }

                    return (
                      <div
                        key={key}
                        className={`flex items-start gap-3 rounded-md border p-3 ${bgClass} ${borderClass} ${textClass}`}
                      >
                        <span className="font-semibold">{key}.</span>
                        <span className="flex-1 text-sm">{value}</span>
                        {isCorrectAnswer && (
                          <span className="text-green-600 dark:text-green-400">
                            ✓ Jawaban Benar
                          </span>
                        )}
                        {isUserChoice && !isCorrect && (
                          <span className="text-red-600 dark:text-red-400">
                            Pilihan Anda
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                <div
                  className={`rounded-md p-4 ${
                    !isAnswered
                      ? "bg-amber-100 dark:bg-amber-900"
                      : isCorrect
                      ? "bg-green-100 dark:bg-green-900"
                      : "bg-red-100 dark:bg-red-900"
                  }`}
                >
                  <p
                    className={`mb-1 text-sm font-semibold ${
                      !isAnswered
                        ? "text-amber-900 dark:text-amber-100"
                        : isCorrect
                        ? "text-green-900 dark:text-green-100"
                        : "text-red-900 dark:text-red-100"
                    }`}
                  >
                    💡 Penjelasan:
                  </p>
                    <p
                    className={`text-sm ${
                      !isAnswered
                        ? "text-amber-800 dark:text-amber-200"
                        : isCorrect
                        ? "text-green-800 dark:text-green-200"
                        : "text-red-800 dark:text-red-200"
                    }`}
                  >
                    {q.explanation?.correct}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {filteredQuestions.length === 0 && (
          <div className="rounded-xl bg-white p-8 text-center shadow dark:bg-zinc-900">
            <p className="text-zinc-600 dark:text-zinc-400">
              Tidak ada soal dengan filter ini
            </p>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="mt-6 flex justify-center gap-3 rounded-xl bg-white p-4 shadow dark:bg-zinc-900">
          <a
            href="/"
            className="rounded-md border border-zinc-300 px-6 py-2 text-sm text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            🏠 Beranda
          </a>
          <a
            href="/history"
            className="rounded-md bg-blue-600 px-6 py-2 text-sm text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
          >
            📊 Riwayat
          </a>
        </div>
      </div>
    </div>
  );
}
