import type { Preview } from "@storybook/react-vite";
import { MINIMAL_VIEWPORTS } from 'storybook/viewport';
import React from 'react';
import '../src/styles/fonts.css';                // @font-face for Flexi IBM VGA True (must be first)
import '../src/styles/tailwind.css';             // Tailwind utilities (must precede tokens)
import '../src/styles/tokens.css';              // Base design tokens (amber mono default)
import '../src/styles/accessibility.css';       // Global reduced-motion safety net
import '../src/styles/theme.amber-mono.css';    // Amber monochrome theme
import '../src/styles/theme.cga-amber.css';     // CGA color + amber theme
import '../src/styles/theme.cga-mode4-p0.css';  // CGA Mode 4 Palette 0
import '../src/styles/theme.cga-mode4-p1.css';  // CGA Mode 4 Palette 1
import '../src/styles/theme.cga-mode5.css';     // CGA Mode 5
import './preview.css';
import './styles.css';

const dosViewports = {
  phone320: { name: 'Phone 320', styles: { width: '320px', height: '568px' }, type: 'mobile' as const },
  phone375: { name: 'Phone 375', styles: { width: '375px', height: '812px' }, type: 'mobile' as const },
  tablet768: { name: 'Tablet 768', styles: { width: '768px', height: '1024px' }, type: 'tablet' as const },
  desktop1024: { name: 'Desktop 1024', styles: { width: '1024px', height: '768px' }, type: 'desktop' as const },
  ultrawide: { name: 'Ultrawide 2560', styles: { width: '2560px', height: '1440px' }, type: 'desktop' as const },
};

const preview: Preview = {
  parameters: {
    viewport: {
      options: { ...MINIMAL_VIEWPORTS, ...dosViewports },
    },
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
