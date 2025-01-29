import { addons } from '@storybook/manager-api';

addons.setConfig({
  // Use relative paths for GitHub Pages
  refs: {
    'eiDotter': {
      title: 'eiDotter Design System',
      url: './',
    },
  },
}); 