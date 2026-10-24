# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **`PageShell` + `PageSection` (new).** The "one block" page layout from the review-page template: one centred column (`maxWidth`, default 1240px) with a `max(16px, safe-area)` gutter and 24px / 64px block padding; `header`, structured `intro` (eyebrow, `<h1>` in the display face at `clamp(2.4rem, 5cqi, 3.6rem)`, lead, meta row, TOC chips in a labelled `<nav>`), sections and `footer` share one left edge with a 40px gap and no dividers. `contentAs` (`main` default, or `div` for layouts that already render `<main>`) and `contentId` (skip-link target). `PageSection` renders a `<section>` with an h2 (display face, accent, no rule; `headingLevel` 2 to 4) 16px above its content, labelled by its heading when it has an `id`. A `Header` in the `header` slot drops its inline padding so its brand sits on the column edge. Server-safe.
- **`Bench` (new).** Compare unit on `DosWindow`: the title is a heading after DosWindow's `▸` marker (`headingLevel`, default 3), `chips` wrap in the strip's end slot, an optional muted `note`, then `panes` (`{ label, content, tone: before | after | neutral, frame: desktop | phone, frameLabel }`) side by side with a 1px gap painted by the grid background, no divider elements. Pane frames scroll (`maxHeight`, default 640px; 520px when stacked), are keyboard-focusable named groups, and phone frames centre at 390px with 12px padding. Panes stack below 760px of bench width (container query). Server-safe.
- **`Header` `layout`, `rule`, `contained`, `brandCollapse` (opt-in).** `layout="stacked"` puts the desktop nav on its own row under the brand (end slot and MENU stay on the brand row); `rule={false}` drops the bottom line and its glow; `contained` (`true` = 1240px, or any CSS length) centres the content in a column with the PageShell gutter while the band stays full width; `brandCollapse="mark"` shows only the icon below 480px of header width (container query) with the name kept as the accessible name. Defaults render as before.
- **Story `Templates/ReviewPage`.** PageShell + stacked Header without a rule + intro + findings grid + metrics table + two Benches + sign-off list, with placeholder screens (FIXTURE ONLY, illustrative).

### Changed
- **`Header` brand wraps instead of ellipsizing.** Visible to every consumer with a long brand on a narrow screen: the name moves onto further lines instead of ending in an ellipsis. The brand link shrinks first, so the end slot clips only after the brand reaches its floor (icon + about 8 tracked characters); words break at spaces, and only a single word longer than the floor breaks mid-word. The icon top-aligns beside a wrapped name; a one-line lockup renders as before.

## [0.42.0] - 2026-10-24

Fixes from the portfolio-wide 0.41 adoption (DMNC-1612) plus two additive props. `Lightbox` no longer clips tall portrait images at phone width and hides prev/next for a single image; `RangeBar` legend names stay whole in narrow containers; `CmdPalette` and `CommandPrompt` stay legible at 390px; `Nav` `linkComponent` accepts `next/link` under @types/react 18 (`NavLinkProps`/`NavLinkComponent` exported); `IconButton` gains `size="touch"` (44px) and `tone="inherit"`. The guide documents how to keep the body-tier fonts out of a build that never uses them. Also carries last night's dependency updates (vite 8.3, storybook 10.6, chromatic 18, axios, joi, js-yaml, postcss and friends; dependabot alerts 44 → 0). Consumers: `^0.42.0` (0.x caret, bump explicitly).

### Added
- **`IconButton` `size="touch"` and `tone` (DMNC-1612).** Additive, defaults unchanged. `touch` is a 44×44 target with a 24px glyph for stage and kiosk shells. `tone="inherit"` makes the glyph, the outline and the focus ring follow the surrounding text colour (`currentColor`), and hover/press tint the button with that colour instead of the amber invert, so the control reads on a coloured status bar (set the bar's `color`). `tone="accent"` is the default look. `IconButtonTone` type exported from the barrel.
- **`NavLinkProps` and `NavLinkComponent` types (DMNC-1612).** Exported from the barrel; `NavLinkComponent` is the type of `linkComponent` on `Nav`, `Header`, `TimelineFeed` and `TimelinePage`.

### Fixed
- **`Lightbox` no longer clips the top of tall images at phone width (DMNC-1612).** 0.41 regression: the dialog body scrolls, but the figure was centred with `justify-content: center`, so when a portrait image plus the phone prev/next row and caption was taller than the body, its top sat above the scroll origin and could not be reached (about 100px at 390px wide). The figure is now centred with auto block margins, which collapse to 0 when it overflows, so the body scrolls from the figure's top edge. Short figures stay centred.
- **A one-image `Lightbox` renders no prev/next (DMNC-1612).** Two permanently disabled IconButtons were noise. The `[ 1 / 1 ]` counter stays as the strip title; arrow keys and swipes already did nothing.
- **`RangeBar` legend names no longer break mid-word next to a long duration (DMNC-1612).** The name column shrank to fit the duration ("Zielbe/reich" next to "… min/Tag" at 390px). Each legend row is now the swatch plus one wrapping line holding the name and a percent/duration group: when they do not fit side by side, percent and duration move under the name, right-aligned, before the name wraps, and a word breaks only when it alone is wider than the row. Rows without a `duration` no longer render an empty cell. New hooks `eidotter-range-bar__text`, `__meta`, `__duration`; the row is no longer a CSS grid.
- **`CmdPalette` labels keep every character at phone width (DMNC-1612).** The hint column did not shrink, so labels lost their last character. The label now holds its width and the hint gives way first, truncating with an ellipsis; a label wider than the whole row truncates its own text (new `eidotter-cmdpal__item-text` span). The default footer wraps between key hints and never inside "ESC CLOSE" (`eidotter-cmdpal__key-hint`). Narrow-palette spacing is a container query on the palette (`eidotter-cmdpal`, below 30rem), not a media query.
- **`CommandPrompt` placeholder truncates with an ellipsis (DMNC-1612).** A placeholder wider than the input was cut mid-glyph; it now ends in "…" (also an unfocused value). A `min-width` you set on the input that is wider than the line still clips at the prompt's edge; that width is yours to choose.
- **`Nav` `linkComponent` accepts `next/link` under @types/react 18 (DMNC-1612).** The prop was `React.ComponentType<…>`, and @types/react 18 compares `propTypes`, where Link's `href: string | UrlObject` validator does not match `string`, so Next apps needed a wrapper. It is now `ComponentType | ExoticComponent` of `NavLinkProps`, which accepts `next/link` directly under @types/react 18 and 19 and still rejects components that cannot take a string `href`. Type-only change; `Header`, `TimelineFeed` and `TimelinePage` share it.
- **Two-tier typography is dated 0.37.2 in the CHANGELOG and the upgrade guide (DMNC-1612).** The CHANGELOG described it under 0.38.0 while the guide said 0.37.2; the npm package first ships the JetBrains Mono woff2 files in 0.37.2, so the entry moved to a new 0.37.2 section and the guide's "Jumping from older versions" line drops its caveat.
- **Body-tier font files in your build output documented (DMNC-1612).** Bundlers copy all four JetBrains Mono Nerd Font woff2 files (about 4 MB) into the build even when no page uses the body tier. By design: browsers download only the faces a page uses, so the cost is deploy size, not page weight. `guidelines/README.md` "Fonts: what your build emits" shows a Vite step that drops the four `@font-face` rules (a test pins the pattern to the shipped CSS); `eidotter/styles` is unchanged.

## [0.41.3] - 2026-10-23

Patch with the fixes found while bumping the six portfolio sites to 0.41.x: `Header items={[]}` renders no nav, Header brand focus ring and end-slot glow clipping, `DosDialog` `head.headingLevel`, `Terminal` is no longer a `dialog`, and upgrade-guide corrections including the recommended Tailwind v4 layered import. Use `^0.41.3`.

### Added
- **`DosDialog` `head.headingLevel` (DMNC-1611).** Additive: `2` (default, unchanged) to `6` sets the heading level of a structured, non-decorative `head.title` in both modal and `inline` mode, so an inline preview inside a card whose own title is an `<h3>` can keep the heading order (pass `4`). Out-of-range values fall back to `<h2>`; ignored when `decorative` is set. `DosDialogHeadingLevel` type exported.

### Changed
- **`Terminal` is a named group, not a dialog (DMNC-1611).** Visible to assistive tech: the window root is `role="group"` with the same `aria-label` ("`<title>` terminal window") instead of `role="dialog"`. Terminal is in-page chrome with no focus trap or `aria-modal`, so screen readers no longer announce a dialog. Tests that query `getByRole('dialog')` for a Terminal must query `getByRole('group', { name: /terminal window/ })`.

### Fixed
- **`Header` `items={[]}` renders no nav (DMNC-1611).** An empty `items` array rendered an empty `<nav>` landmark and, below 768px, a MENU trigger that opened an empty panel. Both are skipped now; the `end` slot still renders. Workarounds that hide `.eidotter-nav` can go.
- **`Header` brand link has the house focus ring (DMNC-1611).** `:focus-visible` draws the 2px `border-focus` outline at a 2px offset in both variants, instead of the browser's default `outline: auto`. Added to the CSS focus-ring contract test.
- **`Header` `end` slot no longer clips focus rings and glows (DMNC-1611).** The slot was `overflow: hidden` with a 4px inset, so a checked Switch's 12px phosphor glow (and taller rings) were cut, visibly at 390px. Where `overflow: clip` is supported it now clips the inline axis only, with a 12px inline bleed (padding plus an equal negative margin, layout unchanged); it still shrinks before the brand name does. Older browsers keep the previous behaviour.
- **`CmdPalette` `maxResults` documented (DMNC-1611).** The default of 20 also caps the empty query, so a site with more than 20 items hides the rest until the user types; the JSDoc and the guide's CmdPalette recipe say so (pass `maxResults={items.length}`). No behaviour change.
- **Tailwind v4 setup documented: load eidotter's CSS in a cascade layer (DMNC-1611).** `dist/eidotter.css` ships about 200 component-used stock utilities (`.flex`, `.flex-col`, `.hidden`, …) unlayered, so in a Tailwind v4 app they beat the app's layered utilities (an app `md:flex-row` lost to eidotter's `.flex-col`). The recommended consumer setup is `@layer theme, base, components, eidotter, utilities;` then `@import "tailwindcss";` then `@import "eidotter/styles" layer(eidotter);`, with the JS `import 'eidotter/styles'` removed. Trade-off: inside the layer, eidotter loses to the app's unlayered global rules and its reset beats the app's `@layer base` element defaults, so apps keep resets layered. In the guide, README, CLAUDE.md and llms.txt; the dist build is unchanged (DMNC-1607).
- **Guide favicon recipe for Next.js on Vercel (DMNC-1611).** npm `prebuild` does not run when the host calls `next build` directly (`vercel.json` `buildCommand`); the guide adds a copy from `next.config` at load.
- **Upgrade guide `migrations/0.41.0.md` (DMNC-1611).** Install line and banner say the latest 0.41.x (0.41.2 or later); "How to bump" saves the old `dist/eidotter.css` before `npm install`; the section 7 keyframe search names the retired `cmdpal-*` keyframes in full so it no longer matches consumer classes like `.cmdpal-demo__*`; the CmdPalette steps say Ctrl+K on Linux and Windows, ⌘K on macOS; two-tier typography is listed under 0.37.2, where it shipped (the 0.38.0 section below describes it).
- **Correction to 0.41.1 (DMNC-1611).** The 0.41.1 "16px floor wording" bullet appears twice; the copy that still names LegalPage's 12–14px scale as an exception is wrong. LegalPage sits on the 16px floor since 0.41.1 (DMNC-1610); the only named exceptions are the em-relative secondary glyphs.
- **`TimelineContainer` `article` content with block elements (DMNC-1611).** Regression test only, no code change: the `content` slot is already wrapped in a `<div>`, so `<p>`/`<ul>` in consumer content produce no `<p>`-in-`<p>` nesting error. The error seen on dmnc.tech comes from MDX source that writes `<p data-provenance="ai-draft">` with the text on its own lines, which MDX compiles to a `<p>` inside a `<p>` (fix on the consumer side).

## [0.41.2] - 2026-10-23

Patch: `TextScramble` and `Stat scramble` no longer ship random glyphs in server HTML. Use `^0.41.2`.

### Fixed
- **`TextScramble` and `Stat` `scramble` render the real text on the server** (DMNC-1609). `useTextScramble` used to pick random glyphs in its initial state, so server HTML shipped glyphs instead of the text and hydration failed with React error 418. The server render and the first client render now output the target text, byte-identical; the scramble (and the `prefers-reduced-motion` check) starts in an effect after mount. A layout effect on the client swaps in the first scrambled frame before paint, so client-only mounts still open on glyphs, not a flash of the final text. Public API unchanged.

## [0.41.1] - 2026-10-23

Patch on top of 0.41.0, which was published before the post-merge review fixes landed. **Use `^0.41.1`, not 0.41.0:** 0.41.0's `dist/eidotter.css` lacks the eidotter token utilities the 0.41.0 upgrade guide promises, still lets the unlayered reset cancel Tailwind v4 consumer utilities, drops Stat's colours through `cn()`, and has unreadable chart and pressed-button colours in some themes. No API changes; the [0.41.0 upgrade guide](migrations/0.41.0.md) applies unchanged.

### Added
- Code↔Figma contracts for the health family (Gauge, Meter, MeterGroup, RangeBar + RangeBar Segment, SeriesBars + SeriesBars Bar, DecayStrip, VitalsStrip) (DMNC-1572)
- **`SeriesBars` `unit` and `format` props (DMNC-1610).** Additive. `format` takes the family's `formatValue` options (`digits`, `percent`, `signed`), `unit` is appended to every value and the goal, so the accessible summary, the hidden value table and the bar titles read "70 %" instead of "70". A goal label that already contains the formatted goal value is not repeated in the summary ("Ziel 70 %", not "Ziel 70 % 70").
- **Health value-model types from the barrel (DMNC-1610).** `Tone`, `ValueStatus`, `Provenance`, `Band` and `HealthLabels` are exported from `eidotter`, types only; consumers no longer derive them from `RangeBarProps`.
- **`DosDialog` `inline` prop (DMNC-1605).** Renders the same frame, strip, head, body, footer and end control in place, with no `ModalOverlay`, portal, scrim, focus trap or Escape/backdrop dismissal, so docs pages and static previews show the chrome without hydration (the modal path renders nothing on the server). The container is a `role="group"` named like the dialog, with no `aria-modal`; `open` still gates rendering. Additive; the default is unchanged. `Icon` gains an additive `decorative` prop (default `false`): `aria-hidden="true"` with no `role` or `aria-label`.

### Fixed
- **`cn()` no longer drops a colour next to a dos text size.** tailwind-merge read `text-dos-text-sm` / `text-dos-display-*` as a text colour, so `cn('text-dos-text-brand', 'text-dos-text-sm')` kept only the size. Stat lost its label and value colour at every size, and ChatInput, ChecklistRow, CopyButton, EmptyState, SectionHeading and AccordionFill lost their size while Input and Select lost their colour. `cn()` now registers the dos sizes (generated from the preset) as a font-size group of their own, so colour and size both survive and an earlier `leading-*` class is kept. Gauge and DecayStrip go back to `cn()`.
- **Consumer Tailwind v4 utilities beat eidotter's reset again.** The universal `margin`/`padding`/`border`/`box-sizing` reset and the h1–h6, list and img resets shipped unlayered, so a consumer's `@layer utilities` `p-7`, `mt-3`, `list-disc` or `text-2xl` did nothing. The preflight now ships in `@layer base.eidotter` after a `@layer properties, theme, base, components, utilities;` statement: consumer utilities win in either load order, consumers without Tailwind keep the resets, and Tailwind v3 still accepts the file.
- **Every eidotter token utility ships in `dist/eidotter.css` again.** `text-`/`bg-`/`border-` for each `dos-*`/`cga-*` colour, `shadow-dos-*`, `font-dos-*` (incl. the bold/semibold/regular aliases) and the `text-dos-text-*`/`text-dos-display-*` sizes come from a safelist generated from the preset by `build-tokens`, so consumers without Tailwind can use them whether or not a component does. The ones no component uses ship in `@layer utilities.eidotter`, so a Tailwind v4 consumer's `hover:`/`md:` variant of the same class still wins. Stock Tailwind utilities stay out.
- **shadcn shim chart colours read on every theme.** `--chart-1`…`--chart-5` are chosen per theme: each is at least 3:1 on `--background` and the five are pairwise distinct (light `--chart-5` was 1.08:1, cga-amber repeated `--chart-1`, the CGA mode themes collapsed to two colours).
- **The 16px floor wording names its exceptions:** em-relative secondary glyphs (CalendarHeatmap, ProgressRing, the Stat/VitalsStrip unit suffix).
- **`LegalPage` text on the 16px floor (DMNC-1610).** Visible change: body copy, the "Stand" date, the intro, the back-link and the attribution lines go from 12–14px to 16px (`text-base`), h2 from 16px to 20px (`text-sm`) so it stays above the body, h1 stays 24px (`text-lg` token). Sizes now come from the font-size tokens instead of hardcoded px. CSS only; the 720px page and 640px body column are unchanged. LegalPage is no longer an exception to the floor.
- **`SeriesBars` ticks readable with `tickEvery` (DMNC-1610).** Every tick was clamped to its bar's column and truncated, so labels collapsed to "2…" whatever `tickEvery` was. With `tickEvery` > 1 a label now overflows into its empty neighbour columns; the first and last labels are pinned to the plot edges. With `tickEvery` 1 (every column labelled) ticks still truncate.
- **Health print on a dark-scheme page (DMNC-1610).** Print fills used `Canvas`/`CanvasText`, which follow `color-scheme`, so a `color-scheme: dark` page printed a dark box. Every `.eidotter-health` root now sets `color-scheme: light` in print. `SeriesBars`' goal tag drops its screen background in print (`Canvas`), and `SeriesBars` ticks and `RangeBar` lane and legend text print in `CanvasText` instead of the screen accent/brand/muted tokens. RangeBar segment dividers and the unfilled-track dashed outline in both components print black too (they had kept the screen border colour, the print rule was less specific).
- **`RangeBar` legend in narrow containers (DMNC-1610).** The vertical layout wraps, so the legend moves under the bar when both do not fit side by side (at `size="lg"` on a phone the names had disappeared); legend names wrap instead of truncating and a bound moves to the next line whole (`eidotter-range-bar__name`, `eidotter-range-bar__bound` hooks). The inline percent and the target label have an 8px gap and a space between them ("61 % Ziel", was "61 %Ziel").
- **`Stat` unit wraps in narrow cards (DMNC-1610).** The value and `unit` had no break opportunity and overflowed narrow cards; a space before the unit now lets it drop under the value. The gap before the unit is that space at the unit's size (was a 4px margin).
- **The 16px floor wording names its exceptions:** LegalPage's 12–14px legal scale and em-relative secondary glyphs (CalendarHeatmap, ProgressRing, the Stat/VitalsStrip unit suffix).
- **Dialog and window end control sits square in the corner (DMNC-1605).** The last `IconButton` in `DosDialog`'s `head.end` and in `DosWindow`'s `controls` was 0px from the top border but 4px from the right border. It now overhangs the strip's full 12px inline-end padding as well as its 4px block padding, so it docks flush: 0px from the top, 0px from the right, 0px to the rule. Strip height is unchanged (36px + the 1px rule). Modal, Lightbox, Card and DosFigure inherit it. DosWindow's inline-end overhang moved from the controls container to the last IconButton, so non-IconButton controls keep the strip padding.
- **`IconButton` glyph is decorative (DMNC-1605).** The inner `Icon` rendered `role="img"` with `aria-label="Close icon"` inside the `aria-hidden` wrapper; it now renders `aria-hidden="true"` with no role or label. The button's own `aria-label` is the only name.
- **`npm run diff-contracts <Name>` resolves contract paths from the extractor configs** (`outputPath`), so it can diff `MeterGroup`, `RangeBarSegment` and `SeriesBarsBar`, whose contracts live in the parent component's folder. Unknown names exit 1 with the list of configured pairs.


- **Focus rings visible in every theme.** `TimelineContainer`'s LOAD MORE button and the master-detail back button now draw a 2px `border-focus` outline (offset 2px) on keyboard focus. They used only a glow, which is transparent under `amber-paper` and removed in high contrast. `IconButton`'s focus ring moves from `border-brand` (2.75:1 on the light page) to `border-focus` (4.77:1 or better on page and card in every theme); this restores the ring Tag remove and the Nav close had before 0.41.0.
- **Pressed primary `Button` text** is `text-on-brand` on the brand-bright fill (was `text-on-accent`: 1.45:1 in `cga-amber`, now 7.17:1 or better in every theme).
- **Coloured `Tag` (filled) and active `FilterBar` items** draw `text-on-brand` on a consumer `color` fill (was `text-on-accent`: 1.04 to 1.79:1 in `cga-amber`). On the documented fills (`--color-cga-bright-cyan`, `-bright-green`, `-yellow`, `-light-gray`, `--color-semantic-background-brand`) every theme reaches 4.84:1 or better. Text roles such as `text-accent` are dark in the light theme and reach only about 3:1 as a fill; the `color` JSDoc now says so, and FilterBar no longer suggests `text-accent`.
- **shadcn shim:** `--accent-foreground` maps to `text-on-accent` (was `text-on-brand`, 1.55:1 on `cga-amber`'s blue accent).
- **AI provenance marker** uses the light-theme gradient under the `.theme-light` class form as well as `[data-theme="light"]` and `.light`.
- **High contrast:** every `@media (prefers-contrast: high)` rule in the stylesheets also matches `(prefers-contrast: more)`, the value current browsers report (DMNC-1598). 46 stylesheets named only `high`; Brand, Mark, DosWindow, Header and IconButton already matched both.
- **`MeterGroup` grid with `columns`** gives way to auto-fit under a 30rem-wide group, as documented. The rule never applied because it styled its own container. The group's children now sit in an inner `eidotter-meter-group__layout` element, which carries the flex/grid layout and the gap; the outer element keeps `role="group"`, the ref, `className` and the modifier classes. A consumer `className` that set layout (`gap-*`, `grid-*`) on the group no longer reaches the children.
- **Registry:** Alert `size:lg` and `size:large` descriptions say they map to floating, which is what renders.
- `eidotter-modal__close`, `eidotter-lightbox__close` and `eidotter-nav__close` are documented as stable consumer hooks; they carry no eidotter CSS.
- **Contract tooling test gaps (post-merge review of DMNC-1459/1465).** The code-contract extractor now reads defaults only from the exported component's own props parameter (and throws if it cannot identify exactly one) and throws on non-string-literal class-map values; `diff-contracts` warns when only one side declares a default (Alert `color`, pinned); the registry drift test follows imported type aliases (health `Tone`/`ValueStatus` no longer allowlisted) and fails on stale allowlist entries that now resolve; the favicon test compares the root `viewBox` and the gradient each fill points at, so swapped fills fail.

## [0.41.0] - 2026-10-23

The 16px body-size floor lands (Tailwind `text-xs`/`text-sm` alias to 1rem in the preset), keyboard focus is now a visible amber ring on Button, Input, Select and Accordion, and the retro `Header` is consolidated into one quiet line with the lockup as its default brand. `Logo` and `Mark` now share one egg-yolk SVG geometry, and the `amber-paper` reverse-video theme joins the dark default and `light`.
Overlays and windows move onto shared chrome: new `DosDialog` (Modal, Lightbox and CmdPalette are rebuilt on it), `IconButton` (every close, prev/next and remove control) and `DosWindow` (DosFigure and Card are built on it), with a shared motion vocabulary in `keyframes.css`.
`text-on-accent`, `text-on-brand` and `text-on-light` tokens make text-on-fill explicit, and `text-secondary` now means visible, de-emphasised text. Contracts wave 2 covers Badge, Tag and Alert plus a registry drift test, `eidotter/styles` no longer leaks its CSS reset into consumers, and the axe allowlist drops from 54 to 15 entries.

Upgrade guide: `migrations/0.41.0.md` (also in the package at `node_modules/eidotter/migrations/0.41.0.md`).

**Breaking/visible changes for consumers:**
- **16px floor.** The preset aliases Tailwind's `text-xs` and `text-sm` to 1rem; `Breadcrumb`, `Footer`, `Input` and the `Header` brand link render at body size. Consumers on `^0.40.x` need an explicit bump to `^0.41.0`.
- **Generic utilities removed from `dist/eidotter.css`.** Stock Tailwind utilities that only appeared in docs/stories (e.g. `.mt-4`, `.grid-cols-2`, `.min-h-screen`, the stock `.text-xs`/`.text-sm` sizes) are no longer in the bundle; add your own if you relied on them without Tailwind. eidotter's token utilities (`text-dos-*`, `bg-dos-*`, `border-dos-*`, `shadow-dos-*`, `font-dos-*`, `bg-cga-*`, `text-cga-*`) remain available.
- **`text-secondary` changed meaning.** It is now a visible tone; if you used it for dark text on an amber or light fill, migrate to `text-on-accent` (`--color-semantic-text-on-accent`).
- **`eidotter/styles` no longer sets link colours or fonts.** Bare text with no font of its own shows the browser default font, and unstyled `<a>` outside eidotter components shows the browser link colour.
- **`Header` default brand is the lockup** when `brandName` is passed without `children`; pass `brand="text"` for the old plain text.
- **Removed classes** (CSS targeting them silently no-ops): Modal `eidotter-modal`, `eidotter-modal--entering`, `eidotter-modal--exiting`, `eidotter-modal-overlay`, `eidotter-modal-overlay--entering`, `eidotter-modal-overlay--exiting`, `eidotter-modal__header`, `eidotter-modal__title`; Lightbox `eidotter-lightbox`, `eidotter-lightbox--entering`, `eidotter-lightbox--exiting`, `eidotter-lightbox-overlay`, `eidotter-lightbox-overlay--entering`, `eidotter-lightbox-overlay--exiting`; CmdPalette `eidotter-cmdpal`, `eidotter-cmdpal--entering`, `eidotter-cmdpal--exiting`, `eidotter-cmdpal-overlay`, `eidotter-cmdpal-overlay--entering`, `eidotter-cmdpal-overlay--exiting`, `eidotter-cmdpal__head` (all three rebuilt on `DosDialog`; target `eidotter-dialog*`); Card `eidotter-card__header`, `eidotter-card__footer` (use `eidotter-window__strip` / `__footer`); DosFigure `eidotter-dos-figure__title` (use `eidotter-window__strip` / `__title`); Mark `eidotter-mark__blob`, `eidotter-mark__blob--morph` (Mark is an SVG now; target `eidotter-mark`). The internal keyframes `eidotter-mark-morph`, `eidotter-card-enter`, `eidotter-inline-expand-fade`, `eidotter-timeline-node-enter`, `eidotter-skeleton-breathe` and `eidotter-health-breathe` are gone too (see Fixed).
- **Visible restyles:** Modal, Lightbox, CmdPalette, Card, DosFigure, Alert, Notification, `Logo`, `Mark` (CSS blob becomes the Logo's SVG; `morph` now drives a breath) and every close/prev/next control (now `IconButton`); `Header` and `Nav` brand-amber styling; `Progress` `sm`/`md`/`lg` render 16/20/22px (were 16/16/18px); the amber-mono focus ring is amber `#FFB000` (was amber-bright) and the Accordion header's box-shadow focus ring is now a 2px outline.

### Added
- **`IconButton`: one icon-only control (DMNC-1592 step 2).** New public client component on React Aria `Button`: an `<Icon>` glyph in a 1px `border-default` square outline, transparent fill, `text-accent` glyph; hover inverts (amber `background-brand` fill, `text-on-brand` glyph); focus-visible is a 2px `border-brand` outline offset 2px; disabled is opacity 0.5. Props: `icon`, `label` (required, the `aria-label`), `size` (`md` 36×36 with a 20px glyph, default; `window` 28×28 with a 16px glyph, for dense chrome; every built-in control uses `md`), `variant` (`outline` default, `bare` without the resting outline), `isDisabled`, `onPress`, `excludeFromTabOrder`, `className`. High contrast (`more`/`high`): glyph `text-primary`, 3px focus outline. Stable classes `eidotter-icon-button`, `--window`, `--bare`. Exported from the barrel and `eidotter/components/IconButton`.
- **`DosWindow`: in-page window chrome (DMNC-1592 step 2).** New server-safe presentational component: the DosDialog strip (dark, uppercase xs title with 0.15em tracking, `▸` marker, 1px `border-brand-dim` rule) on a 2px brand border with `--shadow-drop` (no glow, no backdrop). Props: `title`, `marker` (default `true`), `active` (default `true`; inactive dims the strip title to `text-muted`), `controls` (consumer-supplied 36px IconButtons in the strip end slot, overhanging the strip padding so the strip keeps its height), `footer` (1px dim-amber rule), `className`, plus pass-through div attributes. Without a title or controls there is no strip. Stable classes `eidotter-window`, `__strip`, `__title`, `__controls`, `__body`, `__footer`. Exported from the barrel and `eidotter/components/DosWindow`.
- **Icon: `Chevron Left` and `Chevron Right`** (pixelarticons `ChevronLeft`/`ChevronRight`), for IconButton prev/next.
- **`DosDialog`: one overlay shell (DMNC-1592 step 1).** New public component on React Aria `ModalOverlay > Modal > Dialog`, carrying the CmdPalette chrome: `--border-width-medium` brand border, amber phosphor glow plus drop shadow, square corners, `--effects-overlay` scrim with a 2px blur, `--z-index-modal`, and a title strip as the head of every dialog: dark background, yellow (`text-accent`) title, `▸` marker, xs uppercase, 0.15em tracking, 1px `border-brand-dim` rule below. Props: `open`, `onOpenChange`, `placement` (`center` | `top`, top is CmdPalette's ~18vh anchor), `size` (`sm` 24rem, `md` 30rem default, `lg` 40rem, `full` = viewport minus 2 × spacing-4; every step capped at viewport minus 32px), `head` (`{ title, end?, marker?, decorative? }` or any ReactNode), `footer` (1px top rule; a plain `<div>`, so the shell adds no `contentinfo` landmark; Modal still renders its own `<footer>` inside it), `isDismissable` (default `true`), `aria-label` / `aria-labelledby`, `className`. A non-decorative `head.title` renders as the `<h2>` and names the dialog when no `aria-label` is given. Stable classes `eidotter-dialog`, `__overlay`, `__container`, `__head`, `__title`, `__end`, `__body`, `__footer`. Exported from the barrel and from `eidotter/components/DosDialog` (client component).
- **Shared motion vocabulary in `src/styles/keyframes.css`.** `eidotter-fade-in/out`, `eidotter-pop-in/out` and `eidotter-breathe` (floor `--eidotter-breathe-min`, default 0.7), next to the existing `blink` and phosphor keyframes. A new contract test fails the build when a `@keyframes` name is declared twice anywhere in `src/` or when an `animation` references an undeclared name.
- **`Header`: `brand`, `end` and `skipLinkTarget` props (DMNC-1584).** `brand?: 'lockup' | 'mark' | 'text'` (default `'lockup'`) picks how `brandName` renders when no `children` are passed: the decorative Logo (28px, glow) or the morphing `Mark` (28px) next to the name in uppercase wide-tracked DOS, or the plain text of earlier versions. `end?: ReactNode` is a trailing slot (theme toggle, ⌘K hint) rendered once, after the desktop nav on wide screens and between the brand and the MENU trigger on mobile; without it the DOM is unchanged. `skipLinkTarget?: string` (e.g. `'#main'`) renders a visually-hidden-until-focused "SKIP TO CONTENT" pill as the header's first child (WCAG 2.4.1); off by default, unsafe schemes render nothing.

### Changed
- **Every close, prev/next and remove control is an IconButton (visible).** One glyph (the pixel X `Icon Close`) and one set of states everywhere. Modal and Lightbox close: md (36×36) with the outline, in the strip end slot, overhanging the strip padding so the strip height is unchanged (was a 36×36 borderless light-gray glyph). Lightbox prev/next: md IconButtons with pixel chevrons instead of the `◀ ▶` text glyphs; disabled opacity 0.5 (was 0.3); keyboard and swipe unchanged. Notification and Alert close: md (36×36) with the outline, same placement (was a borderless 70% opacity glyph). Tag remove: md, `bare` (negative margins keep the tag height; the hover fill overhangs the tag edge), pixel X instead of the `[x]` text (accessible name `Remove <label>` and tab-order rules unchanged). Nav mobile panel close: md with the outline. The hand-rolled `.eidotter-modal__close`, `.eidotter-lightbox__close`, `.eidotter-lightbox__nav`, `.eidotter-notification__close`, `.eidotter-alert__close`, `.eidotter-tag__close` and `.eidotter-nav__close` styles are removed or reduced to placement; the classes stay on the buttons as hooks.
- **DosFigure is built on DosWindow (visible).** The amber-filled title bar with dark text becomes the dark window strip (yellow title, `▸` marker, dim-amber rule); the brand border and drop shadow move from the frame to the window. Scanline, flicker, pins, resolution tag and caption are unchanged; props unchanged. The `eidotter-dos-figure__title` class is gone (the strip is `eidotter-window__strip` / `__title`).
- **Card is built on DosWindow (visible).** The header (brand-dim fill, dark md text) becomes the window strip: dark, yellow xs uppercase title with the `▸` marker and a dim-amber rule. The footer becomes the window footer (dim-amber rule, no secondary fill). `elevated` is the plain window frame (brand border + `--shadow-drop`) instead of the near-black border with a 4px offset shadow; `glow` keeps its glow; the other variants stay flat with their existing border colours. Props unchanged; the internal `eidotter-card__header` / `__footer` classes are gone (use `eidotter-window__strip` / `__footer`).
- **Modal is rebuilt on DosDialog (visible).** Yellow 2px frame becomes the brand border with the amber glow; the header becomes the title strip (yellow title, xs uppercase, dim-amber rule, with the same Close icon at its end); the footer keeps its 1px top rule. Enter/exit move from `modal-crt-*` (scale 0.95, 400ms) to the shared CRT turn-on pop (`eidotter-pop-in/out`, scale 0.8 to 1, 150ms) over a fading scrim. z-index rises from 50 to `--z-index-modal` (1040). Width is unchanged (480px = `md`). New additive props `size` and `isDismissable`. No prop removed; `role="dialog"`, the accessible name (`aria-label={title}`), the `<h2>` title and the `Close modal` button are unchanged. Removed classes: `eidotter-modal-overlay`, `eidotter-modal-overlay--entering`, `eidotter-modal-overlay--exiting`, `eidotter-modal`, `eidotter-modal--entering`, `eidotter-modal--exiting`, `eidotter-modal__header` and `eidotter-modal__title` (target the shell's `eidotter-dialog*` classes instead); `eidotter-modal__container`, `__body`, `__footer` and `__close` remain.
- **Lightbox is rebuilt on DosDialog and gains the title strip (visible).** The `[ n / N ]` counter is now the strip title and the Close icon sits at the strip end; the panel pops in/out (150ms); prev/next arrows, caption, keyboard and swipe are unchanged. The container is `size="full"` (viewport width minus 32px) instead of shrink-wrapping the image; image max-height is now `100vh - 200px` (was `- 160px`) to make room for the strip. z-index changes from 60 to `--z-index-modal`, the same as Modal: opening a Lightbox over an open Modal is not a supported case. Removed classes: `eidotter-lightbox-overlay`, `eidotter-lightbox-overlay--entering`, `eidotter-lightbox-overlay--exiting`, `eidotter-lightbox`, `eidotter-lightbox--entering` and `eidotter-lightbox--exiting`; `eidotter-lightbox__container`, `__counter`, `__close`, `__figure`, `__image`, `__caption` and `__nav` remain.
- **CmdPalette is rebuilt on DosDialog.** Top placement and `lg` = 640px as before. Visible change: the `▸ JUMP TO` head (with the blinking `_`) loses its amber fill and becomes the shared dark strip with yellow text, and the enter/exit is the shared pop (scale 0.8 to 1, 150ms) instead of the 8px drop. The search placeholder and the row hints now use `text-muted`; the selected row's label and hint use `text-brand` (bright) over the subtle row fill, as `eidotter-cmdpal__text--bright` / `--muted` classes. Its own `cmdpal-enter/exit` and backdrop keyframes are gone. Hotkey, search, options, `renderItem` and `footerHint` are unchanged. At phone widths the box is now capped at viewport minus 32px (was minus 48px). Removed classes: `eidotter-cmdpal-overlay`, `eidotter-cmdpal-overlay--entering`, `eidotter-cmdpal-overlay--exiting`, `eidotter-cmdpal`, `eidotter-cmdpal--entering`, `eidotter-cmdpal--exiting` and `eidotter-cmdpal__head` (the strip is `eidotter-dialog__head`); `eidotter-cmdpal__container`, `__input`, `__results`, `__item*`, `__empty`, `__footer` and `__blink` remain.
- **Alert and Notification are square (visible).** The 4px radius is removed (Alert container; Notification container and top image corners), matching every other surface. Their 36×36 close buttons are unchanged. Both now enter/exit with the shared pop (`eidotter-pop-in/out`, durations unchanged).
- **Overlay and content-swap motion (visible, subtle).** Select's popover pops in/out (`eidotter-pop-in/out`, 150ms) instead of a 4px drop; the TimelineContainer zoom views and the master-detail pane fade in (`eidotter-fade-in`) instead of rising 4px.
- **Keyframe swaps (no visual change intended):** Badge, Tag and TimelineNode use `eidotter-pop-in/out`; Card and InlineExpand use `eidotter-fade-in`; Button's loading indicator uses the stepped `blink`; Skeleton's and the health pulse's reduced-motion breathing and DosFigure's pin pulse use `eidotter-breathe` (DosFigure keeps its 0.5 floor).
- **`useAnimatedDismiss` ignores bubbled `animationend` events.** Keyframe names are now shared, so only an `animationend` fired by the element itself (target equals currentTarget) completes a dismiss.
- **16px body-size floor (DMNC-1579, DMNC-1577).** New `typography.fontSize.text-base` token (`--typography-font-size-text-base`, 1rem; line height 1.25rem), exposed as `text-dos-text-base`. The generated Tailwind preset now aliases Tailwind's `text-xs` and `text-sm` to the same 1rem, so neither eidotter nor preset consumers drop below body size by accident (the DOS VGA cell is natively 9x16). `Breadcrumb` (was 12px, tracking 0.35em, now `text-dos-text-base`, tracking 0.1em, current page in `text-dos-text-primary`), `Footer` (was 14px), `Input` (label, description and error were 12px) and `Header` brand link now use `text-dos-text-base`. Wrong px fallbacks in Nav, InlineExpand and FilterBar CSS corrected to the real token values. Visible change; minor release planned as 0.41.0. **Caret gotcha:** consumers on `^0.40.x` need an explicit bump to `^0.41.0`; consumers can drop per-element `text-base` overrides.
- **One egg-yolk mark: `Logo` and `Mark` share one SVG geometry (DMNC-1586) — visible change to both.** The drawing now lives in an internal `LogoGeometry` (halo discs, pixel ring, yolk, viewBox `8 7 22 22`). **`Logo`**: the flat amber yolk becomes a lit yolk (the Mark's radial gradient `#FFD97A` → `#FFB000` → `#B87C00`, lit from the upper left) with two pale pixel highlights and a white specular dot; the glow drops from 6px to 5px. Props unchanged. **`Mark`**: renders that same SVG instead of the CSS border-radius blob, so it reads as the same drawing as the Logo. The `morph` keyframes are retired: `morph` now drives a **breath** (scale 1 → 1.045 with the glow swelling to 1.8×, 4.3s ease-in-out; off under `prefers-reduced-motion`, glow removed under `prefers-contrast: more`/`high`). The `morph` prop name stays as an alias. New `glow` prop (default `true`, 5px like Logo). The root class `eidotter-mark`, `size`, `label`, `arms` and the ref are unchanged; the `eidotter-mark__blob` / `eidotter-mark__blob--morph` classes and the `eidotter-mark-morph` keyframes are removed; arms now leave from the ring's outer edge instead of the centre (Mark passes the new additive `computeArmPaths` option `startRadius`, its ring radius `width × 9.25/22`; the ratio constant is not part of the package API). **`eidotter/favicon.svg`** is regenerated from the new geometry (static, 32×32, no animation). **Caret gotcha:** a 0.x minor, so consumers pinned to `^0.40.x` must bump explicitly.
- **One portfolio header: quiet line, brand-amber text, uppercase nav (DMNC-1584) — visible change.** The retro `Header` swaps the strong amber glow for a soft glow under a 1px dim-amber line (`border-brand-dim`); the branding link and the context-row return pill paint in the brand amber (`text-brand`, was the yellower `text-accent`) and lift to `text-brand-bright` on hover instead of a phosphor text-shadow; the return pill renders uppercase. Retro `Nav` desktop links, mobile panel links and the MENU trigger use the same brand-amber/bright pair, and desktop and panel link labels render uppercase DOS like the MENU trigger. The modern variant is unchanged. **Default brand is now the lockup** when `brandName` is given without `children`; pass `brand="text"` for the old plain-text brand. Consumers that pass their own branding `children` render their brand unchanged. **Caret gotcha:** 0.x minor — consumers on `^0.40.x` need an explicit bump to `^0.41.0`.
- **`amber-paper` theme (DMNC-1591).** A third theme next to the dark default and `light`: reverse video, the amber monitor with the picture inverted. Amber (`#FFB000`) is the page ground, a slightly darker amber shade (`#E6A000`) the raised surface, and everything that is amber in the default (text, borders, fills) becomes near-black ink (`#020003`); muted/secondary text is dark brown `#5F340E` (5.8:1), disabled `#7A4500` (4.3:1). Text on black fills (`text-on-accent`, `text-on-brand`) is amber. Functional colour stays monochrome (ink and dark browns, never honest red/green) and there is no phosphor bloom: glow shadows, `amber-glow` and the bloom/phosphor effect colours are transparent; vignette and screen tint darken with ink at low alpha. Like the CGA mode themes it remaps the `--color-cga-*` primitives inside its selector, so component CSS that reads raw primitives flips too. `text-on-light` is ink (`#020003`, 11.4:1). Accent text is `#1A1000` and the dim brand fill `#4A2808`, so the shadcn shim's five chart colours stay distinct under amber-paper too. The AI-draft provenance gradient gets its own deep-magenta to violet stops (`#7A0F55` to `#4E1A80`, each at least 4.6:1 on both amber surfaces), and the mobile Nav panel border now uses the opaque `border-brand-dim` token in every theme instead of the translucent amber-glow primitive. Opt in with `import 'eidotter/themes/amber-paper.css'` and `data-theme="amber-paper"`; no existing theme changes. Storybook gains a Theme toolbar (default unchanged) and an `AmberPaper` Color Tokens story.
- **`text-secondary` is now visible (DMNC-1494).** `--color-semantic-text-secondary` used to alias `cga-black`, the same primitive as `background-primary`, so consumers who reached for it for de-emphasised copy rendered invisible text. It now resolves to a visible tone on dark themes (the `light-gray` primitive; warm tan `#b87c1a` under amber-mono, the primary text colour in the CGA mode themes; near-black on the light theme, whose page background is light).
- **New token `text-on-accent` (`--color-semantic-text-on-accent`, Tailwind `text-dos-text-on-accent`)** carries the old `text-secondary` value: dark text/icons sitting on an amber accent fill. Internal on-fill usages moved off `text-secondary` so their rendering is unchanged: on an accent fill to `text-on-accent` (Button primary label, Badge accent, Tag filled, Tabs pills, FilterBar active, Switch thumb, Accordion header, Terminal title bar); on a brand fill to `text-on-brand` (InlineLink hover/active, Button secondary hover border; the CmdPalette head, DosFigure title and Card header title also moved to it in this release, then became the dark DosDialog/DosWindow strip, which uses neither). Nav modern links and the modern MENU trigger (unfilled, on a light surface) moved to `text-on-light`. Accordion expanded border and Terminal active border use `text-secondary` as a plain tone on dark surfaces and are now visible.
- `text-on-accent` = text on a `background-accent` fill; `text-on-brand` = text on a brand-amber fill; `text-on-light` = an unfilled element on a light surface (near-black in every theme). On-accent and on-brand are identical under amber-mono and differ in cga-amber (accent fill is blue there, so on-accent is light).
- **Migration note:** if your app used `text-secondary` / `--color-semantic-text-secondary` for dark text on an amber or light fill, switch it to `text-on-accent` / `--color-semantic-text-on-accent`. If you used it for de-emphasised text on a dark background it now works as intended. `scripts/check-contrast.mjs` reports the new token.
- **Component registry corrected and now validated (DMNC-1459).** `registry.ts` variant keys for Button, Badge, Tag, Alert and a dozen others now match the code (`sm/md/lg` canonical, `xs/xl` for Button, `small/medium/large` kept and flagged `deprecated`). Code contracts extended to Badge, Tag and Alert, and a new `registry.contract.test.ts` fails the build when registry variants drift from the code. Internal tooling only; no runtime change.

### Fixed
- **IconButton placement follow-ups (DMNC-1592 step 2).** A dialog's end control (Modal and Lightbox close) now overhangs the strip's inline-end padding by 8px like DosWindow's controls, so both strips place the close the same distance from the frame. DosFigure's window title is `aria-hidden` again (decorative chrome; the figure is named by its `aria-label`). A closeable Tag is now exactly as tall as a plain one at every size (the close's block margins are -10px, was -8px, which made a closeable `sm` tag 26px instead of 24px). Tag and Notification close margins use compound selectors (`.eidotter-tag__close.eidotter-icon-button`, `.eidotter-notification__close.eidotter-icon-button`), so they beat IconButton's `margin: 0` on specificity instead of stylesheet order.
- **Long Modal titles wrap (DMNC-1592).** The shared title strip clips its title to one line with an ellipsis, which cut off long Modal titles (the old Modal header wrapped). Inside Modal the title now wraps (`white-space: normal; overflow-wrap: anywhere`); CmdPalette and Lightbox keep the one-line strip.
- **DosDialog warns when it has no accessible name (DMNC-1592).** A ReactNode head, a `decorative` head or no head does not name the dialog; outside production builds an open DosDialog without `aria-label`/`aria-labelledby` and without a titled head logs a `console.warn`.
- **Duplicate keyframes removed.** `backdrop-open/close`, `cmdpal-backdrop-open/close`, `eidotter-card-enter`, `eidotter-inline-expand-fade`, `badge-enter`, `tag-enter/exit`, `eidotter-timeline-node-enter`, `modal-crt-enter/exit`, `cmdpal-enter/exit`, `select-pop-in/out`, `notification-enter/exit`, `alert-enter/exit`, `master-detail-fade`, `timeline-fade-in`, `blink-loading`, `eidotter-skeleton-breathe`, `eidotter-health-breathe` and `dos-figure-pin-pulse` collapse into the shared vocabulary above.
- **Alert's enter/exit animation is compositor-only.** It animated `filter: blur() brightness()`; it now uses `eidotter-pop-in/out` (opacity + scale).
- **VitalsStrip: no value overflow at phone width (DMNC-1573).** Under a 30rem container tiles go two-up and the value drops one display size; the value never wraps or widens its tile (it truncates as a last resort), and offline/unknown state words render at body size in their own span. Accessible names unchanged.
- **Meter: vertical meters in a MeterGroup row no longer collapse to their min-width (DMNC-1573).** The size container moved from the meter root to its caption (horizontal meters keep it on the root), the readout never wraps, and in a narrow group the unit stacks under the number. `MeterGroup` rows now wrap instead of overflowing (the old wrap rule targeted its own container and never applied). `aria-valuetext` and names unchanged.
- **Meter and Gauge: label no longer vanishes without `shortLabel` (DMNC-1573).** The root carries `data-has-short`; the narrow-container rule hides the full label only when a short label exists.
- **DecayStrip: the whole window fits at phone width (DMNC-1573).** Cells are shrinkable flex items, and under a 30rem container the from/to labels move under the cells, so no cell is clipped off; the accessible summary still covers the full window. The root's `text-dos-text-brand` colour is no longer dropped by the size class.
- **Gauge: md secondary no longer overflows the ring (DMNC-1573).** The centre text is inset by the ring thickness; the secondary is one truncating line, at md the part after the first space (the unit) takes its own line, and at sm the secondary sits under the ring. The value keeps its `text-dos-text-accent` colour (twMerge had been dropping it as a conflicting `text-*` class; VitalsStrip had the same bug).
- **SeriesBars: goal label no longer paints over a bar (DMNC-1573).** The tag sits right-aligned in a band reserved above the plot, on the page background; the goal line still spans the plot at the same height.
- **`eidotter/styles` no longer overrides consumer link colours and fonts (DMNC-1434).** The bundle ships without `@layer` (so Tailwind v3 consumers can load it), which left Tailwind's preflight unlayered, and unlayered CSS beats a consumer's layered Tailwind v4 utilities whatever their specificity. The bare `a { color: inherit; text-decoration: inherit }` reset turned consumer links (such as `a.text-primary` CTAs) the surrounding text colour on every page, and the `html,:host` `font-family` plus Tailwind's default `--font-sans`/`--font-mono`/`--default-font-family`/`--default-mono-font-family` vars beat a consumer's own `@theme` font. `scripts/flatten-css-layers.mjs` now strips those from the preflight before flattening and fails the build if Tailwind's preflight changes shape. Eidotter components style their own anchors and fonts and render unchanged. **Visible to consumers:** a page that sets no font of its own and has no preflight of its own now shows the browser default font on bare text, and unstyled `<a>` outside eidotter components shows the browser's link colour.
- **Keyboard focus ring on `Button` and `CmdPalette` input (DMNC-1436).** Under Tailwind v4, `outline-none` cancelled the `focus-visible:outline-2` ring so `Button` showed no keyboard focus indicator (WCAG 2.4.7). `Button` now sets `focus-visible:outline-solid`; the `CmdPalette` input gets the house 2px focus outline. The focus ring is amber: `amber-mono` `border.focus` now aliases `color.cga.amber` (#FFB000, 11.4:1 on background-primary) instead of amber-bright. A new contract test guards against the `outline-none` + `focus-visible:outline-2` pairing recurring.
- **Axe allowlist burn-down, 54 to 15 entries (DMNC-1012).** `TimelineEntryCard` tags and the `Tag` close button now clear WCAG AA in amber-mono (tags use `text-muted` instead of `text-disabled`; close button no longer dimmed at rest, since replaced by `IconButton`). `Wordmark` gets `role="img"` so its `aria-label` is valid. Story demo labels in RetroEffects, Breadcrumb, TimelineNode, Switch, Button, Footer, Tag and TimelineContainer moved off `text-disabled` and brown fills to `text-muted`. 39 entries removed from `.storybook/a11y-known-failures.json`; the file only shrank.
- **16px floor no longer leaks into consumers (DMNC-1579).** `dist/eidotter.css` shipped unlayered `.text-xs`/`.text-sm{font-size:1rem}` (plus `.text-base/.text-lg/.text-xl`), overriding every consumer's own Tailwind sizes. Tailwind's automatic source detection is now off (`source(none)`) and only shipped component source is scanned (no stories, tests, MDX, markdown or JSON snapshots); Storybook adds its stories via `.storybook/tailwind.css`. A dist test asserts no stock `text-xs … text-9xl` rule ships. Side effect: stock Tailwind utilities that only appeared in docs/stories (e.g. `.mt-4`, `.grid-cols-2`, `.min-h-screen`) are no longer in the bundle (eidotter's own token utilities remain); consumers that relied on them without their own Tailwind need to add them. The `text-xs`/`text-sm` alias stays in the published preset.
- **Body-floor line-height (DMNC-1579).** `text-dos-text-base` and the preset's `text-xs`/`text-sm` aliases are now `[1rem, { lineHeight: 1.25rem }]` tuples, so the utility sets its line-height (the `Header` brand link had lost it); the dead `lineHeight.xs/sm` preset keys are gone.
- **Progress sizes distinct again (DMNC-1579).** `sm`/`md`/`lg` render 16/20/22px (`text-dos-text-base`/`-sm`/`-md`) instead of 16/16/18px from stock Tailwind classes.
- **Visible keyboard focus on `Input`, `Select` and `Accordion` (DMNC-1436).** With `border.focus` equal to `border.default` in amber-mono, their focus border/ring was invisible. All three now draw a 2px amber outline at 2px offset on `:focus-visible`, like Button/Checkbox/Tabs (existing glows kept; the Accordion header's flush box-shadow ring is replaced by the outline).
- **shadcn shim chart colours distinct in amber-mono (DMNC-1436).** `--chart-3/4/5` now map to `background.brand-bright`, `text.accent` and `background.brand-dim`; in amber-mono chart-1/3/4/5 had all resolved to the same amber.
- **Stricter focus-visible contract test (DMNC-1436).** Checked per class string rather than per file, and covers `data-[focus-visible]:` and bare `outline` widths.

### Docs
- **CmdPalette: "Mount once, at layout level" section (DMNC-1578).** One palette per site in the root layout, items limited to public routes, with Astro, Next.js App Router and Vite/react-router examples, so the ⌘K shortcut works on every page.

## [0.40.2] - 2026-10-22

### Added
- **`eidotter/favicon.svg` export (DMNC-1585).** The logomark favicon is now a published package asset (`public/favicon.svg`, added to `files` and `exports`) so consumer sites can use the shared SVG instead of copying it. A test pins the export and keeps the Storybook copy identical.

## [0.40.1] - 2026-10-22

### Changed
- **DOS underscore cursor in every prompt component.** `CommandPrompt`, `ChatInput`, `ChatMessage` (streaming) and `Terminal` now blink the 80s DOS underline cursor (`_`) instead of a `█` block; Terminal's cursor is a 2px baseline bar. Visible change; no API change. `Button` `loading` is unchanged. **Caret gotcha:** a 0.x patch, so `^0.40.0` consumers pick it up via lockfile refresh.
- **eiDotter logomark favicon** for Storybook (previously none) and the landing page.

## [0.40.0] - 2026-10-22

### Added
- **Health and metabolism component family (DMNC-1572).** Six presentational, hook-free (RSC server-safe) components for showing what a body is doing with the last meal, dose or hour of effort, modelled on SCUM's metabolism screen and on diabetes-app conventions (AGP time-in-range, COB/IOB decay): **`Gauge`** (quantised ring with a dominant percent, optional secondary value + unit, tone, status, provenance tag, overflow marker; `role="meter"` semantics), **`Meter`** + **`MeterGroup`** (single fill bar, vertical or horizontal, optional optimal tick or range, four pattern fills; row/grid layout with a shared-scale option), **`RangeBar`** (ordered segments summing to the whole as a stacked bar with legend, target tick and a synthesized remainder), **`SeriesBars`** (short series of bars with a goal line and consumer-supplied threshold tones), **`DecayStrip`** (items in progress over a time strip from consumer-precomputed samples, now marker, dimmed future, stepped block fill, provenance required at the type level, optional `timeZone`), and **`VitalsStrip`** (monitor-style tiles with per-tile tone, status and paired values such as 124/78). Shared primitives ship in `eidotter/utils/health` (`formatValue` on `Intl.NumberFormat` with a capped formatter cache, `resolveBand`, `isKnown`, `labels`, `provenanceLabel`) and `src/styles/health-patterns.css` (tone fills, dither/hatch/dotted/solid pattern fills, print, `prefers-contrast`, `prefers-reduced-motion` and `forced-colors` paths). Rules baked in: **no medical defaults** (bands, targets, thresholds and clinical copy are consumer props), colour is never the only signal (every filled tone pairs a pattern with a text label), `null`/`NaN`/`Infinity` render as "unknown" and never as "NaN", fills clamp at max while the true value is displayed, and nothing raises `role="alert"`/`aria-live` or animates on state change unless the consumer passes `announce`. Registry entries carry `since: 0.40.0` with new `doctor-portal` and `dosbts` consumer ids; a dosing-language guard test fails the build on bolus/units/correction advice in family code, stories, fixtures or docs; stories use only synthetic fixtures (`Compositions/HealthDashboard`, `Compositions/GlanceStrip`). Pattern catalogue: `guidelines/health-metabolism-patterns.md`. **Caret gotcha:** 0.x minor — consumers pinned to `^0.39.x` must bump to `^0.40.0` explicitly.

### Changed
- **`Stat`: additive `unit`, `note` and `target` slots.** Optional secondary text next to the value, a note line beneath, and a target line; existing consumers render unchanged. `VitalsStrip` mirrors Stat's size and text tokens without importing it, so it stays hook-free.
- **`ProgressRing`: additive `decorative` prop.** Renders the ring `aria-hidden` with no `progressbar` role so a wrapping component (Gauge) can own the meter semantics.
- **InlineExpand: expanded state is now true inline flow (DMNC-1316) — visible redesign.** The old expanded state rendered as a rectangular block beneath the trigger (a `display: grid` `0fr→1fr` height reveal with a left-bordered `__inner` aside and a `border-top` sources row). It now continues the trigger's own line and wraps at the host paragraph's width, with a **marker-pen highlight painted on every wrapped fragment** (`box-decoration-break: clone`), a trailing inline `[-]` collapse control after the last word, and a compact **favicon-only** sources cluster after that (titles moved to the link `title` + `aria-label`). Reveal is an in-place opacity fade; collapse is an instant unmount. Mechanically: content switched from always-in-DOM (`visibility: hidden` + `inert`) to **conditional render** (an inline `visibility: hidden` span would still reserve paragraph-width space), `role="region"` was dropped (a phrase-level disclosure is not a landmark), `aria-live="polite"` moved to the persistent outer span, and the content span now renders `data-ai-skip="true"` so it stays readable inside `data-provenance="ai-draft"` prose (pairs with the provenance.css fix below, DMNC-1314). The trigger word + `[+]`/`[-]` indicator pin `-webkit-text-fill-color: currentColor` so they stay legible inside ai-draft / ai-block prose too. Keyboard, controlled/uncontrolled modes, `isSafeUrl` guards, and the 3-stage favicon fallback are unchanged; focus returns to the trigger on both trailing-control and Escape collapse. New stories: `MarkerPenWrap`, `InlineCodeContent`, `InsideAiDraft`. **Caret gotcha:** this is a 0.x minor — consumers pinned to `^0.39.x` will not auto-pull it and must bump their range explicitly.

### Fixed
- **Provenance: nested `data-ai-skip` inside an ai-draft paragraph is now readable (DMNC-1314).** A `data-ai-skip="true"` element nested *inside* a `<p data-provenance="ai-draft">` rendered with invisible glyphs: `color`/`-webkit-text-fill-color: transparent` inherit into descendants, but the gradient `background-image` does not, so skipped descendants inherited transparent text with nothing behind it. The existing opt-out block couldn't cover this case — its `color: inherit` resolves to the ai-draft ancestor's own `transparent`. A dedicated reset block now sets a concrete body colour (`--color-semantic-text-primary`) for `[data-provenance="ai-draft"] [data-ai-skip="true"]`, which its descendants inherit. This is the CSS half of the InlineExpand `data-ai-skip` change above; together they let an InlineExpand expansion sit inside AI-drafted prose and stay legible.

## [0.39.0] - 2026-07-13

### Added
- **Connector system — nav-as-course (DMNC-1388 / 1326 / 1325).** The Timeline-OS navigation model lands as reusable primitives:
  - **`Header` `context` prop (DMNC-1326).** An additive, optional second row below brand+nav: a measurable category badge row + an optional "← back" returnTo pill (same-tab via `linkComponent`, or `reuseTab` named-tab reuse via `window.open`). Emits the stable measurement contract `.eidotter-header__context` / `.eidotter-header__categories` / `.eidotter-header__category` + `li[data-category-key]`. Absent/empty `context` ⇒ DOM identical to before. Interactivity lives in an internal `'use client'` leaf so `Header` stays server-safe. New exported `isIconName()` guard renders unknown category icon strings label-only. Category + returnTo hrefs are sanitized via `isSafeHref`.
  - **`Mark` (DMNC-1325).** Fourth Brand component — a small organic blob that morphs its silhouette via a ~6s `border-radius` loop (soft-radial amber "egg-yolk" fill; disabled under reduced motion), with an optional `arms` mode drawing runtime-measured quadratic-bezier SVG connectors to nav badges (default selector `.eidotter-header__category`). Arms redraw on resize + badge-set change, are `aria-hidden`, and never intercept pointer events; coordinates are mark-local (portal-free, scroll-invariant). `computeArmPaths` exported for reuse.
  - **`Connector` (DMNC-1388).** Organic tapered-ribbon SVG overlay — filled variable-width `<path>`s from a source node (the Mark) to N anchors, amber→category gradient (solid amber when no colour), stop-at-edge attach geometry, `ResizeObserver` + `MutationObserver` re-flow and a compositor-friendly rAF idle sway (disabled under reduced motion). Decorative (`aria-hidden`); navigation lives in the real DOM underneath.
  - **`TimelineFeed` + `TimelinePage` (DMNC-1388).** Two presentational timeline surfaces sharing TimelineContainer's `TimelineEntryData` model. `TimelineFeed` is a dense category-dot · date · title · kind-tag feed with a category filter that culls the list; `TimelinePage` is a Bret-Victor-style blog timeline — year-grouped, amber-only spine + dots, big titles + description, an optional Mark brand slot + category filter, and a right-hand hover-preview panel.
- **Storybook: `article` unsafe-`href` story (DMNC-1281 follow-up).** New `ArticleUnsafeHref` story pins the read-more sanitization contract visually: an entry whose `href` uses an unsafe scheme (`javascript:` etc.) fails `isSafeHref` and renders **no anchor at all** — not a disabled link, not a `#` fallback — shown expanded next to a safe-`href` entry for contrast. Completes the story matrix for the `article` entry kind shipped in 0.38.0 (thumbnail overflow / expanded / no-images / unsafe-href).

### Fixed
- **URL-safety hardening at every nav link boundary (todos 001–003 + Breadcrumb follow-up).** `<Breadcrumb>`, `<Nav>`, `<Footer>`, and `<Header brandHref>` previously rendered author-supplied `href`s verbatim — an `href: 'javascript:…'` (or `data:`/`vbscript:`) in a consumer's nav data became a live `<a href>`. All four now sanitize through the shared **`isSafeHref`** util: an unsafe scheme renders the label as a plain span (no anchor), and Header's structural brand link falls back to `'/'`. Internal/relative routes (`/path`, `#hash`, `?query`) are unaffected. Consolidates three sanitizers that had drifted (`isSafeUrl`, `isSafeHref`, InlineLink's private `sanitizeHref`) into a coherent pair: `isSafeHref` (relative-allowing, for anchor hrefs) is now **publicly exported** alongside `isSafeUrl` (absolute-only, for image/favicon srcs), with a new `extraSchemes` option (e.g. `tel`/`ftp`/`sms`). `InlineLink`'s private sanitizer now delegates to it with behavior unchanged.
- **Provenance block-mode gradient no longer paints navigation chrome (DMNC-1193).** `data-ai-block` whole-section marking applied its magenta gradient to every prose descendant — including `<nav>`/`[role="navigation"]` chrome like Breadcrumb (`<nav><ol><li>`) and Nav. Because `-webkit-text-fill-color: transparent` inherits into child `<a>`/`<span>` glyphs while the gradient `background-image` does not, nav links rendered as **invisible** (transparent fill, no gradient behind) — a live defect on ~9 rizomorf pages. The block-mode gradient (and the block-mode `code`/`kbd`/`samp`/`pre` reset) now carry a zero-specificity `:not(:where(nav *, [role="navigation"] *))` exclusion, so nav chrome keeps its own colour; per-element `data-provenance="ai-draft"` still works everywhere, navs included. Additionally, the `data-ai-skip` opt-out no longer forces `color: inherit` on **every** descendant (`[data-ai-block] [data-ai-skip="true"] *`) — it now resets only the gradient-targeted prose tags, so a skip wrapper stops clobbering a component's own colours. rizomorf's `data-ai-skip` breadcrumb wrappers become unnecessary (removal is a consumer-side follow-up) and are harmless until removed. CSS-only; no API change.

## [0.38.1] - 2026-07-10

### Fixed
- **Fonts are no longer inlined into `dist/eidotter.css` (DMNC-1373).** Vite lib-mode force-inlines every CSS `url()` asset as a base64 `data:` URI (verified to ignore `assetsInlineLimit: 0` on Vite 8/Rolldown). Since the v0.37 two-tier typography added four ~1MB JetBrains Mono Nerd Font woff2s, the `eidotter/styles` bundle ballooned from ~250KB to **~5.7MB of render-blocking CSS** for every consumer — and consumers with a `font-src 'self'` CSP (eidotter.com) silently lost the fonts entirely, since `data:` URIs are blocked by that directive and the browser falls back to bare `monospace` with only a console warning. A new post-build step (`scripts/externalize-fonts.mjs`, in the build chain after `flatten-css-layers.mjs`) replaces the inlined `@font-face` rules with the source `fonts.css` rules pointing at the real font files already shipped in the package (`src/styles/fonts/`). Consumer bundlers (Vite, Astro, Next.js) resolve the relative `url()`s and emit the fonts as ordinary per-weight assets — downloaded on demand, CSP-clean. **No consumer action needed beyond bumping**; locked in by new `dist-bundle.test.ts` assertions (no `data:font`, < 300KB, 5 file-referencing `@font-face` rules).
- **`version` export unstuck.** `import { version } from 'eidotter'` reported `0.30.0` since v0.30 — eight releases stale. Now `0.38.1`, with a sync note at the definition; treat `npm view eidotter version` as ground truth.

## [0.38.0] - 2026-07-04

### Added
- **`article` timeline entry kind (DMNC-1281).** A fourth `TimelineEntryData` kind for devlog-style entries — additive to the discriminated union, so it ships as a semver-minor (**0.38.0**). Collapsed, it shows a decorative thumbnail strip (up to 4 thumbs + a `+N` overflow cell) and an 80-char `summary` preview, all inside the single expand/collapse trigger. Expanded, it renders an interactive image gallery (→ Lightbox), a rich `content` body, and a sanitized `href` "READ MORE →" link (`hrefLabel` overrides the label; unsafe schemes like `javascript:` render no anchor). The read-more/gallery live in the always-in-DOM `inert` body, so they are unreachable while collapsed. Works unchanged in all four container modes (interactive / feed / static / master-detail). New `article`-member fields: `summary`, `content`, `images`, `href`, `hrefLabel`.
  - **Internal refactor:** the gallery grid→focused→lightbox state machine (plus its Lightbox mount) was extracted from `TimelineEntryCardGallery` into a shared internal `GalleryGrid` (`{ images, isExpanded }`), reused by both the `gallery` and `article` variants. No public API change; existing gallery behavior and tests are unchanged.
  - Consumer driver: dmnc.tech `/log` (33 devlog entries).

### Removed
- **Flexi IBM VGA True font files removed (DMNC-889).** `src/styles/fonts/Flexi_IBM_VGA_True.ttf` and `src/styles/fonts/Flexi_IBM_VGA_LICENSE.txt` were retained after the v0.22.0 font swap so legacy consumers could override `--typography-font-family-primary`. All consumers have since migrated. Tarball shrinks by ~145 KB.

### Fixed
- **RetroEffects `boot` no longer flashes the page before the turn-on (DMNC-1184).** Two defects let content paint before the CRT "monitor turn-on" reveal: (1) the two boot panels were `height: 50%`, so the middle band of the viewport was never fully blacked out and content showed through the center during the open; (2) the boot cover was client-only — with `bootOnce` (the recommended once-per-session gate) `booting` started `false` in SSR, so the server HTML painted bare content and the panels only appeared after hydration. Fix: panels are now full-height and opaque (overlapping into a complete blackout at rest, then collapsing to their own edges so the raster opens from the center outward), and the cover renders in the server HTML for **both** the gated and non-gated paths (`booting` starts from `boot`). The open is pure CSS, so it works before hydration and with JS disabled (the cover self-resolves to `scaleY(0)`; nothing stays hidden), and `prefers-reduced-motion` still skips the boot (cover is `display: none`, content shows immediately). No API change. Consumers on SSR (e.g. rizomorf, Next.js App Router) get a flash-free first paint after bumping the dep.
  - **`bootOnce` SSR trade:** the server can't read `sessionStorage`, so for a gated boot the cover ships unconditionally and the skip is decided post-hydration. A *returning* visitor's full-reload/hard-refresh therefore briefly shows the blackout before JS suppresses it — a brief blackout on a fast host (the panels' 140 ms open delay means the turn-on usually isn't reached before teardown), never a flash of bare content, and only a visible turn-on replay if hydration is slow. SPA route changes keep the overlay mounted in the layout and never show it. This is the deliberate trade for a flash-free first paint; removing the brief returning-visitor blackout entirely needs server-visible session state (a cookie or a pre-paint inline script), which is consumer-side.

## [0.37.2] - 2026-06-26

_This entry was listed under 0.38.0 until DMNC-1612; the npm package first ships the body-tier fonts in 0.37.2 (0.37.0 and 0.37.1 do not contain them)._

### Added
- **Two-tier typography split (DMNC-885).** Previously all `.dos-*` utilities shared Perfect DOS VGA 437 as the single font family. 0.37.2 introduces a second font family for the body/prose tier, matching the Figma V.37 split (`Font family/font-family-display` → Perfect DOS VGA 437, `Font family/font-family-body` → JetBrains Mono Nerd Font):
  - **JetBrains Mono Nerd Font** (OFL-1.1) — multi-weight monospace with Nerd Font glyph extensions (powerline, devicons, language logos). Ships as four per-weight woff2 files: `JetBrainsMonoNerdFont-{Regular,Medium,SemiBold,Bold}.woff2` (~988 KB each) converted from Nerd Fonts v3.4.0 TTFs.
  - **New token `--typography-font-family-body`** / `font-dos-body` Tailwind utility → `'JetBrains Mono Nerd Font', monospace`.
  - **New body-weight tokens**: `--typography-font-weight-body-regular` (400), `--typography-font-weight-body-medium` (500), `--typography-font-weight-body-semibold` (600), `--typography-font-weight-body-bold` (700). Existing `regular/semibold/bold` (all → 400) unchanged — they remain as display-tier single-weight aliases.
  - **`dos-utilities.css` rewired**: display classes (`.dos-hero`, `.dos-h1`–`.dos-h5`, `.dos-label`, `.dos-code`) continue using `--typography-font-family-primary`; body classes (`.dos-body`, `.dos-body-lg`, `.dos-caption`, `.dos-micro`) now use `--typography-font-family-body`.
  - **New Storybook story**: `Design System/Typography — Two Tiers` — three stories (`Two Tiers Side-by-Side`, `Nerd Font Glyphs`, `Body Font Weights`) showing both families and the full weight range.
  - **License**: OFL-1.1 license file included at `src/styles/fonts/JetBrainsMonoNerdFont_OFL.txt`; attribution added to `LICENSE.md`.
- No renames — `--typography-font-family-primary` is unchanged. Phase B (renaming to Figma slash-names) is a separate follow-up.

## [0.37.1] - 2026-06-21

### Fixed
- **`tailwind-merge` is now a runtime `dependency` (was devDependency).** The per-component subpath exports from 0.37.0 (`eidotter/components/<Name>`) are unbundled ESM, so their transitive `import { twMerge } from 'tailwind-merge'` (via `dist/utils/cn.js`) must resolve in the **consumer's** `node_modules`. It was only a devDependency, which the `.` barrel bundled but the per-component exports don't — so a consumer deep-importing a component hit `Module not found: Can't resolve 'tailwind-merge'` (caught by steuerdash's `next build` during DMNC-854 part 3). Moved to `dependencies`; the `.` barrel still bundles it, so existing barrel consumers are unaffected. CI now asserts every external specifier in the per-component emit is a declared `dependencies`/`peerDependencies` entry, so this class of gap can't recur.

### Added
- **Per-component subpath exports preserving `'use client'` — RSC-safe deep imports (DMNC-1130).** New `eidotter/components/<Name>` import path (PascalCase, matching the component) lets Next.js **server components** deep-import a single component without the DMNC-864 SSR crash: presentational primitives (SectionHeading, EmptyState, LabeledProgress, …) render on the server, while interactive components (Button, Tabs, Modal, …) carry `'use client'` and resolve as client references. CSS still ships once via `eidotter/styles`; the `.` barrel is unchanged (still the default for client apps). Backed by an additive per-component ESM build pass (`tsconfig.components.json` + `scripts/finalize-component-emit.mjs`, mirroring the icons pipeline) that leaves the Vite `.` bundle untouched. `'use client'` is now **source-of-truth** on interactive component sources (classifier-driven via `scripts/sync-client-directives.mjs`; CI-guarded). Import-only (no `require`), like `./icons/*`. Unblocks steuerdash dropping its local server-primitive copies (DMNC-854 part 3).

## [0.36.1] - 2026-06-18

### Fixed
- **Inline code stays legible inside AI-marked regions.** The AI-draft marker (`data-provenance="ai-draft"` / `data-ai-block`) paints prose with a magenta text-clip gradient using `-webkit-text-fill-color: transparent` + `color: transparent`. Both inherit into descendants, but the `background-image`/`background-clip: text` that fills the glyphs does **not** — so a `<code>` inside an AI-marked paragraph inherited transparent text with no gradient to show, rendering its glyphs invisible and leaving any code-box background (`.dos-code`) as an empty rectangle (observed on dmnc.tech: `SKShapeNode`, `SKNode.copy()` shown as blank boxes). `code`/`kbd`/`samp`/`pre` are now excluded from the gradient and reset to the accent colour inside AI regions.

## [0.36.0] - 2026-06-18

The steuerdash → eidotter primitive ports (DMNC-854), part 2: five new components.

### Added
- **`<LabeledProgress>` — DOS labelled progress bar (DMNC-861).** Optional leading label, a width-accurate amber fill, and a trailing value with a custom `valueSuffix` (`'%'`, `' EUR'`, `/24`, …). Ported from Steuerdash as a standalone div-bar (not the block-fill `<Progress>`, whose `█`/`░` fill is wider than the track in some fonts); the fill animates via `transform: scaleX` (compositor-only, reduced-motion-safe). Clamps to 0–100 and guards `max=0`.
- **`<LedgerRow>` — DOS value-row primitive (DMNC-857).** Label/note on the left, a right-aligned `value` (accent + `tabular-nums`) with optional `copyValue` (→ `<CopyButton>`) and a `trailing` slot. Generalised from Steuerdash's money-specific row — currency/locale formatting, document links, and verify/source badges are intentionally **not** built in: pass a pre-formatted `value` and compose domain chrome via `trailing`, keeping the DS locale-agnostic and themeable.
- **`<Select>` — DOS styled native select, MVP (DMNC-860).** `{ value, options, onChange, id?, aria-label?, disabled? }` over a native `<select>` (keyboard/a11y-correct for free); amber-on-black with focus/hover accent border. Ported from Steuerdash; font-size set inline (token-driven) to beat the Tailwind v4 Preflight form reset. A filterable DOS Combobox is a separate follow-up.
- **`<CopyButton>` — DOS copy-to-clipboard button (DMNC-858).** Shows `[cp]`, flips to `[OK]` for ~1.5s after a successful copy. Async Clipboard API with a `execCommand` textarea fallback for non-HTTPS/older contexts. Ported from Steuerdash; English default labels (was German), `text-dos-link` semantic roles, `aria-label` reflects state.
- **`<ChecklistRow>` — DOS checklist-row primitive (DMNC-856).** A `[x]`/`[ ]` toggle (real `role="checkbox"` button, keyboard-operable) plus label, optional note, and leading/trailing slots; `labelTone` `default`/`muted`(strikethrough)/`error`. Ported from Steuerdash; tones + note route through `text-dos-*` semantic roles (AA-safe under amber-mono). English default aria-labels (was German in the source).

## [0.35.0] - 2026-06-18

### Added
- **`<EmptyState>` — DOS zero-state primitive (DMNC-859).** Centred title + optional description + optional action slot, with tone-driven title colour (`default`/`error`/`warning`/`info`). Ported from Steuerdash; tones + description route through `text-dos-*` semantic roles (description → AA-safe `text-muted`). `role="status"`.
- **`<SectionHeading>` — DOS section-label primitive (DMNC-855).** Uppercase `<h3>` with an optional trailing `(count)` and tone-driven colour (`default`/`error`/`warning`/`info`). Ported from Steuerdash; tones route through `text-dos-*` semantic roles (not raw `cga-*`) so the heading re-themes and stays AA-safe under amber-mono.

### Fixed
- **Timeline master-detail rail flows instead of inner-scrolling.** The rail-list imposed `max-height: 70vh; overflow-y: auto`, painting a scrollbar over the timeline axis. Removed it so the rail flows with the page; consumers needing a fixed-height, independently-scrolling rail can set `max-height` + `overflow` on the container themselves.

## [0.34.0] - 2026-06-18

### Added
- **`<TimelineContainer mode="master-detail">` — level-3 split view (DMNC-878).** Completes the timeline's three-level expansion model (hover → card-expand → full content). A new layout mode where the timeline collapses to a navigable rail and the selected entry fills a detail pane (Apple-Mail-style split); switching entries swaps the pane without losing rail position. The open entry is the existing controlled `selectedEntryId`/`onSelectEntry`, so it is **deep-linkable** (wire it to your router). Rail uses navigation semantics (`aria-current`); arrow keys walk entries, Escape/BACK returns to the rail, focus moves into the pane on open and back on close (no focus trap). Responsive via container queries — side-by-side ≥480px, full-screen detail + BACK button below. Compositor-only cross-fade (reduced-motion + high-contrast safe). Detail body reuses `TimelineEntryCard`/`renderEntry`, so custom renderers work in the pane.
- **`<Button>` now emits a stable `eidotter-btn` base class (DMNC-1112).** Post-V.37 the Button rendered only `eidotter-btn--{variant}` modifier classes (no block class), so consumer CSS targeting `.eidotter-button` — or even `.eidotter-btn` — silently no-op'd. It now carries the variant-agnostic `eidotter-btn` block class (matching `<Badge>`'s `eidotter-badge` and `<Tag>`'s `eidotter-tag`), giving consumers a reliable override hook. Additive and a visual no-op — eidotter ships no bare `.eidotter-btn` rule. Note: `.eidotter-button` was never a real class and remains unsupported; target `.eidotter-btn` (or the element / a specific `eidotter-btn--*` variant).

### Fixed
- **Badge `info` variant uses the honest `text-info` role, not `status-info` (DMNC-1111).** `info`'s colour/border/dot wired to `--color-semantic-status-info` (the status ramp), so it could never render honest cyan under colour themes / the honest `:root` baseline — inconsistent with `success`/`error`, which use the `text-*`/`border-*` roles. Now consumes `--color-semantic-text-info` (honest CGA cyan `#00AAAA` at `:root`); a new `text-info` amber-mono override → `lightGray` (`#B87C1A`) keeps amber-mono a visual no-op (info stays tan-amber there). Surfaced by steuerdash (the honest-functional-colour consumer). `warning` still uses `status-warning` by design.

## [0.33.0] - 2026-06-17

### Added
- **Light theme (`eidotter/themes/light.css`, DMNC-1058 — palette slice).** A clean light palette for the existing semantic roles: warm-white surfaces, warm near-black text, amber brand kept (fills `#FFB000` with dark on-brand text; brand/accent **text** darkens to `#9A5700` for AA on white), honest functional hues darkened for AA (green `#007A00`, red `#AA0000`, info `#006688`). Palette-only — contemporary typography/corners/font are the broader Modern-theme follow-up. The shim (`eidotter/shadcn.css`) now emits a `[data-theme="light"]` block, so shadcn consumers get a real light mode. `aiDraft` stays brand-locked pink in light too.

## [0.32.0] - 2026-06-17

### Added
- **`eidotter/shadcn.css` — shadcn/ui token shim (DMNC-922).** Maps shadcn var names (`--background`/`--foreground`/`--card`/`--popover`/`--primary`/`--secondary`/`--muted`/`--accent`/`--destructive`/`--border`/`--input`/`--ring` + best-effort `--sidebar-*`/`--chart-*`) → eidotter's semantic roles as **HSL channels**, theme-aware (`:root` + one block per `[data-theme]`). A shadcn consumer imports it after `eidotter/styles`, deletes its own palette, and its existing `hsl(var(--background))` usages consume eidotter's themeable colours (e.g. `--destructive` = honest red at `:root`, amber-dim under amber-mono). **Opt-in subpath export — not bundled into `eidotter/styles`.** Generated by `scripts/generate-shadcn-shim.mjs` (in `build-tokens`, freshness-checked); `sidebar`/`chart` are amber-family aliases to override per surface.

## [0.31.0] - 2026-06-17

The colour-system rationalization (DMNC-922 / DMNC-1059), the timeline-marker fixes, and a restyled AI-provenance marker. **Visual no-op under the default amber-mono theme** — the headline change is that components now *re-theme*.

### Added
- **UTI-tier semantic colour roles (DMNC-922).** Honest, themeable roles in `web.tokens.json`: `text.{brand,tertiary,onBrand,error,warning,success,info,white}`, `background.{tertiary,brand,brandBright,brandDim,error,success}`, `border.{brand,brandBright,brandDim,error,success}`, plus `semantic.glow.error` (themeable hover-glow). Emitted as `--color-semantic-*` vars + `dos-*` utilities. `brand`/`brandBright`/`brandDim` are the amber emphasis ramp; functional roles are theme-aware.
- Theme-invariant primitives `cga-true.{white,redBright}` (`#FFFFFF` / `#FF5555`).
- **The default amber-mono theme is now bundled into `eidotter/styles`** so `data-theme="amber-mono"` works out of the box — previously theme overrides shipped only as separate `eidotter/themes/*.css` subpath imports, so consumers got the `:root` baseline and couldn't theme-switch (DMNC-1079).

### Changed
- **All component colour now routes through semantic roles (DMNC-1059 sweep).** Every raw `--color-cga-*` / `text-cga-*` / `bg-cga-*` / hardcoded hex across ~39 components migrated onto `--color-semantic-*` roles so they re-theme — visual no-op under amber-mono (Chromatic-verified). Spans: 92 `cga-amber` refs → brand roles (31 components), `text-cga-*` → semantic (9), amber-bright/dim → `brand-bright`/`brand-dim` + `text.tertiary` (8 incl. Card header & timeline axis), Badge `warning`/`info` → `status` roles, destructive Button, and the AI-shimmer + wordmark glow tokenized. No raw `cga-*`/hex remains in component/style code.
- **Functional colour is theme-aware: amber-mono by default, honest opt-in (DMNC-922/1059).** `success`/`error`/`warning`/`info` and the destructive Button render amber-mono under the default theme; honest red/green/cyan appear only under colour themes (`cga-amber`, the CGA modes, future light). `theme.amber-mono` now overrides the functional + `glow` roles so honest colour no longer leaks into the default view.
- **AI-provenance marker restyled to a static, theme-aware gradient (DMNC-946).** Was an animated `magenta→white→cyan` shimmer whose white midpoint vanished on light backgrounds; now a static "AI writer" magenta gradient — `#FF1A8C→#FF55FF` on amber/dark, `#C0228A→#7A3CC0` under light themes (`[data-theme="light"]`/`.light`). No animation. Tokens `aiShimmer{From,Mid,To}` → `aiGradient{From,To,FromLight,ToLight}`.

### Fixed
- **Timeline dots stay on the axis (DMNC-1090 / DMNC-1091).** `TimelineNode` markers pin `box-sizing: content-box` so the dot stays centred on the spine under consumer `border-box` resets (e.g. Tailwind preflight, used by eidotter.com) — previously they sat ~2px off the line. Markers now paint on top of the axis line (z-index); the dim resting colour and the dim→hover→active brighten ramp are preserved.

## [0.30.0] - 2026-06-16

Component compliance & a11y cluster from the 2026-06-16 audit (DMNC-1060/1063/1061/1070/1059).

### Fixed
- **Keyboard & focus a11y across five components (DMNC-1060).** From the 2026-06-16 compliance audit:
  - **Icon** — a `role="button"` icon is now keyboard-operable: focusable (`tabIndex=0`) with Enter/Space activation. Previously it had a click handler but no tab stop, so its shipped `:focus-visible` style could never fire. Added a normal-contrast focus ring (was high-contrast only).
  - **Tag** — interactive tags and the close button now have a visible `:focus-visible` ring. A `closeable` but non-interactive tag keeps its close button in the tab order (it's the only keyboard dismiss path); interactive tags still exclude it (the body offers Delete/Backspace).
  - **Terminal** — focus is now visible at normal contrast via a `:focus-visible` outline (was `outline: none` outside `prefers-contrast: high`); composes with the drop shadow.
  - **CommandPrompt** — removed a redundant `role="textbox"` + `aria-label` from the non-focusable wrapper around the real `<input>` (which carries its own label) — it exposed a duplicate, non-operable textbox.
  - **Accordion** — header focus ring keys off `:focus-visible` instead of `:focus`, so it no longer shows on pointer press.
- **Behavioral bug fixes across three components (DMNC-1063).** From the 2026-06-16 compliance audit:
  - **InlineExpand** — expand/collapse animated `max-height: 500px`, which clipped content taller than 500px. Switched to the `grid-template-rows: 0fr → 1fr` + `overflow: clip` pattern (same as Accordion) — animates to the natural height with no cap and is compositor-friendly. Content + sources are now wrapped in a single grid-clip child.
  - **TimelineContainer** — the `[+]` zoom-in button rendered enabled but was wired to a no-op (`onZoomIn={() => {}}`), and the documented `Ctrl/Cmd+=` shortcut was unimplemented. Both now drill into the first bucket of the current view (the most recent period under the default `desc` sort). Bucket clicks still drill into that specific period.
  - **Lightbox** — depended on `modal-crt-enter/exit` + `backdrop-open/close` keyframes that were defined only in `Modal.css`, so it broke if Modal's stylesheet wasn't loaded. Those keyframes now live in the shared `src/styles/keyframes.css`, imported from each overlay's TSX (Modal, Lightbox, CmdPalette) — every overlay is self-contained.
- **Mobile Nav overlay a11y (DMNC-1061).** From the 2026-06-16 compliance audit:
  - The off-screen panel (`translateX(100%)`, always in the DOM) now gets `inert` while closed, so its links are no longer keyboard-focusable behind the visually-closed menu.
  - Focus moves into the panel (close button) on open and is restored to the MENU trigger on close.
  - Added a focus trap so Tab/Shift+Tab cycle within the open panel.
  - Active route now carries `aria-current="page"` and an underline — no longer signalled by colour alone (WCAG 1.4.1).
  - The MENU-trigger hover glow `text-shadow` is neutralized under `prefers-contrast: high`.

### Changed
- **Token-discipline cleanup (DMNC-1059, partial).** Removed 49 dead hardcoded-hex fallbacks from `var(--color-cga-*, #hex)` references across 19 component stylesheets — every referenced token resolves (enforced by `lint-tokens`), so the fallbacks never fired; this is a visual no-op that drops the misleading hex (e.g. the destructive Button's `#AA0000` fallback, which already rendered the amber-mono primitive). `FilterBarItem.color` JSDoc now steers consumers toward semantic role tokens. The full primitive→semantic re-theming sweep is deferred pending the color-system rationalization (DMNC-922/1001).
- Dependency batch since 0.29.0: esbuild + storybook (#388), the minor-and-patch group (#389), form-data 4.0.6 (#387), storybook group (#384).

### Internal
- Added a **Component compliance** reviewer checklist to the PR template (DMNC-1070, partial). The axe a11y gate was already enforced in CI; the token-discipline lint is deferred with the DMNC-1059 sweep.

## [0.29.0] - 2026-06-15

### Added
- **`bootOnce` on `<RetroEffects>` (DMNC-1047).** Gates the `boot` turn-on to once per browser tab/session via `sessionStorage`. The sequence plays on the first load of a tab and is suppressed on every later mount within the same tab — both SPA route changes and MPA full-reload navigation — so opening a blog post or switching pages within a site no longer replays it. A new tab/visit replays it; a hard refresh does not. Optional `bootStorageKey` (default `'eidotter:retro-boot'`) scopes the flag or forces a replay. The gated path is effect-driven (SSR-safe; no hydration mismatch on reload) and falls back to playing normally if storage is unavailable. `boot` alone is unchanged (plays on every mount).

## [0.28.0] - 2026-06-12

### Added
- **CGA boot sequence (DMNC-1047).** New `boot` prop on `<RetroEffects>` plays a ~650ms monitor turn-on once on mount: a bright amber ignition line stretches across the center over black, the raster opens from it (panels retract to the edges), and a warm radial phosphor wash peaks and settles. The portfolio-wide first-load signature — consumers already mounting RetroEffects add one prop. Server-rendered panels make the first paint black (no content flash); compositor-only; skipped entirely under `prefers-reduced-motion`; `onBootComplete` callback for sequencing boot text after the turn-on.

## [0.27.1] - 2026-06-11

### Fixed
- **Sticky retro Header let content scroll through it.** `.eidotter-header--retro` set `background-color: transparent`, which outranks the sticky default's `bg-dos-bg-primary` utility under the Tailwind v4 layer order. Retro now paints `--color-semantic-background-primary` — identical on primary-bg pages, opaque when sticky. (#378, caught on dmnc.tech)

### Changed
- **`<Logo>` is now the Foundation Logomark** (Figma node 16-610, DMNC-1031): the amber yolk wrapped in a pixel-dotted ring — the "dotter" — with pixel specular highlights and a radial phosphor halo. Replaces the smooth "V2 yolk". Mark-only on transparent (the app-icon squircle in the Figma component is an app-icon artifact). API unchanged; gradient ids namespaced via `useId`. (#379)

## [0.27.0] - 2026-06-11

### Added
- **`<Skeleton>` — DOS/CGA loading placeholder (DMNC-1018).** Pending content renders as rows of shade characters (░ ▒ ▓) instead of a smooth gray shimmer, with a CRT hum-bar glow band rolling top→bottom over the field (asymmetric gradient: bright leading edge where the beam is, phosphor-decay tail fading upward — the refresh beat rolling down a CGA monitor). Variants: `text` (lines, last shortened), `card` (bordered surface + dense heading line), `figure` (contiguous dense shade field, pairs with `DosFigure`), `timeline` (marker square + entry column). Props: `variant`, `lines` (per-variant defaults), `animated`, `label`, `className`. Compositor-only animation at a research-backed 1.6s cycle; under `prefers-reduced-motion` the band becomes a gentle opacity breathing (Carbon's accessible-skeleton pattern); `prefers-contrast: high` disables all animation. Wrapper announces via `role="status"`; glyph rows stay `aria-hidden`.

### Changed
- Dependency batch (#374): storybook 10.4.3, chromatic CLI 17.4.0 + chromaui/action v17, actions/upload-artifact v7, react-aria 3.49 family, vite 8.0.16, style-dictionary 5.4.4 (zero-valued dimension tokens now emit `0px` — semantically identical; preset gains `dos-0`/`dos-none` keys, Swift tokens gain `sp0`), qs 6.15.2, and the rest of the minor-and-patch group.

## [0.26.1] - 2026-06-10

### Fixed
- **Tailwind v3 consumers broke on the v4-built stylesheet.** Tailwind v4 wraps `dist/eidotter.css` in native `@layer theme/base/utilities` blocks; Tailwind **v3** hijacks the `@layer` at-rule as its own directive grammar, so v3 apps whose bundler pipes vendor CSS through postcss (Next.js) failed with ``"`@layer base` is used but no matching `@tailwind base` directive"``. A post-build step (`scripts/flatten-css-layers.mjs`) now unwraps the layer blocks in document order — restoring exactly the unlayered cascade the v3-built dist always had. Verified against betamorf (Next + Tailwind 3).

## [0.26.0] - 2026-06-10

### Changed
- **Tailwind v4 migration (DMNC-866).** The library now builds with `tailwindcss@4` + `@tailwindcss/postcss` (Oxide engine). The generated JS preset keeps working in legacy mode via `@config` in the entry CSS — **consumers are unaffected**: `dist/eidotter.css` still ships all precompiled utilities (none missing vs the v3 build; Oxide even picks up a few utilities v3's scanner missed), and `eidotter/tailwind.preset` still works on Tailwind 3 **and** 4 (peer range unchanged).
- `autoprefixer` removed (v4 handles vendor prefixing natively).
- `tailwindcss-animate` removed from devDependencies — eidotter uses no `animate-*` utilities. The preset still auto-registers it for v3 consumers that have it installed (unchanged try/catch behavior).
- Dependabot's tailwindcss major-version ignore rule removed — no longer needed.

## [0.25.0] - 2026-06-10

### Removed
- **`eidotter/tailwind.preset.enhanced`** — the deprecated shim (alias of `eidotter/tailwind.preset` since 0.19.2) is gone, completing the deprecation cycle it announced. No portfolio consumer still imported it. Migration, if you do:

  ```diff
  // tailwind.config.js
  - presets: [require('eidotter/tailwind.preset.enhanced')],
  + presets: [require('eidotter/tailwind.preset')],
  ```

### Fixed
- **`version` export** updated to `0.25.0` (was `0.24.1` — the 0.24.2 release bumped `package.json` but not the constant).

## [0.24.2] - 2026-05-24

### Fixed
- **`version` export** now reflects current release (was stuck at `'0.21.0'` for three minor versions — consumers reading `import { version } from 'eidotter'` got stale values).
- **`data-ai-skip="true"` opt-out** now covers both `data-provenance="ai-draft"` (per-paragraph) and `data-ai-block` (whole-section) paths. Previously, a bare `[data-provenance="ai-draft"]` span inside a `data-ai-skip` wrapper was still painted.

### Changed
- Storybook stories for `<AIText>` and provenance rewritten to reflect the DMNC-946 gradient+shimmer visual (replacing leftover copy from the Phase 1 hot-pink+halo treatment). Added `BlockModeWrapper` and `OptOut` stories.

## [0.24.1] - 2026-05-24

### Added
- **`<AIText>` primitive** — inline text component rendering a shimmering CGA gradient to mark AI-generated content. Closes [DMNC-946](https://linear.app/lizomorf/issue/DMNC-946).
- **`data-provenance` API** — components opt into provenance styling via `data-provenance="ai"`; styling lives in `src/styles/provenance.css`. `<AIText>` delegates to this API. Closes [DMNC-884](https://linear.app/lizomorf/issue/DMNC-884).

## [0.23.0] - 2026-05-05

### Added
- **`<Footer>` `linkComponent` prop** — accepts a custom link component (e.g. react-router's `<Link>`) so internal links can do SPA-style navigation instead of triggering full-page reloads. Matches the shape already used by `<Header>`, `<Nav>`, and `<Breadcrumb>`. External links (`external: true`) still render as plain `<a target="_blank">` regardless. Default behavior (plain `<a href>`) is unchanged when the prop is omitted, so this is backward-compatible. Closes [DMNC-872](https://linear.app/lizomorf/issue/DMNC-872).

## [0.22.2] - 2026-05-03

### Fixed
- **Perfect DOS VGA 437 now renders Latin-1 accented characters correctly.** 0.22.0 bundled the CP437-codepage variant of the font (`Perfect_DOS_VGA_437.ttf`), which the bundled author license documents as "faithful to the original DOS codes [so it] won't accent correctly in windows" — i.e. it lacks Unicode/Latin-1 glyph mappings for ä, ö, ü, ß, and friends. German/French/Spanish content rendered as wrong glyphs across every consumer surface (e.g. `gemäß § 5 DDG` → `gemΣ█ ° 5 DDG`, `Düsseldorf` → `D"sseldorf`). Now ships the **Win variant** (`Perfect_DOS_VGA_437_Win.ttf`) — same author, same visual style for ASCII, but with the windows-codepage glyph mappings the web actually needs. ASCII rendering is byte-identical; non-ASCII text now renders as intended. ([#328](https://github.com/CinimoDY/eiDotter/issues/328))

## [0.22.1] - 2026-05-03

### Fixed
- **Bundler externalises `use-sync-external-store` shim chain.** 0.22.0 inlined the CJS `use-sync-external-store-shim.production.js` into the ESM `dist/index.es.js`, breaking consumer Vite builds (the duplicated React-export wrapper made consumer bundlers refuse the module). The shim is a transitive dep of `react-aria` / `react-stately`. `vite.config.ts` now externalises any path matching `use-sync-external-store` (bare package and Rolldown-resolved subpaths), and adds UMD globals mapping each subpath to the host `React` global (React 18+ exposes `useSyncExternalStore` natively). ESM bundle drops from 349KB → 345KB; consumer interop restored.

## [0.22.0] - 2026-05-02

AI-content provenance primitive (phase 1 of DMNC-884), font swap to Perfect DOS VGA 437, and a small TimelineContainer convention fix.

### Added
- **`--color-semantic-text-ai-draft`** (Tailwind: `text-dos-text-ai-draft`) — Signalnoise hot pink (`#FF1A8C`). Brand-locked: identical across amber-mono / cga-amber / cga-mode4-p0 / cga-mode4-p1 / cga-mode5 themes so the AI-draft signal is unmissable regardless of palette.
- **`--color-semantic-text-ai-draft-glow`** — 50% rgba of the same hex. Used in `text-shadow` only; no Tailwind utility. Single source of truth for the magenta phosphor halo (no duplicate rgba in CSS).
- **`src/styles/provenance.css`** — `[data-provenance="ai-draft"]` selector applying colour + halo, neutralised under `prefers-contrast: high`. Imported via the default `eidotter/styles` bundle so consumers get the rule for free. Visual primitive only — downstream consumers (devjournal first, then public surfaces) compute the per-paragraph diff and emit the attribute. See [DMNC-884](https://linear.app/lizomorf/issue/DMNC-884/phase-1-ai-content-provenance-marker-eidotter-token-utility-css).
- **Storybook section `Design System / Content Provenance`** — six stories: Default, MixedDraftAndRevised, OnLightBackdrop, Variants (`<p>`/`<li>`/`<blockquote>`), WallOfPink (six consecutive AI paragraphs as a fatigue check), HighContrastNeutralizesGlow.

### Changed
- **Primary font swapped to Perfect DOS VGA 437** by Zeh Fernando — pixel-perfect-vector TTF where every glyph outline is axis-aligned (no curves, no bezier easing). Replaces Flexi IBM VGA True v2, which was aspect-corrected but still drew bezier outlines that "resembled" rather than rendered authentic DOS pixel-art shapes. Free to redistribute per the bundled author license (`src/styles/fonts/Perfect_DOS_VGA_437_LICENSE.txt`); single-weight by design. `--typography-font-family-primary` resolves to `'Perfect DOS VGA 437', monospace`. Flexi files remain bundled under `src/styles/fonts/` so legacy consumers can still set `font-family: 'Flexi IBM VGA True', monospace` if needed; `@font-face` only loads Perfect DOS VGA 437 by default.
- **`<TimelineContainer>` no longer paints its own background.** The root `<div>` previously applied `bg-dos-bg-primary` unconditionally, forcing the page-background colour onto every host. It now inherits from its parent — consumers who relied on the implicit dark backdrop should wrap the timeline in a host element that sets the desired background. Aligns with the convention enforced by `<Alert>` and `<Notification>` (verified via regression test).

### Notes
- **Specificity (0,1,0).** The provenance attribute selector is intentionally weak — component CSS at class specificity overrides it without `!important`. Provenance is a cross-cutting hint, not a guaranteed visual lock.
- **Link affordance preserved.** `<a>` descendants of an `[data-provenance="ai-draft"]` element keep their own link colour by design — affordance ("this is clickable") outranks the AI-draft signal. Inline code, em/strong, and `::marker` inherit the pink.
- **API contract.** Only `data-provenance="ai-draft"` is supported. Revised paragraphs should carry no attribute at all rather than a `"revised"` value.
- **Font behaviour parity.** Both Perfect DOS VGA 437 and Flexi IBM VGA True are single-weight; existing `font-synthesis: none` and the `font-dos-bold/semibold/regular` aliases (all → 400) keep working unchanged. Visual letterform is different — pixel-aligned vs bezier-resembling.
- **Tests added/updated.** Source-token brand-lock invariant (per-theme parity), source ↔ generated cross-check, glow-token contract, selector + cascade, prefers-contrast neutralization, `src/index.ts` import pin, Tailwind preset spot-check, post-build `dist/eidotter.css` smoke check, font-family contract assertions updated to Perfect DOS VGA 437, German legal-clause text + test updated.

## [0.21.0] - 2026-04-29

Timeline overhaul Phase 2. Two new TimelineContainer capabilities for pluggable content + paginated reads. Purely additive — no breaking changes.

### Added
- **`renderEntry` prop on `<TimelineContainer>`** — pluggable entry renderer. Lets consumers swap the default `TimelineEntryCard` for any custom node (blog posts, photos, financial records, anything domain-specific). Render context exposes `defaultRender()` so consumers can opt in per-entry while letting the rest fall through to the default card. `isSelected` and `isExpanded` flow through unchanged so custom cards stay in sync with selection state. Threads through MonthView, DayView, HourView, and static-mode rendering. YearView is intentionally unaffected (renders bucket counts, not entries). New types `TimelineEntryRenderContext` and `TimelineRenderEntry` exported from the package surface and the `eidotter/components/TimelineContainer` subpath.
- **`mode="feed"` on `<TimelineContainer>`** — paginated, expandable vertical-list mode for changelogs, devlogs, and notification feeds. Distinct from `static` (always-expanded, no pagination) and from `interactive` (multi-zoom, drill-down). Entries are collapsed by default; click-to-expand via selection. New props:
  - `pageSize` (default `10`, clamped to ≥1) — initial slice + LOAD MORE step size.
  - `onLoadMore(visibleCount)` — fires once per LOAD MORE click after a real advance; safe under React StrictMode.
  - DOS-styled `LOAD MORE...` button with amber phosphor glow on hover/focus, with `prefers-reduced-motion` and `prefers-contrast: high` handling.
  - Pagination clamps when entries shrink below the current visible count, but **preserves visibleCount when entries grow** — the documented backend-pagination append flow works correctly. Composes with `renderEntry`.
- **Storybook stories**: `CustomRenderEntry` (milestone-as-special-card pattern), `FeedMode`, `FeedModeWithOnLoadMore` (analytics callback example).

### Changed
- `tailwindcss-animate` is currently incompatible with Tailwind v4. Dependabot is configured to ignore Tailwind major-version bumps until a deliberate v4 migration is planned (see `.github/dependabot.yml`).
- Vite bumped from `^6.4.2` to `^8.0.10`. Verified `dist/*` parity against published `0.20.1`: 54 named exports identical; ES bundle ~16% smaller from Rolldown's tree-shaking; CSS and UMD output near-identical (±1%). Default browser baseline raised to Chrome 107+ / Safari 16+ / Firefox 104+.
- PostCSS bumped from `8.5.10` to `8.5.12` (patch).

### Fixed
- Several feed-mode correctness issues caught in adversarial review before initial release:
  - Append flow no longer hidden by reset-on-length-change.
  - `onLoadMore` no longer fires inside the `setState` updater (was double-firing under StrictMode).
  - `pageSize=0` clamped to 1 to avoid the LOAD MORE button advancing forever with no progress.
  - LOAD MORE border now reads amber, not gray (was using a semantic token that resolved to light-gray).

### Notes
- 942 → 958 Jest tests (47 suites). 16 new tests across renderEntry (custom render replacement, context propagation, defaultRender fallthrough, all applicable views) and feed-mode pagination (append flow, pageSize=0 clamp, no-fire-at-cap, sortOrder, shrink-clamp).
- No new top-level component exports — both features are extensions of the existing `<TimelineContainer>`. Component count remains 36.

## [0.20.1] - 2026-04-24

First-class brand-mark components. Purely additive.

### Added
- **`<Logo>`** (`src/components/Brand/`) — V2 yolk (pure, no legs). Three nested circles (amber base / highlight / specular). Brand-locked hexes so the mark reads identically across themes. Props: `size` (number | string, default 32), `glow` (default true), `title` (defaults to "eiDotter"; empty string → `aria-hidden` for decorative use). `forwardRef`.
- **`<Wordmark>`** (`src/components/Brand/`) — "eiDotter" wordmark. "ei" prefix in dim amber, "Dotter" in full amber. Uses the DOS font (`font-dos`). Inherits host `font-size`; no default size so it composes into any type scale. Phosphor text-shadow glow can be disabled.
- **`<BrandLockup>`** (`src/components/Brand/`) — horizontal Logo + Wordmark composition. `logoSize`, `iconOnly`, `wordmarkOnly`, `glow` props. Default lockup for public brand surfaces.
- **`eidotter/brand` subpath export** — consumers can `import { Logo, Wordmark, BrandLockup } from 'eidotter/brand'` for semantic clarity. Resolves to the main bundle; tree-shaking handles the pull-through.

### Notes
- `prefers-contrast: high` neutralizes glow layers on all three components.
- Logo fills are brand-locked hexes (`#FFB000`, `#FFD97A`, `#FFE8A8`) rather than CSS variables — the logo is a visual-identity primitive that should not theme-shift across amber-mono / cga-amber / cga-mode4 / cga-mode5. Consumers who need a non-amber treatment can override via the SVG `style` prop or a CSS selector on the child `<circle>` elements.

## [0.20.0] - 2026-04-23

Three new components imported from the April 2026 design handoff — all built to the V.37 pattern (React Aria + Tailwind + CSS for phosphor). Purely additive: no existing component source was touched.

### Added
- **`<InlineLink>`** (`src/components/InlineLink/`) — in-flow navigational anchor. Dotted amber underline, phosphor-invert hover, trailing `▸` (internal) or `↗` (external). Distinct from `<InlineExpand>` (destination vs disclosure). External variant adds safe `rel="noopener noreferrer"` + `target="_blank"`; consumer-supplied `target="_blank"` without `external={true}` also auto-applies safe rel (tabnabbing guard). `href` is sanitized against `javascript:`/`data:`/unknown-scheme URLs. Closes rizomorf parity gap #03.
- **`<DosFigure>`** (`src/components/DosFigure/`) — demoscene-style painted-screen placeholder for media (Sierra / LucasArts title-card aesthetic). 4:3 amber chrome, 6s scanline sweep (container-query based, crosses the full frame at any size), phosphor flicker, optional annotation pins at `{x, y}` percentages with NaN-safe clamping, resolution tag. Animations are compositor-only (transform + opacity) and honor `prefers-reduced-motion` / `prefers-contrast`. Closes rizomorf parity gap #02.
- **`<CmdPalette>`** (`src/components/CmdPalette/`) — ⌘K / Ctrl+K command palette overlay built on React Aria `ModalOverlay` + `Modal` + `Dialog` (same primitives as `<Modal>`). Generic `items` with `keywords`, scored search, arrow-key navigation, optional `renderItem`, configurable hotkey (`"mod+k"` default, `false` to disable). Per-instance DOM ids via `useId()`. `selected` auto-clamps when `items` shrinks. Hotkey listener uses ref-based indirection so inline `onOpenChange` handlers don't rebind on every render.

All three components ship with `.tsx` + `.css` + `.stories.tsx` + `.test.tsx` + `Docs.mdx` + `index.ts`. `src/components/registry.ts` has new entries; `src/index.ts` exports the runtime + types.

### Changed
- Package version `0.19.4` → `0.20.0` (minor bump for new public components).
- CLAUDE.md + `llms.txt` + `README.md` + `guidelines/README.md` component lists updated (33 → 36).

### Notes
- No visual regression risk to existing components — these additions don't modify any shared CSS or token.
- Follows the same V.37 conventions as Button, Modal, etc.: React Aria where interactive, Tailwind for layout, component CSS only for phosphor effects and keyframes.

## [0.19.4] - 2026-04-23

Completes the April 2026 design-handoff token adoption by shipping the remaining two items — a dedicated muted-text semantic token and an opt-in `.dos-*` typography utility sheet.

### Added
- **`--color-semantic-text-muted`** (+ `text-dos-text-muted` Tailwind class) with per-theme hexes:
  - `amber-mono` → `{color.cga.lightGray}` (#B87C1A) — mid-ramp between amber primary and amberDim disabled
  - `cga-amber` → `{color.cga.brown}` (#AA5500) — warmth against the grey-heavy CGA palette
  - `cga-mode4-p0` → `rgba(255, 255, 0, 0.65)` — primary-at-65%-opacity (strict 4-color palette has no 5th hue)
  - `cga-mode4-p1` + `cga-mode5` → `rgba(255, 252, 247, 0.65)` — same strategy
  Dedicated hex per theme, not an opacity trick on amber — renders consistently over every surface and doesn't compound with phosphor filter effects.
- **`eidotter/utilities` subpath export** — opt-in CSS file shipping 12 `.dos-*` classes for raw HTML / MDX / prose surfaces: `.dos-page`, `.dos-hero`, `.dos-h1`–`.dos-h5`, `.dos-body`, `.dos-body-lg`, `.dos-caption`, `.dos-micro`, `.dos-label`, `.dos-code`, `.dos-scanlines`. All classes resolve through the existing `--color-semantic-*` and `--typography-*` tokens so they track the active theme. Not bundled into the default `eidotter/styles` — component-only consumers pay zero bytes.

### Changed
- CLAUDE.md Token Quick Reference muted row updated to `var(--color-semantic-text-muted)` / `text-dos-text-muted`.
- Component CSS + TSX files that previously referenced `--color-cga-brown` / `text-cga-brown` for muted text migrated to the new semantic token (landed in #295).

## [0.19.3] - 2026-04-20

### Fixed
- **Tailwind preset:** Restored the `monospace` fallback on the `font-dos` utility. PR #282 consolidated the Tailwind presets and began emitting `fontFamily.dos` verbatim from the source token, which had only `["Flexi IBM VGA True"]`. Consumers whose `@font-face` loading failed (strict CSP, web-fonts disabled, reader mode) would render in the browser default serif instead of monospace, breaking the DOS terminal aesthetic. The source `fontFamily.primary` token is now `["Flexi IBM VGA True", "monospace"]`, matching the pre-#282 runtime behavior. The separate `fontFamily.fallback` token remains intentionally bare (`["monospace"]`) — it's the fail-loud diagnostic escape hatch for surfaces that want to surface font-loading issues explicitly via `font-dos-fallback`.

### Internal
- Added contract tests asserting the exact `fontFamily.dos` and `fontFamily.dos-fallback` stacks, so future generator drift fails loudly in CI.

## [0.19.2] - 2026-04-18

### Deprecated
- **Tailwind preset:** `eidotter/tailwind.preset.enhanced` is now a deprecated alias for `eidotter/tailwind.preset` and will be removed in 0.21.0. Consumers should migrate to the single preset import:
  ```diff
  - presets: [require('eidotter/tailwind.preset.enhanced')]
  + presets: [require('eidotter/tailwind.preset')]
  ```
  The shim logs a one-time `console.warn` on load. No behavior change — the merged preset already carries the React Aria state variants and animate plugin that the enhanced preset used to add.

### Fixed
- **Docs:** `ADOPTION_STRATEGY.md` consumer file-layout diagram still named `tailwind.preset.js`; updated to `tailwind.preset.cjs` to match the post-#282 generated artifact.

## [0.19.1] - 2026-04-14

### Changed
- **Nav/MobileNav:** Replace hamburger icon with "MENU" text trigger — DOS font, uppercase, amber phosphor glow on hover (#265)
- **Nav/MobileNav:** Right-aligned, uppercase nav items in flyout panel with generous spacing (#265)
- **Nav/MobileNav:** Use `<Icon name="Close" size="S" />` (pixel-art X) for panel close button (#265)

### Added
- **Nav/MobileNav:** Escape key closes mobile panel (#265)
- **Nav/MobileNav:** `aria-controls` / `id` linkage between MENU trigger and panel (#265)

## [0.19.0] - 2026-04-13

### Added
- Header component: sticky site header with branding + Nav, retro/modern variants (#246)

### Changed
- Warm-tint all pure neutrals across design tokens (#259)
- **Icons:** Replaced @untitledui-pro/icons with pixelarticons (MIT) — DOS pixel art style (#257)
- **Fonts:** Upgraded to Flexi IBM VGA True v2; collapsed weight tokens to single 400 weight (#246, #250)
- Custom pixel-art X mark for Close icon (#261)

### Fixed
- Replace hardcoded font-size pixels with V.37 DOS tokens (#256)
- Declare Flexi IBM VGA True @font-face across weight range 100-900 (#249)
- Load Flexi IBM VGA True font in Storybook preview iframe (#248)
- Scale featured icons to 20px to prevent ring overlap (#263)
- Bump vite 6.4.1 → 6.4.2 security patches (#262)
- Bump axios 1.14.0 → 1.15.0
- Fix lint errors in Chat stories and Icon tests

## [0.8.0] through [0.18.0]

> Releases 0.8.0–0.18.0 were published before changelog entries were maintained here.
> See git history for details.

## [0.7.0] - 2026-02-09

### Added
- Tag and TagGroup components — interactive labels with variants (default, outlined, filled), custom CGA colors via `--tag-color`, selected/closeable/disabled states, keyboard interaction (#111)
- `<ComponentOrigin>` helper — surfaces component origin metadata in all Storybook MDX docs (#112)
- MDX documentation for Tag and FilterBar components (#112)

### Changed
- Origin sections added to all 20 component MDX docs pages (#112)

## [0.6.0] - 2026-02-08

### Added
- FilterBar component with multi-select, roving tabindex keyboard navigation, and 8 stories (#101)
- `useThemePortal` internal hook — propagates `data-theme` to portal containers via MutationObserver (#106)
- Global `prefers-reduced-motion` safety net in `accessibility.css` (#104)
- Button phosphor warmup/energize keyframes extended to all variants (#103)
- Modal close animation with `animationend`-driven exit transition (#100)
- Token validation script `scripts/validate-tokens.cjs` (#97)
- Component origin metadata registry with `getComponentsByOrigin`/`getComponentsByConsumer` (#91)
- TokenPlayground Storybook story with Leva controls (#84)
- MDX documentation for all 18 components (#96, #98)
- Tier 1 CSS animation polish across 8 components (#85)
- Solution docs: portal theme propagation, icon token fix, agent-native architecture

### Changed
- Storybook upgraded to v10.2.7 (#86)
- Button font size and weight increased for readability (#105)
- RetroEffects CRT animation values aligned with design-craft spec (#99)
- Storybook theme now driven by token pipeline, not hand-written overrides (#93)

### Fixed
- Modal portal now inherits `data-theme` from ancestor scope (#106, DMNC-364)
- Icon component: replaced non-existent `--color-system-*` tokens with semantic tokens (#87)
- Reduced-motion gaps patched across 4 components (#88)
- Alert: removed placeholder defaults for title and children (#82)
- Progress: DOS-style bar with visible track and shadow depth (#79)
- TokenPlayground Leva onChange wiring (#94, #95)
- ESLint setup and lint errors resolved (#89)

## [0.5.1] - 2026-02-01

### Added
- Progress: `fullWidth` prop to fill container width

### Fixed
- Alert: removed placeholder defaults for title and children

## [0.5.0] - 2026-01-31

### Added
- RetroEffects: Phosphor bloom effect (opt-in via `bloom` prop)
- RetroEffects: Power on/off animations with `powered` prop
- New design tokens: `--duration-power-off`, `--duration-power-on`, `--effects-phosphor-glow`, `--effects-crt-background`

### Changed
- RetroEffects: Flicker animation now WCAG 2.3.1 compliant (2Hz, under 3Hz threshold)
- RetroEffects: Added `will-change` hints for GPU compositing performance

### Fixed
- Badge text vertical alignment for pixel fonts (1px nudge)
- Version constant now matches package.json

## [0.4.2] - 2026-01-28

### Fixed
- Button: Secondary variant label now visible in pressed state

## [0.4.1] - 2026-01-25

### Fixed
- Documentation: Corrected component counts

## [0.4.0] - 2026-01-20

### Added
- Modal component for dialogs and overlays
- Stat component for displaying metrics
- Figma Make compatibility guidelines

### Changed
- Storybook docs rebuilt with latest component updates

## [0.3.0] - 2025-01-03

### Added
- Badge component with variant support
- Breadcrumb component for navigation
- RetroEffects component (scanlines, noise, CRT effects)
- Switch component for toggle states
- Tabs component for tabbed interfaces
- TimelineNode component (extracted from lifelines)
- Storybook accessibility addon integration
- Custom domain: storybook.eidotter.com
- JetBrains Mono as primary font

### Changed
- Token pipeline upgraded to DTCG format
- Amber theme unified to single color value
- Improved inactive tab contrast for WCAG AA compliance

### Fixed
- Tabs ARIA attributes (removed invalid aria-controls)
- Tabs color contrast for WCAG AA (4.5:1 minimum)
- Checkbox onChange when disabled
- Alert semantic tokens
- Component amber theme color consistency

## [0.2.1] - 2024-12-15

### Fixed
- Shadow transform in token pipeline
- Minor component styling issues

## [0.2.0] - 2024-02-03

### Added
- Proper type extraction from Figma components
- Component-specific variants, states, and types
- Improved Storybook documentation
- GitHub Actions workflow for CI/CD
- Issue templates for bug reports and feature requests
- Comprehensive contributing guidelines
- Detailed README with badges and examples

### Fixed
- TypeScript configuration for JSX compilation
- Story file generation with correct variants
- Component type definitions
- Media component variants and types

### Changed
- Updated package.json for better npm publishing
- Improved documentation structure
- Enhanced component organization

## [0.1.0] - 2024-02-02

### Added
- Initial release
- Basic component structure
- Figma integration
- Storybook setup
- Basic TypeScript support 