import type { Preview } from "@storybook/react-vite";
import { MINIMAL_VIEWPORTS } from 'storybook/viewport';
import React from 'react';
import { formatProvenanceLine } from '../src/components/registry';
import '../src/styles/fonts.css';                // @font-face for Flexi IBM VGA True (must be first)
import './tailwind.css';                         // Tailwind utilities + story-only classes (must precede tokens)
import '../src/styles/tokens.css';              // Base design tokens (the bare :root)
import '../src/styles/accessibility.css';       // Global reduced-motion safety net
import '../src/styles/theme.pure-amber.css';    // Pure Amber (also answers to amber-mono, DMNC-1643)
import '../src/styles/theme.dos-86.css';        // DOS-86, the default: amber with honest functional colours (DMNC-1643)
import '../src/styles/theme.cga-amber.css';     // CGA color + amber theme
import '../src/styles/theme.cga-mode4-p0.css';  // CGA Mode 4 Palette 0
import '../src/styles/theme.cga-mode4-p1.css';  // CGA Mode 4 Palette 1
import '../src/styles/theme.cga-mode5.css';     // CGA Mode 5
import '../src/styles/theme.light.css';         // Light theme (DMNC-1058)
import '../src/styles/theme.amber-paper.css';   // Amber paper: reverse-video amber ground (DMNC-1591)
import '../src/styles/health-patterns.css';     // Health family tone fills + patterns
import '../src/styles/keyframes.css';           // Shared motion (DMNC-1592); health-patterns uses eidotter-breathe
import './preview.css';
import './styles.css';

const dosViewports = {
  phone320: { name: 'Phone 320', styles: { width: '320px', height: '568px' }, type: 'mobile' as const },
  phone375: { name: 'Phone 375', styles: { width: '375px', height: '812px' }, type: 'mobile' as const },
  tablet768: { name: 'Tablet 768', styles: { width: '768px', height: '1024px' }, type: 'tablet' as const },
  desktop1024: { name: 'Desktop 1024', styles: { width: '1024px', height: '768px' }, type: 'desktop' as const },
  ultrawide: { name: 'Ultrawide 2560', styles: { width: '2560px', height: '1440px' }, type: 'desktop' as const },
};

// Theme toolbar (DMNC-1591). Default is dos-86 (DMNC-1643 PR E), the library's
// default: what a site gets from DisplayMenu without a `dosDark`. Pure Amber
// (renamed from amber-mono) is the previous default; `amber-mono` stays listed
// as its deprecated alias so the two can be compared side by side. Pick a
// theme in the toolbar or via `&globals=theme:amber-paper` in the iframe URL.
const THEMES = [
  { value: 'dos-86', title: 'dos-86 (default, honest functional colours)' },
  { value: 'pure-amber', title: 'pure-amber (Pure Amber, the previous default)' },
  { value: 'amber-mono', title: 'amber-mono (deprecated alias of pure-amber)' },
  { value: 'amber-paper', title: 'amber-paper (reverse video)' },
  { value: 'light', title: 'light' },
  { value: 'cga-amber', title: 'cga-amber' },
  { value: 'cga-mode4-p0', title: 'cga-mode4-p0' },
  { value: 'cga-mode4-p1', title: 'cga-mode4-p1' },
  { value: 'cga-mode5', title: 'cga-mode5' },
];
const DEFAULT_THEME = 'dos-86';
// The DOS dark themes keep the pre-toolbar wrapper (no painted ground): their
// grounds (#050300, #020003) are within 3/255 of each other and of the page.
const isDosDarkTheme = (theme: string) => ['dos-86', 'pure-amber', 'amber-mono'].includes(theme);

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'eidotter theme (data-theme)',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: THEMES,
        dynamicTitle: true,
      },
    },
  },

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
      const theme = (context.globals.theme as string | undefined) || DEFAULT_THEME;
      // Keep the document root in step so body background, portals and docs
      // chrome follow the picked theme (preview-head sets the dos-86 default).
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', theme);
      }
      // The other themes paint their own ground; the DOS dark themes keep the
      // pre-toolbar wrapper, so a capture compares only the theme's colours.
      const wrapperStyle = isDosDarkTheme(theme)
        ? { padding: '1rem' }
        : { padding: '1rem', background: 'var(--color-semantic-background-primary)' };
      return React.createElement('div', { 'data-theme': theme, style: wrapperStyle },
        // text-primary (not cga-brown): the banner is on every story, and
        // brown (#AA5500, ~3.7:1) failed the axe color-contrast gate as
        // chrome noise drowning out real component violations (DMNC-1011).
        meta ? React.createElement('div', {
          style: {
            fontFamily: 'var(--font-dos, monospace)',
            fontSize: '11px',
            padding: '4px 8px',
            marginBottom: '8px',
            color: 'var(--color-semantic-text-primary, #b87c1a)',
            borderBottom: '1px solid var(--color-semantic-text-primary, #b87c1a)',
          }
        }, formatProvenanceLine(meta)) : null,
        React.createElement(Story)
      );
    },
  ],

  initialGlobals: {
    theme: DEFAULT_THEME,
    backgrounds: {
      value: 'amber-mono'
    }
  }
};

export default preview;
