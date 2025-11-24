'use client'

import { useEffect, useState } from 'react'

type Attempt = {
  id: string
  name: string
  date: string
  score: number
  total: number
  pass: boolean
  durationSeconds: number
}

function formatDuration(s: number) {
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  const pad = (n: number) => n.toString().padStart(2, '0')
  return `${pad(h)}:${pad(m)}:${pad(sec)}`
}

export default function ResultPage() {
  const [res, setRes] = useState<Attempt | null>(null)

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('pbjp_last_result')
      if (raw) setRes(JSON.parse(raw))
    } catch {}
  }, [])

  if (!res) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50">
        <div className="rounded-md bg-white p-6 text-zinc-800 shadow">
          Hasil tidak ditemukan. Mulai dari beranda.
          <div className="mt-4">
            <a href="/" className="text-blue-600 underline">Kembali ke Beranda</a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen justify-center bg-zinc-50 p-4 font-sans">
      <main className="flex w-full max-w-xl flex-col gap-4 rounded-xl bg-white p-6 shadow">
        <h1 className="text-xl font-semibold text-zinc-900">Hasil Ujian</h1>
        <div className="rounded-md border border-zinc-300 p-4">
          <div className="text-sm text-zinc-700">Nama</div>
          <div className="text-lg font-medium text-zinc-900">{res.name}</div>
          <div className="mt-3 text-sm text-zinc-700">Skor</div>
          <div className="text-lg font-medium text-zinc-900">{res.score} / {res.total}</div>
          <div className="mt-3 text-sm text-zinc-700">Status</div>
          <div className={`text-lg font-semibold ${res.pass ? 'text-green-600' : 'text-red-600'}`}>{res.pass ? 'Lulus' : 'Tidak Lulus'}</div>
          <div className="mt-3 text-sm text-zinc-700">Durasi</div>
          <div className="text-lg font-medium text-zinc-900">{formatDuration(res.durationSeconds)}</div>
        </div>
        {res.pass && (
          <a 
            href="/certificate"
            className="w-full rounded-md bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-3 text-center font-semibold text-white hover:from-green-700 hover:to-emerald-700"
          >
            🎓 Download Sertifikat
          </a>
        )}
        <a 
          href="/review"
          className="w-full rounded-md bg-blue-600 px-4 py-3 text-center text-white hover:bg-blue-700:bg-blue-600"
        >
          📝 Review Semua Jawaban
        </a>
        <div className="mt-2 flex gap-2">
          <a href="/" className="flex-1 rounded-md border border-zinc-300 px-4 py-2 text-center text-zinc-800 hover:bg-zinc-100:bg-zinc-800">
            🏠 Beranda
          </a>
          <a href="/history" className="flex-1 rounded-md bg-zinc-900 px-4 py-2 text-center text-white hover:bg-zinc-800:bg-zinc-200">
            📊 Riwayat
          </a>
        </div>
      </main>
    </div>
  )
}
