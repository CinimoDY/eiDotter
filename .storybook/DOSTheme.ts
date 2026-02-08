import { create } from 'storybook/theming/create';

/**
 * Storybook Manager Theme - DOS Amber
 *
 * Note: Storybook's theming API requires literal values, not CSS variables.
 * These values are kept in sync with src/tokens/base.tokens.json
 *
 * CGA Palette Reference:
 * - black: #000000      - brightBlue: #5555FF
 * - blue: #0000AA       - brightGreen: #55FF55
 * - green: #00AA00      - brightCyan: #55FFFF
 * - cyan: #00AAAA       - brightRed: #FF5555
 * - red: #AA0000        - brightMagenta: #FF55FF
 * - magenta: #AA00AA    - yellow: #FFFF55
 * - brown: #AA5500      - white: #FFFFFF
 * - lightGray: #AAAAAA  - amber: #FFBF00
 * - darkGray: #555555   - amberBright: #FFD700
 */

export default create({
  base: 'dark',

  // Brand
  brandTitle: 'eiDotter DOS UI',
  brandUrl: 'https://github.com/CinimoDY/eiDotter',

  // Colors (from tokens: color.cga.*)
  colorPrimary: '#FFBF00',   // amber
  colorSecondary: '#AAAAAA', // lightGray

  // UI (from tokens: color.semantic.background.*)
  appBg: '#000000',          // black
  appContentBg: '#000000',   // black
  appBorderColor: '#FFBF00', // amber
  appBorderRadius: 0,

  // Text colors (from tokens: color.semantic.text.*)
  textColor: '#FFBF00',      // amber (primary)
  textInverseColor: '#000000',
  textMutedColor: '#AA7700', // amberDim

  // Toolbar (from tokens: color.semantic.*)
  barTextColor: '#AAAAAA',   // lightGray
  barSelectedColor: '#FFD700', // amberBright
  barHoverColor: '#FFD700',  // amberBright
  barBg: '#000000',          // black

  // Form colors (from tokens: color.semantic.*)
  inputBg: '#000000',        // black
  inputBorder: '#FFBF00',    // amber
  inputTextColor: '#FFBF00', // amber
  inputBorderRadius: 0,

  // Typography (from tokens: typography.fontFamily.*)
  fontBase: '"Perfect DOS VGA 437", Consolas, Monaco, monospace',
  fontCode: '"Perfect DOS VGA 437", Consolas, Monaco, monospace',
});
