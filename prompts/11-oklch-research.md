# OKLCH positioning research (DMNC-371)

**Wave:** 3 (Research only)
**Priority:** Low
**Branch:** N/A (no code changes, write to docs/)
**Parallel-safe:** Yes

---

Working in /mnt/d/Coding/eidotter (read-only research).

Research DMNC-371: Should eidotter adopt OKLCH color format?

Current position: OKLCH is flagged as INTERIM in the design-craft skill. Hex is source of truth (CGA spec).

Research:
1. Check Style Dictionary v4 OKLCH transform support (any updates since Jan 2026?)
2. Check Figma Variables API — any native OKLCH support?
3. Check browser support for oklch() in 2026
4. Read `src/tokens/colors.json` — how many colors would benefit from OKLCH perceptual uniformity?
5. For CGA's 16-color palette, does OKLCH add meaningful value?

Write findings to `docs/research/oklch-decision-2026.md` with a clear recommendation: adopt, defer, or reject.
