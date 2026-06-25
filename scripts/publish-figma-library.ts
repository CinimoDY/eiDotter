/**
 * Publish the eiDotter Web DS Figma library so consuming files can pick up component updates.
 * This publishes the shared component library for subscribers (e.g., app design files).
 *
 * Usage: FIGMA_ACCESS_TOKEN=$(op read "op://Personal/Figma API Key/credential") npm run publish-figma-library
 */

const FIGMA_ACCESS_TOKEN = process.env.FIGMA_ACCESS_TOKEN;
const FIGMA_WEB_DS_KEY = 'iohPpta7n73wCcP5xbsaJU'; // eiDotter Web DS

if (!FIGMA_ACCESS_TOKEN) {
  console.error('❌ Missing FIGMA_ACCESS_TOKEN');
  console.error('Set it via: FIGMA_ACCESS_TOKEN=$(op read "op://Personal/Figma API Key/credential")');
  process.exit(1);
}

console.log('📢 Publishing eiDotter Web DS library...');
console.log(`   File key: ${FIGMA_WEB_DS_KEY}`);

const response = await fetch(`https://api.figma.com/v1/files/${FIGMA_WEB_DS_KEY}/publish`, {
  method: 'POST',
  headers: {
    'X-FIGMA-TOKEN': FIGMA_ACCESS_TOKEN,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({}),
});

if (!response.ok) {
  console.error(`❌ Figma API error: ${response.status} ${response.statusText}`);
  const text = await response.text();
  console.error('Response:', text);
  process.exit(1);
}

const result = await response.json();
console.log('✅ Library published successfully');
console.log(`   Version: ${result.version}`);
console.log(`   Description: ${result.description || '(no description)'}`);
console.log('✨ All subscribers can now access the updated components');
