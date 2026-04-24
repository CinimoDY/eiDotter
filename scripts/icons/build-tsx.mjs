/**
 * Transforms cached Figma SVGs into per-icon TSX components.
 * Reads:  scripts/icons/.cache/svgs.json  (from fetch-svgs.mjs)
 * Writes: src/icons/components/<name>.tsx  (1 file per icon)
 *         scripts/icons/.cache/manifest.json  (name/Pascal/category index)
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const CACHE = path.join(__dirname, '.cache');
const OUT_DIR = path.join(ROOT, 'src/icons/components');

const svgsPath = path.join(CACHE, 'svgs.json');
if (!fs.existsSync(svgsPath)) {
  throw new Error(`${svgsPath} missing — run \`npm run fetch-icons\` first`);
}
const SVGS = JSON.parse(fs.readFileSync(svgsPath, 'utf8'));

fs.mkdirSync(OUT_DIR, { recursive: true });

/** kebab-case → PascalCase; numbers preserved (e.g. "bar-chart-01" → "BarChart01"). */
const toPascal = name =>
  name.split(/[-_]/).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');

/** Extract all <path d="…"/> attributes from an SVG string. */
const extractPaths = svg =>
  [...svg.matchAll(/<path\s+([^>]*?)\/?>/g)]
    .map(m => m[1].match(/d="([^"]+)"/)?.[1])
    .filter(Boolean);

let written = 0;
const names = [];

for (const [name, { svg, cat }] of Object.entries(SVGS)) {
  const paths = extractPaths(svg);
  if (paths.length === 0) { console.warn(`no paths in ${name}`); continue; }
  const Pascal = toPascal(name);
  const pathEls = paths.map(d => `    <path d="${d}" />`).join('\n');
  const tsx = `import type { FC } from 'react';
import type { IconSvgProps } from '../types.js';

export const ${Pascal}: FC<IconSvgProps> = ({ size = 24, title, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    role={title ? 'img' : undefined}
    aria-hidden={title ? undefined : true}
    {...props}
  >
    {title ? <title>{title}</title> : null}
${pathEls}
  </svg>
);
`;
  fs.writeFileSync(path.join(OUT_DIR, `${name}.tsx`), tsx);
  names.push({ name, Pascal, cat });
  written++;
}

fs.writeFileSync(path.join(CACHE, 'manifest.json'), JSON.stringify(names, null, 2));
console.log(`Wrote ${written} TSX files to ${path.relative(ROOT, OUT_DIR)}`);
