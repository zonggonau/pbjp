#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json
import re

def parse_soal_txt(filepath):
    """Parse soal.txt dan konversi ke format JSON"""
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Split by question numbers (looking for patterns like "1. ", "2. ", etc.)
    # But be careful with sub-numbering in explanations
    questions = []
    current_soal = None
    current_id = 0
    lines = content.split('\n')
    
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        
        # Check if this is a new question (starts with number followed by period and tab/space)
        match = re.match(r'^(\d+)\.\s+(.+)', line)
        if match and not line.startswith('1. Tenaga'):  # Skip numbered lists in explanations
            # Save previous question if exists
            if current_soal:
                questions.append(current_soal)
            
            # Start new question
            current_id = int(match.group(1))
            soal_text = match.group(2).strip()
            
            current_soal = {
                'id': current_id,
                'soal': soal_text,
                'pilihan': {},
                'jawaban_benar': '',
                'penjelasan': ''
            }
            i += 1
            continue
        
        # Check for answer choices (a., b., c., d.)
        if current_soal and re.match(r'^[a-d]\.\s+', line):
            key = line[0].upper()
            value = line[3:].strip()
            current_soal['pilihan'][key] = value
            i += 1
            continue
        
        # Check for correct answer line
        if current_soal and 'Jawaban yang benar adalah:' in line:
            match_ans = re.search(r'([a-d])\.', line)
            if match_ans:
                current_soal['jawaban_benar'] = match_ans.group(1).upper()
            i += 1
            continue
        
        # Collect penjelasan (skip headers like "Penjelasan", "Kenapa", "Kesimpulan")
        if current_soal and line and current_soal['jawaban_benar']:
            if not any(skip in line for skip in ['Penjelasan', 'Kenapa pilihan', 'Kesimpulan', 
                                                   'Pilihan', 'Alasan', '?', 'Jawaban yang benar']):
                if current_soal['penjelasan']:
                    current_soal['penjelasan'] += ' ' + line
                else:
                    current_soal['penjelasan'] = line
        
        i += 1
    
    # Add last question
    if current_soal:
        questions.append(current_soal)
    
    # Clean up and validate
    valid_questions = []
    for q in questions:
        if q['soal'] and len(q['pilihan']) == 4 and q['jawaban_benar']:
            # Clean penjelasan
            q['penjelasan'] = q['penjelasan'].strip()
            if not q['penjelasan']:
                q['penjelasan'] = f"Jawaban yang benar adalah {q['jawaban_benar']}."
            valid_questions.append(q)
    
    return valid_questions

def main():
    print("Membaca soal dari data/soal.txt...")
    questions = parse_soal_txt('data/soal.txt')
    
    print(f"Berhasil mem-parse {len(questions)} soal")
    print(f"ID soal: {questions[0]['id']} sampai {questions[-1]['id']}")
    
    # Write to data.json
    with open('data.json', 'w', encoding='utf-8') as f:
        json.dump(questions, f, indent=2, ensure_ascii=False)
    
    print(f"✅ Berhasil menulis {len(questions)} soal ke data.json")
    
    # Show sample
    if questions:
        print("\n📝 Contoh soal pertama:")
        print(f"ID: {questions[0]['id']}")
        print(f"Soal: {questions[0]['soal'][:100]}...")
        print(f"Pilihan: {list(questions[0]['pilihan'].keys())}")
        print(f"Jawaban: {questions[0]['jawaban_benar']}")

if __name__ == '__main__':
    main()
