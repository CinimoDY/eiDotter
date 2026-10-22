/**
 * Guard (R20, KD2): health-family source, stories, tests, fixtures, helpers and
 * guidelines must never contain dosing advice, clinical units or date-of-birth-like
 * strings. Scope is deliberately narrow; a repo-wide scan would false-positive on
 * unrelated copy.
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'fs';
import { join, relative } from 'path';

const root = join(__dirname, '..');

/**
 * Shape-level patterns: an action verb paired with a quantity, a quantity paired
 * with an insulin noun, or a dosing noun phrase. Kept tight so neutral copy
 * ("sample units", "unit mismatch") does not trip them.
 */
const FORBIDDEN: RegExp[] = [
  /\b(take|inject|bolus|give|administer|correct)\b[^.\n]{0,24}?\b(\d+([.,]\d+)?|one|two|three|half)\s*(u|iu|units?)\b/i,
  /\b(units?|iu)\s+(of\s+)?(insulin|bolus)\b/i,
  /\bcorrection (dose|bolus)\b/i,
  /\b(bolus|dose)\s+(now|this|\d)/i,
  /\bunits? to take\b/i,
  /\bcorrect with\b/i,
];

/** Phrases the guard must catch; a self-test so the patterns cannot silently go lax. */
const MUST_CATCH = [
  'Bolus 2 units before the meal',
  'take 2.5 units',
  'inject 3 units',
  'Take two units now',
  'correction bolus of 1 unit',
];

/** Clinical units never belong in health-family code, tests, stories or docs. */
const CLINICAL_UNITS = /mg\/dL|mmol/i;

/**
 * Date-of-birth-like strings (ISO calendar dates). Checked in code files only:
 * guideline markdown legitimately cites dated sources.
 */
const DOB_LIKE = /\b(19|20)\d\d-\d\d-\d\d\b/;
const CODE_FILE = /\.(ts|tsx|js|jsx|mjs|cjs)$/;

const SCAN_DIRS = [
  'src/components/Gauge',
  'src/components/Meter',
  'src/components/RangeBar',
  'src/components/SeriesBars',
  'src/components/DecayStrip',
  'src/components/VitalsStrip',
  'src/components/Stat',
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
  for (const doc of ['CONCEPTS.md', 'guidelines/components.md']) {
    const abs = join(root, doc);
    if (!existsSync(abs)) throw new Error(`Scanned file missing: ${doc}`);
    files.push(abs);
  }
  return files;
}

describe('dosing-language patterns', () => {
  it.each(MUST_CATCH)('catches "%s"', (phrase) => {
    expect(FORBIDDEN.some((re) => re.test(phrase))).toBe(true);
  });
});

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

  it('contains no clinical units', () => {
    const hits = files
      .filter((file) => CLINICAL_UNITS.test(readFileSync(file, 'utf8')))
      .map((file) => relative(root, file));
    expect(hits).toEqual([]);
  });

  it('contains no date-of-birth-like strings in code files', () => {
    const hits = files
      .filter((file) => CODE_FILE.test(file))
      .flatMap((file) => {
        const m = readFileSync(file, 'utf8').match(DOB_LIKE);
        return m ? [`${relative(root, file)}: "${m[0]}"`] : [];
      });
    expect(hits).toEqual([]);
  });
});
