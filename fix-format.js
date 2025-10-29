const fs = require('fs');

// Baca file data.json
const data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));

// Filter hanya soal yang lengkap
const validQuestions = data.filter(q => {
  const hasPilihan = q.pilihan && Object.keys(q.pilihan).length > 0;
  const hasJawaban = q.jawaban_benar && q.jawaban_benar.trim() !== '';
  return hasPilihan && hasJawaban;
});

// Urutkan ulang ID dan bersihkan format
validQuestions.forEach((question, index) => {
  question.id = index + 1;
  
  // Bersihkan soal dari line breaks yang tidak perlu
  if (question.soal) {
    question.soal = question.soal.replace(/\s+/g, ' ').trim();
  }
  
  // Bersihkan pilihan dari line breaks
  if (question.pilihan) {
    Object.keys(question.pilihan).forEach(key => {
      if (question.pilihan[key]) {
        question.pilihan[key] = question.pilihan[key].replace(/\s+/g, ' ').trim();
      }
    });
  }
  
  // Bersihkan penjelasan
  if (question.penjelasan) {
    question.penjelasan = question.penjelasan.replace(/\s+/g, ' ').trim();
  }
});

// Tulis kembali dengan format compact untuk pilihan
fs.writeFileSync('./data.json', JSON.stringify(validQuestions, null, 2), 'utf-8');

console.log(`✅ Selesai! Total soal: ${validQuestions.length}`);
console.log(`✅ Format pilihan sudah diperbaiki (semua dalam 1 baris)`);
