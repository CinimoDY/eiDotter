/**
 * Contract tests for the code↔Figma component contracts (DMNC-1459; Button pilot
 * + Badge/Tag/Alert wave 2; health family + its two Figma helper sets, DMNC-1572 U8b).
 * Table-driven over the PILOT_COMPONENTS config.
 *
 * This rides the existing `npm test` CI gate in place of a new workflow step.
 * Three properties are asserted per component:
 *
 * 1. Determinism: regenerating the code contract twice with nothing changed
 *    produces byte-identical output.
 * 2. Freshness: the regenerated code/Figma contracts match the committed
 *    `*.contract.json` files — catches "the component changed but nobody ran
 *    `npm run extract-code-contract`" the same way `tailwind-preset.test.ts`
 *    catches token-generator drift.
 * 3. Parity: the committed contracts, diffed, have exactly the known, reviewed
 *    errors and warnings. Anything new fails the build instead of blending
 *    into the noise. Pins are updated deliberately, never deleted.
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';
import {
  extractCodeContract,
  PILOT_COMPONENTS as CODE_COMPONENTS,
} from '../../scripts/contracts/extract-code-contract';
import {
  extractFigmaContract,
  PILOT_COMPONENTS as FIGMA_COMPONENTS,
} from '../../scripts/contracts/extract-figma-contract';
import { diffContracts } from '../../scripts/contracts/diff-contracts';
import { stableStringify, type ComponentContract } from '../../scripts/contracts/schema';

const ROOT = resolve(__dirname, '../..');

interface Pins {
  /** Known error-level code↔Figma drift (design calls — see IMPLEMENTATION_NOTES / PR body). */
  errors: string[];
  warnings: string[];
}

const PINS: Record<string, Pins> = {
  Button: {
    errors: [],
    warnings: [
      'size: Code "size" defines extra value(s) [small, medium, large] Figma doesn\'t model.',
      'size: Default mismatch for "size": Figma default is "xs", code default is "md".',
      'state: Figma defines variant axis "state" with no code-side variant equivalent — verify code covers it some other way (prop, CSS state, etc).',
    ],
  },
  // Snapshot refreshed via the desktop bridge 2026-10-23 (Badge set only, after the
  // 2026-10-22 rename primary→accent, secondary→default): no errors, only the code's extra values.
  Badge: {
    errors: [],
    warnings: [
      'size: Code "size" defines extra value(s) [lg, small, medium] Figma doesn\'t model.',
      'size: Default mismatch for "size": Figma default is "sm", code default is "md".',
      'variant: Code "variant" defines extra value(s) [info, brand, gray, blue, indigo, purple, pink, orange] Figma doesn\'t model.',
      'variant: Default mismatch for "variant": Figma default is "accent", code default is "default".',
    ],
  },
  // Known Figma drift (design follow-up, listed in PR #519): Figma's Tag "variant" axis is a
  // colour scale (primary/success/warning/error/default) while code's `variant` is a fill
  // style (default/outlined/filled). The axes share a name but not a meaning.
  Tag: {
    errors: ['variant: Figma "variant" expects value(s) [primary, success, warning, error] the code cannot render.'],
    warnings: [
      'size: Code "size" defines extra value(s) [lg, small, medium] Figma doesn\'t model.',
      'size: Default mismatch for "size": Figma default is "sm", code default is "md".',
      'state: Figma defines variant axis "state" with no code-side variant equivalent — verify code covers it some other way (prop, CSS state, etc).',
      'variant: Code "variant" defines extra value(s) [outlined, filled] Figma doesn\'t model.',
      'variant: Default mismatch for "variant": Figma default is "primary", code default is "default".',
    ],
  },
  // Known Figma drift (design follow-up, listed in PR #519): Figma's Alert "color" has a
  // `primary` value the code cannot render (code's `AlertColor` uses brand/default instead).
  Alert: {
    errors: ['color: Figma "color" expects value(s) [primary] the code cannot render.'],
    warnings: [
      'color: Code "color" defines extra value(s) [brand, default] Figma doesn\'t model.',
      // New in the one-sided-default check: Alert resolves its colour in resolveColor() (from `color`
      // or the deprecated `type`), so the code has no literal default for the extractor to read.
      'color: Figma default for "color" is "primary" but code declares no literal default (computed or absent) — verify they agree.',
      'state: Figma defines variant axis "state" with no code-side variant equivalent — verify code covers it some other way (prop, CSS state, etc).',
    ],
  },
  // Health family (DMNC-1572 U8b). No errors: the sets were built from the registry. The
  // Figma set default is the top-left variant of the set grid, so size-default mismatches
  // are layout order, not a design disagreement. Tone/pattern/status have no literal code
  // default because the component derives them (from bands, from tone, or per item).
  Gauge: {
    errors: [],
    warnings: [
      // Figma set default is its first (sm) variant; code renders md by default.
      'size: Default mismatch for "size": Figma default is "sm", code default is "md".',
      // Code derives tone from `bands` when `tone` is not passed.
      'tone: Figma default for "tone" is "neutral" but code declares no literal default (computed or absent) — verify they agree.',
    ],
  },
  Meter: {
    errors: [],
    warnings: [
      // Code derives the fill pattern from tone (tonePatterns) when `pattern` is not passed.
      'pattern: Figma default for "pattern" is "solid" but code declares no literal default (computed or absent) — verify they agree.',
      // Figma set default is its first (xs) variant; code renders sm by default.
      'size: Default mismatch for "size": Figma default is "xs", code default is "sm".',
      // Code derives tone from `bands` when `tone` is not passed.
      'tone: Figma default for "tone" is "info" but code declares no literal default (computed or absent) — verify they agree.',
    ],
  },
  MeterGroup: { errors: [], warnings: [] },
  RangeBar: {
    errors: [],
    warnings: [
      // Per-segment in code; Figma models pattern on the `RangeBar Segment` helper set (RangeBarSegment pin).
      'pattern: Code defines variant axis "pattern" with no Figma-side equivalent modeled.',
      // Figma set default is its first (sm) variant; code renders md by default.
      'size: Default mismatch for "size": Figma default is "sm", code default is "md".',
      // Per-segment in code; Figma models tone on the `RangeBar Segment` helper set (RangeBarSegment pin).
      'tone: Code defines variant axis "tone" with no Figma-side equivalent modeled.',
    ],
  },
  SeriesBars: {
    errors: [],
    warnings: [
      // Code colours each bar from `toneFor` (or the goal), else neutral; no component-level tone default.
      'tone: Figma default for "tone" is "neutral" but code declares no literal default (computed or absent) — verify they agree.',
    ],
  },
  DecayStrip: { errors: [], warnings: [] },
  VitalsStrip: {
    errors: [],
    warnings: [
      // status is per tile (VitalTile.status, `?? 'ok'` inline in the tile loop), not a component default.
      'status: Figma default for "status" is "ok" but code declares no literal default (computed or absent) — verify they agree.',
      // tone is per tile (VitalTile.tone), derived from the tile's bands when absent.
      'tone: Figma default for "tone" is "neutral" but code declares no literal default (computed or absent) — verify they agree.',
    ],
  },
  // Helper contracts: the Figma helper sets model the per-item surface (RangeBarSegment
  // interface, SeriesBarsPoint bars) that code renders inside the parent component.
  RangeBarSegment: {
    errors: [],
    warnings: [
      // orientation is inherited from the parent RangeBar; a segment has no orientation of its own.
      'orientation: Figma defines variant axis "orientation" with no code-side variant equivalent — verify code covers it some other way (prop, CSS state, etc).',
      // Code derives a segment's pattern from its tone (tonePatterns) when `pattern` is not passed.
      'pattern: Figma default for "pattern" is "none" but code declares no literal default (computed or absent) — verify they agree.',
      // `tone` is a required segment field in code, so there is no default.
      'tone: Figma default for "tone" is "neutral" but code declares no literal default (computed or absent) — verify they agree.',
    ],
  },
  SeriesBarsBar: {
    errors: [],
    warnings: [
      // A bar's tone comes from the parent's `toneFor` (or goal) thresholds, else neutral; no literal default.
      'tone: Figma default for "tone" is "neutral" but code declares no literal default (computed or absent) — verify they agree.',
    ],
  },
};

function readText(relativePath: string): string {
  return readFileSync(resolve(ROOT, relativePath), 'utf-8');
}

function readJson(relativePath: string): unknown {
  return JSON.parse(readText(relativePath));
}

describe('contract registration', () => {
  it('every code-contract component has a Figma target and a parity pin', () => {
    const code = CODE_COMPONENTS.map((c) => c.component).sort();
    expect(FIGMA_COMPONENTS.map((c) => c.component).sort()).toEqual(code);
    expect(Object.keys(PINS).sort()).toEqual(code);
  });
});

describe.each(CODE_COMPONENTS.map((c) => [c.component, c] as const))('%s contract', (name, codeConfig) => {
  const figmaTarget = FIGMA_COMPONENTS.find((c) => c.component === name)!;

  it('code contract: regenerating twice produces byte-identical output', () => {
    const first = stableStringify(extractCodeContract(codeConfig));
    const second = stableStringify(extractCodeContract(codeConfig));
    expect(second).toBe(first);
  });

  it(`code contract: matches the committed JSON (run \`npm run extract-code-contract\` if this fails)`, () => {
    const regenerated = stableStringify(extractCodeContract(codeConfig));
    expect(regenerated).toBe(readText(codeConfig.outputPath));
  });

  it(`figma contract: matches the committed JSON (run \`npm run extract-figma-contract\` if this fails)`, () => {
    const snapshot = readJson('figma-snapshots/web-ds.json');
    const regenerated = stableStringify(extractFigmaContract(figmaTarget, snapshot));
    expect(regenerated).toBe(readText(figmaTarget.outputPath));
  });

  const diff = () =>
    diffContracts(
      readJson(codeConfig.outputPath) as ComponentContract,
      readJson(figmaTarget.outputPath) as ComponentContract,
    );
  const fmt = (severity: 'error' | 'warning') =>
    diff()
      .violations.filter((v) => v.severity === severity)
      .map((v) => `${v.axis}: ${v.message}`)
      .sort();

  // Pins the current, reviewed findings so a *new* one fails the build
  // instead of blending into the noise (the "rotted contract" trap).
  it('parity: has exactly the known, accepted errors', () => {
    expect(fmt('error')).toEqual([...PINS[name].errors].sort());
  });

  it('parity: has exactly the known, accepted warnings', () => {
    expect(fmt('warning')).toEqual([...PINS[name].warnings].sort());
  });
});
