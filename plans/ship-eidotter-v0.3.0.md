# Ship eidotter Design System v0.3.0

## Overview

Release eidotter v0.3.0 with 6 new components, accessibility compliance, updated documentation, custom domain hosting, and public announcement.

**GitHub Issues:**
- #8: Accessibility & Usability Audit
- #9: Update Documentation
- #10: Create Landing Page for eidotter.com
- #11: Write LinkedIn Announcement Post

---

## Phase 1: Accessibility Audit (#8)

### 1.1 Configure Storybook A11y Testing

**File:** `/mnt/d/Coding/eidotter/.storybook/preview.ts`

Add accessibility test configuration:

```typescript
parameters: {
  a11y: {
    config: {
      rules: [
        { id: 'color-contrast', enabled: true },
      ],
    },
    options: {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa', 'wcag21aa'],
      },
    },
  },
},
```

### 1.2 Component Audit Checklist

Run Storybook locally and check A11y panel for each component:

| Component | Violations | Passes | Action Required |
|-----------|------------|--------|-----------------|
| Accordion | | | |
| Alert | | | |
| Badge | | | |
| Breadcrumb | | | |
| Button | 0 | 11 | None |
| Card | | | |
| Checkbox | | | |
| CommandPrompt | | | |
| Icon | | | |
| Input | 0 | 12 | None |
| Progress | | | |
| RetroEffects | | | |
| Switch | | | |
| Tabs | | | |
| Terminal | | | |
| TimelineNode | | | |

### 1.3 WCAG 2.1 AA Quick Checks

For each component verify:
- [ ] Text contrast >= 4.5:1
- [ ] UI element contrast >= 3:1 (borders, focus rings)
- [ ] Keyboard accessible (Tab, Enter, Space, Escape)
- [ ] Focus visible and clear
- [ ] ARIA labels correct
- [ ] No color-only indicators
- [ ] Works at 200% zoom

---

## Phase 2: Documentation Updates (#9)

### 2.1 Update Version Numbers

**Files to update:**

1. `/mnt/d/Coding/eidotter/package.json` - version: "0.3.0"
2. `/mnt/d/Coding/eidotter/src/index.ts` - version constant

### 2.2 Update CHANGELOG.md

**File:** `/mnt/d/Coding/eidotter/CHANGELOG.md`

Add entries for v0.2.1 and v0.3.0:

```markdown
## [0.3.0] - 2025-01-03

### Added
- Badge component with variant support
- Breadcrumb component for navigation
- RetroEffects component (scanlines, noise, CRT effects)
- Switch component for toggle states
- Tabs component for tabbed interfaces
- TimelineNode component (extracted from lifelines)
- Storybook accessibility addon integration
- Custom domain: storybook.eidotter.com

### Changed
- Token pipeline upgraded to DTCG format
- Amber theme unified to single color value
- JetBrains Mono as primary font

### Fixed
- Checkbox onChange when disabled
- Alert semantic tokens
- Component amber theme color consistency

## [0.2.1] - 2024-12-XX

### Fixed
- Shadow transform in token pipeline
- Minor component styling issues
```

### 2.3 Update README.md

**File:** `/mnt/d/Coding/eidotter/README.md`

Update component count from 11 to 16 in header badge.

Update component table to include:
- Badge
- Breadcrumb
- RetroEffects
- Switch
- Tabs
- TimelineNode

### 2.4 Update ROADMAP.md

**File:** `/mnt/d/Coding/eidotter/ROADMAP.md`

Mark completed:
- [x] Checkbox
- [x] Badge
- [x] Progress
- [x] Tabs
- [x] Breadcrumb

---

## Phase 3: Deploy Storybook (#10)

### 3.1 Custom Domain Setup

**Already completed:**
- [x] CNAME file created: `public/CNAME` with `storybook.eidotter.com`
- [x] GitHub Pages custom domain configured
- [x] Storybook base URL updated (removed `/eiDotter/`)

**User action required:**
- [ ] Add CNAME record in Cloudflare: `storybook` -> `cinimody.github.io`

### 3.2 Build and Deploy

```bash
# Build tokens first
npm run build-tokens

# Build Storybook
npm run build-storybook

# Commit and push to trigger GitHub Actions deploy
git add .
git commit -m "feat: ship v0.3.0 with 6 new components and custom domain"
git push origin main
```

### 3.3 Verify Deployment

After Cloudflare DNS propagates (usually 1-5 minutes):
- [ ] Visit https://storybook.eidotter.com
- [ ] Verify HTTPS working
- [ ] Check all components render
- [ ] Test A11y panel in browser

---

## Phase 4: Landing Page (eidotter.com)

### 4.1 Options

**Option A: Redirect to Storybook**
- Simple: eidotter.com redirects to storybook.eidotter.com
- Cloudflare redirect rule

**Option B: Simple Landing Page**
- Hero with value prop
- Component preview
- Link to Storybook docs
- GitHub/npm links

**Option C: Full Documentation Site**
- Next.js/Astro static site
- Getting started guide
- Component API docs
- Design principles

**Recommendation:** Start with Option A (redirect), enhance later.

### 4.2 Cloudflare Redirect Setup

```
URL: eidotter.com/*
Redirect to: https://storybook.eidotter.com/$1
Status: 301 (Permanent)
```

---

## Phase 5: LinkedIn Announcement (#11)

### 5.1 Draft Post

```
After building UI components for internal projects,
I'm sharing our design system.

Introducing eidotter - a DOS-themed React component
library for developers who appreciate retro aesthetics
with modern DX.

What makes it different:
- Authentic CGA color palette (the real 16 colors)
- Accessibility-first: WCAG 2.1 AA compliant
- TypeScript + Storybook + design tokens

16 components included:
Button, Input, Card, Alert, Terminal, Checkbox,
Accordion, Progress, Tabs, Badge, Switch, Breadcrumb,
TimelineNode, and more.

Plus a Tailwind preset with CGA colors.

Check it out:
- Docs: https://storybook.eidotter.com
- GitHub: https://github.com/CinimoDY/eiDotter
- npm: npm install eidotter

What retro aesthetic would you love to see
in a modern component library?

#OpenSource #DesignSystems #ReactJS #RetroComputing #WebDev
```

### 5.2 Visual Asset

Create a screenshot or GIF showing:
- Terminal component with amber glow
- CGA color palette
- Component variety

---

## Release Checklist

### Pre-Release
- [ ] All a11y violations fixed (0 violations)
- [ ] TypeScript types complete
- [ ] Storybook stories for all 16 components
- [ ] CHANGELOG.md updated
- [ ] README.md component table updated
- [ ] Version bumped to 0.3.0

### Publishing
- [ ] npm run build (verify no errors)
- [ ] npm run build-storybook
- [ ] git tag v0.3.0
- [ ] git push origin main --tags
- [ ] Verify Storybook deploys to storybook.eidotter.com

### Announcement
- [ ] LinkedIn post published
- [ ] GitHub Release created with release notes

---

## Files Modified

| File | Change |
|------|--------|
| `package.json` | version: "0.3.0" |
| `src/index.ts` | version constant |
| `CHANGELOG.md` | v0.2.1 and v0.3.0 entries |
| `README.md` | Component count and table |
| `ROADMAP.md` | Mark completed items |
| `.storybook/main.js` | Remove base URL for custom domain |
| `.storybook/preview.ts` | Add a11y configuration |
| `public/CNAME` | storybook.eidotter.com |

---

## References

- [Storybook A11y Addon](https://storybook.js.org/docs/writing-tests/accessibility-testing)
- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [Keep a Changelog](https://keepachangelog.com/)
- [GitHub Pages Custom Domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
