import type { Meta, StoryObj } from '@storybook/react-vite';
import { InlineExpand } from './InlineExpand';
import React from 'react';
import { componentRegistry } from '@/components/registry';

const meta: Meta<typeof InlineExpand> = {
  title: 'Components/InlineExpand',
  component: InlineExpand,
  parameters: {
    layout: 'padded',
    projectMeta: componentRegistry['InlineExpand'],
  },
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: 'Content revealed when expanded',
    },
    defaultExpanded: {
      control: 'boolean',
      description: 'Whether expanded by default (uncontrolled)',
    },
    onToggle: {
      action: 'toggle',
      description: 'Callback when expand state changes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'CGA color palette',
    content: '16 colors defined by the IBM Color Graphics Adapter standard from 1981, used across all DOS-era applications.',
  },
};

export const Expanded: Story = {
  args: {
    children: 'CGA color palette',
    content: '16 colors defined by the IBM Color Graphics Adapter standard from 1981, used across all DOS-era applications.',
    defaultExpanded: true,
  },
};

export const InParagraph: Story = {
  render: () => (
    <p style={{ color: 'var(--color-semantic-text-primary)', maxWidth: '600px', lineHeight: '1.6' }}>
      The system uses a{' '}
      <InlineExpand content="16 colors defined by the IBM Color Graphics Adapter standard from 1981. The palette includes 4 shades of gray, plus pure red, green, blue, cyan, magenta, yellow, brown, and their bright variants.">
        CGA color palette
      </InlineExpand>{' '}
      for all visual elements. Each component respects the{' '}
      <InlineExpand content="Tokens are design decisions stored as named values. Colors, spacing, typography, and timing are all tokenized so themes can override any value without changing component code.">
        design token pipeline
      </InlineExpand>{' '}
      to ensure consistency across themes.
    </p>
  ),
};

export const MultipleExpanded: Story = {
  render: () => (
    <p style={{ color: 'var(--color-semantic-text-primary)', maxWidth: '600px', lineHeight: '1.6' }}>
      The{' '}
      <InlineExpand
        defaultExpanded
        content="A phosphor display uses a coating that glows when struck by an electron beam, producing visible light. Amber phosphor (P3) was popular for reducing eye strain during long sessions."
      >
        phosphor display
      </InlineExpand>{' '}
      technology defined the visual character of early computing. The{' '}
      <InlineExpand
        defaultExpanded
        content="Cathode Ray Tube — a vacuum tube containing electron guns that fire beams at a phosphor-coated screen. Scanlines, flicker, and bloom are characteristic CRT artifacts."
      >
        CRT
      </InlineExpand>{' '}
      artifacts we simulate are authentic to that era.
    </p>
  ),
};

export const LongContent: Story = {
  args: {
    children: 'photosynthesis',
    content: 'Photosynthesis is a biological process used by most plants, algae, and certain bacteria to convert light energy into chemical energy stored in glucose. The process occurs in two main stages: the light-dependent reactions, which take place in the thylakoid membranes, and the Calvin cycle, which occurs in the stroma of the chloroplast. During the light reactions, water molecules are split, releasing oxygen as a byproduct, while ATP and NADPH are generated. These energy carriers then power the Calvin cycle, where carbon dioxide is fixed into organic molecules through a series of enzyme-catalyzed reactions.',
  },
};

export const Controlled: Story = {
  render: function ControlledInlineExpand() {
    const [isExpanded, setIsExpanded] = React.useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <p style={{ color: 'var(--color-semantic-text-primary)' }}>
          Click the trigger or the button below to toggle:{' '}
          <InlineExpand
            expanded={isExpanded}
            onToggle={setIsExpanded}
            content="This expansion is controlled by external state. Both the trigger and the button below toggle it."
          >
            controlled term
          </InlineExpand>
        </p>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            color: 'var(--color-semantic-text-primary)',
            background: 'var(--color-semantic-background-secondary)',
            border: '1px solid var(--color-semantic-border-default)',
            padding: '4px 12px',
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          {isExpanded ? 'Collapse' : 'Expand'} externally
        </button>
      </div>
    );
  },
};

export const WithSources: Story = {
  render: () => (
    <p style={{ color: 'var(--color-semantic-text-primary)', maxWidth: '600px', lineHeight: '1.6' }}>
      The display uses a{' '}
      <InlineExpand
        defaultExpanded
        content="16 colors defined by the IBM Color Graphics Adapter standard from 1981. The palette was designed around the limitations of composite video output."
        sources={[
          { title: 'Wikipedia: CGA', url: 'https://en.wikipedia.org/wiki/Color_Graphics_Adapter', favicon: 'https://en.wikipedia.org/favicon.ico' },
          { title: 'IBM Technical Reference', url: 'https://www.ibm.com/docs' },
          { title: 'CGA Compatibility Guide', url: 'https://www.dosnostalgic.com/cga', favicon: 'https://www.dosnostalgic.com/favicon.ico' },
        ]}
      >
        CGA color palette
      </InlineExpand>{' '}
      for all visual elements.
    </p>
  ),
};

export const WithBrokenFavicon: Story = {
  name: 'Favicon Fallback Chain',
  render: () => (
    <p style={{ color: 'var(--color-semantic-text-primary)', maxWidth: '600px', lineHeight: '1.6' }}>
      Learn about{' '}
      <InlineExpand
        defaultExpanded
        content="Phosphor displays use a coating that glows when struck by an electron beam. Favicons follow a 3-stage fallback: explicit URL → Google Favicons API → [→] text."
        sources={[
          { title: 'Working Favicon', url: 'https://example.com', favicon: 'https://example.com/favicon.ico' },
          { title: 'Broken Favicon (→ Google fallback)', url: 'https://example.org', favicon: 'https://invalid.example/broken.ico' },
          { title: 'No Favicon (→ Google fallback)', url: 'https://example.net' },
        ]}
      >
        phosphor displays
      </InlineExpand>{' '}
      to understand CRT technology.
    </p>
  ),
};

export const CompositionPatterns: Story = {
  name: 'Composition Patterns',
  render: () => (
    <div style={{ color: 'var(--color-semantic-text-primary)', maxWidth: '600px', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <p>
        <strong>Icon via children:</strong>{' '}
        <InlineExpand
          content="Style Dictionary transforms token definitions into platform-specific outputs."
          sources={[{ title: 'Docs', url: 'https://styledictionary.com' }]}
        >
          {'📖 '}Style Dictionary
        </InlineExpand>
      </p>
      <p>
        <strong>Collapse via composed content:</strong>{' '}
        <InlineExpand
          content={
            <span>
              This expansion uses a composed collapse button inside the content prop.
              <span style={{ display: 'block', marginTop: '8px', fontSize: '12px', color: 'var(--color-cga-brown)', cursor: 'pointer', textDecoration: 'underline dotted' }}>
                [click trigger above to collapse]
              </span>
            </span>
          }
        >
          composed collapse
        </InlineExpand>
      </p>
    </div>
  ),
};
