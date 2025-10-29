"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [nama, setNama] = useState("");

  useEffect(() => {
    const savedName = localStorage.getItem("pbjp_nama") || "";
    setNama(savedName);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-xl font-bold text-white sm:h-12 sm:w-12">
                🏛️
              </div>
              <div>
                <h1 className="text-sm font-bold text-zinc-900 sm:text-base">
                  Portal Pembelajaran PBJP
                </h1>
                <p className="text-xs text-zinc-600">Kabupaten Intan Jaya</p>
              </div>
            </div>
            <a
              href="/history"
              className="rounded-lg border border-zinc-300 px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-50 sm:text-sm"
            >
              📊 Riwayat
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-12 lg:px-8">
        {/* Hero Section */}
        <div className="mb-8 text-center sm:mb-12">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-xs font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300 sm:text-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
            </span>
            Platform Pembelajaran ASN Kab. Intan Jaya
          </div>
          <h2 className="mb-3 text-2xl font-bold text-zinc-900 dark:text-zinc-100 sm:mb-4 sm:text-4xl md:text-5xl">
            Pengadaan Barang/Jasa Pemerintah
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Level 1 (PPK)
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-zinc-600 dark:text-zinc-400 sm:text-base">
            Platform pembelajaran komprehensif untuk ASN Kabupaten Intan Jaya yang ingin menguasai
            pengadaan barang dan jasa pemerintah sesuai Perpres 16/2018
          </p>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid gap-4 sm:mb-12 sm:grid-cols-3">
          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
            <div className="mb-2 text-2xl">📚</div>
            <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-3xl">26</div>
            <div className="text-xs text-zinc-600 dark:text-zinc-400 sm:text-sm">Topik Materi Lengkap</div>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
            <div className="mb-2 text-2xl">📝</div>
            <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-3xl">165</div>
            <div className="text-xs text-zinc-600 dark:text-zinc-400 sm:text-sm">Bank Soal Tersedia</div>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
            <div className="mb-2 text-2xl">🎯</div>
            <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-3xl">100</div>
            <div className="text-xs text-zinc-600 dark:text-zinc-400 sm:text-sm">Soal Per Tryout</div>
          </div>
        </div>

        {/* Main Action Cards */}
        <div className="mb-8 grid gap-6 sm:mb-12 lg:grid-cols-2">
          {/* Pembelajaran Card */}
          <div className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-6 shadow-lg transition-all hover:shadow-xl dark:border-zinc-800 dark:from-blue-950 dark:to-cyan-950 sm:p-8">
            <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-blue-200 opacity-20 dark:bg-blue-800"></div>
            <div className="relative">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl shadow-lg sm:h-16 sm:w-16 sm:text-3xl">
                📚
              </div>
              <h3 className="mb-2 text-xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-2xl">
                Materi Pembelajaran
              </h3>
              <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400 sm:text-base">
                Pelajari 26 topik komprehensif dari dasar hukum, prinsip, hingga praktek pengadaan.
                Dilengkapi dengan penjelasan detail dan contoh kasus.
              </p>
              <div className="mb-6 space-y-2 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                  <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Perpres 16/2018 & peraturan terbaru</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                  <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Penjelasan mudah dipahami untuk PPK</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                  <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Contoh kasus nyata pengadaan</span>
                </div>
              </div>
              <a
                href="/materi"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg sm:text-base"
              >
                Mulai Belajar
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>

          {/* Latihan/Tryout Card */}
          <div className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-br from-purple-50 to-pink-50 p-6 shadow-lg transition-all hover:shadow-xl dark:border-zinc-800 dark:from-purple-950 dark:to-pink-950 sm:p-8">
            <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-purple-200 opacity-20 dark:bg-purple-800"></div>
            <div className="relative">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 text-2xl shadow-lg sm:h-16 sm:w-16 sm:text-3xl">
                ✏️
              </div>
              <h3 className="mb-2 text-xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-2xl">
                Latihan & Tryout
              </h3>
              <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400 sm:text-base">
                Uji kemampuan Anda dengan bank soal 165 pertanyaan. Setiap tryout berisi 100 soal acak
                dengan durasi 2 jam.
              </p>
              <div className="mb-6 space-y-2 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                  <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>100 soal random dari 165 bank soal</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                  <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Durasi 2 jam, passing grade 65%</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                  <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Review jawaban & sertifikat digital</span>
                </div>
              </div>

              {/* Form input nama */}
              <form
                className="space-y-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const nameInput = form.elements.namedItem("nama") as HTMLInputElement;
                  const namaValue = nameInput?.value?.trim();
                  if (!namaValue) return;
                  try {
                    localStorage.setItem("pbjp_nama", namaValue);
                  } catch {}
                  window.location.href = "/quiz";
                }}
              >
                <input
                  type="text"
                  name="nama"
                  placeholder="Masukkan nama Anda"
                  required
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-purple-600 dark:focus:ring-purple-900"
                />
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:from-purple-700 hover:to-pink-700 hover:shadow-lg sm:text-base"
                >
                  Mulai Tryout
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 p-6 dark:border-blue-900 dark:from-blue-950 dark:to-cyan-950 sm:p-8">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-blue-600 text-2xl sm:h-16 sm:w-16">
              💡
            </div>
            <div className="flex-1">
              <h4 className="mb-2 text-lg font-bold text-zinc-900 dark:text-zinc-100 sm:text-xl">
                Tips Mengerjakan Tryout
              </h4>
              <ul className="space-y-1 text-xs text-zinc-700 dark:text-zinc-300 sm:text-sm">
                <li>• Pelajari materi terlebih dahulu sebelum mengerjakan tryout</li>
                <li>• Perhatikan nilai kontrak, jenis pekerjaan, dan tahapan pengadaan dalam soal</li>
                <li>• Gunakan mode latihan untuk membiasakan diri dengan format soal</li>
                <li>• Review pembahasan setelah selesai untuk memahami kesalahan</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/80">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="text-center text-xs text-zinc-600 dark:text-zinc-400 sm:text-left sm:text-sm">
              © 2024 Portal Pembelajaran PBJP - Kabupaten Intan Jaya
              <br className="sm:hidden" />
              <span className="hidden sm:inline"> • </span>
              Untuk ASN Kab. Intan Jaya, Provinsi Papua Tengah
            </div>
            <div className="flex gap-4 text-xs sm:text-sm">
              <a href="/materi" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
                Materi
              </a>
              <a href="/latihan" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
                Latihan
              </a>
              <a href="/history" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
                Riwayat
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

