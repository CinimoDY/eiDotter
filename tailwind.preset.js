/**
 * Eidotter Tailwind CSS Preset
 * DOS-themed design tokens for Tailwind projects
 *
 * Usage:
 *   // tailwind.config.js
 *   module.exports = {
 *     presets: [require('eidotter/tailwind.preset')],
 *   }
 */

module.exports = {
  theme: {
    extend: {
      colors: {
        // CGA Palette (16 authentic colors)
        'cga-black': '#000000',
        'cga-blue': '#0000aa',
        'cga-green': '#00aa00',
        'cga-cyan': '#00aaaa',
        'cga-red': '#aa0000',
        'cga-magenta': '#aa00aa',
        'cga-brown': '#aa5500',
        'cga-light-gray': '#aaaaaa',
        'cga-dark-gray': '#555555',
        'cga-bright-blue': '#5555ff',
        'cga-bright-green': '#55ff55',
        'cga-bright-cyan': '#55ffff',
        'cga-bright-red': '#ff5555',
        'cga-bright-magenta': '#ff55ff',
        'cga-yellow': '#ffff55',
        'cga-white': '#ffffff',

        // Amber monitor extension (P3 phosphor authentic)
        'cga-amber': '#ffb000',
        'cga-amber-bright': '#fdca9f',
        'cga-amber-dim': '#9a5700',

        // Semantic colors (resolved values)
        'dos-bg-primary': '#000000',
        'dos-bg-secondary': '#555555',
        'dos-bg-accent': '#0000aa',
        'dos-text-primary': '#aaaaaa',
        'dos-text-secondary': '#ffffff',
        'dos-text-accent': '#ffff55',
        'dos-text-disabled': '#555555',
        'dos-border-default': '#aaaaaa',
        'dos-border-focus': '#ffff55',
        'dos-border-hover': '#ffffff',
        'dos-link': '#55ffff',
        'dos-link-hover': '#ffffff',
        'dos-success': '#55ff55',
        'dos-warning': '#ffff55',
        'dos-error': '#ff5555',
        'dos-info': '#55ffff',
      },

      fontFamily: {
        'dos': ['"Perfect DOS VGA 437"', 'Consolas', 'Monaco', 'monospace'],
        'dos-fallback': ['Consolas', 'Monaco', '"Courier New"', 'monospace'],
      },

      fontSize: {
        'dos-xs': '12px',
        'dos-sm': '14px',
        'dos-base': '16px',
        'dos-lg': '18px',
        'dos-xl': '20px',
        'dos-2xl': '24px',
        'dos-3xl': '30px',
        'dos-4xl': '36px',
      },

      lineHeight: {
        'dos-tight': '1.2',
        'dos-normal': '1.5',
        'dos-loose': '1.8',
      },

      fontWeight: {
        'dos-regular': '400',
        'dos-semibold': '600',
        'dos-bold': '700',
      },
    },
  },
};
