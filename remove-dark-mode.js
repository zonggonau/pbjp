const fs = require('fs');
const path = require('path');

const files = [
    'app/page.tsx',
    'app/latihan/page.tsx',
    'app/quiz/page.tsx',
    'app/result/page.tsx',
    'app/review/page.tsx',
    'app/history/page.tsx',
    'app/materi/page.tsx',
    'app/certificate/page.tsx'
];

files.forEach(file => {
    const filePath = path.join(__dirname, file);

    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');

        // Remove all dark: prefixed classes
        content = content.replace(/\s+dark:[a-zA-Z0-9_\-\/]+/g, '');

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Updated: ${file}`);
    } else {
        console.log(`⚠️  Not found: ${file}`);
    }
});

console.log('\n✨ Dark mode classes removed from all files!');
