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

// =============================================================================
// Custom Formats
// =============================================================================

// Helper: Convert camelCase to kebab-case
function toKebabCase(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

// Helper: Get nested value from token dictionary
function getTokenValue(tokens, path) {
  return path.reduce((obj, key) => obj?.[key], tokens);
}

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

    // Semantic colors — use CSS variable references so theme switching works.
    // When data-theme overrides these variables, Tailwind utilities update automatically.
    const semanticVarMap = {
      'dos-bg-primary': '--color-semantic-background-primary',
      'dos-bg-secondary': '--color-semantic-background-secondary',
      'dos-bg-accent': '--color-semantic-background-accent',
      'dos-text-primary': '--color-semantic-text-primary',
      'dos-text-secondary': '--color-semantic-text-secondary',
      'dos-text-accent': '--color-semantic-text-accent',
      'dos-text-disabled': '--color-semantic-text-disabled',
      'dos-border-default': '--color-semantic-border-default',
      'dos-border-focus': '--color-semantic-border-focus',
      'dos-border-hover': '--color-semantic-border-hover',
      'dos-border-disabled': '--color-semantic-border-disabled',
      'dos-link': '--color-semantic-link-default',
      'dos-link-hover': '--color-semantic-link-hover',
      'dos-success': '--color-semantic-status-success',
      'dos-warning': '--color-semantic-status-warning',
      'dos-error': '--color-semantic-status-error',
      'dos-info': '--color-semantic-status-info',
      'dos-alert-info': '--color-semantic-alert-info',
      'dos-alert-success': '--color-semantic-alert-success',
      'dos-alert-warning': '--color-semantic-alert-warning',
      'dos-alert-error': '--color-semantic-alert-error',
    };

    for (const [key, cssVar] of Object.entries(semanticVarMap)) {
      colors[key] = `var(${cssVar})`;
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
 * Usage:
 *   // tailwind.config.js
 *   module.exports = {
 *     presets: [require('eidotter/tailwind.preset')],
 *   }
 */

`;

    return header + 'module.exports = ' + JSON.stringify(preset, null, 2) + ';\n';
  }
});

// =============================================================================
// Build Configuration
// =============================================================================

// Base tokens only (for CSS custom properties)
const baseConfig = {
  source: ['src/tokens/base.tokens.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      transforms: ['shadow/css', 'fontFamily/css'],
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
      buildPath: '',
      files: [
        {
          destination: 'tailwind.preset.js',
          format: 'tailwind/preset'
        }
      ]
    }
  }
};

// Amber Monochrome theme (base + theme semantic overrides)
const amberMonoConfig = {
  source: [
    'src/tokens/base.tokens.json',
    'src/tokens/theme.amber-mono.tokens.json'
  ],
  platforms: {
    css: {
      transformGroup: 'css',
      transforms: ['shadow/css', 'fontFamily/css'],
      buildPath: 'src/styles/',
      files: [
        {
          destination: 'theme.amber-mono.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
            selector: '[data-theme="amber-mono"], .theme-amber-mono'
          }
        }
      ]
    }
  }
};

// CGA Amber theme (base + CGA primitives restored + amber accents)
const cgaAmberConfig = {
  source: [
    'src/tokens/base.tokens.json',
    'src/tokens/theme.cga-amber.tokens.json'
  ],
  platforms: {
    css: {
      transformGroup: 'css',
      transforms: ['shadow/css', 'fontFamily/css'],
      buildPath: 'src/styles/',
      files: [
        {
          destination: 'theme.cga-amber.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
            selector: '[data-theme="cga-amber"], .theme-cga-amber'
          }
        }
      ]
    }
  }
};

// =============================================================================
// Build Execution
// =============================================================================

async function build() {
  console.log('\n🎨 Building Eidotter Design Tokens...\n');

  // Build base tokens
  console.log('📦 Building base tokens...');
  const sdBase = new StyleDictionary(baseConfig);
  await sdBase.buildAllPlatforms();
  console.log('   ✓ tokens.css');
  console.log('   ✓ tokens.js');
  console.log('   ✓ tokens.json');
  console.log('   ✓ tailwind.preset.js');

  // Build Amber Monochrome theme
  console.log('\n🖥️  Building Amber Monochrome theme...');
  const sdAmberMono = new StyleDictionary(amberMonoConfig);
  await sdAmberMono.buildAllPlatforms();
  console.log('   ✓ theme.amber-mono.css');

  // Build CGA Amber theme
  console.log('\n🎨 Building CGA Amber theme...');
  const sdCgaAmber = new StyleDictionary(cgaAmberConfig);
  await sdCgaAmber.buildAllPlatforms();
  console.log('   ✓ theme.cga-amber.css');

  console.log('\n✨ Token build complete!\n');
}

build().catch(console.error);
