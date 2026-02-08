import type { Preview } from "@storybook/react-vite";
import React from 'react';
import '../src/styles/tokens.css';           // Base design tokens (amber mono default)
import '../src/styles/theme.amber-mono.css'; // Amber monochrome theme
import '../src/styles/theme.cga-amber.css';  // CGA color + amber theme
import './preview.css';
import './styles.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      options: {
        "dos-amber": {
          name: 'dos-amber',
          value: '#000000',
        }
      }
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
        ],
      },
      options: {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa', 'wcag21aa'],
        },
      },
    },
  },

  decorators: [
    (Story) => (
      React.createElement('div', { 'data-theme': 'amber-mono', style: { padding: '1rem' } },
        React.createElement(Story)
      )
    ),
  ],

  initialGlobals: {
    backgrounds: {
      value: 'dos-amber'
    }
  }
};

export default preview;
