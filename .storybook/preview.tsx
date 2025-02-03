import React from 'react';
import type { Preview } from "@storybook/react";
import './preview.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/qlEyN6zHPX4XOohJefJ4bZ/eiDotter',
    },
  },
};

export default preview; 