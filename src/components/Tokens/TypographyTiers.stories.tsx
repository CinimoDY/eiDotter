import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import '../../styles/tokens.css';
import '../../styles/fonts.css';
import '../../styles/dos-utilities.css';

const meta = {
  title: 'Design System/Typography — Two Tiers',
  parameters: {
    layout: 'fullscreen',
    a11y: { disable: true },
    docs: {
      description: {
        component:
          'Visual reference for the two-tier typography split introduced in DMNC-885 (v0.37.0). ' +
          '**Display tier** (dos-hero, dos-h1…h5, dos-label, dos-code) uses Perfect DOS VGA 437 — ' +
          'a pixel-perfect-vector single-weight font authentic to MS-DOS text mode. ' +
          '**Body tier** (dos-body, dos-body-lg, dos-caption, dos-micro) uses JetBrains Mono Nerd Font — ' +
          'a multi-weight monospace with Nerd Font glyph extensions (powerline, devicons, language logos) ' +
          'for terminal-aesthetic prose content alongside pixelarticons. ' +
          'Both fonts resolve through the `--typography-font-family-*` CSS custom properties and ' +
          'track the active theme automatically.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const DISPLAY_SAMPLES = [
  { cls: 'dos-hero',  label: '.dos-hero',  text: 'EIDOTTER', desc: 'display-2xl · 78px · Perfect DOS VGA 437' },
  { cls: 'dos-h1',   label: '.dos-h1',    text: 'H1 — DISPLAY XL', desc: 'display-xl · 66px' },
  { cls: 'dos-h2',   label: '.dos-h2',    text: 'H2 — DISPLAY LG', desc: 'display-lg · 56px' },
  { cls: 'dos-h3',   label: '.dos-h3',    text: 'H3 — DISPLAY MD', desc: 'display-md · 42px' },
  { cls: 'dos-h4',   label: '.dos-h4',    text: 'H4 — DISPLAY SM', desc: 'display-sm · 36px' },
  { cls: 'dos-h5',   label: '.dos-h5',    text: 'H5 — DISPLAY XS', desc: 'display-xs · 30px' },
  { cls: 'dos-label', label: '.dos-label', text: 'LABEL · ACCENT COLOR', desc: 'text-sm · uppercase · accent' },
  { cls: 'dos-code',  label: '.dos-code',  text: 'DIR /W *.EXE',   desc: 'text-sm · inline code' },
] as const;

const BODY_SAMPLES = [
  { cls: 'dos-body',    label: '.dos-body',    text: 'Body copy uses the body font tier (22px). JetBrains Mono Nerd Font provides a warm, readable monospace feel for prose content — distinct from the pixel-perfect display tier above.',  desc: 'text-md · 22px · weight 400' },
  { cls: 'dos-body-lg', label: '.dos-body-lg', text: 'Body-lg is slightly larger for introductory or lead-in paragraphs (24px). The body font supports real weights — use --typography-font-weight-body-semibold for emphasis.',  desc: 'text-lg · 24px · weight 400' },
  { cls: 'dos-caption', label: '.dos-caption', text: 'CAPTION · 20PX · UPPERCASE · MUTED', desc: 'text-sm · uppercase · muted' },
  { cls: 'dos-micro',   label: '.dos-micro',   text: 'micro · 18px · muted · timestamps and footnotes', desc: 'text-xs · muted' },
] as const;

type SampleRow = { cls: string; label: string; text: string; desc: string };

const Row: React.FC<{ sample: SampleRow; isCode?: boolean }> = ({ sample, isCode }) => {
  const Tag = isCode ? 'code' : 'p';
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '11rem 1fr',
        gap: '1.5rem',
        alignItems: 'baseline',
        padding: '0.75rem 0',
        borderBottom: '1px solid var(--color-semantic-border-default)',
      }}
    >
      <div>
        <code
          style={{
            fontFamily: 'var(--typography-font-family-primary), monospace',
            color: 'var(--color-semantic-text-accent)',
            fontSize: 'var(--typography-font-size-text-xs)',
            display: 'block',
          }}
        >
          {sample.label}
        </code>
        <span
          style={{
            fontFamily: 'var(--typography-font-family-body), monospace',
            color: 'var(--color-semantic-text-muted)',
            fontSize: '0.75rem',
            display: 'block',
            marginTop: '0.25rem',
          }}
        >
          {sample.desc}
        </span>
      </div>
      <Tag className={sample.cls} style={{ margin: 0 }}>
        {sample.text}
      </Tag>
    </div>
  );
};

const SectionHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <div style={{ padding: '1.5rem 0 0.75rem', borderTop: '2px solid var(--color-semantic-border-default)', marginTop: '1.5rem' }}>
    <p className="dos-label" style={{ margin: '0 0 0.25rem 0' }}>{title}</p>
    <p style={{
      fontFamily: 'var(--typography-font-family-body), monospace',
      color: 'var(--color-semantic-text-muted)',
      fontSize: 'var(--typography-font-size-text-xs)',
      margin: 0,
    }}>
      {subtitle}
    </p>
  </div>
);

export const TwoTiers: Story = {
  name: 'Two Tiers Side-by-Side',
  render: () => (
    <div className="dos-page" style={{ padding: '2rem', minHeight: '100vh' }}>
      <p className="dos-label" style={{ marginBottom: '0.25rem', color: 'var(--color-semantic-text-accent)' }}>
        EIDOTTER · TYPOGRAPHY · TWO TIERS · DMNC-885
      </p>
      <p style={{
        fontFamily: 'var(--typography-font-family-body), monospace',
        color: 'var(--color-semantic-text-muted)',
        fontSize: 'var(--typography-font-size-text-xs)',
        margin: '0 0 1rem 0',
      }}>
        Display: Perfect DOS VGA 437 (single-weight, pixel-perfect) · Body: JetBrains Mono Nerd Font (multi-weight + Nerd Font glyphs)
      </p>

      <SectionHeader
        title="DISPLAY TIER — PERFECT DOS VGA 437"
        subtitle="--typography-font-family-primary · font-dos · Single-weight (all 400) · pixel-perfect-vector TTF"
      />
      {DISPLAY_SAMPLES.map((s) => (
        <Row key={s.cls} sample={s} isCode={s.cls === 'dos-code'} />
      ))}

      <SectionHeader
        title="BODY TIER — JETBRAINS MONO NERD FONT"
        subtitle="--typography-font-family-body · font-dos-body · Multi-weight (400/500/600/700) · includes Nerd Font glyphs"
      />
      {BODY_SAMPLES.map((s) => (
        <Row key={s.cls} sample={s} />
      ))}
    </div>
  ),
};

export const NerdFontGlyphs: Story = {
  name: 'Nerd Font Glyphs (Body Tier)',
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates inline Nerd Font glyph rendering using the body tier. ' +
          'Glyphs from powerline, devicons, and octicons render inline alongside regular text. ' +
          'These are only available via the body font (JetBrains Mono Nerd Font) — the display font (Perfect DOS VGA 437) does not include them.',
      },
    },
  },
  render: () => (
    <div className="dos-page" style={{ padding: '2rem', minHeight: '100vh' }}>
      <p className="dos-label" style={{ margin: '0 0 1.5rem 0' }}>NERD FONT GLYPHS · BODY TIER</p>

      {[
        { label: 'Powerline', glyphs: '   ', note: 'Powerline separators' },
        { label: 'Git',       glyphs: '  ',        note: 'Branch, line, padlock' },
        { label: 'Folder',    glyphs: '  ',         note: 'Open/closed folder, open folder' },
        { label: 'File',      glyphs: '  ',         note: 'File, text file, file-alt' },
        { label: 'Terminal',  glyphs: '  ',         note: 'Prompt, terminal, nf-dev-terminal' },
      ].map(({ label, glyphs, note }) => (
        <div
          key={label}
          style={{
            display: 'grid',
            gridTemplateColumns: '8rem 8rem 1fr',
            gap: '1rem',
            alignItems: 'center',
            padding: '0.75rem 0',
            borderBottom: '1px solid var(--color-semantic-border-default)',
          }}
        >
          <code
            style={{
              fontFamily: 'var(--typography-font-family-primary), monospace',
              color: 'var(--color-semantic-text-accent)',
              fontSize: 'var(--typography-font-size-text-xs)',
            }}
          >
            {label}
          </code>
          <span
            className="dos-body"
            style={{
              color: 'var(--color-semantic-text-primary)',
              fontSize: '1.5rem',
              letterSpacing: '0.25em',
            }}
          >
            {glyphs}
          </span>
          <span
            style={{
              fontFamily: 'var(--typography-font-family-body), monospace',
              color: 'var(--color-semantic-text-muted)',
              fontSize: 'var(--typography-font-size-text-xs)',
            }}
          >
            {note}
          </span>
        </div>
      ))}

      <p
        style={{
          fontFamily: 'var(--typography-font-family-body), monospace',
          color: 'var(--color-semantic-text-muted)',
          fontSize: 'var(--typography-font-size-text-xs)',
          marginTop: '1.5rem',
        }}
      >
        Nerd Fonts v3.4.0 · JetBrains Mono Nerd Font · OFL-1.1
      </p>
    </div>
  ),
};

export const BodyWeights: Story = {
  name: 'Body Font Weights',
  parameters: {
    docs: {
      description: {
        story:
          'JetBrains Mono Nerd Font supports four weights. ' +
          'Use the `--typography-font-weight-body-*` CSS custom properties or the `dos-body-*` Tailwind font-weight utilities.',
      },
    },
  },
  render: () => (
    <div className="dos-page" style={{ padding: '2rem', minHeight: '100vh' }}>
      <p className="dos-label" style={{ margin: '0 0 1.5rem 0' }}>BODY FONT WEIGHTS · JETBRAINS MONO NERD FONT</p>
      {[
        { name: 'body-regular',  weight: 'var(--typography-font-weight-body-regular)',  value: '400', label: '--typography-font-weight-body-regular' },
        { name: 'body-medium',   weight: 'var(--typography-font-weight-body-medium)',   value: '500', label: '--typography-font-weight-body-medium' },
        { name: 'body-semibold', weight: 'var(--typography-font-weight-body-semibold)', value: '600', label: '--typography-font-weight-body-semibold' },
        { name: 'body-bold',     weight: 'var(--typography-font-weight-body-bold)',     value: '700', label: '--typography-font-weight-body-bold' },
      ].map(({ name, weight, value, label }) => (
        <div
          key={name}
          style={{
            display: 'grid',
            gridTemplateColumns: '14rem 1fr',
            gap: '1rem',
            alignItems: 'baseline',
            padding: '0.75rem 0',
            borderBottom: '1px solid var(--color-semantic-border-default)',
          }}
        >
          <div>
            <code
              style={{
                fontFamily: 'var(--typography-font-family-primary), monospace',
                color: 'var(--color-semantic-text-accent)',
                fontSize: 'var(--typography-font-size-text-xs)',
                display: 'block',
              }}
            >
              {label}
            </code>
            <span
              style={{
                fontFamily: 'var(--typography-font-family-body), monospace',
                color: 'var(--color-semantic-text-muted)',
                fontSize: '0.75rem',
              }}
            >
              weight {value}
            </span>
          </div>
          <p
            className="dos-body"
            style={{ margin: 0, fontWeight: weight }}
          >
            The quick brown fox jumps over the lazy DOS prompt. {value}
          </p>
        </div>
      ))}
    </div>
  ),
};
