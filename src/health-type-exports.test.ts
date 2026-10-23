/** @jest-environment node */
// The health value-model types are importable from the package barrel (DMNC-1610).
// Type-only imports: ts-jest type-checks this file, so a missing export fails the suite.
import { readFileSync } from 'fs';
import { join } from 'path';
import type { Tone, ValueStatus, Provenance, Band, HealthLabels } from './index';

describe('health type exports from the barrel', () => {
  it('type-checks every health type through src/index', () => {
    const tone: Tone = 'success';
    const status: ValueStatus = 'stale';
    const provenance: Provenance = 'estimated';
    // FIXTURE ONLY: synthetic band.
    const band: Band = { from: 0, to: Infinity, tone, label: 'Sample band' };
    const labels: Partial<HealthLabels> = { unknown: 'unbekannt' };
    expect([tone, status, provenance, band.tone, labels.unknown]).toEqual([
      'success', 'stale', 'estimated', 'success', 'unbekannt',
    ]);
  });

  it('is a type-only export (no runtime binding in the barrel source)', () => {
    const src = readFileSync(join(__dirname, 'index.ts'), 'utf8');
    expect(src).toMatch(
      /export type \{ Tone, ValueStatus, Provenance, Band, HealthLabels \} from '\.\/utils\/health';/,
    );
  });
});
