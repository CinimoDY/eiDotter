import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Bench } from './Bench';
import { Badge } from '../../Badge';
import { FixtureScreen } from '../../../fixtures/review';

const meta = {
  title: 'Components/Bench',
  component: Bench,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Compare unit on DosWindow (0.43): a title strip with status chips, an optional note, ' +
          'then before | after panes separated by a 1px gap the grid background paints. Each pane ' +
          'has an uppercase label and a keyboard-scrollable frame (max 640px tall). Panes stack ' +
          'below 760px of bench width (container query). Images in these stories are ' +
          'FIXTURE ONLY, illustrative placeholders.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Bench>;

export default meta;
type Story = StoryObj<typeof Bench>;

const chips = (
  <>
    <Badge size="sm">retro</Badge>
    <Badge size="sm">1280</Badge>
  </>
);

export const DesktopPair: Story = {
  name: 'Desktop pair',
  args: {
    title: 'Home, retro, 1280',
    chips,
    note: 'Plain-text brand, uppercase nav, toggle in the end slot. FIXTURE ONLY, illustrative.',
    panes: [
      { label: 'Before', tone: 'before', content: <FixtureScreen kind="desktop" state="before" label="Example home page, 1280 wide, before" /> },
      { label: 'After', tone: 'after', content: <FixtureScreen kind="desktop" state="after" label="Example home page, 1280 wide, after" /> },
    ],
  },
};

export const PhonePair: Story = {
  name: 'Phone pair',
  args: {
    title: 'Home, retro, 390',
    chips: (
      <>
        <Badge size="sm">retro</Badge>
        <Badge size="sm">390</Badge>
        <Badge size="sm" variant="warning">upstream</Badge>
      </>
    ),
    panes: [
      { label: 'Before', tone: 'before', frame: 'phone', content: <FixtureScreen kind="phone" state="before" label="Example home page, 390 wide, before" /> },
      { label: 'After', tone: 'after', frame: 'phone', content: <FixtureScreen kind="phone" state="after" label="Example home page, 390 wide, after" /> },
    ],
  },
};

export const SinglePane: Story = {
  name: 'Single pane',
  args: {
    title: 'Palette, new',
    chips: <Badge size="sm" variant="success">new</Badge>,
    panes: [
      { label: 'After · 1280', tone: 'after', content: <FixtureScreen kind="desktop" state="after" label="Example palette open, 1280 wide" /> },
    ],
  },
};

export const StackedAtPhone: Story = {
  name: 'Stacked at phone width',
  args: DesktopPair.args,
  parameters: {
    viewport: { defaultViewport: 'phone375' },
    docs: {
      description: { story: 'Below 760px of bench width the panes stack and the chips move under the title.' },
    },
  },
};
