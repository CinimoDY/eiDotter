import * as fs from 'fs';
import * as path from 'path';

/**
 * DMNC-1436: In Tailwind v4, `outline-none` sets --tw-outline-style: none, so
 * `focus-visible:outline-2` alone never renders a ring. Every class string that
 * sets a focus-visible outline width must also set the outline style in the
 * same string, so the ring survives an `outline-none` elsewhere in the
 * element's className.
 *
 * Checked per string literal (not per file): a file-wide substring check
 * passed as long as *some* element in the file had `outline-solid`.
 */
function walk(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return walk(p);
    return /\.tsx$/.test(e.name) && !/\.(test|stories)\.tsx$/.test(e.name) ? [p] : [];
  });
}

// Focus-visible outline width: `outline` or `outline-<n>`, not
// `outline-offset-*`, `outline-<colour>`, or `outline-none`.
const FOCUS_OUTLINE_WIDTH =
  /(?:^|[\s'"`])(focus-visible|data-\[focus-visible\]|data-focus-visible):outline(?:-\d+)?(?![\w-])/g;
const STRING_LITERAL = /'(?:[^'\\\n]|\\.)*'|"(?:[^"\\\n]|\\.)*"|`(?:[^`\\]|\\.)*`/g;

function findOffenders(src: string): string[] {
  const offenders: string[] = [];
  for (const [literal] of src.matchAll(STRING_LITERAL)) {
    for (const m of literal.matchAll(FOCUS_OUTLINE_WIDTH)) {
      const variant = m[1].replace(/[[\]]/g, '\\$&');
      const style = new RegExp(`(?:^|[\\s'"\`])${variant}:outline-(solid|dashed|dotted|double)(?![\\w-])`);
      if (!style.test(literal)) offenders.push(literal);
    }
  }
  return offenders;
}

describe('focus-visible outline contract', () => {
  it('flags a focus-visible outline width without an outline style in the same string', () => {
    expect(findOffenders(`'focus-visible:outline-2 focus-visible:outline-offset-2'`)).toHaveLength(1);
    expect(findOffenders(`"data-[focus-visible]:outline focus-visible:outline-solid"`)).toHaveLength(1);
    expect(findOffenders(`'focus-visible:outline-2 focus-visible:outline-solid'`)).toEqual([]);
    expect(findOffenders(`'focus-visible:outline-offset-2 focus-visible:outline-dos-border-focus'`)).toEqual([]);
    expect(findOffenders(`'focus-visible:outline-none'`)).toEqual([]);
  });

  it('every component class string with a focus-visible outline width also sets its style', () => {
    const root = path.resolve(__dirname, '../components');
    const offenders = walk(root).flatMap((f) =>
      findOffenders(fs.readFileSync(f, 'utf8')).map((lit) => `${path.relative(root, f)}: ${lit}`),
    );
    expect(offenders).toEqual([]);
  });
});

/**
 * CSS-side focus rings (DMNC-1436 follow-up). These controls style focus in
 * their CSS file, not via Tailwind classes, so the string check above cannot
 * see them. Each must have a :focus-visible or [data-focus-visible] rule that
 * draws a solid outline in border-focus: a glow alone is transparent under
 * amber-paper and dropped in high contrast, and border-brand is 2.75:1 on the
 * light page.
 */
describe('CSS focus-ring contract', () => {
  const CASES: [file: string, block: string][] = [
    ['Input/components/Input.css', '.eidotter-input'],
    ['Select/components/Select.css', '.eidotter-select__trigger'],
    ['Accordion/components/Section.css', '.eidotter-section__header'],
    ['IconButton/components/IconButton.css', '.eidotter-icon-button'],
    ['TimelineContainer/components/TimelineContainer.css', '.eidotter-timeline-container__load-more'],
    ['TimelineContainer/components/MasterDetailLayout.css', '.eidotter-timeline-md__back'],
    ['Header/components/Header.css', '.eidotter-header__branding'],
  ];
  const OUTLINE = /(?:^|[\s;])outline:\s*\d+px\s+solid\s+var\(--color-semantic-border-focus\)/;

  it.each(CASES)('%s: %s has a border-focus outline on focus-visible', (file, block) => {
    const css = fs
      .readFileSync(path.resolve(__dirname, '../components', file), 'utf8')
      .replace(/\/\*[\s\S]*?\*\//g, '');
    const focusSelectors = [`${block}:focus-visible`, `${block}[data-focus-visible]`];
    const rules = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].filter((m) =>
      m[1].split(',').some((s) => focusSelectors.includes(s.trim())),
    );
    expect(rules.length).toBeGreaterThan(0);
    expect(rules.some((m) => OUTLINE.test(m[2]))).toBe(true);
    // No focus rule for this control may switch the outline off.
    expect(rules.filter((m) => /outline:\s*none/.test(m[2])).map((m) => m[1].trim())).toEqual([]);
  });
});
