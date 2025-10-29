"use client";

export default function MateriPage() {
  return (
    <div className="min-h-screen bg-zinc-50 p-3 sm:p-4 md:p-6 font-sans dark:bg-black">
      <div className="mx-auto max-w-4xl">
        <header className="mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 rounded-xl bg-white p-4 sm:p-6 shadow dark:bg-zinc-900">
          <div className="flex-1">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-100">📚 Materi PBJP Level 1 untuk PPK</h1>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">Ringkasan Komprehensif Pengadaan Barang/Jasa Pemerintah</p>
          </div>
          <a
            href="/"
            className="w-full sm:w-auto text-center rounded-md border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-700 whitespace-nowrap"
          >
            ← Kembali
          </a>
        </header>

        <div className="space-y-4 sm:space-y-6">
          {/* Dasar Hukum */}
          <section className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6 shadow dark:from-blue-950 dark:to-indigo-950">
            <h2 className="mb-3 sm:mb-4 text-lg sm:text-xl font-semibold text-blue-900 dark:text-blue-100">📜 Dasar Hukum Pengadaan Barang/Jasa Pemerintah</h2>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
              <div className="rounded-lg bg-white p-4 dark:bg-zinc-900">
                <p className="mb-3 font-semibold text-zinc-900 dark:text-zinc-100">Regulasi Utama:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span className="text-blue-600">▸</span>
                    <div>
                      <strong>Perpres No. 16 Tahun 2018</strong> tentang Pengadaan Barang/Jasa Pemerintah (sebagaimana telah diubah dengan Perpres No. 12 Tahun 2021)
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600">▸</span>
                    <div>
                      <strong>Peraturan LKPP No. 12 Tahun 2021</strong> tentang Pedoman Pelaksanaan Pengadaan Barang/Jasa Pemerintah melalui Penyedia
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600">▸</span>
                    <div>
                      <strong>Peraturan LKPP No. 3 Tahun 2021</strong> tentang Pedoman E-Purchasing
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600">▸</span>
                    <div>
                      <strong>Peraturan LKPP No. 9 Tahun 2021</strong> tentang Swakelola
                    </div>
                  </li>
                </ul>
              </div>
              <div className="rounded-lg border-l-4 border-blue-600 bg-white p-4 dark:bg-zinc-900">
                <p className="text-sm">
                  <strong className="text-zinc-900 dark:text-zinc-100">Definisi PBJ:</strong> Kegiatan untuk memperoleh Barang/Jasa oleh Kementerian/Lembaga/Perangkat Daerah yang prosesnya dimulai dari <strong>perencanaan kebutuhan</strong> sampai <strong>diselesaikannya seluruh kegiatan</strong> untuk memperoleh Barang/Jasa (Pasal 1 ayat 1 Perpres 16/2018).
                </p>
              </div>
            </div>
          </section>

          {/* Bagian 1 - Tujuan */}
          <section className="rounded-xl bg-white p-4 sm:p-6 shadow dark:bg-zinc-900">
            <h2 className="mb-3 sm:mb-4 text-lg sm:text-xl font-semibold text-zinc-900 dark:text-zinc-100">🎯 1. Tujuan Pengadaan Barang/Jasa</h2>
            <div className="space-y-3 text-zinc-700 dark:text-zinc-300">
              <p className="rounded-lg bg-amber-50 p-3 text-sm dark:bg-amber-950">
                Menghasilkan Barang/Jasa yang <strong>tepat</strong> dari setiap uang yang dibelanjakan, diukur dari aspek:
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-700">
                  <div className="mb-1 text-2xl">📊</div>
                  <strong className="text-zinc-900 dark:text-zinc-100">Kualitas & Kuantitas</strong>
                  <p className="text-xs">Sesuai spesifikasi dan volume kebutuhan</p>
                </div>
                <div className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-700">
                  <div className="mb-1 text-2xl">⏱️</div>
                  <strong className="text-zinc-900 dark:text-zinc-100">Waktu & Biaya</strong>
                  <p className="text-xs">Tepat waktu dengan anggaran efisien</p>
                </div>
                <div className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-700">
                  <div className="mb-1 text-2xl">📍</div>
                  <strong className="text-zinc-900 dark:text-zinc-100">Lokasi & Penyedia</strong>
                  <p className="text-xs">Lokasi strategis, penyedia terpercaya</p>
                </div>
              </div>
            </div>
          </section>

          {/* Bagian 2 */}
          <section className="rounded-xl bg-white p-4 sm:p-6 shadow dark:bg-zinc-900">
            <h2 className="mb-3 sm:mb-4 text-lg sm:text-xl font-semibold text-zinc-900 dark:text-zinc-100">⚖️ 2. Prinsip-Prinsip Pengadaan (Pasal 6 Perpres 16/2018)</h2>
            <div className="space-y-3 text-zinc-700 dark:text-zinc-300">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-md border border-zinc-200 p-3 dark:border-zinc-700">
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Efisien</h3>
                  <p className="text-sm">Pengadaan dilakukan dengan menggunakan dana dan daya yang minimum untuk mencapai kualitas dan sasaran dalam waktu yang ditetapkan.</p>
                </div>
                <div className="rounded-md border border-zinc-200 p-3 dark:border-zinc-700">
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Efektif</h3>
                  <p className="text-sm">Pengadaan sesuai dengan kebutuhan dan sasaran yang telah ditetapkan serta memberikan manfaat yang sebesar-besarnya.</p>
                </div>
                <div className="rounded-md border border-zinc-200 p-3 dark:border-zinc-700">
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Transparan</h3>
                  <p className="text-sm">Semua ketentuan dan informasi mengenai pengadaan bersifat jelas dan dapat diketahui secara luas oleh masyarakat dan peserta.</p>
                </div>
                <div className="rounded-md border border-zinc-200 p-3 dark:border-zinc-700">
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Terbuka</h3>
                  <p className="text-sm">Pengadaan dapat diikuti oleh semua penyedia barang/jasa yang memenuhi persyaratan.</p>
                </div>
                <div className="rounded-md border border-zinc-200 p-3 dark:border-zinc-700">
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Bersaing</h3>
                  <p className="text-sm">Dilakukan melalui persaingan yang sehat di antara sebanyak mungkin penyedia yang setara dan memenuhi persyaratan.</p>
                </div>
                <div className="rounded-md border border-zinc-200 p-3 dark:border-zinc-700">
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Adil/Tidak Diskriminatif</h3>
                  <p className="text-sm">Memberikan perlakuan yang sama bagi semua calon penyedia dan tidak mengarah untuk memberi keuntungan kepada pihak tertentu.</p>
                </div>
                <div className="rounded-md border border-zinc-200 p-3 dark:border-zinc-700">
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Akuntabel</h3>
                  <p className="text-sm">Harus sesuai dengan aturan dan ketentuan yang berkaitan dengan pengadaan sehingga dapat dipertanggungjawabkan.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Bagian 3 */}
          <section className="rounded-xl bg-white p-4 sm:p-6 shadow dark:bg-zinc-900">
            <h2 className="mb-3 sm:mb-4 text-lg sm:text-xl font-semibold text-zinc-900 dark:text-zinc-100">3. Etika Pengadaan</h2>
            <div className="space-y-3 text-zinc-700 dark:text-zinc-300">
              <p>Para pihak yang terkait dalam pengadaan harus mematuhi etika sebagai berikut:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li><strong>Melaksanakan tugas secara tertib</strong> dengan mengikuti sasaran, prinsip, dan ketentuan pengadaan</li>
                <li><strong>Bekerja secara profesional, mandiri, dan menjaga kerahasiaan</strong> informasi yang tidak boleh diketahui pihak lain</li>
                <li><strong>Tidak saling mempengaruhi</strong> baik langsung maupun tidak langsung</li>
                <li><strong>Menerima dan bertanggung jawab</strong> atas segala keputusan yang ditetapkan</li>
                <li><strong>Menghindari dan mencegah</strong> terjadinya pertentangan kepentingan (conflict of interest)</li>
                <li><strong>Tidak menerima, tidak menawarkan, atau tidak menjanjikan</strong> untuk memberi atau menerima hadiah, imbalan, komisi, rabat, dan berupa apa pun</li>
              </ul>
            </div>
          </section>

          {/* Bagian 4 */}
          <section className="rounded-xl bg-white p-4 sm:p-6 shadow dark:bg-zinc-900">
            <h2 className="mb-3 sm:mb-4 text-lg sm:text-xl font-semibold text-zinc-900 dark:text-zinc-100">4. Metode Pemilihan Penyedia</h2>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
              <div>
                <h3 className="mb-2 font-semibold text-zinc-900 dark:text-zinc-100">A. Tender (untuk Barang/Pekerjaan Konstruksi/Jasa Lainnya)</h3>
                <p className="text-sm">Metode pemilihan penyedia dengan cara menawarkan pekerjaan kepada masyarakat luas dan memberikan kesempatan kepada penyedia untuk mengajukan penawaran.</p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-zinc-900 dark:text-zinc-100">B. Seleksi (untuk Jasa Konsultansi)</h3>
                <p className="text-sm">Metode pemilihan penyedia jasa konsultansi dengan cara membandingkan kualitas tenaga ahli dan metodologi.</p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-zinc-900 dark:text-zinc-100">C. Penunjukan Langsung</h3>
                <p className="text-sm">Metode pemilihan dengan cara menunjuk langsung 1 (satu) penyedia dalam kondisi tertentu yang ditetapkan sesuai ketentuan.</p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-zinc-900 dark:text-zinc-100">D. Pengadaan Langsung</h3>
                <p className="text-sm">Pengadaan barang/jasa langsung kepada penyedia tanpa melalui tender/seleksi untuk nilai pengadaan paling banyak Rp200 juta.</p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-zinc-900 dark:text-zinc-100">E. E-Purchasing</h3>
                <p className="text-sm">Tata cara pembelian barang/jasa melalui sistem katalog elektronik (e-catalogue).</p>
              </div>
            </div>
          </section>

          {/* Bagian 5 */}
          <section className="rounded-xl bg-white p-4 sm:p-6 shadow dark:bg-zinc-900">
            <h2 className="mb-3 sm:mb-4 text-lg sm:text-xl font-semibold text-zinc-900 dark:text-zinc-100">5. Swakelola</h2>
            <div className="space-y-3 text-zinc-700 dark:text-zinc-300">
              <p><strong>Swakelola</strong> adalah cara memperoleh barang/jasa yang dikerjakan sendiri oleh K/L/PD.</p>
              <p className="font-semibold">Tipe Swakelola:</p>
              <ul className="list-disc space-y-1 pl-6">
                <li><strong>Tipe I:</strong> Direncanakan, dilaksanakan, dan diawasi sendiri oleh K/L/PD penanggung jawab anggaran</li>
                <li><strong>Tipe II:</strong> Direncanakan oleh K/L/PD penanggung jawab anggaran dan dilaksanakan/diawasi oleh K/L/PD pelaksana</li>
                <li><strong>Tipe III:</strong> Direncanakan oleh K/L/PD penanggung jawab anggaran dan dilaksanakan oleh Ormas/Kelompok Masyarakat</li>
                <li><strong>Tipe IV:</strong> Dilaksanakan oleh Ormas/Kelompok Masyarakat dengan bimbingan K/L/PD</li>
              </ul>
            </div>
          </section>

          {/* Bagian 6 */}
          <section className="rounded-xl bg-white p-4 sm:p-6 shadow dark:bg-zinc-900">
            <h2 className="mb-3 sm:mb-4 text-lg sm:text-xl font-semibold text-zinc-900 dark:text-zinc-100">6. Para Pihak dalam Pengadaan</h2>
            <div className="space-y-3 text-zinc-700 dark:text-zinc-300">
              <div className="rounded-md border border-blue-200 bg-blue-50 p-3 dark:border-blue-800 dark:bg-blue-950">
                <h3 className="font-semibold text-blue-900 dark:text-blue-200">PA/KPA (Pengguna Anggaran/Kuasa Pengguna Anggaran)</h3>
                <p className="text-sm text-blue-800 dark:text-blue-300">Pejabat pemegang kewenangan penggunaan anggaran K/L/PD.</p>
              </div>
              <div className="rounded-md border border-green-200 bg-green-50 p-3 dark:border-green-800 dark:bg-green-950">
                <h3 className="font-semibold text-green-900 dark:text-green-200">PPK (Pejabat Pembuat Komitmen)</h3>
                <p className="text-sm text-green-800 dark:text-green-300">Pejabat yang diberi kewenangan oleh PA/KPA untuk mengambil keputusan dan/atau tindakan yang dapat mengakibatkan pengeluaran anggaran.</p>
              </div>
              <div className="rounded-md border border-purple-200 bg-purple-50 p-3 dark:border-purple-800 dark:bg-purple-950">
                <h3 className="font-semibold text-purple-900 dark:text-purple-200">Pokja Pemilihan</h3>
                <p className="text-sm text-purple-800 dark:text-purple-300">Tim yang bertugas melaksanakan pemilihan penyedia melalui tender atau seleksi.</p>
              </div>
              <div className="rounded-md border border-orange-200 bg-orange-50 p-3 dark:border-orange-800 dark:bg-orange-950">
                <h3 className="font-semibold text-orange-900 dark:text-orange-200">Pejabat Pengadaan</h3>
                <p className="text-sm text-orange-800 dark:text-orange-300">Personil yang ditunjuk untuk melaksanakan pengadaan langsung, e-purchasing, atau penunjukan langsung.</p>
              </div>
            </div>
          </section>

          {/* Bagian 7 */}
          <section className="rounded-xl bg-white p-4 sm:p-6 shadow dark:bg-zinc-900">
            <h2 className="mb-3 sm:mb-4 text-lg sm:text-xl font-semibold text-zinc-900 dark:text-zinc-100">7. Jaminan dalam Pengadaan</h2>
            <div className="space-y-3 text-zinc-700 dark:text-zinc-300">
              <ul className="list-disc space-y-2 pl-6">
                <li><strong>Jaminan Penawaran:</strong> Jaminan yang diberikan oleh peserta untuk menjamin kesungguhan penawarannya</li>
                <li><strong>Jaminan Pelaksanaan:</strong> Jaminan yang diberikan oleh penyedia untuk menjamin pelaksanaan pekerjaan sesuai kontrak</li>
                <li><strong>Jaminan Uang Muka:</strong> Jaminan pengembalian uang muka dari penyedia bila tidak dapat menyelesaikan pekerjaan</li>
                <li><strong>Jaminan Pemeliharaan:</strong> Jaminan untuk pemeliharaan hasil pekerjaan selama masa pemeliharaan</li>
              </ul>
            </div>
          </section>

          {/* Bagian 8 - Tugas PPK */}
          <section className="rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 p-4 sm:p-6 shadow dark:from-green-950 dark:to-emerald-950">
            <h2 className="mb-3 sm:mb-4 text-lg sm:text-xl font-semibold text-green-900 dark:text-green-100">👔 8. Tugas dan Tanggung Jawab PPK (Pasal 13 Perpres 16/2018)</h2>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
              <div className="rounded-lg bg-white p-4 dark:bg-zinc-900">
                <p className="mb-3 font-semibold text-zinc-900 dark:text-zinc-100">Tugas Utama PPK:</p>
                <div className="space-y-2 text-sm">
                  <div className="flex gap-2">
                    <span className="text-green-600">1.</span>
                    <p><strong>Menyusun perencanaan pengadaan</strong></p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-green-600">2.</span>
                    <p><strong>Menetapkan spesifikasi teknis/KAK</strong></p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-green-600">3.</span>
                    <p><strong>Menyusun dan menetapkan HPS</strong></p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-green-600">4.</span>
                    <p><strong>Menetapkan rancangan kontrak</strong></p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-green-600">5.</span>
                    <p><strong>Melaksanakan pengadaan langsung/e-purchasing</strong> untuk barang/jasa yang tidak kompleks</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-green-600">6.</span>
                    <p><strong>Menandatangani kontrak</strong></p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-green-600">7.</span>
                    <p><strong>Melaksanakan dan mengawasi kontrak</strong></p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-green-600">8.</span>
                    <p><strong>Melaporkan pelaksanaan/penyelesaian</strong> kegiatan pengadaan kepada PA/KPA</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-green-600">9.</span>
                    <p><strong>Menyerahkan hasil pekerjaan</strong> kepada PA/KPA</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-green-600">10.</span>
                    <p><strong>Mengelola data pengadaan</strong> dan menjaga kerahasiaannya</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border-l-4 border-yellow-500 bg-yellow-50 p-4 dark:bg-yellow-950">
                <p className="text-sm font-semibold text-yellow-900 dark:text-yellow-100">⚠️ Catatan Penting:</p>
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  PPK dapat dibantu oleh <strong>Tim Pendukung/Tim Teknis</strong> dalam penyusunan spesifikasi teknis, KAK, HPS, dan perancangan kontrak.
                </p>
              </div>
            </div>
          </section>

          {/* Bagian 9 - Tahapan Pengadaan */}
          <section className="rounded-xl bg-white p-4 sm:p-6 shadow dark:bg-zinc-900">
            <h2 className="mb-3 sm:mb-4 text-lg sm:text-xl font-semibold text-zinc-900 dark:text-zinc-100">🔄 9. Tahapan Pengadaan Barang/Jasa</h2>
            <div className="space-y-3 text-zinc-700 dark:text-zinc-300">
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">1</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Perencanaan Pengadaan</h3>
                    <p className="text-sm">Identifikasi kebutuhan, penyusunan spesifikasi/KAK, penetapan HPS, strategi pengadaan</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">2</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Persiapan Pengadaan</h3>
                    <p className="text-sm">Penetapan metode pemilihan, metode evaluasi, metode kualifikasi, penyusunan dokumen pengadaan</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">3</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Pemilihan Penyedia</h3>
                    <p className="text-sm">Pengumuman, pendaftaran, pemberian penjelasan, pemasukan dokumen, evaluasi, penetapan pemenang</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">4</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Pelaksanaan Kontrak</h3>
                    <p className="text-sm">Penandatanganan kontrak, SPMK, rapat persiapan, pelaksanaan pekerjaan, pengawasan, pembayaran</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">5</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Serah Terima & Pelaporan</h3>
                    <p className="text-sm">PHO/FHO, BAST, masa pemeliharaan, evaluasi kinerja penyedia, pelaporan</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Bagian 10 - HPS */}
          <section className="rounded-xl bg-white p-4 sm:p-6 shadow dark:bg-zinc-900">
            <h2 className="mb-3 sm:mb-4 text-lg sm:text-xl font-semibold text-zinc-900 dark:text-zinc-100">💰 10. Harga Perkiraan Sendiri (HPS)</h2>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
              <div className="rounded-lg bg-amber-50 p-4 dark:bg-amber-950">
                <p className="text-sm">
                  <strong>HPS</strong> adalah perkiraan harga barang/jasa yang ditetapkan oleh PPK dan digunakan sebagai batas tertinggi penawaran yang sah untuk pelelangan/seleksi.
                </p>
              </div>
              <div>
                <p className="mb-2 font-semibold text-zinc-900 dark:text-zinc-100">Sumber Data HPS:</p>
                <ul className="space-y-1 text-sm">
                  <li className="flex gap-2">
                    <span className="text-blue-600">▸</span>
                    <p><strong>Data yang dapat dipertanggungjawabkan:</strong> e-catalogue, SIPLAH, kontrak sejenis, survei pasar</p>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600">▸</span>
                    <p><strong>Informasi biaya yang dipublikasikan:</strong> harga pabrikan, harga umum setempat</p>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600">▸</span>
                    <p><strong>Untuk konstruksi:</strong> AHSP (Analisis Harga Satuan Pekerjaan), harga satuan bahan, upah, alat</p>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600">▸</span>
                    <p><strong>Untuk konsultansi:</strong> remunerasi tenaga ahli, biaya langsung non-personil, overhead, keuntungan</p>
                  </li>
                </ul>
              </div>
              <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4 dark:bg-red-950">
                <p className="text-sm font-semibold text-red-900 dark:text-red-100">❌ DILARANG:</p>
                <ul className="mt-2 space-y-1 text-sm text-red-800 dark:text-red-200">
                  <li>• Memberitahukan HPS kepada penyedia/peserta</li>
                  <li>• Menetapkan HPS melebihi pagu anggaran</li>
                  <li>• HPS harus wajar, tidak boleh mark-up atau mark-down</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Bagian 11 - Metode Evaluasi */}
          <section className="rounded-xl bg-white p-4 sm:p-6 shadow dark:bg-zinc-900">
            <h2 className="mb-3 sm:mb-4 text-lg sm:text-xl font-semibold text-zinc-900 dark:text-zinc-100">📋 11. Metode Evaluasi Penawaran</h2>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950">
                  <h3 className="mb-2 font-semibold text-blue-900 dark:text-blue-100">Harga Terendah</h3>
                  <p className="mb-2 text-sm text-blue-800 dark:text-blue-200">Untuk pengadaan yang spesifikasinya jelas dan rinci</p>
                  <p className="text-xs text-blue-700 dark:text-blue-300">Contoh: Barang standar, konstruksi sederhana dengan gambar lengkap</p>
                </div>
                <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950">
                  <h3 className="mb-2 font-semibold text-green-900 dark:text-green-100">Pagu Anggaran</h3>
                  <p className="mb-2 text-sm text-green-800 dark:text-green-200">Mengutamakan kualitas dengan batasan pagu anggaran</p>
                  <p className="text-xs text-green-700 dark:text-green-300">Contoh: Pekerjaan yang membutuhkan kualitas tinggi dengan anggaran terbatas</p>
                </div>
                <div className="rounded-lg border border-purple-200 bg-purple-50 p-4 dark:border-purple-800 dark:bg-purple-950">
                  <h3 className="mb-2 font-semibold text-purple-900 dark:text-purple-100">Kualitas</h3>
                  <p className="mb-2 text-sm text-purple-800 dark:text-purple-200">Untuk jasa konsultansi perencanaan/pengawasan</p>
                  <p className="text-xs text-purple-700 dark:text-purple-300">Contoh: DED, studi kelayakan (lingkup kerja tidak dapat diuraikan detail)</p>
                </div>
                <div className="rounded-lg border border-orange-200 bg-orange-50 p-4 dark:border-orange-800 dark:bg-orange-950">
                  <h3 className="mb-2 font-semibold text-orange-900 dark:text-orange-100">Kualitas & Biaya</h3>
                  <p className="mb-2 text-sm text-orange-800 dark:text-orange-200">Untuk jasa konsultansi yang lingkup kerja dapat diuraikan dengan pasti</p>
                  <p className="text-xs text-orange-700 dark:text-orange-300">Contoh: Kajian, survei, dengan KAK yang jelas</p>
                </div>
              </div>
            </div>
          </section>

          {/* Bagian 12 - Jenis Kontrak */}
          <section className="rounded-xl bg-white p-4 sm:p-6 shadow dark:bg-zinc-900">
            <h2 className="mb-3 sm:mb-4 text-lg sm:text-xl font-semibold text-zinc-900 dark:text-zinc-100">📝 12. Jenis Kontrak</h2>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
              <div className="grid gap-3">
                <div className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-700">
                  <h3 className="mb-1 font-semibold text-zinc-900 dark:text-zinc-100">Kontrak Lumsum</h3>
                  <p className="text-sm">Untuk pekerjaan yang volume dan harganya pasti, tidak dimungkinkan perubahan. Pembayaran berdasarkan tahapan penyelesaian (termin).</p>
                </div>
                <div className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-700">
                  <h3 className="mb-1 font-semibold text-zinc-900 dark:text-zinc-100">Kontrak Harga Satuan</h3>
                  <p className="text-sm">Untuk pekerjaan yang volume pekerjaannya masih bersifat perkiraan sementara dan bisa berubah. Pembayaran berdasarkan hasil pekerjaan yang diukur bersama.</p>
                </div>
                <div className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-700">
                  <h3 className="mb-1 font-semibold text-zinc-900 dark:text-zinc-100">Kontrak Gabungan Lumsum & Harga Satuan</h3>
                  <p className="text-sm">Kombinasi keduanya untuk jenis pekerjaan yang berbeda sifat dalam satu kontrak.</p>
                </div>
                <div className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-700">
                  <h3 className="mb-1 font-semibold text-zinc-900 dark:text-zinc-100">Kontrak Waktu Penugasan</h3>
                  <p className="text-sm">Untuk jasa konsultansi berdasarkan waktu penugasan tenaga ahli (person-month/person-day).</p>
                </div>
                <div className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-700">
                  <h3 className="mb-1 font-semibold text-zinc-900 dark:text-zinc-100">Kontrak Persentase</h3>
                  <p className="text-sm">Untuk jasa makler/broker berdasarkan persentase dari nilai transaksi.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Bagian 13 - Nilai Ambang Batas */}
          <section className="rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 p-4 sm:p-6 shadow dark:from-purple-950 dark:to-pink-950">
            <h2 className="mb-3 sm:mb-4 text-lg sm:text-xl font-semibold text-purple-900 dark:text-purple-100">🎚️ 13. Nilai Ambang Batas Pengadaan</h2>
            <div className="space-y-3 text-zinc-700 dark:text-zinc-300">
              <div className="rounded-lg bg-white p-4 dark:bg-zinc-900">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-zinc-200 dark:border-zinc-700">
                      <th className="pb-2 text-left text-zinc-900 dark:text-zinc-100">Nilai Pengadaan</th>
                      <th className="pb-2 text-left text-zinc-900 dark:text-zinc-100">Metode</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                    <tr>
                      <td className="py-2">≤ Rp 200 juta</td>
                      <td className="py-2">Pengadaan Langsung</td>
                    </tr>
                    <tr>
                      <td className="py-2">&gt; Rp 200 juta</td>
                      <td className="py-2">Tender/Seleksi</td>
                    </tr>
                    <tr>
                      <td className="py-2">E-catalogue tersedia</td>
                      <td className="py-2">E-Purchasing (wajib)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="rounded-lg border-l-4 border-purple-600 bg-white p-4 dark:bg-zinc-900">
                <p className="text-sm">
                  <strong className="text-zinc-900 dark:text-zinc-100">Catatan:</strong> Nilai ambang batas dapat berbeda untuk sektor tertentu sesuai ketentuan sektoral.
                </p>
              </div>
            </div>
          </section>

          {/* Bagian 14 - E-Procurement */}
          <section className="rounded-xl bg-white p-4 sm:p-6 shadow dark:bg-zinc-900">
            <h2 className="mb-3 sm:mb-4 text-lg sm:text-xl font-semibold text-zinc-900 dark:text-zinc-100">💻 14. Sistem E-Procurement</h2>
            <div className="space-y-3 text-zinc-700 dark:text-zinc-300">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-700">
                  <h3 className="mb-2 font-semibold text-zinc-900 dark:text-zinc-100">SIKAP</h3>
                  <p className="text-sm">Sistem Informasi Kinerja Penyedia - database penyedia barang/jasa terverifikasi dan kinerja mereka</p>
                </div>
                <div className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-700">
                  <h3 className="mb-2 font-semibold text-zinc-900 dark:text-zinc-100">E-Catalogue</h3>
                  <p className="text-sm">Katalog elektronik berisi daftar barang/jasa dengan harga dan spesifikasi yang telah disepakati</p>
                </div>
                <div className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-700">
                  <h3 className="mb-2 font-semibold text-zinc-900 dark:text-zinc-100">E-Purchasing</h3>
                  <p className="text-sm">Pembelian barang/jasa melalui katalog elektronik secara langsung</p>
                </div>
                <div className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-700">
                  <h3 className="mb-2 font-semibold text-zinc-900 dark:text-zinc-100">SPSE</h3>
                  <p className="text-sm">Sistem Pengadaan Secara Elektronik untuk tender/seleksi online</p>
                </div>
              </div>
            </div>
          </section>

          {/* Bagian 15 - Manajemen Rantai Pasok */}
          <section className="rounded-xl bg-gradient-to-br from-teal-50 to-cyan-50 p-4 sm:p-6 shadow dark:from-teal-950 dark:to-cyan-950">
            <h2 className="mb-3 sm:mb-4 text-lg sm:text-xl font-semibold text-teal-900 dark:text-teal-100">🔗 15. Manajemen Rantai Pasok (Supply Chain Management)</h2>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
              <div className="rounded-lg bg-white p-4 dark:bg-zinc-900">
                <p className="mb-3 font-semibold text-zinc-900 dark:text-zinc-100">Definisi:</p>
                <p className="text-sm">
                  <strong>Manajemen Rantai Pasok</strong> adalah pendekatan terintegrasi untuk merencanakan dan mengendalikan aliran barang/jasa dari pemasok hingga pengguna akhir, dengan tujuan meningkatkan efisiensi dan nilai tambah.
                </p>
              </div>

              {/* Siklus SCOR Model */}
              <div className="rounded-lg bg-white p-4 dark:bg-zinc-900">
                <p className="mb-3 font-semibold text-teal-900 dark:text-teal-100">Model SCOR (Supply Chain Operations Reference):</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-teal-600 text-sm font-bold text-white">1</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">PLAN (Perencanaan)</h3>
                      <p className="text-sm">Penyusunan strategi pengadaan, identifikasi kebutuhan, perencanaan anggaran, penyusunan spesifikasi/KAK, penetapan HPS</p>
                      <p className="mt-1 text-xs text-teal-700 dark:text-teal-300">📌 Contoh: PPK menyusun RAB, KAK, dan HPS untuk pengadaan</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">2</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">SOURCE (Sumber/Pemilihan)</h3>
                      <p className="text-sm">Pemilihan penyedia melalui tender/seleksi, evaluasi kualifikasi, evaluasi penawaran, negosiasi, penetapan pemenang</p>
                      <p className="mt-1 text-xs text-blue-700 dark:text-blue-300">📌 Contoh: Pokja melakukan tender dan evaluasi penyedia</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-600 text-sm font-bold text-white">3</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">MAKE (Pembuatan/Pelaksanaan)</h3>
                      <p className="text-sm">Pelaksanaan kontrak oleh penyedia, produksi/pembangunan, quality control, pengawasan pekerjaan</p>
                      <p className="mt-1 text-xs text-purple-700 dark:text-purple-300">📌 Contoh: Penyedia melaksanakan pekerjaan konstruksi sesuai kontrak</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-orange-600 text-sm font-bold text-white">4</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">DELIVER (Pengiriman/Serah Terima)</h3>
                      <p className="text-sm">Penyerahan hasil pekerjaan, pemeriksaan hasil, BAST, pembayaran, dokumentasi</p>
                      <p className="mt-1 text-xs text-orange-700 dark:text-orange-300">📌 Contoh: Serah terima barang dari penyedia ke PPK</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">5</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">RETURN (Pengembalian/Evaluasi)</h3>
                      <p className="text-sm">Masa pemeliharaan, evaluasi kinerja penyedia, penanganan komplain, perbaikan jika ada cacat</p>
                      <p className="mt-1 text-xs text-green-700 dark:text-green-300">📌 Contoh: Masa pemeliharaan 6 bulan untuk pekerjaan konstruksi</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Level SCM */}
              <div className="rounded-lg bg-white p-4 dark:bg-zinc-900">
                <p className="mb-3 font-semibold text-teal-900 dark:text-teal-100">3 Level Manajemen Rantai Pasok:</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-lg border border-teal-200 bg-teal-50 p-3 dark:border-teal-800 dark:bg-teal-950">
                    <h3 className="mb-2 font-semibold text-teal-900 dark:text-teal-100">Strategis</h3>
                    <p className="text-xs">Perencanaan jangka panjang, kebijakan pengadaan, strategi pemaketan</p>
                    <p className="mt-2 text-xs font-medium">Contoh: Penetapan strategi e-catalogue nasional</p>
                  </div>
                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 dark:border-blue-800 dark:bg-blue-950">
                    <h3 className="mb-2 font-semibold text-blue-900 dark:text-blue-100">Taktis</h3>
                    <p className="text-xs">Perencanaan menengah, vendor management, manajemen kontrak</p>
                    <p className="mt-2 text-xs font-medium">Contoh: Evaluasi dan seleksi penyedia terbaik</p>
                  </div>
                  <div className="rounded-lg border border-purple-200 bg-purple-50 p-3 dark:border-purple-800 dark:bg-purple-950">
                    <h3 className="mb-2 font-semibold text-purple-900 dark:text-purple-100">Operasional</h3>
                    <p className="text-xs">Pelaksanaan harian, pemesanan, pengiriman, pembayaran</p>
                    <p className="mt-2 text-xs font-medium">Contoh: Proses e-purchasing harian</p>
                  </div>
                </div>
              </div>

              {/* Manajemen Penyedia */}
              <div className="rounded-lg bg-white p-4 dark:bg-zinc-900">
                <p className="mb-3 font-semibold text-teal-900 dark:text-teal-100">Manajemen Penyedia (Vendor Management):</p>
                <div className="space-y-2 text-sm">
                  <div className="rounded-md border-l-4 border-green-500 bg-green-50 p-3 dark:bg-green-950">
                    <h4 className="font-semibold text-green-900 dark:text-green-100">✓ Preferred Supplier</h4>
                    <p className="text-xs text-green-800 dark:text-green-200">
                      Penyedia pilihan utama dengan track record sangat baik, kinerja memuaskan, dan sering dipakai
                    </p>
                  </div>
                  <div className="rounded-md border-l-4 border-blue-500 bg-blue-50 p-3 dark:bg-blue-950">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100">✓ Approved Supplier</h4>
                    <p className="text-xs text-blue-800 dark:text-blue-200">
                      Penyedia yang sudah terverifikasi di SIKAP dan memenuhi kualifikasi dasar
                    </p>
                  </div>
                  <div className="rounded-md border-l-4 border-amber-500 bg-amber-50 p-3 dark:bg-amber-950">
                    <h4 className="font-semibold text-amber-900 dark:text-amber-100">⚠ Interest Supplier</h4>
                    <p className="text-xs text-amber-800 dark:text-amber-200">
                      Penyedia baru yang tertarik namun belum pernah bekerja sama
                    </p>
                  </div>
                  <div className="rounded-md border-l-4 border-red-500 bg-red-50 p-3 dark:bg-red-950">
                    <h4 className="font-semibold text-red-900 dark:text-red-100">✗ Blacklist Supplier</h4>
                    <p className="text-xs text-red-800 dark:text-red-200">
                      Penyedia yang dilarang ikut pengadaan karena sanksi atau kinerja buruk
                    </p>
                  </div>
                </div>
              </div>

              {/* Keterkaitan PBJP */}
              <div className="rounded-lg border-l-4 border-teal-600 bg-white p-4 dark:bg-zinc-900">
                <p className="mb-2 font-semibold text-teal-900 dark:text-teal-100">Keterkaitan PBJP dalam Rantai Pasok:</p>
                <ul className="space-y-1 text-sm">
                  <li className="flex gap-2">
                    <span className="text-teal-600">▸</span>
                    <p><strong>Perencanaan Pengadaan</strong> = PLAN</p>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-teal-600">▸</span>
                    <p><strong>Pemilihan Penyedia</strong> = SOURCE</p>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-teal-600">▸</span>
                    <p><strong>Pelaksanaan Kontrak</strong> = MAKE</p>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-teal-600">▸</span>
                    <p><strong>Serah Terima</strong> = DELIVER</p>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-teal-600">▸</span>
                    <p><strong>Masa Pemeliharaan & Evaluasi</strong> = RETURN</p>
                  </li>
                </ul>
              </div>

              {/* Manfaat */}
              <div className="rounded-lg bg-teal-100 p-4 dark:bg-teal-900">
                <p className="mb-2 font-semibold text-teal-900 dark:text-teal-100">💡 Manfaat Manajemen Rantai Pasok:</p>
                <ul className="space-y-1 text-sm text-teal-800 dark:text-teal-200">
                  <li>✓ Meningkatkan efisiensi proses pengadaan</li>
                  <li>✓ Mengurangi lead time dan biaya</li>
                  <li>✓ Meningkatkan kualitas barang/jasa</li>
                  <li>✓ Transparansi dan akuntabilitas lebih baik</li>
                  <li>✓ Hubungan jangka panjang dengan penyedia berkualitas</li>
                  <li>✓ Manajemen risiko yang lebih baik</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Bagian 16 - Sanksi */}
          <section className="rounded-xl bg-red-50 p-4 sm:p-6 shadow dark:bg-red-950">
            <h2 className="mb-3 sm:mb-4 text-lg sm:text-xl font-semibold text-red-900 dark:text-red-100">⚠️ 16. Sanksi dan Pelanggaran</h2>
            <div className="space-y-3 text-zinc-700 dark:text-zinc-300">
              <div className="rounded-lg bg-white p-4 dark:bg-zinc-900">
                <p className="mb-3 font-semibold text-red-900 dark:text-red-100">Sanksi bagi Penyedia:</p>
                <ul className="space-y-1 text-sm">
                  <li className="flex gap-2">
                    <span className="text-red-600">•</span>
                    <p>Pencairan jaminan pelaksanaan jika cidera janji</p>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-600">•</span>
                    <p>Denda keterlambatan (maksimal 5% dari nilai kontrak)</p>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-600">•</span>
                    <p>Pemutusan kontrak sepihak</p>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-600">•</span>
                    <p>Sanksi administratif: blacklist dari SIKAP</p>
                  </li>
                </ul>
              </div>
              <div className="rounded-lg bg-white p-4 dark:bg-zinc-900">
                <p className="mb-3 font-semibold text-red-900 dark:text-red-100">Pelanggaran yang Sering Terjadi:</p>
                <ul className="space-y-1 text-sm">
                  <li className="flex gap-2">
                    <span className="text-red-600">•</span>
                    <p>Kolusi, korupsi, nepotisme (KKN)</p>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-600">•</span>
                    <p>Persekongkolan (tender fixing)</p>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-600">•</span>
                    <p>Penyalahgunaan wewenang</p>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-600">•</span>
                    <p>Kebocoran informasi (HPS, dokumen rahasia)</p>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-600">•</span>
                    <p>Pemalsuan dokumen kualifikasi</p>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Bagian 17 - Spesifikasi Teknis & KAK */}
          <section className="rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 p-4 sm:p-6 shadow dark:from-indigo-950 dark:to-violet-950">
            <h2 className="mb-3 sm:mb-4 text-lg sm:text-xl font-semibold text-indigo-900 dark:text-indigo-100">📐 17. Spesifikasi Teknis & KAK</h2>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
              <div className="rounded-lg bg-white p-4 dark:bg-zinc-900">
                <p className="mb-3 font-semibold text-indigo-900 dark:text-indigo-100">3 Pola Spesifikasi:</p>
                <div className="space-y-2 text-sm">
                  <div className="rounded-md border-l-4 border-blue-500 bg-blue-50 p-3 dark:bg-blue-950">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100">1. Spesifikasi Kinerja</h4>
                    <p className="text-xs text-blue-800 dark:text-blue-200">
                      Menjelaskan output/hasil yang diharapkan. Contoh: "AC yang dapat mencapai 16°C dalam 5 menit"
                    </p>
                  </div>
                  <div className="rounded-md border-l-4 border-green-500 bg-green-50 p-3 dark:bg-green-950">
                    <h4 className="font-semibold text-green-900 dark:text-green-100">2. Spesifikasi Teknis</h4>
                    <p className="text-xs text-green-800 dark:text-green-200">
                      Detail teknis barang/jasa. Contoh: "Kertas A4 80 gram"
                    </p>
                  </div>
                  <div className="rounded-md border-l-4 border-purple-500 bg-purple-50 p-3 dark:bg-purple-950">
                    <h4 className="font-semibold text-purple-900 dark:text-purple-100">3. Spesifikasi Standarisasi</h4>
                    <p className="text-xs text-purple-800 dark:text-purple-200">
                      Mengacu pada standar (SNI, ISO). Contoh: "Ban yang memenuhi SNI 06-0098-2002"
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-white p-4 dark:bg-zinc-900">
                <p className="mb-2 font-semibold text-indigo-900 dark:text-indigo-100">4 Aspek Spesifikasi:</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="rounded-md bg-indigo-50 p-2 dark:bg-indigo-950">
                    <span className="font-semibold">Mutu</span> - Kualitas produk
                  </div>
                  <div className="rounded-md bg-indigo-50 p-2 dark:bg-indigo-950">
                    <span className="font-semibold">Jumlah</span> - Volume kebutuhan
                  </div>
                  <div className="rounded-md bg-indigo-50 p-2 dark:bg-indigo-950">
                    <span className="font-semibold">Waktu</span> - Jadwal pengiriman
                  </div>
                  <div className="rounded-md bg-indigo-50 p-2 dark:bg-indigo-950">
                    <span className="font-semibold">Layanan</span> - Garansi, purna jual
                  </div>
                </div>
              </div>
              <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4 dark:bg-red-950">
                <p className="text-sm font-semibold text-red-900 dark:text-red-100">❌ DILARANG menyebutkan merek</p>
                <p className="text-xs text-red-800 dark:text-red-200">
                  Kecuali: suku cadang, e-purchasing, atau pengadaan langsung
                </p>
              </div>
            </div>
          </section>

          {/* Bagian 18 - Kualifikasi Penyedia */}
          <section className="rounded-xl bg-white p-4 sm:p-6 shadow dark:bg-zinc-900">
            <h2 className="mb-3 sm:mb-4 text-lg sm:text-xl font-semibold text-zinc-900 dark:text-zinc-100">✅ 18. Kualifikasi Penyedia</h2>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950">
                  <h3 className="mb-2 font-semibold text-blue-900 dark:text-blue-100">Prakualifikasi</h3>
                  <ul className="space-y-1 text-xs">
                    <li>✓ SEBELUM penawaran</li>
                    <li>✓ Pekerjaan kompleks</li>
                    <li>✓ Nilai besar</li>
                    <li className="text-blue-700 dark:text-blue-300">Contoh: Tender LRT, infrastruktur besar</li>
                  </ul>
                </div>
                <div className="rounded-lg border-2 border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950">
                  <h3 className="mb-2 font-semibold text-green-900 dark:text-green-100">Pascakualifikasi</h3>
                  <ul className="space-y-1 text-xs">
                    <li>✓ SETELAH evaluasi penawaran</li>
                    <li>✓ Pekerjaan sederhana</li>
                    <li>✓ Nilai kecil-menengah</li>
                    <li className="text-green-700 dark:text-green-300">Contoh: Pengadaan ATK, laptop</li>
                  </ul>
                </div>
              </div>
              <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800">
                <p className="mb-2 font-semibold">Sistem Evaluasi:</p>
                <div className="grid gap-2 sm:grid-cols-2 text-sm">
                  <div><strong>Sistem Gugur:</strong> Tidak memenuhi = GUGUR (Lulus/Tidak Lulus)</div>
                  <div><strong>Sistem Pembobotan:</strong> Ada scoring, harus capai nilai minimum</div>
                </div>
              </div>
              <div className="rounded-lg border-l-4 border-amber-500 bg-amber-50 p-4 dark:bg-amber-950">
                <p className="text-sm font-semibold text-amber-900 dark:text-amber-100">💡 Yang Dievaluasi:</p>
                <p className="text-xs text-amber-800 dark:text-amber-200">
                  Legalitas usaha, Bidang pekerjaan, Perpajakan, Pengalaman, Kemampuan teknis. <strong>BUKAN Harga!</strong>
                </p>
              </div>
            </div>
          </section>

          {/* Bagian 19 - Dokumen Penawaran */}
          <section className="rounded-xl bg-white p-4 sm:p-6 shadow dark:bg-zinc-900">
            <h2 className="mb-3 sm:mb-4 text-lg sm:text-xl font-semibold text-zinc-900 dark:text-zinc-100">📄 19. Metode Penyampaian Dokumen Penawaran</h2>
            <div className="space-y-3 text-zinc-700 dark:text-zinc-300">
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-800">
                  <h3 className="mb-2 font-semibold text-zinc-900 dark:text-zinc-100">1 File</h3>
                  <p className="text-xs mb-2">Semua dokumen dalam 1 file</p>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">Untuk: Pengadaan langsung, penunjukan langsung</p>
                </div>
                <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-800">
                  <h3 className="mb-2 font-semibold text-zinc-900 dark:text-zinc-100">2 File</h3>
                  <p className="text-xs mb-2">File 1: Admin+Teknis | File 2: Harga</p>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">Untuk: Tender standar (paling umum)</p>
                </div>
                <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-800">
                  <h3 className="mb-2 font-semibold text-zinc-900 dark:text-zinc-100">2 Tahap</h3>
                  <p className="text-xs mb-2">Tahap 1: Teknis | Tahap 2: Harga</p>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">Untuk: Barang kompleks + penyetaraan teknis (Pesawat, alat berat)</p>
                </div>
              </div>
            </div>
          </section>

          {/* Bagian 20 - Sanggah & Sanggah Banding */}
          <section className="rounded-xl bg-gradient-to-br from-orange-50 to-red-50 p-4 sm:p-6 shadow dark:from-orange-950 dark:to-red-950">
            <h2 className="mb-3 sm:mb-4 text-lg sm:text-xl font-semibold text-orange-900 dark:text-orange-100">⚖️ 20. Sanggah & Sanggah Banding</h2>
            <div className="space-y-3 text-zinc-700 dark:text-zinc-300">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg bg-white p-4 dark:bg-zinc-900">
                  <h3 className="mb-2 font-semibold text-orange-900 dark:text-orange-100">Sanggah</h3>
                  <ul className="space-y-1 text-sm">
                    <li>📅 Waktu: <strong>5 hari kerja</strong> sejak penetapan pemenang</li>
                    <li>📋 Untuk: Semua paket pengadaan</li>
                    <li>👥 Ditujukan ke: Pokja Pemilihan</li>
                    <li>✉️ Jawaban: 5 hari kerja</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-white p-4 dark:bg-zinc-900">
                  <h3 className="mb-2 font-semibold text-red-900 dark:text-red-100">Sanggah Banding</h3>
                  <ul className="space-y-1 text-sm">
                    <li>💰 Syarat: Paket <strong>&gt; Rp 100 miliar</strong></li>
                    <li>📅 Waktu: 5 hari kerja setelah jawaban sanggah</li>
                    <li>🏢 Ditujukan ke: LKPP</li>
                    <li>✉️ Jawaban: 14 hari kalender</li>
                    <li>⚠️ Hanya: Barang, konstruksi, jasa lainnya</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Bagian 21 - Pemaketan Pengadaan */}
          <section className="rounded-xl bg-white p-4 sm:p-6 shadow dark:bg-zinc-900">
            <h2 className="mb-3 sm:mb-4 text-lg sm:text-xl font-semibold text-zinc-900 dark:text-zinc-100">📦 21. Pemaketan & Konsolidasi Pengadaan</h2>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-4 dark:bg-green-950">
                  <p className="mb-2 font-semibold text-green-900 dark:text-green-100">✓ BOLEH Digabung:</p>
                  <ul className="space-y-1 text-xs text-green-800 dark:text-green-200">
                    <li>• Paket sejenis dan sifat pekerjaan sama</li>
                    <li>• Meningkatkan efisiensi</li>
                    <li>• Tidak menutup akses UMKM</li>
                  </ul>
                </div>
                <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4 dark:bg-red-950">
                  <p className="mb-2 font-semibold text-red-900 dark:text-red-100">✗ DILARANG Digabung:</p>
                  <ul className="space-y-1 text-xs text-red-800 dark:text-red-200">
                    <li>• Paket berbeda sifat dan jenis</li>
                    <li>• Berbeda lokasi (seharusnya terpisah)</li>
                    <li>• Hanya untuk jadi usaha besar</li>
                    <li>• Berbeda pelaku usaha di pasar</li>
                  </ul>
                </div>
              </div>
              <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-950">
                <p className="mb-2 font-semibold text-blue-900 dark:text-blue-100">Konsolidasi Pengadaan:</p>
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  <p>• Dilakukan oleh: <strong>UKPBJ atau PPK</strong></p>
                  <p>• Tahap: <strong>Perencanaan Pengadaan</strong></p>
                  <p>• Prinsip: <strong>Efisien</strong> (hemat waktu & biaya)</p>
                </div>
              </div>
            </div>
          </section>

          {/* Bagian 22 - Pembayaran & Jaminan */}
          <section className="rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 p-4 sm:p-6 shadow dark:from-emerald-950 dark:to-teal-950">
            <h2 className="mb-3 sm:mb-4 text-lg sm:text-xl font-semibold text-emerald-900 dark:text-emerald-100">💵 22. Pembayaran & Jaminan</h2>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
              <div className="rounded-lg bg-white p-4 dark:bg-zinc-900">
                <p className="mb-3 font-semibold text-emerald-900 dark:text-emerald-100">Uang Muka:</p>
                <div className="grid gap-2 text-sm">
                  <div className="rounded-md bg-emerald-50 p-2 dark:bg-emerald-950">
                    <strong>Kontrak 1 tahun:</strong> Maksimal <strong>20%</strong> dari nilai kontrak
                  </div>
                  <div className="rounded-md bg-teal-50 p-2 dark:bg-teal-950">
                    <strong>Kontrak tahun jamak:</strong> Maksimal <strong>15%</strong> dari nilai kontrak
                  </div>
                  <p className="text-xs mt-2">Syarat: Nilai kontrak ≥ Rp 200 juta + ada jaminan uang muka</p>
                </div>
              </div>
              <div className="rounded-lg bg-white p-4 dark:bg-zinc-900">
                <p className="mb-3 font-semibold text-emerald-900 dark:text-emerald-100">Jaminan Pemeliharaan:</p>
                <div className="grid gap-2 sm:grid-cols-2 text-sm">
                  <div className="rounded-md border-2 border-green-300 bg-green-50 p-3 dark:border-green-700 dark:bg-green-950">
                    <p className="font-semibold">Penawaran &gt; 80% HPS</p>
                    <p className="text-2xl font-bold text-green-600">5%</p>
                  </div>
                  <div className="rounded-md border-2 border-blue-300 bg-blue-50 p-3 dark:border-blue-700 dark:bg-blue-950">
                    <p className="font-semibold">Penawaran ≤ 80% HPS</p>
                    <p className="text-2xl font-bold text-blue-600">10%</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-white p-4 dark:bg-zinc-900">
                <p className="mb-2 font-semibold text-emerald-900 dark:text-emerald-100">Tata Cara Pembayaran:</p>
                <ul className="space-y-1 text-sm">
                  <li><strong>Barang:</strong> Sekaligus (sederhana) atau Termin (bertahap)</li>
                  <li><strong>Jasa Lainnya:</strong> Per bulan/triwulan (TIDAK sekaligus di awal!)</li>
                  <li><strong>Konstruksi:</strong> Termin berdasarkan progress</li>
                  <li><strong>Konsultansi:</strong> Bulanan atau termin sesuai output</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Bagian 23 - Perubahan Kontrak (Addendum) */}
          <section className="rounded-xl bg-white p-4 sm:p-6 shadow dark:bg-zinc-900">
            <h2 className="mb-3 sm:mb-4 text-lg sm:text-xl font-semibold text-zinc-900 dark:text-zinc-100">📝 23. Perubahan Kontrak (Addendum)</h2>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
              <div className="rounded-lg bg-amber-50 p-4 dark:bg-amber-950">
                <p className="mb-3 font-semibold text-amber-900 dark:text-amber-100">Kondisi yang Memerlukan Addendum:</p>
                <ul className="space-y-1 text-sm">
                  <li>1️⃣ Perubahan jadwal pelaksanaan</li>
                  <li>2️⃣ Perubahan spesifikasi (persetujuan PPK)</li>
                  <li>3️⃣ Penambahan/pengurangan volume (<strong>max 10%</strong>)</li>
                  <li>4️⃣ Penambahan item pekerjaan baru</li>
                </ul>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4 dark:bg-blue-950">
                  <p className="mb-2 font-semibold text-blue-900 dark:text-blue-100">Prosedur:</p>
                  <ul className="space-y-1 text-xs text-blue-800 dark:text-blue-200">
                    <li>• <strong>Negosiasi:</strong> PPK dan Penyedia</li>
                    <li>• <strong>Dokumen:</strong> Addendum tertulis</li>
                    <li>• <strong>Persetujuan:</strong> PPK (bukan Pokja)</li>
                    <li>• <strong>Pembayaran:</strong> Sesuai addendum</li>
                  </ul>
                </div>
                <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4 dark:bg-red-950">
                  <p className="mb-2 font-semibold text-red-900 dark:text-red-100">❌ TIDAK Bisa Diubah:</p>
                  <ul className="space-y-1 text-xs text-red-800 dark:text-red-200">
                    <li>• Jenis pekerjaan utama</li>
                    <li>• Penyedia (tidak bisa diganti)</li>
                    <li>• Harga satuan (kecuali eskalasi)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Bagian 24 - Negosiasi */}
          <section className="rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 p-4 sm:p-6 shadow dark:from-purple-950 dark:to-pink-950">
            <h2 className="mb-3 sm:mb-4 text-lg sm:text-xl font-semibold text-purple-900 dark:text-purple-100">🤝 24. Negosiasi dalam Pengadaan</h2>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border-2 border-green-300 bg-white p-4 dark:border-green-700 dark:bg-zinc-900">
                  <h3 className="mb-2 font-semibold text-green-900 dark:text-green-100">✅ WAJIB Negosiasi:</h3>
                  <ul className="space-y-1 text-sm">
                    <li>✓ Pengadaan Langsung</li>
                    <li>✓ Penunjukan Langsung</li>
                    <li>✓ E-Purchasing (nego harga katalog)</li>
                    <li>✓ Seleksi (jasa konsultansi)</li>
                  </ul>
                </div>
                <div className="rounded-lg border-2 border-red-300 bg-white p-4 dark:border-red-700 dark:bg-zinc-900">
                  <h3 className="mb-2 font-semibold text-red-900 dark:text-red-100">❌ TIDAK Ada Negosiasi:</h3>
                  <ul className="space-y-1 text-sm">
                    <li>✗ Tender (ada pemenang + cadangan)</li>
                    <li>✗ E-catalogue (harga sudah fix)</li>
                    <li>✗ Pelelangan/Tender terbuka biasa</li>
                  </ul>
                </div>
              </div>
              <div className="rounded-lg bg-white p-4 dark:bg-zinc-900">
                <p className="mb-2 font-semibold text-purple-900 dark:text-purple-100">Yang Dinegosiasikan:</p>
                <div className="grid gap-2 sm:grid-cols-2 text-sm">
                  <div>💰 Harga (turunkan mendekati HPS)</div>
                  <div>📋 Spesifikasi teknis (minor)</div>
                  <div>📅 Jadwal pelaksanaan</div>
                  <div>💳 Cara pembayaran</div>
                </div>
              </div>
              <div className="rounded-lg border-l-4 border-orange-500 bg-orange-50 p-3 dark:bg-orange-950">
                <p className="text-sm font-semibold text-orange-900 dark:text-orange-100">
                  ⚠️ Jika negosiasi gagal = pengadaan gagal → pengadaan ulang
                </p>
              </div>
            </div>
          </section>

          {/* Bagian 25 - Kontrak Tahun Jamak */}
          <section className="rounded-xl bg-white p-4 sm:p-6 shadow dark:bg-zinc-900">
            <h2 className="mb-3 sm:mb-4 text-lg sm:text-xl font-semibold text-zinc-900 dark:text-zinc-100">📆 25. Kontrak Tahun Jamak</h2>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
              <div className="rounded-lg border-2 border-blue-300 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-950">
                <p className="mb-2 font-semibold text-blue-900 dark:text-blue-100">Syarat Kontrak Tahun Jamak:</p>
                <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
                  <li>✓ Pekerjaan <strong>&gt; 12 bulan</strong> (lebih dari 1 tahun anggaran)</li>
                  <li>✓ Ada komitmen anggaran multi-tahun</li>
                  <li>✓ Tercantum dalam DIPA/DPA</li>
                </ul>
              </div>
              <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800">
                <p className="mb-2 font-semibold">Contoh:</p>
                <div className="grid gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✅</span>
                    <span>Pembangunan jalan & jembatan nasional (2022-2024)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✅</span>
                    <span>Manajemen konstruksi renovasi sekolah (2022-2024)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✅</span>
                    <span>Pembangunan gedung 2 lantai (2022-2023)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-600">❌</span>
                    <span>Penyusunan kajian (2022-2022) - hanya 1 tahun</span>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-gradient-to-r from-purple-50 to-violet-50 p-4 dark:from-purple-950 dark:to-violet-950">
                <p className="mb-2 font-semibold text-purple-900 dark:text-purple-100">Ketentuan Khusus:</p>
                <ul className="space-y-1 text-sm">
                  <li>💰 Uang muka maksimal <strong>15%</strong> (bukan 20%)</li>
                  <li>🔒 Jaminan pemeliharaan disesuaikan</li>
                  <li>📊 Pembayaran per tahun sesuai pagu anggaran</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Bagian 26 - Survey Pasar */}
          <section className="rounded-xl bg-gradient-to-br from-cyan-50 to-sky-50 p-4 sm:p-6 shadow dark:from-cyan-950 dark:to-sky-950">
            <h2 className="mb-3 sm:mb-4 text-lg sm:text-xl font-semibold text-cyan-900 dark:text-cyan-100">🔍 26. Survey Pasar & Analisis Pasar</h2>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
              <div className="rounded-lg bg-white p-4 dark:bg-zinc-900">
                <p className="mb-3 font-semibold text-cyan-900 dark:text-cyan-100">Tujuan Survey Pasar:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span className="font-semibold text-cyan-600">1.</span>
                    <span>Mengetahui <strong>seberapa banyak penyedia yang berminat</strong></span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-cyan-600">2.</span>
                    <span>Ketersediaan barang/jasa di pasar</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-cyan-600">3.</span>
                    <span>Tingkat kompetisi</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-cyan-600">4.</span>
                    <span>Estimasi harga pasar</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-cyan-600">5.</span>
                    <span><strong>Menentukan metode pemilihan penyedia</strong></span>
                  </li>
                </ul>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4 dark:bg-blue-950">
                  <p className="mb-2 font-semibold text-blue-900 dark:text-blue-100">⏱️ Waktu Pelaksanaan:</p>
                  <ul className="space-y-1 text-xs text-blue-800 dark:text-blue-200">
                    <li>• Tahap awal (sebelum dokumen tender final)</li>
                    <li>• Bagian dari <strong>persiapan pengadaan</strong></li>
                  </ul>
                </div>
                <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-4 dark:bg-green-950">
                  <p className="mb-2 font-semibold text-green-900 dark:text-green-100">✨ Manfaat:</p>
                  <ul className="space-y-1 text-xs text-green-800 dark:text-green-200">
                    <li>• HPS lebih akurat</li>
                    <li>• Metode pemilihan tepat</li>
                    <li>• Menghindari tender gagal</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-4 sm:p-6 text-white shadow">
            <div className="flex-1">
              <h3 className="mb-2 text-base sm:text-lg font-semibold">Siap untuk berlatih?</h3>
              <p className="text-xs sm:text-sm text-blue-100">Uji pemahaman Anda dengan mode latihan atau langsung coba tryout!</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <a
                href="/latihan"
                className="text-center rounded-md bg-white px-4 sm:px-6 py-2 sm:py-3 text-sm font-medium text-blue-600 hover:bg-blue-50 whitespace-nowrap"
              >
                ✏️ Mulai Latihan
              </a>
              <a
                href="/"
                className="text-center rounded-md border-2 border-white px-4 sm:px-6 py-2 sm:py-3 text-sm font-medium text-white hover:bg-white/10 whitespace-nowrap"
              >
                🎯 Tryout
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
