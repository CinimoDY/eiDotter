---
title: Run TS scripts with relative imports via tsx — ts-node's ESM loader is broken on Node 24
date: 2026-08-01
category: tooling-decisions
module: scripts
problem_type: tooling_decision
component: tooling
severity: medium
applies_when:
  - "Adding an npm script that runs a TypeScript file under scripts/"
  - "A ts-node script fails with ERR_MODULE_NOT_FOUND on a relative import that clearly exists"
  - "Choosing between ts-node and tsx as the runner for a new CLI entrypoint"
symptoms:
  - "Cannot find module '/.../scripts/contracts/schema' imported from ... (ERR_MODULE_NOT_FOUND)"
  - "npm run sync-to-figma dies before doing anything (import of '../src/components/registry')"
root_cause: config_error
resolution_type: tooling_addition
tags: [ts-node, tsx, esm, node-24, module-resolution, npm-scripts]
---

# Run TS scripts with relative imports via tsx — ts-node's ESM loader is broken on Node 24

## Context

Because `package.json` has `"type": "module"`, ts-node 10.9.2 runs scripts through its ESM loader, whose hooks predate Node's current loader API. On this repo's Node (v24), that loader cannot resolve **extensionless relative `.ts` imports** — any script doing `import { x } from './other'` or `from '../src/components/registry'` dies with `ERR_MODULE_NOT_FOUND` before executing a line. Discovered while building the DMNC-1459 contract CLIs; it also explains why `npm run sync-to-figma` had been silently dead.

Scripts that import **only node builtins / npm packages** (no relative TS imports) still work under ts-node — which is why `sync-figma-to-swift.ts` and `fetch-figma-snapshot.ts` never broke, and why the failure looked component-specific when it's actually import-shape-specific.

## Guidance

Any `scripts/**/*.ts` entrypoint that imports another local TS file runs via **tsx**, not ts-node (tsx is a devDep since PR #485):

```json
"extract-code-contract": "tsx scripts/contracts/extract-code-contract.cli.ts"
```

Keep shared logic extensionless (`import { x } from './schema'`) so Jest/ts-jest can import the same modules directly in tests. Split CLI wrappers (`*.cli.ts`, run by tsx) from pure logic modules (imported by tests) when a script needs both.

Dead ends — do not retry these (all verified failing here):

- **`.js`-suffixed relative imports** (`from './schema.js'`): fails — there is no emitted JS next to the source.
- **`.ts`-suffixed imports** (`from './schema.ts'`): works under ts-node's loader but breaks ts-jest with TS5097 (`allowImportingTsExtensions` not enabled) — and enabling that flag ripples into the build tsconfigs.
- **`.cts` CommonJS wrappers**: TS5095 — CommonJS module kind conflicts with the root tsconfig's `moduleResolution: "bundler"`.
- **package.json `ts-node` config block** with `"experimentalSpecifierResolution": "node"` + `"esm": true`: silently ignored — the loader-hook mismatch means the option never takes effect on this Node.

## Why This Matters

The failure mode is silent at the repo level: CI never runs the affected scripts, so a dead script (like `sync-to-figma`) can sit broken for months looking like a working npm script. Knowing the rule ("relative TS import ⇒ tsx") turns an hour of loader archaeology into a one-line runner swap.

## When to Apply

- Writing any new `scripts/` entrypoint: default to `tsx` in the npm script.
- Debugging `ERR_MODULE_NOT_FOUND` from a script whose import path looks correct: check the runner before checking the path.
- Migrating existing ts-node scripts: only `sync-to-figma.ts` needs the swap for import reasons; `create-component.ts` additionally has a latent `require('readline')` that throws under ESM when reached (see PLAN-adoption-manifest.md, local).

## Examples

Working pattern from `scripts/contracts/` (PR #485): `extract-code-contract.ts` holds pure logic with extensionless imports (imported directly by `Button.contract.test.ts` under Jest); `extract-code-contract.cli.ts` is a thin wrapper doing file I/O, wired as `"extract-code-contract": "tsx scripts/contracts/extract-code-contract.cli.ts"`.

## Related Issues

- PR #485 (DMNC-1459) — introduced tsx + the split-wrapper pattern.
- DMNC-1195 — will apply the runner swap to `sync-to-figma.ts` and fix `create-component.ts`.
