# Accessibility

eiDotter aims for **WCAG 2.1 Level AA** conformance with documented exceptions. This page is the conformance statement: what we claim, where we know we fall short, and how to report new issues.

> **Status:** Phase 1 audit complete (2026-05-05). Five concrete defects identified and tracked for remediation. The amber-mono default theme passes contrast at AA for every valid token usage; secondary themes have known gaps documented below.

## Conformance claim

eiDotter v0.22.x targets WCAG 2.1 Level AA. The audit covered:

- **Token color contrast** — every semantic foreground/background pair across all five themes. See [`solutions/best-practices/token-contrast-baseline-2026-05-05.md`](./solutions/best-practices/token-contrast-baseline-2026-05-05.md).
- **Storybook axe-core scan** — 325 stories run against WCAG 2.0 + 2.1 AA tags. See [`solutions/best-practices/storybook-a11y-baseline-2026-05-05.md`](./solutions/best-practices/storybook-a11y-baseline-2026-05-05.md).
- **Keyboard interaction** — every interactive component, both React Aria-backed and hand-rolled. See [`solutions/best-practices/keyboard-audit-2026-05-05.md`](./solutions/best-practices/keyboard-audit-2026-05-05.md).
- **Reduced motion + high contrast** — sampled 10 visually-active components for `prefers-reduced-motion` and `prefers-contrast` overrides. See [`solutions/best-practices/motion-contrast-spot-check-2026-05-05.md`](./solutions/best-practices/motion-contrast-spot-check-2026-05-05.md).

Out of scope for Phase 1, deferred to a follow-up audit:

- Screen-reader output verification (NVDA on Windows, VoiceOver on macOS) — current dev environment is Linux.
- Live high-contrast / reduced-motion verification with browser DevTools forced settings (only static analysis was performed).
- The remaining 27 components beyond the 10-component spot check for high-contrast glow neutralization.

## Known issues

These are the defects the Phase 1 audit identified. None are blockers — workarounds exist or the affected paths are infrequent — but each will be fixed in a follow-up release. Re-audit will confirm closure.

### 1. `<Icon>` `aria-prohibited-attr` (most common)

The `Icon` wrapper (`src/components/Icon/components/Icon.tsx`) renders `<span aria-label="...">` without an explicit role. ARIA 1.2 prohibits `aria-label` on the implicit `generic` role.

- **Symptom:** Screen readers may not announce the icon's accessible name in some configurations.
- **Affected:** Every component that uses an `Icon` — Alert, Notification, Terminal, Brand/Lockup, Chat, Footer, Token Playground.
- **Workaround:** Pass `role="img"` explicitly to `<Icon>` until the default changes.

### 2. `<Tag>` `aria-allowed-attr` when selectable

A selectable `<Tag>` renders `<span role="button" aria-selected="true">`. `aria-selected` is not allowed on `button`.

- **Symptom:** Selected state may not be announced; some AT may flag the attribute as invalid.
- **Affected:** `<Tag selectable>` and `<Tag interactive>` stories.
- **Workaround:** Don't rely on `aria-selected` for the selected state of a Tag; use `aria-pressed` semantics manually until fixed.

### 3. `<ChatHistory>` `scrollable-region-focusable`

The chat log container scrolls but has no `tabindex="0"`. Keyboard users cannot scroll it without grabbing focus on a child first.

- **Symptom:** Users navigating with keyboard alone may be unable to scroll back through history.
- **Workaround:** Wrap the consumer side in a focusable element, or set `tabindex={0}` on the parent until the component changes.

### 4. `<LegalPage>` link styling inside body prose

The `mailto:` (and other inline) links in `LegalPage` body prose rely on color alone for distinction. WCAG 2.1 SC 1.4.1 requires more.

- **Workaround:** Pass body content with explicitly underlined links until the default changes.

### 5. `cga-amber` theme contrast on `background-secondary`

In the `cga-amber` theme only, `text-primary` (`#adaaa5`) on `background-secondary` (`#5a5852`) is **3.07:1** — passes AA Large but fails AA Body. Other tokens on the same background see similar dips.

- **Symptom:** Body text on secondary surfaces in `cga-amber` is below AA Body.
- **Workaround:** Use `background-primary` (`#050300`) for body content surfaces in this theme. The default `amber-mono` theme is unaffected.
- **Mode 4 / Mode 5 themes** define `text-muted` as an `rgba(...)` value; effective contrast depends on the underlying background and was not computed automatically. Treat `text-muted` as decoration in those themes pending a follow-up fix.

### Disabled tokens — exempt by WCAG

`text-disabled` and `border-disabled` resolve to colors below 4.5:1 on every theme. **WCAG 2.1 SC 1.4.3 explicitly exempts inactive UI components** from contrast minimums — disabled is a deliberate signal of unavailability. We document this for transparency.

## Testing your integration

- **Run axe-core in Storybook:** `npx test-storybook --url <your-storybook-url>` with our [`.storybook/test-runner.ts`](./.storybook/test-runner.ts) configured. We use `@storybook/test-runner` + `axe-playwright` against `wcag2a`, `wcag2aa`, `wcag21aa` tags.
- **Run the contrast check on your tokens:** if you've extended or overridden eiDotter tokens, run `node scripts/check-contrast.mjs` to inspect your derived theme. Adapt the FG/BG token lists in that script if you've added new semantic tokens.
- **Honor user preferences:** every animated component respects `prefers-reduced-motion` (with a global fallback in [`src/styles/accessibility.css`](./src/styles/accessibility.css)) and most respect `prefers-contrast: more`. Don't override either.
- **Keyboard-only walkthrough:** every interactive component supports keyboard activation via React Aria primitives, native semantic elements, or documented Enter+Space patterns (see [`solutions/best-practices/keyboard-audit-2026-05-05.md`](./solutions/best-practices/keyboard-audit-2026-05-05.md)).

## Reporting issues

- **GitHub:** [Open an issue](https://github.com/CinimoDY/eiDotter/issues/new). Title format: `a11y: <short description>`. Include component, browser, AT (if any), and reduced-motion/high-contrast state.
- **Linear (internal):** project "eiDotter".

We treat new accessibility regressions on par with breaking-change regressions: they block a release.

## Re-running the audit

```bash
# Token contrast
node scripts/check-contrast.mjs                        # human-readable
node scripts/check-contrast.mjs --json                 # machine-readable

# Storybook axe scan
npm run build-storybook
( cd docs && python3 -m http.server 6007 ) &
A11Y_REPORT_PATH=solutions/best-practices/storybook-a11y-baseline-2026-05-05.ndjson \
  npx test-storybook --url http://127.0.0.1:6007 --maxWorkers 2 --no-cache
```

Both scripts are reporting tools — exit code is always 0 in this audit cycle. A future plan will gate CI on regressions.

---

*Last audit: 2026-05-05. Next planned audit: when remediation PRs land or at v0.24.0, whichever is sooner.*
