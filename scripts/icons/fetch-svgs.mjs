/**
 * Fetches SVGs for every icon component in the eiDotter Icons Figma file.
 * Requires FIGMA_ACCESS_TOKEN in .env. File key is hardcoded.
 *
 * Run via: npm run fetch-icons
 * Output:  scripts/icons/.cache/svgs.json, scripts/icons/.cache/component-index.json
 *
 * Next step: npm run generate-icons  (transforms cached SVGs → TSX + barrels)
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const CACHE = path.join(__dirname, '.cache');
const FILE_KEY = 'IOnWrXPMSiF7Nn5irr6UYZ';
const PAGE_NAME = 'Line icons';

const envPath = path.join(ROOT, '.env');
if (!fs.existsSync(envPath)) throw new Error('.env file required (FIGMA_ACCESS_TOKEN=...)');
const envContent = fs.readFileSync(envPath, 'utf8');
const TOKEN = envContent.match(/FIGMA_ACCESS_TOKEN=(.+)/)?.[1]?.trim().replace(/^["']|["']$/g, '');
if (!TOKEN) throw new Error('FIGMA_ACCESS_TOKEN not set in .env');

fs.mkdirSync(CACHE, { recursive: true });

// 1. Fetch file metadata to find all COMPONENT nodes under the Line icons page.
console.log(`Fetching file metadata for ${FILE_KEY}…`);
const fileRes = await fetch(
  `https://api.figma.com/v1/files/${FILE_KEY}?depth=4`,
  { headers: { 'X-Figma-Token': TOKEN } },
);
if (!fileRes.ok) throw new Error(`Figma file API: HTTP ${fileRes.status}`);
const file = await fileRes.json();

const page = file.document.children.find(c => c.name === PAGE_NAME);
if (!page) throw new Error(`Page "${PAGE_NAME}" not found`);

const index = [];
function walkFrame(frame, catName) {
  if (!frame.children) return;
  for (const child of frame.children) {
    if (child.type === 'COMPONENT') index.push({ n: child.name, i: child.id, c: catName });
    else if (child.type === 'FRAME' || child.type === 'GROUP') walkFrame(child, catName);
  }
}
for (const frame of page.children) {
  if (frame.type === 'FRAME' && !frame.name.startsWith('__')) walkFrame(frame, frame.name);
}
console.log(`Found ${index.length} icon components across ${new Set(index.map(x => x.c)).size} categories`);
fs.writeFileSync(path.join(CACHE, 'component-index.json'), JSON.stringify(index));

// 2. Request SVG URLs in batches of 100.
const BATCH = 100;
const urls = {};
for (let i = 0; i < index.length; i += BATCH) {
  const chunk = index.slice(i, i + BATCH);
  const ids = chunk.map(x => x.i).join(',');
  const res = await fetch(
    `https://api.figma.com/v1/images/${FILE_KEY}?ids=${encodeURIComponent(ids)}&format=svg`,
    { headers: { 'X-Figma-Token': TOKEN } },
  );
  if (!res.ok) throw new Error(`Images API batch ${i}: HTTP ${res.status}`);
  const data = await res.json();
  if (data.err) throw new Error(`Images API error: ${data.err}`);
  Object.assign(urls, data.images);
  process.stdout.write(`  [${Math.min(i + BATCH, index.length)}/${index.length}] image URLs\r`);
}
console.log(`\n${Object.keys(urls).length} image URLs obtained`);

// 3. Download each SVG (concurrent).
const svgs = {};
const errors = [];
let done = 0;
const CONCURRENCY = 20;
for (let i = 0; i < index.length; i += CONCURRENCY) {
  const chunk = index.slice(i, i + CONCURRENCY);
  await Promise.all(chunk.map(async ({ n, i, c }) => {
    const url = urls[i];
    if (!url) { errors.push({ n, i, reason: 'no url' }); return; }
    const r = await fetch(url);
    if (!r.ok) { errors.push({ n, status: r.status }); return; }
    const svg = await r.text();
    // Collision handling: if two icons share a name across categories, suffix
    // the later one with the category. Figma's Line icons page has known dupes
    // (e.g. "colors" in Editor and Images).
    const key = svgs[n] ? `${n}__${c.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}` : n;
    svgs[key] = { svg, cat: c, origName: n };
    done++;
  }));
  process.stdout.write(`  [${done}/${index.length}] SVGs downloaded\r`);
}
console.log(`\nDownloaded ${Object.keys(svgs).length} SVGs (${errors.length} errors)`);
fs.writeFileSync(path.join(CACHE, 'svgs.json'), JSON.stringify(svgs));
if (errors.length) fs.writeFileSync(path.join(CACHE, 'errors.json'), JSON.stringify(errors, null, 2));
console.log(`Cached in ${CACHE}. Next: npm run generate-icons`);
