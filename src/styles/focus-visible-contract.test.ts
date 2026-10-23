import * as fs from 'fs';
import * as path from 'path';

/**
 * DMNC-1436: In Tailwind v4, `outline-none` sets --tw-outline-style: none, so
 * `focus-visible:outline-2` alone never renders a ring. A file combining the two
 * must also set `focus-visible:outline-solid`.
 */
function walk(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return walk(p);
    return /\.tsx$/.test(e.name) && !/\.(test|stories)\.tsx$/.test(e.name) ? [p] : [];
  });
}

describe('focus-visible outline contract', () => {
  it('no component pairs outline-none with focus-visible:outline-2 without outline-solid', () => {
    const root = path.resolve(__dirname, '../components');
    const offenders = walk(root).filter((f) => {
      const src = fs.readFileSync(f, 'utf8');
      return (
        src.includes('outline-none') &&
        src.includes('focus-visible:outline-2') &&
        !src.includes('focus-visible:outline-solid')
      );
    });
    expect(offenders.map((f) => path.relative(root, f))).toEqual([]);
  });
});
