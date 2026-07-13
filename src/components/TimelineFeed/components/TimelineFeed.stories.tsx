import type { Meta, StoryObj } from '@storybook/react-vite';
import { TimelineFeed } from './TimelineFeed';
import type { TimelineEntryData } from '../../TimelineContainer';

const meta = {
  title: 'Components/TimelineFeed',
  component: TimelineFeed,
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'dos', values: [{ name: 'dos', value: '#000000' }] },
  },
} satisfies Meta<typeof TimelineFeed>;

export default meta;
type Story = StoryObj<typeof TimelineFeed>;

// Placeholder data — the library ships dummy content; real feeds come from consumers.
const entries: TimelineEntryData[] = [
  { id: '1', kind: 'article', date: '2026-07-12', title: 'Connector system converges on the runny yolk', type: 'milestone', tags: ['work'], href: '/log/connector' },
  { id: '2', kind: 'article', date: '2026-06-30', title: 'TimelineContainer grows an article entry kind', type: 'project', tags: ['work'], href: '/log/article-kind' },
  { id: '3', kind: 'text', date: '2026-06-12', title: 'Sketching the nav-as-course model', type: 'event', tags: ['ideas'] },
  { id: '4', kind: 'text', date: '2026-05-20', title: 'Two-tier typography lands', type: 'project', tags: ['work'] },
  { id: '5', kind: 'text', date: '2026-05-05', title: 'Accessibility baseline, WCAG 2.1 AA', type: 'milestone', tags: ['work'] },
  { id: '6', kind: 'text', date: '2026-04-18', title: 'A quiet walk, no code', type: 'event', tags: ['life'] },
];

const categories = [
  { key: 'work', label: 'work', color: '#FFB000' },
  { key: 'ideas', label: 'ideas', color: '#55FFFF' },
  { key: 'life', label: 'life', color: '#55FF55' },
];

export const Default: Story = {
  args: { entries },
};

export const WithCategoryFilter: Story = {
  args: { entries, categories },
  parameters: {
    docs: {
      description: {
        story: 'Category chips cull the feed — "navigation becomes a course through time". Colour lives only in the small dots + active chip; the rest stays amber-mono.',
      },
    },
  },
};

export const Empty: Story = {
  args: { entries: [], categories },
};
