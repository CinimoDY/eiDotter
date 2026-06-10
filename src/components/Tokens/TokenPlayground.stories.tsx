import React, { useState, useEffect, useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useControls, folder, Leva } from 'leva';
import '../../styles/tokens.css';
import { Button } from '../Button';
import { Card } from '../Card';
import { Alert } from '../Alert';
import { Badge } from '../Badge';
import { Input } from '../Input';
import { Progress } from '../Progress';
import { Checkbox } from '../Checkbox';
import { Switch } from '../Switch';
import { Tabs } from '../Tabs';

const meta = {
  title: 'Design System/Token Playground',
  parameters: {
    layout: 'fullscreen',
    // Deliberately renders the full palette incl. low-contrast entries — excluded from the axe CI gate (DMNC-1011, per the 2026-05-05 baseline's noise filter).
    a11y: { disable: true },
    backgrounds: {
      default: 'dos',
      values: [{ name: 'dos', value: '#020003' }],
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

/** Token names that use `ms` units instead of `px` */
const MS_TOKENS = new Set([
  '--duration-fast',
  '--duration-normal',
  '--duration-slow',
]);

/**
 * Creates a Leva color input with per-input onChange that sets CSS
 * custom properties directly on :root, bypassing React re-renders.
 * Leva sets `transient: true` by default when onChange is provided.
 */
function tokenColor(defaultValue: string, appliedKeys: Set<string>) {
  return {
    value: defaultValue,
    onChange: (value: string, path: string) => {
      const key = path.split('.').pop() || path;
      document.documentElement.style.setProperty(key, value);
      appliedKeys.add(key);
    },
  };
}

/**
 * Creates a Leva numeric input with per-input onChange.
 * Appends 'ms' for duration tokens, 'px' for everything else.
 */
function tokenNumber(
  defaultValue: number,
  options: { min: number; max: number; step: number },
  appliedKeys: Set<string>,
) {
  return {
    value: defaultValue,
    ...options,
    onChange: (value: number, path: string) => {
      const key = path.split('.').pop() || path;
      const unit = MS_TOKENS.has(key) ? 'ms' : 'px';
      document.documentElement.style.setProperty(key, `${value}${unit}`);
      appliedKeys.add(key);
    },
  };
}

/* -------------------------------------------------------------------------- */
/*  Component Showcase (renders inside the playground)                        */
/* -------------------------------------------------------------------------- */

const sectionHeadingStyle: React.CSSProperties = {
  color: 'var(--color-cga-amber)',
  fontFamily: 'var(--typography-font-family-primary)',
  fontSize: '14px',
  textTransform: 'uppercase',
  marginBottom: '12px',
};

function ShowcaseSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 style={sectionHeadingStyle}>{title}</h3>
      {children}
    </section>
  );
}

function ComponentShowcase() {
  const [activeTab, setActiveTab] = useState('schedule');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <ShowcaseSection title="Buttons">
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Cards">
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ width: '220px' }}>
            <Card variant="default" title="Default Card">
              Content with tokens
            </Card>
          </div>
          <div style={{ width: '220px' }}>
            <Card variant="elevated" title="Elevated">
              Hover for glow
            </Card>
          </div>
          <div style={{ width: '220px' }}>
            <Card variant="glow" title="Glow Card">
              Phosphor effect
            </Card>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Form Controls">
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Input placeholder="Type here..." />
          <Checkbox label="Enable feature" />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Switch />
            <span style={{ color: 'var(--color-cga-light-gray)', fontSize: '14px' }}>Dark mode</span>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Indicators">
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Badge variant="default">Default</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
        </div>
        <div style={{ marginTop: '12px', maxWidth: '400px' }}>
          <Progress value={65} size="medium" showLabel />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Alert">
        <Alert
          type="info"
          title="System Notification"
          onClose={() => {}}
        >
          Token changes apply live to all components.
        </Alert>
      </ShowcaseSection>

      <ShowcaseSection title="Tabs">
        <Tabs
          tabs={[
            { id: 'schedule', label: 'Schedule' },
            { id: 'console', label: 'AI Console' },
            { id: 'settings', label: 'Settings' },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          variant="underline"
        />
      </ShowcaseSection>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Token Playground Story                                                    */
/* -------------------------------------------------------------------------- */

function TokenPlayground() {
  // Track which CSS properties we've set, for cleanup on unmount
  const appliedKeysRef = useRef(new Set<string>());
  const keys = appliedKeysRef.current;

  useControls('Colors', {
    'Amber Accent': folder({
      '--color-cga-amber': tokenColor('#ffb000', keys),
      '--color-cga-amber-bright': tokenColor('#fdca9f', keys),
      '--color-cga-amber-dim': tokenColor('#9a5700', keys),
    }),
    'Text Colors': folder({
      '--color-cga-light-gray': tokenColor('#b87c1a', keys),
      '--color-cga-yellow': tokenColor('#e5b936', keys),
      '--color-cga-brown': tokenColor('#5f340e', keys),
    }),
    'Background': folder({
      '--color-cga-black': tokenColor('#020003', keys),
      '--color-cga-dark-gray': tokenColor('#010103', keys),
    }),
  });

  useControls('Spacing', {
    '--spacing-1': tokenNumber(4, { min: 0, max: 16, step: 1 }, keys),
    '--spacing-2': tokenNumber(8, { min: 0, max: 24, step: 1 }, keys),
    '--spacing-3': tokenNumber(12, { min: 0, max: 32, step: 1 }, keys),
    '--spacing-4': tokenNumber(16, { min: 0, max: 48, step: 1 }, keys),
  });

  useControls('Borders', {
    '--border-width-thin': tokenNumber(1, { min: 0, max: 4, step: 0.5 }, keys),
    '--border-width-medium': tokenNumber(2, { min: 0, max: 6, step: 0.5 }, keys),
  });

  useControls('Animation', {
    '--duration-fast': tokenNumber(100, { min: 0, max: 500, step: 10 }, keys),
    '--duration-normal': tokenNumber(200, { min: 0, max: 800, step: 10 }, keys),
    '--duration-slow': tokenNumber(400, { min: 0, max: 1200, step: 10 }, keys),
  });

  useControls('CRT Effects', {
    '--effects-phosphor-glow': tokenColor('rgba(255, 176, 0, 0.12)', keys),
    '--effects-scanline-light': tokenColor('rgba(255, 176, 0, 0.05)', keys),
    '--effects-crt-background': tokenColor('#060300', keys),
  });

  // Clean up CSS custom properties on unmount
  useEffect(() => {
    const keys = appliedKeysRef.current;
    return () => {
      const root = document.documentElement;
      for (const key of keys) {
        root.style.removeProperty(key);
      }
    };
  }, []);

  return (
    <div style={{
      padding: '32px',
      minHeight: '100vh',
      backgroundColor: 'var(--color-cga-black)',
      fontFamily: 'var(--typography-font-family-primary)',
    }}>
      <Leva
        collapsed={false}
        oneLineLabels
        titleBar={{ title: 'eiDotter Token Lab' }}
      />
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{
          marginBottom: '24px',
          paddingBottom: '16px',
          borderBottom: '1px solid var(--color-cga-dark-gray)',
        }}>
          <h2 style={{
            color: 'var(--color-cga-amber)',
            fontSize: '20px',
            fontWeight: 400,
            margin: 0,
          }}>
            TOKEN PLAYGROUND
          </h2>
          <p style={{
            color: 'var(--color-cga-brown)',
            fontSize: '13px',
            margin: '8px 0 0 0',
          }}>
            Tweak design tokens in the Leva panel (top right) and see all components update live.
          </p>
          <p style={{
            color: 'var(--color-cga-brown)',
            fontSize: '11px',
            margin: '6px 0 0 0',
            opacity: 0.7,
          }}>
            Semantic tokens reference primitives via var() &mdash; changing a primitive here
            cascades to all components that consume the corresponding semantic token.
          </p>
        </div>
        <ComponentShowcase />
      </div>
    </div>
  );
}

export const Playground: Story = {
  render: () => <TokenPlayground />,
};
