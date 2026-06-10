import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import '../../styles/tokens.css';
import '../../styles/dos-utilities.css';

const meta = {
  title: 'Design System/DOS Utilities',
  parameters: {
    layout: 'fullscreen',
    // Deliberately renders the full palette incl. low-contrast entries — excluded from the axe CI gate (DMNC-1011, per the 2026-05-05 baseline's noise filter).
    a11y: { disable: true },
    docs: {
      description: {
        component:
          'Visual reference for the 12 `.dos-*` classes shipped via the opt-in `eidotter/utilities` subpath (added in v0.19.4). ' +
          'All classes resolve through the semantic + primitive design tokens, so they track the active theme automatically. ' +
          'This story exists primarily as a visual regression baseline: a token rename that breaks any utility will show up here before it ships.',
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

const allClasses = [
  'dos-hero',
  'dos-h1',
  'dos-h2',
  'dos-h3',
  'dos-h4',
  'dos-h5',
  'dos-body',
  'dos-body-lg',
  'dos-caption',
  'dos-micro',
  'dos-label',
  'dos-code',
] as const;

const SAMPLE_TEXT: Record<(typeof allClasses)[number], React.ReactNode> = {
  'dos-hero': 'EIDOTTER',
  'dos-h1': 'H1 — DISPLAY XL',
  'dos-h2': 'H2 — DISPLAY LG',
  'dos-h3': 'H3 — DISPLAY MD',
  'dos-h4': 'H4 — DISPLAY SM',
  'dos-h5': 'H5 — DISPLAY XS',
  'dos-body':
    'Body copy uses `--typography-font-size-text-md` (22px). Scoped for paragraph text in prose and MDX surfaces.',
  'dos-body-lg':
    'Body-lg uses `--typography-font-size-text-lg` (24px). Slightly larger for introductory or lead-in paragraphs.',
  'dos-caption': 'CAPTION · 20PX · UPPERCASE',
  'dos-micro': 'micro · 18px · muted · timestamps and footnotes',
  'dos-label': 'LABEL · ACCENT COLOR',
  'dos-code': 'DIR /W *.EXE',
};

const CLASS_ELEMENT: Record<(typeof allClasses)[number], 'p' | 'code' | 'span'> = {
  'dos-hero': 'p',
  'dos-h1': 'p',
  'dos-h2': 'p',
  'dos-h3': 'p',
  'dos-h4': 'p',
  'dos-h5': 'p',
  'dos-body': 'p',
  'dos-body-lg': 'p',
  'dos-caption': 'p',
  'dos-micro': 'p',
  'dos-label': 'p',
  'dos-code': 'code',
};

const UtilityRow: React.FC<{ className: (typeof allClasses)[number] }> = ({
  className,
}) => {
  const Element = CLASS_ELEMENT[className];
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '12rem 1fr',
        gap: '1rem',
        alignItems: 'baseline',
        padding: '0.75rem 0',
        borderBottom: '1px solid var(--color-semantic-border-default)',
      }}
    >
      <code
        style={{
          fontFamily: 'var(--typography-font-family-primary), monospace',
          color: 'var(--color-semantic-text-muted)',
          fontSize: 'var(--typography-font-size-text-sm)',
        }}
      >
        .{className}
      </code>
      <Element className={className} style={{ margin: 0 }}>
        {SAMPLE_TEXT[className]}
      </Element>
    </div>
  );
};

export const AllUtilities: Story = {
  render: () => (
    <div
      className="dos-page"
      style={{ padding: '2rem', minHeight: '100vh' }}
    >
      <p
        className="dos-label"
        style={{ marginBottom: '1rem', color: 'var(--color-semantic-text-accent)' }}
      >
        EIDOTTER · UTILITIES · AMBER-MONO
      </p>
      {allClasses.map((cls) => (
        <UtilityRow key={cls} className={cls} />
      ))}
      <div
        className="dos-scanlines"
        style={{
          marginTop: '2rem',
          height: '120px',
          border: '1px solid var(--color-semantic-border-default)',
          padding: '1rem',
          color: 'var(--color-semantic-text-primary)',
        }}
      >
        <code style={{ fontFamily: 'var(--typography-font-family-primary), monospace' }}>
          .dos-scanlines — CRT overlay effect. Expects a dark parent surface.
        </code>
      </div>
    </div>
  ),
};

const themes = ['amber-mono', 'cga-amber', 'cga-mode4-p0', 'cga-mode4-p1', 'cga-mode5'] as const;

const ThemeSample: React.FC<{ theme: (typeof themes)[number] }> = ({ theme }) => (
  <div
    data-theme={theme}
    className="dos-page"
    style={{
      padding: '1.5rem',
      border: '1px solid var(--color-semantic-border-default)',
    }}
  >
    <p className="dos-label" style={{ margin: '0 0 1rem 0' }}>
      {theme.toUpperCase()}
    </p>
    <p className="dos-h2" style={{ margin: '0 0 0.5rem 0' }}>
      HEADING
    </p>
    <p className="dos-body" style={{ margin: '0 0 0.5rem 0' }}>
      Body renders through semantic tokens. A theme switch changes the colour here.
    </p>
    <p className="dos-caption" style={{ margin: '0 0 0.5rem 0' }}>
      CAPTION · MUTED COLOUR
    </p>
    <code className="dos-code">DIR /W</code>
  </div>
);

export const ThemeGallery: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Same four utility classes rendered under each of the five shipped themes. Useful as a visual regression diff when touching tokens or the utilities sheet.',
      },
    },
  },
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1rem',
        padding: '2rem',
        backgroundColor: 'var(--color-semantic-background-primary)',
        minHeight: '100vh',
      }}
    >
      {themes.map((t) => (
        <ThemeSample key={t} theme={t} />
      ))}
    </div>
  ),
};
