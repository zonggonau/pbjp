const fs = require('fs');

// Baca file data.json
const data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));

// Urutkan ulang ID dari 1 sampai jumlah total soal
data.forEach((question, index) => {
  question.id = index + 1;
});

// Tulis kembali ke file dengan format yang rapi
fs.writeFileSync('./data.json', JSON.stringify(data, null, 2), 'utf-8');

console.log(`✅ Berhasil mengurutkan ulang ${data.length} soal dengan ID dari 1 sampai ${data.length}`);
