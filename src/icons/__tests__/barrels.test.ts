/**
 * Smoke tests for the generated icon barrels.
 * These tests catch build regressions where the generator produced invalid
 * exports or the published manifest drifted away from existing components.
 */
import fs from 'node:fs';
import path from 'node:path';

const ICONS_DIR = path.resolve(__dirname, '..');
const COMPONENTS_DIR = path.join(ICONS_DIR, 'components');

describe('icon barrels', () => {
  it('src/icons/components contains at least the curated manifest', () => {
    // Fresh clones / CI only have the curated set (~43); the maintainer's local
    // env has the full 1,172-icon Figma catalog. Either is valid — what matters
    // is the manifest is fully backed by files.
    const manifest: string[] = JSON.parse(
      fs.readFileSync(path.join(ICONS_DIR, 'published.manifest.json'), 'utf8'),
    );
    const files = fs.readdirSync(COMPONENTS_DIR).filter(f => f.endsWith('.tsx'));
    expect(files.length).toBeGreaterThanOrEqual(manifest.length);
  });

  it('full barrel re-exports every component in components/', () => {
    const barrel = fs.readFileSync(path.join(ICONS_DIR, 'index.ts'), 'utf8');
    const files = fs.readdirSync(COMPONENTS_DIR)
      .filter(f => f.endsWith('.tsx'))
      .map(f => f.replace(/\.tsx$/, ''));
    const missing = files.filter(name => !barrel.includes(`./components/${name}.js`));
    expect(missing).toEqual([]);
  });

  it('published manifest only references real components', () => {
    const manifest: string[] = JSON.parse(
      fs.readFileSync(path.join(ICONS_DIR, 'published.manifest.json'), 'utf8'),
    );
    const files = new Set(
      fs.readdirSync(COMPONENTS_DIR)
        .filter(f => f.endsWith('.tsx'))
        .map(f => f.replace(/\.tsx$/, '')),
    );
    const missing = manifest.filter(name => !files.has(name));
    expect(missing).toEqual([]);
  });

  it('every barrel export uses explicit .js extension (Node ESM safe)', () => {
    for (const barrelFile of ['index.ts', 'published.ts']) {
      const content = fs.readFileSync(path.join(ICONS_DIR, barrelFile), 'utf8');
      const badImports = [...content.matchAll(/from '([^']+)'/g)]
        .map(m => m[1])
        .filter(p => p.startsWith('./') && !p.endsWith('.js'));
      expect(badImports).toEqual([]);
    }
  });
});
