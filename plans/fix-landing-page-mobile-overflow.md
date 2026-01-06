# fix: Landing Page Mobile Overflow & Link Corrections

## Overview

Fix mobile responsiveness issues on eidotter.com landing page and correct misleading links in the source files.

## Problems Found

### 1. Mobile Horizontal Scroll (Critical)

**Symptom:** On 375px viewport, the page has 142px horizontal overflow causing unwanted scrolling.

**Root Cause Elements:**
- `.install-code` - overflows by 142px
- `.install-steps` - overflows by 142px
- `<pre><code>` block - long import line doesn't wrap

**Screenshot evidence:** The install section code block and step text extend past viewport edge.

### 2. Source File Link Mismatch (Minor)

The live site correctly links to `storybook.eidotter.com`, but source files still have outdated `eidotter.com/docs` links:

| File | Line | Current | Should Be |
|------|------|---------|-----------|
| `docs/index.html` | 1120 | `eidotter.com/docs` | `storybook.eidotter.com` |
| `docs/index.html` | 1150 | `eidotter.com/docs` | `storybook.eidotter.com` |
| `docs/index.html` | 1464 | `eidotter.com/docs` | `storybook.eidotter.com` |
| `docs/index.html` | 1481 | `eidotter.com/docs` | `storybook.eidotter.com` |
| `public/index.html` | same lines | same issue | same fix |

### 3. Component Count (Verified OK)

"16 components" claim is accurate:
- Accordion, Alert, Badge, Breadcrumb, Button, Card, Checkbox, CommandPrompt, Icon, Input, Modal, Progress, Switch, Tabs, Terminal, TimelineNode = 16 actual components
- (Tokens and RetroEffects are utilities, not components)

## Acceptance Criteria

- [ ] No horizontal scroll on 375px mobile viewport
- [ ] Install section code block scrolls internally if needed, doesn't overflow page
- [ ] Install step text wraps properly within container
- [ ] All `eidotter.com/docs` links updated to `storybook.eidotter.com`
- [ ] Both `docs/index.html` and `public/index.html` are in sync

## Implementation

### Phase 1: Fix Mobile Overflow

Add CSS to the `@media (max-width: 768px)` section in both HTML files:

```css
/* Fix install section overflow */
.install-code {
  max-width: 100%;
  overflow-x: auto;
}

.install-code pre {
  min-width: 0;
}

.install-step-content {
  min-width: 0;
  word-wrap: break-word;
}

.install-step-content code {
  word-break: break-all;
}
```

### Phase 2: Update Links

Replace all occurrences of `https://eidotter.com/docs` with `https://storybook.eidotter.com` in:
- `docs/index.html` (4 occurrences)
- `public/index.html` (4 occurrences)

Also update button labels for consistency:
- Line 1121: Change "Docs" to "Storybook"
- Line 1465: Change "Read the Docs" to "Browse Components"
- Line 1481: Change "Documentation" to "Storybook"

## Files to Modify

1. `/mnt/d/Coding/eidotter/docs/index.html`
2. `/mnt/d/Coding/eidotter/public/index.html`

## Testing

1. Open https://eidotter.com in browser
2. Use DevTools to resize to 375x812 (iPhone viewport)
3. Verify no horizontal scroll exists
4. Scroll to install section and verify code block is contained
5. Click all navigation/CTA links to verify they go to storybook.eidotter.com
