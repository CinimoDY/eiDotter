import type { Meta, StoryObj } from '@storybook/react-vite';
import { Section } from './Section';
import { componentRegistry } from '@/components/registry';

const meta = {
  title: 'Components/Accordion/Section',
  component: Section,
  parameters: {
    layout: 'centered',
    projectMeta: componentRegistry['Accordion'],
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

/**
 * Regression story for DMNC-928: content far taller than the old 500px
 * max-height cap must be fully visible when expanded — nothing clipped,
 * the section grows to its natural content height.
 */
export const ExpandedTallContent: Story = {
  args: {
    title: 'Tall content (regression: DMNC-928)',
    defaultExpanded: true,
    children: (
      <div>
        {Array.from({ length: 12 }, (_, i) => (
          <p key={i} style={{ marginBottom: 'var(--spacing-4, 16px)' }}>
            Paragraph {i + 1} of 12 — {defaultContent}
          </p>
        ))}
        <button type="button">Reachable control below 500px</button>
      </div>
    ),
  },
};