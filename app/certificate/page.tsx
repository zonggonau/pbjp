"use client";
import { useEffect, useState, useRef } from "react";

type Attempt = {
  id: string;
  name: string;
  date: string;
  score: number;
  total: number;
  pass: boolean;
  durationSeconds: number;
};

export default function CertificatePage() {
  const [res, setRes] = useState<Attempt | null>(null);
  const certificateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("pbjp_last_result");
      if (raw) {
        const result = JSON.parse(raw);
        if (result.pass) {
          setRes(result);
        }
      }
    } catch {}
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async () => {
    // Untuk download, kita akan menggunakan window.print dengan media query
    window.print();
  };

  if (!res) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50">
        <div className="rounded-md bg-white p-6 text-zinc-800 shadow">
          <p className="mb-4">
            Sertifikat hanya tersedia untuk peserta yang <strong>lulus</strong> tryout dengan skor minimal <strong>65 soal benar dari 100 soal</strong>.
          </p>
          <a href="/" className="text-blue-600 underline">
            Kembali ke Beranda
          </a>
        </div>
      </div>
    );
  }

  const percentage = Math.round((res.score / res.total) * 100);
  const dateObj = new Date(res.date);
  const formattedDate = dateObj.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <style jsx global>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
          }
          .no-print {
            display: none !important;
          }
          .certificate-container {
            width: 100vw;
            height: 100vh;
            page-break-after: always;
          }
        }
      `}</style>

      <div className="min-h-screen bg-zinc-50 p-4 font-sans">
        <div className="mx-auto max-w-5xl">
          {/* Action Buttons */}
          <div className="no-print mb-6 flex items-center justify-between rounded-xl bg-white p-4 shadow">
            <a
              href="/result"
              className="rounded-md border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50:bg-zinc-700"
            >
              ← Kembali
            </a>
            <div className="flex gap-2">
              <button
                onClick={handlePrint}
                className="rounded-md bg-blue-600 px-6 py-2 text-sm text-white hover:bg-blue-700"
              >
                🖨️ Print / Download PDF
              </button>
            </div>
          </div>

          {/* Certificate */}
          <div
            ref={certificateRef}
            className="certificate-container relative aspect-[1.414/1] overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 via-white to-purple-50 p-12 shadow-2xl"
          >
            {/* Decorative Border */}
            <div className="absolute inset-4 rounded-lg border-4 border-double border-blue-600"></div>
            <div className="absolute inset-6 rounded-lg border border-blue-300"></div>

            {/* Watermark Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="grid h-full w-full grid-cols-8 grid-rows-8 gap-4 p-12">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-center text-4xl">
                    🏆
                  </div>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
              {/* Header */}
              <div className="mb-8">
                <div className="mb-2 text-6xl">🎓</div>
                <h1 className="mb-2 text-5xl font-bold text-blue-900">
                  SERTIFIKAT
                </h1>
                <p className="text-xl font-medium text-zinc-700">
                  Tryout PBJP Level 1
                </p>
              </div>

              {/* Divider */}
              <div className="mb-8 h-1 w-64 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>

              {/* Body */}
              <div className="mb-8 max-w-2xl">
                <p className="mb-4 text-lg text-zinc-700">
                  Diberikan kepada:
                </p>
                <h2 className="mb-6 text-4xl font-bold text-zinc-900">
                  {res.name}
                </h2>
                <p className="mb-4 text-base leading-relaxed text-zinc-700">
                  Telah menyelesaikan tryout <strong>Pengadaan Barang/Jasa Pemerintah Level 1</strong> dengan hasil:
                </p>
                <div className="mb-4 flex items-center justify-center gap-8">
                  <div className="rounded-lg bg-white p-4 shadow">
                    <div className="text-sm text-zinc-600">Skor</div>
                    <div className="text-3xl font-bold text-blue-600">
                      {res.score}/{res.total}
                    </div>
                  </div>
                  <div className="rounded-lg bg-white p-4 shadow">
                    <div className="text-sm text-zinc-600">Persentase</div>
                    <div className="text-3xl font-bold text-green-600">
                      {percentage}%
                    </div>
                  </div>
                </div>
                <p className="text-base text-zinc-700">
                  dengan predikat <strong className="text-green-600">LULUS</strong>
                </p>
              </div>

              {/* Footer */}
              <div className="mb-4 h-1 w-64 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
              <div className="text-sm text-zinc-600">
                {formattedDate}
              </div>
              <div className="mt-2 text-xs text-zinc-500">
                ID: {res.id}
              </div>

              {/* Signature */}
              <div className="mt-8 grid w-full grid-cols-2 gap-12 px-12">
                <div className="text-center">
                  <div className="mb-16 h-px bg-zinc-300"></div>
                  <div className="text-sm font-medium text-zinc-700">
                    Penyelenggara
                  </div>
                </div>
                <div className="text-center">
                  <div className="mb-16 h-px bg-zinc-300"></div>
                  <div className="text-sm font-medium text-zinc-700">
                    Peserta
                  </div>
                </div>
              </div>
            </div>

            {/* Corner Decorations */}
            <div className="absolute left-8 top-8 h-16 w-16 border-l-4 border-t-4 border-blue-600"></div>
            <div className="absolute right-8 top-8 h-16 w-16 border-r-4 border-t-4 border-blue-600"></div>
            <div className="absolute bottom-8 left-8 h-16 w-16 border-b-4 border-l-4 border-blue-600"></div>
            <div className="absolute bottom-8 right-8 h-16 w-16 border-b-4 border-r-4 border-blue-600"></div>
          </div>

          {/* Instructions */}
          <div className="no-print mt-6 rounded-xl bg-blue-50 p-4 text-sm text-blue-900">
            <p className="mb-2 font-semibold">💡 Tips:</p>
            <ul className="list-inside list-disc space-y-1">
              <li>Klik tombol "Print / Download PDF" untuk menyimpan sertifikat</li>
              <li>Pilih "Save as PDF" di dialog print untuk menyimpan sebagai file PDF</li>
              <li>Untuk hasil terbaik, gunakan orientasi landscape</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
