/**
 * Generates the two barrel files by scanning src/icons/components/ at runtime.
 *   src/icons/index.ts     — full catalog of whatever .tsx files exist locally
 *                            (→ eidotter/icons/all)
 *   src/icons/published.ts — curated subset driven by published.manifest.json
 *                            (→ eidotter/icons)
 *
 * Scanning the filesystem (instead of trusting scripts/icons/.cache/manifest.json)
 * lets the committed state work without a Figma round-trip: CI / fresh clones
 * only have the curated set, so index.ts ends up equal to published.ts. On
 * Dom's machine, after `npm run fetch-icons && npm run generate-icons`, the
 * full 1,172-icon set shows up in components/ and index.ts reflects it.
 *
 * Also rewrites the CURATED-ICONS section of .gitignore so the curated files
 * stay checked in while the rest are ignored.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const ICONS_DIR = path.join(ROOT, 'src/icons');
const COMPONENTS_DIR = path.join(ICONS_DIR, 'components');
const GITIGNORE = path.join(ROOT, '.gitignore');

const BEGIN_MARKER = '# >>> BEGIN CURATED ICONS (auto-generated) <<<';
const END_MARKER = '# >>> END CURATED ICONS <<<';

/** kebab-case → PascalCase; numbers preserved (e.g. "bar-chart-01" → "BarChart01"). */
const toPascal = name =>
  name.split(/[-_]/).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');

const publishedListPath = path.join(ICONS_DIR, 'published.manifest.json');
if (!fs.existsSync(publishedListPath)) {
  throw new Error(`${publishedListPath} missing — create it with the curated icon list`);
}
const curated = JSON.parse(fs.readFileSync(publishedListPath, 'utf8'));

if (!fs.existsSync(COMPONENTS_DIR)) {
  throw new Error(`${COMPONENTS_DIR} missing — run \`npm run generate-icons\` first`);
}
const available = new Set(
  fs.readdirSync(COMPONENTS_DIR)
    .filter(f => f.endsWith('.tsx'))
    .map(f => f.replace(/\.tsx$/, '')),
);

// Full barrel — whatever is currently present in components/.
const fullEntries = [...available]
  .map(name => ({ name, Pascal: toPascal(name) }))
  .sort((a, b) => a.Pascal.localeCompare(b.Pascal));
const fullBarrel = [
  '// Auto-generated — do not edit manually.',
  '// Regenerate via `npm run generate-icons`.',
  `// Contains ${fullEntries.length} icons (matches src/icons/components/ on this machine).`,
  '// On fresh clones only the curated subset is present; run `npm run fetch-icons` first',
  '// to pull down the full 1,172-icon set from Figma.',
  '',
  `export type { IconComponent, IconSvgProps } from './types.js';`,
  '',
  ...fullEntries.map(({ Pascal, name }) => `export { ${Pascal} } from './components/${name}.js';`),
  '',
].join('\n');
fs.writeFileSync(path.join(ICONS_DIR, 'index.ts'), fullBarrel);

// Curated subset — only what's both in the manifest AND present on disk.
const curatedEntries = curated
  .filter(name => available.has(name))
  .map(name => ({ name, Pascal: toPascal(name) }));
const missing = curated.filter(name => !available.has(name));
if (missing.length) {
  console.warn(`Curated names not found in components/ (run \`npm run fetch-icons\` + \`npm run generate-icons\`): ${missing.join(', ')}`);
}

const publishedBarrel = [
  '// Auto-generated — do not edit manually.',
  '// Curated subset exposed as `eidotter/icons`.',
  '// Edit src/icons/published.manifest.json to add/remove; then `npm run generate-icons`.',
  '',
  `export type { IconComponent, IconSvgProps } from './types.js';`,
  '',
  ...curatedEntries.map(({ Pascal, name }) => `export { ${Pascal} } from './components/${name}.js';`),
  '',
].join('\n');
fs.writeFileSync(path.join(ICONS_DIR, 'published.ts'), publishedBarrel);

// Rewrite the CURATED-ICONS section of .gitignore so curated .tsx files stay
// tracked while the rest of components/ is ignored.
const unignoreLines = curated.map(name => `!src/icons/components/${name}.tsx`);
const curatedBlock = [
  BEGIN_MARKER,
  '# Curated icons stay in git; the rest of src/icons/components/ is ignored.',
  '# Edit src/icons/published.manifest.json then run `npm run generate-icons`.',
  ...unignoreLines,
  END_MARKER,
].join('\n');

let gitignore = fs.existsSync(GITIGNORE) ? fs.readFileSync(GITIGNORE, 'utf8') : '';
const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
if (gitignore.includes(BEGIN_MARKER) && gitignore.includes(END_MARKER)) {
  gitignore = gitignore.replace(
    new RegExp(`${escapeRegex(BEGIN_MARKER)}[\\s\\S]*?${escapeRegex(END_MARKER)}`),
    () => curatedBlock,
  );
} else {
  // First run — append the block
  if (gitignore && !gitignore.endsWith('\n')) gitignore += '\n';
  gitignore += `\n${curatedBlock}\n`;
}
fs.writeFileSync(GITIGNORE, gitignore);

console.log(`Wrote full barrel (${fullEntries.length} icons) → src/icons/index.ts`);
console.log(`Wrote curated barrel (${curatedEntries.length} icons) → src/icons/published.ts`);
console.log(`Synced ${curated.length} curated entries → .gitignore`);
if (missing.length) console.log(`  ${missing.length} manifest entries not yet generated: ${missing.join(', ')}`);
