# Footer Component Design Spec

**Date:** 2026-04-02
**Issue:** DMNC-573
**Status:** Approved

## Problem

German law (DDG § 5) requires an Impressum on all public websites. eidotter serves 9+ consumer projects, all of which have ad-hoc minimal footers with no legal links. There is no shared footer component.

The actual Impressum content lives centralized at dmnc.tech. eidotter's role is providing a reusable Footer component with legal link defaults so every consumer gets compliance out of the box.

## Design Decisions

1. **Centralized content, distributed links.** The Impressum page lives at dmnc.tech. eidotter provides a Footer component that links to it. Consumer projects override with their own links.

2. **Default legal links.** When no `links` prop is passed, the Footer renders Impressum + Datenschutz links pointing to `/impressum` and `/datenschutz`. Consumers override entirely or spread defaults with extras. An empty array `links={[]}` explicitly shows no links.

3. **Dummy data in eidotter.** Stories and defaults use generic placeholders ("ACME Corp", relative URLs). Consumer projects fill in real content.

4. **Separate Impressum page task.** The actual /impressum page at dmnc.tech is a separate task for the dmnctech project.

## Component: Footer

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `copyright` | `string` | — | Copyright text (e.g., "2026 ACME Corp") |
| `links` | `FooterLink[]` | `defaultLegalLinks` | Legal/nav links. Defaults to Impressum + Datenschutz. Pass `[]` for none. |
| `children` | `ReactNode` | — | Optional content between separator and links |
| `className` | `string` | `''` | Additional CSS class |
| `...props` | `HTMLAttributes` | — | Spread onto root `<footer>` element |

### FooterLink type

```
{ label: string; href: string; external?: boolean }
```

### Exported constants

- `defaultLegalLinks` — `[{ label: 'Impressum', href: '/impressum' }, { label: 'Datenschutz', href: '/datenschutz' }]`

### Visual structure

```
────────────────────────── (amber separator)

Impressum · Datenschutz · GitHub
© 2026 ACME Corp
```

- Separator: 1px amber line (uses `--color-semantic-border-default`)
- Links: amber (`--color-cga-amber`) with phosphor glow on hover, middle-dot separators in brown
- Copyright: muted brown (`--color-cga-brown`)
- External links open in new tab
- Centered text, DOS monospace font

### BEM classes

`.footer`, `.footer__separator`, `.footer__content`, `.footer__links`, `.footer__link`, `.footer__dot`, `.footer__copyright`

### Accessibility

- `<footer>` semantic element
- `<nav aria-label="Footer links">` wraps links
- Middle dots are `aria-hidden="true"`
- High contrast: thicker separator, underlined links

### What this replaces

Each consumer project currently has an ad-hoc footer:
- rizomorf: `<footer className="py-6 text-center">` with just copyright
- dmnctech: `<footer className="footer">` with Separator + copyright
- eidotter-home: simple footer in BaseLayout.astro with nav links
- spacewar_landing: similar minimal footer

After shipping, each replaces their custom footer with:

```tsx
import { Footer, defaultLegalLinks } from 'eidotter';

<Footer
  copyright="2026 ACME Corp"
  links={[
    ...defaultLegalLinks,
    { label: 'GitHub', href: 'https://github.com/example', external: true },
  ]}
/>
```

## Scope boundaries

- No Impressum page content (that's a dmnctech task)
- No privacy policy content
- No cookie banner
- No i18n (labels are consumer-provided strings)
- No sticky/fixed positioning (consumer controls layout)

## Success criteria

- Footer component in eidotter with tests, stories, registry entry
- Default legal links render when no links prop passed
- All existing eidotter component patterns followed (BEM, tokens, a11y, high contrast, ...props spread)
- Published in next eidotter release
