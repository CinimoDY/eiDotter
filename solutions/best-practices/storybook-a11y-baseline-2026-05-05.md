---
module: components
tags: [accessibility, axe-core, wcag, storybook, audit-baseline]
problem_type: baseline
audit_phase: 2
date: 2026-05-05
related_files:
  - .storybook/test-runner.ts
  - .storybook/preview.ts
  - solutions/best-practices/storybook-a11y-baseline-2026-05-05.ndjson
  - solutions/best-practices/storybook-a11y-real-2026-05-05.ndjson
  - solutions/best-practices/keyboard-audit-2026-05-05.md
  - solutions/best-practices/token-contrast-baseline-2026-05-05.md
---

# Storybook a11y baseline (Pass 2 — Accessibility Audit Phase 1)

Automated axe-core scan of every story in the eiDotter Storybook, run via `@storybook/test-runner` + `axe-playwright` against WCAG 2.0 + 2.1 AA tags.

## Method

1. `npm run build-storybook` produces a static build under `docs/`.
2. `python3 -m http.server 6007` serves it.
3. `.storybook/test-runner.ts` injects axe per story, runs `getViolations` against `#storybook-root` with `runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa']`, and appends one NDJSON line per story to `solutions/best-practices/storybook-a11y-baseline-2026-05-05.ndjson`.

Re-run:

```bash
npm run build-storybook
( cd docs && python3 -m http.server 6007 ) &
A11Y_REPORT_PATH=solutions/best-practices/storybook-a11y-baseline-2026-05-05.ndjson \
  npx test-storybook --url http://127.0.0.1:6007 --maxWorkers 2 --no-cache
```

## Raw counts

- **Total stories scanned:** 325 across 44 component sections.
- **Stories raising any violation (raw):** 284.
- **Stories with real violations (after filtering noise):** 48.
- **Total real violations:** 52.

### Filter rationale

Two sources of noise inflate the raw count:

1. **Registry-origin decorator** — every story is wrapped by a Storybook decorator that prints `Origin: eidotter | Used by: <consumers>` in `--color-cga-brown` (`#aa5500`) on the page background. This is Storybook chrome, not user-facing component output. Inline-style signature: `font-family: var(--font-dos, monospace); font-size: 11px; padding: 4px 8px; ...; color: var(--color-cga-brown, #AA5500)`.
2. **Color-tokens documentation stories** — stories under `Design System/Color Tokens` deliberately render every palette entry, including the intentionally-low-contrast ones used as backgrounds. Inline-style signature: `font-family: monospace; font-size: 11px`.

Both are excluded from the "real" count by inline-style match. Both should be wrapped in `aria-hidden="true"` (decorator) or excluded via `parameters.a11y.disable` (color-tokens stories) in a follow-up to clean up the signal.

## Real violations by rule

| Rule | Count | Severity (axe) | Type |
|---|---|---|---|
| `aria-prohibited-attr` | 36 | serious | **Real bug** |
| `color-contrast` | 10 | serious | Mostly story-level / docs |
| `label` | 2 | critical | **Real bug (story-level)** |
| `aria-allowed-attr` | 2 | serious | **Real bug** |
| `scrollable-region-focusable` | 1 | serious | **Real bug** |
| `link-in-text-block` | 1 | serious | Documentation-page issue |

## Findings

### 🔴 `aria-prohibited-attr` × 36 — `<Icon>` renders `<span aria-label>` without role

`src/components/Icon/components/Icon.tsx` renders:

```tsx
<span
  className={cn('icon', role && 'icon--button', className)}
  role={role}             // optional — undefined unless consumer passes it
  aria-label={ariaLabel || `${name} icon`}
>
  <IconComponent width={pixelSize} ... />
</span>
```

When `role` is not passed, the `<span>` has the implicit `generic` role. ARIA 1.2 prohibits `aria-label` on `generic`. Axe correctly flags this on every story that uses an Icon (Alert × 12, Notification × 7, Brand/Lockup × 7, Terminal × 8, Token Playground × 3, Footer × 1, ChatHistory × 1, ChatContainer × 3, etc.).

**Fix (out of scope here):** make `role="img"` the default in the `<span>` wrapper, or move the `aria-label` to the inner `<svg>` and add `role="img"` there. Track in follow-up.

### 🔴 `aria-allowed-attr` × 2 — `<Tag>` selectable role mismatch

`Components/Tag/Selectable` and `Components/Tag/Interactive`. The selectable Tag renders:

```html
<span aria-selected="true" role="button" tabindex="0">
```

`aria-selected` is allowed on `option`, `tab`, `treeitem`, `row`, `gridcell`, `columnheader`, `rowheader` — not on `button`. Either change the role to `option` (if the Tag is part of a single-select list) or use `aria-pressed` (toggle button semantics).

### 🔴 `scrollable-region-focusable` × 1 — `<ChatHistory>` log not keyboard-scrollable

`Components/Chat/ChatHistory/Interactive`:

```html
<div class="flex-1 overflow-y-auto eidotter-chat-history" role="log" aria-live="polite">
```

The log scrolls but has no `tabindex="0"`, so keyboard users can't scroll the chat history. Add `tabindex={0}` (or document that the consumer must add it on the wrapping container).

### 🟡 `label` × 2 — story-level missing label

1. `Design System/Token Playground` — uses raw `<input role="switch">` without label. Story-level.
2. `Components/Input/With Value` — story renders an `<Input>` without an associated `<label>`. The `Input` component itself supports `<label>` via React Aria's `TextField`, so this is a *story* gap, not a *component* gap.

### 🟡 `link-in-text-block` × 1 — `<LegalPage>` mailto

`Components/LegalPage/Datenschutz`. A `<a href="mailto:hello@example.com">` inside paragraph prose isn't visually distinguished from surrounding text aside from color. Underline by default in `LegalPage` body.

### 🟡 `color-contrast` × 10 — mostly story-level / docs

After filtering decorator + color-tokens noise:

- **`brand-lockup--*` × 6** — `<span class="eidotter-wordmark__prefix" aria-hidden="true">ei</span>`. The wordmark intentionally dims the "ei" prefix. Although `aria-hidden="true"`, axe still reports visual contrast because sighted users still read it. Worth a contrast bump or deliberate documentation.
- **`design-system-token-playground` × 1** — Leva debug panel text. Third-party DX; suppress at the story.
- **`design-system-dos-utilities--theme-gallery` × 1** — `<p class="dos-caption">CAPTION · MUTED COLOUR</p>`. Documentation example deliberately using muted color; suppress at story.
- **`components-legalpage--datenschutz` × 1** — `<p class="eidotter-legal-page__basis">` uses dimmed amber; consider promoting to `text-primary`.
- **`components-footer--with-extra-content` × 1** — story-supplied `<p style="color: #aa5500">` decorating the story; not a Footer-component bug.

## Component-section ranking (real violations)

| Section | Count | Dominant rule |
|---|---|---|
| Components/Alert | 12 | aria-prohibited-attr (Icon) |
| Components/Terminal | 8 | aria-prohibited-attr (Icon) |
| Components/Notification | 7 | aria-prohibited-attr (Icon) |
| Brand/Lockup | 7 | color-contrast (intentional dim) + aria-prohibited-attr |
| Components/Icon | 4 | aria-prohibited-attr (its own stories) |
| Design System/Token Playground | 3 | aria-prohibited-attr + label + color-contrast |
| Components/Chat/ChatContainer | 3 | aria-prohibited-attr |
| Components/Tag | 2 | aria-allowed-attr |
| Components/LegalPage | 2 | color-contrast + link-in-text-block |
| Components/ChatHistory | 1 | scrollable-region-focusable |
| Components/Footer | 1 | color-contrast (story-level) |
| Components/Input | 1 | label (story-level) |

## Recommendations (for follow-up plan, not this audit)

1. **Fix `<Icon>` to set `role="img"` by default on the span wrapper.** Single-line change; clears 36 violations across 8+ component sections.
2. **Fix `<Tag>` selectable ARIA pattern.** Decide between `role="option"` (within a listbox parent) and `aria-pressed` (toggle button). Update `<Tag>` and its tests.
3. **Add `tabindex={0}` to `<ChatHistory>` `role="log"` container.**
4. **Add story-level `parameters.a11y.disable: true`** to docs / playground stories that intentionally render low-contrast samples.
5. **Wrap the registry-origin decorator with `aria-hidden="true"`** so axe stops scanning it. (5 lines in `.storybook/preview.ts`.)
6. **Decide on `<Brand>` wordmark "ei" dim**. Options: keep dim (and document as a known a11y trade-off), or bump contrast. Brand identity vs accessibility — needs design call.
7. **Underline links inside `<LegalPage>` body prose by default.**

## Saved artifacts

- `solutions/best-practices/storybook-a11y-baseline-2026-05-05.ndjson` — full raw report, one JSON object per story (325 lines).
- `solutions/best-practices/storybook-a11y-real-2026-05-05.ndjson` — filtered to real component violations (48 lines).
- `.storybook/test-runner.ts` — re-run config; ready for promotion to CI.
