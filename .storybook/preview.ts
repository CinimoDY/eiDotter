import type { Preview } from "@storybook/react";
import React from 'react';
import '../src/styles/tokens.css';        // Base design tokens
import '../src/styles/theme.dos-amber.css'; // DOS amber theme
import './preview.css';
import './styles.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'dos-amber',
      values: [
        {
          name: 'dos-amber',
          value: '#000000',
        },
      ],
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      React.createElement('div', { 'data-theme': 'dos-amber', style: { padding: '1rem' } },
        React.createElement(Story)
      )
    ),
  ],
};

export default preview;
