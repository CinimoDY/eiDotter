import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from './Breadcrumb';
import React from 'react';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    trail: {
      control: 'object',
      description: 'Array of breadcrumb trail items',
    },
    currentLabel: {
      control: 'text',
      description: 'Current page label',
    },
    showBackArrow: {
      control: 'boolean',
      description: 'Show back arrow on last trail item',
    },
    separator: {
      control: 'text',
      description: 'Custom separator character',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    trail: [
      { href: '/', label: 'Home' },
      { href: '/projects', label: 'Projects' },
    ],
    currentLabel: 'Eidotter',
  },
};

export const SingleLevel: Story = {
  args: {
    trail: [
      { href: '/', label: 'Home' },
    ],
    currentLabel: 'About',
  },
};

export const DeepNavigation: Story = {
  args: {
    trail: [
      { href: '/', label: 'Home' },
      { href: '/projects', label: 'Projects' },
      { href: '/projects/design-systems', label: 'Design Systems' },
    ],
    currentLabel: 'Eidotter',
  },
};

export const NoTrail: Story = {
  args: {
    trail: [],
    currentLabel: 'Home',
  },
};

export const WithoutBackArrow: Story = {
  args: {
    trail: [
      { href: '/', label: 'Home' },
      { href: '/projects', label: 'Projects' },
    ],
    currentLabel: 'Eidotter',
    showBackArrow: false,
  },
};

export const CustomSeparator: Story = {
  args: {
    trail: [
      { href: '/', label: 'C:' },
      { href: '/projects', label: 'Projects' },
    ],
    currentLabel: 'Readme.txt',
    separator: '\\',
  },
};

export const DOSPath: Story = {
  args: {
    trail: [
      { href: '/', label: 'C:' },
      { href: '/dos', label: 'DOS' },
    ],
    currentLabel: 'COMMAND.COM',
    separator: '\\',
    showBackArrow: false,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <div style={{
          color: 'var(--color-semantic-text-disabled)',
          fontSize: '10px',
          marginBottom: '8px',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}>
          Default
        </div>
        <Breadcrumb
          trail={[
            { href: '/', label: 'Home' },
            { href: '/projects', label: 'Projects' },
          ]}
          currentLabel="Eidotter"
        />
      </div>
      <div>
        <div style={{
          color: 'var(--color-semantic-text-disabled)',
          fontSize: '10px',
          marginBottom: '8px',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}>
          DOS Path Style
        </div>
        <Breadcrumb
          trail={[
            { href: '/', label: 'C:' },
            { href: '/dos', label: 'DOS' },
          ]}
          currentLabel="AUTOEXEC.BAT"
          separator="\"
          showBackArrow={false}
        />
      </div>
      <div>
        <div style={{
          color: 'var(--color-semantic-text-disabled)',
          fontSize: '10px',
          marginBottom: '8px',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}>
          Single Level
        </div>
        <Breadcrumb
          trail={[{ href: '/', label: 'Home' }]}
          currentLabel="Contact"
        />
      </div>
    </div>
  ),
};
