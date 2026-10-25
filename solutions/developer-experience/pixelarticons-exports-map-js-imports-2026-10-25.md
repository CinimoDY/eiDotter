---
title: "pixelarticons 2.4.2 exports map: import react/<Name>.js"
date: 2026-10-25
category: developer-experience
module: eidotter
problem_type: build_error
component: icons
severity: high
applies_when:
  - "Importing a pixelarticons React glyph anywhere in eidotter (Icon, DisplayMenu, HeaderButton, stories)"
  - "A consumer installs eidotter and resolves pixelarticons 2.4.2+ inside eidotter's ^2.1.0 range"
symptoms:
  - "TS2307 / ERR_MODULE_NOT_FOUND for 'pixelarticons/react/Check' with pixelarticons 2.4.2"
  - "Jest: 'Could not locate module pixelarticons/react/Monitor.js mapped as .../Monitor.js.js'"
root_cause: upstream_packaging_change
resolution_type: code_fix
related_components:
  - testing
tags:
  - pixelarticons
  - exports-map
  - esm
  - jest
---

# pixelarticons 2.4.2 exports map: import react/<Name>.js

Shipped in 0.44.0 (#565). Found by the dependency session.

## What happened

pixelarticons 2.4.2 (2026-10-06) added `"exports": { "./react/*": "./react/*" }` without a `.js` suffix. With the map, `import { Check } from 'pixelarticons/react/Check'` no longer resolves (Node: `ERR_MODULE_NOT_FOUND`; bundlers that honour exports maps fail the same way). eidotter's `^2.1.0` range lets a fresh consumer install pick up 2.4.2.

Checked against 2.4.2: `pixelarticons/react/Check.js` resolves, the extensionless form fails.

## Rule

Always import the explicit file: `import { Monitor } from 'pixelarticons/react/Monitor.js';`. It resolves with and without the exports map. TypeScript finds the sibling `.d.ts`.

## Jest

`jest.config.cjs` maps pixelarticons to the file. The mapper must accept both forms, or `.js` imports become `X.js.js`:

```js
'^pixelarticons/react/(.*?)(\\.js)?$': '<rootDir>/node_modules/pixelarticons/react/$1.js',
```
