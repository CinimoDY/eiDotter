import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Section } from './Section';
import { AccordionFill } from './AccordionFill';
import { componentRegistry } from '@/components/registry';

const meta = {
  title: 'Components/Accordion',
  component: AccordionFill,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dos',
      values: [
        { name: 'dos', value: '#000000' },
      ],
    },
    projectMeta: componentRegistry['Accordion'],
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AccordionFill>;

export default meta;

// Example content for sections
const defaultContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget quam netus consectetur magnis. Lorem est ac duis risus semper. Nunc faucibus turpis ac sollicitudin suscipit imperdiet est, cursus.';

// Section Stories
export const SingleSection: StoryObj<typeof Section> = {
  render: () => (
    <Section title="Expandable Section">
      {defaultContent}
    </Section>
  ),
};

export const ExpandedSection: StoryObj<typeof Section> = {
  render: () => (
    <Section title="Pre-expanded Section" defaultExpanded>
      {defaultContent}
    </Section>
  ),
};

// AccordionFill Stories
const sections = [
  { title: 'Section 1', content: defaultContent },
  { title: 'Section 2', content: defaultContent },
  { title: 'Section 3', content: defaultContent },
];

export const DefaultAccordion: StoryObj<typeof AccordionFill> = {
  render: () => (
    <AccordionFill sections={sections} />
  ),
};

export const WithDefaultExpanded: StoryObj<typeof AccordionFill> = {
  render: () => (
    <AccordionFill sections={sections} defaultExpandedIndex={0} />
  ),
}; 