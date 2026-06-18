import type { Meta, StoryObj } from '@storybook/react-vite';
import { LabeledProgress } from './LabeledProgress';

const meta = {
  title: 'Components/LabeledProgress',
  component: LabeledProgress,
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'dos',
      values: [{ name: 'dos', value: '#000000' }],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LabeledProgress>;

export default meta;
type Story = StoryObj<typeof LabeledProgress>;

export const Default: Story = {
  args: { label: 'Fortschritt', value: 84 },
};

export const WithMaxAndSuffix: Story = {
  args: { label: 'Filed', value: 18, max: 24, valueSuffix: '/24' },
};

export const NoLabel: Story = {
  args: { value: 50, 'aria-label': 'Loading' },
};

export const ValueHidden: Story = {
  args: { label: 'Coverage', value: 67, showValue: false },
};

export const Stack: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
      <LabeledProgress label="Coverage" value={50} />
      <LabeledProgress label="Themes" value={50} />
      <LabeledProgress label="Adoption" value={78} />
    </div>
  ),
};
