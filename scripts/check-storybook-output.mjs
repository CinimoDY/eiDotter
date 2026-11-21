#!/usr/bin/env node
/**
 * Publishing-boundary check for the built Storybook (DMNC-1652).
 *
 * The Storybook output is public: it is deployed to storybook.eidotter.com
 * and a copy is tracked in `docs/`. This script fails when the output carries
 * anything from the machine that built it:
 *
 *   1. a home or workspace path (`/home/<user>/`, `/Users/<user>/`,
 *      `/mnt/<drive>/`, `C:\Users\<user>\`),
 *   2. the name of an environment variable that only appears when
 *      `process.env` was serialised into the bundle, or the name of a known
 *      secret variable,
 *   3. the value of a secret-looking variable of the current environment.
 *
 * Usage: node scripts/check-storybook-output.mjs [dir]   (default: docs)
 *
 * Findings name the file and the rule only. A matched secret value is never
 * printed.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const TEXT_EXTENSIONS = new Set([
  '.js', '.mjs', '.cjs', '.html', '.css', '.json', '.map', '.txt', '.svg', '.xml', '.md',
]);

const PATH_RULES = [
  { name: 'home path (/home/<user>/)', pattern: /\/home\/[A-Za-z0-9._-]+\// },
  { name: 'home path (/Users/<user>/)', pattern: /\/Users\/[A-Za-z0-9._-]+\// },
  { name: 'drive mount path (/mnt/<drive>/)', pattern: /\/mnt\/[a-z]\// },
  { name: 'home path (C:\\Users\\<user>\\)', pattern: /[A-Za-z]:\\{1,2}Users\\{1,2}[^\\"'`\s]+\\/ },
];

/**
 * Names that have no reason to be in a browser bundle. The first group shows
 * that an environment was dumped; the second group are secrets by name.
 */
const VARIABLE_NAMES = [
  'npm_lifecycle_event',
  'npm_config_userconfig',
  'GITHUB_WORKSPACE',
  'GITHUB_EVENT_PATH',
  'RUNNER_TEMP',
  'RUNNER_TOOL_CACHE',
  'WSL_DISTRO_NAME',
  'GITHUB_TOKEN',
  'GH_TOKEN',
  'NPM_TOKEN',
  'NODE_AUTH_TOKEN',
  'FIGMA_ACCESS_TOKEN',
  'CHROMATIC_PROJECT_TOKEN',
  'CLAUDE_CODE_OAUTH_TOKEN',
  'ANTHROPIC_API_KEY',
  'ACTIONS_RUNTIME_TOKEN',
  'ACTIONS_ID_TOKEN_REQUEST_TOKEN',
  'AWS_SECRET_ACCESS_KEY',
];
// Not listed on purpose: XDG_RUNTIME_DIR and SSH_AUTH_SOCK. Storybook's own
// syntax highlighter ships them in its shell word list, so they are in every
// clean build.

const SECRET_NAME = /TOKEN|SECRET|KEY|PASSWORD|PASSWD|CREDENTIAL|AUTH/i;
/** Shorter values are too likely to match unrelated text. */
const MIN_SECRET_LENGTH = 12;

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Whole-name match: `MY_GITHUB_TOKEN_X` does not count as `GITHUB_TOKEN`. */
const NAME_RULES = VARIABLE_NAMES.map((name) => ({
  name: `environment variable name ${name}`,
  pattern: new RegExp(`(?<![A-Za-z0-9_])${escapeRegExp(name)}(?![A-Za-z0-9_])`),
}));

function secretValueRules(env) {
  const rules = [];
  for (const [key, value] of Object.entries(env)) {
    if (!value || value.length < MIN_SECRET_LENGTH) continue;
    if (!SECRET_NAME.test(key)) continue;
    rules.push({ name: `value of ${key}`, literal: value });
  }
  return rules;
}

function* walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (entry.isFile()) yield full;
  }
}

/**
 * @param {string} dir built Storybook folder
 * @param {Record<string, string | undefined>} env environment to take secret values from
 * @returns {{ file: string, rule: string }[]}
 */
export function scanStorybookOutput(dir, env = process.env) {
  const root = resolve(dir);
  const valueRules = secretValueRules(env);
  const findings = [];

  for (const file of walk(root)) {
    if (!TEXT_EXTENSIONS.has(extname(file).toLowerCase())) continue;
    const text = readFileSync(file, 'utf8');
    const shown = relative(root, file);

    for (const rule of [...PATH_RULES, ...NAME_RULES]) {
      if (rule.pattern.test(text)) findings.push({ file: shown, rule: rule.name });
    }
    for (const rule of valueRules) {
      if (text.includes(rule.literal)) findings.push({ file: shown, rule: rule.name });
    }
  }
  return findings;
}

function main() {
  const dir = process.argv[2] ?? 'docs';
  let isDirectory = false;
  try {
    isDirectory = statSync(dir).isDirectory();
  } catch {
    isDirectory = false;
  }
  if (!isDirectory) {
    console.error(`check-storybook-output: "${dir}" is not a directory. Build Storybook first.`);
    process.exit(2);
  }

  const findings = scanStorybookOutput(dir);
  if (findings.length === 0) {
    console.log(`check-storybook-output: ${dir} carries no machine paths and no environment.`);
    return;
  }

  console.error(`check-storybook-output: ${dir} must not be published. Found:`);
  for (const finding of findings) {
    console.error(`  ${finding.file}: ${finding.rule}`);
  }
  console.error(
    '\nThe Storybook output is public. See `.storybook/main.js` (the `process.env` define) and DMNC-1652.',
  );
  process.exit(1);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}
