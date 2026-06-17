import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TimelineContainer } from './TimelineContainer';
import { componentRegistry } from '@/components/registry';
import type { TimelineEntryData, ZoomLevel } from './types';

const sampleEntries: TimelineEntryData[] = [
  {
    id: '1',
    type: 'event',
    date: '2024-01-15T10:30:00Z',
    title: 'Project Kickoff',
    kind: 'text' as const,
    content: 'Initial planning session for the DOS revival project',
    tags: ['planning', 'milestone'],
  },
  {
    id: '2',
    type: 'milestone',
    date: '2024-02-20T14:00:00Z',
    title: 'Alpha Release',
    kind: 'text' as const,
    content: 'First working prototype with CGA color palette',
    tags: ['release'],
  },
  {
    id: '3',
    type: 'event',
    date: '2024-03-10T09:00:00Z',
    title: 'Design Review',
    kind: 'text' as const,
    content: 'Reviewed all component designs against DOS aesthetic guidelines',
    tags: ['design', 'review'],
  },
  {
    id: '4',
    type: 'project',
    date: '2024-06-01T11:00:00Z',
    title: 'Beta Launch',
    kind: 'text' as const,
    content: 'Public beta of the eiDotter design system',
    tags: ['release', 'milestone'],
  },
  {
    id: '5',
    type: 'event',
    date: '2024-06-15T16:30:00Z',
    title: 'Community Feedback',
    kind: 'text' as const,
    content: 'Incorporated feedback from early adopters',
    tags: ['community'],
  },
  {
    id: '6',
    type: 'milestone',
    date: '2025-01-05T08:00:00Z',
    title: 'v1.0 Stable',
    kind: 'text' as const,
    content: 'Production-ready release with full component library',
    tags: ['release', 'milestone'],
  },
  {
    id: '7',
    type: 'event',
    date: '2025-03-20T13:45:00Z',
    title: 'Token Pipeline Upgrade',
    kind: 'text' as const,
    content: 'Migrated to Style Dictionary v5 with DTCG format',
    tags: ['infrastructure'],
  },
];

const meta: Meta<typeof TimelineContainer> = {
  title: 'Components/TimelineContainer',
  component: TimelineContainer,
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'dos',
      values: [{ name: 'dos', value: '#000000' }],
    },
    projectMeta: componentRegistry['TimelineContainer'],
  },
  tags: ['autodocs'],
  argTypes: {
    defaultZoomLevel: {
      control: 'select',
      options: ['year', 'month', 'day', 'hour'],
    },
    sortOrder: {
      control: 'select',
      options: ['asc', 'desc'],
    },
    scrollToZoom: {
      control: 'boolean',
    },
    keyboardShortcuts: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    entries: sampleEntries,
  },
};

export const YearView: Story = {
  args: {
    entries: sampleEntries,
    defaultZoomLevel: 'year',
  },
};

export const MonthView: Story = {
  args: {
    entries: sampleEntries,
    defaultZoomLevel: 'month',
  },
};

export const DayView: Story = {
  args: {
    entries: sampleEntries,
    defaultZoomLevel: 'day',
  },
};

export const HourView: Story = {
  args: {
    entries: sampleEntries,
    defaultZoomLevel: 'hour',
  },
};

export const StaticMode: Story = {
  args: {
    entries: sampleEntries,
    mode: 'static',
  },
};

const feedEntries: TimelineEntryData[] = Array.from({ length: 25 }, (_, i) => ({
  id: `feed-${i + 1}`,
  type: (['event', 'milestone', 'project'] as const)[i % 3],
  date: new Date(2025, 11 - (i % 12), 15 - (i % 14), 10 + (i % 8), 0).toISOString(),
  title: `Update #${i + 1}`,
  kind: 'text' as const,
  content: `Body copy for update #${i + 1}. Sample feed entry to demonstrate paginated rendering with collapse / expand on selection.`,
  tags: i % 2 === 0 ? ['weekly'] : ['announcement'],
}));

/**
 * Feed mode: paginated vertical list, collapsed-by-default with click-to-expand
 * via selection, and a DOS-styled "LOAD MORE..." button while more entries are
 * available. No zoom controls. Use this when you want a Twitter / changelog-
 * style read of a single chronological list rather than a multi-zoom timeline.
 */
export const FeedMode: Story = {
  args: {
    entries: feedEntries,
    mode: 'feed',
    pageSize: 5,
  },
};

const FeedModeOnLoadMoreExample = () => {
  const [loadCount, setLoadCount] = useState(0);
  return (
    <div>
      <div
        style={{
          color: 'var(--color-cga-amber)',
          fontFamily: 'var(--typography-font-family-primary)',
          fontSize: 'var(--typography-font-size-text-sm)',
          marginBottom: 'var(--spacing-4)',
        }}
      >
        onLoadMore fired: {loadCount} {loadCount === 1 ? 'time' : 'times'}
      </div>
      <TimelineContainer
        entries={feedEntries}
        mode="feed"
        pageSize={5}
        onLoadMore={() => setLoadCount((n) => n + 1)}
      />
    </div>
  );
};

/**
 * `onLoadMore` fires after each LOAD MORE click with the new visible count.
 * Use it to trigger backend fetches and append to `entries`, or for analytics.
 */
export const FeedModeWithOnLoadMore: Story = {
  render: () => <FeedModeOnLoadMoreExample />,
};

export const Ascending: Story = {
  args: {
    entries: sampleEntries,
    defaultZoomLevel: 'year',
    sortOrder: 'asc',
  },
};

export const Empty: Story = {
  args: {
    entries: [],
  },
};

/**
 * Verifies that TimelineContainer does not paint its own background.
 * The component renders against a light backdrop (overridden via
 * Storybook's `backgrounds` parameter) — if a `bg-dos-bg-primary`
 * regression slips back in, this story will show a black box.
 */
export const OnLightBackdrop: Story = {
  args: {
    entries: sampleEntries,
  },
  parameters: {
    backgrounds: {
      default: 'light',
      values: [{ name: 'light', value: '#FFE8A8' }],
    },
  },
};

export const SingleEntry: Story = {
  args: {
    entries: [sampleEntries[0]],
    defaultZoomLevel: 'day',
  },
};

export const Mobile: Story = {
  args: {
    entries: sampleEntries,
    defaultZoomLevel: 'month',
  },
  globals: {
    viewport: { value: 'phone375' },
  },
};

export const Tablet: Story = {
  args: {
    entries: sampleEntries,
    defaultZoomLevel: 'month',
  },
  globals: {
    viewport: { value: 'tablet768' },
  },
};

export const Ultrawide: Story = {
  args: {
    entries: sampleEntries,
    defaultZoomLevel: 'day',
  },
  globals: {
    viewport: { value: 'ultrawide' },
  },
};

const ControlledExample = () => {
  const [zoom, setZoom] = useState<ZoomLevel>('month');
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div>
      <div style={{
        color: 'var(--color-cga-amber)',
        fontFamily: 'var(--typography-font-family-primary)',
        fontSize: 'var(--typography-font-size-text-sm)',
        marginBottom: 'var(--spacing-4)',
      }}>
        Zoom: {zoom} | Selected: {selected ?? 'none'}
      </div>
      <TimelineContainer
        entries={sampleEntries}
        zoomLevel={zoom}
        onZoomChange={setZoom}
        selectedEntryId={selected}
        onSelectEntry={setSelected}
      />
    </div>
  );
};

export const Controlled: Story = {
  render: () => <ControlledExample />,
};

// ── Master-detail (level-3) — DMNC-878 ─────────────────────────────────────

const MasterDetailExample = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div>
      <div style={{
        color: 'var(--color-semantic-text-brand)',
        fontFamily: 'var(--typography-font-family-primary)',
        fontSize: 'var(--typography-font-size-text-sm)',
        marginBottom: 'var(--spacing-4)',
      }}>
        Open entry: {selected ?? 'none'} — deep-linkable via `selectedEntryId`
      </div>
      <TimelineContainer
        entries={sampleEntries}
        mode="master-detail"
        selectedEntryId={selected}
        onSelectEntry={setSelected}
      />
    </div>
  );
};

/**
 * Level-3 master-detail split view (DMNC-878): the timeline becomes a navigable
 * rail and the selected entry fills the detail pane, swapping without losing
 * rail position. The open entry is the controlled `selectedEntryId`, so it is
 * deep-linkable — wire it to your router. Arrow keys walk entries; Escape (or
 * the mobile BACK button) returns to the rail.
 */
export const MasterDetail: Story = {
  render: () => <MasterDetailExample />,
};

/**
 * Master-detail on a narrow viewport collapses to one pane at a time: the rail,
 * then a full-screen detail with a BACK button (container-query driven).
 */
export const MasterDetailMobile: Story = {
  args: {
    entries: sampleEntries,
    mode: 'master-detail',
    defaultSelectedEntryId: '2',
  },
  globals: {
    viewport: { value: 'phone375' },
  },
};

/**
 * `renderEntry` lets consumers swap the default `TimelineEntryCard` for any
 * custom node — useful for blog posts, photos, or domain-specific layouts.
 *
 * The render context exposes `defaultRender()` so you can opt in per-entry:
 * customise some entries while letting the rest fall through to the default
 * card. Selection and expansion state are passed through unchanged.
 */
export const CustomRenderEntry: Story = {
  args: {
    entries: sampleEntries,
    defaultZoomLevel: 'month',
    renderEntry: (entry, ctx) =>
      entry.type === 'milestone' ? (
        <div
          style={{
            border: '2px solid var(--color-cga-amber)',
            borderRadius: 'var(--border-radius-base)',
            padding: 'var(--spacing-3)',
            marginBottom: 'var(--spacing-2)',
            background: 'var(--color-semantic-background-secondary)',
            boxShadow: ctx.isSelected ? 'var(--shadow-glow-md)' : 'none',
          }}
        >
          <div
            style={{
              fontSize: 'var(--typography-font-size-text-xs)',
              color: 'var(--color-cga-amber-dim)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: 'var(--spacing-1)',
            }}
          >
            ★ MILESTONE
          </div>
          <div
            style={{
              fontSize: 'var(--typography-font-size-text-md)',
              color: 'var(--color-cga-amber)',
            }}
          >
            {entry.title}
          </div>
        </div>
      ) : (
        ctx.defaultRender()
      ),
  },
};

// ── Content-type variants (DMNC-877) ──────────────────────────────────────

export const TextEntries: Story = {
  args: {
    entries: [
      { id: 't1', date: '2024-03-01', title: 'Text entry one', kind: 'text', content: 'Inline body text that expands when selected.' },
      { id: 't2', date: '2024-03-02', title: 'Text entry two', kind: 'text', content: 'Second one.' },
    ],
    mode: 'static',
  },
};

export const ImageEntries: Story = {
  args: {
    entries: [
      {
        id: 'i1', date: '2024-03-01', title: 'Single image entry', kind: 'image',
        image: { src: 'https://placehold.co/800x600/000/ffb000?text=ONE', alt: 'One' },
      },
      {
        id: 'i2', date: '2024-03-02', title: 'Linked image entry', kind: 'image',
        image: { src: 'https://placehold.co/800x600/000/ffb000?text=TWO', alt: 'Two', link: 'https://example.com' },
      },
    ],
    mode: 'static',
  },
};

export const GalleryEntries: Story = {
  args: {
    entries: [
      {
        id: 'g1', date: '2024-03-01', title: 'Gallery entry', kind: 'gallery',
        images: [
          { src: 'https://placehold.co/800x600/000/ffb000?text=ONE',   alt: 'One',   caption: 'First' },
          { src: 'https://placehold.co/800x600/000/ffb000?text=TWO',   alt: 'Two' },
          { src: 'https://placehold.co/800x600/000/ffb000?text=THREE', alt: 'Three', caption: 'Third' },
          { src: 'https://placehold.co/800x600/000/ffb000?text=FOUR',  alt: 'Four' },
        ],
      },
    ],
    mode: 'static',
  },
};
