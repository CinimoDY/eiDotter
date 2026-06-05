# DOSBTS Figma design system — runbook (figcli pipeline)

The seam between **Track A** (this repo, committed) and **Track B** (local Figma
execution). Tracks the work in **DMNC-976**. Plan: review-hardened, 7-persona pass.

- **Track A — committed here, reproducible without Figma:** `scripts/figcli/export-design-md.ts`
  → `figcli/DOSBTS.design.md` (tokens), `figcli/components/*.jsx` (DOS-custom specs), this runbook, tests.
- **Track B — run locally from this runbook:** import tokens → variables, retheme the
  Apple iOS 26 kit, render the DOS-custom components, assemble the four screens, verify.

Target Figma file: **`DOSBTS_fig`** (key `1Hemp6DehvK1a5uMrPJyhr`).

---

## Execution environment (read first)

- **Figma cannot be written remotely.** Every Figma-touching step runs on the local
  machine with Figma Desktop open. (`figma_get_status` fails in cloud/headless — no bridge.)
- **This is Windows (WSL2), not macOS.** Figma Desktop runs on the **Windows host**.
  figcli is macOS-tested and its WSL↔Windows connect path is unverified, so **lead Track B
  with the proven figma-console MCP desktop bridge (port 9223+)**; evaluate figcli
  opportunistically (run it from Windows-native Node against `localhost`, or from WSL
  reaching the Windows host IP). Record whichever connects in this file.

## Security hardening (non-negotiable)

- **figcli Yolo mode is PROHIBITED** — it patches the Figma Desktop binary, re-enabling an
  unauthenticated CDP endpoint on `localhost:9222`. Use **Safe mode** (dev plugin) or the
  figma-console MCP only.
- Before installing figcli: pin a **specific commit SHA** (not branch tip), run `npm audit`,
  and review `src/figma-patch.js`, `src/credentials.js`, `src/daemon.js`.
- Keep **only `DOSBTS_fig` open** during sessions — the Safe-mode plugin can write to any
  open file (close Foundation `KoGTFX8INOAjFaOKPXnSlX` and eiDotter iOS DS `TEnlcIgXrB3akHvtjMy3po`).
- Verify the Apple iOS 26 Community file (`1527721578857867021`) is published by the
  **verified Apple account**; cross-check its license at developer.apple.com/design/resources/.

---

## Track A (committed — regenerate tokens here)

```bash
npm run export-figcli-design-md     # rebuilds figcli/DOSBTS.design.md from token sources
npx jest --testPathPatterns=export-design-md
```

Token values: DOSBTS AmberTheme (`#0A0A0A` bg, `#1B1917` card, `#594F47` muted, SF Mono).
Glucose-status colors are **literal CGA** (`success #00AA00` / `error #AA0000` /
`info #00AAAA`) from the override map — eidotter's own CGA primitives are amber-monochromed.

---

## Track B (local — Figma Desktop open on `DOSBTS_fig`)

### U1 · Connect
- Lead with figma-console MCP bridge; confirm `figma_get_status` is connected to `DOSBTS_fig`.
- (Optional) install figcli at a pinned SHA, Safe mode; pin its `tokens import-design-md`
  JSON schema from `src/` — it must match `figcli/DOSBTS.design.md`'s `json design-tokens` block.
- Record the working connect path here: _______________________________________________

### U2 · Inventory + pages
- MCP `figma_get_file_data` / `figma_get_variables` on `DOSBTS_fig` and the eiDotter iOS DS.
- Create 3 pages: **Tokens**, **Components**, **Screens**. On Components, two sections:
  "iOS Chrome (rethemed Apple)" and "DOS-Custom".

### U3 · Apple iOS 26 kit retheme spike — **hard go/no-go gate**
- Duplicate the Community kit into a scratch page; check whether Tab Bar / Button / List
  row fills bind to color **variables**.
- **If variable-bound** → proceed to U6 (full chrome).
- **If NOT** → STOP and re-scope: build only the minimum chrome the 4 screens need
  (tab bar, nav bar, list row, button), or defer the retheme. Do not absorb a full
  native-chrome rebuild silently. Record decision: _______________________________________

### U5 · Import tokens → amber variable collection
```bash
# figcli (color/radius/typography only):
node /path/to/figma-cli/src/index.js tokens import-design-md figcli/DOSBTS.design.md
```
- **Spacing is NOT created by figcli's import** → add spacing variables via MCP
  `figma_batch_create_variables` from the same block. figcli import is single-mode; build
  any light/dark/amber modes via MCP too.
- Verify `var:amber`, `var:bg`, `var:card`, `var:muted`, `var:success/error/info`,
  **spacing**, radius, type all resolve in a probe render.

### U6 · Retheme Apple chrome to amber
- Apply the U3 strategy (amber mode, or remap fills to the amber `var:` collection) via
  figma-console MCP / native Figma. Keep SF Mono, sharp corners. Scope per the U3 gate.

### U7 · Render DOS-custom components
- See `figcli/components/README.md`. Render each spec → `node to-component` →
  `combos`/`sizes` → combine into variant sets. **Glow floor:** Hero + primary Button
  carry the 3-layer phosphor glow. Confirm glucose thresholds from DOSBTS before final render.

### U8 · Assemble the four screens
- Canonical artboard: one iPhone size (e.g. iPhone 16 Pro 393×852) with safe areas;
  decide whether the 60pt Hero scales with Dynamic Type.
- **Reference: README screenshots + `design-system.md` + the live app. NOT `ui-mockups.md`**
  (it describes EatThisDie food-logging, not the DOSBTS CGM app).
- Layouts (from DOSBTS `CLAUDE.md`):
  - **Overview:** event-lane → hero (+IOB) → treatment banner → chart + report selector
    (GLUCOSE / TIME IN RANGE / STATISTICS) → action buttons → connection → sensor.
  - **Daily Digest:** date-nav → 2×3 color-coded stats grid → AI-insight card (cyan border)
    → chronological event timeline.
  - **Meal Entry:** QUICK favourites + recents + type-ahead; Manual/Scan/Photo/Ask-AI paths;
    states empty/typing/AI-result(editable)/low-confidence-follow-up/confirmed.
  - **Settings:** grouped iOS list (glucose · alarms day/night · insulin · data), rethemed amber.
- Verify: `figma_capture_screenshot` side-by-side vs the four TestFlight screenshots.

---

## Reproducibility & ownership

- A fresh local run of this runbook reproduces `DOSBTS_fig` from the committed Track-A inputs.
- **Component-source home:** specs stay in `eidotter` for now. Extract to a shared submodule
  only when a second consumer (DOOMBTS / EatThisDie) needs the same specs.
