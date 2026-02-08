# Modal close animation (DMNC-366)

**Wave:** 3
**Priority:** Low
**Branch:** `feat/modal-close-animation`
**Parallel-safe:** Yes

---

Working in /mnt/d/Coding/eidotter on branch main.

Implement DMNC-366: Modal close animation.

Currently Modal only animates on open (modal-open keyframe, 150ms ease-out). Closing is instant.

1. Read `src/components/Modal/components/Modal.tsx` and `Modal.css`
2. Add a `modal-close` CSS keyframe: opacity 1->0, scale 1->0.95, backdrop fade out
3. The challenge: `<dialog>` close is synchronous. Options:
   - Use CSS `@starting-style` if browser support is acceptable
   - Or delay `dialog.close()` until animation completes via `animationend` event
4. Add `prefers-reduced-motion: reduce` — skip close animation
5. Write/update tests for close animation behavior
6. Run `npx jest src/components/Modal` then `npx jest --silent` for full suite
7. Verify in Storybook
8. Commit on branch `feat/modal-close-animation`, push, create PR
