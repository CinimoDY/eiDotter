import { create } from '@storybook/theming/create';

export default create({
  base: 'dark',
  
  // Brand
  brandTitle: 'eiDotter DOS UI',
  brandUrl: 'https://github.com/CinimoDY/eiDotter',
  
  // Colors
  colorPrimary: '#0000AA', // DOS blue
  colorSecondary: '#AAAAAA', // Light gray

  // UI
  appBg: '#000000', // Black
  appContentBg: '#0000AA', // DOS blue
  appBorderColor: '#AAAAAA', // Light gray
  appBorderRadius: 0,

  // Text colors
  textColor: '#FFFFFF',
  textInverseColor: '#000000',

  // Toolbar default and active colors
  barTextColor: '#AAAAAA',
  barSelectedColor: '#FFFFFF',
  barBg: '#000000',

  // Form colors
  inputBg: '#000000',
  inputBorder: '#AAAAAA',
  inputTextColor: '#FFFFFF',
  inputBorderRadius: 0,

  // Typography
  fontBase: '"IBM PC BIOS", "Px437 IBM BIOS", monospace',
  fontCode: '"IBM PC BIOS", "Px437 IBM BIOS", monospace',

  // Spacing
  gridCellSize: 8,
}); 