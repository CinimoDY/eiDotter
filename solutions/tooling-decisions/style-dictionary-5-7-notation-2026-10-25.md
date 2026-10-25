---
title: "Style Dictionary 5.7: same token values, new notation"
date: 2026-10-25
category: tooling-decisions
module: eidotter
problem_type: dependency_upgrade
component: tokens
severity: low
applies_when:
  - "Bumping style-dictionary past 5.5.2"
  - "A token-output diff shows long alpha decimals or durations in seconds"
symptoms:
  - "Glows: rgba(255, 176, 0, 0.5) becomes rgba(255, 176, 0, 0.5019607843137255)"
  - "Durations: 100ms becomes 0.1s, 9000ms becomes 9s"
  - "tokens.test.ts motion contract fails on the literal '400ms'"
root_cause: upstream_output_change
resolution_type: test_update
related_components:
  - design_tokens
tags:
  - style-dictionary
  - tokens
  - dependabot
---

# Style Dictionary 5.7: same token values, new notation

Merged as #572 (5.5.2 → 5.7.0). It had been pinned at 5.5.2 pending a decision because the output "changed".

## What changes

- Hex alpha `80` is written exactly: 128/255 = `0.5019607843137255` instead of `0.5`. Both are 8-bit alpha 128.
- Durations are written in seconds: `100ms` → `0.1s`.

## Why it is safe

- The bundled `dist/eidotter.css` (`eidotter/styles`) is byte-identical to the 0.46.0 package: the build's minifier already wrote both forms as `#ffb00080` and `.1s`.
- Only the unminified standalone files change notation: `eidotter/tokens.css` and `eidotter/themes/*.css` (they ship from `src/styles/`).
- Pixel comparison (story with old vs new values injected, PNG diff): 0 changed pixels on live rizomorf and on Button, Switch, Header, DisplayMenu and ReviewPage in amber-mono, amber-paper and light.
- The only real risk is code that parses a duration as a number (`parseInt('100ms')`). None in eidotter, rizomorf, dmnc.tech, eidotter.com or timeline as of 2026-10-25.

## What to do on such a bump

1. Dependabot does not regenerate tokens: run `npm run build-tokens` on the branch and commit the generated CSS, or the CI freshness check fails.
2. Tests that pin literal values must compare meaning, not text. `tokens.test.ts` now parses `--motion-duration-*` as a time (`ms` or `s`).
