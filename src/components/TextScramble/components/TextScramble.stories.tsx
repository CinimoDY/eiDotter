import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TextScramble } from './TextScramble';

const meta: Meta<typeof TextScramble> = {
  title: 'Components/TextScramble',
  component: TextScramble,
  tags: ['autodocs'],
  argTypes: {
    speed: {
      control: { type: 'range', min: 10, max: 100, step: 5 },
    },
    delay: {
      control: { type: 'range', min: 0, max: 2000, step: 100 },
    },
    characters: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextScramble>;

export const Default: Story = {
  args: {
    children: 'SYSTEM ONLINE',
    speed: 40,
  },
};

export const SlowReveal: Story = {
  args: {
    children: 'LOADING COMPLETE',
    speed: 80,
  },
};

export const FastScramble: Story = {
  args: {
    children: 'READY',
    speed: 20,
  },
};

export const CustomCharacters: Story = {
  args: {
    children: 'ENCRYPTED DATA',
    characters: '01',
    speed: 30,
  },
};

export const WithDelay: Story = {
  args: {
    children: 'DELAYED MESSAGE',
    speed: 40,
    delay: 1000,
  },
};

const DynamicTextDemo = () => {
  const messages = [
    'C:\\> DIR',
    'VOLUME IN DRIVE C IS DOS',
    'DIRECTORY OF C:\\',
    '3 FILE(S)  1,024 BYTES FREE',
  ];
  const [index, setIndex] = useState(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <TextScramble speed={30}>
        {messages[index]}
      </TextScramble>
      <button
        onClick={() => setIndex((i) => (i + 1) % messages.length)}
        style={{
          marginTop: '16px',
          padding: '4px 12px',
          cursor: 'pointer',
          width: 'fit-content',
        }}
      >
        Next message
      </button>
    </div>
  );
};

export const DynamicText: Story = {
  render: () => <DynamicTextDemo />,
};
