/**
 * CLI wrapper for extract-code-contract.ts — invoked via `npm run extract-code-contract`.
 *
 * Run with `tsx`, not `ts-node`: ts-node 10.9.2's ESM loader doesn't resolve
 * extensionless relative imports under this project's Node version (a known
 * gap between ts-node's older loader-hook implementation and Node's current
 * ESM loader API — see the pilot's plan doc, DMNC-1459, for the diagnosis).
 * tsx is a modern, actively-maintained TS runner built for exactly this case.
 * Scoped to these new pilot scripts only — the rest of the repo's existing
 * ts-node usage is untouched.
 */
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { extractCodeContract, PILOT_COMPONENTS } from './extract-code-contract';
import { stableStringify } from './schema';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

for (const config of PILOT_COMPONENTS) {
  const contract = extractCodeContract(config, ROOT);
  const outputPath = resolve(ROOT, config.outputPath);
  writeFileSync(outputPath, stableStringify(contract));
  console.log(`[extract-code-contract] ${config.component}: ${config.outputPath}`);
}
