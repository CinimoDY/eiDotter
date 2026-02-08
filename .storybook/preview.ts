import type { Preview } from "@storybook/react-vite";
import React from 'react';
import '../src/styles/tokens.css';           // Base design tokens (amber mono default)
import '../src/styles/accessibility.css';    // Global reduced-motion safety net
import '../src/styles/theme.amber-mono.css'; // Amber monochrome theme
import '../src/styles/theme.cga-amber.css';  // CGA color + amber theme
import './preview.css';
import './styles.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      options: {
        "amber-mono": {
          name: 'amber-mono',
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
    (Story, context) => {
      const meta = context.parameters.projectMeta;
      return React.createElement('div', { 'data-theme': 'amber-mono', style: { padding: '1rem' } },
        meta ? React.createElement('div', {
          style: {
            fontFamily: 'var(--font-dos, monospace)',
            fontSize: '11px',
            padding: '4px 8px',
            marginBottom: '8px',
            color: 'var(--color-cga-brown, #AA5500)',
            borderBottom: '1px solid var(--color-cga-brown, #AA5500)',
          }
        }, `Origin: ${meta.origin}${meta.originNote ? ` — ${meta.originNote}` : ''} | Used by: ${meta.consumers.join(', ') || 'none'}`) : null,
        React.createElement(Story)
      );
    },
  ],

  initialGlobals: {
    backgrounds: {
      value: 'amber-mono'
    }
  }
};

export default preview;
