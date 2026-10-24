import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconButton } from './IconButton';
import type { IconName } from '../../Icon/components/Icon';

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dos',
      values: [{ name: 'dos', value: '#000000' }],
    },
    docs: {
      description: {
        component:
          'The one icon-only control (DMNC-1592): a pixel glyph in a thin square outline. Hover inverts (amber fill, dark glyph), focus is a 2px brand outline. `md` is 36×36 with a 20px glyph; `md` is what every built-in control uses, including dialog strips and DosWindow controls; `window` is 28×28 with a 16px glyph, for dense chrome; `touch` is 44×44 with a 24px glyph, for stage-sized targets. `tone="inherit"` takes the surrounding text colour (glyph, outline, focus ring; hover tints with it) for coloured bars. `label` is required and becomes the `aria-label`.',
      },
    },
  },
  tags: ['autodocs'],
  args: { icon: 'Close', label: 'Close', size: 'md', variant: 'outline', tone: 'accent' },
  argTypes: {
    size: { control: 'inline-radio', options: ['md', 'window', 'touch'] },
    variant: { control: 'inline-radio', options: ['outline', 'bare'] },
    tone: { control: 'inline-radio', options: ['accent', 'inherit'] },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof IconButton>;

const GLYPHS: { icon: IconName; label: string }[] = [
  { icon: 'Close', label: 'Close' },
  { icon: 'Cancel', label: 'Minimise' },
  { icon: 'Fullscreen', label: 'Maximise' },
  { icon: 'Chevron Left', label: 'Previous' },
  { icon: 'Chevron Right', label: 'Next' },
  { icon: 'Chevron Up', label: 'Up' },
  { icon: 'Chevron Down', label: 'Down' },
];

const row: React.CSSProperties = { display: 'flex', gap: 16, alignItems: 'center' };
const caption: React.CSSProperties = {
  color: 'var(--color-semantic-text-primary)',
  fontFamily: 'var(--typography-font-family-primary)',
  fontSize: 'var(--typography-font-size-text-xs)',
  textTransform: 'uppercase',
  minWidth: 140,
};

export const Default: Story = {};

export const AllGlyphs: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={row}>
        <span style={caption}>md 36</span>
        {GLYPHS.map((g) => <IconButton key={g.icon} {...g} />)}
      </div>
      <div style={row}>
        <span style={caption}>window 28</span>
        {GLYPHS.map((g) => <IconButton key={g.icon} {...g} size="window" />)}
      </div>
      <div style={row}>
        <span style={caption}>touch 44</span>
        {GLYPHS.map((g) => <IconButton key={g.icon} {...g} size="touch" />)}
      </div>
      <div style={row}>
        <span style={caption}>bare</span>
        {GLYPHS.map((g) => <IconButton key={g.icon} {...g} variant="bare" />)}
      </div>
      <div style={row}>
        <span style={caption}>disabled</span>
        <IconButton icon="Chevron Left" label="Previous" isDisabled />
        <IconButton icon="Chevron Left" label="Previous" size="window" isDisabled />
      </div>
    </div>
  ),
};

/**
 * Rest, hover, focus, driven through React Aria's real states by the play
 * function: a mouse `pointerover` sets `data-hovered` on the middle button,
 * and a keyboard Tab then focus puts `data-focus-visible` on the last.
 * Only one element can be hovered at a time, so each size has its own story.
 */
const statesStory = (size: 'md' | 'window'): Story => ({
  render: () => (
    <div style={row}>
      <span style={caption}>{size}: rest / hover / focus</span>
      <IconButton icon="Close" label="Close (rest)" size={size} />
      <IconButton icon="Close" label="Close (hover)" size={size} />
      <IconButton icon="Close" label="Close (focus)" size={size} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    canvasElement
      .querySelector('[aria-label="Close (hover)"]')
      ?.dispatchEvent(new PointerEvent('pointerover', { bubbles: true, pointerType: 'mouse', isPrimary: true }));
    // A keyboard event first so React Aria treats the next focus as keyboard modality.
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    canvasElement.querySelector<HTMLButtonElement>('[aria-label="Close (focus)"]')?.focus();
  },
});

export const States: Story = statesStory('md');
export const StatesWindow: Story = statesStory('window');

const bar = (background: string, color: string): React.CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '0 0 0 12px',
  background,
  color,
  fontFamily: 'var(--typography-font-family-primary)',
  fontSize: 'var(--typography-font-size-text-base)',
  textTransform: 'uppercase',
  minWidth: 320,
});

/**
 * DMNC-1612: `size="touch"` (44×44, 24px glyph) with `tone="inherit"` on
 * coloured status bars. The bar sets `color`; the glyph, outline and focus
 * ring follow it, and hover tints the button with it. Tab to see the ring.
 */
export const TouchOnColouredBar: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={bar('var(--color-semantic-background-brand)', 'var(--color-semantic-text-on-brand)')}>
        <span style={{ flex: 1 }}>Recording</span>
        <IconButton icon="Chevron Left" label="Previous take" size="touch" tone="inherit" variant="bare" />
        <IconButton icon="Chevron Right" label="Next take" size="touch" tone="inherit" variant="bare" />
        <IconButton icon="Close" label="Stop" size="touch" tone="inherit" />
      </div>
      <div style={bar('var(--color-semantic-background-accent)', 'var(--color-semantic-text-on-accent)')}>
        <span style={{ flex: 1 }}>Paused</span>
        <IconButton icon="Fullscreen" label="Maximise" size="touch" tone="inherit" />
        <IconButton icon="Close" label="Close" size="touch" tone="inherit" isDisabled />
      </div>
      <div style={{ ...bar('transparent', 'var(--color-semantic-text-primary)'), padding: 0 }}>
        <span style={caption}>touch, accent</span>
        <IconButton icon="Close" label="Close (touch)" size="touch" />
      </div>
    </div>
  ),
};
