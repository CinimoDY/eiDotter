# Align RetroEffects CRT values (DMNC-369)

**Wave:** 2
**Priority:** Medium
**Branch:** `fix/retroeffects-crt-alignment`
**Parallel-safe:** Yes (after Wave 1 merges)

---

Working in /mnt/d/Coding/eidotter on branch main.

Fix DMNC-369: Align RetroEffects CRT values with design-craft skill spec.

The design-craft skill specifies:
- Enter filter: `blur(4px) brightness(0.3)` (brightness simulates dimmed phosphor warming up)
- Exit scale: `scale(0.95)` (more visible exit than 0.98)

1. Read `src/components/RetroEffects/components/RetroEffects.css`
2. Read the design-craft skill at `.claude/skills/design-craft/SKILL.md` for CRT spec values
3. Compare current values with spec, update any that differ
4. Ensure `prefers-reduced-motion: reduce` disables all animations
5. Run `npx jest src/components/RetroEffects` to verify tests pass
6. Start Storybook, verify RetroEffects stories still render
7. Commit on branch `fix/retroeffects-crt-alignment`, push, create PR
