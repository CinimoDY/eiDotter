## Description

<!-- Briefly describe the changes in this PR -->

## Related Issue

<!-- Link to the issue this PR addresses -->
Fixes #

## Type of Change

- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Refactoring (no functional changes)

## Checklist

- [ ] My code follows the project's coding style (V.37 React Aria + Tailwind, or BEM for the bitmap-font exceptions; TypeScript interfaces with JSDoc)
- [ ] I have added tests that prove my fix/feature works
- [ ] All new and existing tests pass (`npm run test`)
- [ ] I have updated the documentation if needed (README, CLAUDE.md, CHANGELOG on releases)
- [ ] I have added a changeset if this change affects the public API (`npx changeset`)

## Component compliance (for any component change)

<!-- Skip if this PR touches no component code. Otherwise confirm each item. -->

- [ ] **Reuse** — used an existing eidotter component/primitive where one fits, rather than re-implementing
- [ ] **Tokens** — colours/spacing/radius use semantic (`--color-semantic-*`) or primitive (`--color-cga-*`) tokens; **no** hardcoded hex, `rgba()` glows, or Tailwind arbitrary colour values (`bg-[#…]`)
- [ ] **Keyboard** — every action a pointer can take is operable by keyboard (Enter/Space/arrows as appropriate); interactive controls are in the tab order
- [ ] **Focus** — a visible `:focus-visible` ring at normal contrast (not `outline: none` without a replacement)
- [ ] **ARIA** — correct roles/states/labels; no prohibited attributes; overlays trap + restore focus and `inert` their closed/off-screen content
- [ ] **Reduced motion** — every animation has a `@media (prefers-reduced-motion: reduce)` path (and JS bypass via `prefersReducedMotion()` where animation is scripted)
- [ ] **High contrast** — phosphor `text-shadow`/`box-shadow` glows neutralized under `@media (prefers-contrast: high)`; emphasis carried by border/underline, not colour alone
- [ ] **Responsive** — component-level breakpoints use CSS container queries, not media queries
- [ ] **Axe gate** — Storybook stories cover the key variants and the axe gate passes; no new entries added to `a11y-known-failures.json` without a linked tracking issue

## Screenshots (if applicable)

<!-- Add screenshots for UI changes -->

## Additional Notes

<!-- Any additional context or notes for reviewers -->
