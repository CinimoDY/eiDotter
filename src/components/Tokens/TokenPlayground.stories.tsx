import React, { useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useControls, folder, Leva } from 'leva';
import '../../styles/tokens.css';
import { Button } from '../Button/components/Button';
import { Card } from '../Card/components/Card';
import { Alert } from '../Alert/components/Alert';
import { Badge } from '../Badge/components/Badge';
import { Input } from '../Input/components/Input';
import { Progress } from '../Progress/components/Progress';
import { Checkbox } from '../Checkbox/components/Checkbox';
import { Switch } from '../Switch/components/Switch';
import { Tabs } from '../Tabs/components/Tabs';

const meta = {
  title: 'Design System/Token Playground',
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dos',
      values: [{ name: 'dos', value: '#020003' }],
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

/**
 * Syncs Leva control values to CSS custom properties on :root
 */
function useTokenSync(tokens: Record<string, string | number>) {
  useEffect(() => {
    const root = document.documentElement;
    for (const [key, value] of Object.entries(tokens)) {
      if (typeof value === 'string') {
        root.style.setProperty(key, value);
      } else if (typeof value === 'number') {
        root.style.setProperty(key, `${value}px`);
      }
    }
    return () => {
      // Reset on unmount
      for (const key of Object.keys(tokens)) {
        root.style.removeProperty(key);
      }
    };
  }, [tokens]);
}

/* -------------------------------------------------------------------------- */
/*  Component Showcase (renders inside the playground)                        */
/* -------------------------------------------------------------------------- */

function ComponentShowcase() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Buttons */}
      <section>
        <h3 style={{
          color: 'var(--color-cga-amber)',
          fontFamily: 'var(--typography-font-family-primary)',
          fontSize: '14px',
          textTransform: 'uppercase',
          marginBottom: '12px',
        }}>
          Buttons
        </h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
      </section>

      {/* Card */}
      <section>
        <h3 style={{
          color: 'var(--color-cga-amber)',
          fontFamily: 'var(--typography-font-family-primary)',
          fontSize: '14px',
          textTransform: 'uppercase',
          marginBottom: '12px',
        }}>
          Cards
        </h3>
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
      </section>

      {/* Inputs */}
      <section>
        <h3 style={{
          color: 'var(--color-cga-amber)',
          fontFamily: 'var(--typography-font-family-primary)',
          fontSize: '14px',
          textTransform: 'uppercase',
          marginBottom: '12px',
        }}>
          Form Controls
        </h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Input placeholder="Type here..." />
          <Checkbox label="Enable feature" />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Switch />
            <span style={{ color: 'var(--color-cga-light-gray)', fontSize: '14px' }}>Dark mode</span>
          </div>
        </div>
      </section>

      {/* Badges & Progress */}
      <section>
        <h3 style={{
          color: 'var(--color-cga-amber)',
          fontFamily: 'var(--typography-font-family-primary)',
          fontSize: '14px',
          textTransform: 'uppercase',
          marginBottom: '12px',
        }}>
          Indicators
        </h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Badge variant="default">Default</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
        </div>
        <div style={{ marginTop: '12px', maxWidth: '400px' }}>
          <Progress value={65} size="medium" showLabel />
        </div>
      </section>

      {/* Alert */}
      <section>
        <h3 style={{
          color: 'var(--color-cga-amber)',
          fontFamily: 'var(--typography-font-family-primary)',
          fontSize: '14px',
          textTransform: 'uppercase',
          marginBottom: '12px',
        }}>
          Alert
        </h3>
        <Alert
          type="info"
          title="System Notification"
          onClose={() => {}}
        >
          Token changes apply live to all components.
        </Alert>
      </section>

      {/* Tabs */}
      <section>
        <h3 style={{
          color: 'var(--color-cga-amber)',
          fontFamily: 'var(--typography-font-family-primary)',
          fontSize: '14px',
          textTransform: 'uppercase',
          marginBottom: '12px',
        }}>
          Tabs
        </h3>
        <Tabs
          tabs={[
            { id: 'schedule', label: 'Schedule' },
            { id: 'console', label: 'AI Console' },
            { id: 'settings', label: 'Settings' },
          ]}
          activeTab="schedule"
          variant="underline"
        />
      </section>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Token Playground Story                                                    */
/* -------------------------------------------------------------------------- */

function TokenPlayground() {
  const colors = useControls('Colors', {
    'Amber Accent': folder({
      '--color-cga-amber': '#ffb000',
      '--color-cga-amber-bright': '#fdca9f',
      '--color-cga-amber-dim': '#9a5700',
    }),
    'Text Colors': folder({
      '--color-cga-light-gray': '#b87c1a',
      '--color-cga-yellow': '#e5b936',
      '--color-cga-brown': '#5f340e',
    }),
    'Background': folder({
      '--color-cga-black': '#020003',
      '--color-cga-dark-gray': '#010103',
    }),
  });

  const spacing = useControls('Spacing', {
    '--spacing-1': { value: 4, min: 0, max: 16, step: 1 },
    '--spacing-2': { value: 8, min: 0, max: 24, step: 1 },
    '--spacing-3': { value: 12, min: 0, max: 32, step: 1 },
    '--spacing-4': { value: 16, min: 0, max: 48, step: 1 },
  });

  const borders = useControls('Borders', {
    '--border-width-thin': { value: 1, min: 0, max: 4, step: 0.5 },
    '--border-width-medium': { value: 2, min: 0, max: 6, step: 0.5 },
    '--border-radius-sm': { value: 2, min: 0, max: 8, step: 1 },
    '--border-radius-base': { value: 4, min: 0, max: 12, step: 1 },
  });

  const animation = useControls('Animation', {
    '--duration-fast': { value: 100, min: 0, max: 500, step: 10 },
    '--duration-normal': { value: 200, min: 0, max: 800, step: 10 },
    '--duration-slow': { value: 400, min: 0, max: 1200, step: 10 },
  });

  const effects = useControls('CRT Effects', {
    '--effects-phosphor-glow': 'rgba(255, 176, 0, 0.12)',
    '--effects-scanline-light': 'rgba(255, 176, 0, 0.05)',
    '--effects-crt-background': '#060300',
  });

  // Merge all token groups
  const allTokens: Record<string, string | number> = {
    ...colors,
    ...spacing,
    ...borders,
    ...animation,
    ...effects,
  };

  // Sync to CSS custom properties
  useTokenSync(allTokens);

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
        </div>
        <ComponentShowcase />
      </div>
    </div>
  );
}

export const Playground: Story = {
  render: () => <TokenPlayground />,
};
