import React, { useEffect, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Connector, type ConnectorTarget } from './Connector';
import { Header } from '../../Header';
import { Mark } from '../../Brand';
import { TimelinePage } from '../../TimelinePage';
import type { TimelineEntryData } from '../../TimelineContainer';

/**
 * The DMNC-1388 vision end-to-end: the Mark branches tapered amber→category
 * ribbons to the Header's category badges (anchored off the stable
 * `.eidotter-header__category` measurement contract), and the SAME category
 * taxonomy steers a blog TimelinePage below — "navigation becomes a course
 * through time". Choosing a category lights the matching Header badge
 * (`activeHref`) and culls the timeline.
 */
const meta: Meta = {
  title: 'Patterns/Nav as Course',
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dos', values: [{ name: 'dos', value: '#000000' }] },
  },
};

export default meta;
type Story = StoryObj;

const CAT_COLOR: Record<string, string> = {
  work: '#FFB000',
  ideas: '#55FFFF',
  life: '#55FF55',
  log: '#FF55FF',
};

const headerCategories = [
  { key: 'work', label: 'work', icon: 'App', href: '/work' },
  { key: 'ideas', label: 'ideas', icon: 'Info', href: '/ideas' },
  { key: 'life', label: 'life', icon: 'Check', href: '/life' },
  { key: 'log', label: 'log', icon: 'Add', href: '/log' },
];

const timelineCategories = [
  { key: 'work', label: 'work', color: CAT_COLOR.work },
  { key: 'ideas', label: 'ideas', color: CAT_COLOR.ideas },
  { key: 'life', label: 'life', color: CAT_COLOR.life },
  { key: 'log', label: 'log', color: CAT_COLOR.log },
];

const entries: TimelineEntryData[] = [
  { id: '1', kind: 'article', date: '2026-07-12', title: 'Connector system converges on the runny yolk', summary: 'Two keeper layouts fall out of the Figma pass.', tags: ['work'], href: '/log/connector' },
  { id: '2', kind: 'article', date: '2026-06-30', title: 'TimelineContainer grows an article entry kind', summary: 'The devlog surface the blog rides on.', tags: ['work'], href: '/log/article-kind' },
  { id: '3', kind: 'article', date: '2026-06-12', title: 'Sketching the nav-as-course model', summary: 'Navigation becomes a course through time, not a menu.', tags: ['ideas'] },
  { id: '4', kind: 'text', date: '2026-05-20', title: 'A quiet reset weekend', tags: ['life'] },
  { id: '5', kind: 'article', date: '2026-05-05', title: 'Accessibility baseline, WCAG 2.1 AA', summary: 'The gate every new component clears.', tags: ['log'] },
];

const navItems = [
  { label: 'home', href: '/' },
  { label: 'about', href: '/about' },
];

function NavAsCourseDemo() {
  const headerWrapRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const [targets, setTargets] = useState<ConnectorTarget[]>([]);

  // A consumer queries the DMNC-1326 measurement contract to build the
  // Connector's anchors — the Header renders the badge row internally.
  useEffect(() => {
    const scope = headerWrapRef.current;
    if (!scope) return;
    const els = Array.from(scope.querySelectorAll<HTMLElement>('.eidotter-header__category'));
    setTargets(
      els.map((el) => {
        const key = el.closest('[data-category-key]')?.getAttribute('data-category-key') ?? '';
        return { ref: { current: el }, color: CAT_COLOR[key] };
      }),
    );
  }, []);

  return (
    <div style={{ background: '#000', minHeight: '100vh' }}>
      <div ref={headerWrapRef} style={{ position: 'relative' }}>
        <Header
          brandName="eiDotter"
          items={navItems}
          context={{ categories: headerCategories }}
          activeHref={active ? `/${active}` : undefined}
          sticky={false}
        >
          <Mark ref={markRef} size={34} label="eiDotter" />
        </Header>
        <Connector sourceRef={markRef} targets={targets} />
      </div>

      <div style={{ padding: 40 }}>
        <TimelinePage
          entries={entries}
          categories={timelineCategories}
          activeCategory={active}
          onCategoryChange={setActive}
        />
      </div>
    </div>
  );
}

export const NavAsCourse: Story = {
  render: () => <NavAsCourseDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'The Mark branches tapered amber→category ribbons to the Header category badges (anchored ' +
          'off the `.eidotter-header__category` contract), and the category filter steers the blog ' +
          'timeline below — choosing a category lights the matching Header badge and culls the list.',
      },
    },
  },
};
