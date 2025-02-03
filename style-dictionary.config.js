const StyleDictionary = require('style-dictionary');

// Insert custom transform for color/hex
StyleDictionary.registerTransform({
  name: 'color/hex',
  type: 'value',
  matcher: token => token.$type === 'color',
  transformer: token => token.$value
});

// Existing transform for text
StyleDictionary.registerTransform({
  name: 'value/text',
  type: 'value',
  matcher: token => token.$type === 'text',
  transformer: token => token.$value
});

// Register transform for token names in kebab-case
StyleDictionary.registerTransform({
  name: 'name/cti-kebab',
  type: 'name',
  transformer: token => token.path.join('-').toLowerCase()
});

// Register transform for token names in camelCase
StyleDictionary.registerTransform({
  name: 'name/cti-camel',
  type: 'name',
  transformer: token => token.path[0].toLowerCase() + token.path.slice(1).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')
});

module.exports = {
  source: ["src/tokens/**/*.json"],
  platforms: {
    css: {
      transforms: ['name/cti-kebab', 'color/hex', 'value/text'],
      buildPath: "src/styles/",
      files: [{
        destination: "tokens.css",
        format: "css/variables",
        options: {
          outputReferences: true
        }
      }]
    },
    js: {
      transforms: ['name/cti-camel', 'value/text'],
      buildPath: "src/styles/",
      files: [{
        destination: "tokens.js",
        format: "javascript/module"
      }]
    }
  }
}; 