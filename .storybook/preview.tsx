import React from 'react';
import type { Preview } from "@storybook/react";
import './styles.css';

const withTheme = (Story) => (
  <div className="dos-theme">
    <Story />
  </div>
);

const preview: Preview = {
  decorators: [withTheme],
  parameters: {
    backgrounds: {
      default: 'dos',
      values: [
        {
          name: 'dos',
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
};

export default preview; 