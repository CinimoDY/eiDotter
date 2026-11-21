/**
 * Publishing-boundary guard for the built Storybook (DMNC-1652).
 *
 * The Storybook output is public (storybook.eidotter.com, and the tracked
 * `docs/` folder). `scripts/check-storybook-output.mjs` runs at the end of
 * `npm run build-storybook` and must fail when the output carries a machine
 * path, a dumped environment, or the value of a secret.
 *
 *  A. The script: clean output passes; each kind of leak fails; a matched
 *     secret value is never printed.
 *  B. The config: `.storybook/main.js` defines `process.env` from named keys,
 *     never from a copy of the build machine's environment.
 *  C. The wrapper behind `npm run build-storybook` checks the folder that
 *     was built, also when a caller names another one.
 *  D. The tracked `docs/` folder passes the check.
 */
import { spawnSync } from 'child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join, resolve } from 'path';

const ROOT = resolve(__dirname, '../..');
const SCRIPT = resolve(ROOT, 'scripts/check-storybook-output.mjs');

function run(dir: string, env: Record<string, string> = {}) {
  const result = spawnSync(process.execPath, [SCRIPT, dir], {
    cwd: ROOT,
    encoding: 'utf8',
    // A fixed, small environment: the check reads secret values from it.
    env: { PATH: process.env.PATH ?? '', ...env },
  });
  return { status: result.status, output: `${result.stdout}${result.stderr}` };
}

describe('check-storybook-output', () => {
  let dir: string;

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'storybook-output-'));
    mkdirSync(join(dir, 'assets'));
    writeFileSync(join(dir, 'index.html'), '<!doctype html><title>eiDotter</title>');
    writeFileSync(join(dir, 'assets/iframe.js'), 'const env={NODE_ENV:`production`};');
  });

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  it('passes output that carries only the allowlisted key', () => {
    const { status, output } = run(dir);
    expect(output).toContain('carries no machine paths');
    expect(status).toBe(0);
  });

  it.each([
    ['a Linux home path', 'const p=`/home/someone/work/pkg/package.json`;', 'home path (/home/<user>/)'],
    ['a macOS home path', 'const p="/Users/someone/dev/pkg";', 'home path (/Users/<user>/)'],
    ['a drive mount path', 'const p="/mnt/d/Coding/pkg";', 'drive mount path'],
    ['a Windows home path', 'const p="C:\\\\Users\\\\someone\\\\dev";', 'home path (C:'],
    ['a dumped npm environment', 'const e={npm_lifecycle_event:`build-storybook`};', 'npm_lifecycle_event'],
    ['a dumped CI environment', 'const e={GITHUB_WORKSPACE:`x`};', 'GITHUB_WORKSPACE'],
    ['a secret variable name', 'const e={GITHUB_TOKEN:``};', 'GITHUB_TOKEN'],
  ])('fails on %s', (_label, source, rule) => {
    writeFileSync(join(dir, 'assets/iframe.js'), source);
    const { status, output } = run(dir);
    expect(status).toBe(1);
    expect(output).toContain('assets/iframe.js');
    expect(output).toContain(rule);
  });

  it('fails on the value of a secret from the environment, without printing it', () => {
    const secret = 'not-a-real-secret-0123456789';
    writeFileSync(join(dir, 'assets/iframe.js'), `const e={A:\`${secret}\`};`);
    const { status, output } = run(dir, { SOME_SERVICE_API_KEY: secret });
    expect(status).toBe(1);
    expect(output).toContain('value of SOME_SERVICE_API_KEY');
    expect(output).not.toContain(secret);
  });

  it('ignores short secret values, which would match unrelated text', () => {
    writeFileSync(join(dir, 'assets/iframe.js'), 'const mode=`production`;');
    const { status } = run(dir, { BUILD_KEY: 'production' });
    expect(status).toBe(0);
  });

  it('does not treat a longer identifier as a known variable name', () => {
    writeFileSync(join(dir, 'assets/iframe.js'), 'const MY_GITHUB_TOKEN_LABEL=1;');
    const { status } = run(dir);
    expect(status).toBe(0);
  });

  it('skips binary assets', () => {
    writeFileSync(join(dir, 'assets/font.woff2'), '/home/someone/font');
    const { status } = run(dir);
    expect(status).toBe(0);
  });

  it('exits 2 when the folder does not exist', () => {
    const { status, output } = run(join(dir, 'missing'));
    expect(status).toBe(2);
    expect(output).toContain('is not a directory');
  });
});

describe('.storybook/main.js process.env define', () => {
  const source = readFileSync(resolve(ROOT, '.storybook/main.js'), 'utf8');

  it('never copies the build environment', () => {
    expect(source).not.toMatch(/Object\.(entries|keys|assign|fromEntries)\([^)]*process\.env/);
    expect(source).not.toMatch(/\.\.\.\s*process\.env/);
    expect(source).not.toMatch(/JSON\.stringify\(\s*process\.env\s*\)/);
  });

  it('defines process.env from the allowlist', () => {
    expect(source).toContain("'process.env': JSON.stringify(publicEnv)");
  });
});

describe('build-storybook wrapper', () => {
  const WRAPPER = resolve(ROOT, 'scripts/build-storybook.mjs');

  // Callers append arguments (Chromatic passes its own output folder); the
  // check has to run on the folder that was actually built.
  it('reads the output folder from forwarded arguments', () => {
    const cases = [
      [],
      ['-o', 'out-a'],
      ['--output-dir', 'out-b', '--stats-json', 'stats'],
      ['--stats-json', 'stats', '--output-dir=out-c'],
    ];
    const program = `
      import { outputDirFrom } from ${JSON.stringify(`file://${WRAPPER}`)};
      console.log(JSON.stringify(${JSON.stringify(cases)}.map((args) => outputDirFrom(args) ?? null)));
    `;
    const result = spawnSync(process.execPath, ['--input-type=module', '-e', program], {
      cwd: ROOT,
      encoding: 'utf8',
    });
    expect(result.stderr).toBe('');
    expect(JSON.parse(result.stdout)).toEqual([null, 'out-a', 'out-b', 'out-c']);
  });

  it('is what `npm run build-storybook` runs', () => {
    const pkg = JSON.parse(readFileSync(resolve(ROOT, 'package.json'), 'utf8'));
    expect(pkg.scripts['build-storybook']).toBe('node scripts/build-storybook.mjs');
  });
});

describe('tracked Storybook build (docs/)', () => {
  const docs = resolve(ROOT, 'docs');
  // `docs/` is tracked today; if it stops being tracked there is nothing to check.
  (existsSync(join(docs, 'iframe.html')) ? it : it.skip)('passes the check', () => {
    const { status, output } = run(docs);
    expect(output).toContain('carries no machine paths');
    expect(status).toBe(0);
  });
});
