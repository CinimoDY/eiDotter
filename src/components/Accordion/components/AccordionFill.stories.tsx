import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AccordionFill } from './AccordionFill';

const meta = {
  title: 'Components/Accordion/AccordionFill',
  component: AccordionFill,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AccordionFill>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultSections = [
  {
    title: 'Section 1',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget quam netus consectetur magnis. Lorem est ac duis risus semper. Nunc faucibus turpis ac sollicitudin suscipit imperdiet est, cursus.',
  },
  {
    title: 'Section 2',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget quam netus consectetur magnis. Lorem est ac duis risus semper. Nunc faucibus turpis ac sollicitudin suscipit imperdiet est, cursus.',
  },
  {
    title: 'Section 3',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget quam netus consectetur magnis. Lorem est ac duis risus semper. Nunc faucibus turpis ac sollicitudin suscipit imperdiet est, cursus.',
  },
  {
    title: 'Section 4',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget quam netus consectetur magnis. Lorem est ac duis risus semper. Nunc faucibus turpis ac sollicitudin suscipit imperdiet est, cursus.',
  },
  {
    title: 'Section 5',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget quam netus consectetur magnis. Lorem est ac duis risus semper. Nunc faucibus turpis ac sollicitudin suscipit imperdiet est, cursus.',
  },
];

export const Default: Story = {
  args: {
    sections: defaultSections,
  },
};

export const WithDefaultExpanded: Story = {
  args: {
    sections: defaultSections,
    defaultExpandedIndex: 0,
  },
}; 