/**
 * CLI wrapper for extract-figma-contract.ts — invoked via `npm run extract-figma-contract`.
 * See extract-code-contract.cli.ts's header comment for why this runs via `tsx`.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { extractFigmaContract, PILOT_COMPONENTS } from './extract-figma-contract';
import { stableStringify } from './schema';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const SNAPSHOT_PATH = resolve(ROOT, 'figma-snapshots/web-ds.json');

const snapshot = JSON.parse(readFileSync(SNAPSHOT_PATH, 'utf-8'));
for (const target of PILOT_COMPONENTS) {
  const contract = extractFigmaContract(target, snapshot);
  const outputPath = resolve(ROOT, target.outputPath);
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, stableStringify(contract));
  console.log(`[extract-figma-contract] ${target.component}: ${target.outputPath}`);
}
