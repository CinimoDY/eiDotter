---
title: "feat: Sync eidotter React components with V.37 Figma file"
type: feat
status: complete
date: 2026-04-04
---

# Sync eidotter React components with V.37 Figma file

## Overview

The eidotter V.37 Figma file (forked from Untitled UI v8.0 PRO) contains the UTI component set restyled with CGA DOS aesthetic. However, 12 eidotter-specific components that have no UTI equivalent are missing from Figma entirely, and the 17 migrated components may not reflect their current code state (sm/md/lg sizes, React Aria states). This plan syncs the Figma file with the v0.16.0 codebase.

## Problem Frame

Designers and consumers referencing the Figma file see an incomplete picture of eidotter. Components like Timeline, Progress (with DOS block characters), FilterBar, and Terminal exist only in code. Meanwhile, migrated components like Tabs and Modal now have React Aria state variants (`data-disabled`, `data-selected`) that aren't reflected in Figma's interaction states.

## Requirements Trace

- R1. All eidotter-specific components have a Figma representation in the V.37 file
- R2. Migrated components reflect current code variants (sm/md/lg sizes, React Aria states)
- R3. Figma variables (691 across 7 collections) are used for all token references
- R4. Components use auto layout and proper Figma variant properties

## Scope Boundaries

- **In scope:** Adding missing components, updating variant properties on existing ones, using Figma Console MCP for programmatic updates
- **Out of scope:** Restyling UTI components we haven't modified in code, adding new UTI components not in eidotter, publishing the Figma library to consumers
- **Deferred:** Code Connect mappings between Figma and React (future enhancement)

## Context & Research

### Relevant Code and Patterns

- `src/components/registry.ts` — canonical component list with origin, consumers, variants
- `scripts/sync-to-figma.ts` — existing script that reads registry and generates Figma specs
- `.mcp.json` — Figma Console MCP (`figma-console-mcp`) and UTI MCP configured
- Figma file key: `V4tIz3sAMRx7H9wMYeesA6`

### Institutional Learnings

- `docs/solutions/best-practices/uti-figma-fork-react-aria-migration-2026-04-03.md` — restyling primitives first, amber-mono alias issues
- `docs/solutions/best-practices/react-aria-migration-patterns-2026-04-04.md` — React Aria states use `data-disabled`/`data-selected` not `:disabled`

### External References

- Figma Console MCP: `figma_execute` for bulk updates, `figma_search_components` for discovery
- Claude.ai Figma MCP: `get_design_context`, `get_screenshot` for read-only inspection

## Key Technical Decisions

- **Figma Console MCP over REST API:** The MCP provides 92+ tools with full read/write access via the Desktop Bridge plugin. More powerful than the REST API for bulk component creation.
- **New pages for eidotter-specific components:** Create dedicated Figma pages (e.g. "eiDotter Custom") rather than mixing into UTI pages, to keep the fork's structure clean.
- **Programmatic component creation:** Use `figma_execute` with Figma Plugin API code to create components, not manual design. This is reproducible and auditable.
- **Screenshot-validate loop:** After each component creation, use `figma_take_screenshot` to verify visual output before moving to the next.

## Open Questions

### Resolved During Planning

- **Where to put eidotter-specific components?** New page(s) in the V.37 file, not mixed into UTI pages.
- **Should we update UTI component variants?** Only the ones we've modified in code (size aliases, React Aria states).

### Deferred to Implementation

- **Exact Figma Plugin API for component set creation:** The `figma_execute` API surface needs to be explored during implementation.
- **Which UTI components already have sm/md/lg variants?** Requires Figma inspection when Desktop Bridge is running.
- **Auto layout specifics for DOS block-character components (Progress):** May need special handling for monospace character rendering.

## Implementation Units

### Phase 1: Inspect and Audit Current Figma State

- [ ] **Unit 1: Audit existing Figma components**

**Goal:** Map what currently exists in V.37 Figma vs what exists in code.

**Requirements:** R1

**Dependencies:** Figma Desktop Bridge must be running

**Files:**
- Read: `src/components/registry.ts`
- Output: Audit notes (in-session, not a file)

**Approach:**
- Use `figma_get_design_system_summary` to get full overview
- Use `figma_search_components` for each eidotter-specific component name
- Cross-reference against the 31 components in `registry.ts`
- Produce a gap list: components missing from Figma, components needing variant updates

**Test expectation:** none -- audit/discovery task

**Verification:**
- Clear gap list produced showing which components are missing and which need updates

### Phase 2: Add Missing eidotter-Specific Components

- [ ] **Unit 2: Create "eiDotter Custom" page in Figma**

**Goal:** Add a dedicated page for components that don't exist in UTI.

**Requirements:** R1

**Dependencies:** Unit 1 (gap list)

**Approach:**
- Use `figma_execute` to create a new page
- Add a section header frame explaining these are eidotter-native components

**Test expectation:** none -- scaffolding

**Verification:**
- Page exists and is visible in Figma file structure

- [ ] **Unit 3: Add Timeline components (TimelineContainer, TimelineNode)**

**Goal:** Create Figma component representations of the timeline system.

**Requirements:** R1, R3, R4

**Dependencies:** Unit 2

**Files:**
- Read: `src/components/TimelineContainer/components/TimelineContainer.tsx`
- Read: `src/components/TimelineNode/components/TimelineNode.tsx`

**Approach:**
- TimelineNode: Create component set with variant properties for `size` (sm/md/lg), `variant` (default/active/milestone), `state` (default/hover/selected)
- TimelineContainer: Create component showing the multi-zoom layout with year/month/day views
- Use eidotter Figma variables for all colors, spacing, typography
- Follow screenshot-validate loop after creation

**Test scenarios:**
- Happy path: TimelineNode renders in all 3 sizes with correct border/fill colors
- Happy path: TimelineContainer shows representative layout with nodes on axis

**Verification:**
- Both components visible in Figma, using correct variables, auto layout working

- [ ] **Unit 4: Add Progress component**

**Goal:** Create Figma representation of the DOS block-character progress bar.

**Requirements:** R1, R3, R4

**Dependencies:** Unit 2

**Files:**
- Read: `src/components/Progress/components/Progress.tsx`

**Approach:**
- Create component set with variants: `variant` (default/success/warning/error), `size` (sm/md/lg), `trackStyle` (block/bordered/gradient), `glow` (on/off), `indeterminate` (on/off)
- Use monospace text layers for block characters
- Apply phosphor glow as layer effects mapped to eidotter variables

**Test scenarios:**
- Happy path: Progress renders at 50% with correct fill/empty block character ratio
- Edge case: Indeterminate variant shows scanner element
- Happy path: Glow variant shows phosphor text-shadow effect

**Verification:**
- Component renders block characters correctly at multiple fill levels

- [ ] **Unit 5: Add remaining eidotter-specific components**

**Goal:** Add Terminal, CommandPrompt, TextScramble, RetroEffects, InlineExpand, FilterBar, Stat, ChatMessage/History/Input/Container.

**Requirements:** R1, R3, R4

**Dependencies:** Unit 2

**Files:**
- Read: respective component TSX files in `src/components/`

**Approach:**
- Batch creation — simpler components (Separator, Stat, FilterBar) first
- Terminal: window chrome with title bar, min/max/close buttons (display-only), content area
- CommandPrompt: prompt line with blinking cursor
- TextScramble: show before/after text decode states
- RetroEffects: static representation of CRT scanlines + vignette
- Chat components: message bubbles, input field, scrollable history container
- Use screenshot-validate loop for each

**Test scenarios:**
- Happy path: Terminal renders with title bar, border, content area using correct variables
- Happy path: FilterBar renders with 3 items, one active, correct toggle styling
- Happy path: ChatMessage renders user and assistant variants

**Verification:**
- All components visible in Figma with correct variable usage and auto layout

### Phase 3: Update Existing Migrated Components

- [ ] **Unit 6: Update size variant properties on migrated components**

**Goal:** Add sm/md/lg variant properties alongside existing small/medium/large on components that were migrated.

**Requirements:** R2, R4

**Dependencies:** Unit 1 (audit of current state)

**Approach:**
- For each migrated component (Button, Badge, Alert, Checkbox, Switch, Tag, Tabs, Input, etc.): check if Figma variant properties include sm/md/lg
- If only small/medium/large exist, add sm/md/lg as aliases or rename
- Use `figma_execute` for batch property updates

**Test scenarios:**
- Happy path: Button component set shows xs/sm/md/lg/xl sizes in Figma properties
- Happy path: Tabs component shows sm/md/lg size variants

**Verification:**
- All migrated components' Figma variants match the code prop options

- [ ] **Unit 7: Add React Aria interaction states**

**Goal:** Add data-disabled, data-selected, data-hovered state variants to interactive components.

**Requirements:** R2, R4

**Dependencies:** Unit 6

**Approach:**
- For Tabs, Button, Checkbox, Switch, Input: ensure Figma interaction states include disabled, selected/checked, hovered, focused, pressed
- These map to React Aria's data attributes and should be reflected in Figma's variant properties or interactive component states
- Use Figma's built-in interaction states where possible (hover, pressed, focused)

**Test scenarios:**
- Happy path: Tabs disabled variant shows correct muted opacity
- Happy path: Input focused variant shows phosphor glow border
- Happy path: Checkbox checked variant shows correct fill

**Verification:**
- Interactive components have complete state coverage matching React Aria states

## System-Wide Impact

- **Figma file structure:** New page added, existing component pages unchanged
- **Consumer impact:** Designers get complete component coverage for the first time
- **No code changes:** This is purely Figma work, no React code modified
- **Variable dependencies:** All new components must reference existing Figma variables, not hardcode values

## Risks & Dependencies

| Risk | Mitigation |
|------|------------|
| Figma Desktop Bridge not running | Must be started before any MCP work. Document the setup steps. |
| Claude.ai Figma MCP rate limits | Use Figma Console MCP (Desktop Bridge) as primary tool |
| DOS block characters may not render well in Figma | Use monospace font (JetBrains Mono) and test with screenshot validation |
| Large number of components to create | Batch by complexity — simple first, complex last |
| Figma variable references may have changed since initial restyle | Verify variable names with `figma_get_variables` before using |

## Sources & References

- Figma file: eiDotter DS V.37 (key: `V4tIz3sAMRx7H9wMYeesA6`)
- Registry: `src/components/registry.ts`
- Figma Console MCP: `figma-console-mcp` via `.mcp.json`
- Related: `docs/solutions/best-practices/uti-figma-fork-react-aria-migration-2026-04-03.md`
- Related: `docs/solutions/best-practices/react-aria-migration-patterns-2026-04-04.md`
