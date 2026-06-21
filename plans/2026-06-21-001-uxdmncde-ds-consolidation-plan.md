# DMNC-1068 — uxdmncde: Consolidate Dual Design System

**Date:** 2026-06-21  
**Type:** implementation  
**Status:** ready-for-review  
**Related:** DMNC-1065 (eidotter consumer upgrade → 0.29)  
**Repo:** CinimoDY/uxdmncde

---

## Problem

uxdmncde (Dom's UX portfolio site) runs two design systems in parallel:

1. **eidotter** — used in `eidotter-demo.tsx` for the component showcase section
2. **shadcn cva Button** — a local `src/components/ui/button.tsx` used in `hero.tsx` and `contact.tsx`

Additional issues surfaced in the 2026-06-16 consumer audit:

- `eidotter-demo.tsx` hardcodes 10 CGA hex values (`#000000`, `#AAAAAA`, `#FFFFFF`, `#55FFFF`, `#FFFF55`) instead of eidotter CGA token classes
- `layout.tsx` imports `eidotter/styles` and `eidotter/tokens.css` with no `data-theme` on any element, so eidotter components receive no color context
- An inline `style={{ "--color-semantic-text-primary": "#AAAAAA" }}` hack tries to compensate
- eidotter is pinned at `^0.15.0`; current release is 0.29 (blocked on DMNC-1065)
- `src/components/ui/badge.tsx` also exists but is not imported anywhere

---

## Decision: Consolidate on eidotter

Delete `src/components/ui/button.tsx` and migrate `hero.tsx` / `contact.tsx` to eidotter's `Button`. Rationale: eidotter is Dom's own DS; the shadcn Button is framework scaffolding with no intentional design relationship to the portfolio aesthetic.

**data-theme scope:** Scope `data-theme="amber"` to the demo `<section>` only — **not** to `<html>`. The rest of the site has its own warm-gray palette (`globals.css` defines `--background`, `--muted-foreground`, etc. used by the footer and non-demo sections). Making the whole site DOS-themed is a separate visual redesign decision, not part of this ticket.

---

## Affected Files (uxdmncde repo)

| File | Change |
|------|--------|
| `package.json` | Upgrade `eidotter ^0.15.0 → ^0.29.0`; remove `@radix-ui/react-slot`, `class-variance-authority` |
| `src/components/ui/button.tsx` | **Delete** |
| `src/components/ui/badge.tsx` | **Delete** (not imported anywhere) |
| `src/components/portfolio/eidotter-demo.tsx` | Replace hex literals with CGA classes; add `data-theme="amber"` to section; remove inline style hack |
| `src/components/portfolio/hero.tsx` | Migrate Button import + adapt `asChild` usage |
| `src/components/portfolio/contact.tsx` | Same Button migration |
| `src/app/globals.css` | No change (warm-gray vars still needed by non-demo sections) |
| `src/app/layout.tsx` | No change (eidotter CSS already imported; no root data-theme) |

---

## Step-by-Step Implementation

### Step 1 — Upgrade eidotter

```diff
// package.json
- "eidotter": "^0.15.0",
+ "eidotter": "^0.29.0",
```

Run `npm install`. Review CHANGELOG for 0.15 → 0.29 breaking changes.

Known API changes visible in the current eidotter-demo.tsx to verify after upgrade:
- `Checkbox` `onChange` prop — confirm it still accepts `(checked: boolean) => void`
- `Badge` variants: `success`, `info`, `warning`, `accent` — confirm all present in v0.29
- `Button` `loading` prop — confirm still supported
- `Progress` `glow` and `showLabel` props — confirm still present
- `Tabs` `tabs` / `activeTab` / `onTabChange` / `variant="pills"` API — verify stable

### Step 2 — Scope eidotter theme to demo section

In `eidotter-demo.tsx`, add `data-theme="amber"` to the outermost `<section>` and remove the inline style hack:

```diff
 <section
   className="py-20 md:py-24 px-6 md:px-8 bg-[#000000]"
   aria-labelledby="eidotter-demo-heading"
-  style={{ "--color-semantic-text-primary": "#AAAAAA" } as React.CSSProperties}
+  data-theme="amber"
 >
```

### Step 3 — Replace hex literals in eidotter-demo.tsx

Map every hex literal to eidotter CGA/semantic token classes:

| Hex value | Context | Replacement |
|-----------|---------|-------------|
| `bg-[#000000]` | section background | `bg-cga-black` |
| `text-[#FFFFFF]` | heading | `text-cga-white` |
| `text-[#AAAAAA]` | body/label text | `text-dos-text-primary` |
| `border-[#AAAAAA]` | card border | `border-dos-border-default` |
| `text-[#55FFFF]` | link / switch label | `text-cga-bright-cyan` |
| `hover:text-[#FFFF55]` | link hover | `hover:text-cga-bright-yellow` |

With `data-theme="amber"` on the section, `text-dos-text-primary` and `border-dos-border-default` resolve to the correct amber palette values automatically.

Full diff (eidotter-demo.tsx):

```diff
 <section
-  className="py-20 md:py-24 px-6 md:px-8 bg-[#000000]"
+  className="py-20 md:py-24 px-6 md:px-8 bg-cga-black"
   aria-labelledby="eidotter-demo-heading"
-  style={{ "--color-semantic-text-primary": "#AAAAAA" } as React.CSSProperties}
+  data-theme="amber"
 >
   ...
   <h2 id="eidotter-demo-heading" className="text-2xl md:text-3xl font-bold mb-4 text-center text-[#FFFFFF]">
+  <h2 id="eidotter-demo-heading" className="text-2xl md:text-3xl font-bold mb-4 text-center text-cga-white">
   ...
-  <p className="text-center text-[#AAAAAA] mb-12">
+  <p className="text-center text-dos-text-primary mb-12">
     ...
-    className="text-[#55FFFF] underline underline-offset-4 hover:text-[#FFFF55] transition-colors"
+    className="text-cga-bright-cyan underline underline-offset-4 hover:text-cga-bright-yellow transition-colors"
   ...
-  <div className="p-6 md:p-8 border border-[#AAAAAA] rounded space-y-6">
+  <div className="p-6 md:p-8 border border-dos-border-default rounded space-y-6">
   ...
   {/* Each section label */}
-  <p className="text-[#AAAAAA] text-xs font-mono mb-3 uppercase tracking-wider">
+  <p className="text-dos-text-primary text-xs font-mono mb-3 uppercase tracking-wider">
   ...
   {/* Switch label and status */}
-  <span className="text-[#AAAAAA] text-sm">Dark mode</span>
+  <span className="text-dos-text-primary text-sm">Dark mode</span>
-  <span className="text-[#55FFFF] text-sm font-mono w-8">
+  <span className="text-cga-bright-cyan text-sm font-mono w-8">
   ...
   {/* Progress row labels */}
-  <span className="text-[#AAAAAA] text-sm w-24">
+  <span className="text-dos-text-primary text-sm w-24">
   ...
   {/* Footer note */}
-  <p className="text-center text-[#AAAAAA] text-sm mt-2 font-mono">
+  <p className="text-center text-dos-text-primary text-sm mt-2 font-mono">
```

### Step 4 — Migrate hero.tsx and contact.tsx to eidotter Button

**Import change:**
```diff
- import { Button } from "@/components/ui/button";
+ import { Button } from "eidotter";
```

**`asChild` + anchor adaptation:**

Eidotter's Button wraps React Aria's `AriaButton` which does not support `asChild`. Two places use this pattern:

1. Email CTA (`<Button asChild><a href="mailto:...">`) — replace with `onPress`:
```tsx
<Button
  variant="primary"
  size="lg"
  onPress={() => { window.location.href = `mailto:${profile.email}`; }}
>
  <Mail className="size-4" />
  {t(sectionHeadings.getInTouch)}
</Button>
```

2. LinkedIn icon button (`<Button variant="outline" size="icon-lg" asChild><a href={...}>`) — render as a native anchor with eidotter class styling, or use `onPress`:
```tsx
<Button
  variant="secondary"
  size="lg"
  onPress={() => window.open(profile.linkedin, '_blank', 'noopener,noreferrer')}
  aria-label={locale === "de" ? "LinkedIn (öffnet in neuem Tab)" : "LinkedIn (opens in new tab)"}
>
  <Linkedin className="size-4" />
</Button>
```

**Variant/size mapping:**

| Shadcn prop | Eidotter equivalent | Notes |
|-------------|---------------------|-------|
| `variant="default"` (implicit) | `variant="primary"` | |
| `variant="outline"` | `variant="secondary"` | Closest visual match |
| `size="lg"` | `size="lg"` | Direct match (40px height) |
| `size="icon-lg"` | `size="lg"` | eidotter has no icon-only size; use `size="lg"` + single icon child |

Apply same changes in `contact.tsx` (identical button usage).

### Step 5 — Delete shadcn components

```bash
rm src/components/ui/button.tsx
rm src/components/ui/badge.tsx
```

If `src/components/ui/` is now empty, remove the directory too.

### Step 6 — Remove unused dependencies

After Step 5, `@radix-ui/react-slot` and `class-variance-authority` are no longer used.

```diff
// package.json — dependencies
- "@radix-ui/react-slot": "^1.2.4",
- "class-variance-authority": "^0.7.1",
```

Keep: `clsx` (used in `src/lib/utils.ts`), `tailwind-merge` (same), `lucide-react` (still used for Mail/Linkedin icons).

Run `npm install` to update `package-lock.json`.

### Step 7 — Smoke-test checklist

Before opening PR in uxdmncde:
- [ ] `npm run build` passes with zero type errors
- [ ] Hero CTA email button fires correctly (mailto opens)
- [ ] LinkedIn icon button opens in new tab
- [ ] eidotter-demo section renders with amber phosphor theme (amber text on black background)
- [ ] No eidotter components outside the demo section adopt DOS styling
- [ ] Footer `text-muted-foreground` still resolves correctly (warm gray)
- [ ] Accessibility: focus-visible rings visible on all interactive elements

---

## Open Questions

1. **`size="icon-lg"` LinkedIn button**: shadcn renders a square icon-only button. Eidotter's `size="lg"` is wider. If the icon-only square look matters, a custom wrapper or CSS override on the eidotter button is needed.

2. **`lucide-react` icons in eidotter context**: eidotter's own icon system uses `pixelarticons`. Lucide Mail/Linkedin in the hero/contact sections are stylistically inconsistent but functionally fine. Consider switching to eidotter `<Icon>` if matching DOS aesthetic is desired (separate ticket).

3. **Full-site DOS theme**: If the intent is eventually to make the whole portfolio DOS-themed, that's a `layout.tsx` `data-theme="amber"` change plus a full rewrite of `globals.css`. Scoped for a separate ticket.

---

## Not in scope

- Replacing `lucide-react` icons with eidotter's icon system
- Adding DE/EN localization to button aria-labels
- Full-site DOS visual redesign
- Changes to Datenschutz/Impressum pages
