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

export const WithComposedContent: Story = {
  render: () => (
    <p style={{ color: 'var(--color-semantic-text-primary)', maxWidth: '600px', lineHeight: '1.6' }}>
      The project uses{' '}
      <InlineExpand
        content={
          <span>
            Style Dictionary is a build system for design tokens. It transforms
            token definitions (JSON) into platform-specific outputs: CSS custom
            properties, Swift enums, JavaScript modules, and more.
            <span style={{
              display: 'block',
              marginTop: '8px',
              fontSize: '12px',
              color: 'var(--color-cga-brown)',
            }}>
              Sources: style-dictionary.com | amzn/style-dictionary
            </span>
          </span>
        }
      >
        Style Dictionary
      </InlineExpand>{' '}
      to generate tokens for all platforms.
    </p>
  ),
};
