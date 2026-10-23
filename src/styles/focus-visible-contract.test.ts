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
