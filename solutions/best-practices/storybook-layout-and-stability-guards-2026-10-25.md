---
title: "Storybook layout and stability guards in the test runner"
date: 2026-10-25
category: best-practices
module: eidotter
problem_type: best_practice
component: storybook
severity: medium
applies_when:
  - "A story should prove it does not scroll sideways at phone widths"
  - "A story should prove Header end-slot controls are not clipped"
  - "A story should prove controls keep their position across themes or when used"
symptoms:
  - "A page template scrolled sideways at 320/390 on a consumer site while every unit test passed (DMNC-1617)"
  - "A header control's box was cut off at 320 (DisplayMenu, DMNC-1619)"
root_cause: missing_guard
resolution_type: test_infrastructure
related_components:
  - testing
  - accessibility
tags:
  - storybook
  - test-runner
  - layout
  - overflow
  - stability
---

# Storybook layout and stability guards in the test runner

Added in 0.44.0 to 0.46.0 (DMNC-1617, DMNC-1619). They live in `.storybook/test-runner.ts` `postVisit`, run in the CI axe step, and are always on (not tied to `A11Y_FAIL_ON_VIOLATION`).

## The parameters

- `noOverflowAt: [320, 390]`: resizes the viewport to each width and fails if `document.documentElement.scrollWidth` exceeds it.
- `noHeaderEndClip: true` (with `noOverflowAt`): at the same widths, fails if any child of a `.eidotter-header__end` slot extends past the slot's box (the slot is built to clip when the row runs out of room).
- `stable: { watch: [selectors], themes?: [names], click?: selector }`: records each watched element's box, switches themes the way the Storybook toolbar does (`data-theme` on `<html>` and the wrapper), then clicks `click`, and fails if any box moved or resized. This encodes Dom's rule "settings and menu controls must not change position when used".

## Gotchas

- `#storybook-root` has 32px padding (`.storybook/styles.css`) even with `layout: 'fullscreen'`. A page story at "320" then has only 256px minus gutters. Page stories zero it with `#storybook-root:has(.review-page) { padding: 0 }` in their story CSS, or a decorator with a negative margin.
- Run the test runner against your own static server on a free port (e.g. `python3 -m http.server 60xx --bind 127.0.0.1 --directory docs`). Port 6007 is often held by another session's server: a "Couldn't find story ... after HMR" error means you are testing someone else's build. Kill only your own server PID.
- On WSL, two test-runner workers sometimes fail `injectAxe`; rerun with `--maxWorkers 1` before treating it as a real failure.
- `docs/` is tracked Storybook output: `git checkout -- docs && git clean -fdq docs` after a local build, and delete the `solutions/best-practices/storybook-a11y-baseline-*.json` report the runner writes.
- A real pixel check of a theme or token change: screenshot the story, override the changed CSS variables in the page, screenshot again, and diff the two PNGs in a canvas. That found 0 changed pixels for the style-dictionary 5.7 bump.
