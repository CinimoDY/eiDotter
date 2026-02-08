# MDX docs batch 1: Accordion, Alert, Badge, Breadcrumb (DMNC-380)

**Wave:** 1
**Priority:** High
**Branch:** `docs/mdx-batch-1`
**Parallel-safe:** Yes

---

Working in /mnt/d/Coding/eidotter on branch main.

Create MDX documentation pages for 4 components (part of DMNC-380).

TEMPLATE: Use `src/components/Button/components/ButtonDocs.mdx` as the exact template. Each doc must follow this structure:
- Import `{ Meta }` from `@storybook/addon-docs/blocks`
- `<Meta title="Docs/ComponentName" />`
- H1 with component name and one-line description
- Variants/options table
- Sizes table (if applicable)
- States section
- Accessibility section
- API Reference table (all props with types, defaults, descriptions)
- Design Tokens Used table

NAMING: Files MUST be named `ComponentDocs.mdx` (NOT `Component.mdx`) to avoid Storybook autodocs conflicts.

Components to document:
1. `src/components/Accordion/components/AccordionDocs.mdx` — Read Accordion.tsx for props
2. `src/components/Alert/components/AlertDocs.mdx` — Read Alert.tsx for props
3. `src/components/Badge/components/BadgeDocs.mdx` — Read Badge.tsx for props
4. `src/components/Breadcrumb/components/BreadcrumbDocs.mdx` — Read Breadcrumb.tsx for props

For each: read the component TSX, CSS, and stories to understand variants, props, and tokens used.

After creating all 4, start Storybook (`pkill -f storybook; npx storybook dev -p 6006`) and verify each page loads at `/?path=/docs/docs-componentname--docs`.

Commit on branch `docs/mdx-batch-1`, push, create PR.
