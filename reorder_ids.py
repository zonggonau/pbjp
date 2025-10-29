import json

# Baca file data.json
with open('data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Urutkan ulang ID dari 1 sampai jumlah total soal
for index, question in enumerate(data, start=1):
    question['id'] = index

# Tulis kembali ke file dengan format yang rapi
with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Berhasil mengurutkan ulang {len(data)} soal dengan ID dari 1 sampai {len(data)}")
