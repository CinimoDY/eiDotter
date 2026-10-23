/**
 * CLI wrapper for diff-contracts.ts — invoked via `npm run diff-contracts` for
 * verbose local debug output. See extract-code-contract.cli.ts's header
 * comment for why this runs via `tsx`.
 *
 * Usage: npm run diff-contracts [ComponentName]  (defaults to Button)
 */
import { readFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { diffContracts } from './diff-contracts';
import { PILOT_COMPONENTS as CODE_COMPONENTS } from './extract-code-contract';
import { PILOT_COMPONENTS as FIGMA_COMPONENTS } from './extract-figma-contract';
import type { ComponentContract } from './schema';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const component = process.argv[2] ?? 'Button';

// Paths come from the extractor configs (`outputPath`), not a naming convention:
// MeterGroup and the helper contracts (RangeBarSegment, SeriesBarsBar) live in
// their parent component's folder.
const codePath = CODE_COMPONENTS.find((c) => c.component === component)?.outputPath;
const figmaPath = FIGMA_COMPONENTS.find((c) => c.component === component)?.outputPath;
if (!codePath || !figmaPath) {
  const known = CODE_COMPONENTS.map((c) => c.component).filter((n) =>
    FIGMA_COMPONENTS.some((f) => f.component === n),
  );
  console.error(`[diff-contracts] ${component}: no contract pair configured. Known: ${known.join(', ')}`);
  process.exit(1);
}

const code = JSON.parse(readFileSync(resolve(ROOT, codePath), 'utf-8')) as ComponentContract;
const figma = JSON.parse(readFileSync(resolve(ROOT, figmaPath), 'utf-8')) as ComponentContract;

const result = diffContracts(code, figma);
console.log(`[diff-contracts] ${component}: ${result.pass ? 'PASS' : 'FAIL'}`);
for (const v of result.violations) {
  console.log(`  [${v.severity}] ${v.axis}: ${v.message}`);
}
if (!result.pass) process.exit(1);
