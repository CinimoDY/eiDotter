---
title: "Full-page site screenshots as a Figma comment board"
date: 2026-10-27
category: developer-experience
module: eidotter
problem_type: developer_experience
component: tooling
severity: medium
applies_when:
  - "A planning session needs every page of the portfolio sites inside a Figma file at 1:1 so Dom can comment on them"
  - "Full-page PNGs taller than 4096px must go into Figma without being downscaled"
  - "Many images must be placed into a Figma file through the Figma MCP from this WSL host"
symptoms:
  - "ESM `import 'playwright'` fails on this host although Chromium and playwright-core are present"
  - "A 20000px-tall page uploaded as one image fill is unreadable in Figma"
  - "`export -f` for an xargs upload loop fails under zsh"
root_cause: missing_tooling
resolution_type: tooling_addition
related_components:
  - development_workflow
tags:
  - figma
  - figma-mcp
  - screenshots
  - playwright
  - planning
  - upload-assets
  - DMNC-1623
---

# Full-page site screenshots as a Figma comment board

Linear: DMNC-1623 (DOS-like tree navigation mapping). Built 2026-10-27 for the planning session that needed every page of rizomorf.com, dmnc.tech, eidotter.com and dmnc.online at 1440 and 390 as 1:1 images in a Figma file. 22 pages × 2 viewports = 44 PNGs, sliced into 73 strips, all uploaded in one pass. Scripts are in `plans/1623-screens-2026-10-27/` (the `plans/` folder is gitignored, so they stay local).

The board holds public-page content only. No private surface was captured, so the publishing boundary is unaffected.

## Context

Three things were not obvious and each cost a retry: how to drive Playwright on this host without a `playwright` package in any repo, what Figma does with tall image fills, and how to get 73 files through the MCP upload endpoint without hand-placing them.

## Guidance

### 1. Playwright on this WSL host

No repo here has `playwright` installed, but the npx cache holds `playwright-core` 1.59.1 under `~/.npm/_npx/e41f203b7505f1fb/node_modules/`, and `~/.cache/ms-playwright` holds Chromium revisions 1223 and 1228. ESM `import 'playwright'` with `NODE_PATH` does not resolve from there. What works is `createRequire` anchored at that cache directory's `package.json`, plus an explicit executable:

```js
import { createRequire } from 'node:module';
const { chromium } = createRequire('/home/dmnc/.npm/_npx/e41f203b7505f1fb/package.json')('playwright-core');
const browser = await chromium.launch({
  executablePath: '/home/dmnc/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome',
  args: ['--single-process', '--no-zygote'],
});
```

- Single-process Chromium dies when a second `newContext` is opened after many pages. Launch one browser per viewport (one for 1440, one for 390) and close it before the next.
- `newContext({ reducedMotion: 'reduce' })` plus a 1.5 s `waitForTimeout` after `networkidle` gets past the sites' boot animations; without it the first screenshots were mid-animation.
- `shoot.mjs <pages.json> <outDir>` does the 44 screenshots in about 90 s. Filenames are `<site>--<slug>--<vp>.png`; `pages.json` is the `{site, route}` list.

### 2. Slice anything taller than 4000 px

Figma caps image fills at 4096 px per side and silently downscales larger ones, so the tallest page here (27355 px) became an unreadable smear. Slice before upload. The host has neither PIL nor ImageMagick, so the same Chromium does the slicing: load the PNG in a page (launch with `--allow-file-access-from-files`), draw each region onto a canvas, `toDataURL('image/png')`, write the base64 out.

`slice.mjs <inDir> <outDir>` copies short images as they are, cuts taller ones into `--p1`, `--p2`, ... strips of at most 4000 px, and writes `manifest.json` with per-strip heights. In Figma the strips go into a vertical auto-layout frame with `itemSpacing: 0`, so they read as one page.

### 3. Placement through the Figma MCP

Build the skeleton first, upload images last.

1. **Skeleton with `use_figma`.** One placeholder rectangle per strip, sized exactly to the strip's pixels, named by file, nested site row → page group → breakpoint column, everything at 1:1. Return a file → nodeId map (`rects.json` in the session).
2. **`upload_assets` with `count` and `nodeIds`.** At most 60 per call, so 73 strips took two calls. Each returned URL is single-use and expires after 10 minutes; the response URL already carries `scaleMode=FILL` and the current page id.
3. **POST each file with curl**, six in parallel. `export -f` fails under zsh, so the curl step is a bash script file (`up.sh <file> <url>`), driven from a `jobs.tsv` of `file<TAB>url` lines:

```bash
xargs -P 6 -n 2 ./up.sh < jobs.tsv > upload.log
# up.sh: curl -s -o "resp/$f.json" -w "%{http_code}" -X POST -F "file=@strips/$f;type=image/png" "$u" --max-time 180
```

4. **Verify** by reading back every rectangle with `use_figma` and checking `fills[0].type === 'IMAGE'`. 73 of 73 came back 200 and filled.

### Confirm the target page before building

Dom first chose the Web DS file (`iohPpta7n73wCcP5xbsaJU`, page Explorations 159:209) and then moved the board to the Pattern Lab (`V4tIz3sAMRx7H9wMYeesA6`, page EXPLOARATIONS 15284:3439). The skeleton is cheap to rebuild; the uploads are not, because every URL is bound to a node id. Build the skeleton only after the page is confirmed, and upload last.

## Why This Matters

Without the `createRequire` trick the obvious fix is `npm install playwright` into a repo, which adds a 1.6 GB browser download to a package that does not need it. Without slicing, the board looks complete but cannot be read, and the defect only shows when zooming in. Without the batched upload the 73 placements are an afternoon of drag-and-drop.

## When to Apply

- Any review or planning board that needs live site pages in Figma at 1:1.
- Any Playwright-driven script on this host until a repo legitimately depends on `playwright`.
- Any `upload_assets` run with more than a handful of files.

## Related

- `figma-pattern-fills-and-bridge-snapshot-2026-10-22.md` and `figma-variable-binding-quirks-2026-05-08.md` for other Figma Plugin API quirks.
- `storybook-layout-and-stability-guards-2026-10-25.md` for the canvas-based PNG diff that uses the same browser-as-image-tool idea.
