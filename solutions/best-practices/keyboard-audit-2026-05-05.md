---
module: components
tags: [accessibility, keyboard, focus, audit-baseline]
problem_type: baseline
audit_phase: 3
date: 2026-05-05
related_files:
  - solutions/best-practices/token-contrast-baseline-2026-05-05.md
  - solutions/best-practices/storybook-a11y-baseline-2026-05-05.md
---

# Keyboard audit (Pass 3 — Accessibility Audit Phase 1)

Per-component keyboard handling check. For React Aria components we trust the underlying primitives and only verify they aren't broken by custom code on top. For non-RA components we read the source and confirm keyboard support is present and correct.

## Method

1. Identify which components import `react-aria-components` (`grep -r "react-aria-components" src/components/`).
2. For RA components: spot-check that custom code on top does not swallow keyboard events (`e.preventDefault()` on un-handled keys) or override RA's own focus/keyboard wiring.
3. For non-RA components with interactive surfaces: read the source, identify the interactive element, verify:
   - Native semantic element (`<a>`, `<button>`, `<input>`) where possible.
   - When a non-semantic element gets `onClick`, it also gets `role`, `tabIndex`, and a keyboard handler that fires on Enter and Space.
   - ARIA state attributes (`aria-pressed`, `aria-expanded`, `aria-controls`, `aria-label`, etc.) are present where needed.

## React Aria components (17)

These import from `react-aria-components` and inherit RA's keyboard, focus, and ARIA wiring:

`Accordion`, `Alert`, `Breadcrumb`, `Button`, `Checkbox`, `CmdPalette`, `FilterBar`, `InlineExpand`, `Input`, `Lightbox`, `Modal`, `Notification`, `Switch`, `Tabs`, `Tag`, `Terminal`, `TimelineContainer`.

Spot-check: none of the inspected components add custom `onKeyDown` that calls `preventDefault()` on un-handled keys. Status: **trust RA — no findings**.

## Non-RA components with custom interactive code

### `<TimelineNode>` — interactive when `onClick` is provided

`src/components/TimelineNode/components/TimelineNode.tsx:96–109`

When `onClick` is present, the root `<div>` becomes a button:
- `role="button"`, `tabIndex={0}`, `aria-pressed={isActive}`.
- `onKeyDown` handles `Enter` and `Space`, calls `e.preventDefault()` then `onClick()`.

Existing tests assert all four (`tabIndex`, `role`, `aria-pressed`, presence of marker as `aria-hidden="true"`).

**Status: ✅ correct.** Pattern is textbook ARIA Authoring Practices.

### `<CommandPrompt>` — wraps a native `<input>`

`src/components/CommandPrompt/components/CommandPrompt.tsx`

Native input with `aria-label="Command input"`. `handleKeyDown` checks `e.key === 'Enter'` and submits — no `preventDefault` for non-Enter keys, so editing keys work normally. Outer container has `aria-label="Command prompt"`.

**Status: ✅ correct.**

### `<Chat>` — `ChatInput`, `ChatHistory`, `ChatMessage`, `ChatContainer`

`src/components/Chat/components/ChatInput.tsx` — native `<textarea>` with:
- `aria-label="Chat input"`.
- `handleKeyDown`: `Enter` (no shift) submits; `Shift+Enter` falls through to default newline.
- `e.preventDefault()` only on the submit-Enter path.

`src/components/Chat/components/ChatHistory.tsx:N` — `<div role="log" aria-live="polite">`. Test at `ChatHistory.test.tsx` asserts `aria-live`.

**Status: ✅ correct.** Standard chat-input idiom; `Shift+Enter` for newline matches user expectation.

### `<Header>` — composes `<header>` + Nav

`src/components/Header/components/Header.tsx`

Plain `<header>` element with the brand link as a real `<a>` (or whatever `linkComponent` consumers pass) and inner `<DesktopNav>` / `<MobileNav>` for navigation. No custom keyboard code.

**Status: ✅ correct.**

### `<Nav>` — desktop + mobile variants

`src/components/Nav/components/Nav.tsx`

Mobile toggle is a native `<button>` with `aria-expanded`, `aria-controls`, and dynamic `aria-label`. Mobile panel is `<nav aria-label="Mobile navigation">`. Existing test asserts the `aria-controls` link.

**Status: ✅ correct.**

### `<Footer>` — semantic nav

`src/components/Footer/components/Footer.tsx`

Inner `<nav aria-label="Footer links">` with native `<a>` items. Decorative middle dots are `aria-hidden="true"`.

**Status: ✅ correct.**

### `<InlineLink>` — semantic anchor

`src/components/InlineLink/components/InlineLink.tsx`

Real `<a href>` with safe `rel` / `target` defaults (auto-applies `noopener noreferrer` when target is `_blank`, sanitizes hrefs against `javascript:` / unknown schemes). Trailing glyph is `aria-hidden="true"`. Native anchor → native keyboard.

**Status: ✅ correct.**

### `<Brand>` — Logo, Wordmark, BrandLockup

`src/components/Brand/components/{Logo,Wordmark,BrandLockup}.tsx`

`Wordmark` and `BrandLockup` carry `aria-label="eiDotter"`; decorative `<span>` halves are `aria-hidden="true"`. `Logo` is an SVG with optional `<title>` and `aria-hidden` when no title is provided. Brand is presentational — when wrapped in a link by a consumer, the link supplies keyboard semantics.

**Status: ✅ correct.**

### `<DosFigure>` — `<figure role="img">`

`src/components/DosFigure/components/DosFigure.tsx`

Wraps subject in a `<figure role="img" aria-label={ariaLabel}>`. Pins are in a `role="list"`; pin dots are `aria-hidden`. Non-interactive — no keyboard concern.

**Status: ✅ correct.**

## Components without custom keyboard code (presentational)

These have no interactive surfaces and no keyboard concerns:

- `Badge`, `Card`, `Icon`, `Progress`, `RetroEffects`, `Separator`, `Stat`, `TextScramble`, `Tokens`, `LegalPage`, `Provenance`.

## Findings

**Zero hard keyboard failures detected in the static read.** Every interactive non-RA surface has the right ARIA state attributes, native semantic elements where applicable, and Enter/Space handlers where a `<div>` is used as a button.

**Items worth verifying with a live screen reader (deferred to a session on macOS/Windows):**

1. `<TimelineNode>` `aria-pressed` semantics. The current pattern uses `aria-pressed` for an active state on a clickable marker. If the consumer treats it as navigation (jump to a date) rather than a toggle, `aria-pressed` is the wrong state — it should be a link or use `aria-current` instead. This is a *consumer guidance* issue, not a component bug.
2. `<ChatHistory>` `aria-live="polite"` cadence. Polite is right for chat updates but very large or rapid inserts can flood AT. Verify with a real chat-bot story.
3. Mobile `<Nav>` focus management on close — confirm focus returns to the toggle button when the menu closes via the close button or backdrop.
4. `<CmdPalette>` (RA) — confirm it traps focus inside the dialog while open and restores to opener on close. RA's `Modal` should handle this; spot-check anyway since CmdPalette is recent (v0.20.0).

## Out of scope (deferred)

- Screen-reader output verification (NVDA on Windows, VoiceOver on macOS) — environment is WSL/Linux.
- High-density interaction patterns (drag-to-reorder, multi-select on TimelineContainer) — none currently exist in eidotter.
- Form validation announcements — no Form component yet.
