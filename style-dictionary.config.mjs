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
    }
  }
};

// DOS Amber theme (base + theme overrides merged)
const dosAmberConfig = {
  source: [
    'src/tokens/base.tokens.json',
    'src/tokens/theme.dos-amber.tokens.json'
  ],
  platforms: {
    css: {
      transformGroup: 'css',
      transforms: ['shadow/css', 'fontFamily/css'],
      buildPath: 'src/styles/',
      files: [
        {
          destination: 'theme.dos-amber.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
            selector: '[data-theme="dos-amber"], .theme-dos-amber'
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

  // Build DOS amber theme
  console.log('\n🖥️  Building DOS Amber theme...');
  const sdDosAmber = new StyleDictionary(dosAmberConfig);
  await sdDosAmber.buildAllPlatforms();
  console.log('   ✓ theme.dos-amber.css');

  console.log('\n✨ Token build complete!\n');
}

build().catch(console.error);
