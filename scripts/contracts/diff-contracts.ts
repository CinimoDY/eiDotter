/**
 * diff-contracts — mechanical structural diff between a code contract and a
 * Figma contract (pilot, DMNC-1459). This is the piece that replaces
 * figma-audit's hand-built markdown comparison matrix with something that
 * returns pass/fail — no agent, no judgment call, same input always
 * produces the same output.
 *
 * Severity split (deliberate, to avoid the "rotted contract" trap — a check
 * too noisy to trust gets ignored, which is worse than no check):
 *   - error:   within an axis both sides recognize, Figma expects a value
 *              the code cannot render. This is the one case that actually
 *              breaks fidelity, so it's the only thing that fails CI.
 *   - warning: code has MORE than Figma models (e.g. deprecated size
 *              aliases `small`/`medium`/`large` alongside `sm`/`md`/`lg`),
 *              a default-value mismatch, or an axis one side models and the
 *              other doesn't (e.g. Figma's `state` interaction axis has no
 *              code-side prop — it's expressed via CSS pseudo-classes and
 *              the `disabled`/`loading` props instead, a legitimate
 *              platform difference, not a bug — Curtis's "independent over
 *              platform biased": Figma's model isn't automatically gospel).
 *
 * AI's role stops here: this file only reports what's true. A human (or an
 * agent, per the source article's "authoring vs enforcement" split) decides
 * what a violation *means* — adopt Figma, fix code, or document the
 * divergence as intentional.
 *
 * Pure logic only — no file I/O, no CLI entrypoint. Imported directly by
 * Button.contract.test.ts. Run via `npm run diff-contracts` for local debug
 * output, which invokes the thin `diff-contracts.cli.cts` wrapper instead.
 */

import type { ComponentContract } from './schema';

export type ViolationSeverity = 'error' | 'warning';

export interface ContractViolation {
  severity: ViolationSeverity;
  axis: string;
  message: string;
}

export interface DiffResult {
  pass: boolean;
  violations: ContractViolation[];
}

export function diffContracts(code: ComponentContract, figma: ComponentContract): DiffResult {
  const violations: ContractViolation[] = [];
  const codeAxes = new Set(Object.keys(code.variants));
  const figmaAxes = new Set(Object.keys(figma.variants));

  for (const axis of figmaAxes) {
    const figmaAxisDef = figma.variants[axis];

    if (!codeAxes.has(axis)) {
      // Warning, not error: an axis Figma models but code doesn't declare as a
      // variant (e.g. Figma's "state" interaction axis, expressed in code via
      // CSS pseudo-classes and the disabled/loading props instead of a named
      // variant prop) is a representational difference, not proof code can't
      // render it. Whether to formalize it as a code prop or document the gap
      // is a human judgment call — the differ's job stops at reporting it.
      violations.push({
        severity: 'warning',
        axis,
        message: `Figma defines variant axis "${axis}" with no code-side variant equivalent — verify code covers it some other way (prop, CSS state, etc).`,
      });
      continue;
    }

    const codeAxisDef = code.variants[axis];
    const codeValueSet = new Set(codeAxisDef.values);
    const missing = figmaAxisDef.values.filter((v) => !codeValueSet.has(v));
    if (missing.length > 0) {
      violations.push({
        severity: 'error',
        axis,
        message: `Figma "${axis}" expects value(s) [${missing.join(', ')}] the code cannot render.`,
      });
    }

    const figmaValueSet = new Set(figmaAxisDef.values);
    const extra = codeAxisDef.values.filter((v) => !figmaValueSet.has(v));
    if (extra.length > 0) {
      violations.push({
        severity: 'warning',
        axis,
        message: `Code "${axis}" defines extra value(s) [${extra.join(', ')}] Figma doesn't model.`,
      });
    }

    if (figmaAxisDef.default && codeAxisDef.default && figmaAxisDef.default !== codeAxisDef.default) {
      violations.push({
        severity: 'warning',
        axis,
        message: `Default mismatch for "${axis}": Figma default is "${figmaAxisDef.default}", code default is "${codeAxisDef.default}".`,
      });
    }
  }

  for (const axis of codeAxes) {
    if (!figmaAxes.has(axis)) {
      violations.push({
        severity: 'warning',
        axis,
        message: `Code defines variant axis "${axis}" with no Figma-side equivalent modeled.`,
      });
    }
  }

  return {
    pass: !violations.some((v) => v.severity === 'error'),
    violations,
  };
}
