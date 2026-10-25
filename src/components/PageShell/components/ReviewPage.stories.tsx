import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PageShell } from './PageShell';
import { PageSection } from './PageSection';
import { Header } from '../../Header';
import { Bench } from '../../Bench';
import { Badge } from '../../Badge';
import { DosWindow } from '../../DosWindow';
import { Switch } from '../../Switch';
import { Footer } from '../../Footer';
import { LegalPage, ImpressumAddress, ImpressumContact, ImpressumLiabilityContent } from '../../LegalPage';
import { FixtureScreen } from '../../../fixtures/review';
import './ReviewPage.stories.css';

/**
 * Templates/ReviewPage: the "one block" review page (0.43), composed from
 * PageShell, a stacked Header with no rule, PageSection, Bench, Badge and
 * DosWindow. FIXTURE ONLY, illustrative: placeholder screens, no real
 * screenshots, no real project names.
 */
const meta = {
  title: 'Templates/ReviewPage',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A review page in one block: header, intro, sections and footer share one 1240px column ' +
          'and one left edge, with no header underline and no section dividers. The only lines are ' +
          'window frames, pane gaps and table row lines. FIXTURE ONLY, illustrative.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const navItems = [
  { label: 'overview', href: '#findings' },
  { label: 'surfaces', href: '#home' },
  { label: 'sign-off', href: '#signoff' },
];

type Tone = 'success' | 'warning' | 'default';
const findings: { tag: string; tone: Tone; title: string; body: string }[] = [
  { tag: 'fixed', tone: 'success', title: 'Light-mode cards were black boxes', body: 'Cards now read the semantic tokens, so the light theme puts them on the paper surface.' },
  { tag: 'fixed', tone: 'success', title: 'Two configs, wrong one active', body: 'One config remains, with the preset, so the 16px body floor applies site-wide.' },
  { tag: 'fixed', tone: 'success', title: 'Toggle label at 14px', body: 'The last small-text class on a public page now follows the body size.' },
  { tag: 'upstream', tone: 'warning', title: 'Viewer clips tall portraits', body: 'Visible on the phone bench below. Tracked upstream, not patched locally.' },
  { tag: 'checked', tone: 'default', title: 'Nothing more to adopt', body: 'No hand-rolled controls or dialog shells left on public pages.' },
];

const metrics: [string, string, string][] = [
  ['Breadcrumb font size', '12px', '16px'],
  ['Footer font size', '14px', '16px'],
  ['Smallest text in main', '12px', '16px'],
  ['Horizontal overflow at 390, 13 routes', 'none', 'none'],
  ['Tests / types / lint / build', '-', '132 pass / clean / 0 errors / exit 0'],
];

function ReviewPage() {
  return (
    <PageShell
      className="review-page"
      contentId="content"
      header={
        <Header
          brandName="EXAMPLE"
          items={navItems}
          layout="stacked"
          rule={false}
          sticky={false}
          skipLinkTarget="#content"
          end={<Switch aria-label="Light theme" />}
        />
      }
      intro={{
        eyebrow: 'Example · PR #00 · 0.41.0 → 0.42.0',
        title: 'Example 0.42 preview',
        lead:
          'Before is main, after is the PR branch with the review findings applied. Both are production ' +
          'builds at 390 and 1280 wide. Scroll inside each pane to see the full page. FIXTURE ONLY, illustrative.',
        meta: (
          <>
            <span>PR: <b>example/site #00</b></span>
            <span>Branch: <b>example/eidotter-0.42</b></span>
            <span>Captured: <b>2026-10-24 00:16</b></span>
          </>
        ),
        tocLabel: 'Sections',
        toc: [
          { href: '#findings', label: 'What changed' },
          { href: '#numbers', label: 'Measured' },
          { href: '#home', label: 'Home' },
          { href: '#signoff', label: 'Sign-off' },
        ],
      }}
      footer={<p className="review-fixture-note">FIXTURE ONLY, illustrative. Example content, no real project.</p>}
    >
      <PageSection id="findings" title="What changed on top of the PR">
        <div className="review-findings">
          {findings.map((f) => (
            <DosWindow key={f.title} className="review-finding">
              <Badge size="sm" variant={f.tone}>{f.tag}</Badge>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </DosWindow>
          ))}
        </div>
      </PageSection>

      <PageSection id="numbers" title="Measured, not eyeballed">
        <p className="review-fixture-note">Computed styles read from the running pages. Same values at 390 and 1280 unless noted.</p>
        <div className="review-table-wrap" tabIndex={0} role="region" aria-label="Measured values">
          <table className="review-table">
            <thead>
              <tr><th scope="col">Measure</th><th scope="col">Before</th><th scope="col">After</th></tr>
            </thead>
            <tbody>
              {metrics.map(([m, b, a]) => (
                <tr key={m}><td>{m}</td><td>{b}</td><td>{a}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      <PageSection id="home" title="Home">
        <Bench
          title="Home, retro, 1280"
          chips={<><Badge size="sm">retro</Badge><Badge size="sm">1280</Badge></>}
          note="Plain-text brand, uppercase nav, toggle in the end slot, monitor-black background."
          panes={[
            { label: 'Before', tone: 'before', content: <FixtureScreen kind="desktop" state="before" label="Example home page, 1280 wide, before" /> },
            { label: 'After', tone: 'after', content: <FixtureScreen kind="desktop" state="after" label="Example home page, 1280 wide, after" /> },
          ]}
        />
        <Bench
          title="Home, retro, 390"
          chips={<><Badge size="sm">retro</Badge><Badge size="sm">390</Badge><Badge size="sm" variant="warning">upstream</Badge></>}
          note="Brand, switch and MENU fit on one line; nothing truncates."
          panes={[
            { label: 'Before', tone: 'before', frame: 'phone', content: <FixtureScreen kind="phone" state="before" label="Example home page, 390 wide, before" /> },
            { label: 'After', tone: 'after', frame: 'phone', content: <FixtureScreen kind="phone" state="after" label="Example home page, 390 wide, after" /> },
          ]}
        />
      </PageSection>

      <PageSection id="signoff" title="Sign-off">
        <p>Things to decide before merge:</p>
        <ul className="review-signoff">
          <li><b>Header at 390.</b> The brand wraps instead of truncating; Mark-only is available.</li>
          <li><b>Viewer clip at 390.</b> Accept until the upstream fix ships, or hold the merge.</li>
          <li><b>Background.</b> Monitor-black replaces the old gradient. Keep or revert.</li>
          <li>Everything else: merge when the review is clean.</li>
        </ul>
      </PageSection>
    </PageShell>
  );
}

export const Desktop: Story = {
  name: 'Desktop 1280',
  render: () => <ReviewPage />,
  parameters: { viewport: { defaultViewport: 'desktop1024' } },
};

export const Phone: Story = {
  name: 'Phone 375',
  render: () => <ReviewPage />,
  parameters: { viewport: { defaultViewport: 'phone375' }, noOverflowAt: [320, 390] },
};

/**
 * A site page on PageShell with a lockup Header carrying an `end` slot, a
 * single-word brand, an embedded LegalPage and a Footer: the composition
 * that scrolled sideways at 320/390 in 0.43.0 (DMNC-1617). The test runner
 * asserts no horizontal overflow at 320 and 390. The page sets its own body
 * font (the DOS face here); PageShell inherits it and paints no ground.
 */
export const SitePageNarrow: Story = {
  name: 'Site page, embedded LegalPage (320/390)',
  render: () => (
    <PageShell
      className="review-page review-page--dos"
      contentId="impressum"
      header={
        <Header
          brandName="EXAMPLE.IO"
          items={navItems}
          layout="stacked"
          rule={false}
          sticky={false}
          skipLinkTarget="#impressum"
          end={<Switch aria-label="Light theme" />}
        />
      }
      footer={<Footer copyright="© 2026 Example" />}
    >
      <LegalPage embedded title="Impressum" date="Stand: Oktober 2026">
        <ImpressumAddress />
        <ImpressumContact email="hello@example.com" />
        <ImpressumLiabilityContent />
      </LegalPage>
    </PageShell>
  ),
  parameters: { viewport: { defaultViewport: 'phone375' }, noOverflowAt: [320, 390] },
};
