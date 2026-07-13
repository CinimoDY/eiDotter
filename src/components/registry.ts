export type ProjectId =
  | 'eidotter' | 'spacewar' | 'rizomorf' | 'pomodoke-calendar'
  | 'keepcoin' | 'steuerdash' | 'sella' | 'lifelines' | 'betamorf'
  | 'dmnctech' | 'tracker';

export interface ProjectInfo {
  displayName: string;
  url?: string;
}

export const projects: Record<ProjectId, ProjectInfo> = {
  eidotter:            { displayName: 'eiDotter' },
  spacewar:            { displayName: 'Spacewar!' },
  rizomorf:            { displayName: 'rizomorf' },
  'pomodoke-calendar': { displayName: 'PomoDoke Calendar' },
  keepcoin:            { displayName: 'KeepCoin' },
  steuerdash:          { displayName: 'Steuerdash' },
  sella:               { displayName: 'sella' },
  lifelines:           { displayName: 'Lifelines' },
  betamorf:            { displayName: 'betamorf' },
  dmnctech:            { displayName: 'dmnc.tech', url: 'https://dmnc.tech' },
  tracker:             { displayName: 'Tracker', url: 'https://tracker.dmnc.tech' },
};

// ---------------------------------------------------------------------------
// Variant metadata
// ---------------------------------------------------------------------------

export interface VariantMeta {
  /** Human-readable description of this variant */
  description?: string;
  /** Version when this variant was introduced */
  since?: string;
  /** Version when this variant was deprecated (still functional) */
  deprecated?: string;
  /** Which consumers actively use this variant (best-effort) */
  usedBy?: ProjectId[];
}

// ---------------------------------------------------------------------------
// Platform support
// ---------------------------------------------------------------------------

export type PlatformId = 'react' | 'swiftui' | 'spritekit';

export interface PlatformMeta {
  /** Relative path from repo root to the platform implementation */
  path?: string;
  /** Implementation status on this platform */
  status: 'canonical' | 'native' | 'token-only' | 'planned';
  note?: string;
}

// ---------------------------------------------------------------------------
// Per-component changelog
// ---------------------------------------------------------------------------

export interface ChangelogEntry {
  version: string;
  type: 'added' | 'changed' | 'deprecated' | 'removed';
  description: string;
}

// ---------------------------------------------------------------------------
// Component metadata
// ---------------------------------------------------------------------------

export interface ComponentMeta {
  origin: ProjectId;
  consumers: ProjectId[];
  since?: string;
  originNote?: string;
  /** Variant metadata. Keys use "prop:value" format, e.g. "variant:primary", "size:small" */
  variants?: Record<string, VariantMeta>;
  platforms?: Partial<Record<PlatformId, PlatformMeta>>;
  changelog?: ChangelogEntry[];
}

// ---------------------------------------------------------------------------
// Registry data
// ---------------------------------------------------------------------------

export const componentRegistry: Record<string, ComponentMeta> = {
  Alert: {
    origin: 'eidotter',
    consumers: ['rizomorf', 'steuerdash'],
    since: '0.2.0',
    variants: {
      'type:info':    { description: 'Informational message', since: '0.2.0', usedBy: ['rizomorf'] },
      'type:success': { description: 'Success confirmation', since: '0.2.0', usedBy: ['steuerdash'] },
      'type:warning': { description: 'Warning notice', since: '0.2.0', usedBy: ['rizomorf', 'steuerdash'] },
      'type:error':   { description: 'Error message', since: '0.2.0', usedBy: ['steuerdash'] },
      'size:small':   { description: 'Compact alert for inline contexts', since: '0.2.0' },
      'size:large':   { description: 'Full-width alert with icon', since: '0.2.0' },
    },
    platforms: {
      react:    { path: 'src/components/Alert', status: 'canonical' },
      swiftui:  { status: 'planned' },
    },
    changelog: [
      { version: '0.8.0', type: 'changed', description: 'Design-craft animation polish with phosphor enter effects' },
      { version: '0.7.0', type: 'changed', description: 'Replace text-primary with cga-amber for theme consistency' },
      { version: '0.6.0', type: 'changed', description: 'Fix icon alignment and add prefers-contrast support' },
      { version: '0.4.0', type: 'changed', description: 'Add phosphor glow effects' },
      { version: '0.2.0', type: 'added', description: 'Initial Alert component with info/success/warning/error types' },
    ],
  },

  Accordion: {
    origin: 'eidotter',
    consumers: ['rizomorf'],
    since: '0.2.0',
    originNote: 'Collapsible section with CSS grid expand/collapse — always-in-DOM, transitions grid-template-rows',
    platforms: {
      react:   { path: 'src/components/Accordion', status: 'canonical' },
      swiftui: { status: 'planned' },
    },
    changelog: [
      { version: '0.30.0', type: 'changed', description: 'A11y keyboard focus fixes for accordion trigger' },
      { version: '0.19.0', type: 'changed', description: 'Remove 500px expand cap — animate grid-template-rows to natural height' },
      { version: '0.16.0', type: 'changed', description: 'Migrate to Tailwind-first (Wave 3 — Accordion, Footer, Tabs, FilterBar)' },
      { version: '0.9.0',  type: 'changed', description: 'Replace text-primary with cga-amber for theme consistency' },
      { version: '0.8.0',  type: 'changed', description: 'Design-craft animation polish with phosphor enter effects' },
      { version: '0.2.0',  type: 'added',   description: 'Initial Accordion (Section) — collapsible section, inert attribute, reduced-motion safe' },
    ],
  },

  AccordionFill: {
    origin: 'eidotter',
    consumers: ['rizomorf'],
    since: '0.4.0',
    originNote: 'Convenience wrapper around Section — renders a list of sections from a data array',
    platforms: {
      react:   { path: 'src/components/Accordion', status: 'canonical' },
      swiftui: { status: 'planned' },
    },
    changelog: [
      { version: '0.16.0', type: 'changed', description: 'Tailwind-first pass alongside Accordion migration' },
      { version: '0.4.0',  type: 'added',   description: 'Initial AccordionFill — array-driven Section list' },
    ],
  },

  Badge: {
    origin: 'eidotter',
    consumers: ['rizomorf', 'steuerdash'],
    since: '0.3.0',
    variants: {
      'variant:default': { description: 'Neutral badge with muted styling', since: '0.3.0', usedBy: ['rizomorf'] },
      'variant:success': { description: 'Green success indicator', since: '0.3.0', usedBy: ['steuerdash'] },
      'variant:warning': { description: 'Amber warning indicator', since: '0.3.0', usedBy: ['steuerdash'] },
      'variant:error':   { description: 'Red error/critical indicator', since: '0.3.0', usedBy: ['steuerdash'] },
      'variant:info':    { description: 'Blue informational indicator', since: '0.3.0' },
      'variant:accent':  { description: 'Theme accent color badge', since: '0.3.0', usedBy: ['rizomorf'] },
      'size:small':      { description: 'Compact inline badge', since: '0.3.0' },
      'size:medium':     { description: 'Standard badge size', since: '0.3.0' },
    },
    platforms: {
      react:    { path: 'src/components/Badge', status: 'canonical' },
      swiftui:  { status: 'planned' },
    },
    changelog: [
      { version: '0.8.0', type: 'changed', description: 'Design-craft animation polish with phosphor enter keyframes' },
      { version: '0.7.0', type: 'changed', description: 'Replace text-primary with cga-amber' },
      { version: '0.5.0', type: 'changed', description: 'Fix text vertical alignment for pixel fonts' },
      { version: '0.3.0', type: 'added', description: 'Initial Badge component for status indicators' },
    ],
  },

  Breadcrumb: {
    origin: 'rizomorf',
    consumers: ['rizomorf'],
    since: '0.3.0',
    originNote: 'Trail navigation with configurable separator and optional back-arrow',
    platforms: {
      react:   { path: 'src/components/Breadcrumb', status: 'canonical' },
      swiftui: { status: 'planned' },
    },
    changelog: [
      { version: '0.39.0', type: 'changed', description: 'Sanitize href via shared isSafeHref — unsafe schemes (javascript:, data:, …) render the label without an anchor' },
      { version: '0.16.0', type: 'changed', description: 'Migrate to Tailwind-first (Wave 2 — Separator, Stat, Breadcrumb, Progress)' },
      { version: '0.9.0',  type: 'changed', description: 'Fix trail links invisible on dark backgrounds' },
      { version: '0.3.0',  type: 'added',   description: 'Initial Breadcrumb — trail array, currentLabel, separator, showBackArrow' },
    ],
  },

  Button: {
    origin: 'eidotter',
    consumers: ['spacewar', 'rizomorf', 'pomodoke-calendar', 'steuerdash'],
    since: '0.2.0',
    variants: {
      'variant:primary':   { description: 'Primary CTA with amber background', since: '0.2.0', usedBy: ['spacewar', 'rizomorf', 'pomodoke-calendar', 'steuerdash'] },
      'variant:secondary': { description: 'Secondary action with border only', since: '0.2.0', usedBy: ['rizomorf', 'steuerdash'] },
      'variant:ghost':     { description: 'Minimal button with hover reveal', since: '0.2.0', usedBy: ['rizomorf'] },
      'variant:link':      { description: 'Inline link-style button', since: '0.2.0', usedBy: ['rizomorf'] },
      'size:small':        { description: 'Compact 1.5rem min-height', since: '0.2.0' },
      'size:medium':       { description: 'Standard 2rem min-height', since: '0.2.0' },
      'size:large':        { description: 'Prominent 2.5rem min-height', since: '0.2.0' },
    },
    platforms: {
      react:    { path: 'src/components/Button', status: 'canonical' },
      swiftui:  { path: 'platforms/swiftui/Sources/EiDotterUI/DOSButton.swift', status: 'planned', note: 'POC with primary variant only — not yet production-ready' },
      spritekit: { status: 'token-only', note: 'Spacewar uses tokens only, no UIKit/SwiftUI button' },
    },
    changelog: [
      { version: '0.11.0', type: 'changed', description: 'Convert font-size to rem tokens for WCAG SC 1.4.4' },
      { version: '0.8.0', type: 'changed', description: 'Design-craft animation polish across all variants' },
      { version: '0.7.0', type: 'changed', description: 'Increase font size and weight for readability' },
      { version: '0.6.0', type: 'changed', description: 'Add phosphor warmup/energize keyframes to all variants' },
      { version: '0.5.0', type: 'changed', description: 'Fix secondary label visibility in pressed state' },
      { version: '0.4.0', type: 'changed', description: 'Add CRT phosphor interaction states for primary variant' },
      { version: '0.2.0', type: 'added', description: 'Initial Button with primary/secondary/ghost/link variants' },
    ],
  },

  Card: {
    origin: 'eidotter',
    consumers: ['rizomorf', 'steuerdash'],
    since: '0.3.0',
    variants: {
      'variant:default':     { description: 'Standard card with subtle border', since: '0.3.0', usedBy: ['rizomorf', 'steuerdash'] },
      'variant:elevated':    { description: 'Raised card with drop shadow', since: '0.3.0', usedBy: ['steuerdash'] },
      'variant:bordered':    { description: 'Strong border emphasis', since: '0.3.0' },
      'variant:glow':        { description: 'Phosphor glow border effect', since: '0.4.0', usedBy: ['rizomorf'] },
      'variant:interactive': { description: 'Hover-reactive card for clickable surfaces', since: '0.4.0', usedBy: ['rizomorf'] },
      'variant:minimal':     { description: 'Borderless content container', since: '0.4.0' },
      'variant:callout':     { description: 'Highlighted callout with accent border', since: '0.4.0' },
    },
    platforms: {
      react:   { path: 'src/components/Card', status: 'canonical' },
      swiftui: { status: 'planned' },
    },
    changelog: [
      { version: '0.11.0', type: 'changed', description: 'Convert font-size to rem tokens for WCAG SC 1.4.4' },
      { version: '0.8.0', type: 'changed', description: 'Design-craft animation polish with phosphor enter effects' },
      { version: '0.7.0', type: 'changed', description: 'Replace text-primary with cga-amber' },
      { version: '0.4.0', type: 'added', description: 'Add glow, interactive, minimal, callout variants' },
      { version: '0.4.0', type: 'changed', description: 'Add phosphor glow effects and amber dim header background' },
      { version: '0.3.0', type: 'added', description: 'Initial Card with default/elevated/bordered variants' },
    ],
  },

  Checkbox: {
    origin: 'eidotter',
    consumers: ['steuerdash'],
    since: '0.3.0',
    variants: {
      'size:sm': { description: 'Compact 16px checkbox for dense forms', since: '0.16.0' },
      'size:md': { description: 'Standard 20px checkbox', since: '0.3.0', usedBy: ['steuerdash'] },
    },
    platforms: {
      react:   { path: 'src/components/Checkbox', status: 'canonical' },
      swiftui: { status: 'planned' },
    },
    changelog: [
      { version: '0.30.0', type: 'changed', description: 'A11y: remediate Phase 1 audit defects + high-contrast glow gaps' },
      { version: '0.19.0', type: 'changed', description: 'Replace hardcoded font-size pixels with V.37 dos tokens' },
      { version: '0.16.0', type: 'changed', description: 'Migrate to React Aria + Tailwind-first (Wave 1); add size:sm variant' },
      { version: '0.3.0',  type: 'added',   description: 'Initial Checkbox — controlled/uncontrolled, indeterminate; BEM CSS implementation' },
    ],
  },

  CommandPrompt: {
    origin: 'eidotter',
    consumers: ['rizomorf'],
    since: '0.3.0',
    originNote: 'DOS command-line input — blinking cursor, configurable prompt string, onCommand callback',
    platforms: {
      react: { path: 'src/components/CommandPrompt', status: 'canonical' },
    },
    changelog: [
      { version: '0.30.0', type: 'changed', description: 'A11y keyboard focus fixes' },
      { version: '0.18.0', type: 'changed', description: 'Migrate BEM to Tailwind-first; switch to Flexi IBM VGA font' },
      { version: '0.3.0',  type: 'added',   description: 'Initial CommandPrompt — prompt prop, onCommand, autoFocus, disabled' },
    ],
  },

  Icon: {
    origin: 'eidotter',
    consumers: ['rizomorf'],
    since: '0.13.0',
    originNote: 'Thin wrapper around pixelarticons (MIT) + custom PixelX for Close — 12 public names, ICON_MAP',
    variants: {
      'name:Info':        { description: 'Informational circle-i', since: '0.13.0', usedBy: ['rizomorf'] },
      'name:Warning':     { description: 'Warning triangle', since: '0.13.0', usedBy: ['rizomorf'] },
      'name:Error':       { description: 'Error octagon', since: '0.13.0' },
      'name:Done':        { description: 'Checkmark (shares Check glyph)', since: '0.13.0' },
      'name:Check':       { description: 'Checkmark', since: '0.13.0' },
      'name:Close':       { description: 'Custom pixel-art X mark (no pixelarticons glyph)', since: '0.19.0', usedBy: ['rizomorf'] },
      'name:Chevron Up':  { description: 'Up caret', since: '0.13.0' },
      'name:Chevron Down':{ description: 'Down caret', since: '0.13.0' },
      'name:App':         { description: 'Grid/app launcher', since: '0.13.0' },
      'name:Cancel':      { description: 'Minus glyph — window minimize control', since: '0.13.0' },
      'name:Fullscreen':  { description: 'Expand to fullscreen', since: '0.13.0' },
      'name:Add':         { description: 'Plus / add action', since: '0.13.0' },
      'size:L':           { description: 'Large — 56 × 56 px', since: '0.13.0', usedBy: ['rizomorf'] },
      'size:S':           { description: 'Small — 24 × 24 px', since: '0.13.0' },
    },
    platforms: {
      react: { path: 'src/components/Icon', status: 'canonical' },
    },
    changelog: [
      { version: '0.30.0', type: 'changed', description: 'A11y: fix aria-prohibited-attr on Icon (Phase 1 audit defect)' },
      { version: '0.30.0', type: 'changed', description: 'Icon inherits color from context instead of hardcoding amber' },
      { version: '0.19.0', type: 'added',   description: 'Custom pixel-art X mark for Close (pixelarticons v2 has no standalone X glyph)' },
      { version: '0.18.0', type: 'changed', description: 'Swap @untitledui-pro/icons for pixelarticons (MIT) — license compliance' },
      { version: '0.13.0', type: 'added',   description: 'Initial Icon component — ICON_MAP with 12 public names, size L/S' },
    ],
  },

  Input: {
    origin: 'eidotter',
    consumers: ['steuerdash'],
    since: '0.3.0',
    variants: {
      'variant:default': { description: 'Standard text input with amber focus border', since: '0.3.0', usedBy: ['steuerdash'] },
      'variant:error':   { description: 'Error state — red border, errorMessage slot', since: '0.3.0', usedBy: ['steuerdash'] },
    },
    platforms: {
      react:   { path: 'src/components/Input', status: 'canonical' },
      swiftui: { status: 'planned' },
    },
    changelog: [
      { version: '0.17.0', type: 'changed', description: 'Migrate to React Aria TextField (Wave 5)' },
      { version: '0.16.0', type: 'changed', description: 'Migrate to Tailwind-first (Wave 4 — Input, Modal, Nav)' },
      { version: '0.9.0',  type: 'changed', description: 'Replace text-primary with cga-amber' },
      { version: '0.3.0',  type: 'added',   description: 'Initial Input — label, description, errorMessage, isRequired' },
    ],
  },
  Lightbox:      { origin: 'eidotter', consumers: ['dmnctech'], since: '0.22.0', originNote: 'Fullscreen image viewer extending Modal pattern. Keyboard nav, prev/next, counter, swipe.' },
  Modal: {
    origin: 'eidotter',
    consumers: ['pomodoke-calendar'],
    since: '0.3.0',
    originNote: 'DOS-styled dialog built on React Aria ModalOverlay/Modal/Dialog — focus trap, Esc to close, backdrop',
    platforms: {
      react:   { path: 'src/components/Modal', status: 'canonical' },
      swiftui: { status: 'planned' },
    },
    changelog: [
      { version: '0.18.0', type: 'changed', description: 'Normalize event handlers; replace raw <button> with AriaButton for close control' },
      { version: '0.17.0', type: 'changed', description: 'Migrate to React Aria ModalOverlay/Modal/Dialog (Wave 5)' },
      { version: '0.16.0', type: 'changed', description: 'Migrate to Tailwind-first (Wave 4 — Input, Modal, Nav)' },
      { version: '0.3.0',  type: 'added',   description: 'Initial Modal — isOpen, onOpenChange, title, footer slot' },
    ],
  },

  Progress: {
    origin: 'eidotter',
    consumers: ['steuerdash'],
    since: '0.3.0',
    variants: {
      'variant:default': { description: 'Amber progress bar', since: '0.3.0', usedBy: ['steuerdash'] },
      'variant:success': { description: 'Green completion indicator', since: '0.3.0' },
      'variant:warning': { description: 'Amber warning progress', since: '0.3.0' },
      'variant:error':   { description: 'Red error/failed progress', since: '0.3.0' },
      'size:sm':         { description: 'Compact single-row bar', since: '0.16.0' },
      'size:md':         { description: 'Standard bar height', since: '0.3.0', usedBy: ['steuerdash'] },
      'size:lg':         { description: 'Tall bar for prominent display', since: '0.16.0' },
      'trackStyle:block':    { description: 'Solid block fill (default)', since: '0.3.0', usedBy: ['steuerdash'] },
      'trackStyle:bordered': { description: 'Outline bar with fill inside', since: '0.3.0' },
      'trackStyle:gradient': { description: 'Gradient fill for smooth visual', since: '0.3.0' },
    },
    platforms: {
      react:   { path: 'src/components/Progress', status: 'canonical' },
      swiftui: { status: 'planned' },
    },
    changelog: [
      { version: '0.16.0', type: 'changed', description: 'Migrate to Tailwind-first (Wave 2); deprecate size aliases small/medium/large → sm/md/lg' },
      { version: '0.3.0',  type: 'added',   description: 'Initial Progress — blocks character cells, indeterminate, showLabel, glow prop' },
    ],
  },

  RetroEffects: {
    origin: 'spacewar',
    consumers: ['spacewar', 'rizomorf'],
    since: '0.3.0',
    originNote: 'CRT scanline/glow effects from Spacewar! — compositor-only, prefers-reduced-motion safe',
    platforms: {
      react:     { path: 'src/components/RetroEffects', status: 'canonical' },
      spritekit: { status: 'planned', note: 'Spacewar uses CRT shader natively; component is React-web-only' },
    },
    changelog: [
      { version: '0.30.0', type: 'added',   description: 'bootOnce — gate CGA turn-on to once per browser tab/session via sessionStorage' },
      { version: '0.28.0', type: 'added',   description: 'boot prop — CGA monitor turn-on sequence on mount (~650ms); onBootComplete callback' },
      { version: '0.18.0', type: 'changed', description: 'Migrate BEM to Tailwind-first' },
      { version: '0.8.0',  type: 'changed', description: 'Align CRT animation values with design-craft spec' },
      { version: '0.3.0',  type: 'added',   description: 'Initial RetroEffects — scanlines, glow, flicker, bloom, intensity, powered' },
    ],
  },
  Select: {
    origin: 'steuerdash',
    consumers: ['steuerdash'],
    since: '0.36.0',
    originNote: 'DOS-styled dropdown. MVP was a native <select> ported from Steuerdash; rebuilt on React Aria Select/ComboBox in DMNC-593 with default/searchable/multi modes',
    variants: {
      'mode:default':    { description: 'Single-select — React Aria Select (button + popover + listbox)', since: '0.38.0', usedBy: ['steuerdash'] },
      'searchable:true': { description: 'Type-to-filter ComboBox single-select', since: '0.38.0' },
      'multiple:true':   { description: 'Multi-select listbox; value/onChange use string arrays', since: '0.38.0' },
      'variant:error':   { description: 'Invalid state — red border + errorMessage slot', since: '0.38.0' },
      'size:sm':         { description: 'Compact trigger (28px min-height)', since: '0.38.0' },
      'size:md':         { description: 'Standard trigger (32px min-height)', since: '0.38.0', usedBy: ['steuerdash'] },
      'size:lg':         { description: 'Tall trigger (40px min-height)', since: '0.38.0' },
    },
    platforms: {
      react:   { path: 'src/components/Select', status: 'canonical' },
      swiftui: { status: 'planned' },
    },
    changelog: [
      { version: '0.38.0', type: 'changed', description: 'Rebuild on React Aria (Select/ComboBox/ListBox) with phosphor glow; add searchable + multiple modes, label/description/error chrome, sizes. Backward-compatible value/options/onChange API (DMNC-593)' },
      { version: '0.36.0', type: 'added',   description: 'Initial Select — native <select> MVP ported from Steuerdash (DMNC-860)' },
    ],
  },
  Skeleton:      { origin: 'eidotter', consumers: ['dmnctech'], originNote: 'DOS/CGA loading placeholder — shade-character rows (\u2591\u2592\u2593) with CRT hum-bar band rolling top\u2192bottom (DMNC-1018)' },
  Stat: {
    origin: 'steuerdash',
    consumers: ['steuerdash'],
    since: '0.3.0',
    originNote: 'Key-value metric display created for tax dashboard — optional trend arrow and TextScramble animation',
    variants: {
      'size:sm':      { description: 'Compact metric for dense dashboards', since: '0.16.0' },
      'size:md':      { description: 'Standard metric display', since: '0.3.0', usedBy: ['steuerdash'] },
      'size:lg':      { description: 'Hero metric for prominent KPIs', since: '0.16.0', usedBy: ['steuerdash'] },
      'trend:up':     { description: 'Upward trend indicator (green arrow)', since: '0.3.0', usedBy: ['steuerdash'] },
      'trend:down':   { description: 'Downward trend indicator (red arrow)', since: '0.3.0', usedBy: ['steuerdash'] },
      'trend:neutral':{ description: 'No change indicator (muted dash)', since: '0.3.0' },
    },
    platforms: {
      react:   { path: 'src/components/Stat', status: 'canonical' },
      swiftui: { status: 'planned' },
    },
    changelog: [
      { version: '0.19.0', type: 'changed', description: 'Replace hardcoded font-size pixels with V.37 dos tokens' },
      { version: '0.16.0', type: 'changed', description: 'Migrate to Tailwind-first (Wave 2); deprecate size aliases; add size:sm/lg' },
      { version: '0.3.0',  type: 'added',   description: 'Initial Stat — label, value, trend, trendValue, scramble prop' },
    ],
  },

  Switch: {
    origin: 'eidotter',
    consumers: [],
    since: '0.3.0',
    variants: {
      'size:sm':       { description: 'Compact 20px toggle for dense layouts', since: '0.16.0' },
      'size:md':       { description: 'Standard 24px toggle', since: '0.3.0' },
      'type:default':  { description: 'Full-width thumb track', since: '0.3.0' },
      'type:slim':     { description: 'Narrow pill track for inline use', since: '0.3.0' },
    },
    platforms: {
      react:   { path: 'src/components/Switch', status: 'canonical' },
      swiftui: { status: 'planned' },
    },
    changelog: [
      { version: '0.16.0', type: 'changed', description: 'Migrate to React Aria + Tailwind-first (Wave 1); add size:sm variant' },
      { version: '0.9.0',  type: 'changed', description: 'Replace text-primary with cga-amber' },
      { version: '0.8.0',  type: 'changed', description: 'Design-craft animation polish — toggle glow transition' },
      { version: '0.3.0',  type: 'added',   description: 'Initial Switch — controlled/uncontrolled, label, type:default/slim' },
    ],
  },

  FilterBar: {
    origin: 'eidotter',
    consumers: ['lifelines', 'rizomorf'],
    since: '0.7.0',
    originNote: 'Multi-select toggle group for faceted filtering — keyboard nav, showAll, per-item color',
    variants: {
      'mode:multi':  { description: 'Multiple filters selectable simultaneously', since: '0.7.0', usedBy: ['lifelines', 'rizomorf'] },
      'mode:single': { description: 'Single active filter (radio behavior)', since: '0.7.0' },
      'size:sm':     { description: 'Compact filter chips', since: '0.16.0' },
      'size:md':     { description: 'Standard filter chips', since: '0.7.0', usedBy: ['lifelines', 'rizomorf'] },
      'size:lg':     { description: 'Large filter chips for touch targets', since: '0.16.0' },
    },
    platforms: {
      react: { path: 'src/components/FilterBar', status: 'canonical' },
    },
    changelog: [
      { version: '0.16.0', type: 'changed', description: 'Migrate to Tailwind-first (Wave 3); deprecate size aliases' },
      { version: '0.13.0', type: 'changed', description: 'Replace raw <button> with AriaButton for filter chips' },
      { version: '0.7.0',  type: 'added',   description: 'Initial FilterBar — multi/single mode, items array, showAll, keyboard nav' },
    ],
  },

  Tag: {
    origin: 'eidotter',
    consumers: ['lifelines', 'rizomorf'],
    since: '0.7.0',
    originNote: 'Interactive labels for tags, categories, and filter chips',
    variants: {
      'variant:default':  { description: 'Standard tag with subtle background', since: '0.7.0', usedBy: ['rizomorf'] },
      'variant:outlined': { description: 'Border-only tag', since: '0.7.0', usedBy: ['lifelines'] },
      'variant:filled':   { description: 'Solid background tag', since: '0.7.0', usedBy: ['rizomorf', 'lifelines'] },
      'size:small':       { description: 'Compact tag for dense layouts', since: '0.7.0' },
      'size:medium':      { description: 'Standard tag size', since: '0.7.0' },
    },
    platforms: {
      react:   { path: 'src/components/Tag', status: 'canonical' },
      swiftui: { status: 'planned' },
    },
    changelog: [
      { version: '0.11.0', type: 'changed', description: 'Convert font-size to rem tokens for WCAG SC 1.4.4' },
      { version: '0.8.0', type: 'changed', description: 'Design-craft animation polish' },
      { version: '0.7.0', type: 'added', description: 'Initial Tag and TagGroup components' },
    ],
  },

  Tabs: {
    origin: 'eidotter',
    consumers: ['steuerdash'],
    since: '0.3.0',
    variants: {
      'variant:underline': { description: 'Underline indicator tab bar (default)', since: '0.3.0', usedBy: ['steuerdash'] },
      'variant:pills':     { description: 'Filled pill tabs', since: '0.3.0' },
      'size:sm':           { description: 'Compact tabs for dense layouts', since: '0.16.0' },
      'size:md':           { description: 'Standard tab height', since: '0.3.0', usedBy: ['steuerdash'] },
      'size:lg':           { description: 'Large touch-friendly tabs', since: '0.16.0' },
    },
    platforms: {
      react:   { path: 'src/components/Tabs', status: 'canonical' },
      swiftui: { status: 'planned' },
    },
    changelog: [
      { version: '0.17.0', type: 'changed', description: 'Migrate to React Aria TabList/Tab/TabPanel (Wave 5)' },
      { version: '0.16.0', type: 'changed', description: 'Migrate to Tailwind-first (Wave 3); deprecate size aliases; JS-measured indicator via ResizeObserver' },
      { version: '0.11.0', type: 'changed', description: 'Dynamic text scaling — rem tokens for WCAG SC 1.4.4' },
      { version: '0.9.0',  type: 'changed', description: 'Replace text-primary with cga-amber' },
      { version: '0.3.0',  type: 'added',   description: 'Initial Tabs — tabs array, activeTab, onSelectionChange, animated indicator' },
    ],
  },

  Terminal: {
    origin: 'eidotter',
    consumers: ['rizomorf'],
    since: '0.2.0',
    originNote: 'DOS window frame with px-based bitmap font sizing — legacy BEM, not migrated to Tailwind-first',
    variants: {
      'size:sm':           { description: 'Compact 320px window', since: '0.2.0' },
      'size:md':           { description: 'Standard 480px window', since: '0.2.0', usedBy: ['rizomorf'] },
      'size:lg':           { description: 'Full-width window', since: '0.2.0' },
      'state:active':      { description: 'Focused window with amber title bar', since: '0.2.0', usedBy: ['rizomorf'] },
      'state:inactive':    { description: 'Unfocused window with dimmed title bar', since: '0.2.0' },
      'state:minimized':   { description: 'Collapsed to title bar only', since: '0.2.0' },
    },
    platforms: {
      react: { path: 'src/components/Terminal', status: 'canonical' },
    },
    changelog: [
      { version: '0.30.0', type: 'changed', description: 'A11y keyboard focus fixes for window controls' },
      { version: '0.18.0', type: 'changed', description: 'Migrate BEM to Tailwind-first; switch to Flexi IBM VGA font' },
      { version: '0.14.0', type: 'changed', description: 'Breaking: minimizable/maximizable/closeable default to false — consumers must opt in' },
      { version: '0.13.0', type: 'changed', description: 'Replace raw <button> with AriaButton for window controls' },
      { version: '0.2.0',  type: 'added',   description: 'Initial Terminal — title bar, window controls, resizable, autoFocus, size/state variants' },
    ],
  },

  TimelineNode: {
    origin: 'lifelines',
    consumers: ['lifelines', 'rizomorf'],
    since: '0.4.0',
    originNote: 'Timeline markers extracted from Lifelines — sits on the axis line, content-box sizing',
    variants: {
      'shape:circle':        { description: 'Circular node marker (default)', since: '0.4.0', usedBy: ['lifelines', 'rizomorf'] },
      'shape:square':        { description: 'Square node marker', since: '0.4.0' },
      'shape:diamond':       { description: 'Diamond (rotated square) node marker', since: '0.4.0' },
      'variant:default':     { description: 'Muted amber node', since: '0.4.0', usedBy: ['lifelines', 'rizomorf'] },
      'variant:primary':     { description: 'Full-brightness amber node with phosphor glow', since: '0.4.0', usedBy: ['lifelines'] },
      'variant:secondary':   { description: 'Dimmed node for secondary events', since: '0.4.0' },
      'variant:accent':      { description: 'CGA accent color node', since: '0.4.0' },
      'labelPosition:right': { description: 'Label to the right of the node (default)', since: '0.4.0', usedBy: ['lifelines', 'rizomorf'] },
      'labelPosition:left':  { description: 'Label to the left of the node', since: '0.4.0' },
      'labelPosition:top':   { description: 'Label above the node', since: '0.4.0' },
      'labelPosition:bottom':{ description: 'Label below the node', since: '0.4.0' },
      'size:sm':             { description: 'Compact 8px node', since: '0.16.0' },
      'size:md':             { description: 'Standard 12px node', since: '0.4.0', usedBy: ['lifelines', 'rizomorf'] },
      'size:lg':             { description: 'Large 16px node for emphasis', since: '0.16.0' },
    },
    platforms: {
      react: { path: 'src/components/TimelineNode', status: 'canonical' },
    },
    changelog: [
      { version: '0.35.0', type: 'changed', description: 'Pin marker box-sizing to content-box so dots stay on the axis line (DMNC-1090)' },
      { version: '0.30.0', type: 'changed', description: 'A11y: high-contrast glow gap remediation' },
      { version: '0.18.0', type: 'changed', description: 'Migrate BEM to Tailwind-first; switch to Flexi IBM VGA font' },
      { version: '0.4.0',  type: 'added',   description: 'Initial TimelineNode — shape, variant, labelPosition, size, isActive, onClick' },
    ],
  },

  InlineExpand: {
    origin: 'rizomorf',
    consumers: ['rizomorf'],
    since: '0.7.0',
    originNote: 'Inline disclosure widget for expanding context within prose — sources with favicon fallback',
    platforms: {
      react: { path: 'src/components/InlineExpand', status: 'canonical' },
    },
    changelog: [
      { version: '0.30.0', type: 'changed', description: 'Fix behavioral bugs — double-toggle edge case (DMNC-1063)' },
      { version: '0.18.0', type: 'changed', description: 'Migrate BEM to Tailwind-first' },
      { version: '0.8.0',  type: 'added',   description: 'sources prop — citation links with Google Favicons API fallback' },
      { version: '0.7.0',  type: 'added',   description: 'Initial InlineExpand — expanded, defaultExpanded, onToggle, content slot' },
    ],
  },

  Separator: {
    origin: 'rizomorf',
    consumers: ['rizomorf'],
    since: '0.8.0',
    originNote: 'Horizontal/vertical divider for content separation — ported from rizomorf',
    variants: {
      'orientation:horizontal': { description: 'Full-width horizontal rule (default)', since: '0.8.0', usedBy: ['rizomorf'] },
      'orientation:vertical':   { description: 'Inline vertical divider for flex/grid rows', since: '0.8.0' },
    },
    platforms: {
      react: { path: 'src/components/Separator', status: 'canonical' },
    },
    changelog: [
      { version: '0.16.0', type: 'changed', description: 'Migrate to Tailwind-first (Wave 2)' },
      { version: '0.9.0',  type: 'changed', description: 'Replace text-primary with cga-amber' },
      { version: '0.8.0',  type: 'added',   description: 'Initial Separator — horizontal/vertical orientation, ported from rizomorf' },
    ],
  },

  TimelineContainer: {
    origin: 'lifelines',
    consumers: ['lifelines'],
    since: '0.8.0',
    originNote: 'Multi-zoom timeline with year/month/day/hour views. Supports interactive, static, feed, and master-detail modes.',
    variants: {
      'mode:interactive':    { description: 'Full drill-down with keyboard shortcuts and Ctrl+scroll zoom', since: '0.8.0', usedBy: ['lifelines'] },
      'mode:static':         { description: 'Read-only snapshot — no zoom or selection controls', since: '0.8.0' },
      'mode:feed':           { description: 'Paginated vertical list with LOAD MORE — append-safe', since: '0.21.0', usedBy: ['lifelines'] },
      'mode:master-detail':  { description: 'Split-pane with list rail + detail panel', since: '0.34.0' },
      'sortOrder:asc':       { description: 'Oldest entries first', since: '0.8.0' },
      'sortOrder:desc':      { description: 'Newest entries first (default)', since: '0.8.0', usedBy: ['lifelines'] },
    },
    platforms: {
      react: { path: 'src/components/TimelineContainer', status: 'canonical' },
    },
    changelog: [
      { version: '0.34.0', type: 'added',   description: 'master-detail layout mode — split-pane list rail + detail panel (DMNC-878)' },
      { version: '0.21.0', type: 'added',   description: 'feed mode — pageSize, onLoadMore, DOS-styled LOAD MORE button' },
      { version: '0.21.0', type: 'added',   description: 'renderEntry prop — pluggable entry renderer with defaultRender() opt-in' },
      { version: '0.9.0',  type: 'changed', description: 'Responsive layout with CSS container queries' },
      { version: '0.8.0',  type: 'added',   description: 'Initial TimelineContainer — year/month/day/hour drill-down, migrated from Lifelines' },
    ],
  },

  TextScramble: {
    origin: 'eidotter',
    consumers: [],
    since: '0.10.0',
    originNote: 'DOS text decode effect — rAF-driven character scramble reveal; used by Stat (scramble prop) and standalone',
    platforms: {
      react: { path: 'src/components/TextScramble', status: 'canonical' },
    },
    changelog: [
      { version: '0.18.0', type: 'changed', description: 'Migrate BEM to Tailwind-first; adopt cn() and forwardRef' },
      { version: '0.10.0', type: 'added',   description: 'Initial TextScramble — children string, speed, characters, delay; rAF-based reveal' },
    ],
  },

  // Chat components
  ChatMessage:   { origin: 'eidotter', consumers: [], originNote: 'Single chat message with role-based DOS styling and streaming cursor' },
  ChatHistory:   { origin: 'eidotter', consumers: [], originNote: 'Scrollable message list with auto-scroll and role="log" accessibility' },
  ChatInput:     { origin: 'eidotter', consumers: [], originNote: 'Multiline DOS-styled textarea with Enter-to-send' },
  ChatContainer: { origin: 'eidotter', consumers: [], originNote: 'Composes ChatHistory + ChatInput into a complete chat interface' },

  // Layout components
  Header: {
    origin: 'eidotter',
    consumers: [],
    originNote: 'Sticky site header composing branding link + Nav — retro/modern variants; optional context row (category badge row + returnTo pill) for cross-site shells (DMNC-1326)',
    variants: {
      'context:categories': { description: 'Category badge row below the main row — measurable DOM target (stable eidotter-header__categories / __category classes + data-category-key) for the Mark arm-connector (DMNC-1325)', since: '0.39.0' },
      'context:returnTo':   { description: 'Breadcrumb return pill — same-tab via linkComponent by default; reuseTab navigates via window.open(href, "rizomorf-shell") named-tab reuse', since: '0.39.0' },
    },
    changelog: [
      { version: '0.39.0', type: 'added', description: 'Optional `context` prop — category badge row + returnTo breadcrumb pill with reuseTab named-tab navigation (DMNC-1326)' },
      { version: '0.39.0', type: 'changed', description: 'Sanitize brandHref via shared isSafeHref — unsafe schemes fall back to "/" (nav-item links guarded in Nav)' },
    ],
  },
  Footer: {
    origin: 'eidotter',
    consumers: [],
    originNote: 'DOS-themed footer with default legal links (Impressum + Datenschutz) for German compliance',
    changelog: [
      { version: '0.39.0', type: 'changed', description: 'Sanitize link hrefs via shared isSafeHref — unsafe schemes (javascript:, data:, …) render the label without an anchor' },
    ],
  },

  // Imported from April 2026 design handoff (v0.20.0)
  InlineLink: {
    origin: 'rizomorf',
    consumers: ['rizomorf'],
    since: '0.20.0',
    originNote: 'In-flow navigational anchor — dotted amber underline, phosphor-invert hover, trailing `▸` / `↗`. Distinct from InlineExpand (destination vs disclosure). Closes rizomorf parity gap #03.',
    platforms: { react: { path: 'src/components/InlineLink', status: 'canonical' } },
    changelog: [
      { version: '0.39.0', type: 'changed', description: 'sanitizeHref now delegates to the shared isSafeHref util (extraSchemes tel/ftp/sms); behavior unchanged' },
      { version: '0.20.0', type: 'added', description: 'Initial InlineLink — internal + external variants, tabnabbing guard when consumer passes target="_blank"' },
    ],
  },
  DosFigure: {
    origin: 'eidotter',
    consumers: ['rizomorf'],
    since: '0.20.0',
    originNote: 'Demoscene-style painted-screen placeholder (Sierra / LucasArts title-card aesthetic). Amber chrome, 6s scanline sweep, optional annotation pins. Closes rizomorf parity gap #02.',
    platforms: { react: { path: 'src/components/DosFigure', status: 'canonical' } },
    changelog: [
      { version: '0.20.0', type: 'added', description: 'Initial DosFigure — scanline sweep, phosphor flicker, pin pulse; all animations compositor-only and reduced-motion safe' },
    ],
  },
  CmdPalette: {
    origin: 'eidotter',
    consumers: [],
    since: '0.20.0',
    originNote: '⌘K / Ctrl+K command palette overlay. Built on React Aria ModalOverlay/Modal/Dialog (same primitives as Modal). Generic items + scored search + keyboard navigation.',
    platforms: { react: { path: 'src/components/CmdPalette', status: 'canonical' } },
    changelog: [
      { version: '0.20.0', type: 'added', description: 'Initial CmdPalette — generic items with keywords, mod+k global hotkey, custom renderItem, useId() per-instance DOM ids, selected-clamp on items mutation' },
    ],
  },

  // Ported from the Tracker habit app (DMNC-1040)
  ProgressRing: {
    origin: 'tracker',
    consumers: ['tracker'],
    since: '0.37.0',
    originNote: '16-segment quantized progress ring (SVG). Powers Tracker’s hold-to-complete feedback ring.',
    platforms: { react: { path: 'src/components/ProgressRing', status: 'canonical' } },
    changelog: [
      { version: '0.37.0', type: 'added', description: 'Initial ProgressRing — discrete quantized segment arcs, phosphor glow, centre label, currentColor theming' },
    ],
  },
  CalendarHeatmap: {
    origin: 'tracker',
    consumers: ['tracker'],
    since: '0.37.0',
    originNote: 'Block-character month calendar heatmap (█ ░ · ▒). Domain-agnostic — takes a date→status map, not a domain object.',
    platforms: { react: { path: 'src/components/CalendarHeatmap', status: 'canonical' } },
    changelog: [
      { version: '0.37.0', type: 'added', description: 'Initial CalendarHeatmap — UTC date maths, Monday/Sunday week start, legend, successColor override, glyph overrides' },
    ],
  },
  HoldToComplete: {
    origin: 'tracker',
    consumers: ['tracker'],
    since: '0.37.0',
    originNote: 'Press-and-hold-to-complete interaction with ProgressRing feedback. Pointer + keyboard, reduced-motion aware.',
    platforms: { react: { path: 'src/components/HoldToComplete', status: 'canonical' } },
    changelog: [
      { version: '0.37.0', type: 'added', description: 'Initial HoldToComplete — rAF hold animation with accelerating ease, onHoldProgress hook, Enter/Space to complete' },
    ],
  },
  Mark: {
    origin: 'rizomorf',
    consumers: ['rizomorf'],
    since: '0.39.0',
    originNote: 'Morphing organic avatar mark (a.k.a. RizomorfAvatar) with runtime-measured quadratic-bezier arm connectors to Header nav badges (DMNC-1325; Header badge row: DMNC-1326).',
    variants: {
      'morph:true':  { description: 'Border-radius morph loop (~6s ease-in-out), disabled under prefers-reduced-motion', since: '0.39.0' },
      'morph:false': { description: 'Static organic silhouette', since: '0.39.0' },
    },
    platforms: { react: { path: 'src/components/Brand', status: 'canonical' } },
    changelog: [
      { version: '0.39.0', type: 'added', description: 'Initial Mark — soft-radial egg-yolk fill + CSS border-radius morph + SVG arm connectors with alternating control-point offsets' },
    ],
  },
};

// ---------------------------------------------------------------------------
// Utility functions
// ---------------------------------------------------------------------------

export function getComponentMeta(name: string): ComponentMeta | undefined {
  return componentRegistry[name];
}

export function getComponentsByOrigin(projectId: ProjectId): string[] {
  return Object.entries(componentRegistry)
    .filter(([, meta]) => meta.origin === projectId)
    .map(([name]) => name);
}

export function getComponentsByConsumer(projectId: ProjectId): string[] {
  return Object.entries(componentRegistry)
    .filter(([, meta]) => meta.consumers.includes(projectId))
    .map(([name]) => name);
}

/** Returns variant names used by a specific consumer for a component */
export function getVariantsUsedBy(componentName: string, projectId: ProjectId): string[] {
  const meta = componentRegistry[componentName];
  if (!meta?.variants) return [];

  return Object.entries(meta.variants)
    .filter(([, v]) => v.usedBy?.includes(projectId))
    .map(([name]) => name);
}

/** Returns a map of variant name → consumers[] for a component */
export function getVariantConsumerMap(componentName: string): Record<string, ProjectId[]> {
  const meta = componentRegistry[componentName];
  if (!meta?.variants) return {};

  const map: Record<string, ProjectId[]> = {};
  for (const [name, v] of Object.entries(meta.variants)) {
    map[name] = v.usedBy ?? [];
  }
  return map;
}
