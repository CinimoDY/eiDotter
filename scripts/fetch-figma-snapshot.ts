/**
 * Fetch and refresh figma-snapshots/web-ds.json from the Figma Web DS file.
 * This captures the current state of all components, variables, and pages.
 *
 * Usage: FIGMA_ACCESS_TOKEN=$(op read "op://Personal/Figma API Key/credential") npx ts-node scripts/fetch-figma-snapshot.ts
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';

const FIGMA_ACCESS_TOKEN = process.env.FIGMA_ACCESS_TOKEN;
const FIGMA_WEB_DS_KEY = 'iohPpta7n73wCcP5xbsaJU'; // eiDotter Web DS

if (!FIGMA_ACCESS_TOKEN) {
  console.error('❌ Missing FIGMA_ACCESS_TOKEN');
  console.error('Set it via: FIGMA_ACCESS_TOKEN=$(op read "op://Personal/Figma API Key/credential")');
  process.exit(1);
}

console.log('🔍 Fetching Figma file data for Web DS...');
console.log(`   File key: ${FIGMA_WEB_DS_KEY}`);

const response = await fetch(`https://api.figma.com/v1/files/${FIGMA_WEB_DS_KEY}`, {
  headers: {
    'X-FIGMA-TOKEN': FIGMA_ACCESS_TOKEN,
  },
});

if (!response.ok) {
  console.error(`❌ Figma API error: ${response.status} ${response.statusText}`);
  const text = await response.text();
  console.error('Response:', text);
  process.exit(1);
}

const fileData = await response.json();
console.log('✅ Fetched Figma file data');

// Get the directory where this script is located
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.resolve(__dirname, '../figma-snapshots/web-ds.json');

// Save to snapshot file
await fs.writeFile(outputPath, JSON.stringify(fileData, null, 2));
console.log(`✅ Saved snapshot to ${outputPath}`);

// Print summary
if (fileData.document) {
  console.log(`📊 File: ${fileData.name}`);
  console.log(`   Pages: ${fileData.document.children?.length || 0}`);

  // Count components
  let componentCount = 0;
  const countComponents = (node: any) => {
    if (node.type === 'COMPONENT_SET' || node.type === 'COMPONENT') {
      componentCount++;
    }
    if (node.children) {
      node.children.forEach(countComponents);
    }
  };
  fileData.document.children?.forEach(countComponents);
  console.log(`   Components: ${componentCount}`);

  // Count variables
  console.log(`   Variables: ${fileData.components?.length || 0}`);
}

console.log('✨ Snapshot refresh complete');
