---
module: TimelineContainer
date: 2026-03-10
problem_type: best_practice
component: frontend_stimulus
symptoms:
  - "TimelineContainer has zero responsive styles — no media queries or container queries"
  - "ZoomControls buttons below WCAG 2.5.8 44px touch target minimum on mobile"
  - "Entry content has no max-width constraint, reducing readability on wide screens"
root_cause: missing_workflow_step
resolution_type: code_fix
severity: medium
tags: [container-queries, responsive, mobile-first, wcag, touch-targets, readability]
---

# Troubleshooting: CSS Container Queries for Responsive Component Libraries

## Problem
TimelineContainer component had no responsive styles at all — it rendered identically at 320px mobile and 2560px ultrawide. This made it unusable on mobile (tiny touch targets, wasted space) and hard to read on wide screens (unbounded line lengths).

## Environment
- Module: TimelineContainer (eiDotter design system)
- Framework: React 19 + TypeScript + Vite 6
- Affected Components: TimelineContainer.css, ZoomControls.css, TimelineAxis.css, views/views.css
- Date: 2026-03-10

## Symptoms
- Timeline entries and controls rendered at desktop size on mobile viewports
- ZoomControls buttons at 40px (Button large), below 44px WCAG 2.5.8 minimum
- Entry text content stretched full-width on ultrawide, making lines unreadable
- Timeline node labels (e.g., "March 2024") overflowed on narrow screens
- No responsive behavior at any viewport size

## What Didn't Work

**Attempted approach: Media queries**
- **Why it was rejected:** Component libraries are consumed in unknown layout contexts (sidebars, modals, split panes). A media query checks the *viewport* width, not the *component's* container width. A 768px viewport could still have this component in a 300px sidebar.

**Attempted approach: Container self-query**
- **Why it failed:** CSS containers cannot query themselves. A `@container` rule on `.timeline-container` cannot affect `.timeline-container`'s own properties — only its descendants. This is a fundamental CSS limitation.

## Solution

Used **CSS Container Queries** with a mobile-first strategy and three breakpoint tiers.

**1. Establish containment context** (`TimelineContainer.css`):
```css
/* Before: */
.timeline-container {
  font-family: var(--typography-font-family-primary);
}

/* After: */
.timeline-container {
  container: timeline / inline-size;
  font-family: var(--typography-font-family-primary), var(--typography-font-family-fallback);
}
```

**2. Mobile-first defaults with progressive enhancement** (`views/views.css`):
```css
/* Base (compact) — serves as default and fallback for browsers without container queries */
.timeline-view { gap: var(--spacing-4); }
.timeline-view__bucket { gap: var(--spacing-3); }
.timeline-view__content { gap: var(--spacing-3); min-width: 0; }

/* Compact: shrink node labels — they are the only date context on mobile */
@container timeline (max-width: 479px) {
  .timeline-view .timeline-node__label { font-size: var(--typography-font-size-xs); }
}

/* Standard (480px+): restore spacing */
@container timeline (min-width: 480px) {
  .timeline-view { gap: var(--spacing-6); }
  .timeline-view__bucket { gap: var(--spacing-4); }
}

/* Wide (768px+): constrain for readability */
@container timeline (min-width: 768px) {
  .timeline-view__content { max-width: 65ch; }
}
```

**3. Touch-friendly zoom controls** (`ZoomControls.css`):
```css
/* WCAG 2.5.8: 44px minimum touch targets */
@container timeline (max-width: 768px) {
  .timeline-zoom-controls .button { min-width: 44px; min-height: 44px; }
  .timeline-zoom-controls__level { min-width: 44px; min-height: 44px; }
}
```

**4. Responsive spine padding** (`TimelineAxis.css`):
```css
.timeline-axis { padding-left: var(--spacing-4); }  /* 16px compact */
@container timeline (min-width: 480px) {
  .timeline-axis { padding-left: var(--spacing-6); }  /* 24px standard */
}
```

## Why This Works

1. **Container queries respond to component width, not viewport.** The `container: timeline / inline-size` declaration on `.timeline-container` makes all descendants queryable against the container's inline size. This means the component adapts correctly whether it's full-width or in a narrow sidebar.

2. **Mobile-first defaults provide graceful degradation.** The ~6% of browsers without container query support get the compact layout, which is the safest default — readable on any screen.

3. **`max-width: 65ch` scoped to wide containers only.** For monospace fonts (JetBrains Mono), 65ch provides optimal readability. This only activates when the container is 768px+, preventing unnecessary constraints on mobile.

4. **Touch targets are locally overridden.** Rather than changing the global Button component (which would affect all consumers), the 44px minimum is applied locally in ZoomControls via container query, meeting WCAG without global side effects.

## Prevention

- **For eiDotter components:** Always add container query responsiveness when a component may be used in varied layout contexts. Use the three-tier pattern: compact (<480px), standard (480-768px), wide (768px+).
- **Container query thresholds:** Document in file header comments. Keep all `@container` blocks consolidated at the bottom of CSS files, ordered by threshold ascending.
- **Remember:** Containers cannot query themselves — only descendants can query ancestor containers. Plan layout accordingly.
- **Touch targets:** WCAG 2.5.8 requires 44px minimum. Check Button component sizes — eiDotter's `large` is 40px, so local overrides may be needed.
- **Storybook viewport stories:** Always add Mobile/Tablet/Ultrawide story variants when adding responsive behavior so regressions are visible.

## Related Issues

- See also: [per-color-phosphor-glow-tokens.md](../design-system-patterns/per-color-phosphor-glow-tokens.md)
