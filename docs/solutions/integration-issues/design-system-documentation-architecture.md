---
title: Design System Documentation Architecture — Single Source of Truth
date: 2026-02-08
category: integration-issues
tags:
  - figma
  - storybook
  - documentation
  - design-system
  - architecture
severity: medium
component: eidotter
status: solved
---

# Design System Documentation Architecture

## Problem

How do you document a design system across multiple surfaces (Storybook, Figma, npm, AI agents) without duplicating content or losing sync?

### Context

- eidotter is a DOS-themed React component library: 18 components, TypeScript, Storybook 8
- Consumer projects: Pomodoke Calendar, Rizomorf, EatThisDie
- Documentation needed for: developers (component API, tokens, animations), designers (Figma library), AI agents (machine-readable)
- Previously had fragmented docs: some in Storybook, some in markdown, Figma file empty

### Symptoms

- Token values documented in markdown did not match actual `tokens.css` output
- Figma file had no variables or component frames despite a sync script existing
- No single place a new developer could go to understand the full system
- AI agents (Figma Make, Claude) generated non-compliant code due to incomplete references

### Root Cause

Multiple documentation surfaces were being maintained independently with no clear authority hierarchy. When docs existed in Storybook AND markdown AND Figma, nobody knew which was canonical, and all three drifted.

---

## Investigation

### Step 1: Evaluate Figma MCP Server (`mcp.figma.com/mcp`)

Setup: `claude mcp add --transport http figma https://mcp.figma.com/mcp` then OAuth.

Result: **Read-only**. Can read file structure, variables, and component metadata. Cannot create pages, components, or set variables. Useful for inspecting Figma state from an agent, but not for syncing code to Figma.

### Step 2: Evaluate Figma REST API

The REST API has a `POST /v1/files/:key/variables` endpoint that can write Variables (design tokens). However, it cannot create component frames, pages, or any visual nodes. Token sync is possible; component sync is not.

### Step 3: Evaluate Figma Plugin API

Full write access: create pages, create component frames, set variables, modify any node property. The critical limitation is that Plugin API code runs inside the Figma desktop app, not from CLI or CI. A custom plugin must be built, installed, and triggered manually from within Figma.

### Step 4: Check existing `sync-to-figma.ts` script

The project already had a sync script at `scripts/sync-to-figma.ts`. Inspection confirmed it had already discovered the REST API limitation (around line 273-274) and could only push token variables, not component frames.

### Step 5: Check third-party Figma MCP servers

Tested `figma-mcp.southleft.com` -- server is dead (connection refused, HTTP 000 response). No viable third-party alternative found.

---

## Solution: Single Source of Truth Architecture

The core decision: **code is the source of truth**. Everything else is a derived view.

```
Code (tokens/*.json + components/*.tsx) = Source of Truth
  |
  |---> Storybook (interactive docs, MDX pages, live demos)
  |       \---> docs.eidotter.com (GitHub Pages CNAME)
  |
  |---> Custom Figma Plugin (reads tokens + component metadata)
  |       \---> eiDOTTER-3 Figma file (auto-generated variables, component frames)
  |
  |---> llms.txt (machine-readable, already exists)
  |
  \---> eidotter.com (landing page with link to docs subdomain)
```

### Key Decisions

#### 1. Code IS the source of truth

Token JSON files (`src/tokens/colors.json`, `base.tokens.json`, `semantic.tokens.json`) and component TypeScript files are the canonical definitions. All other documentation surfaces derive from these.

#### 2. Storybook owns developer documentation

MDX pages in Storybook cover: Getting Started, Token Reference, Animation System, Component Gallery. Storybook is the right tool because it provides live, interactive component demos that static markdown cannot.

#### 3. Custom Figma Plugin required for component sync

The REST API can push token variables but cannot create component frames. A custom Figma Plugin (using the Plugin API) is the only path to full code-to-Figma component sync. This plugin would:

- Read exported component metadata (props, variants, descriptions)
- Create or update Figma component frames matching the code definitions
- Sync token variables via the REST API portion

The trade-off: the plugin runs inside Figma desktop, so sync is not fully automated via CI. It is triggered manually from the plugin panel.

#### 4. Animation and motion docs live in Storybook

Motion needs interactive demos (power-on sequences, scanline effects, bloom animations). These cannot be represented in Figma or static markdown. Storybook MDX pages with live `<Canvas>` blocks are the correct medium.

#### 5. docs.eidotter.com = deployed Storybook

With 18 components, a separate documentation framework (Docusaurus, Nextra, etc.) adds maintenance burden without proportional benefit. Storybook's built-in MDX support handles both component API docs and prose content. GitHub Pages deployment with a CNAME gives us `docs.eidotter.com`.

---

## Figma API Capability Matrix

This reference table captures what each Figma integration surface can and cannot do. It is worth preserving because the capabilities are not obvious from the documentation and required hands-on testing to confirm.

| Capability | MCP Server | REST API | Plugin API |
|---|---|---|---|
| Read file structure | Yes | Yes | Yes |
| Read variables/tokens | Yes | Yes | Yes |
| Create pages | No | No | **Yes** |
| Create components | No | No | **Yes** |
| Set variables/tokens | No | **Yes** | **Yes** |
| Modify existing nodes | No | No | **Yes** |
| Run from CLI/agent | Yes | Yes | No (in-app only) |

### Practical implications

- **Agent workflows** (Claude Code, CI pipelines) can read Figma and push token variables, but cannot create or modify visual component representations.
- **Full Figma sync** requires a human to open Figma and run the plugin. This is an acceptable trade-off for a team of this size.
- **Token-only sync** (variables/collections) can be fully automated via REST API in CI.

---

## Implementation Tracking

### Linear Issues Created

| Issue | Title | Priority |
|---|---|---|
| DMNC-379 | Design-Craft Component Polish -- Tier 1 CSS Animations | High |
| DMNC-380 | Storybook Documentation Site -- MDX Pages & docs.eidotter.com | High |
| DMNC-381 | Custom Figma Plugin -- Code-to-Figma Component Sync | Medium |

### Authority Hierarchy

When documentation conflicts arise, resolve by this priority order:

1. **Code** (`tokens/*.json`, `components/*.tsx`) -- always wins
2. **Storybook** (MDX pages, stories) -- derived from code, interactive
3. **Figma** (variables, component frames) -- derived from code via plugin
4. **llms.txt / guidelines/** -- derived summaries for AI consumption
5. **Prose markdown** (`docs/*.md`) -- supplementary, not authoritative for API details

---

## Prevention / Best Practices

### Before choosing a documentation integration approach

- [ ] Verify **write** capabilities, not just read -- many APIs and MCP servers are read-only
- [ ] Test the actual API endpoints; documentation may claim capabilities that do not work in practice
- [ ] Check if third-party MCP servers are still online before building workflows around them

### Maintaining sync across surfaces

- [ ] Designate ONE source of truth per piece of data (tokens live in JSON, component API lives in TypeScript)
- [ ] Automate derivation where possible (Style Dictionary for tokens, Storybook autodocs for props)
- [ ] Accept manual steps where automation is not possible (Figma Plugin runs in-app)
- [ ] When adding a new component, update the checklist: Storybook story, guidelines entry, Figma plugin manifest

### Documentation authority rule

> If two documentation surfaces disagree, the one closer to the code is correct. Fix the derived surface, never the source.

---

## Related Files

- `/mnt/d/Coding/eidotter/src/tokens/` -- Token JSON source files
- `/mnt/d/Coding/eidotter/src/styles/tokens.css` -- Generated CSS variables (do not edit directly)
- `/mnt/d/Coding/eidotter/scripts/sync-to-figma.ts` -- Existing REST API sync script
- `/mnt/d/Coding/eidotter/llms.txt` -- Machine-readable documentation for AI agents
- `/mnt/d/Coding/eidotter/guidelines/` -- Structured docs for Figma Make compatibility
- `/mnt/d/Coding/eidotter/CLAUDE.md` -- Agent guidance for this repository
- `/mnt/d/Coding/eidotter/docs/solutions/documentation/figma-make-compatibility.md` -- Related: Figma Make integration

---

## Key Insight

> "Single source of truth" is not about having one document. It is about having one **authority** per piece of data, with every other surface explicitly derived from it. The architecture is not the documents themselves -- it is the flow of data between them and the rules for resolving conflicts.
