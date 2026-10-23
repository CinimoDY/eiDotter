export type ProjectId =
  | 'eidotter' | 'spacewar' | 'rizomorf' | 'pomodoke-calendar'
  | 'keepcoin' | 'steuerdash' | 'sella' | 'lifelines' | 'betamorf'
  | 'dmnctech' | 'tracker' | 'doctor-portal' | 'dosbts';

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
  'doctor-portal':     { displayName: 'Doctor Portal' },
  dosbts:              { displayName: 'DOSBTS' },
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
      'color:brand': { description: 'Brand-accent message' },
      'color:gray': { description: 'Neutral gray message' },
      'color:default': { description: 'Default informational message' },
      'color:error': { description: 'Error message' },
      'color:warning': { description: 'Warning notice' },
      'color:success': { description: 'Success confirmation' },
      'type:info':    { description: 'Informational message', deprecated: '0.16.0', since: '0.2.0', usedBy: ['rizomorf'] },
      'type:success': { description: 'Success confirmation', deprecated: '0.16.0', since: '0.2.0', usedBy: ['steuerdash'] },
      'type:warning': { description: 'Warning notice', deprecated: '0.16.0', since: '0.2.0', usedBy: ['rizomorf', 'steuerdash'] },
      'type:error':   { description: 'Error message', deprecated: '0.16.0', since: '0.2.0', usedBy: ['steuerdash'] },
      'type:default': { description: 'Deprecated: neutral message (use color)', deprecated: '0.16.0' },
      'type:brand':   { description: 'Deprecated: brand message (use color)', deprecated: '0.16.0' },
      'size:floating':   { description: 'Card-style floating alert (default)' },
      'size:full-width': { description: 'Banner-style full-width alert' },
      'size:sm':         { description: 'Compact alert (maps to floating)' },
      'size:lg':         { description: 'Large alert (maps to floating)' },
      'size:small':   { description: 'Compact alert for inline contexts', deprecated: '0.16.0', since: '0.2.0' },
      'size:large':   { description: 'Large alert (maps to floating)', deprecated: '0.16.0', since: '0.2.0' },
    },
    platforms: {
      react:    { path: 'src/components/Alert', status: 'canonical' },
      swiftui:  { status: 'planned' },
    },
    changelog: [
      { version: '0.41.0', type: 'changed', description: 'Dismiss control is the shared IconButton (md 36x36, pixel X, outline at rest, hover invert); hand-rolled .eidotter-alert__close styles reduced to placement (DMNC-1592)' },
      { version: '0.41.0', type: 'changed', description: 'Square corners (4px radius removed); enter/exit use the shared compositor-only eidotter-pop-in/out instead of filter-based alert-enter/exit (DMNC-1592)' },
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
      { version: '0.41.0', type: 'changed', description: 'Keyboard focus ring is a 2px amber outline at 2px offset (was a flush box-shadow invisible on the amber expanded header in amber-mono); title uses the text-dos-text-base token (DMNC-1436, DMNC-1579)' },
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
      { version: '0.41.0', type: 'changed', description: 'Root size uses the text-dos-text-base token instead of a stock Tailwind size (DMNC-1579)' },
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
      'variant:brand':   { description: 'Alias of accent' },
      'variant:gray':    { description: 'Alias of default' },
      'variant:blue':    { description: 'Alias of info' },
      'variant:indigo':  { description: 'Alias of info' },
      'variant:purple':  { description: 'Alias of info' },
      'variant:pink':    { description: 'Alias of error' },
      'variant:orange':  { description: 'Alias of warning' },
      'size:sm':         { description: 'Compact inline badge' },
      'size:md':         { description: 'Standard badge size' },
      'size:lg':         { description: 'Large badge' },
      'size:small':      { description: 'Compact inline badge', deprecated: '0.16.0', since: '0.3.0' },
      'size:medium':     { description: 'Standard badge size', deprecated: '0.16.0', since: '0.3.0' },
    },
    platforms: {
      react:    { path: 'src/components/Badge', status: 'canonical' },
      swiftui:  { status: 'planned' },
    },
    changelog: [
      { version: '0.41.0', type: 'changed', description: 'Enter animation uses the shared eidotter-pop-in keyframe (badge-enter removed, DMNC-1592)' },
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
      { version: '0.41.0', type: 'changed', description: '16px body floor (text-dos-text-base), tracking 0.1em, no wide-container size override; current page item uses text-dos-text-primary so it is distinguishable from links (DMNC-1579)' },
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
      'variant:tertiary':  { description: 'Lower-emphasis action between secondary and ghost' },
      'variant:destructive': { description: 'Destructive action; honest red under colour themes, amber-mono by default' },
      'variant:ghost':     { description: 'Minimal button with hover reveal', since: '0.2.0', usedBy: ['rizomorf'] },
      'variant:link':      { description: 'Inline link-style button', since: '0.2.0', usedBy: ['rizomorf'] },
      'size:xs':           { description: 'Extra-compact 1.5rem min-height (24px)' },
      'size:sm':           { description: 'Compact 28px min-height' },
      'size:md':           { description: 'Standard 32px min-height' },
      'size:lg':           { description: 'Prominent 40px min-height' },
      'size:xl':           { description: 'Extra-large 44px min-height' },
      'size:small':        { description: 'Compact 1.5rem min-height', deprecated: '0.16.0', since: '0.2.0' },
      'size:medium':       { description: 'Standard 2rem min-height', deprecated: '0.16.0', since: '0.2.0' },
      'size:large':        { description: 'Prominent 2.5rem min-height', deprecated: '0.16.0', since: '0.2.0' },
    },
    platforms: {
      react:    { path: 'src/components/Button', status: 'canonical' },
      swiftui:  { path: 'platforms/swiftui/Sources/EiDotterUI/DOSButton.swift', status: 'planned', note: 'POC with primary variant only — not yet production-ready' },
      spritekit: { status: 'token-only', note: 'Spacewar uses tokens only, no UIKit/SwiftUI button' },
    },
    changelog: [
      { version: '0.41.0', type: 'changed', description: 'Loading indicator uses the shared stepped blink keyframe (blink-loading removed, DMNC-1592)' },
      { version: '0.11.0', type: 'changed', description: 'Convert font-size to rem tokens for WCAG SC 1.4.4' },
      { version: '0.8.0', type: 'changed', description: 'Design-craft animation polish across all variants' },
      { version: '0.7.0', type: 'changed', description: 'Increase font size and weight for readability' },
      { version: '0.6.0', type: 'changed', description: 'Add phosphor warmup/energize keyframes to all variants' },
      { version: '0.5.0', type: 'changed', description: 'Fix secondary label visibility in pressed state' },
      { version: '0.4.0', type: 'changed', description: 'Add CRT phosphor interaction states for primary variant' },
      { version: '0.2.0', type: 'added', description: 'Initial Button with primary/secondary/ghost/link variants' },
      { version: '0.41.0', type: 'changed', description: 'Fix: keyboard focus-visible ring now renders (explicit outline-solid; outline-none had cancelled it under Tailwind v4) (DMNC-1436)' },
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
      { version: '0.41.0', type: 'changed', description: 'Built on DosWindow: the title header becomes the window strip (dark, yellow xs uppercase title with ▸ marker, dim-amber rule; was a brand-dim bar with dark md text) and the footer the window footer (dim-amber rule, no secondary fill); elevated is the plain window frame (brand border + --shadow-drop) instead of the near-black border and 4px offset shadow; glow keeps its glow; props unchanged (DMNC-1592)' },
      { version: '0.41.0', type: 'changed', description: 'Enter animation uses the shared eidotter-fade-in keyframe (eidotter-card-enter removed, DMNC-1592)' },
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
    originNote: 'Thin wrapper around pixelarticons (MIT) + custom PixelX for Close — 14 public names, ICON_MAP',
    variants: {
      'name:Info':        { description: 'Informational circle-i', since: '0.13.0', usedBy: ['rizomorf'] },
      'name:Warning':     { description: 'Warning triangle', since: '0.13.0', usedBy: ['rizomorf'] },
      'name:Error':       { description: 'Error octagon', since: '0.13.0' },
      'name:Done':        { description: 'Checkmark (shares Check glyph)', since: '0.13.0' },
      'name:Check':       { description: 'Checkmark', since: '0.13.0' },
      'name:Close':       { description: 'Custom pixel-art X mark (no pixelarticons glyph)', since: '0.19.0', usedBy: ['rizomorf'] },
      'name:Chevron Up':  { description: 'Up caret', since: '0.13.0' },
      'name:Chevron Down':{ description: 'Down caret', since: '0.13.0' },
      'name:Chevron Left':{ description: 'Left caret (IconButton prev)', since: '0.41.0' },
      'name:Chevron Right':{ description: 'Right caret (IconButton next)', since: '0.41.0' },
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
      { version: '0.41.0', type: 'added', description: 'Chevron Left and Chevron Right added (pixelarticons ChevronLeft/ChevronRight) for IconButton prev/next (DMNC-1592)' },
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
      { version: '0.41.0', type: 'changed', description: 'Keyboard focus ring: 2px amber outline at 2px offset on focus-visible; amber-mono border.focus equals border.default so the border swap alone was invisible (DMNC-1436)' },
      { version: '0.41.0', type: 'changed', description: 'Label, field, description and error text use text-dos-text-base (16px body floor) instead of 12px/text-base (DMNC-1579)' },
      { version: '0.17.0', type: 'changed', description: 'Migrate to React Aria TextField (Wave 5)' },
      { version: '0.16.0', type: 'changed', description: 'Migrate to Tailwind-first (Wave 4 — Input, Modal, Nav)' },
      { version: '0.9.0',  type: 'changed', description: 'Replace text-primary with cga-amber' },
      { version: '0.3.0',  type: 'added',   description: 'Initial Input — label, description, errorMessage, isRequired' },
    ],
  },
  Lightbox: {
    origin: 'eidotter',
    consumers: ['dmnctech'],
    since: '0.22.0',
    originNote: 'Fullscreen image viewer on the DosDialog shell. Keyboard nav, prev/next, counter, swipe.',
    changelog: [
      { version: '0.41.0', type: 'changed', description: 'Close and prev/next (md 36px; pixel chevrons replacing the text arrows) are IconButtons; disabled nav opacity 0.5 (was 0.3); keyboard and swipe unchanged (DMNC-1592)' },
      { version: '0.41.0', type: 'changed', description: 'Rebuilt on DosDialog (size full): gains the title strip (dark, yellow title, dim-amber rule) with the [ n / N ] counter as its title and the Close icon at its end; z-index now --z-index-modal (was 60); panel pops in/out (150ms) (DMNC-1592)' },
    ],
  },
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
      { version: '0.41.0', type: 'changed', description: 'Close control is the shared IconButton (md 36x36, outline at rest, hover invert) in the strip end slot, overhanging the strip padding so the strip height is unchanged; .eidotter-modal__close styles removed (DMNC-1592)' },
      { version: '0.41.0', type: 'changed', description: 'Rebuilt on DosDialog: CmdPalette chrome (brand border + amber glow), title in the dark strip (yellow, dim-amber rule) with the Close icon at its end, z-index --z-index-modal, panel pops in/out (150ms); additive size and isDismissable props (DMNC-1592)' },
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
      'size:small': { description: 'Deprecated alias of size:sm', deprecated: '0.16.0' },
      'size:medium': { description: 'Deprecated alias of size:md', deprecated: '0.16.0' },
      'size:large': { description: 'Deprecated alias of size:lg', deprecated: '0.16.0' },
    },
    platforms: {
      react:   { path: 'src/components/Progress', status: 'canonical' },
      swiftui: { status: 'planned' },
    },
    changelog: [
      { version: '0.41.0', type: 'changed', description: 'sm/md/lg render 16/20/22px via text-dos-text-base/-sm/-md tokens (were 16/16/18px from stock Tailwind sizes) (DMNC-1579)' },
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
      'variant:default': { description: 'Standard (valid) state' },
      'variant:error':   { description: 'Invalid state — red border + errorMessage slot', since: '0.38.0' },
      'size:sm':         { description: 'Compact trigger (28px min-height)', since: '0.38.0' },
      'size:md':         { description: 'Standard trigger (32px min-height)', since: '0.38.0', usedBy: ['steuerdash'] },
      'size:lg':         { description: 'Tall trigger (40px min-height)', since: '0.38.0' },
      'size:small': { description: 'Deprecated alias of size:sm', deprecated: '0.16.0' },
      'size:medium': { description: 'Deprecated alias of size:md', deprecated: '0.16.0' },
      'size:large': { description: 'Deprecated alias of size:lg', deprecated: '0.16.0' },
    },
    platforms: {
      react:   { path: 'src/components/Select', status: 'canonical' },
      swiftui: { status: 'planned' },
    },
    changelog: [
      { version: '0.41.0', type: 'changed', description: 'Popover enter/exit use the shared eidotter-pop-in/out at 150ms (select-pop-in/out removed, DMNC-1592)' },
      { version: '0.41.0', type: 'changed', description: 'Keyboard focus ring: 2px amber outline at 2px offset on the trigger (searchable: when its input has focus-visible) (DMNC-1436)' },
      { version: '0.38.0', type: 'changed', description: 'Rebuild on React Aria (Select/ComboBox/ListBox) with phosphor glow; add searchable + multiple modes, label/description/error chrome, sizes. Backward-compatible value/options/onChange API (DMNC-593)' },
      { version: '0.36.0', type: 'added',   description: 'Initial Select — native <select> MVP ported from Steuerdash (DMNC-860)' },
    ],
  },
  Skeleton: {
    origin: 'eidotter',
    consumers: ['dmnctech'],
    variants: { 'variant:text': { description: 'Text rows' }, 'variant:card': { description: 'Card placeholder' }, 'variant:figure': { description: 'Figure/media placeholder' }, 'variant:timeline': { description: 'Timeline placeholder' } },
    originNote: 'DOS/CGA loading placeholder — shade-character rows (\u2591\u2592\u2593) with CRT hum-bar band rolling top\u2192bottom (DMNC-1018)',
    changelog: [
      { version: '0.41.0', type: 'changed', description: 'Reduced-motion breathing uses the shared eidotter-breathe keyframe (eidotter-skeleton-breathe removed, DMNC-1592)' },
    ],
  },
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
      'size:small': { description: 'Deprecated alias of size:sm', deprecated: '0.16.0' },
      'size:medium': { description: 'Deprecated alias of size:md', deprecated: '0.16.0' },
      'size:large': { description: 'Deprecated alias of size:lg', deprecated: '0.16.0' },
    },
    platforms: {
      react:   { path: 'src/components/Stat', status: 'canonical' },
      swiftui: { status: 'planned' },
    },
    changelog: [
      { version: '0.42.0', type: 'changed', description: 'The unit can drop under the value in a narrow card (a space before the unit is the break opportunity; was a 4px margin with no break) (DMNC-1610)' },
      { version: '0.41.1', type: 'changed', description: 'scramble: server HTML and first client render show the final value; scramble starts after mount (no hydration mismatch, DMNC-1609)' },
      { version: '0.40.0', type: 'changed', description: 'Add optional unit, note and target slots (additive; existing consumers unchanged)' },
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
      'size:small': { description: 'Deprecated alias of size:sm', deprecated: '0.16.0' },
      'size:medium': { description: 'Deprecated alias of size:md', deprecated: '0.16.0' },
      'size:large': { description: 'Deprecated alias of size:lg', deprecated: '0.16.0' },
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
      'size:sm':          { description: 'Compact tag for dense layouts' },
      'size:md':          { description: 'Standard tag size' },
      'size:lg':          { description: 'Large tag' },
      'size:small':       { description: 'Compact tag for dense layouts', deprecated: '0.16.0', since: '0.7.0' },
      'size:medium':      { description: 'Standard tag size', deprecated: '0.16.0', since: '0.7.0' },
    },
    platforms: {
      react:   { path: 'src/components/Tag', status: 'canonical' },
      swiftui: { status: 'planned' },
    },
    changelog: [
      { version: '0.41.0', type: 'changed', description: 'Remove control is the shared IconButton (md 36px, bare, pixel X) instead of the [x] text button; accessible name Remove <label> and tab-order rules unchanged (DMNC-1592)' },
      { version: '0.41.0', type: 'changed', description: 'Enter/dismiss use the shared eidotter-pop-in/out keyframes (tag-enter/exit removed, DMNC-1592)' },
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
      'size:small': { description: 'Deprecated alias of size:sm', deprecated: '0.16.0' },
      'size:medium': { description: 'Deprecated alias of size:md', deprecated: '0.16.0' },
      'size:large': { description: 'Deprecated alias of size:lg', deprecated: '0.16.0' },
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
      'size:small': { description: 'Deprecated alias of size:sm', deprecated: '0.16.0' },
      'size:medium': { description: 'Deprecated alias of size:md', deprecated: '0.16.0' },
      'size:large': { description: 'Deprecated alias of size:lg', deprecated: '0.16.0' },
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
      'size:small': { description: 'Deprecated alias of size:sm', deprecated: '0.16.0' },
      'size:medium': { description: 'Deprecated alias of size:md', deprecated: '0.16.0' },
      'size:large': { description: 'Deprecated alias of size:lg', deprecated: '0.16.0' },
    },
    platforms: {
      react: { path: 'src/components/TimelineNode', status: 'canonical' },
    },
    changelog: [
      { version: '0.41.0', type: 'changed', description: 'Marker enter uses the shared eidotter-pop-in keyframe (eidotter-timeline-node-enter removed, DMNC-1592)' },
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
      { version: '0.41.0', type: 'changed', description: 'Reveal fade uses the shared eidotter-fade-in keyframe (eidotter-inline-expand-fade removed, DMNC-1592)' },
      { version: '0.40.0', type: 'changed', description: 'True inline-flow expanded state — marker-pen wrap, trailing collapse control, inline favicon-only sources; conditional render; data-ai-skip on content + legible trigger inside AI-marked prose (DMNC-1316)' },
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
      { version: '0.41.1', type: 'changed', description: 'SSR-safe: server HTML and first client render show the final text; scramble and reduced-motion check run after mount (no hydration mismatch, DMNC-1609)' },
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
      'variant:retro':  { description: 'Retro header with amber phosphor glow on the bottom border' },
      'variant:modern': { description: 'Modern header without phosphor glow' },
      'context:categories': { description: 'Category badge row below the main row — measurable DOM target (stable eidotter-header__categories / __category classes + data-category-key) for the Mark arm-connector (DMNC-1325)', since: '0.39.0' },
      'context:returnTo':   { description: 'Breadcrumb return pill — same-tab via linkComponent by default; reuseTab navigates via window.open(href, "rizomorf-shell") named-tab reuse', since: '0.39.0' },
    },
    changelog: [
      { version: '0.41.0', type: 'changed', description: 'Mobile Nav panel close is the shared IconButton (md 36x36, outline, hover invert) (DMNC-1592)' },
      { version: '0.41.0', type: 'changed', description: 'One portfolio header (DMNC-1584): retro variant now has a 1px dim-amber bottom line with a soft glow under it, brand-amber text (branding + returnTo pill, hover to bright brand amber, no text-shadow), uppercase returnTo pill; brandName without children renders the lockup by default' },
      { version: '0.41.0', type: 'added', description: '`brand` prop (lockup | mark | text, default lockup), `end` trailing slot (rendered once; after the desktop nav / before MENU on mobile), `skipLinkTarget` skip link (WCAG 2.4.1, off by default) (DMNC-1584)' },
      { version: '0.41.0', type: 'changed', description: 'Brand link uses text-dos-text-base (16px body floor) (DMNC-1579)' },
      { version: '0.39.0', type: 'added', description: 'Optional `context` prop — category badge row + returnTo breadcrumb pill with reuseTab named-tab navigation (DMNC-1326)' },
      { version: '0.39.0', type: 'changed', description: 'Sanitize brandHref via shared isSafeHref — unsafe schemes fall back to "/" (nav-item links guarded in Nav)' },
    ],
  },
  Nav: {
    origin: 'eidotter',
    consumers: [],
    originNote: 'DesktopNav + MobileNav (MENU trigger + slide-out panel) — retro/modern variants; composed by Header',
    changelog: [
      { version: '0.41.0', type: 'changed', description: 'Retro variant: desktop links, mobile panel links and the MENU trigger in brand amber with bright-brand-amber hover (no glow on the trigger); desktop and panel link labels render uppercase DOS. Modern variant unchanged (DMNC-1584)' },
    ],
  },
  Footer: {
    origin: 'eidotter',
    consumers: [],
    originNote: 'DOS-themed footer with default legal links (Impressum + Datenschutz) for German compliance',
    changelog: [
      { version: '0.41.0', type: 'changed', description: 'Root text 14px (text-sm) to text-dos-text-base (16px body floor); copyright and legal links inherit (DMNC-1579)' },
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
      { version: '0.41.0', type: 'changed', description: 'Built on DosWindow: the amber-filled title bar becomes the dark window strip (yellow title, ▸ marker, dim-amber rule); brand border and drop shadow move from the frame to the window; scanline, flicker, pins and resolution tag unchanged (DMNC-1592)' },
      { version: '0.41.0', type: 'changed', description: 'Pin pulse uses the shared eidotter-breathe keyframe with --eidotter-breathe-min: 0.5 (dos-figure-pin-pulse removed, DMNC-1592)' },
      { version: '0.20.0', type: 'added', description: 'Initial DosFigure — scanline sweep, phosphor flicker, pin pulse; all animations compositor-only and reduced-motion safe' },
    ],
  },
  DosDialog: {
    origin: 'eidotter',
    consumers: [],
    since: '0.41.0',
    originNote: 'The one overlay shell: CmdPalette chrome (brand border, amber glow, square corners, blurred scrim) plus a dark title strip (yellow title, dim-amber rule). React Aria ModalOverlay/Modal/Dialog. Modal, Lightbox and CmdPalette are built on it (DMNC-1592).',
    variants: {
      'placement:center': { description: 'Vertically centred (default)', since: '0.41.0' },
      'placement:top':    { description: 'About 18vh top anchor (CmdPalette)', since: '0.41.0' },
      'size:sm':          { description: '24rem', since: '0.41.0' },
      'size:md':          { description: '30rem, default (Modal historical 480px)', since: '0.41.0' },
      'size:lg':          { description: '40rem (CmdPalette historical 640px)', since: '0.41.0' },
      'size:full':        { description: 'Viewport width minus 2x spacing-4 (Lightbox)', since: '0.41.0' },
      'inline:false':     { description: 'Modal overlay: React Aria ModalOverlay, portal, scrim, focus trap (default)', since: '0.41.0' },
      'inline:true':      { description: 'Same chrome in document flow: no overlay, portal or focus trap; role=group, no aria-modal (docs, static previews)', since: '0.42.0' },
    },
    platforms: { react: { path: 'src/components/DosDialog', status: 'canonical' } },
    changelog: [
      { version: '0.42.0', type: 'added', description: 'inline prop: renders the same frame, strip, head, body, footer and end control in place without ModalOverlay, portal or focus trap, as a role=group with no aria-modal; server HTML carries the chrome (DMNC-1605)' },
      { version: '0.42.0', type: 'changed', description: 'Last end IconButton docks flush in the frame corner (0px top, 0px right, was 0px top, 4px right), the same rule as DosWindow controls (DMNC-1605)' },
      { version: '0.41.0', type: 'added', description: 'Initial DosDialog: open/onOpenChange, placement, size, head strip (title/end/marker/decorative or ReactNode), footer, isDismissable, pop-in/out panel (150ms) over a fading scrim, reduced-motion bypass' },
    ],
  },
  IconButton: {
    origin: 'eidotter',
    consumers: [],
    since: '0.41.0',
    originNote: 'The one icon-only control: a pixel Icon glyph in a thin square outline, hover inverts (amber fill, dark glyph), 2px border-focus outline. React Aria Button. Every close, prev/next and window control uses it (DMNC-1592).',
    variants: {
      'size:md':          { description: '36x36 hit area, 20px glyph (default)', since: '0.41.0' },
      'size:window':      { description: '28x28, 16px glyph, for dense chrome (no built-in adopter)', since: '0.41.0' },
      'variant:outline':  { description: '1px border-default outline at rest (default)', since: '0.41.0' },
      'variant:bare':     { description: 'No resting outline (Tag remove)', since: '0.41.0' },
    },
    platforms: { react: { path: 'src/components/IconButton', status: 'canonical' } },
    changelog: [
      { version: '0.41.0', type: 'added', description: 'Initial IconButton: icon, required label (aria-label), size md/window, variant outline/bare, isDisabled, onPress, excludeFromTabOrder; adopted by Modal, Lightbox, Notification, Alert, Tag and Nav (DMNC-1592)' },
    ],
  },
  DosWindow: {
    origin: 'eidotter',
    consumers: [],
    since: '0.41.0',
    originNote: 'In-page window chrome: the DosDialog strip (dark, uppercase xs title, ▸ marker, dim-amber rule) on a brand border with --shadow-drop, no glow or backdrop. Server-safe; consumer-supplied IconButton controls. DosFigure and Card are built on it (DMNC-1592).',
    variants: {
      'active:true':  { description: 'Active window: strip title in the active colour (default)', since: '0.41.0' },
      'active:false': { description: 'Inactive window: strip title text-muted', since: '0.41.0' },
    },
    platforms: { react: { path: 'src/components/DosWindow', status: 'canonical' } },
    changelog: [
      { version: '0.42.0', type: 'changed', description: 'Last control IconButton docks flush in the frame corner (0px top, 0px right, was 0px top, 4px right); the inline-end overhang moved from the controls container to the last IconButton, so non-IconButton controls keep the strip padding (DMNC-1605)' },
      { version: '0.41.0', type: 'added', description: 'Initial DosWindow: title, marker, active, controls, footer, className; stable classes eidotter-window, __strip, __title, __controls, __body, __footer (DMNC-1592)' },
    ],
  },
  Notification: {
    origin: 'eidotter',
    consumers: [],
    since: '0.17.0',
    originNote: 'Toast: five colour types, featured icon rings, layered amber glow, auto-dismiss. Purely presentational; consumers own positioning.',
    changelog: [
      { version: '0.41.0', type: 'changed', description: 'Close control is the shared IconButton (md 36x36, pixel X, outline at rest, hover invert); .eidotter-notification__close reduced to placement (DMNC-1592)' },
      { version: '0.41.0', type: 'changed', description: 'Square corners (4px radius removed from container and image; close button unchanged); enter/exit use the shared eidotter-pop-in/out keyframes (DMNC-1592)' },
    ],
  },
  CmdPalette: {
    origin: 'eidotter',
    consumers: [],
    since: '0.20.0',
    originNote: '⌘K / Ctrl+K command palette overlay. Built on React Aria ModalOverlay/Modal/Dialog (same primitives as Modal). Generic items + scored search + keyboard navigation.',
    platforms: { react: { path: 'src/components/CmdPalette', status: 'canonical' } },
    changelog: [
      { version: '0.41.0', type: 'changed', description: 'Rebuilt on DosDialog (top placement, lg width, decorative strip); the JUMP TO head loses its amber fill (dark strip, yellow text); placeholder and row hints use text-muted, the selected row label and hint text-brand; the panel pops in/out (150ms) instead of the 8px drop; own cmdpal-enter/exit and backdrop keyframes removed (DMNC-1592)' },
      { version: '0.20.0', type: 'added', description: 'Initial CmdPalette — generic items with keywords, mod+k global hotkey, custom renderItem, useId() per-instance DOM ids, selected-clamp on items mutation' },
      { version: '0.41.0', type: 'changed', description: 'Fix: search input shows the 2px focus-visible ring instead of only a faint background tint (DMNC-1436)' },
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
      { version: '0.40.0', type: 'changed', description: 'Add additive decorative prop (aria-hidden, no progressbar role) so Gauge owns meter semantics' },
      { version: '0.37.0', type: 'added', description: 'Initial ProgressRing — discrete quantized segment arcs, phosphor glow, centre label, currentColor theming' },
    ],
  },
  CalendarHeatmap: {
    origin: 'tracker',
    consumers: ['tracker'],
    since: '0.37.0',
    originNote: 'Block-character month calendar heatmap (█ ░ · ▒). Domain-agnostic — takes a date→status map, not a domain object.',
    variants: {
      'size:sm': { description: 'Compact heatmap cells' },
      'size:md': { description: 'Standard heatmap cells' },
      'size:lg': { description: 'Large heatmap cells' },
    },
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
    originNote: 'Animated eiDotter mark (a.k.a. RizomorfAvatar): the Logo drawing (shared LogoGeometry, DMNC-1586) breathing, with runtime-measured quadratic-bezier arm connectors to Header nav badges (DMNC-1325; Header badge row: DMNC-1326).',
    variants: {
      'morph:true':  { description: 'Breath loop (scale 1 to 1.045 + glow swell, 4.3s ease-in-out), disabled under prefers-reduced-motion. Was the border-radius morph until 0.41.0', since: '0.39.0' },
      'morph:false': { description: 'Still mark, identical to <Logo>', since: '0.39.0' },
      'glow:true':   { description: '5px amber drop-shadow glow, removed under prefers-contrast: high', since: '0.41.0' },
      'glow:false':  { description: 'No glow', since: '0.41.0' },
    },
    platforms: { react: { path: 'src/components/Brand', status: 'canonical' } },
    changelog: [
      { version: '0.41.0', type: 'changed', description: 'Renders the Logo SVG geometry (pixel ring + lit yolk) instead of the CSS border-radius blob (DMNC-1586). morph now drives the breath animation (alias kept); new glow prop (5px, default true). Root class eidotter-mark unchanged; arms now start on the ring\'s outer edge (computeArmPaths startRadius option, additive)' },
      { version: '0.39.0', type: 'added', description: 'Initial Mark — soft-radial egg-yolk fill + CSS border-radius morph + SVG arm connectors with alternating control-point offsets' },
    ],
  },
  Logo: {
    origin: 'eidotter',
    consumers: [],
    since: '0.20.1',
    originNote: 'Foundation Logomark (Figma node 16-610): pixel-dotted ring around a lit amber yolk with a radial phosphor halo. Static counterpart of Mark; both render the internal LogoGeometry, which is also the source of public/favicon.svg.',
    variants: {
      'glow:true':  { description: '5px amber drop-shadow glow (was 6px until 0.41.0)', since: '0.20.1' },
      'glow:false': { description: 'No glow (print, email)', since: '0.20.1' },
    },
    platforms: { react: { path: 'src/components/Brand', status: 'canonical' } },
    changelog: [
      { version: '0.41.0', type: 'changed', description: 'Lit yolk (radial #FFD97A/#FFB000/#B87C00 gradient) replaces the flat amber yolk, two pixel highlights + white specular; glow 6px to 5px. Geometry extracted to the shared LogoGeometry so Logo, Mark and the favicon are one drawing (DMNC-1586)' },
      { version: '0.27.1', type: 'changed', description: 'Foundation Logomark: pixel-dotted ring + yolk + halo replaces the V2 yolk (DMNC-1031)' },
      { version: '0.20.1', type: 'added', description: 'Initial Logo (V2 yolk), with Wordmark and BrandLockup' },
    ],
  },
  Connector: {
    origin: 'eidotter',
    consumers: [],
    since: '0.39.0',
    originNote: 'Organic tapered-ribbon SVG overlay (DMNC-1388) — filled variable-width paths from a source node (the Mark) to N anchors, amber→category gradient, stop-at-edge attach, ResizeObserver/MutationObserver re-flow + rAF idle sway (reduced-motion safe). Decorative/aria-hidden; content lives in the DOM underneath.',
    variants: {
      'weight:delicate': { description: 'Thin near-straight product-chrome thread (default)', since: '0.39.0' },
      'weight:medium':   { description: 'Bolder ribbon for large surfaces', since: '0.39.0' },
    },
    platforms: { react: { path: 'src/components/Connector', status: 'canonical' } },
    changelog: [
      { version: '0.39.0', type: 'added', description: 'Initial Connector — tapered filled-path ribbons, per-target amber→category gradient, attach-at-edge geometry, idle sway' },
    ],
  },
  TimelineFeed: {
    origin: 'eidotter',
    consumers: [],
    since: '0.39.0',
    originNote: 'Dense product-grade feed (the "J" layout) — category dot · date · title · outlined kind-tag rows threaded by a thin amber spine, with a category chip row that culls the list. Shares the TimelineEntryData model with TimelineContainer.',
    platforms: { react: { path: 'src/components/TimelineFeed', status: 'canonical' } },
    changelog: [
      { version: '0.39.0', type: 'added', description: 'Initial TimelineFeed — dense category-dotted rows, amber-mono, controllable category filter' },
    ],
  },
  TimelinePage: {
    origin: 'eidotter',
    consumers: [],
    since: '0.39.0',
    originNote: 'Bret-Victor-style blog timeline (the "K2" layout) — year-grouped, amber-only spine + dots, neutral dates, big titles + description, right-hand hover preview panel, optional Mark brand slot + category filter. Shares the TimelineEntryData model with TimelineContainer.',
    platforms: { react: { path: 'src/components/TimelinePage', status: 'canonical' } },
    changelog: [
      { version: '0.39.0', type: 'added', description: 'Initial TimelinePage — grouped blog timeline with hover-preview panel and category filter' },
    ],
  },

  Gauge: {
    origin: 'eidotter',
    consumers: ['doctor-portal', 'dosbts'],
    since: '0.40.0',
    originNote: 'Ring gauge for one metabolic value. Carries the SCUM metabolism-screen dial pattern (value, target, provenance) as used in diabetes apps. Intended consumers: doctor-portal, dosbts (not yet adopted). Figma: Web DS / Health.',
    variants: {
      'size:sm': { description: 'Compact gauge', since: '0.40.0' },
      'size:md': { description: 'Standard gauge', since: '0.40.0' },
      'size:lg': { description: 'Hero gauge', since: '0.40.0' },
      'tone:neutral': { description: 'Unfilled/neutral reading with no judgement', since: '0.40.0' },
      'tone:info': { description: 'Informational reading (solid fill)', since: '0.40.0' },
      'tone:success': { description: 'In-target reading (dither fill)', since: '0.40.0' },
      'tone:warning': { description: 'Needs attention (hatch fill)', since: '0.40.0' },
      'tone:critical': { description: 'Out-of-range reading (dotted fill)', since: '0.40.0' },
      'status:ok': { description: 'Live value rendered normally', since: '0.40.0' },
      'status:loading': { description: 'Value is being fetched', since: '0.40.0' },
      'status:empty': { description: 'No data available', since: '0.40.0' },
      'status:stale': { description: 'Value is older than expected', since: '0.40.0' },
      'status:unknown': { description: 'Value could not be determined', since: '0.40.0' },
    },
    platforms: {
      react:   { path: 'src/components/Gauge', status: 'canonical' },
      swiftui: { status: 'planned' },
    },
    changelog: [
      { version: '0.40.0', type: 'added', description: 'Initial Gauge (health metabolism family)' },
      { version: '0.41.0', type: 'changed', description: 'Centre text inset by the ring thickness so it stays in the hole; md secondary drops its unit onto a second line, sm secondary sits under the ring; full label stays when no shortLabel (data-has-short); value keeps its accent colour (DMNC-1573)' },
    ],
  },

  Meter: {
    origin: 'eidotter',
    consumers: ['dosbts'],
    since: '0.40.0',
    originNote: 'Single labelled meter bar with tick and tone/pattern pairing. Carries the SCUM stat-bar pattern (food, water, energy) for diabetes values such as carbs on board. Intended consumer: dosbts (not yet adopted). Figma: Web DS / Health.',
    variants: {
      'orientation:vertical': { description: 'Vertical bar with label beneath', since: '0.40.0' },
      'orientation:horizontal': { description: 'Horizontal bar with label alongside', since: '0.40.0' },
      'size:xs': { description: 'Extra-compact meter', since: '0.40.0' },
      'size:sm': { description: 'Compact meter', since: '0.40.0' },
      'size:md': { description: 'Standard meter', since: '0.40.0' },
      'tone:neutral': { description: 'Unfilled/neutral reading with no judgement', since: '0.40.0' },
      'tone:info': { description: 'Informational reading (solid fill)', since: '0.40.0' },
      'tone:success': { description: 'In-target reading (dither fill)', since: '0.40.0' },
      'tone:warning': { description: 'Needs attention (hatch fill)', since: '0.40.0' },
      'tone:critical': { description: 'Out-of-range reading (dotted fill)', since: '0.40.0' },
      'pattern:solid': { description: 'Solid fill', since: '0.40.0' },
      'pattern:dither': { description: 'Dither fill', since: '0.40.0' },
      'pattern:hatch': { description: 'Hatch fill', since: '0.40.0' },
      'pattern:dotted': { description: 'Dotted fill', since: '0.40.0' },
    },
    platforms: {
      react:   { path: 'src/components/Meter', status: 'canonical' },
      swiftui: { status: 'planned' },
    },
    changelog: [
      { version: '0.40.0', type: 'added', description: 'Initial Meter (health metabolism family)' },
      { version: '0.41.0', type: 'changed', description: 'Vertical meters size to their reading in a MeterGroup row (container moved to the caption), readout no longer wraps, the unit stacks under the number in a narrow group; full label stays when no shortLabel (data-has-short) (DMNC-1573)' },
    ],
  },

  MeterGroup: {
    origin: 'eidotter',
    consumers: ['dosbts'],
    since: '0.40.0',
    originNote: 'Layout wrapper for several Meters. Carries the SCUM metabolism-screen stat cluster pattern. Intended consumer: dosbts (not yet adopted). Figma: Web DS / Health.',
    variants: {
      'layout:row': { description: 'Meters in a single row', since: '0.40.0' },
      'layout:grid': { description: 'Meters in a wrapping grid', since: '0.40.0' },
    },
    platforms: {
      react:   { path: 'src/components/Meter', status: 'canonical' },
      swiftui: { status: 'planned' },
    },
    changelog: [
      { version: '0.40.0', type: 'added', description: 'Initial MeterGroup (health metabolism family)' },
      { version: '0.41.0', type: 'changed', description: 'Row layout wraps instead of overflowing (the old 30rem wrap rule targeted its own container and never applied) (DMNC-1573)' },
    ],
  },

  RangeBar: {
    origin: 'eidotter',
    consumers: ['doctor-portal', 'dosbts'],
    since: '0.40.0',
    originNote: 'Banded range bar showing where a value sits against target segments, as in diabetes time-in-range displays. Carries the SCUM condition-bar pattern. Intended consumers: doctor-portal, dosbts (not yet adopted). Figma: Web DS / Health.',
    variants: {
      'orientation:vertical': { description: 'Vertical track', since: '0.40.0' },
      'orientation:horizontal': { description: 'Horizontal track', since: '0.40.0' },
      'size:sm': { description: 'Compact track', since: '0.40.0' },
      'size:md': { description: 'Standard track', since: '0.40.0' },
      'size:lg': { description: 'Large track', since: '0.40.0' },
      'tone:neutral': { description: 'Unfilled/neutral reading with no judgement', since: '0.40.0' },
      'tone:info': { description: 'Informational reading (solid fill)', since: '0.40.0' },
      'tone:success': { description: 'In-target reading (dither fill)', since: '0.40.0' },
      'tone:warning': { description: 'Needs attention (hatch fill)', since: '0.40.0' },
      'tone:critical': { description: 'Out-of-range reading (dotted fill)', since: '0.40.0' },
      'pattern:none': { description: 'No fill pattern', since: '0.40.0' },
      'pattern:solid': { description: 'Solid fill', since: '0.40.0' },
      'pattern:dither': { description: 'Dither fill', since: '0.40.0' },
      'pattern:hatch': { description: 'Hatch fill', since: '0.40.0' },
      'pattern:dotted': { description: 'Dotted fill', since: '0.40.0' },
    },
    platforms: {
      react:   { path: 'src/components/RangeBar', status: 'canonical' },
      swiftui: { status: 'planned' },
    },
    changelog: [
      { version: '0.40.0', type: 'added', description: 'Initial RangeBar (health metabolism family)' },
      { version: '0.42.0', type: 'changed', description: 'Vertical legend wraps under the bar in a narrow container; legend names wrap instead of truncating and a bound moves to the next line whole; percent and target label separated by a gap and a space; lane and legend text print black on white (DMNC-1610)' },
    ],
  },

  SeriesBars: {
    origin: 'eidotter',
    consumers: ['doctor-portal'],
    since: '0.40.0',
    originNote: 'Bar series for per-period values such as daily carbs or time-in-range, as in diabetes reports. Carries the SCUM history-chart pattern. Intended consumer: doctor-portal (not yet adopted). Figma: Web DS / Health.',
    variants: {
      'size:sm': { description: 'Short plot', since: '0.40.0' },
      'size:md': { description: 'Standard plot', since: '0.40.0' },
      'size:lg': { description: 'Tall plot', since: '0.40.0' },
      'tone:neutral': { description: 'Unfilled/neutral reading with no judgement', since: '0.40.0' },
      'tone:info': { description: 'Informational reading (solid fill)', since: '0.40.0' },
      'tone:success': { description: 'In-target reading (dither fill)', since: '0.40.0' },
      'tone:warning': { description: 'Needs attention (hatch fill)', since: '0.40.0' },
      'tone:critical': { description: 'Out-of-range reading (dotted fill)', since: '0.40.0' },
    },
    platforms: {
      react:   { path: 'src/components/SeriesBars', status: 'canonical' },
      swiftui: { status: 'planned' },
    },
    changelog: [
      { version: '0.40.0', type: 'added', description: 'Initial SeriesBars (health metabolism family)' },
      { version: '0.41.0', type: 'changed', description: 'Goal label moved into a reserved band above the plot so it never paints over a bar (DMNC-1573)' },
      { version: '0.42.0', type: 'added', description: 'Additive unit and format (formatValue digits/percent/signed) props: values and the goal carry the unit in the summary, value table and bar titles; a goal label that already holds the goal value is not repeated (DMNC-1610)' },
      { version: '0.42.0', type: 'changed', description: 'Sparse ticks (tickEvery > 1) overflow into empty neighbour columns instead of truncating; first and last labels pinned to the plot edges; goal tag and ticks print black on white (DMNC-1610)' },
    ],
  },

  DecayStrip: {
    origin: 'eidotter',
    consumers: ['dosbts'],
    since: '0.40.0',
    originNote: 'Stepped block strip of consumer-supplied remaining-amount samples with a now marker (active-on-board curve in diabetes apps). Carries the SCUM timed-effect pattern; no absorption math. Intended consumer: dosbts (not yet adopted). Figma: Web DS / Health.',
    variants: {
      'size:sm': { description: 'Compact strip', since: '0.40.0' },
      'size:md': { description: 'Standard strip', since: '0.40.0' },
      'size:lg': { description: 'Large strip', since: '0.40.0' },
      'tone:neutral': { description: 'Unfilled/neutral reading with no judgement', since: '0.40.0' },
      'tone:info': { description: 'Informational reading', since: '0.40.0' },
      'tone:success': { description: 'In-target reading', since: '0.40.0' },
      'tone:warning': { description: 'Needs attention', since: '0.40.0' },
      'tone:critical': { description: 'Out-of-range reading', since: '0.40.0' },
    },
    platforms: {
      react:   { path: 'src/components/DecayStrip', status: 'canonical' },
      swiftui: { status: 'planned' },
    },
    changelog: [
      { version: '0.40.0', type: 'added', description: 'Initial DecayStrip (health metabolism family)' },
      { version: '0.41.0', type: 'changed', description: 'Cells shrink evenly and the from/to labels move under the cells in a narrow container, so the whole window fits at phone width; brand colour no longer dropped by the size class (DMNC-1573)' },
    ],
  },

  VitalsStrip: {
    origin: 'eidotter',
    consumers: ['doctor-portal', 'dosbts'],
    since: '0.40.0',
    originNote: 'Server-safe row of vitals tiles with value, unit, secondary text and bands, and status. Carries the SCUM vitals header pattern for diabetes summaries. Intended consumers: doctor-portal, dosbts (not yet adopted). Figma: Web DS / Health.',
    variants: {
      'size:sm': { description: 'Compact tiles', since: '0.40.0' },
      'size:md': { description: 'Standard tiles', since: '0.40.0' },
      'size:lg': { description: 'Large tiles', since: '0.40.0' },
      'tone:neutral': { description: 'Unfilled/neutral reading with no judgement', since: '0.40.0' },
      'tone:info': { description: 'Informational reading', since: '0.40.0' },
      'tone:success': { description: 'In-target reading', since: '0.40.0' },
      'tone:warning': { description: 'Needs attention', since: '0.40.0' },
      'tone:critical': { description: 'Out-of-range reading', since: '0.40.0' },
      'status:ok': { description: 'Live value rendered normally', since: '0.40.0' },
      'status:loading': { description: 'Value is being fetched', since: '0.40.0' },
      'status:empty': { description: 'No data available', since: '0.40.0' },
      'status:stale': { description: 'Value is older than expected', since: '0.40.0' },
      'status:unknown': { description: 'Value could not be determined', since: '0.40.0' },
    },
    platforms: {
      react:   { path: 'src/components/VitalsStrip', status: 'canonical' },
      swiftui: { status: 'planned' },
    },
    changelog: [
      { version: '0.40.0', type: 'added', description: 'Initial VitalsStrip (health metabolism family)' },
      { version: '0.41.0', type: 'changed', description: 'No value overflow at phone width: two columns and a one-step-smaller value under 30rem, value never wraps or widens its tile, state words at body size; value keeps its accent colour (DMNC-1573)' },
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
