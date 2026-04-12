---
title: Empirical font probe pattern (Playwright + canvas pixel measurement)
date: 2026-04-11
category: best-practices
module: Icon, typography, font system
problem_type: best_practice
component: testing_framework
severity: medium
applies_when:
  - A reviewer or spec claims a font change "will" cause visual regression
  - You suspect browser font-matching behavior differs from the CSS spec
  - A bitmap or pixel font renders characters with visibly different optical weight at small sizes
  - You need to decide whether to revert a font refactor based on theoretical concerns
  - You're debugging "this glyph looks wrong" complaints without a reproducible test
tags: [font, font-weight, font-synthesis, bitmap-font, playwright, storybook, canvas, empirical-verification, debugging]
---

# Empirical font probe pattern (Playwright + canvas pixel measurement)

## Context

Font-related code review findings are often **theoretical** — "narrowing `@font-face` to `font-weight: 400` will cause `<strong>` to fall back to system monospace," "reducing text size will make glyph X unreadable," "changing the face declaration will break heading elements." These claims are plausible from reading CSS Fonts specs but browser font-matching has enough edge cases that reasoning from the spec alone is unreliable. Reverting a correct refactor based on a spec-reasoning concern wastes work and keeps the original bug in place.

Similarly, user complaints like "the letter A looks smaller than M" are perceptually real but hard to act on without quantification. Is the glyph actually smaller? Is there less ink? Is the bounding box wrong? Without measurement, the fix is a guess.

This pattern — **Playwright + HTML canvas pixel measurement** — turns both classes of font concern into reproducible numbers that can refute or confirm the claim in minutes.

## Guidance

### 1. Font-matching / fallback verification via DOM probe + `getBoundingClientRect()`

When a review finding claims that certain elements will fall back to a different font face:

1. Start Storybook and navigate to a story that uses the target font.
2. Via Playwright's `browser_evaluate`, inject a probe `div` positioned offscreen with the font-family under test.
3. Inside the probe, create multiple test children: plain `<span>`, `<strong>`, `<b>`, `<h2 style="font-family: inherit">`, and a `<span style="font-weight: 700">` for explicit weight requests. Use `createElement` + `appendChild` (avoid `innerHTML` if the hook environment flags it).
4. Measure each child's `getBoundingClientRect().width` at identical font-size.
5. **Interpretation:** if all children have identical widths, the browser matched the single face for every weight request. If `<strong>` or the explicit-700 child is visibly wider, it fell back to another font in the stack.
6. **Control group — always include:** a separate probe using `font-family: monospace; font-weight: 700` to measure what actual fallback looks like. Without the control, you can't distinguish "matched the face" from "matched the face with 0.1% rendering variance."

### 2. Glyph ink-mass quantification via canvas `getImageData()`

When a perceptual complaint is about a specific letter's visual weight:

1. Create an offscreen `<canvas>` via `document.createElement('canvas')`.
2. Set `ctx.font` to the target font at the relevant size (the Button's actual computed size, not an arbitrary one).
3. Call `ctx.fillText(letter, x, y)` for each letter being compared.
4. Read `ctx.getImageData(0, 0, width, height).data` and iterate alpha channels (every 4th byte). **Count non-transparent pixels per letter.**
5. Report the ink-pixel counts side-by-side. Triangular glyphs (A, V, Y, W) have significantly less ink than rectangular ones (M, H, N, B, O) at the same font-size — the perceptual "smaller" complaint is quantifiable.

### 3. Make the measurement part of the review

Drop the raw numbers into the PR review response. A finding saying "this will regress" becomes checkable: either the numbers back it up or they don't. This short-circuits rounds of theoretical debate.

## Why This Matters

**Spec-reasoning alone is not enough.** Modern browsers match the single matching face in a `font-family` for all weight requests per CSS Fonts Module Level 4 §5.2. They do **not** fall back to the next family entry just because weight doesn't match — they only fall back if no face matches the family name at all. Reviewers (including careful, senior ones) routinely flag the wrong thing based on intuition about how CSS font-matching works. Measurement is the disambiguator.

**Perceptual complaints become actionable.** A user report of "the A looks smaller at this size" is irrefutable without numbers and unfixable without root-cause. Quantifying ink-mass (34 ink pixels for A at 14px vs 49 for M — 30% less visual mass, vs 82 for A at 22px — 2.4× recovery) turns a subjective report into an objective target: pick a size that gives A enough pixels.

**Saves work both ways.** It prevents reverting correct refactors based on false concerns, and it prevents shipping refactors that genuinely have the problem the review flagged. Either way, the decision is grounded.

## When to Apply

- A code review flags a font-related regression as P0/P1 based on spec reasoning alone
- You're about to revert work because of a theoretical concern and want to verify first
- A user reports "the A looks different / smaller / wrong"
- You're choosing a minimum font-size for a bitmap font and want to know where ink-mass becomes legible
- You're evaluating whether a fallback font stack's bold variant is actually getting used at runtime
- You're testing a new `@font-face` declaration with non-standard weight/style descriptors

**Don't over-apply:** simple `font-family` swaps, unambiguous CSS changes, or fonts with many declared weights don't need this pattern. It's for cases where browser behavior, bitmap rendering, or single-face-multi-weight-request matching makes spec reasoning unreliable.

## Examples

### Example 1 — Refuting the `<strong>` fallback claim (PR #250)

**Claim from review:** "PR #250 narrows `fonts.css` `@font-face` from `font-weight: 100 900` to `font-weight: 400` only. With `font-synthesis: none` in place, any `<strong>` or `<h1>`–`<h6>` inside a `.font-dos` element will fall back to system monospace. This is a P1 regression that reverts the fix PR #249 was meant to provide."

**Probe** (run via Playwright `browser_evaluate` on a Button story):

```js
() => {
  const measure = (nodeFactory) => {
    const host = document.createElement('div');
    host.style.cssText = 'font-family: "Flexi IBM VGA True", monospace; font-size: 20px; position: absolute; left: -9999px; white-space: pre;';
    host.appendChild(nodeFactory());
    document.body.appendChild(host);
    const w = host.getBoundingClientRect().width;
    document.body.removeChild(host);
    return w;
  };

  const text = 'HELLO WORLD 123';

  const plain = measure(() => {
    const s = document.createElement('span');
    s.textContent = text;
    return s;
  });

  const strong = measure(() => {
    const s = document.createElement('strong');
    s.textContent = text;
    return s;
  });

  const weight700 = measure(() => {
    const s = document.createElement('span');
    s.style.fontWeight = '700';
    s.textContent = text;
    return s;
  });

  // Control group: what real fallback looks like
  const monoFallback = measure(() => {
    const host = document.createElement('span');
    host.style.cssText = 'font-family: monospace; font-weight: 700;';
    host.textContent = text;
    return host;
  });

  return {
    plain, strong, weight700, monoFallback,
    strongMatchesPlain: strong === plain,
    strongMatchesFallback: strong === monoFallback,
  };
}
```

**Result:**

```
{
  plain:           126.578125,
  strong:          126.578125,
  weight700:       126.578125,
  monoFallback:    180,
  strongMatchesPlain:    true,
  strongMatchesFallback: false,
}
```

The `<strong>` element and the explicit `font-weight: 700` span both rendered at **126.578125px** — identical to plain text in the target font. The control-group monospace-bold fallback was **180px** — visibly different (42% wider). Finding refuted; refactor kept.

### Example 2 — Quantifying the "A looks small" complaint (PR #256)

**Claim from user:** "The letter A in the Button component looks smaller than I'd expect — smaller than the other capitals."

**Probe:**

```js
() => {
  const measureInk = (ch, size) => {
    const canvas = document.createElement('canvas');
    canvas.width = 200; canvas.height = 200;
    const ctx = canvas.getContext('2d');
    ctx.font = `${size}px "Flexi IBM VGA True", monospace`;
    ctx.fillStyle = '#000';
    ctx.textBaseline = 'top';
    ctx.fillText(ch, 20, 20);
    const data = ctx.getImageData(0, 0, 200, 200).data;
    let ink = 0;
    for (let i = 3; i < data.length; i += 4) if (data[i] > 10) ink++;
    return ink;
  };

  const letters = ['A', 'B', 'H', 'M', 'N', 'O'];
  const sizes = [14, 22];

  return Object.fromEntries(sizes.map(size => [
    `${size}px`,
    Object.fromEntries(letters.map(l => [l, measureInk(l, size)])),
  ]));
}
```

**Result:**

```
{
  '14px': { A: 34, B: 39, H: 37, M: 49, N: 41, O: 38 },
  '22px': { A: 82, B: 88, H: 88, M: 99, N: 96, O: 86 },
}
```

At 14px the A has **34 ink pixels** — 31% less than M's 49. The user's perception was correct: triangular glyph shape leaves the top 2/3 of the bitmap cell empty. At 22px the A has **82 ink pixels** — 2.4× more visual mass, and the perception problem disappeared. PR #256 bumped Button text from 14px to the V.37 `text-dos-text-md` (22px), root-causing and fixing the complaint together.

## Related

- PR #250 — `refactor(fonts): collapse weight tokens to single 400 weight` (the refactor the pattern protected)
- PR #256 — `fix(tokens): replace hardcoded font-size pixels with V.37 dos tokens` (the fix the pattern justified)
- CSS Fonts Module Level 4 §5.2 — font-matching algorithm spec (what the pattern validates against)
- Memory: `reference_empirical_font_probe.md` — shorthand session notes on the same pattern
