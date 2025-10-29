const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, '../public/icon.svg');
const publicDir = path.join(__dirname, '../public');

async function generateIcons() {
  const svgBuffer = fs.readFileSync(svgPath);

  // Generate 192x192 icon
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'icon-192.png'));

  console.log('✅ Generated icon-192.png');

  // Generate 512x512 icon
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'icon-512.png'));

  console.log('✅ Generated icon-512.png');

  // Generate favicon
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon.ico'));

  console.log('✅ Generated favicon.ico');
}

generateIcons()
  .then(() => {
    console.log('🎉 All icons generated successfully!');
  })
  .catch((err) => {
    console.error('❌ Error generating icons:', err);
    process.exit(1);
  });
