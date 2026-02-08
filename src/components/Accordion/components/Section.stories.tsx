import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Section } from './Section';

const meta = {
  title: 'Components/Accordion/Section',
  component: Section,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget quam netus consectetur magnis. Lorem est ac duis risus semper. Nunc faucibus turpis ac sollicitudin suscipit imperdiet est, cursus.';

export const Default: Story = {
  args: {
    title: 'Title',
    children: defaultContent,
  },
};

export const Hover: Story = {
  args: {
    title: 'Title',
    children: defaultContent,
    isHovered: true,
  },
};

export const Active: Story = {
  args: {
    title: 'Title',
    children: defaultContent,
    isActive: true,
  },
};

export const Expanded: Story = {
  args: {
    title: 'Title',
    children: defaultContent,
    defaultExpanded: true,
  },
};

export const ExpandedHover: Story = {
  args: {
    title: 'Title',
    children: defaultContent,
    defaultExpanded: true,
    isHovered: true,
  },
};

export const ExpandedActive: Story = {
  args: {
    title: 'Title',
    children: defaultContent,
    defaultExpanded: true,
    isActive: true,
  },
}; 