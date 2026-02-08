# MDX docs batch 2: Card, Checkbox, CommandPrompt, Icon (DMNC-380)

**Wave:** 2
**Priority:** High
**Branch:** `docs/mdx-batch-2`
**Parallel-safe:** Yes (after Wave 1 merges)

---

Working in /mnt/d/Coding/eidotter on branch main.

Create MDX documentation pages for 4 components (part of DMNC-380).

TEMPLATE: Use `src/components/Button/components/ButtonDocs.mdx` as the exact template.
NAMING: Files MUST be named `ComponentDocs.mdx` (NOT `Component.mdx`).

Components to document:
1. `src/components/Card/components/CardDocs.mdx`
2. `src/components/Checkbox/components/CheckboxDocs.mdx`
3. `src/components/CommandPrompt/components/CommandPromptDocs.mdx`
4. `src/components/Icon/components/IconDocs.mdx`

For each: read the component TSX, CSS, and stories. Include variants, sizes, states, accessibility, API reference, and design tokens tables.

Verify in Storybook after creating all 4. Commit on branch `docs/mdx-batch-2`, push, create PR.
