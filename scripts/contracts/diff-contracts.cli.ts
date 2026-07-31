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
import type { ComponentContract } from './schema';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const component = process.argv[2] ?? 'Button';

const code = JSON.parse(
  readFileSync(resolve(ROOT, `src/components/${component}/${component}.contract.json`), 'utf-8'),
) as ComponentContract;
const figma = JSON.parse(
  readFileSync(resolve(ROOT, `figma-snapshots/contracts/${component}.contract.json`), 'utf-8'),
) as ComponentContract;

const result = diffContracts(code, figma);
console.log(`[diff-contracts] ${component}: ${result.pass ? 'PASS' : 'FAIL'}`);
for (const v of result.violations) {
  console.log(`  [${v.severity}] ${v.axis}: ${v.message}`);
}
if (!result.pass) process.exit(1);
