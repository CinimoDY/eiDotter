# MDX docs batch 3: Input, Modal, Progress, RetroEffects (DMNC-380)

**Wave:** 2
**Priority:** High
**Branch:** `docs/mdx-batch-3`
**Parallel-safe:** Yes (after Wave 1 merges)

---

Working in /mnt/d/Coding/eidotter on branch main.

Create MDX documentation pages for 4 components (part of DMNC-380).

TEMPLATE: Use `src/components/Button/components/ButtonDocs.mdx` as the exact template.
NAMING: Files MUST be named `ComponentDocs.mdx` (NOT `Component.mdx`).

Components to document:
1. `src/components/Input/components/InputDocs.mdx`
2. `src/components/Modal/components/ModalDocs.mdx`
3. `src/components/Progress/components/ProgressDocs.mdx`
4. `src/components/RetroEffects/components/RetroEffectsDocs.mdx`

For each: read the component TSX, CSS, and stories. Include variants, sizes, states, accessibility, API reference, and design tokens tables.

Verify in Storybook after creating all 4. Commit on branch `docs/mdx-batch-3`, push, create PR.
