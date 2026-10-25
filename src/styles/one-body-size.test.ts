/**
 * One body size guard (DMNC-1579, 0.46.0).
 *
 * Every non-heading text in every component renders at the one body size,
 * `--typography-font-size-text-base` (16px, `text-dos-text-base`). The larger
 * body steps (`text-xs` 18px … `text-xl` 26px) are allowed only where the text
 * is a real heading (h1–h6), a display number, or Terminal/CommandPrompt
 * bitmap sizing. Display sizes (`text-dos-display-*`) and the em-relative named
 * exceptions are not matched here at all.
 *
 * The test scans component source (`.tsx`, `.ts`, `.css`; stories, tests and
 * MDX excluded) and fails on any use of a larger body step that is not in
 * ALLOWLIST below. Entries are `file:line` so a moved or new use needs a
 * deliberate review; a stale entry (no match on that line any more) fails too,
 * so the list stays short and true.
 */
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative, resolve } from 'path';

const SRC = resolve(__dirname, '..');
const COMPONENTS = join(SRC, 'components');

/** `file:line` (relative to src/) → why the larger size is allowed. */
const ALLOWLIST: Record<string, string> = {
  'components/SectionHeading/components/SectionHeading.tsx:46': 'heading: renders an <h3>',
  'components/LegalPage/components/LegalPage.css:58': 'heading: LegalPage hero <h1>',
  'components/LegalPage/components/LegalPage.css:80': 'heading: LegalPage body <h2>',
  'components/TimelinePage/components/TimelinePage.css:87': 'heading: year group <h2>',
  'components/TimelinePage/components/TimelinePage.css:127': 'heading: entry title <h3>',
  'components/DosDialog/components/DosDialog.css:100': 'heading: strip title is an <h2> (headingLevel) by default',
  'components/Gauge/components/Gauge.tsx:58': 'display number: the sm ring value',
  'components/VitalsStrip/components/VitalsStrip.css:19': 'display number: sm tile value on a narrow strip',
  'components/CommandPrompt/components/CommandPrompt.css:5': 'Terminal/CommandPrompt bitmap sizing (legacy pattern)',
};

const LARGER_BODY_STEP =
  /(?:text-dos-text-|--typography-font-size-text-)(?:xs|sm|md|lg|xl)(?![\w-])/;

function sourceFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (entry === '__tests__') continue;
      out.push(...sourceFiles(full));
    } else if (
      /\.(tsx?|css)$/.test(entry) &&
      !/\.(stories|test)\.(tsx?|css)$/.test(entry)
    ) {
      out.push(full);
    }
  }
  return out;
}

const hits = new Map<string, string>();
for (const file of sourceFiles(COMPONENTS)) {
  const rel = relative(SRC, file).split('\\').join('/');
  readFileSync(file, 'utf8')
    .split(/\r?\n/)
    .forEach((line, i) => {
      if (LARGER_BODY_STEP.test(line)) hits.set(`${rel}:${i + 1}`, line.trim());
    });
}

describe('one body size (DMNC-1579)', () => {
  it('uses a larger body step only on allowlisted heading / display lines', () => {
    const unexpected = [...hits]
      .filter(([key]) => !(key in ALLOWLIST))
      .map(([key, line]) => `${key}  ${line}`);
    expect(unexpected).toEqual([]);
  });

  it('has no stale allowlist entries', () => {
    const stale = Object.keys(ALLOWLIST).filter((key) => !hits.has(key));
    expect(stale).toEqual([]);
  });

  it('gives every allowlist entry a reason', () => {
    for (const [key, reason] of Object.entries(ALLOWLIST)) {
      expect(`${key}: ${reason.trim()}`).toMatch(/: (heading|display number|Terminal)/);
    }
  });
});
