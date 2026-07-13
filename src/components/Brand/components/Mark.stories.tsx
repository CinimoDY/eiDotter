import React, { useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Mark } from './Mark';
import { Badge } from '../../Badge';

const meta = {
  title: 'Brand/Mark',
  component: Mark,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Mark>;

export default meta;
type Story = StoryObj<typeof Mark>;

export const Default: Story = {
  args: { size: 64 },
};

export const Static: Story = {
  args: { size: 64, morph: false },
  parameters: {
    docs: { description: { story: 'Static organic silhouette — the border-radius morph loop disabled.' } },
  },
};

export const Decorative: Story = {
  args: { size: 64, label: '' },
  parameters: {
    docs: { description: { story: 'An empty `label` marks the mark decorative — `aria-hidden`, no role.' } },
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
      <Mark size={24} />
      <Mark size={48} />
      <Mark size={96} />
    </div>
  ),
};

// Arm stories need hooks (scopeRef) → a local wrapper component (hooks are
// illegal directly inside a `render:` function).
function ArmsDemo({ badgeCount = 3 }: { badgeCount?: number }) {
  const scopeRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={scopeRef}
      style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 96, padding: 48 }}
    >
      <Mark size={40} arms={{ scopeRef }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {Array.from({ length: badgeCount }).map((_, i) => (
          <Badge key={i} className="eidotter-header__category" variant="accent">
            cat {i + 1}
          </Badge>
        ))}
      </div>
    </div>
  );
}

export const WithArms: Story = {
  render: () => <ArmsDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Arm connectors drawn from the mark to badges carrying the stable ' +
          '`.eidotter-header__category` class (the DMNC-1326 measurement contract). ' +
          'Arms are aria-hidden and never intercept pointer events.',
      },
    },
  },
};

export const VariableBadges: StoryObj<{ badgeCount: number }> = {
  args: { badgeCount: 3 },
  argTypes: {
    badgeCount: { control: { type: 'range', min: 2, max: 5, step: 1 } },
  },
  render: ({ badgeCount }) => <ArmsDemo badgeCount={badgeCount} />,
  parameters: {
    docs: {
      description: {
        story: 'Drag the `badgeCount` control (2–5) to watch the arms redraw with alternating curvature.',
      },
    },
  },
};
