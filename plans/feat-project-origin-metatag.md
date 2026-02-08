# Project Origin Metatag System (DMNC-383)

## Status: Phase 1 Complete

The core registry was implemented in PR #91 (`cb92ae7`).

## What Exists

### `src/components/registry.ts`

A TypeScript registry mapping every component to its origin project and consumers:

```ts
interface ComponentMeta {
  origin: ProjectId;       // Which project created this component
  consumers: ProjectId[];  // Which projects use it
  since?: string;          // Version when adopted into eidotter
  originNote?: string;     // Human-readable origin context
}
```

**9 projects** tracked: eidotter, spacewar, rizomorf, pomodoke-calendar, keepcoin, steuerdash, sella, lifelines, betamorf.

**18 components** registered with origin metadata. Notable cross-project origins:
- `RetroEffects` → from Spacewar!
- `Stat` → from Steuerdash
- `TimelineNode` → from Lifelines
- `Breadcrumb` → from rizomorf

### Helper Functions

- `getComponentMeta(name)` — lookup single component
- `getComponentsByOrigin(projectId)` — all components from a project
- `getComponentsByConsumer(projectId)` — all components used by a project

### Exports

All types and functions exported from `src/index.ts`.

## Remaining Work (Phase 2)

### 1. Surface in Storybook MDX Docs

Each component's MDX docs page should show an "Origin" section:

```mdx
## Origin

| Field | Value |
|-------|-------|
| Created in | Spacewar! |
| Adopted | v0.3.0 |
| Consumers | Spacewar!, rizomorf |
| Note | CRT scanline/glow effects from Spacewar! |
```

**Implementation:** Import from registry in each MDX, or create a `<ComponentOrigin name="RetroEffects" />` React component that auto-renders the table.

### 2. Surface in Figma Component Descriptions

When running `npm run sync-to-figma`, component descriptions in Figma should include origin metadata. This requires modifying `scripts/sync-to-figma.ts` to read from the registry and append to the Figma component description field.

**Limitation:** The Figma REST API can write Variables but NOT component frame descriptions. This would require the Plugin API (runs in-app only).

### 3. Storybook "Source" Badge

Add a small badge to the Storybook sidebar or docs page showing the origin project. Options:
- **Storybook tag system** — add `tags: ['origin:spacewar']` in story meta
- **Custom decorator** — read from registry and render a badge in the docs toolbar

### 4. Keep Registry Updated

When adding new components (e.g., FilterBar), add an entry to the registry:

```ts
FilterBar: { origin: 'lifelines', consumers: ['lifelines'], originNote: 'Filter toolbar from Lifelines project' },
```

## Recommendation

Phase 2 priority order:
1. **MDX docs integration** — highest value, low effort (add a section to each existing MDX page)
2. **Storybook tags** — medium effort, good discoverability
3. **Figma sync** — blocked by Plugin API requirement, defer
