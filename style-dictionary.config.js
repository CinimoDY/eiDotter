const StyleDictionary = require('style-dictionary');

// Custom name transform
StyleDictionary.registerTransform({
  name: 'name/css/custom',
  type: 'name',
  transformer: (token) => {
    const path = token.path.join('-');
    return `--dos-${path}`.toLowerCase();
  }
});

// Custom value transform
StyleDictionary.registerTransform({
  name: 'value/css/custom',
  type: 'value',
  transformer: (token) => {
    // Handle references
    if (typeof token.original.$value === 'string' && token.original.$value.startsWith('{')) {
      const ref = token.original.$value.slice(1, -1);
      return `var(--dos-${ref.split('.').join('-')})`;
    }

    // Handle types
    switch (token.original.$type) {
      case 'dimension':
      case 'number':
        return `${token.original.$value}px`;
      case 'string':
      case 'text':
        return `"${token.original.$value}"`;
      case 'color':
        return token.original.$value;
      default:
        return token.original.$value;
    }
  }
});

// Custom format
StyleDictionary.registerFormat({
  name: 'css/custom',
  formatter: ({ dictionary }) => {
    const formatProperty = (prop) => {
      if (!prop.original.$value) return null;
      return `  ${prop.name}: ${prop.value};`;
    };

    return `/**
 * Do not edit directly
 * Generated on ${new Date().toUTCString()}
 */

:root {
${dictionary.allProperties
  .map(formatProperty)
  .filter(Boolean)
  .join('\n')}
}`;
  }
});

module.exports = {
  source: ['src/tokens/tokens.json'],
  platforms: {
    css: {
      transforms: ['name/css/custom', 'value/css/custom'],
      buildPath: 'src/styles/',
      files: [{
        destination: 'tokens.css',
        format: 'css/custom'
      }]
    },
    ts: {
      transformGroup: 'js',
      buildPath: 'src/tokens/',
      files: [{
        destination: 'tokens.ts',
        format: 'javascript/es6'
      }]
    }
  }
}; 