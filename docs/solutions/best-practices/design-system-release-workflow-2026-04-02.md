---
title: Design System Release Workflow — npm Publish + Consumer Propagation
module: eidotter
date: 2026-04-02
problem_type: best_practice
component: development_workflow
severity: medium
applies_when:
  - Publishing a new version of a design system consumed by multiple projects
  - Accumulating multiple PRs on main before releasing
  - Needing to propagate updates across 7+ consumer projects
tags:
  - release
  - npm-publish
  - design-system
  - consumer-updates
  - lock-file
---

# Design System Release Workflow — npm Publish + Consumer Propagation

## Context

eidotter is consumed by 9 projects. Changes accumulate on main across multiple PRs before a release. The release process involves version bump, Storybook rebuild, npm publish, and updating all consumer projects. Two releases were done in this session (v0.14.0 and v0.15.0), surfacing friction points.

## Guidance

### 1. Fix the lock file before releasing

CI on eidotter failed for all dependabot PRs because `package-lock.json` had stale `@types/react@19.1.2` while npm wanted `19.2.14`. Fix: delete `node_modules` and `package-lock.json`, reinstall with `--legacy-peer-deps` (needed when Storybook's deep dependency tree has peer conflicts), then commit the fresh lock file as part of the release PR.

### 2. Release checklist

1. `package.json` version bump (semver: new components/features = minor)
2. `src/index.ts` version constant
3. `CLAUDE.md` version header
4. `npm run build` — verify clean
5. `npm run build-storybook` — rebuild static docs
6. Commit all via PR (branch protection requires it)
7. Merge PR
8. `npm publish` from main
9. Update consumers: `npm install eidotter@latest` in each project
10. Batch commit + push consumers
11. Close the release Linear issue

### 3. Consumer update pattern

```bash
for dir in /mnt/d/coding/dmnctech /mnt/d/coding/eidotter-home ...; do
  cd "$dir"
  npm install eidotter@latest
done
```

Some projects need `--legacy-peer-deps` (Pomodoke Calendar). Batch commit with a uniform message: `chore: bump eidotter to vX.Y.Z`.

### 4. Don't skip review on release PRs

Even though release PRs are "just config + docs", they can include lock file changes that affect CI. At minimum do an inline self-review checking: version numbers match across files, lock file is refreshed, Storybook build succeeded, no unintended file deletions.

### 5. Create the Linear issue before releasing

Create a "chore: publish vX.Y.Z" issue listing all accumulated changes. This gives a clear checklist and can be closed after publish + consumer update.

## Why This Matters

A design system release affects 9+ downstream projects. A broken lock file or skipped version constant means CI failures cascade across the portfolio. The batch consumer update takes 2 minutes when scripted but would be easy to forget for individual projects.

## When to Apply

- Multiple PRs have merged to main since the last npm publish
- A new feature or breaking change needs to reach consumers
- CI is failing on dependabot PRs (likely lock file drift)

## Related

- v0.14.0 release (PR #180) — first time through this workflow
- v0.15.0 release (PR #192) — included lock file fix
- DMNC-587 — dependabot PR cleanup (still open)
