# Registry Variant Metadata Pattern

## Frontmatter

```yaml
title: Registry Variant Metadata Pattern
category: design-system-patterns
tags:
  - component-registry
  - variant-metadata
  - cross-platform
  - changelog
  - consumer-tracking
  - typescript
module: Registry
symptom: No structured metadata about component variants — catalog pages, consumer dependencies, platform parity, and per-component changelogs all required manual investigation
root_cause: Variants defined only as TypeScript unions with no associated metadata (descriptions, versioning, consumer mappings, platform support)
solution: Extend the TypeScript registry with VariantMeta, PlatformMeta, and ChangelogEntry interfaces as the single source of truth
date_solved: 2026-03-18
prs: ["#157"]
```

---

## Problem Statement

eiDotter had 25+ components with variants defined as TypeScript union types (e.g., `variant?: 'primary' | 'secondary'`), but no structured metadata about those variants. This created several friction points:

1. **No catalog data**: Building catalog or documentation pages required manually reading each component's source to understand available variants and their purpose.
2. **No consumer tracking**: No way to know which downstream projects (Rizomorf, Spacewar, Pomodoke, EatThisDie) used which variants, making deprecation risky.
3. **No platform parity view**: Cross-platform support status (web canonical, iOS native, tvOS token-only) was tribal knowledge, not queryable data.
4. **No per-component changelog**: Changes were only tracked at the package level. Understanding the history of a single component meant reading git log with path filters.

### Impact

- Deprecating a variant required grepping every consumer repo to assess blast radius
- Cross-platform parity discussions relied on memory, not data
- Catalog pages in consuming apps had to hardcode variant lists instead of importing them

---

## Solution

Extended the existing TypeScript component registry (`src/components/registry.ts`) with three new interfaces and two utility functions.

### New Interfaces

**VariantMeta** — metadata for a single variant value:

```typescript
interface VariantMeta {
  description: string;
  since: string;        // semver when introduced
  deprecated?: string;  // semver when deprecated (omit if active)
  usedBy: string[];     // consumer project IDs (best-effort)
}
```

**PlatformMeta** — per-platform support status:

```typescript
interface PlatformMeta {
  path: string;
  status: 'canonical' | 'native' | 'token-only' | 'planned';
  note?: string;
}
```

**ChangelogEntry** — per-component public API changes:

```typescript
interface ChangelogEntry {
  version: string;
  type: 'added' | 'changed' | 'deprecated' | 'removed';
  description: string;
}
```

### Variant Key Format

Variant keys use `"prop:value"` format to encode both the prop name and the variant value:

```typescript
variants: {
  'variant:primary':   { description: 'Default action style', since: '0.1.0', usedBy: ['rizomorf'] },
  'variant:secondary': { description: 'De-emphasized action', since: '0.1.0', usedBy: ['rizomorf', 'pomodoke'] },
  'size:small':        { description: 'Compact size (1.5rem)', since: '0.3.0', usedBy: ['pomodoke'] },
  'size:medium':       { description: 'Default size (2rem)',   since: '0.1.0', usedBy: ['rizomorf'] },
}
```

This avoids ambiguity when a component has multiple variant props (e.g., Button has both `variant` and `size`). A flat key like `"primary"` would be ambiguous if multiple props shared a value name.

### Utility Functions

**`getVariantsUsedBy(componentName, projectId)`** — returns all variant keys a given consumer uses for a component:

```typescript
getVariantsUsedBy('Button', 'rizomorf')
// → ['variant:primary', 'variant:secondary', 'size:medium']
```

**`getVariantConsumerMap(componentName)`** — returns a map from variant key to consumer list:

```typescript
getVariantConsumerMap('Button')
// → { 'variant:primary': ['rizomorf'], 'size:small': ['pomodoke'], ... }
```

---

## Why This Approach

### TypeScript registry, not JSON

Keeping metadata in the same TypeScript file as the existing registry avoids JSON-to-TS sync problems. The registry is already imported by build tooling and Storybook — adding metadata fields extends it without introducing a second source of truth.

### Manual entries, not AST extraction

Automated AST extraction could derive variant union values, but not descriptions, consumer mappings, or platform notes. Manual entries give full control over what each variant means and who uses it. The tradeoff is maintenance cost, but entries are small (one line per variant) and change infrequently.

### `usedBy` is best-effort

Consumer mappings are verified by grepping consumer repos before releases but are not enforced by CI. This is intentional — strict enforcement would require a monorepo or cross-repo CI pipeline, which is disproportionate for a 4-project portfolio. Best-effort tracking still covers the primary use case: assessing deprecation blast radius.

### Changelog logs public API changes only

Internal CSS refactors, test additions, and build config changes are not logged in the per-component changelog. Only changes that affect the component's public API (props, behavior, visual output) get entries. This keeps the changelog useful for consumers rather than noisy.

### No runtime validation

TypeScript union types already enforce variant correctness at compile time. Adding runtime validation (e.g., Zod schemas) would duplicate what the type system provides and add bundle weight for zero benefit.

---

## Prevention Checklist

### When Adding or Changing a Variant

- [ ] Add a `ChangelogEntry` with `type: 'added'` or `type: 'changed'` (most recent first)
- [ ] Add a `VariantMeta` entry with `description`, `since` version, and known `usedBy` consumers
- [ ] Use `"prop:value"` key format to avoid ambiguity

### When Deprecating a Variant

- [ ] Set the `deprecated` field on the `VariantMeta` entry to the deprecation version
- [ ] Add a `ChangelogEntry` with `type: 'deprecated'`
- [ ] Check `usedBy` and notify affected consumers before releasing

### When a Consumer Adopts a Variant

- [ ] Update the `usedBy` array on the relevant `VariantMeta` entry (best-effort)

### What Not to Log

- Internal CSS refactors that don't change visual output
- Test additions or changes
- Build/tooling config changes
- Storybook-only changes (story additions, control tweaks)

---

## Incremental Rollout

The initial PR (#157) populated metadata for 5 components (Button, Card, Alert, Badge, TimelineNode). The remaining ~20 components will be populated incrementally as they are touched. Tracked by DMNC-550.

---

## Related Files

- `src/components/registry.ts` - Component registry with variant metadata
- `src/index.ts` - Public API exports

## Related PRs

- [PR #157](https://github.com/user/eidotter/pull/157) - Registry variant metadata pattern

---

## Key Insight

> "A union type tells the compiler what values are valid. A registry tells the team what those values mean, who depends on them, and when they changed. Both are necessary — the union for correctness, the registry for coordination."
