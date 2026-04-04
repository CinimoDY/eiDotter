---
title: "feat: Component audit — eidotter React vs eiDotter DS V.37 Figma"
type: feat
status: complete
date: 2026-04-04
---

# Component Audit: eidotter React vs eiDotter DS V.37 Figma

## Detailed Comparison

### Button
| Aspect | eidotter React | V.37 Figma |
|---|---|---|
| **Variants** | primary, secondary, ghost, link | Primary, Secondary, Tertiary, Link color, Link gray |
| **Sizes** | small, medium, large | xs, sm, md, lg, xl |
| **States** | disabled, loading | Default, Hover, Focused, Disabled, Loading |
| **Icons** | — | Leading icon, trailing icon, icon-only, icon swap |
| **Extras** | phosphor glow effects, CRT animation | Button destructive (175 variants), Button groups, Close X, Utility |
| **Total variants** | ~12 | 200 (main) + 175 (destructive) + 216 (social) = **659** |
| **Recommendation** | **Adopt V.37** — dramatically more complete. Port phosphor glow effects into V.37 structure. Add `destructive` variant. |

### Badge
| Aspect | eidotter React | V.37 Figma |
|---|---|---|
| **Variants** | default, success, warning, error, info, accent | Gray, Brand, Error, Warning, Success + Slate, Sky, Blue, Indigo, Purple, Pink, Orange |
| **Sizes** | small, medium | sm, md, lg |
| **Types** | — | Pill color, Badge color, Badge modern |
| **Icons** | — | Dot, Country flag, X close, Avatar, Icon trailing/leading, Icon only |
| **Total variants** | ~12 | **666** |
| **Recommendation** | **Adopt V.37** — massively more variants. Map eidotter's semantic variants (success/error/warning) to V.37's color system. |

### Input
| Aspect | eidotter React | V.37 Figma |
|---|---|---|
| **Types** | text input only | Default, Dropdown, Tags, Password, Date/time, Number counter, OTP, File upload |
| **Sizes** | — | sm, md, lg |
| **States** | — | Placeholder, Filled, Focused, Disabled + Destructive mode |
| **Extras** | phosphor glow focus | Textarea variant (42 variants), Verification code (6 variants) |
| **Total variants** | ~4 | **342** |
| **Recommendation** | **Adopt V.37** — eidotter Input is minimal. V.37 covers all form input needs. |

### Modal
| Aspect | eidotter React | V.37 Figma |
|---|---|---|
| **Types** | single modal with optional title/footer | 51 content types (forms, payments, settings, A.I. assistant, etc.) |
| **Breakpoints** | — | Desktop, Mobile |
| **Sub-components** | — | Modal actions (18 variants), Modal header (6 variants) |
| **Total variants** | ~3 | **126** |
| **Recommendation** | **Adopt V.37** — eidotter Modal is bare-bones. V.37 has production-ready patterns. Keep eidotter's portal rendering + animation logic. |

### Tabs
| Aspect | eidotter React | V.37 Figma |
|---|---|---|
| **Types** | single tab bar | Button brand, Button gray, Underline, Line, Button white, Button minimal |
| **Orientation** | horizontal only | Horizontal (40 variants) + Vertical (20 variants) |
| **Sizes** | — | sm, md |
| **Features** | phosphor indicator animation | Full width option, responsive breakpoints |
| **Total variants** | ~5 | **132** |
| **Recommendation** | **Adopt V.37** — keep eidotter's phosphor indicator animation, adopt V.37's variant system. |

### Alert
| Aspect | eidotter React | V.37 Figma |
|---|---|---|
| **Types** | info, success, warning, error | Default, Gray, Error, Warning, Success, Brand |
| **Sizes** | small, large | Floating, Full-width |
| **Breakpoints** | — | Desktop, Mobile |
| **Extras** | phosphor enter animation, dismiss | Notification component (18 variants) — separate from Alert |
| **Total variants** | ~8 | **42** (Alert + Notification) |
| **Recommendation** | **Merge** — eidotter Alert has good animation + dismiss pattern. Adopt V.37's variant structure + add Notification as new component. |

### Checkbox
| Aspect | eidotter React | V.37 Figma |
|---|---|---|
| **Types** | checkbox only | Checkbox + Radio in same component |
| **States** | checked/unchecked | Checked, Indeterminate, Default/Hover/Focused/Disabled |
| **Sizes** | — | sm, md |
| **Features** | phosphor glow toggle | Text label option |
| **Total variants** | ~4 | **112** |
| **Recommendation** | **Adopt V.37** — React Aria makes Checkbox/Radio much better. Keep phosphor glow. |

### Switch (Toggle)
| Aspect | eidotter React | V.37 Figma |
|---|---|---|
| **Types** | single toggle | Default + Slim variants |
| **States** | on/off | Pressed, Default/Hover/Focus/Disabled |
| **Sizes** | — | sm, md |
| **Features** | phosphor glow | Text label option |
| **Total variants** | ~4 | **96** |
| **Recommendation** | **Adopt V.37** — more complete. Keep phosphor glow effect. |

### Tag
| Aspect | eidotter React | V.37 Figma |
|---|---|---|
| **Variants** | default, success, warning, error, info, accent | Single style with icon/action options |
| **Icons** | — | Country flag, Avatar, Dot |
| **Actions** | dismiss | X close, Text only, Count |
| **Features** | phosphor dismiss animation | Checkbox-tag variant |
| **Total variants** | ~12 | **105** |
| **Recommendation** | **Adopt V.37** — more flexible. Map eidotter's semantic colors to V.37 color prop. Keep dismiss animation. |

## Summary: Decision Matrix

| Component | Decision | Effort | Priority |
|---|---|---|---|
| **Button** | Adopt V.37 + port phosphor effects | High | 1 |
| **Badge** | Adopt V.37 | Medium | 2 |
| **Input** | Adopt V.37 | High | 3 |
| **Modal** | Adopt V.37 + keep portal/animation | High | 4 |
| **Checkbox** | Adopt V.37 + React Aria | Medium | 5 |
| **Switch** | Adopt V.37 + React Aria | Medium | 6 |
| **Tabs** | Adopt V.37 + keep indicator animation | Medium | 7 |
| **Tag** | Adopt V.37 + keep dismiss animation | Medium | 8 |
| **Alert** | Merge (keep animations, adopt structure) | Medium | 9 |
| **Breadcrumb** | Adopt V.37 | Low | 10 |
| **Card** | Keep eidotter (V.37 only has card headers) | Low | — |
| **Nav** | Adopt V.37 | High | 11 |
| **Stat** | Adopt V.37 (Metrics) | Low | 12 |
| **Progress** | Adopt V.37 | Low | 13 |
| **Separator** | Adopt V.37 (Content dividers) | Low | 14 |
| **Footer** | Merge (eidotter has DOS footer, V.37 has marketing footer) | Low | 15 |
| **FilterBar** | Adopt V.37 (Filters — new in v8) | Medium | 16 |
| **Accordion** | Review V.37 FAQ sections | Low | 17 |

## eidotter-Specific (No V.37 Equivalent — Keep As-Is)

| Component | Notes |
|---|---|
| **Terminal** | Core eidotter identity — DOS window chrome. No equivalent in any design system. |
| **CommandPrompt** | DOS command line. V.37 has Command menus but conceptually different. |
| **TextScramble** | Phosphor text decode effect — unique to DOS aesthetic. |
| **RetroEffects** | CRT scanlines, vignette, bloom — eidotter signature. |
| **TimelineContainer** | Multi-zoom timeline — eidotter's most complex component. See DMNC-600. |
| **TimelineEntry/List/Node** | Timeline ecosystem — keep and evolve with V.37 tokens. |
| **Chat* (4 components)** | Pure presentational chat. V.37's Messaging is different scope. |
| **InlineExpand** | Inline text expansion — no equivalent. |
| **Icon** | pixelarticons wrapper — keep. |
| **Tokens** | Token display component — keep for Storybook. |

## Key Patterns for Migration

When adopting V.37 components:
1. **Port phosphor glow effects** — add `--shadow-glow-*` on focus/hover/active states
2. **Port CRT animations** — `phosphor-warmup`, `phosphor-energize` keyframes on mount
3. **Keep eidotter prop names** where possible for backward compatibility
4. **Use React Aria** for interactive components (Button, Checkbox, Switch, Tabs, Modal)
5. **Use `cn()` utility** from `src/utils/cn.ts` for Tailwind class merging
6. **Add `data-eidotter` attribute** to distinguish eidotter components from plain V.37

## References

- V.37 Figma file: eiDotter DS V.37 (fileKey: V4tIz3sAMRx7H9wMYeesA6)
- eidotter registry: src/components/registry.ts
- Linear: DMNC-599 (this audit), DMNC-600 (Timeline planning)
