---
title: "Consumers must depend on published eidotter (npm), never file:../eidotter"
date: 2026-07-05
last_updated: 2026-07-05
category: developer-experience
module: eidotter
problem_type: developer_experience
component: tooling
severity: high
applies_when:
  - "Wiring a portfolio app (lifelines, remixer, dmnctech, …) up to eidotter"
  - "A consumer's CI/Docker/Vercel build fails with 'Module not found: Can't resolve eidotter'"
  - "`npm ci` succeeds locally and on CI but the build step fails only off your machine"
  - "A consumer repo's CI has been red for weeks while feature work keeps merging"
  - "Deciding how to reference eidotter from a sibling checkout during local development"
related_components:
  - development_workflow
  - documentation
tags:
  - npm
  - ci
  - vercel
  - docker
  - file-dependency
  - dangling-symlink
  - monorepo-vs-polyrepo
  - version-pinning
---

# Consumers must depend on published eidotter (npm), never file:../eidotter

## Context

eidotter is published to public npm (`eidotter@latest`, currently 0.38.0). Consumers
live in **separate repos** (lifelines, remixer, dmnctech, steuerdash, …), not a
monorepo. The correct dependency spec is a published semver range:

```json
"eidotter": "^0.37.4"
```

During local development it is tempting to point a consumer at the working copy of
eidotter sitting next to it on disk:

```json
"eidotter": "file:../eidotter"
```

This resolves on Dom's machine (where `/mnt/d/coding/eidotter` is a sibling of the
consumer) and **nowhere else**.

## The incident (lifelines, June–July 2026)

lifelines `package.json` carried `"eidotter": "file:../eidotter"`. Its CI
("Lint + Build + Docker Build") was red on `main` and every PR, each job dying in
**under ~40 seconds**, for weeks — while finance-graph feature work merged straight
on top of the red.

The trap is that **`npm ci` does not fail** on a missing `file:` target. npm creates
a *dangling symlink* `node_modules/eidotter -> ../eidotter`, the install step goes
green, and the failure only surfaces at build time:

```
Failed to compile.
Module not found: Can't resolve 'eidotter'
Module not found: Can't resolve 'eidotter/styles'
> Build failed because of webpack errors
##[error]Process completed with exit code 1.
```

Because it dies at `next build` (not install), and next bails fast, every job
finished in seconds — which reads as "some infra outage" rather than "wrong
dependency spec".

A second, independent breakage rode along: `npm run lint` (`next lint`) with **no
ESLint config committed** dropped into an interactive setup prompt, which can't be
answered in CI (`? How would you like to configure ESLint?` → exit 1).

remixer had the identical `file:`/unpublished-pin problem (plus a stray `yarn.lock`,
mixing package managers) and was fixed the same way in its PR #1.

**Fixed** in lifelines PR #12 (`d6654b3`): swap `file:../eidotter` → `eidotter@^0.37.4`,
regenerate the lockfile, add `.eslintrc.json`. All three CI jobs green afterward.

## Why it went unnoticed for weeks

1. **Local dev worked.** The sibling path resolves on the author's disk, so the break
   was invisible while coding.
2. **`main` wasn't gated on green CI.** Unlike eidotter (branch-protected, Build and
   Test required to merge — which is exactly why *its* `main` stayed green throughout),
   lifelines allowed merges onto permanently-red CI, so "red" became background noise.
3. **The clean fix needed a published version.** Both consumer fixes reference
   `^0.37.4`, published 2026-06-26 — so the corrections could only land after that.

## Guidance

### 1. Always depend on the published package

```json
"eidotter": "^0.38.0"
```

Never `file:`, never `link:`, never an unpublished git pin. If you need an unreleased
eidotter change in a consumer, **publish it first** (GitHub Release → OIDC publish;
see `project_eidotter_publish_oidc`) and bump the consumer to that version.

### 2. For genuine local iteration, use a tool that doesn't get committed

`npm link` (or `npm pack` + install the tarball) lets you test an unreleased eidotter
locally **without** editing `package.json`. `file:` edits get committed and break
everyone else's CI; a link does not.

### 3. Mind the 0.x caret gotcha

`^0.37.4` allows `0.37.x` but **not** `0.38.0` (caret on `0.x` only ranges the patch).
A consumer on `^0.37.x` will not pull a new minor (e.g. the DMNC-1281 `article` kind in
0.38.0) until you bump the range explicitly.

### 4. Guard against regressions in consumer CI

A `file:` path can never work off the author's machine, so fail fast on it. lifelines
added a zero-dependency CI job that greps `package.json`:

```yaml
guard-deps:
  name: Guard against local path deps
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - name: Reject file:/link: dependencies
      run: |
        if grep -En ':[[:space:]]*"(file|link):' package.json; then
          echo "::error::Local path dependency (file:/link:) found. Use the published npm package."
          exit 1
        fi
        echo "OK - no file:/link: path dependencies."
```

### 5. Don't diagnose a fast-red CI job as "infra"

A job that dies in a few seconds at **build/lint** (not install) is usually a
*resolution/config* problem local to the repo, not an org-level outage. Read which
step failed before reaching for expired-token / registry theories: here, install was
green and the build's "Module not found" told the whole story.
