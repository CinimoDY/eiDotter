/**
 * Eidotter Enhanced Tailwind CSS Preset
 *
 * Extends the base token preset with React Aria state variants
 * and utility plugins for component development.
 *
 * Usage:
 *   // tailwind.config.js
 *   module.exports = {
 *     presets: [require('eidotter/tailwind.preset.enhanced')],
 *   }
 *
 * Or use the base preset without React Aria:
 *   module.exports = {
 *     presets: [require('eidotter/tailwind.preset')],
 *   }
 */

const basePreset = require('./tailwind.preset.cjs');

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

module.exports = {
  ...basePreset,
  plugins: [
    ...(basePreset.plugins || []),
    ...(reactAriaPlugin ? [reactAriaPlugin] : []),
    ...(animatePlugin ? [animatePlugin] : []),
  ],
};
