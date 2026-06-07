# eiDotter Figma Design System — Architecture & Governance

How eiDotter's design system is structured across Figma files, how those files relate to the npm token sources, and how apps adopt it. This is the **maintainer/contributor** reference for the multi-platform DS (DMNC-916 and descendants). Consumers of the npm package do not need this — see `README.md` for usage.

> **Source of truth.** The npm token sources in `src/tokens/*.tokens.json` are canonical. Figma is a *projection* of them (via `style-dictionary` → DTCG → `figma_batch_create_variables`) plus the place components are designed. When they disagree, the JSON wins; rebuild and re-sync Figma rather than hand-editing generated values.

## The chain

```
                    src/tokens/*.tokens.json   (canonical — npm)
                              │  style-dictionary (DTCG emit)
                              ▼
        ┌──────────────────────────────────────────────┐
        │   eiDotter Foundation  (KoGTFX8…)             │   T1 primitives + T3 dimensions
        │   amber-mono CGA · effect numerics · type     │   + T4 effect numerics + typography
        └──────────────────────────────────────────────┘
                  │ alias            │ alias          │ alias
                  ▼                  ▼                ▼
        ┌───────────────┐  ┌───────────────┐  ┌───────────────┐
        │  Web DS        │  │  iOS DS        │  │  macOS DS      │   T2 semantic layers
        │  (iohPpta…)    │  │  (TEnlcIg…)    │  │  (peVTIvO…)    │   (+ components)
        └───────────────┘  └───────────────┘  └───────────────┘
                  │                  │  subscribe + alias
                  ▼                  ▼
              ┌──────────────────────────────────┐
              │  App files (DOSBTS_fig, …)        │   subscribe + alias;
              │  keep only app-specific literals  │   app-only surfaces stay local
              └──────────────────────────────────┘

   V.37 / "❖ Pattern Lab" (V4tIz3sAMRx7…)  ── UTI-full component-authoring reference;
                                               the npm React components are designed against it.
                                               Sits BESIDE the chain — aliases nothing in production.
```

**One line:** Foundation is the single source of primitives + effect/motion numerics; each platform library aliases Foundation and adds a semantic layer + components; each app subscribes and aliases, keeping only genuinely app-specific literals local.

## File map (authoritative)

| File | Key | Role |
|------|-----|------|
| **eiDotter Foundation** | `KoGTFX8INOAjFaOKPXnSlX` | **The canonical foundation.** Lean DOS-native, amber-mono CGA. Collections: `1. Primitives` (T1), `2. Effect Parameters` (T4 numerics), `3. Typography`. Published; subscribed-to. |
| **eiDotter Web DS** | `iohPpta7n73wCcP5xbsaJU` | Web platform sub-library. `2. Web Semantics` (T2, 126 vars — all aliasing Foundation) + 34 ComponentSets. |
| **eiDotter iOS DS** | `TEnlcIgXrB3akHvtjMy3po` | Apple iOS HIG semantic layer, 87 vars aliased to Foundation. |
| **eiDotter macOS DS** | `peVTIvO9oDzynkPXhQo0W8` | Apple macOS HIG aliased to Foundation; Liquid Glass shader params kept as literals (not aliased). |
| **V.37 / "❖ Pattern Lab"** | `V4tIz3sAMRx7H9wMYeesA6` | UntitledUI-full component fork — the component-authoring reference the npm package is built against. **Not a foundation**; aliases nothing in the production chain. Unpublished as a team library. |
| ~~"Foundation"~~ | `qlEyN6zHPX4XOohJefJ4bZ` | **Abandoned first attempt** on Molly Helmuth's DS. **Out of scope — never subscribe to or alias.** Named "Foundation" and shares V.37's "❖" glyph, so easily confused with `KoGTFX8`; it is neither the foundation nor V.37. Frozen palette-pattern source for DMNC-922 only. |
| **DOSBTS_fig** | `1Hemp6DehvK1a5uMrPJyhr` | Amber CGM app. Adoption target. |
| **calendar-365** | `npu5c86H9QHBB4fluVUjKJ` | App; future adoption candidate. |

## Token tier taxonomy (DMNC-916)

| Tier | What | Lives in |
|------|------|----------|
| **T1 — Primitives** | The raw CGA palette (`color/cga/*`), brand amber. | Foundation `1. Primitives` |
| **T2 — Semantics** | Role-named tokens (`color/semantic/text/primary`, `status/success`, …). Each **aliases** a T1 primitive. | Platform DS files (Web/iOS/macOS) |
| **T3 — Dimensions** | Spacing, radius, border width, z-index, opacity. | Foundation (+ surfaced per platform) |
| **T4 — Effect numerics** | Phosphor/scanline/flicker/vignette/shadow numbers; (NEW) motion durations + easings. | Foundation `2. Effect Parameters` / `4. Motion` |

A T1 change in Foundation ripples through every T2 alias in every subscriber — that is the entire point of the chain.

### Known limitation: amber-mono status colours

Foundation's CGA `green/red/cyan` primitives are **amber-monochromed** — they resolve to browns (`cga/brightGreen ≈ rgb(203,149,41)`). Because Web DS `color/semantic/status/*` aliases those primitives, **the amber-mono limitation propagates Foundation → Web DS → any app that adopts the chain.** Apps that need *honest* status colour (e.g. a glucose monitor's in-range green) cannot get it by aliasing today.

- **DMNC-1001 (this work):** *additively* introduces literal-CGA status primitives in Foundation (`#00AA00`/`#AA0000`/`#00AAAA`) so apps can alias honest colours, without disturbing the amber-mono DOS default.
- **DMNC-922 (future):** the *full* rationalization — collapse the 16-colour CGA set to ~10 honest primitives, rename `cga/*` → `color/amber/*`, and re-alias every platform DS. Heavier; deliberately out of scope here.

## Aliasing mechanism

Cross-file aliasing is done via the figma-console MCP bridge (see `feedback_figma_mcp_preference` / `reference_figma_console_bridge_wsl` in maintainer memory), not REST (REST `/variables` is Enterprise-only):

```js
const imported = await figma.variables.importVariableByKeyAsync(foundationKey);
localVar.setValueForMode(modeId, { type: 'VARIABLE_ALIAS', id: imported.id });
```

- **Resolution map:** `figma-snapshots/foundation-keys.json` maps every Foundation variable *key* → its name. It is generated by resolving the unique Foundation keys referenced by alias targets in `ios.json` + `macos.json` + `web-ds.json`. After adding/renaming Foundation variables, **re-snapshot** so apps/platforms can alias the new keys.
- **Batching:** ≤86 alias updates per `figma_execute` call is known-safe (one macOS run landed 86 in a single call; the iOS migration ran 316 in batched form). Batch above 86 until empirically tested higher.
- **Effect Style colours can't bind variables** (2026 Plugin API) — phosphor-glow Effect Styles are literal RGBA; an amber rebrand still needs a manual republish. Effect *numerics* DO bind (`setBoundVariableForEffect`).
- **Opacity quirk:** `setBoundVariable('opacity', floatVar)` divides the resolved value by 100 — store Figma opacity vars as percent (0–100). The JSON sources keep decimal; Style Dictionary reads JSON, not Figma.

## Sync pipeline

- **Forward (npm → Figma):** `scripts/sync-to-figma.ts` writes Markdown specs to `figma-specs/` (repo root). Variable/component-set *creation* in Figma is figma-console MCP work (`figma_batch_create_variables`), not REST.
- **Reverse (Figma → Swift):** `scripts/sync-figma-to-swift.ts` reads `figma-snapshots/{ios,macos}.json` + `foundation-keys.json` and emits `platforms/swiftui/Sources/EiDotterTokens/Apple{IOS,MacOS}.swift`, resolving cross-file Foundation aliases via the key map. Run `npm run sync-figma-to-swift` after re-snapshotting. CI (`build.yml`) fails if committed Swift drifts from the snapshot.

## Live-verify rule (don't trust stale keys)

Figma file keys in the repo can mislead — multiple files are named "Foundation", keys rotate, and the abandoned `qlEyN6` masquerades as the real thing. **Before touching any file, verify it live on the bridge:**

1. `figma_list_open_files` → confirm the target file is connected.
2. `figma_navigate` to switch the active target (the bridge reads one active Desktop tab at a time; it cannot *open* files in local mode — the user opens them and starts the bridge plugin).
3. `figma_get_variables` (summary) → confirm collections/var counts match expectation **before** any write.

iOS DS, macOS DS, and V.37 are documented from snapshots/memory — give each a live pass before modifying it.

## App-adoption recipe (reusable)

How an app file adopts the DS. Goal: **no visual change** — every alias must resolve to the same hex the local literal had. Proven on DOSBTS_fig (DMNC-1002).

0. **Confirm the app is in the eidotter DOS design language.** Adoption is *not* for every portfolio Figma file. If the app has its own bespoke palette and aesthetic, it is **not a DS consumer** — skip it. Example: `calendar-365`'s "Sunburst Tokens" are a *light* print-calendar palette (black/gray text, near-white pastel month wedges, gold spoke) with **zero** value-matches to Foundation — forcing adoption would be wrong. Only DOS-amber apps (DOSBTS, DOOMBTS, EatThisDie, …) adopt.
1. **Enable libraries** in the app file: Assets → Libraries → enable **eiDotter Foundation** (+ the relevant platform DS, e.g. iOS DS for an iOS app). *Manual Figma UI step — the bridge cannot toggle subscriptions.*
2. **Inventory + value-match** the app's local collection (`figma_get_variables` with `resolveAliases`); for each var, find the Foundation var with the **same resolved hex** (keys live in `figma-snapshots/foundation-keys.json`).
3. **Re-point matches to aliases**, batched ≤86/call. What can alias **today**:
   - `amber` → `color/cga/amber`; **status → the literal-CGA set** (`success`→`cga-true/green`, `error`→`cga-true/red`, `info`→`cga-true/cyan`) — *not* the amber-mono primitives.
   - **Colours only, for now.** Foundation's Figma file currently exposes only **colours, effect numerics, and fontFamily** as variables — it has **no spacing/radius/type-size variables** — so dimensional/type tokens stay local until Foundation's T3 dimensions are pushed to Figma (follow-up under DMNC-916).
   - keep genuinely app-specific surfaces (e.g. DOSBTS `bg`/`card`/`muted`) **local** — don't force-alias mismatches.

   > **Accessibility caveat (cga-true/red):** `#AA0000` on the near-black CRT background is ~2.3:1 — below WCAG AA body text (4.5:1). Alias `status/error → cga-true/red` for **fills** (light foreground text over the red), not for error **text** on a dark background. `cga-true/green` (#00AA00) and `cga-true/cyan` (#00AAAA) pass AA body on dark.

   The mechanism (figma-console / `figma_execute`):
   ```js
   const local = await figma.variables.getVariableByIdAsync(localId);
   const imported = await figma.variables.importVariableByKeyAsync(foundationKey); // key from foundation-keys.json
   local.setValueForMode(modeId, { type: 'VARIABLE_ALIAS', id: imported.id });
   ```
4. **Verify no drift:** components/screens bind to the local collection *by name*, so re-pointing values ripples invisibly. Screenshot-diff every screen against pre-refactor captures. (Cross-file aliases resolve to `null`+`aliasTo` in the bridge's resolver — the screenshot, not the resolved value, is the proof.)
5. **Spot-check the ripple:** tweak a Foundation amber value and confirm it propagates into the app file, then revert.

**Worked example — DOSBTS_fig (DMNC-1002):** of 37 local vars, **5 aliased** — `amber` + `text-primary` → `cga/amber`; `success`/`error`/`info` → `cga-true/green·red·cyan` (the glucose colours, now Foundation-sourced). The rest stayed local: `bg`/`card`/`amber-dark`/`amber-light`/`muted`/`border`/`text-secondary`/`text-muted`/`white` (no Foundation value-match), plus all spacing/radius/type + `font-family` (no Foundation dimension/type vars yet). The Overview screen rendered identically.

## Android (deferred)

Not built. Recipe for when un-deferred:

1. Import the **Material 3** Figma community kit as `Android DS`.
2. Rebind its colour/type/shape variables to **alias Foundation** (amber DOS) — same mechanism as Web/iOS/macOS.
3. Add `Android DS` to the platform-sub-library set; snapshot it (`figma-snapshots/android.json`) and extend the Swift/sync tooling if a Kotlin/Compose token target is added.
4. Keep Material-specific shape/elevation tokens local where they have no Foundation equivalent (mirrors macOS Liquid Glass literals).

## References

- Linear: DMNC-916 (4-tier taxonomy, parent) · DMNC-1001 (this formalization) · DMNC-922 (full colour rationalization) · DMNC-976 (DOSBTS pipeline) · DMNC-596 / DMNC-802 (Apple forks).
- `CLAUDE.md` → "Figma Design System" for the condensed in-repo version.
- `figma-snapshots/{foundation-keys,web-ds,ios,macos}.json`, `scripts/sync-figma-to-swift.ts`, `scripts/sync-to-figma.ts`.
- `solutions/developer-experience/figma-variable-binding-quirks-2026-05-08.md` (opacity/dot-name quirks).
