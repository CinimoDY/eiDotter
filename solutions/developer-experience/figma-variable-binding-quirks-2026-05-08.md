---
date: 2026-05-08
linear: DMNC-919
tags: [figma, design-system, variables, plugin-api]
problem_type: tooling-quirk
module: figma-web-ds
---

# Figma Plugin API variable-binding quirks (May 2026)

While building Web DS tier-1/2/3 component sets and running the binding sweep across 34 components (DMNC-916 → DMNC-920), three Figma Plugin API quirks surfaced that future Figma-side work needs to know about. Each cost real time to diagnose; documenting so we don't re-discover them.

## 1. Bound opacity values are divided by 100

`figma.variables.setBoundVariable(node, 'opacity', floatVar)` treats the variable's resolved value as a **percentage**, not a 0–1 decimal. A variable storing `0.5` renders the bound node at opacity `0.005`, not `0.5`.

**Verified empirically:**

```ts
testVar.setValueForMode(modeId, 50);   // → rendered opacity 0.5    ✅
testVar.setValueForMode(modeId, 0.5);  // → rendered opacity 0.005  ❌
testVar.setValueForMode(modeId, 100);  // → rendered opacity 1.0    ✅
```

**Resolution adopted (DMNC-919):**

- Store opacity tokens in Figma variables as percent (0–100). The `2. Web Semantics` collection had to migrate `opacity/{0,10,25,50,75,80,100}` from decimal to percent storage.
- `src/tokens/*.tokens.json` keeps decimal (0–1) for CSS — that's a separate source. Style Dictionary reads from JSON, doesn't see Figma values.
- When binding existing component literals to opacity vars, multiply by 100 to find the matching token: literal `0.5` → bind to `opacity/50` (variable value `50`).

This applies only to the `opacity` field. Other numeric fields (padding, cornerRadius, strokeWeight, fontSize, effect offsets/radii) are NOT divided — they pass through cleanly.

## 2. Variable names reject the `.` character

`figma.variables.createVariable('spacing/0.5', collection, 'FLOAT')` errors with `invalid variable name`.

**Workaround:** Use pixel-value naming. We added half-step spacing tokens as `spacing/2px`, `spacing/6px`, `spacing/10px` instead of `spacing/0.5`, `spacing/1.5`, `spacing/2.5`.

The slash IS allowed (it becomes the path/folder separator in the Figma UI). Hyphens and underscores work too. Just dots fail.

## 3. Effect Style colors can't bind to variables (already known)

Restated for completeness — see `feedback_figma_effect_style_no_variable.md` in auto-memory and DMNC-916. Effect numerics (offset.x, offset.y, radius, spread) DO bind via `figma.variables.setBoundVariableForEffect(effect, field, var)`, but Effect.color is RGBA-only.

This means Foundation's 29 published phosphor-glow Effect Styles are locked to amber `#FFB000` at 50% opacity until the Plugin API surfaces effect-color binding. An amber rebrand requires manual republish of every Effect Style.

## How to apply

When extending Foundation or Web DS Figma variables in future sessions:

1. **Test new property bindings with a probe rectangle first** — particularly anything that hasn't been bound before. Read back `node.opacity` (or whichever field) and compare to the expected value. If the read value is 100× off, you've hit a quirk like #1.
2. **For opacity vars:** always store percent (0–100). Use `opacity/N` naming where N is the percent.
3. **For half-step / fractional dimensions:** use pixel-value naming (`spacing/2px`) not decimal-point naming.
4. **For effect bindings:** `setBoundVariableForEffect(effect, 'offsetX'|'offsetY'|'radius'|'spread', var)` works. Color binding doesn't.
5. **For library publish cycles:** value changes propagate to subscribers but require explicit "Publish library" + "Update" in the subscriber file. See `reference_figma_unpublish_ui.md` for UI location.

## References

- DMNC-916 — 4-tier token foundation
- DMNC-919 — Half-step tokens + T4 shadow numerics (where these were discovered)
- `figma-snapshots/web-ds.json` — current Web DS state (34 components, 126 vars)
- `figma-snapshots/foundation-keys.json` — Foundation key→name map for cross-file aliasing
