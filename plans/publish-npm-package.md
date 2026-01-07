# feat: Publish eidotter npm package

## Overview

Fix npm publishing so `npm install eidotter` works. Package was unpublished on 2025-02-03.

## Acceptance Criteria

- [ ] `npm install eidotter` works
- [ ] TypeScript types resolve (`import { Button } from 'eidotter'`)
- [ ] CSS imports work (`import 'eidotter/tokens.css'`)
- [ ] Tailwind preset works (`require('eidotter/tailwind.preset')`)

## Current Issues

| Issue | Fix |
|-------|-----|
| `main` points to non-existent `dist/index.js` | Change to `dist/index.umd.js` |
| No TypeScript declarations generated | Add `tsconfig.build.json` |
| `tailwind.preset.js` is CommonJS but `"type": "module"` breaks it | Rename to `.cjs` |
| Invalid file reference `theme.dos-amber.css` | Remove from files array |

## Implementation

### Phase 1: Fix package.json

Update `/mnt/d/Coding/eidotter/package.json`:

```json
{
  "name": "eidotter",
  "version": "0.3.0",
  "type": "module",
  "main": "./dist/index.umd.js",
  "module": "./dist/index.es.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.es.js",
      "require": "./dist/index.umd.js"
    },
    "./styles": "./dist/style.css",
    "./tokens.css": "./src/styles/tokens.css",
    "./tailwind.preset": "./tailwind.preset.cjs"
  },
  "files": [
    "dist",
    "tailwind.preset.cjs",
    "src/styles/tokens.css"
  ],
  "scripts": {
    "build": "vite build && tsc -p tsconfig.build.json",
    "prepublishOnly": "npm run build"
  },
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

**Note:** Rename `tailwind.preset.js` → `tailwind.preset.cjs` since it uses `module.exports`.

### Phase 2: Create tsconfig.build.json

Create `/mnt/d/Coding/eidotter/tsconfig.build.json`:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "declaration": true,
    "emitDeclarationOnly": true,
    "outDir": "./dist"
  },
  "include": ["src"],
  "exclude": ["**/*.test.tsx", "**/*.stories.tsx", "src/stories"]
}
```

This extends the existing tsconfig (preserving all settings) and only adds declaration generation.

### Phase 3: Build, Verify, Publish

```bash
# Build
npm run build

# Verify TypeScript declarations exist
ls dist/*.d.ts

# Check what will be published
npm pack --dry-run

# Check npm login
npm whoami || npm login

# Publish (use 0.3.1 if 0.3.0 was previously published)
npm publish --access public
```

## Files to Modify

1. `/mnt/d/Coding/eidotter/package.json` - Update exports, files, scripts
2. `/mnt/d/Coding/eidotter/tailwind.preset.js` → `tailwind.preset.cjs` - Rename
3. `/mnt/d/Coding/eidotter/tsconfig.build.json` - Create new file

## Version Decision

If `npm view eidotter@0.3.0` returns data (was previously published), bump to `0.3.1` before publishing.
