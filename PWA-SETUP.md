# 🏛️ Setup PWA - Portal Pembelajaran PBJP

Website ini sudah dikonfigurasi sebagai Progressive Web App (PWA) yang bisa diinstall di HP dan laptop.

## ✅ Fitur PWA yang Sudah Ditambahkan

1. **Manifest.json** - Konfigurasi aplikasi PWA
2. **Service Worker** - Untuk offline support dan caching
3. **Install Prompt** - Notifikasi install otomatis muncul saat user buka website
4. **Metadata PWA** - Icons, theme color, dan konfigurasi lainnya
5. **Responsive Icons** - Support untuk berbagai ukuran device

## 📱 Cara Generate Icon PWA

Karena icon belum di-generate, ikuti langkah berikut:

### Opsi 1: Generate via Browser (Paling Mudah)

1. Buka file `public/generate-icons.html` di browser
2. Klik tombol untuk generate icon:
   - **icon-192.png** (untuk Android & desktop)
   - **icon-512.png** (untuk Android & desktop)
   - **favicon.ico** (untuk browser tab)
3. Simpan semua file yang di-download ke folder `public/`

### Opsi 2: Gunakan Icon Custom

Jika Anda punya icon sendiri:
1. Siapkan icon PNG dengan ukuran 512x512 px
2. Resize menjadi 192x192 px dan 512x512 px
3. Simpan sebagai `icon-192.png` dan `icon-512.png` di folder `public/`
4. Buat favicon 32x32 px dan simpan sebagai `favicon.ico`

## 🚀 Cara Testing PWA

### Testing di Localhost

1. Build aplikasi:
   ```bash
   npm run build
   npm start
   ```

2. Buka browser di `http://localhost:3000`

3. Notifikasi install akan muncul otomatis di pojok kiri bawah

### Testing di Mobile

1. Deploy website ke hosting (Vercel, Netlify, dll)
2. Buka website di Chrome/Safari mobile
3. Notifikasi install akan muncul
4. Atau klik menu browser → "Add to Home Screen"

### Testing di Desktop

1. Buka website di Chrome/Edge
2. Lihat icon install di address bar (sebelah kanan)
3. Atau notifikasi install akan muncul otomatis
4. Klik "Install" untuk install aplikasi

## 🔧 Konfigurasi PWA

File-file PWA yang sudah dibuat:

- `public/manifest.json` - Konfigurasi PWA
- `public/sw.js` - Service Worker untuk offline support
- `app/components/InstallPrompt.tsx` - Komponen notifikasi install
- `app/layout.tsx` - Metadata PWA dan import InstallPrompt
- `app/globals.css` - Animasi untuk install prompt

## 📋 Checklist PWA

- ✅ Manifest.json configured
- ✅ Service Worker registered
- ✅ Install prompt component
- ✅ PWA metadata in layout
- ✅ Theme color configured
- ✅ Offline support enabled
- ⚠️ Icons need to be generated (see above)

## 🎯 Fitur PWA yang Aktif

1. **Install ke Device** - User bisa install aplikasi ke HP/laptop
2. **Offline Support** - Aplikasi bisa dibuka tanpa internet (halaman yang sudah pernah dibuka)
3. **Fast Loading** - Caching membuat loading lebih cepat
4. **Native-like Experience** - Tampil seperti aplikasi native
5. **Auto Update** - Service worker otomatis update saat ada perubahan

## 🔍 Troubleshooting

### Notifikasi Install Tidak Muncul?

1. Pastikan website diakses via HTTPS (atau localhost)
2. Pastikan icon sudah di-generate dan ada di folder `public/`
3. Clear cache browser dan reload
4. Cek Console browser untuk error

### Service Worker Tidak Terdaftar?

1. Buka DevTools → Application → Service Workers
2. Pastikan `sw.js` terdaftar
3. Jika error, cek Console untuk detail error

### Icon Tidak Muncul?

1. Pastikan file `icon-192.png` dan `icon-512.png` ada di `public/`
2. Clear cache dan reload
3. Cek Network tab untuk memastikan icon ter-load

## 📚 Resources

- [PWA Documentation](https://web.dev/progressive-web-apps/)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)

---

**Catatan:** Setelah generate icon, website sudah siap untuk di-deploy dan bisa diinstall di semua device!
