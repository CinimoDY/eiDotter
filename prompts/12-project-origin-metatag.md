# Project origin metatag design (DMNC-383)

**Wave:** 3 (Research only)
**Priority:** Medium
**Branch:** N/A (write plan only)
**Parallel-safe:** Yes

---

Working in /mnt/d/Coding/eidotter (read-only research).

Design DMNC-383: Project origin metatag system.

Goal: Track which downstream project each component originated from (e.g., Button came from Rizomorf, FilterBar from Lifelines).

Research and propose:
1. Where to store origin metadata — in the component TSX (JSDoc), in a manifest JSON, or in Storybook MDX?
2. How to surface it in Storybook docs pages (a "Source" badge?)
3. How to surface it in Figma component descriptions
4. A schema for the metadata: `{ origin: string, adoptedVersion: string, contributors: string[] }`

Write a plan to `plans/feat-project-origin-metatag.md` with the recommended approach and implementation steps.
