/**
 * Contract tests for the code↔Figma component contracts (DMNC-1459; Button pilot
 * + Badge/Tag/Alert wave 2). Table-driven over the PILOT_COMPONENTS config.
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
  Badge: {
    // Figma's Badge "variant" axis uses primary/secondary; code has no such variants
    // (code: default/success/warning/error/info/accent + colour aliases). A design call
    // for Dom — adopt Figma, change code, or document the divergence. Pinned, not hidden.
    errors: ['variant: Figma "variant" expects value(s) [primary, secondary] the code cannot render.'],
    warnings: [
      'size: Code "size" defines extra value(s) [lg, small, medium] Figma doesn\'t model.',
      'size: Default mismatch for "size": Figma default is "sm", code default is "md".',
      'variant: Code "variant" defines extra value(s) [default, info, accent, brand, gray, blue, indigo, purple, pink, orange] Figma doesn\'t model.',
      'variant: Default mismatch for "variant": Figma default is "primary", code default is "default".',
    ],
  },
  Tag: {
    errors: [],
    warnings: [
      'size: Code "size" defines extra value(s) [lg, small, medium] Figma doesn\'t model.',
      'size: Default mismatch for "size": Figma default is "sm", code default is "md".',
      'state: Figma defines variant axis "state" with no code-side variant equivalent — verify code covers it some other way (prop, CSS state, etc).',
      'variant: Figma defines variant axis "variant" with no code-side variant equivalent — verify code covers it some other way (prop, CSS state, etc).',
    ],
  },
  Alert: {
    errors: [],
    warnings: [
      'color: Figma defines variant axis "color" with no code-side variant equivalent — verify code covers it some other way (prop, CSS state, etc).',
      'state: Figma defines variant axis "state" with no code-side variant equivalent — verify code covers it some other way (prop, CSS state, etc).',
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
