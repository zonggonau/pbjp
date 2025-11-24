'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useSearch } from '@/hooks/use-search'
import { formatDuration } from '@/lib/utils'

type Attempt = {
  id: string
  name: string
  date: string
  score: number
  total: number
  pass: boolean
  durationSeconds: number
}

export default function HistoryPage() {
  const [items, setItems] = useState<Attempt[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('pbjp_history')
      const arr: Attempt[] = raw ? JSON.parse(raw) : []
      setItems(arr)
    } catch {}
  }, [])

  const { query, setQuery, filteredItems, isSearching } = useSearch(
    items,
    ['name', 'date'],
    { threshold: 0.3, caseSensitive: false }
  )

  // Calculate statistics
  const totalAttempts = items.length
  const passedAttempts = items.filter(it => it.pass).length
  const avgScore = items.length > 0 
    ? Math.round(items.reduce((sum, it) => sum + (it.score / it.total * 100), 0) / items.length)
    : 0
  const bestScore = items.length > 0
    ? Math.max(...items.map(it => it.score / it.total * 100))
    : 0
  const passRate = totalAttempts > 0 ? Math.round((passedAttempts / totalAttempts) * 100) : 0

  return (
    <div className="min-h-screen bg-zinc-50 p-4 font-sans dark:bg-black">
      <div className="mx-auto max-w-5xl">
        <header className="mb-6 flex items-center justify-between rounded-xl bg-white p-6 shadow dark:bg-zinc-900">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">📊 Riwayat & Statistik</h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Analisis performa tryout Anda</p>
          </div>
          <a href="/" className="rounded-md border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-700">
            ← Kembali
          </a>
        </header>

        {/* Statistics Cards */}
        {items.length > 0 && (
          <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 p-6 shadow dark:from-blue-950 dark:to-blue-900">
              <div className="mb-2 text-sm font-medium text-blue-700 dark:text-blue-300">Total Percobaan</div>
              <div className="text-4xl font-bold text-blue-900 dark:text-blue-100">{totalAttempts}</div>
              <div className="mt-1 text-xs text-blue-600 dark:text-blue-400">Tryout dilakukan</div>
            </div>
            
            <div className="rounded-xl bg-gradient-to-br from-green-50 to-green-100 p-6 shadow dark:from-green-950 dark:to-green-900">
              <div className="mb-2 text-sm font-medium text-green-700 dark:text-green-300">Tingkat Kelulusan</div>
              <div className="text-4xl font-bold text-green-900 dark:text-green-100">{passRate}%</div>
              <div className="mt-1 text-xs text-green-600 dark:text-green-400">{passedAttempts} dari {totalAttempts} lulus</div>
            </div>
            
            <div className="rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 p-6 shadow dark:from-purple-950 dark:to-purple-900">
              <div className="mb-2 text-sm font-medium text-purple-700 dark:text-purple-300">Rata-rata Skor</div>
              <div className="text-4xl font-bold text-purple-900 dark:text-purple-100">{avgScore}%</div>
              <div className="mt-1 text-xs text-purple-600 dark:text-purple-400">Performa keseluruhan</div>
            </div>
            
            <div className="rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 p-6 shadow dark:from-amber-950 dark:to-amber-900">
              <div className="mb-2 text-sm font-medium text-amber-700 dark:text-amber-300">Skor Terbaik</div>
              <div className="text-4xl font-bold text-amber-900 dark:text-amber-100">{Math.round(bestScore)}%</div>
              <div className="mt-1 text-xs text-amber-600 dark:text-amber-400">Pencapaian tertinggi</div>
            </div>
          </div>
        )}

        {/* Progress Chart */}
        {items.length > 0 && (
          <div className="mb-6 rounded-xl bg-white p-6 shadow dark:bg-zinc-900">
            <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">📈 Grafik Progress</h2>
            <div className="space-y-2">
              {items.slice(0, 10).reverse().map((it, idx) => {
                const percentage = Math.round((it.score / it.total) * 100)
                return (
                  <div key={it.id} className="flex items-center gap-3">
                    <div className="w-32 text-xs text-zinc-600 dark:text-zinc-400">
                      {new Date(it.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })}
                    </div>
                    <div className="flex-1">
                      <div className="h-8 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
                        <div
                          className={`flex h-full items-center justify-end px-3 text-xs font-semibold text-white transition-all ${
                            percentage >= 65 ? 'bg-green-600' : 'bg-red-600'
                          }`}
                          style={{ width: `${percentage}%` }}
                        >
                          {percentage >= 20 && `${percentage}%`}
                        </div>
                      </div>
                    </div>
                    <div className="w-20 text-right text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      {it.score}/{it.total}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Search Bar */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">🔍 Pencarian Riwayat</CardTitle>
            <CardDescription>
              Cari berdasarkan nama atau tanggal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Cari riwayat tryout..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full"
            />
          </CardContent>
        </Card>

        {/* Table */}
        <main className="rounded-xl bg-white p-6 shadow dark:bg-zinc-900">
          <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            📋 Detail Riwayat {isSearching && `(Ditemukan: ${filteredItems.length})`}
          </h2>
        {filteredItems.length === 0 ? (
          <div className="text-zinc-700 dark:text-zinc-300">
            {isSearching ? 'Tidak ada hasil yang ditemukan.' : 'Belum ada riwayat.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-200 text-zinc-700 dark:border-zinc-800 dark:text-zinc-300">
                  <th className="py-2">Tanggal</th>
                  <th className="py-2">Nama</th>
                  <th className="py-2">Skor</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Durasi</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((it) => (
                  <tr key={it.id} className="border-b border-zinc-100 dark:border-zinc-800">
                    <td className="py-2 text-zinc-800 dark:text-zinc-100">{new Date(it.date).toLocaleString()}</td>
                    <td className="py-2 text-zinc-800 dark:text-zinc-100">{it.name}</td>
                    <td className="py-2 text-zinc-800 dark:text-zinc-100">{it.score} / {it.total}</td>
                    <td className={`py-2 ${it.pass ? 'text-green-600' : 'text-red-600'}`}>{it.pass ? 'Lulus' : 'Tidak Lulus'}</td>
                    <td className="py-2 text-zinc-800 dark:text-zinc-100">{formatDuration(it.durationSeconds)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        </main>
      </div>
    </div>
  )
}
