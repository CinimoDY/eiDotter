---
title: "Consumer lockfiles: generate with the CI's npm major"
date: 2026-10-25
category: developer-experience
module: eidotter
problem_type: developer_experience
component: tooling
severity: medium
applies_when:
  - "Bumping eidotter in a consumer repo (sessionmate, lifelines, doctor-portal, keepcoin, steuerdash, and others)"
  - "A consumer's `npm ci` fails in CI with 'Missing: @emnapi/runtime@... from lock file' or 'Missing: esbuild@... from lock file'"
  - "A local `npm install` under npm 11 shrinks the lockfile diff beyond the eidotter entry"
symptoms:
  - "`npm ci` fails on CI (node 20) with 'Missing: @emnapi/runtime@... / esbuild@... from lock file' after a bump made locally on node 24"
  - "A plain `npm install` under npm 11 drops `@emnapi/*` optional entries that a node-20 lockfile carried"
root_cause: config_error
resolution_type: workflow_improvement
related_components:
  - development_workflow
tags:
  - npm
  - lockfile
  - ci
  - docker
  - consumer-bump
  - caret-0x
  - tmpfs
  - DMNC-1328
  - DMNC-1622
---

# Consumer lockfiles: generate with the CI's npm major

Linear: DMNC-1328, DMNC-1622. Seen in the 0.42 and 0.45 consumer rounds (2026-10-24/25).

## Context

npm 11 (node 24) writes lockfiles that omit root-level optional entries which npm 10 (node 20/22) insists on. A lockfile bumped on a local node 24 therefore fails `npm ci` on a node 20 CI with "Missing: @emnapi/runtime@... / esbuild@... from lock file" (sessionmate #10, node 20). The reverse also happens: plain `npm install` under npm 11 strips `@emnapi/*` optional entries that a node-20 lockfile carried (lifelines, doctor-portal).

## Guidance

Generate the lockfile with the npm major the consumer's CI or Dockerfile runs, then check it in the same image.

1. Find the major: `.github/workflows/*.yml` (sessionmate: node 20), the Dockerfile (the keepcoin repo frontend Dockerfile: node 22, so npm 10; steuerdash runs npm 11 on purpose), else the local npm.
2. Edit the eidotter range in `package.json`, then regenerate:

```bash
docker run --rm -v "$PWD":/app -w /app node:<major> npm install --package-lock-only
docker run --rm -v "$PWD":/app -w /app node:<major> npm ci --dry-run
```

3. If a docker `npm ci` collides with the host npm cache, copy the files into the container's `/tmp` and run it there.
4. Read the diff. A correct bump touches only the eidotter entry. A wider transitive refresh (for example nested `@tailwindcss/oxide-wasm32-wasi` entries) is acceptable, but name it in the PR.

## Related traps from the same rounds

- The 0.x caret never moves consumers: `^0.42.0` stays on 0.42. Every minor needs an explicit range bump.
- Parallel installs under `/tmp` (12 GB tmpfs) fill the disk. Use worktrees on `/mnt/d` with `npm_config_cache` on `/mnt/d`, and run at most three installs at once.

## Applicability

Applies to every portfolio consumer that pins eidotter through a lockfile. If a repo's CI changes its node major, regenerate its lockfile again at that major.
