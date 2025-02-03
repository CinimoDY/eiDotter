const fs = require('fs');
const path = require('path');

// Create public/icons directory if it doesn't exist
const publicIconsDir = path.join(__dirname, '../public/icons');
if (!fs.existsSync(publicIconsDir)) {
  fs.mkdirSync(publicIconsDir, { recursive: true });
}

// Copy sprites.svg to public/icons
const spritesSource = path.join(__dirname, '../src/assets/icons/sprites.svg');
const spritesTarget = path.join(publicIconsDir, 'sprites.svg');
fs.copyFileSync(spritesSource, spritesTarget);

console.log('✅ Assets copied successfully'); 