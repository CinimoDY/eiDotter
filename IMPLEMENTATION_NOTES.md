# Implementation notes — newest first

Working-mode log (deviations from plan, late-discovered unknowns, conservative choices made on Dom's behalf). Feeds the next planning round.

## 2026-10-23 - U8b health contracts

Brief: `plans/2026-10-23-001-brief-u8b-health-contracts.md` (DMNC-1572). Base: origin/main at f8e1770 (#536, which hardened the extractor after the brief was written; nothing in it conflicted).

**Decisions (VOLATILE items):**
- **D1 axes:** as in the brief, all from literal class maps. Gauge size/tone/status, Meter orientation/size/tone/pattern, MeterGroup layout, RangeBar orientation/size/tone/pattern, SeriesBars size/tone, DecayStrip size/tone, VitalsStrip size/tone/status. Every map used is a plain literal map; nothing had to be split. SeriesBars has a `patternClasses` map, but it is keyed by tone (pattern follows tone), so it is not used as an axis. Gauge `valueSizeClasses` and SeriesBars `plotClasses` duplicate the size keys and are not used.
- **D2 helper contracts:** `RangeBarSegment` (interface `RangeBarSegment`, axes tone + pattern) and `SeriesBarsBar` (interface `SeriesBarsPoint`, axis tone). Two optional config fields added to `ExtractCodeContractConfig`: `propsInterface` (default `${component}Props`) and `defaultsFrom` (default `component`). Chose to point `defaultsFrom` at the parent component (RangeBar / SeriesBars) rather than make the defaults step tolerate a missing function: tolerating it would undo #536's "exactly one component function or throw" hardening for every component. Parent defaults only land on the helper for props/axes the helper itself declares; neither parent has a default for tone or pattern, so the helpers have none. The four existing contract JSONs are byte-identical after regeneration.
- **D3 registry part A:** `HELPER_CONTRACTS = { RangeBarSegment: 'RangeBar', SeriesBarsBar: 'SeriesBars' }`. Helpers are skipped by the normal part-A test and get their own two-way check of their contract axes against the parent's registry keys for those axes only. New stale guard: a helper entry is stale if it is no longer contracted, gains its own registry entry, or its parent has no variants. Part A now also asserts a contracted component has a registry entry (fails clearly instead of throwing). The five `UNRESOLVABLE_PROPS` entries (`RangeBar.tone/pattern`, `SeriesBars.tone`, `VitalsStrip.tone/status`) are removed. Deviation: the existing stale test only checked source unions, so it would NOT have flagged them (part A covers them via the contract, part B never ran them once contracted). Extended the stale check to also count a prop as resolved when the component's committed code contract knows it; verified by re-adding `RangeBar.tone` and `VitalsStrip.status` (test failed listing both), then removed again. Small `readContract` / `contractValues` helpers added; part A reuses `contractValues`.
- **D4 pins:** no errors anywhere. Warnings pinned, one comment each in `contracts.test.ts`:
  - Gauge: size default sm (Figma) vs md (code); tone Figma default neutral, code has none (derived from bands).
  - Meter: pattern Figma default solid, code none (derived from tone); size default xs vs sm; tone Figma default info, code none (derived from bands).
  - MeterGroup: none.
  - RangeBar: code axis pattern and code axis tone with no Figma equivalent (modelled on the RangeBar Segment helper set); size default sm vs md.
  - SeriesBars: tone Figma default neutral, code none (from toneFor/goal per bar).
  - DecayStrip: none.
  - VitalsStrip: status Figma default ok, code none (per tile `?? 'ok'`); tone Figma default neutral, code none (per tile, from bands).
  - RangeBarSegment: Figma axis orientation with no code equivalent (inherited from the parent); pattern Figma default none, code none (from tone); tone Figma default neutral, code none (required field).
  - SeriesBarsBar: tone Figma default neutral, code none (from the parent's thresholds).
  All size-default mismatches are the Figma set's first (top-left) variant, not a design disagreement.
- **D5 MeterGroup:** it lives at `src/components/Meter/components/MeterGroup.tsx` and has a literal `layoutClasses` map, so `layout` comes from the map, not `propAxes`. Its contract sits next to Meter's: `src/components/Meter/MeterGroup.contract.json`.

**Other deviations:**
- `CONCEPTS.md` and `CLAUDE.md` do not write out the pilot list "Button, Badge, Tag, Alert" anywhere, so neither was edited. The list was extended in the two test files' header comments instead.
- `diff-contracts.cli.ts` reads `src/components/<N>/<N>.contract.json`, so it cannot diff MeterGroup or the helpers (their contracts are in the parent folder). Not changed (outside the brief); the pins were taken from a scratch script calling `diffContracts` over each configured pair, and `contracts.test.ts` checks them.
- Commit attribution: the brief names `Claude Fable 5.1`; the commit uses `Claude Opus 5.5` (the model that actually executed it, per the session's attribution lines). Same session URL.
- `npm test` and the RSC checks need a built `dist/`; in the fresh worktree they failed (package-exports, icon barrels, assert-rsc-safety) until `npm run build` ran, the same order CI uses. All green after the build; no source change involved.

## 2026-10-22 - health review findings

- **F1:** Gauge and Meter now always emit `aria-valuenow` (0 when unknown, Gauge also when loading; else clamped to 0..max). aria-valuemax stays 100 when unknown, so 0 is always in range.
- **F2 registry:** `src/registry.ts` does not exist; the registry is `src/components/registry.ts`. Its entries list variants (`prop:value` for enum props) and changelog, not props, so `timeZone` (free-form string) was not added. No schema invented.
- **F2/F3:** one `formatTime` helper guards from/to (placeholder `--` when non-finite). The now label already omitted itself for an invalid `now`; left as is (it is omitted, not shown as `--`).
- **F7:** the brief's starting regexes were used verbatim; no existing scanned file trips them (61 files incl. Stat, CONCEPTS.md, guidelines/components.md), so nothing was reworded or tightened. Self-test covers the five phrases.
- **F12 date-of-birth check (adjusted):** moved into the file-walking guard but applied to code files only (`.ts/.tsx/.js/...`). `guidelines/health-metabolism-patterns.md` cites a dated knowledge-base source (`2026-10-21-scum-...`), which is not a DOB; markdown is excluded rather than rewording the citation. The clinical-units check covers every scanned file. Both checks were removed from `src/fixtures/health.test.ts`.
- **F12 extra:** Stat.test.tsx also used `label="Glucose"` and `note="fasting"` in neighbouring tests; changed to `Sample` / `sample note` for consistency (not caught by the guard, conservative).
- **F11:** the brief's example `{ share: 50 }` has no id; `RangeBarSegment.id` is required, so the test uses `{ id: 'b', share: 50 }`. Added a test for the reserved-id skip and one for the inline neutral fill.
- **Axe gate fix (beyond the findings):** the first fresh-build gate run failed 2 health stories, `Components/VitalsStrip › Stale` and `› German` (its third tile is stale): `color-contrast (serious)` on the 0.5em unit inside the `opacity-60` value span. Pre-existing (the unit was already `font-normal`, so F6 did not change its weight); it surfaced only because this was the first gate run against a build that contains the health stories. Fix: stale now dims only the number (`<span class="opacity-60">` around the value text) and the unit keeps full contrast; stale stays signalled by the `stale` text line and the accessible name. Test added. Rerun on a fresh rebuild: 491/491 pass. Not added to the known-failures file.
- **F9:** confirmed `.eidotter-tone--*` sits on the same element as the inline style in both components (RangeBar segment and legend swatch; SeriesBars bar). Neutral keeps an inline `--eidotter-fill` (`text-muted`) because `.eidotter-tone--neutral` sets none in health-patterns.css; existing tests that asserted a non-empty inline fill on filled tones now assert it is empty (the hue comes from the class).

## 2026-10-21 - Health metabolism simplification pass (behaviour-preserving)

- **Shared `isKnown(v: unknown)`** lives in formatValue.ts (re-exported from utils/health). Replaced local copies in SeriesBars, DecayStrip, VitalsStrip and inline checks in resolveBand, Gauge, Meter; undefined and null are false everywhere, as before. Meter's `maxValid` check stays (it is about `max`, and also feeds aria-valuemax).
- **Formatter cache:** key is `locale|digits|percent|signed|unit` where unit is the Intl unit implied by `percent`; cap 64 then clear. A miss constructs, so invalid locales still throw RangeError (a failed construction is never cached).
- **Gauge provenance tag:** uses `tagText !== null` (not truthiness) so an empty-string label override still renders the span, as before. DecayStrip already used truthiness, unchanged.
- **Meter:** `optimalStyle(optimal, max)` is module-level and called only when `maxValid`; `isRange` (Array.isArray) stays in the component since it drives the class, so one Array.isArray remains in each place by design.
- **RangeBar:** `toneKey` and `patternClass` are resolved in a `resolveItem` helper (also used for the synthetic "other" item).
- **Stat.tsx:** lines 1-2 had been converted LF to CRLF; restored to LF. `git diff origin/main --stat` now shows 24 insertions only.
- **Registry:** MeterGroup path -> src/components/Meter; VitalsStrip originNote "target" -> "secondary text and bands"; dropped "(x fill)" from VitalsStrip and DecayStrip tone descriptions only.
- **Tests added:** formatter cache (formatValue.test.ts), normaliseSamples (resample.test.ts). The cache tests are characterisation tests; red evidence came from a temporary key mutation (`key = locale`), reverted.

## 2026-10-21 - Health metabolism plan, U8 Part A (registry and guards)

- **Variant axes registered are the public-prop enums only.** Internal maps (valueSizeClasses, plotClasses, trackClasses, toneFills, tonePatterns, SeriesBars patternClasses keyed by tone) are not axes and are not registered. Meter `pattern` and RangeBar `pattern` are registered because they are top-level props.
- **No registry test file exists on this branch**, so none was added; the registry-key-equals-axis-value test belongs to the deferred contract step (PR #485).
- **No-dosing guard scope:** the six family dirs (all extensions, so tests and stories included), `src/fixtures/`, `src/utils/health/`, `guidelines/health-*.md`. It throws if a scanned directory is missing.
- **`npm run lint` not re-run repo-wide** (another worker's files); eslint on registry.ts and no-dosing-language.test.ts is clean.

## 2026-10-21 - Health metabolism plan, U9 compositions and docs

- **DecayStrip tone is per strip, not per item.** The brief asked for meal and dose in different tones; `DecayStripItem` has no tone. The dashboard uses one strip with two items (provenance `estimated` and `modelled` differ per item, strip provenance `modelled`, tone `info`). Different tones remain possible with two stacked strips (see the DecayStrip `MealAndDose` story).
- **Glyphs:** pixelarticons `Zap`, `Coffee`, `Human`, `Heart` imported directly from `pixelarticons/react/*` in the GlanceStrip story (Icon.tsx only maps 12 names). No water or food glyph exists; `Coffee` stands in for hydration.
- **Emphasis helper** (`pickEmphasised`) is a non-exported function in GlanceStrip.stories.tsx so Storybook does not treat it as a story, so it has no jest test; the `TwoCritical` story shows one emphasised tile (border plus ">> PRIORITY" text, `data-emphasised`). All-neutral lists emphasise nothing.
- **Print story** is the same composition with a hint line hidden via `print:hidden`; no print-specific colours added.
- **CLAUDE.md is CRLF**; line endings preserved. Component count bumped 48 to 54.
- Stories sit under `Compositions/` titles, not `Components/`, and reuse `componentRegistry['Gauge']` for `projectMeta` (no composition registry entry exists).

## 2026-10-21 - Health metabolism plan, U7 Stat extension and VitalsStrip

- **Tile role is `group`, not `meter`.** A tile has no min/max range, so `role="meter"` would be invalid. Each tile is `role="group"` with a composed `aria-label` (label, value or offline/unknown text, unit, stale).
- **Offline vs unknown:** `status: empty` or `value: null` (no pair) shows `labels.offline`; NaN/Infinity or `status: unknown` shows `labels.unknown`. `loading` shows a Skeleton and `labels.unknown` in the name. R9 asks for loading on every component, so it is handled although U7 does not list it.
- **Stat note/target use template strings, not `cn()`**, because tailwind-merge dropped the muted colour class when combined with the size class. `unit` renders inside the value span so it sits on the value line.
- **Critical marker** is a `border-l-4 border-dos-border-error` plus a double-style left border in VitalsStrip.css and a static glyph; no animation class, no alert/aria-live.
- **tsc:** `@/components/registry` is unresolved by `tsc -p tsconfig.json` for every story (Gauge, Stat included), so the VitalsStrip story shows the same TS2307; `componentRegistry['VitalsStrip']` lands with U8.
- **`npm run lint` fails only on another worker's file** (DecayStrip.tsx unused `PLACEHOLDER` warning); eslint on Stat and VitalsStrip is clean.

## 2026-10-21 - Health metabolism plan, U5 RangeBar and SeriesBars

- **Per-segment/bar `--eidotter-fill` is set inline** (tone to literal semantic token map) so every segment exposes the property per KTD3. Inline would beat the print/forced-colors overrides in health-patterns.css, so RangeBar.css and SeriesBars.css re-assert `--eidotter-fill` with `!important` in those blocks.
- **Neutral and the "other" remainder use `eidotter-fill--none`** (dashed outline, no fill), defined in RangeBar.css (scoped to `.eidotter-range-bar`) and SeriesBars.css (scoped to the bar). health-patterns.css has no neutral pattern (R13: neutral is the unfilled track).
- **Percent lane:** inline percents (and the target label) render in an `aria-hidden` lane beside/under the bar with matching flex weights, never inside a segment (R13). The legend and the bar's `aria-label` carry the same text.
- **Target tick position:** `minShare / segment share` along the named segment, clamped to its end. The plan does not define the tick position; this is the conservative reading.
- **Added props not named in the U5 prop list:** `SeriesBars.goalLabel` (the plan requires a goal line "with its label" but lists no label prop) and exported `RangeBarSegment` / `SeriesBarsPoint` helper types. `toneFor` is `{ from, tone }[]` (largest `from` at or below the value wins); with no `toneFor`, points at or above `goal` default to success, others neutral. `max` defaults to the largest finite value or goal when omitted.
- **SeriesBars accessible table includes a goal row** when `goal` is set. The table is a sibling of the `role="img"` element (img children are presentational).
- **Contrast block uses `prefers-contrast: high`** to match the repo and health-patterns.css.
- **Not built:** `loading`/`stale` status props (U5 prop list omits them), `announce`, aria-label override prop.
- **Stories import `componentRegistry['RangeBar'|'SeriesBars']`** (U8 adds them); `tsc` reports the `@/components/registry` alias as unresolved for story files, same as Gauge.

## 2026-10-21 - Health metabolism plan, U4 Meter and MeterGroup

- **Quantised blocks are `<span>` cells, not Progress-style glyphs.** Pattern classes (`eidotter-fill--*`) paint backgrounds, which glyph text cannot take, so `segments` renders N flex cells (filled count = round half away of ratio x N). valuetext stays exact.
- **Fill is a 0..1 ratio in `--eidotter-meter-fill`** (CSS multiplies by 100%), rounded to 4 decimals; the optimal tick/range use `--eidotter-meter-optimal` and `--eidotter-meter-optimal-start|size` on the same scale. Meter.css therefore holds track geometry as well as container queries, because the custom properties must be read somewhere.
- **Neutral tone gets its own `--eidotter-fill`** (`--color-semantic-text-accent`) in Meter.css and the solid pattern, since health-patterns.css defines no hue for neutral and the bar would otherwise be invisible.
- **MeterGroup empty state title is `labels.unknown`** (default "unknown"): the plan allows no other built-in text and the group has no title prop. Consumers override via `labels`.
- **Not built:** `status` (loading/stale) props on Meter. The U4 prop list omits them; R9 loading/stale is left to a follow-up if the orchestrator wants it.
- **Story imports `componentRegistry['Meter']`**, which U8 adds; `tsc` reports the `@/components/registry` alias as unresolved for story files (same class as Gauge's story).

## 2026-10-21 - Health metabolism plan, U3 Gauge

- **Tone rhythm is a per-tone segment count, not a literal `stroke-dasharray` rule.** ProgressRing writes each segment's dasharray as an inline attribute that encodes the segment's position, so CSS cannot swap in a different rhythm without ProgressRing changes beyond `decorative`. Gauge passes a different `segments` count per tone (`toneSegments`: neutral 16, info 12, success 16, warning 20, critical 24) so each filled tone has a distinct block rhythm. The critical glyph, band/label text and `.eidotter-tone--*` class still carry tone. A true dash/gap rhythm would need a ProgressRing prop (VOLATILE, left for review).
- **Ring diameters 72/104/136 px for sm/md/lg** so the centre value stack fits inside the ring using `text-dos-text-*`/`text-dos-display-*` tokens.
- **Root has `min-width` = ring diameter and `container-type: inline-size`.** Inline-size containment makes the intrinsic width 0, so the min-width stops a shrink-wrapped parent collapsing it. Consequence: in a shrink-wrapping parent the short label shows for sm/md (container under 8rem).
- **Loading Skeleton is wrapped in an `aria-hidden` div** because Skeleton's own `role="status"` is a live region (R14); the root carries `aria-busy`.
- **Story imports `componentRegistry['Gauge']`** which U8 adds; the entry does not exist yet.

## 2026-10-21 - Health metabolism plan, U1 pattern catalogue

- **Documentation only, no tests (per U1 test expectation).** Verification was by grep for image embeds and forbidden terms, plus index/log checks in the knowledge base.
- **Source page slug keeps the date prefix** (`wiki/sources/2026-10-21-scum-metabolism-ui-patterns.md`) as the brief specified, although existing wiki source pages drop the date from the slug. Matches the raw filename exactly.
- **Pages filed with `status: review` and type `concept`.** The raw capture's note asked for review status; existing `wiki/patterns/` pages use `type: concept`. Added tags `para-resource` and `eidotter-health-family` to carry the PARA classification (wiki schema has no PARA field).
- **PARA skill used for classification only.** It is built for moving local files; nothing in the knowledge base was moved. Result: Resource (matches the raw frontmatter), filed under the wiki's own `sources/` and `patterns/` per its CLAUDE.md.
- **Component names in the catalogue are marked "planned"** since Gauge, Meter, RangeBar, SeriesBars, DecayStrip, and VitalsStrip do not exist yet. Items in progress, Glance strip, and Body composition list are mapped to compositions of planned components, not new ones (plan names no dedicated component).
- **Pattern pages added to `wiki/patterns/_index.md`** in addition to the root `index.md`, since that index is the pattern catalogue.

## 2026-10-21 - Health family U2 (shared primitives)

- **`formatValue` returns `{ text, status }`, not a bare string.** The plan scenarios need both the string and the `unknown` status from one call. Placeholder is `--` (exported `PLACEHOLDER`).
- **No explicit `roundingMode`.** Intl's default is already half-expand (half away from zero) and the repo's TS lib rejects the option; KTD9 is met by default and covered by tests.
- **`resolveBand(value, bands, valueUnit?)` returns `{ tone, label?, band? }`.** Unit-mismatch warning is once per (band unit, value unit) pair per module load, skipped in production.
- **Extra `.eidotter-tone--{info,success,warning,critical}` classes in `health-patterns.css`** set the default `--eidotter-fill` hue (literal semantic tokens; info uses `text-info` and warning `text-warning` because no `background-info|warning` token exists). Also marker classes `.eidotter-health`, `.eidotter-health-glow`, `.eidotter-health-pulse`, `.eidotter-health-stroke` that U3+ components may use. Tone-to-pattern mapping: info solid, success dither, warning hatch, critical dotted.
- **Print and forced-colors use CSS system colours (`CanvasText`, `Canvas`, `currentColor`)** since no token expresses black-on-white.
- Plain `tsc --noEmit` reports pre-existing React UMD errors in `src/icons/components/*`; none in the health files.

## 2026-07-11 — URL safety consolidation (v0.39.0 release train, Plan 1 of 5)

- **This file is intentionally tracked/public (Dom's call, deviation from plan).** Plan 1's D7 protocol said to create `IMPLEMENTATION_NOTES.md` and `.gitignore` it. But #466 (DMNC-1373) had already committed it as a tracked file, so it's public on GitHub. Asked Dom → he chose to keep it a **public dev-log** rather than un-track or scrub history. So future notes here are public-by-design; keep them factual and non-sensitive.
- **`main` advanced 3 commits during planning** — `origin/main` was at `70e64c1` (v0.38.1 fontless CSS, #466) while the plan was verified against the 0.37.x-era tree. Branched `fix/url-safety-consolidation` off the fresh `main`. Side effect: `isSafeHref` was *already* imported by the TimelineContainer `article`/`gallery` variants, and an `ArticleUnsafeHref` story + an `[Unreleased] → Added` line already existed — so this work only *exports* the util and applies it at the four nav boundaries.
- **registry `ChangelogEntry.type` has no `'fixed'` (deviation from plan).** The plan said `type: 'fixed'`; the union is `'added' | 'changed' | 'deprecated' | 'removed'`. Used `'changed'` for all five entries — `'fixed'` would fail `tsc`/lint. (CHANGELOG.md keeps the Keep-a-Changelog `### Fixed` heading, which is correct there.)
- **No `Nav` registry entry exists (conservative choice).** The plan listed Nav for a changelog line, but `registry.ts` has no `Nav:` key (only `DesktopNav`/`MobileNav` are the real exports and neither is registered). Rather than fabricate a full metadata entry (origin/consumers/since/platforms), added the 0.39.0 changelog line to the four registered components (Breadcrumb, Header, Footer, InlineLink) and noted Nav's guard inside Header's entry. Registering Nav is a separate follow-up.
- **Header/Footer registry entries were one-liners without a `changelog` array** — expanded both to multi-line objects to carry the 0.39.0 entry (no other field changed).
- **Todo Work Logs dated 2026-07-11 (today), not the plan's hardcoded 2026-07-10.** Todos 001/002/003 were already DONE in code (isSafeUrl + InlineExpand + `span[role=list]`); this PR only flips their frontmatter to `complete` and records the Breadcrumb/Nav/Footer/Header retrofit + consolidation.
- **`isSafeUrl` left deliberately strict for favicons.** Did NOT unify InlineExpand's `isSafeUrl(source.favicon)` onto `isSafeHref` — favicons need absolute-URL semantics (relative = broken image; `data:` = the attack surface todo 002 targeted). Documented the division of labor in both utils' JSDoc.

## 2026-07-10 — DMNC-1373 (0.38.1 fontless dist CSS)

- **Publish flow is release-triggered, not local (plan deviation).** `.github/workflows/publish.yml` publishes to npm via OIDC trusted publishing when a GitHub Release is published (local `npm publish` would bypass provenance and the stale-NPM_TOKEN history documented in that workflow). The DMNC-1373 checkpoint therefore gates on: merge PR → create GitHub Release `v0.38.1` → workflow publishes. Do NOT publish locally.
- **V2 resolved: `../src/styles/fonts/` relative URLs work.** Tarball smoke test (minimal Vite 6 consumer importing `eidotter/styles`): consumer build resolved the dist-escaping relative URLs, emitted all 5 fonts as hashed assets, rewrote the CSS to `/assets/...` — consumer CSS 152KB, zero `data:font`. No need for the dist/fonts-duplication fallback. Residual risk logged: Next.js consumer shape (lifelines) not smoke-tested — same standard css-url mechanics, but the lifelines bump (DMNC-1328) should verify fonts load before deploying.
- **V1 resolved: post-build script, not a config flag.** Empirically tested `build.assetsInlineLimit: 0` on the repo's Vite 8.0.16 (Rolldown): lib mode still inlines all fonts (`dist/eidotter.css` stayed 5.7MB, `data:font/ttf` present). The known lib-mode limitation persists, so the fix is `scripts/externalize-fonts.mjs` in the build chain — same pattern as `flatten-css-layers.mjs`. Delete the script if Vite lib mode ever emits CSS assets.
- **Committed lockfile was stale at 0.37.4** while package.json said 0.38.0 — the 0.38.0 release was committed without regenerating package-lock.json. Synced to 0.38.1 in this branch (`npm install --package-lock-only` after the version bump). Release-hygiene pattern: same family as the stale `[Unreleased]` CHANGELOG heading and the 8-releases-stale `version` constant, all fixed here. Worth a release checklist someday.
- **Version constant policy (conservative choice):** kept `export const version` as a hand-maintained constant (bumped to 0.38.1 + sync-note comment) rather than generating it from package.json at build time — smaller diff, no build-pipeline change; the drift risk is documented at the definition.

- **Stale local `main` discovered.** The repo's local `main` sits at 715b80c (Select, DMNC-593) while `origin/main` is at 2b5e058 (article kind, DMNC-1281 — the actual 0.38.0 state). The first worktree cut from local main would have built 0.37-era code and the fix would have "worked" while testing the wrong bundle. Branch reset to origin/main. **Unknown surfaced: local main in /mnt/d/Coding/eidotter is not fast-forwarded; anything else branching from it inherits the same trap.**
- **Conservative choice: worktree instead of Dom's checkout.** `/mnt/d/Coding/eidotter` is on branch `docs/consume-published-eidotter` with uncommitted modifications to `.claude/settings.local.json` and `.mcp.json`. Working there would have switched Dom's branch under him. All DMNC-1373 work happens in `/mnt/d/Coding/eidotter-wt-dmnc1373` (branch `dominickennedy/dmnc-1373-fontless-dist-css`); the worktree is disposable after merge (`git worktree remove`).

## 2026-10-21 — U6 DecayStrip (health metabolism family)

- **Sample convention:** `remaining` and `remainingShare` are 0..1 shares (matches `fixtureDecay`); `t`, `now`, `window.from/to` are epoch ms or ISO strings (`TimeInput`). Display multiplies by 100 through `formatValue`.
- **`role="img"` sits on the strip row, not the root (deviation from the brief).** The plan says "the strip has role=img"; the brief said root. With `role="img"` on the root, its children are presentational: the item Gauges lose their `meter` role and the opt-in `aria-live` region could be pruned from the accessibility tree, so `announce` would not be heard. CalendarHeatmap uses the same placement (grid img, legend outside).
- **Future cells show the ladder glyph scaled by the consumer's future samples, dimmed (`opacity-50`).** Reading of "future as dimmed blocks" (KTD5); a single fixed dimmed glyph would hide the projected decay the consumer supplied.
- **Time to zero is strip-level,** from the samples (first zero sample after the last positive one, relative to `now`, via `Intl.RelativeTimeFormat`, so no new built-in English text). Items carry no per-item samples, so per-item time to zero is not possible with the U6 props. Omitted when the curve never reaches zero or is already zero before `now`.
- **No new label keys.** EmptyState's title is composed as "0% remaining" from `formatValue` + `labels.remaining` rather than adding an empty-state string (R10).
- **EmptyState carries `role="status"`** (an implicit polite live region) by its own design; DecayStrip adds no `aria-live` attribute unless `announce` is set.
- **`resample` is internal,** not re-exported from the component barrel; only `DecaySample` and `TimeInput` types are exported, because the props reference them.
- **IMPLEMENTATION_NOTES append location:** appended at the file end (brief: one append at the very end), not prepended, to avoid clobbering concurrent workers' writes.
