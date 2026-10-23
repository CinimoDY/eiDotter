import type { Meta, StoryObj } from '@storybook/react-vite';
import { TimelinePage } from './TimelinePage';
import { Mark } from '../../Brand';
import type { TimelineEntryData } from '../../TimelineContainer';

const meta = {
  title: 'Components/TimelinePage',
  component: TimelinePage,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dos', values: [{ name: 'dos', value: '#000000' }] },
  },
} satisfies Meta<typeof TimelinePage>;

export default meta;
type Story = StoryObj<typeof TimelinePage>;

// Placeholder content — real blogs supply their own entries + thumbnails.
const entries: TimelineEntryData[] = [
  { id: '1', kind: 'article', date: '2026-07-12', title: 'Connector system converges on the runny yolk', summary: 'Two keeper layouts fall out of the Figma pass — a dense feed and a Bret-Victor blog timeline.', tags: ['work'], href: '/log/connector' },
  { id: '2', kind: 'article', date: '2026-06-30', title: 'TimelineContainer grows an article entry kind', summary: 'Collapsed thumb-strip, expanded gallery and read-more — the devlog surface the blog rides on.', tags: ['work'], href: '/log/article-kind' },
  { id: '3', kind: 'article', date: '2026-05-05', title: 'Accessibility baseline, WCAG 2.1 AA', summary: 'Token contrast, keyboard audit, motion spot-check — the gate every new component clears.', tags: ['ideas'] },
  { id: '4', kind: 'article', date: '2025-12-18', title: 'Perfect DOS VGA 437 becomes the display face', summary: 'Axis-aligned glyph outlines — no curves, no faux-bold. The single-weight rule follows.', tags: ['work'] },
  { id: '5', kind: 'text', date: '2025-11-02', title: 'A quiet reset weekend, no code', tags: ['life'] },
];

const categories = [
  { key: 'work', label: 'work', color: '#FFB000' },
  { key: 'ideas', label: 'ideas', color: '#55FFFF' },
  { key: 'life', label: 'life', color: '#55FF55' },
];

export const Default: Story = {
  render: (args) => (
    <div style={{ padding: 40, background: '#000', minHeight: '100vh' }}>
      <TimelinePage {...args} />
    </div>
  ),
  args: { entries, categories, brand: <Mark size={32} label="" /> },
};

export const NoFilter: Story = {
  render: (args) => (
    <div style={{ padding: 40, background: '#000', minHeight: '100vh' }}>
      <TimelinePage {...args} />
    </div>
  ),
  args: { entries },
  parameters: {
    docs: { description: { story: 'Just the year-grouped timeline — amber spine, grey dates, big titles, no filter.' } },
  },
};
