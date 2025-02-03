import type { Preview } from "@storybook/react";
import '../src/styles/tokens.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dos',
      values: [
        {
          name: 'dos',
          value: '#000000',
        },
      ],
    },
  },
};

export default preview; 