---
title: Storybook axe gate must run against a build of the current HEAD, never a restored docs/
date: 2026-10-21
category: workflow-issues
module: eidotter
problem_type: workflow_issue
component: development_workflow
severity: high
applies_when:
  - running `npm run test-a11y` locally before a PR that adds or changes stories
  - keeping the tracked `docs/` Storybook output out of a feature commit
  - reading a green axe run as proof that new components are accessible
tags:
  - storybook
  - axe
  - a11y
  - test-runner
  - docs-output
  - verification
---

# Storybook axe gate must run against a build of the current HEAD, never a restored docs/

## Context

`npm run test-a11y` does not build anything. It runs `test-storybook --url http://127.0.0.1:6007`, so it scans whatever Storybook is being served on that port. The only static build in the repo is the tracked `docs/` directory, written by `npm run build-storybook` (`storybook build -o docs`) and committed on release. CI (`.github/workflows/build.yml`) rebuilds Storybook immediately before the axe step and runs it with `A11Y_FAIL_ON_VIOLATION=1`, so CI always scans the current HEAD.

During the health-family work (branch `dominickennedy/health-metabolism-components`) the local sequence was: `build-storybook` (fresh `docs/`), then `git checkout -- docs` to keep the build output out of the feature PR, then serve `docs/` and run `test-a11y`. The gate came back green with warnings only on four old stories. It had scanned the committed Storybook from an earlier release, which contained none of the new Gauge, Meter, RangeBar, SeriesBars, DecayStrip or VitalsStrip stories. An independent reviewer later reproduced a critical `aria-required-attr` violation on the Gauge and Meter unknown/loading states (`role="meter"` without `aria-valuenow`), which CI would have failed on.

## Guidance

1. Build, then test, then clean up, in that order. Never run `git checkout -- docs`, `git clean docs`, or `git stash` between `npm run build-storybook` and `npm run test-a11y`.
2. Before trusting a green run, confirm the served build is the one you think it is: `grep -c '"components-gauge' docs/index.json` (substitute a story id from the change) must be non-zero, and `docs/index.json` must be newer than the last source edit.
3. Restore `docs/` only after the gate has run, and keep it out of the feature commit; it is release output.
4. The runner needs a Playwright browser: if `test-a11y` fails with "Executable doesn't exist at .../chrome-headless-shell", run `npx playwright install chromium` once.
5. The runner appends every result to `A11Y_REPORT_PATH`, which defaults to `solutions/best-practices/storybook-a11y-baseline-2026-05-05.json` (see `.storybook/test-runner.ts`). Set `A11Y_REPORT_PATH=/tmp/a11y-local.jsonl` for local runs, or delete the appended file afterwards; do not commit it with a feature.
6. Serve with a static server on 6007, for example `npx http-server docs -p 6007 -s`, and stop it when done.

## Why This Matters

A gate that scans the wrong artefact fails silently in the green direction. Nothing in the runner output says which build was served, so the only defence is ordering and a check on the served `index.json`. Shipping with the stale result costs a red CI run on the PR and, worse, a confident but false accessibility claim in the handoff.

## When to Apply

- Any local run of `npm run test-a11y`, especially when new stories were added.
- Any workflow that rebuilds `docs/` and later restores it to keep the diff clean.
- Reviews that cite "axe-clean" as evidence: ask which build was served.

## Examples

Wrong order (what happened):

```bash
npm run build-storybook
git checkout -- docs            # restores the old release build
npx http-server docs -p 6007 -s &
npm run test-a11y               # green, but scanned the old build
```

Right order:

```bash
npm run build-storybook
grep -c '"components-gauge' docs/index.json   # must be > 0
npx http-server docs -p 6007 -s &
A11Y_REPORT_PATH=/tmp/a11y-local.jsonl npm run test-a11y
kill %1
git checkout -- docs && git clean -fdq docs    # only now
```

## Related

- `solutions/best-practices/storybook-a11y-baseline-2026-05-05.md` (baseline and known failures)
- `.storybook/test-runner.ts` (report path, `A11Y_FAIL_ON_VIOLATION`, known-failures allowlist)
- `.github/workflows/build.yml` (the CI order the local run must mirror)
- Plan: `plans/2026-10-21-001-feat-health-metabolism-components-plan.md` (local); Linear DMNC-1572
