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
  transitive: true,
  matcher: (token) => token.original && typeof token.original.value === "string",
  transformer: (token) => {
    // Handle references in the format {path.to.token}
    if (token.original.value.startsWith("{") && token.original.value.endsWith("}")) {
      const path = token.original.value.slice(1, -1);
      return `var(--${path.split(".").join("-")})`;
    }
    return token.original.value;
  }
});

// Custom format
StyleDictionary.registerFormat({
  name: 'css/custom',
  formatter: ({ dictionary }) => {
    const formatProperty = (prop) => {
      if (!prop.value) return null;
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
  source: ["src/tokens/**/*.json"],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "src/styles/",
      files: [{
        destination: "tokens.css",
        format: "css/variables",
        options: {
          outputReferences: true
        }
      }],
      transforms: ["attribute/cti", "name/cti/kebab", "color/css", {
        name: "value/css/custom",
        type: "value",
        transitive: true,
        matcher: function(token) {
          return typeof token.original.value === 'string' && token.original.value.startsWith('{');
        },
        transformer: function(token) {
          let ref = token.original.value.slice(1, -1);
          
          // Handle typography references
          if (ref.startsWith('Font Family.') || ref.startsWith('Weight.') || ref.startsWith('Size Desktop.') || ref.startsWith('Size Mobile.')) {
            ref = `Typography Primitives/Value.${ref}`;
          }
          
          // Handle color references
          if (ref.startsWith('Light.')) {
            ref = `Color Primitive/Value.Light.${ref.substring(6)}`;
          }
          
          // Handle dark color references
          if (ref.startsWith('Dark.')) {
            ref = `Color Primitive/Value.Dark.${ref.substring(5)}`;
          }
          
          // Handle system color references
          if (ref.startsWith('colors.')) {
            ref = `global/global.${ref}`;
          }
          
          // Handle typography references
          if (ref.startsWith('typography.')) {
            ref = `global/global.${ref}`;
          }
          
          // Handle icon references
          if (ref.startsWith('Icon.')) {
            ref = `Color/Light.Icon.${ref.substring(5)}`;
          }
          
          // Handle text references
          if (ref.startsWith('Text.')) {
            ref = `Color/Light.Text.${ref.substring(5)}`;
          }
          
          return `var(--${ref.toLowerCase().replace(/\./g, '-')})`;
        }
      }]
    },
    js: {
      transformGroup: "js",
      buildPath: "src/styles/",
      files: [{
        destination: "tokens.js",
        format: "javascript/module"
      }],
      transforms: ["attribute/cti", "name/cti/constant", "color/hex", {
        name: "value/js/custom",
        type: "value",
        transitive: true,
        matcher: function(token) {
          return typeof token.original.value === 'string' && token.original.value.startsWith('{');
        },
        transformer: function(token) {
          let ref = token.original.value.slice(1, -1);
          
          // Handle typography references
          if (ref.startsWith('Font Family.') || ref.startsWith('Weight.') || ref.startsWith('Size Desktop.') || ref.startsWith('Size Mobile.')) {
            ref = `Typography Primitives/Value.${ref}`;
          }
          
          // Handle color references
          if (ref.startsWith('Light.')) {
            ref = `Color Primitive/Value.Light.${ref.substring(6)}`;
          }
          
          // Handle dark color references
          if (ref.startsWith('Dark.')) {
            ref = `Color Primitive/Value.Dark.${ref.substring(5)}`;
          }
          
          // Handle system color references
          if (ref.startsWith('colors.')) {
            ref = `global/global.${ref}`;
          }
          
          // Handle typography references
          if (ref.startsWith('typography.')) {
            ref = `global/global.${ref}`;
          }
          
          // Handle icon references
          if (ref.startsWith('Icon.')) {
            ref = `Color/Light.Icon.${ref.substring(5)}`;
          }
          
          // Handle text references
          if (ref.startsWith('Text.')) {
            ref = `Color/Light.Text.${ref.substring(5)}`;
          }
          
          return `${ref}`;
        }
      }]
    }
  },
  transform: {
    "value/reference": {
      type: "value",
      matcher: (token) => {
        return typeof token.value === "string" && token.value.startsWith("{");
      },
      transformer: (token) => {
        // Extract the reference path
        let ref = token.value.slice(1, -1);
        
        // Handle special cases for common references
        if (ref.startsWith("Light.")) {
          ref = `Color Primitive/Value.${ref}`;
        } else if (ref.startsWith("Font Family.") || ref.startsWith("Weight.") || ref.startsWith("Size Desktop.") || ref.startsWith("Size Mobile.")) {
          ref = `Typography Primitives/Value.${ref}`;
        } else if (ref.startsWith("colors.") || ref.startsWith("typography.")) {
          ref = `global/global.${ref}`;
        }
        
        return `{${ref}}`;
      },
    },
  },
}; 