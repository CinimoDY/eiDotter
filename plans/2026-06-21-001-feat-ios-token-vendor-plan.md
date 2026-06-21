# DMNC-801 Plan: iOS Token Vendor Artifact

**Date:** 2026-06-21
**Linear:** [DMNC-801](https://linear.app/lizomorf/issue/DMNC-801)
**Type:** feat
**Status:** ready-for-review

---

## Context

DOSBTS and DOOMBTS both maintain hand-copied Swift files that mirror eiDotter CGA token values:

- `Library/DesignSystem/AmberTheme.swift` — colors
- `DOSTypography.swift` — font sizes
- `DOSSpacing.swift` — spacing

Every eiDotter version bump requires parallel hand-edits in both iOS forks with no drift detection.

The existing `platforms/swiftui/Sources/EiDotterTokens/EiDotterTokens.swift` (generated from `src/tokens/base.tokens.json` via `npm run build-tokens`) is already the canonical single source of truth. It contains 70+ color tokens, all spacing tokens, and all typography tokens. CI already enforces its freshness (`Check token freshness` step in `build.yml`).

**This issue's scope is eiDotter-side only.** The downstream DOSBTS/DOOMBTS integration work is tracked separately.

---

## Scope

### What this plan covers (eiDotter only)

1. A new generation script that emits a vendor-ready Swift wrapper with DOSBTS-native names.
2. The generated output committed to the repo.
3. CI freshness check for the vendor artifact.
4. A fetch helper and README for DOSBTS/DOOMBTS to consume the artifact.

### What this plan does NOT cover

- DOSBTS migration (replace `AmberTheme.swift`) — downstream
- DOOMBTS migration — downstream
- DOSBTS CI gate (re-run fetch and diff at the pinned tag) — downstream

---

## Token Drift Audit (2026-04-23)

Known semantic mismatch between DOSBTS and eiDotter:

| DOSBTS name | DOSBTS value | eiDotter mapping | Resolution |
|---|---|---|---|
| `amber` | `#FFB000` | `colorCgaAmber` | ✓ exact match |
| `amberLight` | `#FDCA9F` | `colorCgaAmberBright` | ✓ exact match |
| `amberDark` | `#9A5700` | `colorCgaAmberDim` | ✓ exact match |
| `cgaGreen` | `#55FF55` (bright CGA green) | `colorCgaGreen` is amber-remapped | **DRIFT** — use `colorCgaTrueGreen` |
| `cgaRed` | `#FF5555` (bright CGA red) | `colorCgaBrightRed` is amber-remapped | **DRIFT** — use `colorCgaTrueRedBright` |
| `cgaCyan` | `#55FFFF` (bright CGA cyan) | `colorCgaCyan` is amber-remapped | **DRIFT** — use `colorCgaTrueCyan` |

The `colorCgaTrue*` tokens were added in DMNC-922 precisely for this use case — theme-invariant functional colors (success/error/info) that bypass the amber monochrome palette.

---

## Design Decisions

### Naming strategy: thin wrapper (Option A)

The vendor file uses DOSBTS-native names that forward to `EiDotterColors.*` constants. This means zero DOSBTS call-site changes — just swap the file.

```swift
// platforms/swiftui/ios-vendor/AmberThemeTokens.swift
public enum AmberTheme {
    public static let amber         = EiDotterColors.colorCgaAmber
    public static let amberLight    = EiDotterColors.colorCgaAmberBright
    public static let amberDark     = EiDotterColors.colorCgaAmberDim
    public static let cgaGreen      = EiDotterColors.colorCgaTrueGreen      // was amber-mapped; now honest CGA
    public static let cgaRed        = EiDotterColors.colorCgaTrueRedBright  // was amber-mapped; now honest CGA
    public static let cgaCyan       = EiDotterColors.colorCgaTrueCyan       // was amber-mapped; now honest CGA
    // ... typography and spacing forwarded too
}
```

The `EiDotterColors` and `EiDotterSpacing` / `EiDotterTypography` enums are defined in `EiDotterTokens.swift`, which DOSBTS also vendors (both files travel together).

### No SPM constraint

DOSBTS uses CocoaPods or manual file inclusion — it cannot pull eiDotter as a Swift Package. The vendor directory is raw `.swift` files only. The consumer copies them into the Xcode project manually or via a fetch script pinned to an eiDotter git tag.

### Scope: colors + typography + spacing

All three DOSBTS hand-maintained files are covered by the single vendor artifact, which wraps `EiDotterColors`, `EiDotterSpacing`, and `EiDotterTypography` under their existing DOSBTS names. The vendor output is two files:
1. `EiDotterTokens.swift` — already exists, just vendored as-is
2. `AmberThemeTokens.swift` — new thin-wrapper file this plan adds

---

## Files To Create / Modify

| File | Action | Notes |
|------|--------|-------|
| `scripts/generate-ios-vendor.mjs` | **Create** | Node ESM script; reads `EiDotterTokens.swift` (already generated) and emits the `AmberThemeTokens.swift` wrapper |
| `platforms/swiftui/ios-vendor/AmberThemeTokens.swift` | **Create (generated)** | Vendor-ready thin wrapper; AUTO-GENERATED header |
| `platforms/swiftui/ios-vendor/README.md` | **Create** | Consumer instructions: which files to copy, how to pin to a tag, the three-step update flow |
| `platforms/swiftui/ios-vendor/fetch-tokens.sh` | **Create** | One-liner `gh release download` / `curl` helper for DOSBTS |
| `package.json` | **Edit** | Add `"generate-ios-vendor"` script |
| `.github/workflows/build.yml` | **Edit** | Extend `Check token freshness` step to include `platforms/swiftui/ios-vendor/` |

No changes to `src/tokens/`, `platforms/swiftui/Sources/`, or any existing generated file.

---

## Implementation Steps

### Step 1 — Generation script

Create `scripts/generate-ios-vendor.mjs`:

```js
// Reads platforms/swiftui/Sources/EiDotterTokens/EiDotterTokens.swift
// (already committed and CI-fresh) and emits the AmberThemeTokens.swift wrapper.
// This approach avoids re-parsing the token JSON — the Swift file is the
// authoritative generated artifact; we just add a name-mapping layer on top.
```

The script does not re-run Style Dictionary. It reads the already-built `EiDotterTokens.swift` (guaranteed fresh by CI) and writes a second file that just re-exports the right constants under DOSBTS names.

Alternatively: emit `AmberThemeTokens.swift` directly from `style-dictionary.config.mjs` as a second `swift/vendor-wrapper` format — keeps the generation in one place but couples the wrapper knowledge into the SD config. Prefer the separate script to keep responsibilities clear.

### Step 2 — Wire into package.json

```json
"generate-ios-vendor": "node scripts/generate-ios-vendor.mjs"
```

Also append to `build-tokens`:
```json
"build-tokens": "node style-dictionary.config.mjs && node scripts/generate-shadcn-shim.mjs && node scripts/generate-ios-vendor.mjs"
```

This means every `npm run build-tokens` automatically regenerates the vendor file alongside CSS tokens.

### Step 3 — CI freshness check

In `build.yml`, extend the `Check token freshness` step:

```yaml
- name: Check token freshness
  run: |
    npm run build-tokens
    git diff --exit-code -- \
      src/styles/tokens.css \
      src/styles/tokens.js \
      src/styles/tokens.json \
      src/styles/theme.*.css \
      src/styles/shadcn.css \
      tailwind.preset.cjs \
      platforms/swiftui/Sources/EiDotterTokens/ \
      platforms/swiftui/ios-vendor/AmberThemeTokens.swift
```

### Step 4 — Consumer README

`platforms/swiftui/ios-vendor/README.md` covers:

1. **Which files to copy into Xcode:** `EiDotterTokens.swift` + `AmberThemeTokens.swift` — both must be present since the wrapper depends on the enum.
2. **How to update:** `./fetch-tokens.sh v0.36.0` (passing the desired eiDotter tag).
3. **Semantic color notes:** The three `colorCgaTrue*` mappings and why `cgaGreen` changed (amber-mono vs honest CGA functional colors).
4. **Drift prevention:** How the DOSBTS CI gate should work (fetch at pinned tag, diff, fail on change).

### Step 5 — Fetch helper

`platforms/swiftui/ios-vendor/fetch-tokens.sh`:

```bash
#!/usr/bin/env bash
# Usage: ./fetch-tokens.sh v0.36.0
# Fetches both vendor Swift files from the specified eidotter tag.
TAG=${1:?Usage: $0 <tag>}
BASE="https://raw.githubusercontent.com/CinimoDY/eiDotter/${TAG}/platforms/swiftui"
curl -fsSL "${BASE}/Sources/EiDotterTokens/EiDotterTokens.swift" -o EiDotterTokens.swift
curl -fsSL "${BASE}/ios-vendor/AmberThemeTokens.swift" -o AmberThemeTokens.swift
echo "Fetched eidotter ${TAG}"
```

---

## Acceptance Criteria

- [ ] `npm run build-tokens` emits `platforms/swiftui/ios-vendor/AmberThemeTokens.swift` with a correct `AmberTheme` enum that compiles alongside `EiDotterTokens.swift`
- [ ] The wrapper maps `cgaGreen` / `cgaRed` / `cgaCyan` to `colorCgaTrueGreen` / `colorCgaTrueRedBright` / `colorCgaTrueCyan` respectively (honest CGA, not amber-remapped)
- [ ] CI fails if `AmberThemeTokens.swift` is committed stale (i.e., token JSON changed but vendor file was not regenerated)
- [ ] `platforms/swiftui/ios-vendor/README.md` documents the consumer workflow clearly enough that a DOSBTS dev can update the vendored copy unassisted
- [ ] `platforms/swiftui/ios-vendor/fetch-tokens.sh` runs on macOS without additional dependencies (`curl` only)
- [ ] No changes to existing generated files, no breaking changes to the SPM package

---

## Open Questions (for operator review)

1. **Wrapper name:** `AmberTheme` (matches DOSBTS today) vs `EiDotterAmberTheme` (avoids name collision if DOSBTS keeps its own `AmberTheme` during migration)? Leaning toward `AmberTheme` for zero-call-site-change migration.

2. **Typography + spacing in wrapper:** Should `AmberThemeTokens.swift` also expose DOSBTS-native typography/spacing aliases (`DOSTypography.fontSizeBase`, etc.), or is it sufficient to vendor `EiDotterTypography` / `EiDotterSpacing` directly and update DOSBTS call sites there?

3. **`fetch-tokens.sh` mechanism:** `curl` against raw GitHub URLs requires the file to be on a published tag/branch. Alternatively, `gh release download`. Given repo is public, `curl` is dependency-free and simpler — any objection?

---

## Out of Scope

- Light-theme / multi-mode token export (DMNC-922 covers semantic token rationalization)
- SwiftUI component generation (the `DOSButton.swift` POC in `EiDotterUI` is unrelated)
- SPM publish of the vendor files
