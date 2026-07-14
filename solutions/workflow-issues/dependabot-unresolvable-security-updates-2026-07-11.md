---
title: Dependabot "Updates" workflow fails recurrently on unresolvable transitive security updates
date: 2026-07-11
category: workflow-issues
module: eidotter
problem_type: workflow_issue
component: dependency_management
severity: low
applies_when:
  - the "Dependabot Updates" dynamic workflow shows red in the Actions tab
  - the failing dependency is not a direct entry in package.json
  - the same dependency name fails repeatedly across unrelated weeks
  - the failure does not block PRs or main (informational-only workflow)
tags:
  - dependabot
  - ci
  - github-actions
  - dependency-management
  - security-updates
  - npm
  - false-positive
---

# Dependabot "Updates" workflow fails recurrently on unresolvable transitive security updates

## Context

eidotter's `Build and Test` workflow on `main` has been consistently green. Separately, the auto-generated **"Dependabot Updates"** dynamic workflow (not a file in `.github/workflows/` — GitHub renders one job per Dependabot update job run) has been recurrently red, ~1 minute per failure, for several unrelated npm packages: `js-yaml`, `uuid`, `esbuild`, `@babel/core` (DMNC-1324).

None of these four packages are direct dependencies:

```bash
$ node -e "const d=require('./package.json'); ['js-yaml','uuid','esbuild','@babel/core'].forEach(p => console.log(p, d.dependencies[p] || d.devDependencies[p] || 'not direct'))"
js-yaml not direct
uuid not direct
esbuild not direct
@babel/core not direct
```

Every failing run is a **security-only update job** (`"command":"security"` in the job definition, triggered independently of the weekly schedule by a GHSA advisory), not a scheduled version update. Pulling the raw job logs (`gh api repos/<org>/<repo>/actions/jobs/<id>/logs`) shows the same shape of error every time:

```
updater | INFO <job_...> The latest possible version that can be installed is 3.14.2 because of the following conflicting dependency:
  A patched version exists for js-yaml, but the available update path would downgrade @storybook/test-runner from 0.24.4 to 0.17.0
updater | INFO <job_...> The earliest fixed version is 3.15.0.
...
| security_update_not_possible | { "dependency-name": "js-yaml", "latest-resolvable-version": "3.14.2", "lowest-non-vulnerable-version": "3.15.0", ... }
```

## Root cause per dependency

Confirmed by pulling logs from every failing run (`gh run list --workflow "Dependabot Updates"` → `gh api .../jobs/<id>/logs`):

| Dependency | Blocked at | Fix needs | Blocking direct dep |
|---|---|---|---|
| `js-yaml` | 3.14.2 | 3.15.0 / 4.2.0 | `@storybook/test-runner@0.24.4`, `jest@30.x`, `ts-jest@29.x` — all pin `js-yaml@^3.13.1` transitively via `@istanbuljs/load-nyc-config` (Jest's coverage-config loader, effectively unmaintained) |
| `uuid` | 8.3.2 | 14.0.0 | `@storybook/test-runner@0.24.4` — pins `uuid@^8.3.2` via `istanbul-lib-processinfo` and `jest-junit` |
| `esbuild` | 0.27.7 | 0.28.1 | `storybook@10.4.3` / `@storybook/addon-a11y` / `@storybook/addon-designs` — cap at `esbuild@^0.27.0` even at their latest release |
| `@babel/core` | 7.29.0 | 7.29.6 | Dependabot reports "could not find a lockfile update that resolves `@babel/core` to a non-vulnerable version" (no single named blocker — buried in the babel-jest/preset-env transitive graph) |

In every case, **Dependabot's own resolver correctly determines the fix is unreachable** given the currently-published versions of the direct devDependencies that pin these packages. This isn't a bug in eidotter's lockfile or a registry hiccup — it's an upstream constraint that won't resolve until `@storybook/test-runner`, `storybook`/its addons, or Jest's coverage stack cut a release with a newer pin.

## Why this became a *workflow failure* instead of a silent skip

On GitHub-hosted Dependabot (the default), a `security_update_not_possible` result just means no PR gets opened — it's invisible, not a red X anywhere. This repo runs Dependabot updates via the **Dependabot-on-Actions** path (`github/dependabot-action`), which surfaces every updater job — including ones that end in a benign "can't resolve" result — as its own Actions job run. Any job-level error (including `security_update_not_possible`) makes that job **exit non-zero**, so the dynamic "Dependabot Updates" workflow shows a failed run for something that isn't actually actionable by us.

## Guidance

Since these four packages are transitive-only and structurally blocked upstream, add scoped `ignore` entries to `.github/dependabot.yml` under the `npm` ecosystem block:

```yaml
    ignore:
      - dependency-name: "js-yaml"
      - dependency-name: "uuid"
      - dependency-name: "esbuild"
      - dependency-name: "@babel/core"
```

`ignore` applies to both version updates **and** security updates (confirmed against GitHub's dependabot.yml docs — the option is documented with both the version-update and security-update indicators), so this stops Dependabot from ever re-attempting an update it cannot resolve, for either trigger path.

This does **not** hide the underlying CVEs from view forever: once the blocking direct dependency (`@storybook/test-runner`, `storybook`, `jest`) ships a release with a newer internal pin, the normal weekly grouped `minor-and-patch` update (which does cover these direct deps) will pull the patched transitive version in automatically. The `ignore` rule only suppresses the doomed-to-fail *dedicated* security-update job for the transitive package itself.

## Why This Matters

- **A workflow can be "non-blocking" and still be worth silencing.** Persistent red noise in the Actions tab trains reviewers to ignore failures, which is a real cost even when nothing is actually broken.
- **`security_update_not_possible` is not a fixable local problem.** No lockfile refresh, `npm audit fix`, or dependabot.yml grouping change makes it resolvable — the constraint lives in a devDependency's own manifest, several versions upstream.
- **Diagnosing this required Dependabot's own updater log, not the Actions UI.** The Actions "Run Dependabot" step only shows `##[error]Dependabot encountered an error performing the update`; the actual `security_update_not_possible` detail with the conflicting-dependency explanation is only visible via `gh api repos/<org>/<repo>/actions/jobs/<id>/logs` (or the `network/updates/<job-id>` link, which needs repo-write Dependabot access).

## When to Apply

- Recurring failures in the "Dependabot Updates" dynamic workflow where the failing package is transitive-only.
- Before adding an `ignore` rule, confirm via the job logs that the failure is genuinely `security_update_not_possible` with a named (or explained) blocking dependency — don't blanket-ignore a package that's failing for a different, possibly-actionable reason (e.g., registry auth, actual lockfile corruption).

## Follow-up

Revisit each `ignore` entry periodically (or when bumping the blocking direct dependency) — remove the entry once `@storybook/test-runner` / `storybook` / `jest` ship a version whose own manifest no longer pins the vulnerable range. A quick check: temporarily remove the `ignore` entry and watch the next scheduled Dependabot run; if it succeeds, the upstream pin has moved and the `ignore` can stay removed.

## Related

- DMNC-1324: Linear issue — this triage
- `.github/dependabot.yml`: the config changed
