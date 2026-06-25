---
title: Testing pure-CSS utilities via HTML attribute contracts in Jest
date: 2026-06-21
category: developer-experience
module: Provenance
problem_type: developer_experience
component: testing_framework
severity: low
applies_when:
  - A design-system utility is pure CSS with no React component
  - The utility is activated by setting HTML data-attributes on prose elements
  - Jest mocks all CSS via identity-obj-proxy (the default in this repo)
tags: jest, testing, css-utility, data-attributes, provenance, attribute-contract
---

# Testing pure-CSS utilities via HTML attribute contracts in Jest

## Context

Some eidotter primitives are pure CSS — no React component ships in the
component directory, only a Storybook stories file. `src/components/Provenance/`
is the canonical example: its CSS (`src/styles/provenance.css`) defines a
`data-provenance="ai-draft"` / `data-ai-block` / `data-ai-skip` attribute API,
and `AIText` is the ergonomic React shortcut over the same attribute.

The 2026-06-10 test audit flagged this as a coverage gap: the CSS utility had no
Jest tests, only Storybook stories (DMNC-1013). The question: *what can Jest
actually verify here, given that it mocks all CSS?*

## Guidance

**Test the HTML attribute contract that the CSS selectors target — not computed
styles.**

Jest mocks every `*.css` import via `identity-obj-proxy`, so `background-image`,
`-webkit-background-clip`, and all visual properties never resolve. But the DOM
attributes that *trigger* those rules (`data-provenance="ai-draft"`, etc.) are
set by callers on real HTML elements, and those are fully observable.

Verifying the attribute contract is the correct and complete scope for a JS test
suite over a pure-CSS utility:

- If the attribute is set correctly, the CSS rule fires in a real browser.
- If the attribute is absent or wrong, no CSS fires — no test of visual output
  could catch a caller who forgot to set it.
- Visual correctness belongs to browser integration / Storybook testing, not Jest.

**Render plain HTML elements directly — no React component needed:**

```tsx
import React from 'react';
import { render } from '@testing-library/react';

// Per-paragraph contract
it('data-provenance="ai-draft" attribute is present on a marked <p>', () => {
  const { container } = render(<p data-provenance="ai-draft">Draft</p>);
  expect(container.querySelector('[data-provenance="ai-draft"]')).not.toBeNull();
});

// Exact value matters — the CSS selector is an equality check
it('attribute value is exactly "ai-draft"', () => {
  const { container } = render(<p data-provenance="ai-draft">Draft</p>);
  expect(
    container.querySelector('[data-provenance="ai-draft"]')?.getAttribute('data-provenance')
  ).toBe('ai-draft');
});

// Other values are no-ops
it('only "ai-draft" triggers the marker — other values are no-ops', () => {
  const { container } = render(<p data-provenance="human">Text</p>);
  expect(container.querySelector('[data-provenance="ai-draft"]')).toBeNull();
});
```

**For boolean-style attributes (`data-ai-block`), the CSS selector is `[data-ai-block]`
(presence only), so any truthy JSX value works:**

```tsx
it('data-ai-block attribute is present on the wrapper', () => {
  const { container } = render(<article data-ai-block><p>Prose</p></article>);
  expect(container.querySelector('[data-ai-block]')).not.toBeNull();
});
```

**For opt-out attributes with exact values (`data-ai-skip="true"`), assert the value:**

```tsx
it('data-ai-skip attribute value is exactly "true"', () => {
  const { container } = render(<div data-ai-skip="true"><p>x</p></div>);
  expect(container.querySelector('[data-ai-skip]')?.getAttribute('data-ai-skip')).toBe('true');
});
```

**For code-legibility resets (`code/kbd/samp/pre` inside AI-marked regions),
verify text content is preserved — these elements must remain readable:**

```tsx
it('<code> inside data-provenance="ai-draft" retains text content', () => {
  const { container } = render(
    <p data-provenance="ai-draft">Run <code>npm install</code></p>
  );
  expect(container.querySelector('code')?.textContent).toBe('npm install');
});

// NOTE: <pre> cannot nest inside <p> (invalid HTML) — use a block wrapper:
it('<pre> inside data-provenance="ai-draft" retains text content', () => {
  const { container } = render(
    <div data-provenance="ai-draft"><pre>const x = 1;</pre></div>
  );
  expect(container.querySelector('pre')?.textContent).toBe('const x = 1;');
});
```

## Why This Matters

- **Coverage without false guarantees.** The tests verify the API surface that CSS
  rules depend on. They catch callers who misspell the attribute, use the wrong
  value, or fail to set it at all — the real failure modes in practice.
- **Separation of concerns is correct.** JS tests own the attribute/DOM contract.
  Browser integration (Storybook, Playwright) owns the visual output. Trying to
  assert computed styles in Jest produces fragile tests that always pass because
  CSS is mocked.
- **Documentation-only directories get full coverage.** Without this pattern, any
  Storybook-only directory (like `Tokens/` or `Provenance/`) would be untestable.
  The pattern extends to any future pure-CSS primitive.

## When to Apply

- A component directory contains only `*.stories.tsx` (no `.tsx` source file)
- The public API is a set of HTML `data-*` attributes consumed by a CSS file
- You need to fulfill the 80% global coverage threshold without overfitting to mocked CSS output

## Examples

Full test file: `src/components/Provenance/Provenance.test.tsx` (DMNC-1013)

Four describe blocks, 23 tests:
1. `data-provenance="ai-draft"` per-paragraph contract (8 tests)
2. `data-ai-block` whole-section mode (4 tests)
3. `data-ai-skip="true"` opt-out (5 tests)
4. Code-element legibility inside AI-marked regions (6 tests)

## Related

- `src/styles/provenance.css` — the CSS utility being tested
- `src/components/AIText/components/AIText.test.tsx` — React-component tests over the same attribute (contrast: tests a component, not a raw HTML API)
- DMNC-884 (Phase 1 provenance plan), DMNC-946 (gradient restyle), DMNC-1013 (this coverage)
