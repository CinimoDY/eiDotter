#!/usr/bin/env node
/**
 * `npm run build-storybook`: build Storybook, then run the publishing-boundary
 * check on what was built (DMNC-1652).
 *
 * A wrapper rather than `storybook build && check`, because callers append
 * their own arguments (Chromatic passes `--output-dir <tmp>`); with `&&` those
 * would reach the check instead of Storybook. Arguments are forwarded to
 * `storybook build` unchanged, and the check runs on the folder they name.
 * The default output folder is `docs`.
 */
import { spawnSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const DEFAULT_OUTPUT = 'docs';
const here = dirname(fileURLToPath(import.meta.url));

/** @param {string[]} args @returns {string | undefined} */
export function outputDirFrom(args) {
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === '-o' || arg === '--output-dir') return args[i + 1];
    if (arg.startsWith('--output-dir=')) return arg.slice('--output-dir='.length);
  }
  return undefined;
}

function run(command, args) {
  const result = spawnSync(command, args, { stdio: 'inherit', shell: process.platform === 'win32' });
  if (result.error) {
    console.error(`build-storybook: could not run ${command}: ${result.error.message}`);
    return 1;
  }
  return result.status ?? 1;
}

function main() {
  const forwarded = process.argv.slice(2);
  const named = outputDirFrom(forwarded);
  const outputDir = named ?? DEFAULT_OUTPUT;
  const buildArgs = named ? forwarded : ['-o', DEFAULT_OUTPUT, ...forwarded];

  // npm puts node_modules/.bin on PATH for scripts; npx covers a direct call.
  const built = run('npx', ['--no-install', 'storybook', 'build', ...buildArgs]);
  if (built !== 0) process.exit(built);

  process.exit(run(process.execPath, [resolve(here, 'check-storybook-output.mjs'), outputDir]));
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}
