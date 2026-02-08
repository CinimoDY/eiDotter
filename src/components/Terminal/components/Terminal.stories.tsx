import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Terminal } from './Terminal';

const meta = {
  title: 'Components/Terminal',
  component: Terminal,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dos',
      values: [
        { name: 'dos', value: '#0000AA' }, // DOS blue background
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size variant of the terminal window',
    },
    title: {
      control: 'text',
      description: 'Title displayed in the terminal title bar',
    },
    state: {
      control: 'select',
      options: ['active', 'inactive', 'minimized'],
      description: 'Current state of the terminal window',
    },
    resizable: {
      control: 'boolean',
      description: 'Whether the terminal can be resized',
    },
    minimizable: {
      control: 'boolean',
      description: 'Whether the terminal can be minimized',
    },
    maximizable: {
      control: 'boolean',
      description: 'Whether the terminal can be maximized',
    },
    closeable: {
      control: 'boolean',
      description: 'Whether the terminal can be closed',
    },
    autoFocus: {
      control: 'boolean',
      description: 'Whether the terminal should auto-focus on mount',
    },
    onMinimize: { action: 'minimized' },
    onMaximize: { action: 'maximized' },
    onClose: { action: 'closed' },
    onFocus: { action: 'focused' },
  },
} satisfies Meta<typeof Terminal>;

export default meta;
type Story = StoryObj<typeof Terminal>;

export const Default: Story = {
  args: {
    title: 'MS-DOS Terminal',
    size: 'medium',
    state: 'active',
  },
};

export const Small: Story = {
  args: {
    title: 'Command Prompt',
    size: 'small',
    state: 'active',
  },
};

export const Large: Story = {
  args: {
    title: 'Terminal Session',
    size: 'large',
    state: 'active',
  },
};

export const Inactive: Story = {
  args: {
    title: 'Background Terminal',
    state: 'inactive',
  },
};

export const Minimized: Story = {
  args: {
    title: 'Minimized Terminal',
    state: 'minimized',
  },
  render: (args) => (
    <div style={{ position: 'absolute', bottom: 10, left: 10 }}>
        <Terminal {...args} />
    </div>
  )
};

export const WithContent: Story = {
  args: {
    title: 'Active Session',
    children: (
      <div style={{ fontFamily: `'Perfect DOS VGA', monospace`, color: 'var(--color-semantic-text-primary)', whiteSpace: 'pre' }}>
{`Microsoft(R) MS-DOS(R) Version 6.22
(C)Copyright Microsoft Corp 1981-1994.

C:\\>dir
 Volume in drive C has no label.
 Volume Serial Number is 1234-5678

 Directory of C:\\

AUTOEXEC BAT     123  12-03-94   9:30a
CONFIG   SYS      45  12-03-94   9:30a
COMMAND  COM  54,645  05-31-94   6:22a
        3 file(s)     54,813 bytes
        1,234,567 bytes free

C:\\>`}
        <span className="terminal__cursor">█</span>
      </div>
    ),
  },
};

export const NoControls: Story = {
  args: {
    title: 'Read-Only Terminal',
    minimizable: false,
    maximizable: false,
    closeable: false,
    resizable: false,
  },
};

export const CustomTitle: Story = {
  args: {
    title: 'File Manager - C:\\DOS',
    children: (
        <div style={{ fontFamily: `'Perfect DOS VGA', monospace`, color: 'var(--color-semantic-text-primary)', whiteSpace: 'pre' }}>
{` Directory of C:\\DOS

EDIT     COM   12,345  05-31-94   6:22a
FORMAT   COM   29,816  05-31-94   6:22a
FDISK    EXE   29,334  05-31-94   6:22a
        3 file(s)     71,495 bytes

C:\\DOS>`}
        <span className="terminal__cursor">█</span>
      </div>
    ),
  },
};

export const InteractiveExample: Story = {
  name: 'Interactive Example (Check Actions tab)',
  args: {
    title: 'Interactive Terminal',
    autoFocus: true,
  },
  render: (args) => {
    return (
      <Terminal
        {...args}
      >
        <div style={{ fontFamily: `'Perfect DOS VGA', monospace`, color: 'var(--color-semantic-text-primary)', whiteSpace: 'pre' }}>
{`Welcome to eiDotter Terminal
Type 'help' for available commands

C:\\EIDOTTER>help
Available commands:
  help    - Show this help message
  cls     - Clear screen
  dir     - List directory contents
  exit    - Exit terminal

C:\\EIDOTTER>`}
          <span className="terminal__cursor">█</span>
        </div>
      </Terminal>
    );
  },
}; 