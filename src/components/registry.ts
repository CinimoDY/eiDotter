export type ProjectId =
  | 'eidotter' | 'spacewar' | 'rizomorf' | 'pomodoke-calendar'
  | 'keepcoin' | 'steuerdash' | 'sella' | 'lifelines' | 'betamorf';

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
  },

  AccordionFill: {
    origin: 'eidotter',
    consumers: ['rizomorf'],
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

  Checkbox:      { origin: 'eidotter', consumers: ['steuerdash'] },
  CommandPrompt: { origin: 'eidotter', consumers: ['rizomorf'] },
  Icon:          { origin: 'eidotter', consumers: ['rizomorf'] },
  Input:         { origin: 'eidotter', consumers: ['steuerdash'] },
  Modal:         { origin: 'eidotter', consumers: ['pomodoke-calendar'] },
  Progress:      { origin: 'eidotter', consumers: ['steuerdash'], since: '0.3.0' },
  RetroEffects:  { origin: 'spacewar', consumers: ['spacewar', 'rizomorf'], originNote: 'CRT scanline/glow effects from Spacewar!' },
  Stat:          { origin: 'steuerdash', consumers: ['steuerdash'], originNote: 'Key-value display created for tax dashboard' },
  Switch:        { origin: 'eidotter', consumers: [] },
  FilterBar:     { origin: 'eidotter', consumers: ['lifelines', 'rizomorf'], originNote: 'Multi-select toggle group for faceted filtering' },

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

  Tabs:          { origin: 'eidotter', consumers: ['steuerdash'] },
  Terminal:      { origin: 'eidotter', consumers: ['rizomorf'] },
  TimelineNode:  { origin: 'lifelines', consumers: ['lifelines', 'rizomorf'], originNote: 'Timeline markers from Lifelines project' },
  InlineExpand:  { origin: 'rizomorf', consumers: ['rizomorf'], originNote: 'Inline disclosure widget for expanding text within prose' },
  Separator:     { origin: 'rizomorf', consumers: ['rizomorf'], originNote: 'Horizontal/vertical divider for content separation' },
  TimelineContainer: { origin: 'lifelines', consumers: ['lifelines'], originNote: 'Multi-zoom timeline with year/month/day/hour views. Supports interactive, static, and feed modes.' },

  // Chat components
  ChatMessage:   { origin: 'eidotter', consumers: [], originNote: 'Single chat message with role-based DOS styling and streaming cursor' },
  ChatHistory:   { origin: 'eidotter', consumers: [], originNote: 'Scrollable message list with auto-scroll and role="log" accessibility' },
  ChatInput:     { origin: 'eidotter', consumers: [], originNote: 'Multiline DOS-styled textarea with Enter-to-send' },
  ChatContainer: { origin: 'eidotter', consumers: [], originNote: 'Composes ChatHistory + ChatInput into a complete chat interface' },

  // Layout components
  Footer:        { origin: 'eidotter', consumers: [], originNote: 'DOS-themed footer with default legal links (Impressum + Datenschutz) for German compliance' },
  Header: {
    origin: 'eidotter',
    consumers: [],
    since: '0.18.0',
    originNote: 'Composite site header (brand + nav + user slot) — ported from April 2026 design handoff',
    variants: {
      'variant:retro':  { description: 'Phosphor border-bottom glow + brand text-shadow', since: '0.18.0' },
      'variant:modern': { description: 'Flat, no phosphor effects', since: '0.18.0' },
    },
    platforms: {
      react: { path: 'src/components/Header', status: 'canonical' },
    },
    changelog: [
      { version: '0.18.0', type: 'added', description: 'Initial Header component composing Nav; retro/modern variants; sticky default' },
    ],
  },

  // New in v0.18.0 — design handoff treeshake
  InlineLink: {
    origin: 'rizomorf',
    consumers: ['rizomorf'],
    since: '0.18.0',
    originNote: 'Navigational anchor distinct from InlineExpand — destination vs disclosure. Closes rizomorf parity gap #03.',
    platforms: { react: { path: 'src/components/InlineLink', status: 'canonical' } },
    changelog: [
      { version: '0.18.0', type: 'added', description: 'Initial InlineLink — dotted underline, phosphor-invert hover, external variant' },
    ],
  },
  DosFigure: {
    origin: 'eidotter',
    consumers: ['rizomorf'],
    since: '0.18.0',
    originNote: 'Demoscene-style painted-screen placeholder — amber chrome, scanline sweep, optional pins. Closes rizomorf parity gap #02.',
    platforms: { react: { path: 'src/components/DosFigure', status: 'canonical' } },
    changelog: [
      { version: '0.18.0', type: 'added', description: 'Initial DosFigure — scanline sweep, flicker, pin pulse, reduced-motion safe' },
    ],
  },
  CmdPalette: {
    origin: 'eidotter',
    consumers: [],
    since: '0.18.0',
    originNote: '⌘K command palette overlay generalised from April 2026 handoff timeline prototype. Built on React Aria overlay primitives.',
    platforms: { react: { path: 'src/components/CmdPalette', status: 'canonical' } },
    changelog: [
      { version: '0.18.0', type: 'added', description: 'Initial CmdPalette — searchable items, keyboard nav, mod+k hotkey, custom renderItem' },
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
