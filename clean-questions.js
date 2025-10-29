const fs = require('fs');

// Baca file data.json
const data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));

// Filter hanya soal yang lengkap (punya pilihan dan jawaban)
const validQuestions = data.filter(q => {
  // Cek apakah pilihan tidak kosong
  const hasPilihan = q.pilihan && Object.keys(q.pilihan).length > 0;
  // Cek apakah jawaban_benar tidak kosong
  const hasJawaban = q.jawaban_benar && q.jawaban_benar.trim() !== '';
  
  return hasPilihan && hasJawaban;
});

// Urutkan ulang ID dari 1
validQuestions.forEach((question, index) => {
  question.id = index + 1;
});

// Tulis kembali ke file
fs.writeFileSync('./data.json', JSON.stringify(validQuestions, null, 2), 'utf-8');

console.log(`✅ Berhasil membersihkan soal!`);
console.log(`📊 Total soal valid: ${validQuestions.length} dari ${data.length} soal`);
console.log(`🗑️ Soal tidak lengkap yang dihapus: ${data.length - validQuestions.length} soal`);
