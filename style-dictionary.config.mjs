/**
 * Style Dictionary v4 Configuration (ESM)
 *
 * Builds design tokens from DTCG-format JSON files.
 * Supports theming via file layering (base + theme overrides).
 *
 * Usage:
 *   npm run build-tokens           # Build all
 *   npx style-dictionary build     # Same as above
 */

import StyleDictionary from 'style-dictionary';

// =============================================================================
// Custom Transforms
// =============================================================================

// Transform shadow composite tokens to CSS box-shadow
StyleDictionary.registerTransform({
  name: 'shadow/css',
  type: 'value',
  transitive: true,
  filter: (token) => token.$type === 'shadow',
  transform: (token) => {
    // SD v4 pre-transforms shadows to strings, so $value may already be formatted
    // Use original.$value to get the raw object structure
    const v = token.original?.$value || token.$value;

    // If it's already a string (pre-transformed), check if it's transparent
    if (typeof v === 'string') {
      if (v.includes('#00000000') || v.includes('transparent')) return 'none';
      return v;
    }

    // Handle object format from original
    if (!v || typeof v !== 'object') return 'none';

    // Handle transparent/none shadow
    if (v.color === '#00000000' || v.color === 'transparent') return 'none';

    // Extract values - DTCG shadow values are strings like "2px"
    const offsetX = v.offsetX || '0px';
    const offsetY = v.offsetY || '0px';
    const blur = v.blur || '0px';
    const spread = v.spread || '0px';
    const color = v.color || '#000000';

    return `${offsetX} ${offsetY} ${blur} ${spread} ${color}`;
  }
});

// Transform fontFamily arrays to CSS font-family string
StyleDictionary.registerTransform({
  name: 'fontFamily/css',
  type: 'value',
  transitive: true,
  filter: (token) => token.$type === 'fontFamily',
  transform: (token) => {
    const v = token.$value;
    if (Array.isArray(v)) {
      return v.map(f => f.includes(' ') ? `"${f}"` : f).join(', ');
    }
    return v;
  }
});

// WCAG 2.3.1 hard floor on flicker periods.
//
// Tier-4 effect tokens can include a `wcag-flicker-floor` annotation (in
// milliseconds) on the token definition. This transform compares the token's
// numeric duration value against the floor and throws at build time if a
// consumer/designer drives the value below it. The annotation lives at the
// token's top level (alongside $value, $type, $description) — Style Dictionary
// passes it through to the token object so we can read it here.
//
// Currently used by effect.flicker.period (333ms = 3Hz max).
// Per Phase 0j review (ce-doc-review on cozy-tumbling-rivest-ultraplan.md).
StyleDictionary.registerTransform({
  name: 'duration/wcag-flicker-clamp',
  type: 'value',
  transitive: true,
  filter: (token) => {
    const floor = token.original?.['wcag-flicker-floor'] ?? token['wcag-flicker-floor'];
    return floor !== undefined && token.$type === 'duration';
  },
  transform: (token) => {
    const floorMs = Number(token.original?.['wcag-flicker-floor'] ?? token['wcag-flicker-floor']);
    const raw = String(token.$value).trim();
    const match = raw.match(/^(\d+(?:\.\d+)?)\s*(ms|s)?$/i);
    if (!match) {
      throw new Error(
        `[wcag-flicker-clamp] Token at ${token.path?.join('.') ?? '?'} has unparseable duration value "${raw}". Expected formats: "500ms" or "0.5s".`
      );
    }
    const num = Number(match[1]);
    const unit = (match[2] || 'ms').toLowerCase();
    const valueMs = unit === 's' ? num * 1000 : num;
    if (valueMs < floorMs) {
      throw new Error(
        `[wcag-flicker-clamp] WCAG 2.3.1 violation: ${token.path?.join('.') ?? '?'} = ${raw} (${valueMs}ms) is below the ${floorMs}ms floor (3Hz max). Adjust src/tokens/effects-params.tokens.json or its theme override.`
      );
    }
    return token.$value;
  }
});

// =============================================================================
// Custom Formats
// =============================================================================

// Helper: Convert camelCase to kebab-case
function toKebabCase(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

// Helper: Convert kebab/camelCase to PascalCase
function toPascalCase(str) {
  return str
    .replace(/[-_](.)/g, (_, c) => c.toUpperCase())
    .replace(/^(.)/, (_, c) => c.toUpperCase());
}

// Helper: Get nested value from token dictionary
function getTokenValue(tokens, path) {
  return path.reduce((obj, key) => obj?.[key], tokens);
}

// Custom format: Swift constants
StyleDictionary.registerFormat({
  name: 'swift/constants',
  format: ({ dictionary }) => {
    const header = `//
// EiDotterTokens.swift
// AUTO-GENERATED — Do not edit manually
//
// Generated from: src/tokens/base.tokens.json
// Run: npm run build-tokens
//

import SwiftUI

`;

    const lines = [];

    // Colors
    lines.push('// MARK: - Colors\n');
    lines.push('public enum EiDotterColors {');

    const colorTokens = dictionary.allTokens.filter(t => t.$type === 'color' || t.type === 'color');
    for (const token of colorTokens) {
      const name = token.path.map(toPascalCase).join('');
      const hex = (token.$value || token.value || '').replace('#', '');
      if (!hex || hex.length < 6) continue;

      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      const a = hex.length >= 8 ? parseInt(hex.substring(6, 8), 16) / 255.0 : 1.0;

      if (token.$description || token.description) {
        lines.push(`    /// ${token.$description || token.description}`);
      }
      lines.push(`    public static let ${name[0].toLowerCase() + name.slice(1)} = Color(red: ${(r/255).toFixed(3)}, green: ${(g/255).toFixed(3)}, blue: ${(b/255).toFixed(3)}, opacity: ${a.toFixed(3)})`);
    }
    lines.push('}\n');

    // Spacing
    lines.push('// MARK: - Spacing\n');
    lines.push('public enum EiDotterSpacing {');
    const spacingTokens = dictionary.allTokens.filter(t =>
      t.path[0] === 'spacing' && (t.$value || t.value)
    );
    for (const token of spacingTokens) {
      const rawName = token.path.slice(1).join('');
      // Prefix with 'sp' if name starts with a digit (invalid Swift identifier)
      const name = /^\d/.test(rawName) ? `sp${rawName}` : rawName[0].toLowerCase() + rawName.slice(1);
      const val = String(token.$value || token.value).replace('px', '');
      const num = parseFloat(val);
      if (isNaN(num)) continue;
      lines.push(`    public static let ${name}: CGFloat = ${num}`);
    }
    lines.push('}\n');

    // Typography
    lines.push('// MARK: - Typography\n');
    lines.push('public enum EiDotterTypography {');
    const fontSizeTokens = dictionary.allTokens.filter(t =>
      t.path[0] === 'typography' && t.path[1] === 'fontSize'
    );
    for (const token of fontSizeTokens) {
      const name = token.path.slice(2).map(toPascalCase).join('');
      const raw = String(token.$value || token.value);
      const isRem = raw.endsWith('rem');
      const num = isRem ? parseFloat(raw) * 16 : parseFloat(raw.replace('px', ''));
      if (isNaN(num)) continue;
      lines.push(`    public static let fontSize${name}: CGFloat = ${num}`);
    }
    lines.push('}\n');

    // Dimensions (Tier 3 — DOS-domain physical sizes)
    // Skip the `placeholder` stub token; only emit real T3 tokens once they land.
    const dimensionTokens = dictionary.allTokens.filter(t =>
      t.path[0] === 'dimension' && !t.path.includes('placeholder') && (t.$value || t.value)
    );
    if (dimensionTokens.length > 0) {
      lines.push('// MARK: - Dimensions (Tier 3)\n');
      lines.push('public enum EiDotterDimensions {');
      for (const token of dimensionTokens) {
        const name = token.path.slice(1).map(toPascalCase).join('');
        const swiftName = name[0].toLowerCase() + name.slice(1);
        const raw = String(token.$value || token.value);
        const isRem = raw.endsWith('rem');
        const num = isRem ? parseFloat(raw) * 16 : parseFloat(raw.replace('px', ''));
        if (isNaN(num)) continue;
        if (token.$description || token.description) {
          lines.push(`    /// ${token.$description || token.description}`);
        }
        lines.push(`    public static let ${swiftName}: CGFloat = ${num}`);
      }
      lines.push('}\n');
    }

    // Effects (Tier 4 shared core — phosphor shader parameters)
    // Filter OUT effect.web.* (web extension; doesn't transfer to Apple platforms)
    // Per ideation/2026-05-08-phosphor-shader-tokens.md.
    const effectTokens = dictionary.allTokens.filter(t =>
      t.path[0] === 'effect' && t.path[1] !== 'web' && (t.$value !== undefined || t.value !== undefined)
    );
    if (effectTokens.length > 0) {
      lines.push('// MARK: - Effects (Tier 4 shared core)\n');
      lines.push('public enum EiDotterEffects {');
      for (const token of effectTokens) {
        const name = token.path.slice(1).map(toPascalCase).join('');
        const swiftName = name[0].toLowerCase() + name.slice(1);
        const type = token.$type || token.type;
        const raw = String(token.$value ?? token.value);
        if (token.$description || token.description) {
          lines.push(`    /// ${token.$description || token.description}`);
        }
        if (type === 'duration') {
          // ms → seconds (TimeInterval)
          const m = raw.match(/^(\d+(?:\.\d+)?)\s*(ms|s)?$/i);
          if (!m) continue;
          const ms = (m[2] || 'ms').toLowerCase() === 's' ? Number(m[1]) * 1000 : Number(m[1]);
          lines.push(`    public static let ${swiftName}: TimeInterval = ${(ms / 1000).toFixed(3)}`);
        } else if (type === 'dimension') {
          // px/rem → CGFloat (points)
          const isRem = raw.endsWith('rem');
          const num = isRem ? parseFloat(raw) * 16 : parseFloat(raw.replace('px', ''));
          if (isNaN(num)) continue;
          lines.push(`    public static let ${swiftName}: CGFloat = ${num}`);
        } else if (type === 'number') {
          // unitless 0-1 multipliers → Double
          const num = parseFloat(raw);
          if (isNaN(num)) continue;
          lines.push(`    public static let ${swiftName}: Double = ${num}`);
        }
      }
      lines.push('}\n');
    }

    return header + lines.join('\n') + '\n';
  }
});

// Custom format: Figma DTCG output (filtered by tier).
//
// Emits a DTCG-compliant JSON file containing only the tokens that match the
// `tierFilter` predicate. Used to push tier-specific token sets to per-platform
// Figma libraries:
//   - figma-dtcg/foundation → T1 primitives + T3 dimensions + T4 shared core
//                             (consumed by the eiDotter Foundation Figma library)
//   - figma-dtcg/web        → web T2 + T4 web extension
//                             (consumed by the eiDotter Web DS Figma library)
//
// Apple iOS DS / macOS DS / tvOS DS subscribe to Foundation in Figma and add
// their own platform T2 directly in Figma (Apple HIG names) — no DTCG output
// needed for them. The reverse pipeline (sync-figma-to-swift) reads those
// directly from Figma snapshots.
//
// The serializer walks `dictionary.tokens` (original DTCG structure preserved)
// and prunes branches whose tokens don't pass the filter. Token values are
// taken from `original.$value` to preserve raw JSON (pre-transform) so Figma
// receives the canonical source-of-truth representation.
function createDtcgFormat(name, tierFilter) {
  StyleDictionary.registerFormat({
    name,
    format: ({ dictionary }) => {
      function prune(node, path) {
        // Leaf token (DTCG marker: has $value)
        if (node && typeof node === 'object' && node.$value !== undefined) {
          if (!tierFilter(path)) return undefined;
          // Use original.$value to preserve un-transformed source values
          const out = { ...node };
          if (node.original?.$value !== undefined) out.$value = node.original.$value;
          // Strip Style Dictionary internal fields
          delete out.original;
          delete out.attributes;
          delete out.path;
          delete out.name;
          delete out.filePath;
          delete out.isSource;
          delete out.key;
          return out;
        }
        // Container — recurse
        if (node && typeof node === 'object') {
          const out = {};
          for (const [k, v] of Object.entries(node)) {
            if (k.startsWith('$')) {
              out[k] = v; // preserve $type, $description on containers
              continue;
            }
            const child = prune(v, [...path, k]);
            if (child !== undefined && (typeof child !== 'object' || Object.keys(child).length > 0)) {
              out[k] = child;
            }
          }
          return out;
        }
        return undefined;
      }
      const filtered = prune(dictionary.tokens, []) || {};
      return JSON.stringify(filtered, null, 2) + '\n';
    },
  });
}

createDtcgFormat('figma-dtcg/foundation', (path) => {
  // T1: color.cga.* and color.semantic.text.aiDraft / aiDraftGlow (brand-locked)
  if (path[0] === 'color' && path[1] === 'cga') return true;
  // T1: color.cga-true.* — authentic CGA functional-status primitives (DMNC-1001),
  // theme-invariant; apps alias these for honest status colour.
  if (path[0] === 'color' && path[1] === 'cga-true') return true;
  if (path[0] === 'color' && path[1] === 'semantic' && path[2] === 'text' && (path[3] === 'aiDraft' || path[3] === 'aiDraftGlow')) return true;
  // T3: dimension.* (excluding the placeholder stub)
  if (path[0] === 'dimension' && !path.includes('placeholder')) return true;
  // T4 shared core: effect.* but NOT effect.web.*
  if (path[0] === 'effect' && path[1] !== 'web') return true;
  // T4 motion: motion.* (durations + easings) for the Foundation "Motion" collection.
  if (path[0] === 'motion') return true;
  return false;
});

createDtcgFormat('figma-dtcg/web', (path) => {
  // Web T2: color.semantic.* (except aiDraft/aiDraftGlow which are T1-promoted),
  // typography, spacing, borderRadius, borderWidth, shadow, duration, opacity,
  // zIndex, focusRing, effects (color overlays).
  if (path[0] === 'color' && path[1] === 'semantic') {
    if (path[2] === 'text' && (path[3] === 'aiDraft' || path[3] === 'aiDraftGlow')) return false;
    return true;
  }
  if (['typography', 'spacing', 'borderRadius', 'borderWidth', 'shadow', 'duration', 'opacity', 'zIndex', 'focusRing', 'effects'].includes(path[0])) return true;
  // T4 web extension
  if (path[0] === 'effect' && path[1] === 'web') return true;
  return false;
});

// Custom format: Tailwind CSS Preset
StyleDictionary.registerFormat({
  name: 'tailwind/preset',
  format: ({ dictionary }) => {
    const tokens = dictionary.tokens;

    // Build colors object
    const colors = {};

    // CGA colors
    const cgaColors = tokens.color?.cga || {};
    for (const [name, token] of Object.entries(cgaColors)) {
      if (token.$value || token.value) {
        colors[`cga-${toKebabCase(name)}`] = token.$value || token.value;
      }
    }

    // Semantic colors — derive Tailwind utility class names from
    // tokens.color.semantic by walking the tree (per Phase 0j review).
    // When data-theme overrides the underlying CSS vars, Tailwind utilities
    // update automatically.
    //
    // Naming convention (irregular by category — not a simple kebab-case
    // of the token path):
    //   color.semantic.background.X  → dos-bg-X
    //   color.semantic.text.X        → dos-text-X      (aiDraft → dos-text-ai-draft)
    //   color.semantic.border.X      → dos-border-X
    //   color.semantic.link.default  → dos-link        (default key dropped)
    //   color.semantic.link.X        → dos-link-X      (other keys kept)
    //   color.semantic.status.X      → dos-X           (no category prefix)
    //   color.semantic.alert.X       → dos-alert-X
    //   color.semantic.text.aiDraftGlow → omitted (text-shadow only, not a Tailwind utility per token's own $description)
    //
    // The semanticVarMap parity test asserts presence not insertion order
    // (per Phase 0j review — the old hardcoded map had a hand-curated order;
    // tree-walk order differs but is deterministic).
    const SEMANTIC_CATEGORY_RULES = {
      background:  { prefix: 'bg' },
      text:        { prefix: 'text' },
      border:      { prefix: 'border' },
      link:        { prefix: 'link', defaultKey: 'default' },
      status:      { prefix: '' },          // no category prefix in utility name
      alert:       { prefix: 'alert' },
    };
    // aiDraftGlow lives in color.semantic.text but isn't a Tailwind utility
    // (per its own $description: "Used in text-shadow only; no Tailwind utility").
    const SEMANTIC_TOKENS_TO_OMIT = new Set(['aiDraftGlow', 'aiGradientFrom', 'aiGradientTo', 'aiGradientFromLight', 'aiGradientToLight']);

    const semantic = tokens.color?.semantic ?? {};
    for (const [category, rules] of Object.entries(SEMANTIC_CATEGORY_RULES)) {
      const subtree = semantic[category];
      if (!subtree || typeof subtree !== 'object') continue;
      for (const [key, token] of Object.entries(subtree)) {
        if (key.startsWith('$')) continue;
        if (SEMANTIC_TOKENS_TO_OMIT.has(key)) continue;
        if (!token || typeof token !== 'object' || (token.$value === undefined && token.value === undefined)) continue;

        // Build utility-class name
        const kebabKey = toKebabCase(key);
        let utilityName;
        if (rules.defaultKey === key) {
          utilityName = rules.prefix ? `dos-${rules.prefix}` : 'dos';
        } else if (rules.prefix === '') {
          utilityName = `dos-${kebabKey}`;
        } else {
          utilityName = `dos-${rules.prefix}-${kebabKey}`;
        }

        // CSS var name always follows the canonical path: --color-semantic-<category>-<key>
        const cssVar = `--color-semantic-${category}-${kebabKey}`;
        colors[utilityName] = `var(${cssVar})`;
      }
    }

    // Build fontFamily object
    const fontFamily = {};
    const fontFamilies = tokens.typography?.fontFamily || {};
    for (const [name, token] of Object.entries(fontFamilies)) {
      const value = token.$value || token.value;
      if (Array.isArray(value)) {
        fontFamily[`dos${name === 'primary' ? '' : `-${name}`}`] = value.map(f =>
          f.includes(' ') ? `"${f}"` : f
        );
      }
    }

    // Build fontSize object
    const fontSize = {};
    const fontSizes = tokens.typography?.fontSize || {};
    for (const [name, token] of Object.entries(fontSizes)) {
      if (token.$value || token.value) {
        fontSize[`dos-${name}`] = token.$value || token.value;
      }
    }

    // Build lineHeight object
    const lineHeight = {};
    const lineHeights = tokens.typography?.lineHeight || {};
    for (const [name, token] of Object.entries(lineHeights)) {
      if (token.$value || token.value) {
        lineHeight[`dos-${name}`] = String(token.$value || token.value);
      }
    }

    // Build fontWeight object
    const fontWeight = {};
    const fontWeights = tokens.typography?.fontWeight || {};
    for (const [name, token] of Object.entries(fontWeights)) {
      if (token.$value || token.value) {
        fontWeight[`dos-${name}`] = String(token.$value || token.value);
      }
    }

    // Build spacing object
    const spacing = {};
    const spacingTokens = tokens.spacing || {};
    for (const [name, token] of Object.entries(spacingTokens)) {
      if (name.startsWith('$')) continue; // Skip $description
      if (token.$value || token.value) {
        spacing[`dos-${name}`] = token.$value || token.value;
      }
    }

    // Build borderRadius object
    const borderRadius = {};
    const radiusTokens = tokens.borderRadius || {};
    for (const [name, token] of Object.entries(radiusTokens)) {
      if (name.startsWith('$')) continue;
      if (token.$value || token.value) {
        borderRadius[`dos-${name}`] = token.$value || token.value;
      }
    }

    // Build boxShadow object
    const boxShadow = {};
    const shadowTokens = tokens.shadow || {};
    for (const [name, token] of Object.entries(shadowTokens)) {
      if (name.startsWith('$')) continue;
      const v = token.$value || token.value;
      if (typeof v === 'string') {
        boxShadow[`dos-${name}`] = v;
      } else if (v && typeof v === 'object') {
        const { offsetX = '0px', offsetY = '0px', blur = '0px', spread = '0px', color = '#000' } = v;
        if (color === '#00000000' || color === 'transparent') {
          boxShadow[`dos-${name}`] = 'none';
        } else {
          boxShadow[`dos-${name}`] = `${offsetX} ${offsetY} ${blur} ${spread} ${color}`;
        }
      }
    }

    // Generate the preset file
    const preset = {
      theme: {
        extend: {
          colors,
          fontFamily,
          fontSize,
          lineHeight,
          fontWeight,
          spacing,
          borderRadius,
          boxShadow,
        }
      }
    };

    const header = `/**
 * Eidotter Tailwind CSS Preset
 * AUTO-GENERATED - Do not edit manually
 *
 * Generated from: src/tokens/base.tokens.json
 * Run: npm run build-tokens
 *
 * Includes all design tokens plus optional React Aria and animate plugins.
 *
 * Usage:
 *   // tailwind.config.js
 *   module.exports = {
 *     presets: [require('eidotter/tailwind.preset')],
 *   }
 */
`;

    const pluginBlock = `
let reactAriaPlugin;
try {
  reactAriaPlugin = require('tailwindcss-react-aria-components');
} catch {
  // tailwindcss-react-aria-components not installed — skip
  reactAriaPlugin = null;
}

let animatePlugin;
try {
  animatePlugin = require('tailwindcss-animate');
} catch {
  // tailwindcss-animate not installed — skip
  animatePlugin = null;
}

const preset = ${JSON.stringify(preset, null, 2)};

preset.plugins = [
  ...(preset.plugins || []),
  ...(reactAriaPlugin ? [reactAriaPlugin] : []),
  ...(animatePlugin ? [animatePlugin] : []),
];

module.exports = preset;
`;

    return header + pluginBlock;
  }
});

// =============================================================================
// Build Configuration
// =============================================================================

// Base tokens only (for CSS custom properties)
const baseConfig = {
  source: [
    'src/tokens/base.tokens.json',
    'src/tokens/web.tokens.json',
    'src/tokens/dimensions.tokens.json',
    'src/tokens/effects-params.tokens.json',
    'src/tokens/motion.tokens.json'
  ],
  log: { errors: { brokenReferences: 'throw' }, warnings: 'warn' },
  platforms: {
    css: {
      transformGroup: 'css',
      transforms: ['shadow/css', 'fontFamily/css', 'duration/wcag-flicker-clamp'],
      buildPath: 'src/styles/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            outputReferences: true
          }
        }
      ]
    },
    js: {
      transformGroup: 'js',
      transforms: ['duration/wcag-flicker-clamp'],
      buildPath: 'src/styles/',
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/es6'
        }
      ]
    },
    json: {
      transformGroup: 'js',
      transforms: ['duration/wcag-flicker-clamp'],
      buildPath: 'src/styles/',
      files: [
        {
          destination: 'tokens.json',
          format: 'json/nested'
        }
      ]
    },
    tailwind: {
      transformGroup: 'js',
      transforms: ['duration/wcag-flicker-clamp'],
      buildPath: '',
      files: [
        {
          destination: 'tailwind.preset.cjs',
          format: 'tailwind/preset'
        }
      ]
    },
    'swift-package': {
      transformGroup: 'js',
      buildPath: 'platforms/swiftui/Sources/EiDotterTokens/',
      files: [
        {
          destination: 'EiDotterTokens.swift',
          format: 'swift/constants'
        }
      ]
    },
    'figma-dtcg-foundation': {
      // No transformGroup: emit raw DTCG values (transforms would normalize away
      // the canonical hex/px/ms representations Figma's variable system expects).
      buildPath: 'dist/tokens/',
      files: [
        {
          destination: 'foundation.dtcg.json',
          format: 'figma-dtcg/foundation'
        }
      ]
    },
    'figma-dtcg-web': {
      buildPath: 'dist/tokens/',
      files: [
        {
          destination: 'web.dtcg.json',
          format: 'figma-dtcg/web'
        }
      ]
    }
  }
};

// =============================================================================
// Theme Config Factory
// =============================================================================

/**
 * Creates a theme build config from a theme name.
 * Each theme layers its overrides on top of base tokens.
 */
function createThemeConfig(themeName) {
  return {
    source: [
      'src/tokens/base.tokens.json',
      `src/tokens/theme.${themeName}.tokens.json`
    ],
    platforms: {
      css: {
        transformGroup: 'css',
        transforms: ['shadow/css', 'fontFamily/css'],
        buildPath: 'src/styles/',
        files: [
          {
            destination: `theme.${themeName}.css`,
            format: 'css/variables',
            options: {
              outputReferences: true,
              selector: `[data-theme="${themeName}"], .theme-${themeName}`
            }
          }
        ]
      }
    }
  };
}

// All available themes
const themes = [
  'amber-mono',
  'cga-amber',
  'cga-mode4-p0',
  'cga-mode4-p1',
  'cga-mode5',
  'light',
];

// =============================================================================
// Build Execution
// =============================================================================

import { readFileSync } from 'fs';

// WCAG 2.3.1 pre-build validator. Style Dictionary's transform-error handling
// swallows throw() into warnings, so we run this explicit pass first to abort
// the build with non-zero exit code on violation. Mirrors the transform's
// logic but runs synchronously before any platform file is written.
function validateWcagFlickerFloors() {
  const sources = [
    'src/tokens/effects-params.tokens.json',
    ...themes.map((t) => `src/tokens/theme.${t}.tokens.json`),
  ];
  const violations = [];
  function walk(node, path) {
    if (!node || typeof node !== 'object') return;
    if (node.$value !== undefined && node['wcag-flicker-floor'] !== undefined) {
      const floorMs = Number(node['wcag-flicker-floor']);
      const raw = String(node.$value).trim();
      const m = raw.match(/^(\d+(?:\.\d+)?)\s*(ms|s)?$/i);
      if (!m) {
        violations.push(`${path.join('.')}: unparseable duration "${raw}"`);
        return;
      }
      const valueMs = (m[2] || 'ms').toLowerCase() === 's' ? Number(m[1]) * 1000 : Number(m[1]);
      if (valueMs < floorMs) {
        violations.push(`${path.join('.')} = ${raw} (${valueMs}ms) is below ${floorMs}ms WCAG 2.3.1 floor (3Hz max)`);
      }
      return;
    }
    for (const [k, v] of Object.entries(node)) {
      if (k.startsWith('$')) continue;
      walk(v, [...path, k]);
    }
  }
  for (const src of sources) {
    let data;
    try {
      data = JSON.parse(readFileSync(src, 'utf-8'));
    } catch {
      continue; // theme files for partial overrides may not exist
    }
    walk(data, []);
  }
  if (violations.length > 0) {
    console.error('\n❌ WCAG 2.3.1 violations:');
    for (const v of violations) console.error('  • ' + v);
    console.error('\nAdjust the offending duration tokens or remove the wcag-flicker-floor annotation if the WCAG constraint no longer applies.\n');
    process.exit(1);
  }
}

async function build() {
  console.log('\n🎨 Building Eidotter Design Tokens...\n');

  // WCAG hard gate — abort before any file write if a flicker token violates 2.3.1
  validateWcagFlickerFloors();

  // Build base tokens
  console.log('📦 Building base tokens...');
  const sdBase = new StyleDictionary(baseConfig);
  await sdBase.buildAllPlatforms();
  console.log('   ✓ tokens.css');
  console.log('   ✓ tokens.js');
  console.log('   ✓ tokens.json');
  console.log('   ✓ tailwind.preset.cjs');

  // Build all theme variants
  for (const themeName of themes) {
    console.log(`\n🎨 Building ${themeName} theme...`);
    const config = createThemeConfig(themeName);
    const sd = new StyleDictionary(config);
    await sd.buildAllPlatforms();
    console.log(`   ✓ theme.${themeName}.css`);
  }

  console.log('\n✨ Token build complete!\n');
}

build().catch((err) => {
  console.error('\n❌ Token build failed:\n', err);
  process.exit(1);
});
