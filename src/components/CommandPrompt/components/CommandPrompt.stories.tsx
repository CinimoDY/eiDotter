import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CommandPrompt } from './CommandPrompt';
import { componentRegistry } from '@/components/registry';

const meta = {
  title: 'Components/CommandPrompt',
  component: CommandPrompt,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dos',
      values: [
        { name: 'dos', value: '#000000' },
      ],
    },
    projectMeta: componentRegistry['CommandPrompt'],
  },
  tags: ['autodocs'],
  argTypes: {
    prompt: {
      control: 'text',
      defaultValue: 'C:\\>'
    },
    autoFocus: {
      control: 'boolean',
      defaultValue: false
    },
    disabled: {
      control: 'boolean',
      defaultValue: false
    },
    placeholder: {
      control: 'text'
    },
    onCommand: { action: 'command' }
  }
} satisfies Meta<typeof CommandPrompt>;

export default meta;
type Story = StoryObj<typeof CommandPrompt>;

// Default command prompt
export const Default: Story = {
  args: {
    prompt: 'C:\\>',
    onCommand: (cmd) => console.log('Command:', cmd),
  },
};

// Custom prompt
export const CustomPrompt: Story = {
  args: {
    prompt: '$',
    onCommand: (cmd) => console.log('Command:', cmd),
  },
};

// Unix-style prompt
export const UnixPrompt: Story = {
  args: {
    prompt: 'user@dos:~$',
    onCommand: (cmd) => console.log('Command:', cmd),
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    prompt: 'C:\\>',
    disabled: true,
    onCommand: (cmd) => console.log('Command:', cmd),
  },
};

// With placeholder
export const WithPlaceholder: Story = {
  args: {
    prompt: 'C:\\>',
    placeholder: 'Type a command...',
    onCommand: (cmd) => console.log('Command:', cmd),
  },
};

// Interactive example with command history display
export const Interactive: Story = {
  render: function InteractiveStory() {
    const [history, setHistory] = useState<string[]>([]);

    const handleCommand = (command: string) => {
      setHistory(prev => [...prev, `C:\\> ${command}`, `Executed: ${command}`]);
    };

    return (
      <div style={{ width: '400px', fontFamily: '"Flexi IBM VGA True", monospace' }}>
        <div style={{
          background: '#000',
          color: '#AAAAAA',
          padding: '16px',
          minHeight: '200px'
        }}>
          {history.map((line, i) => (
            <div key={i} style={{ marginBottom: '4px' }}>{line}</div>
          ))}
          <CommandPrompt
            prompt="C:\>"
            onCommand={handleCommand}
            autoFocus
          />
        </div>
      </div>
    );
  },
};
