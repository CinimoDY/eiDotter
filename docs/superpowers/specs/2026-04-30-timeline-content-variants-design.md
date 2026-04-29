# Timeline content-type variants — Design

**Status:** Draft
**Issue:** [DMNC-877](https://linear.app/lizomorf/issue/DMNC-877/adaptive-content-type-variants-for-timelineentrycard) (parent: DMNC-581)
**Date:** 2026-04-30
**Repo:** `eidotter` (with breaking change consumed by `dmnctech`, `rizomorf`, eidotter stories)

## Context

`TimelineEntryCard` currently renders the same shape for every entry: title, type badge, tags, and a string-or-ReactNode `content` field that expands inline on selection. This works for text-heavy logs but is awkward for visual content. Consumers either render generic cards (lossy for images) or override entirely via `renderEntry` (everyone reinvents the same gallery).

DMNC-581 originally asked for five adaptive variants (text, single image, gallery, static label, code). This spec covers **only image and gallery** for v1; static-label and code are deferred. The parent issue tracks the rest.

The immediate consumer is `dmnctech`'s Log page screenshots tab, which today is a hand-rolled 2-column grid with a hand-rolled lightbox. Shipping image + gallery variants in eidotter unifies that surface with the design system and lets `rizomorf` and future surfaces benefit without re-implementing.

## Goals

1. Each timeline entry can declare its content kind (`text` / `image` / `gallery`) on the data, not at the call site.
2. `TimelineEntryCard` renders the right UI per kind, with no `variant` prop on the component.
3. Gallery interaction matches iOS Photos: layered grid → grow-in-place → fullscreen lightbox.
4. A reusable `Lightbox` component ships in eidotter and is also usable outside Timeline.
5. Existing visual identity preserved: cards keep their slide+glow hover, Lightbox extends Modal's CRT phosphor entrance, all colors via design tokens.

## Non-goals

- Code/syntax-highlighting variant. Bringing in shiki/prism is its own scope and bundle decision.
- Static-label variant. Already approximated by an entry with empty content.
- Master-detail / level-3 expansion (timeline as side nav). Tracked separately as DMNC-878.
- Image upload, transformation, or backend integration. Consumers provide URLs.

## Data model

`TimelineEntryData` becomes a discriminated union with required `kind`. **Breaking change** — every existing consumer adds `kind: 'text'` to existing entries.

```ts
// File: src/components/TimelineContainer/components/types.ts

interface TimelineEntryBase {
  id: string;
  date: string;            // ISO 8601 or display date
  title: string;
  type?: 'event' | 'project' | 'milestone';   // semantic type, unchanged
  tags?: string[];
}

export interface TimelineImage {
  src: string;             // required full-resolution URL
  alt: string;             // required for a11y; pass '' for purely decorative
  thumbnail?: string;      // optional separate low-res URL for grids
  width?: number;          // optional intrinsic width in px (layout reservation)
  height?: number;         // optional intrinsic height in px
  caption?: string;        // optional caption shown in lightbox
  date?: string;           // optional ISO date — overrides parent for ordering/display
  tags?: string[];         // optional per-image tags
  link?: string;           // optional URL — if set, thumb link-outs (no grow, no lightbox)
}

export type TimelineEntryData =
  | (TimelineEntryBase & { kind: 'text';    content?: ReactNode })
  | (TimelineEntryBase & { kind: 'image';   image: TimelineImage })
  | (TimelineEntryBase & { kind: 'gallery'; images: TimelineImage[] });   // images.length >= 1
```

Type-level invariants:
- `kind: 'image'` forces `image` to be present.
- `kind: 'gallery'` forces `images` to be present (runtime: array length ≥ 1; consumers passing `[]` get a console error in dev and an empty-state message).
- The deprecated `TimelineEntry` alias is removed in this PR (clean break).

`TimelineEntryRenderContext.defaultRender()` — used by consumers' `renderEntry` callback — keeps working: it dispatches on `entry.kind`.

## Components

### `TimelineEntryCard` (modified)

No new prop. Internally switches on `entry.kind`:

- **`text`** — existing behavior. Trigger+panel with `content` rendered in expanded state. Unchanged.
- **`image`** — collapsed: title + thumbnail (uses `image.thumbnail || image.src`); expanded: thumbnail expands to full-width inline. Click on full-width image opens `Lightbox` with `images={[entry.image]}`. If `image.link` is set, the thumb wraps `<a href={link}>` and clicks navigate out (no expansion, no lightbox).
- **`gallery`** — collapsed: title + thumb grid (uses each `image.thumbnail || image.src`); expanded: full grid with iOS Photos two-stage interaction (see below).

The card's existing border/hover/expanded/selected styling applies across all kinds. No new card chrome.

### `<Lightbox>` (new)

```ts
// File: src/components/Lightbox/components/Lightbox.tsx

export interface LightboxProps {
  images: TimelineImage[];
  initialIndex?: number;       // default 0
  isOpen: boolean;
  onClose: () => void;
  onIndexChange?: (index: number) => void;
}
```

Built on the existing `Modal` primitive — reuses `eidotter-modal-overlay`, `modal-crt-enter`/`modal-crt-exit` keyframes, and overlay tokens. Differences from Modal:

- Container is sized to image, not 480px.
- No header/footer slots. Caption rendered below image. Image alt text on `<img alt>`.
- Prev/next arrows: DOS-block buttons in `--color-cga-light-gray`, hover→`--color-cga-yellow` (matches Modal close button pattern).
- Counter: `[ 3 / 7 ]` in monospace, top-right.
- Keyboard: `Esc` closes, `←` / `→` navigate (no-ops at array bounds — no wrap-around in v1).
- Touch: horizontal swipe navigates (use a small gesture hook; no library).
- `onIndexChange` fires when navigation moves between images, so a parent can sync URL/state.

Reusable: any consumer needing a fullscreen image viewer (not just Timeline) can use `Lightbox` directly.

### iOS Photos two-stage interaction (gallery)

State machine inside the gallery card:

| State | Trigger | Visual |
|---|---|---|
| `grid` (default) | initial / from `focused` | All thumbs in CSS Grid `auto-fit`, `aspect-ratio: 4/3` cells unless image has explicit dimensions, `gap: var(--spacing-2)`. Each cell uses the existing card border/hover treatment. |
| `focused` | tap a thumb without `link` | The tapped cell gains `grid-column: span 2; grid-row: span 2`; others reflow. CSS transition on grid-template handles animation. Tap focused cell again, or another cell, swaps focus. |
| `lightbox` | tap focused cell | `Lightbox` opens with the full `images` array, `initialIndex` set to focused image. Closing returns to `focused` state. |

Tap a thumb with `link` set: navigate out via `<a>`. No focus, no lightbox.

The state lives in card-local state (not entry data). On collapse of the parent timeline card, state resets to `grid`.

## Aesthetics — anchored to current eidotter

Verified against:
- `src/components/TimelineContainer/components/TimelineEntryCard.css`
- `src/components/Modal/components/Modal.css`
- `src/components/Card/components/Card.css`

| Element | Token / value |
|---|---|
| Image cell border (default) | `var(--border-width-thin, 1px) solid var(--color-semantic-border-default)` |
| Image cell hover | `border-color: var(--color-semantic-text-accent); box-shadow: var(--shadow-glow-sm); transform: translateX(2px);` (matches `.eidotter-timeline-card:hover`) |
| Image cell focused (gallery) | `border-color: var(--color-semantic-text-accent); box-shadow: var(--shadow-glow-md);` (one step up) |
| Grid gap | `var(--spacing-2)` |
| Grid columns | `repeat(auto-fit, minmax(120px, 1fr))` (mobile-first; consumer can override via className) |
| Lightbox container border | `2px solid var(--color-cga-yellow)` (mirrors Modal exactly) |
| Lightbox backdrop | `var(--effects-overlay)` + `backdrop-filter: blur(2px)` (mirrors Modal) |
| Lightbox enter animation | reuse `modal-crt-enter` (400ms, blur+brightness+scale ramp) |
| Lightbox exit animation | reuse `modal-crt-exit` (200ms) |
| Lightbox prev/next/close buttons | `--color-cga-light-gray` → `--color-cga-yellow` on hover, `outline: 2px solid var(--color-semantic-border-focus)` on `:focus-visible` |
| Caption text | `--color-cga-light-gray`, `var(--typography-font-size-text-sm)`, `line-height: 1.5` |
| Counter | `var(--typography-font-family-primary)`, `var(--typography-font-size-text-xs)`, `--color-cga-amber` |
| Page-level RetroEffects (scanlines etc.) | inherited automatically — Lightbox does NOT add its own |

Reduced motion: all transitions and CRT animations disabled under `prefers-reduced-motion: reduce`. High contrast: borders bumped to 3px (matches existing Modal/Card pattern).

## Migration

### Breaking changes

- `TimelineEntryData` now requires `kind` on every entry.
- The deprecated `TimelineEntry` alias is removed.

### Consumer updates

- **`dmnctech`** — devlog entries get `kind: 'text'`; journal entries get `kind: 'image'` with the existing `image` filename mapped into `TimelineImage.src` + `alt` (use `caption` from frontmatter if present). Log page screenshots tab uses the new image variant; the hand-rolled lightbox is removed in favor of the new `<Lightbox>`.
- **`rizomorf`** — every existing entry gets `kind: 'text'`. No new functionality required for v1.
- **eidotter stories** — `TimelineContainer.stories.tsx` and `TimelineEntryCard.stories.tsx` get a story per kind.

### Within eidotter

- `TimelineEntryCard` becomes a dispatcher; existing rendering becomes the `text` branch.
- `TimelineEntryCardImage`, `TimelineEntryCardGallery` are internal modules under `TimelineContainer/components/variants/` (not exported separately — exported is the dispatcher).

## Tests

- **`TimelineEntryCard`** — snapshot/render test per kind (text, image, gallery). Click-to-toggle still works. `image.link` produces an `<a>` and skips the lightbox.
- **`Lightbox`** — open/close, keyboard nav (←/→/Esc), bounds (no wrap), `onIndexChange` fires, touch swipe.
- **Gallery state machine** — `grid → focused → lightbox` transitions. Reset on parent collapse.
- **Visual regression** — Storybook stories per kind; the `chromatic`/`Storybook test runner` already in use captures any visual drift.
- **Accessibility** — focus order in lightbox (Esc returns focus to the trigger that opened it), `aria-expanded` still correct on the gallery trigger, `aria-label` on prev/next buttons. If the existing test suite has axe-core wired, run a sweep per kind; otherwise add it as a follow-up.

## Verification (end-to-end)

After implementation:

1. `cd /mnt/d/coding/eidotter && npm run build` passes.
2. `npm run test` passes; new tests cover the matrix above.
3. `npm run storybook` — manually walk text / image / gallery stories at desktop and 390px width. iOS Photos two-stage interaction reproduces by hand.
4. `cd /mnt/d/coding/dmnctech && npm install ../eidotter` (or version bump after publish), update entry data with `kind`, run `npm run dev`. Visit `/log`, switch to screenshots tab, click a thumb — should open the new Lightbox. Click a devlog entry — should still expand inline as today.

## Open questions / risks

- **Bundle size**: adding `Lightbox` is small (no new deps); the gallery CSS-Grid logic is also small. No code-split needed in v1.
- **CSS Grid `transition: grid-template`**: support is good (Chromium 117+, Firefox 116+, Safari 17+). Reduced-motion users see hard cuts, which is acceptable.
- **Lightbox SSR**: matches Modal's behavior — overlay portals to `document.body`, mounted on client only. Existing pattern.
- **Theme color drift**: Modal uses `--color-cga-yellow` directly (not theme-aware). Lightbox does the same for consistency. A separate ticket should make Modal theme-aware; this spec inherits the existing inconsistency rather than introducing a new pattern.

## Out of scope (filed elsewhere)

- Code variant (DMNC-581 follow-up, not yet sub-issued)
- Static-label variant (DMNC-581 follow-up)
- Master-detail layout (DMNC-878)
- Modal/Lightbox theme-portability fix (separate follow-up — file when this lands)
