---
title: Adding AI-Friendly Documentation Guidelines for Figma Make Compatibility
category: documentation
tags:
  - figma-make
  - ai-codegen
  - npm-package
  - design-system
  - developer-experience
date: 2026-01-22
status: solved
component: package-structure
severity: medium
---

# Figma Make Compatibility for eidotter

## Problem

Figma Make, an AI-powered design-to-code tool, could not properly utilize the eidotter design system when generating UI code. The tool requires structured markdown documentation in a `guidelines/` directory to understand how to use a design system correctly.

### Symptoms

- AI-generated code would not follow eidotter's DOS aesthetic patterns
- No semantic token usage in generated code
- Missing component-specific guidance for AI tools

### Root Cause

1. **No `guidelines/` directory** - Figma Make specifically looks for this directory in npm packages
2. **Guidelines not in npm package** - Even if files existed locally, they were not in the `files` array in `package.json`

## Solution

### Step 1: Create `guidelines/` directory with 4 markdown files

| File | Purpose | Size |
|------|---------|------|
| `README.md` | Overview, quick start, anti-patterns | 3.0 KB |
| `components.md` | Props tables, usage, examples for all 18 components | 17 KB |
| `tokens.md` | Color, typography, spacing token reference | 8.9 KB |
| `patterns.md` | Common composition patterns | 10 KB |

### Step 2: Update `package.json`

```json
{
  "files": [
    "dist/index.d.ts",
    "dist/index.es.js",
    "dist/index.umd.js",
    "dist/eidotter.css",
    "dist/components",
    "tailwind.preset.cjs",
    "src/styles/tokens.css",
    "guidelines"
  ]
}
```

### Step 3: Publish to npm

```bash
npm version patch
npm publish
```

## Verification

```bash
npm pack --dry-run 2>&1 | grep guidelines
```

Expected output:
```
npm notice 17.4kB guidelines/components.md
npm notice 10.4kB guidelines/patterns.md
npm notice 3.0kB guidelines/README.md
npm notice 8.9kB guidelines/tokens.md
```

## Key Documentation Content

### README.md highlights
- 18 component inventory
- Quick start code example
- CSS and Tailwind integration
- Anti-patterns (hardcoded colors, light backgrounds, large border radius)

### components.md highlights
- Props tables with types and defaults
- "When to use" guidance for each component
- Code examples showing correct patterns

### tokens.md highlights
- Semantic color system (CSS variables + Tailwind classes)
- Amber phosphor CRT palette
- 8px grid spacing system
- DOS border radius limits (2-4px max)

### patterns.md highlights
- Page layouts (Terminal wrapper)
- Form patterns (login, validation)
- Navigation (breadcrumb + tabs)
- Dialogs (confirmation, form modal)

## Prevention Strategies

### 1. Validate guidelines on CI

Add script to verify all components are documented:

```bash
npm run validate-guidelines
```

### 2. Pre-publish check

```json
{
  "scripts": {
    "prepublishOnly": "npm run validate-guidelines && npm run build"
  }
}
```

### 3. New component checklist

When adding a component:
- [ ] Add section to `guidelines/components.md`
- [ ] Update component count in `guidelines/README.md`
- [ ] Update component table in `guidelines/README.md`
- [ ] Run `npm run validate-guidelines`

## Related Files

- `/mnt/d/Coding/eidotter/CLAUDE.md` - Developer guidance
- `/mnt/d/Coding/eidotter/llms.txt` - Machine-readable overview
- `/mnt/d/Coding/eidotter/ADOPTION_STRATEGY.md` - Distribution strategy

## Outcome

Published as `eidotter@0.4.1` with guidelines included. Figma Make can now generate eidotter-compliant code using the structured documentation.
