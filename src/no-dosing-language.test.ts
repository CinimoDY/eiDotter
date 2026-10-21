/**
 * Guard (R20, KD2): health-family source, stories, fixtures, helpers and guidelines
 * must never contain dosing advice. Scope is deliberately narrow; a repo-wide scan
 * would false-positive on unrelated copy.
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'fs';
import { join, relative } from 'path';

const root = join(__dirname, '..');

const FORBIDDEN: RegExp[] = [
  /\bbolus (now|advice|this)\b/i,
  /\bunits? to take\b/i,
  /\bcorrect with\b/i,
  /\bdose now\b/i,
  /\btake \d+ ?(u|units)\b/i,
];

const SCAN_DIRS = [
  'src/components/Gauge',
  'src/components/Meter',
  'src/components/RangeBar',
  'src/components/SeriesBars',
  'src/components/DecayStrip',
  'src/components/VitalsStrip',
  'src/fixtures',
  'src/utils/health',
];

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

function targets(): string[] {
  const files = SCAN_DIRS.flatMap((d) => {
    const abs = join(root, d);
    if (!existsSync(abs)) throw new Error(`Scanned directory missing: ${d}`);
    return walk(abs);
  });
  const guidelines = join(root, 'guidelines');
  readdirSync(guidelines)
    .filter((n) => /^health-.*\.md$/.test(n))
    .forEach((n) => files.push(join(guidelines, n)));
  return files;
}

describe('no dosing language in health family', () => {
  const files = targets();

  it('scans a non-trivial file set', () => {
    expect(files.length).toBeGreaterThan(10);
  });

  it('contains no dosing phrases', () => {
    const hits: string[] = [];
    for (const file of files) {
      const text = readFileSync(file, 'utf8');
      for (const re of FORBIDDEN) {
        const m = text.match(re);
        if (m) hits.push(`${relative(root, file)}: "${m[0]}" (${re})`);
      }
    }
    expect(hits).toEqual([]);
  });
});
