# 📱 Website PBJP - Sekarang Bisa Diinstall!

Website Portal Pembelajaran PBJP sudah diubah menjadi **Progressive Web App (PWA)** yang bisa diinstall di HP dan laptop.

## 🎉 Fitur Baru

✅ **Install ke HP & Laptop** - Seperti aplikasi native  
✅ **Notifikasi Install Otomatis** - Muncul saat pertama kali buka website  
✅ **Offline Support** - Bisa dibuka tanpa internet (halaman yang sudah pernah dibuka)  
✅ **Fast Loading** - Caching membuat loading lebih cepat  
✅ **Icon di Home Screen** - Tampil seperti aplikasi asli  

## 🚀 Cara Install

### Di HP (Android/iOS)

1. Buka website di browser (Chrome/Safari)
2. **Notifikasi install akan muncul otomatis** di pojok kiri bawah
3. Klik **"Install Sekarang"**
4. Atau klik menu browser (⋮) → **"Add to Home Screen"**
5. Icon aplikasi akan muncul di home screen HP Anda

### Di Laptop/PC (Windows/Mac)

1. Buka website di Chrome/Edge
2. **Notifikasi install akan muncul otomatis** di pojok kiri bawah
3. Klik **"Install Sekarang"**
4. Atau klik icon install di address bar (sebelah kanan URL)
5. Aplikasi akan terbuka di window terpisah

## ⚠️ Langkah Penting Sebelum Deploy

**Generate Icon PWA terlebih dahulu:**

1. Buka file `public/generate-icons.html` di browser
2. Klik 3 tombol untuk download icon:
   - icon-192.png
   - icon-512.png  
   - favicon.ico
3. Simpan semua file ke folder `public/`

**Atau** gunakan icon custom Anda sendiri (ukuran 192x192 dan 512x512 px)

## 🧪 Testing

```bash
# Build dan jalankan production mode
npm run build
npm start

# Buka http://localhost:3000
# Notifikasi install akan muncul otomatis
```

## 📁 File PWA yang Ditambahkan

- `public/manifest.json` - Konfigurasi PWA
- `public/sw.js` - Service Worker
- `app/components/InstallPrompt.tsx` - Notifikasi install
- `app/layout.tsx` - Updated dengan metadata PWA
- `app/globals.css` - Animasi install prompt

## 📖 Dokumentasi Lengkap

Lihat `PWA-SETUP.md` untuk dokumentasi lengkap dan troubleshooting.

---

**Status:** ✅ PWA Ready (tinggal generate icon dan deploy!)
