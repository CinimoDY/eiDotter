/**
 * Heading family guard (DMNC-1643 PR F).
 *
 * Two font-family roles since PR F:
 * - `--typography-font-family-heading` (Tailwind `font-dos-heading`): real
 *   headings, display numbers and the brand. Always the display face
 *   (Perfect DOS VGA 437), in every theme.
 * - `--typography-font-family-primary` (Tailwind `font-dos`): every other
 *   component text. The display face too, except where a theme points it at
 *   the body face (dos-86 does: JetBrains Mono everywhere except headings).
 *
 * The rule for "is it a heading", from the one-body-size plan: if it is not an
 * h1 to h6 (or role="heading") and not a display number, it is body text. The
 * brand wordmark and the DosWindow / DosDialog strip titles are listed on
 * purpose (the brief names them); Terminal and CommandPrompt read the heading
 * family for their bitmap face (legacy pattern), not because they are headings.
 *
 * The test scans component source and dos-utilities.css (stories, tests and
 * MDX excluded) and fails on any use of the heading family outside ALLOWLIST.
 * Entries are `file:line` so a moved or new use needs a deliberate review; a
 * stale entry fails too, so the list stays short and true.
 */
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative, resolve } from 'path';

const SRC = resolve(__dirname, '..');

/** `file:line` (relative to src/) → why the heading family is allowed. */
const ALLOWLIST: Record<string, string> = {
  'styles/dos-utilities.css:41': 'heading: .dos-hero and .dos-h1 to .dos-h5',
  'components/SectionHeading/components/SectionHeading.tsx:46': 'heading: renders an <h3>',
  'components/PageShell/components/PageShell.css:91': 'heading: the page <h1>',
  'components/PageShell/components/PageShell.css:158': 'heading: PageSection <h2>-<h4>',
  'components/DosWindow/components/DosWindow.css:53': 'heading: window strip marker and title (Card, Bench and DosFigure titles too)',
  'components/DosDialog/components/DosDialog.css:112': 'heading: dialog strip marker and <h2> title (Modal, Lightbox, CmdPalette)',
  'components/LegalPage/components/LegalPage.css:58': 'heading: LegalPage hero <h1>',
  'components/LegalPage/components/LegalPage.css:81': 'heading: LegalPage body <h2>',
  'components/TimelinePage/components/TimelinePage.css:87': 'heading: year group <h2>',
  'components/TimelinePage/components/TimelinePage.css:128': 'heading: entry title <h3>',
  'components/Stat/components/Stat.tsx:96': 'display number: the Stat value',
  'components/Gauge/components/Gauge.tsx:214': 'display number: the ring value',
  'components/VitalsStrip/components/VitalsStrip.css:34': 'display number: the tile value',
  'components/Brand/components/Wordmark.tsx:25': 'brand: the wordmark (BrandLockup composes it)',
  'components/Header/components/Header.css:32': 'brand: the Header brand lockup link',
  'components/Terminal/components/Terminal.css:18': 'Terminal/CommandPrompt bitmap face (legacy pattern)',
  'components/CommandPrompt/components/CommandPrompt.css:3': 'Terminal/CommandPrompt bitmap face (legacy pattern)',
};

const HEADING_FAMILY = /--typography-font-family-heading|font-dos-heading/;

function sourceFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (entry === '__tests__') continue;
      out.push(...sourceFiles(full));
    } else if (/\.(tsx?|css)$/.test(entry) && !/\.(stories|test)\.(tsx?|css)$/.test(entry)) {
      out.push(full);
    }
  }
  return out;
}

const hits = new Map<string, string>();
for (const file of [...sourceFiles(join(SRC, 'components')), join(SRC, 'styles', 'dos-utilities.css')]) {
  const rel = relative(SRC, file).split('\\').join('/');
  readFileSync(file, 'utf8')
    .split(/\r?\n/)
    .forEach((line, i) => {
      // Comments that only mention the family are not uses.
      const code = line.replace(/\/\*.*?\*\/|\/\/.*$/g, '');
      if (HEADING_FAMILY.test(code)) hits.set(`${rel}:${i + 1}`, line.trim());
    });
}

describe('heading family (DMNC-1643 PR F)', () => {
  it('is used only on allowlisted heading, display-number, brand and bitmap lines', () => {
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
      expect(`${key}: ${reason.trim()}`).toMatch(/: (heading|display number|brand|Terminal)/);
    }
  });

  it('no component CSS declares the display face by name (it must come through a family token)', () => {
    const named = sourceFiles(join(SRC, 'components'))
      .filter((f) => f.endsWith('.css'))
      .flatMap((f) =>
        readFileSync(f, 'utf8')
          .replace(/\/\*[\s\S]*?\*\//g, '')
          .split(/\r?\n/)
          .filter((l) => /font-family:[^;]*Perfect DOS/.test(l))
          .map((l) => `${relative(SRC, f)}  ${l.trim()}`),
      );
    expect(named).toEqual([]);
  });
});
