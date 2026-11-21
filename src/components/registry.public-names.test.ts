/**
 * Public-names guard (DMNC-1643).
 *
 * eiDotter is a public repo with a public Storybook and a public npm package, so
 * a consumer list may name only the public sites. This guard is an ALLOWLIST of
 * permitted names, not a blocklist: a blocklist would have to spell every private
 * project name in this public file, which defeats the purpose. A new name fails
 * here until someone adds it to PERMITTED on purpose.
 *
 *  A. Structured data: `projects`, every `origin`, `consumers` and variant `usedBy`
 *     in the registry must be a permitted id.
 *  B. Rendering: `formatProvenanceLine` (the Storybook banner) prints only
 *     permitted names and drops the "Used by" part when there is nothing to list.
 *     The Storybook decorator must go through it rather than build its own line.
 *  C. Prose: every "Used by: ..." / "Used By" consumer list in tracked source,
 *     stories, MDX and top-level docs (and the llms.txt component table) may
 *     list only permitted names, reported as file:line. A line that must keep a
 *     non-permitted name goes in ALLOWLIST with a reason (keep it empty if possible).
 */
import { execFileSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { componentRegistry, formatProvenanceLine, projects } from './registry';

const ROOT = resolve(__dirname, '../..');

/** The only names a consumer list may carry: eiDotter itself and the public sites. */
const PERMITTED = new Set(['eidotter', 'rizomorf', 'dmnctech', 'eidotter-home', 'dmnc-online']);

/** `file:line` (relative to the repo root) -> why a non-permitted name may stay. */
const ALLOWLIST: Record<string, string> = {};

describe('public names: registry data', () => {
  it('projects only names permitted ids', () => {
    expect(Object.keys(projects).filter((id) => !PERMITTED.has(id))).toEqual([]);
  });

  it('every origin, consumer and variant usedBy is permitted', () => {
    const bad: string[] = [];
    for (const [name, meta] of Object.entries(componentRegistry)) {
      if (!PERMITTED.has(meta.origin)) bad.push(`${name}.origin=${meta.origin}`);
      for (const id of meta.consumers) if (!PERMITTED.has(id)) bad.push(`${name}.consumers=${id}`);
      for (const [variant, v] of Object.entries(meta.variants ?? {})) {
        for (const id of v.usedBy ?? []) if (!PERMITTED.has(id)) bad.push(`${name}.${variant}.usedBy=${id}`);
      }
    }
    expect(bad).toEqual([]);
  });
});

describe('public names: provenance banner', () => {
  it('prints only permitted names and never a dangling "Used by" label', () => {
    for (const [name, meta] of Object.entries(componentRegistry)) {
      const line = formatProvenanceLine(meta);
      const [, usedBy] = line.split(' | Used by: ');
      if (meta.consumers.length === 0) {
        expect(line).not.toContain('| Used by:');
      } else {
        expect(usedBy?.trim()).toBeTruthy();
        for (const id of usedBy.split(', ')) expect({ name, id, ok: PERMITTED.has(id) }).toEqual({ name, id, ok: true });
      }
    }
  });

  it('filters a consumer that is not a registered project', () => {
    const line = formatProvenanceLine({ origin: 'eidotter', consumers: ['private-thing' as never] });
    expect(line).toBe('Origin: eidotter');
  });

  it('the Storybook decorator uses formatProvenanceLine, not its own "Used by" line', () => {
    const preview = readFileSync(resolve(ROOT, '.storybook/preview.ts'), 'utf-8');
    expect(preview).toContain('formatProvenanceLine(');
    expect(preview).not.toMatch(/Used by/i);
  });
});

describe('public names: prose consumer lists', () => {
  const SCANNED = /(^(README|CLAUDE|ADOPTION_STRATEGY|COMPONENT_BACKLOG|CHANGELOG|llms|IMPLEMENTATION_NOTES)\.(md|txt)$)|(^(guidelines|solutions|prompts)\/.*\.(md|ndjson)$)|(^(src|\.storybook|scripts)\/.*\.(tsx?|mdx|mjs|css)$)/;

  const files = execFileSync('git', ['ls-files'], { cwd: ROOT, encoding: 'utf-8' })
    .split('\n')
    .filter((f) => SCANNED.test(f) && !f.endsWith('registry.public-names.test.ts') && existsSync(resolve(ROOT, f)));

  /** Names after a "Used by:" label, up to the end of the list. */
  const USED_BY = /Used by:\s*([a-z0-9.,\- ]+)/gi;

  it('scans a sensible set of files', () => {
    expect(files.length).toBeGreaterThan(50);
    expect(files).toContain('llms.txt');
  });

  it('every "Used by" list names only permitted sites', () => {
    const hits: string[] = [];
    for (const file of files) {
      readFileSync(resolve(ROOT, file), 'utf-8').split('\n').forEach((text, i) => {
        const key = `${file}:${i + 1}`;
        if (key in ALLOWLIST) return;
        for (const m of text.matchAll(USED_BY)) {
          for (const raw of m[1].split(',')) {
            const id = raw.trim().split(/\s+/)[0]?.toLowerCase();
            if (id && id !== 'none' && !PERMITTED.has(id)) hits.push(`${key}: "${id}"`);
          }
        }
      });
    }
    expect(hits).toEqual([]);
  });

  it('every llms.txt component-table row lists only permitted origin and consumers', () => {
    const hits: string[] = [];
    readFileSync(resolve(ROOT, 'llms.txt'), 'utf-8').split('\n').forEach((text, i) => {
      const m = text.match(/^\| ([A-Z][A-Za-z]+) \| ([a-z-]+) \| ([^|]+) \|\s*$/);
      if (!m || m[2] === 'Origin') return;
      const key = `llms.txt:${i + 1}`;
      if (key in ALLOWLIST) return;
      for (const id of [m[2], ...m[3].split(',').map((s) => s.trim())]) {
        if (!id.startsWith('(') && !PERMITTED.has(id)) hits.push(`${key}: "${id}"`);
      }
    });
    expect(hits).toEqual([]);
  });

  it('the allowlist stays short and every entry carries a reason', () => {
    for (const [key, reason] of Object.entries(ALLOWLIST)) {
      expect(key).toMatch(/^[^:]+:\d+$/);
      expect(reason.trim().length).toBeGreaterThan(10);
    }
  });
});
