---
title: "Jest 30.5 breaks the Storybook test runner (module.register)"
date: 2026-10-25
category: tooling-decisions
module: eidotter
problem_type: dependency_incompatibility
component: tooling
severity: high
applies_when:
  - "Dependabot or a manual bump moves jest / jest-environment-jsdom to 30.5 or later"
  - "The `Axe a11y regression gate` step in `build (22.x)` fails with every story suite 'failed to run'"
symptoms:
  - "test-storybook: 'module.register() is not supported in Jest: the hooks would attach to the module loader running Jest itself ...'"
  - "All `*.stories.tsx` suites fail before any test; unit tests (npm test) still pass"
root_cause: upstream_incompatibility
resolution_type: version_hold
related_components:
  - ci
  - storybook
tags:
  - jest
  - storybook
  - test-runner
  - dependabot
  - axe-gate
---

# Jest 30.5 breaks the Storybook test runner (module.register)

PRs: #567 (closed), #576 (Dependabot hold).

## What happens

Jest 30.5 throws on `module.register()` / `module.registerHooks()` inside tests, because the hooks would attach to Jest's own loader. Storybook 10's `importModule` (in `storybook/dist/_node-chunks/chunk-*.js`) calls `register(importMetaResolve("storybook/internal/bin/loader"), import.meta.url)` to load the TypeScript Storybook config. `@storybook/test-runner` does that inside the Jest environment when it transforms stories, so every story suite fails to start and the CI axe gate breaks. `@storybook/test-runner` 0.26.0 (latest as of 2026-10-25) depends on `jest ^30.0.4`, so it picks up the project's 30.5.

Nothing in eidotter's code calls `module.register()`; it cannot be fixed on our side without patching Storybook or running a second, older Jest only for the test runner (npm `overrides` nesting jest 30.4 under `@storybook/test-runner`), which buys nothing: 30.5 only adds ESM automock behaviour eidotter does not use.

## Decision

Hold jest and jest-environment-jsdom below 30.5 with a Dependabot `ignore` rule in `.github/dependabot.yml`:

```yaml
ignore:
  - dependency-name: "jest"
    versions: [">=30.5.0"]
  - dependency-name: "jest-environment-jsdom"
    versions: [">=30.5.0"]
```

## When to revisit

Remove the rule when Storybook stops calling `module.register()` during config load, or `@storybook/test-runner` ships a Jest-30.5-compatible release. Check by bumping jest in a branch and running `npm run test-a11y` against a fresh Storybook build.
