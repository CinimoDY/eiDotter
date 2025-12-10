import type { Preview } from "@storybook/react";
import '../src/styles/tokens.css';        // Base design tokens
import '../src/styles/theme.dos-amber.css'; // DOS amber theme (when built)
import './preview.css';
import './styles.css';

const preview: Preview = {
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
