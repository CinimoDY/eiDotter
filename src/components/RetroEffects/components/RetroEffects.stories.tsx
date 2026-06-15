import type { Meta, StoryObj } from '@storybook/react-vite';
import { RetroEffects } from './RetroEffects';
import React from 'react';
import { Button } from '@/components/Button';
import { componentRegistry } from '@/components/registry';

const meta: Meta<typeof RetroEffects> = {
  title: 'Components/RetroEffects',
  component: RetroEffects,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dos-amber',
    },
    projectMeta: componentRegistry['RetroEffects'],
  },
  tags: ['autodocs'],
  argTypes: {
    scanlines: {
      control: 'boolean',
      description: 'Enable scanline overlay effect',
    },
    glow: {
      control: 'boolean',
      description: 'Enable glow vignette effect',
    },
    flicker: {
      control: 'boolean',
      description: 'Enable CRT flicker effect',
    },
    bloom: {
      control: 'boolean',
      description: 'Enable phosphor bloom/bleeding effect (opt-in for performance)',
    },
    powered: {
      control: 'boolean',
      description: 'Whether the CRT is powered on. Animates on/off transitions.',
    },
    intensity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Intensity of the effects (0-1)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const DemoContent = () => (
  <div style={{
    padding: '32px',
    fontFamily: 'var(--typography-font-family-primary)',
    color: 'var(--color-semantic-text-primary)',
  }}>
    <h1 style={{ color: 'var(--color-cga-amber)', marginBottom: '16px' }}>
      C:\&gt; RETRO EFFECTS DEMO
    </h1>
    <div style={{
      border: '2px solid var(--color-semantic-border-default)',
      padding: '16px',
      marginBottom: '16px',
    }}>
      <p style={{ marginBottom: '8px' }}>
        This component adds authentic CRT monitor effects to create
        the DOS terminal aesthetic.
      </p>
      <p style={{ color: 'var(--color-cga-amber)' }}>
        Effects include scanlines, phosphor glow, and subtle flicker.
      </p>
    </div>
    <p style={{ color: 'var(--color-semantic-text-disabled)' }}>
      Press any key to continue...
    </p>
  </div>
);

export const Default: Story = {
  args: {
    scanlines: true,
    glow: true,
    flicker: true,
    intensity: 1,
  },
  render: (args) => (
    <>
      <DemoContent />
      <RetroEffects {...args} />
    </>
  ),
};

export const ScanlinesOnly: Story = {
  args: {
    scanlines: true,
    glow: false,
    flicker: false,
    intensity: 1,
  },
  render: (args) => (
    <>
      <DemoContent />
      <RetroEffects {...args} />
    </>
  ),
};

export const GlowOnly: Story = {
  args: {
    scanlines: false,
    glow: true,
    flicker: false,
    intensity: 1,
  },
  render: (args) => (
    <>
      <DemoContent />
      <RetroEffects {...args} />
    </>
  ),
};

export const SubtleEffects: Story = {
  args: {
    scanlines: true,
    glow: true,
    flicker: true,
    intensity: 0.5,
  },
  render: (args) => (
    <>
      <DemoContent />
      <RetroEffects {...args} />
    </>
  ),
};

export const IntenseEffects: Story = {
  args: {
    scanlines: true,
    glow: true,
    flicker: true,
    intensity: 1,
  },
  render: (args) => (
    <>
      <DemoContent />
      <RetroEffects {...args} />
    </>
  ),
};

export const NoEffects: Story = {
  args: {
    scanlines: false,
    glow: false,
    flicker: false,
    intensity: 1,
  },
  render: (args) => (
    <>
      <DemoContent />
      <RetroEffects {...args} />
    </>
  ),
};

export const WithBloom: Story = {
  args: {
    scanlines: true,
    glow: true,
    flicker: true,
    bloom: true,
    intensity: 1,
  },
  render: (args) => (
    <>
      <DemoContent />
      <RetroEffects {...args} />
    </>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Phosphor bloom effect creates a soft glow around lit pixels, simulating the halation and electron beam spreading of real CRT monitors.',
      },
    },
  },
};

const PowerCycleDemo = () => {
  const [powered, setPowered] = React.useState(true);

  return (
    <>
      <div style={{
        padding: '32px',
        fontFamily: 'var(--typography-font-family-primary)',
        color: 'var(--color-semantic-text-primary)',
      }}>
        <h1 style={{ color: 'var(--color-cga-amber)', marginBottom: '16px' }}>
          C:\&gt; POWER CYCLE DEMO
        </h1>
        <div style={{
          border: '2px solid var(--color-semantic-border-default)',
          padding: '16px',
          marginBottom: '16px',
        }}>
          <p style={{ marginBottom: '16px' }}>
            Click the button to toggle the CRT power state.
          </p>
          <button
            onClick={() => setPowered(!powered)}
            style={{
              padding: '8px 16px',
              fontFamily: 'var(--typography-font-family-primary)',
              fontSize: '14px',
              color: powered ? 'var(--color-cga-black)' : 'var(--color-cga-amber)',
              backgroundColor: powered ? 'var(--color-cga-amber)' : 'transparent',
              border: '2px solid var(--color-cga-amber)',
              cursor: 'pointer',
            }}
          >
            {powered ? 'POWER OFF' : 'POWER ON'}
          </button>
          <p style={{
            marginTop: '16px',
            color: 'var(--color-semantic-text-disabled)',
          }}>
            Status: {powered ? 'ON' : 'OFF'}
          </p>
        </div>
      </div>
      <RetroEffects
        scanlines
        glow
        flicker
        bloom
        powered={powered}
      />
    </>
  );
};

export const PowerCycle: Story = {
  render: () => <PowerCycleDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo of the CRT power on/off animations. The power-off animation collapses the screen to a horizontal line (like a real CRT), while power-on expands from the line.',
      },
    },
  },
};

export const PoweredOff: Story = {
  args: {
    scanlines: true,
    glow: true,
    flicker: true,
    powered: false,
    intensity: 1,
  },
  render: (args) => (
    <>
      <DemoContent />
      <RetroEffects {...args} />
    </>
  ),
  parameters: {
    docs: {
      description: {
        story: 'CRT in powered-off state. No effects are visible.',
      },
    },
  },
};

const CallbacksDemo = () => {
  const [powered, setPowered] = React.useState(true);
  const [log, setLog] = React.useState<string[]>([]);

  const addLog = (message: string) => {
    setLog(prev => [...prev.slice(-4), `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  return (
    <>
      <div style={{
        padding: '32px',
        fontFamily: 'var(--typography-font-family-primary)',
        color: 'var(--color-semantic-text-primary)',
      }}>
        <h1 style={{ color: 'var(--color-cga-amber)', marginBottom: '16px' }}>
          C:\&gt; POWER CALLBACKS DEMO
        </h1>
        <div style={{
          border: '2px solid var(--color-semantic-border-default)',
          padding: '16px',
          marginBottom: '16px',
        }}>
          <p style={{ marginBottom: '16px' }}>
            Toggle power and watch the callback log below.
          </p>
          <button
            onClick={() => setPowered(!powered)}
            style={{
              padding: '8px 16px',
              fontFamily: 'var(--typography-font-family-primary)',
              fontSize: '14px',
              color: powered ? 'var(--color-cga-black)' : 'var(--color-cga-amber)',
              backgroundColor: powered ? 'var(--color-cga-amber)' : 'transparent',
              border: '2px solid var(--color-cga-amber)',
              cursor: 'pointer',
            }}
          >
            {powered ? 'POWER OFF' : 'POWER ON'}
          </button>
        </div>
        <div style={{
          border: '2px solid var(--color-semantic-border-default)',
          padding: '16px',
          minHeight: '120px',
        }}>
          <p style={{ color: 'var(--color-cga-amber)', marginBottom: '8px' }}>
            Callback Log:
          </p>
          {log.length === 0 ? (
            <p style={{ color: 'var(--color-semantic-text-disabled)' }}>
              No events yet. Toggle power to see callbacks.
            </p>
          ) : (
            log.map((entry, i) => (
              <p key={i} style={{ margin: '4px 0', fontSize: '14px' }}>{entry}</p>
            ))
          )}
        </div>
      </div>
      <RetroEffects
        scanlines
        glow
        flicker
        bloom
        powered={powered}
        onPowerStateChange={(state) => addLog(`onPowerStateChange: ${state}`)}
        onPowerOn={() => addLog('onPowerOn: animation complete')}
        onPowerOff={() => addLog('onPowerOff: animation complete')}
      />
    </>
  );
};

export const WithCallbacks: Story = {
  render: () => <CallbacksDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the power state callbacks. `onPowerStateChange` fires for all 4 states (on, powering-on, powering-off, off), while `onPowerOn` and `onPowerOff` fire only when animations complete.',
      },
    },
  },
};

const BootDemo: React.FC = () => {
  const [generation, setGeneration] = React.useState(0);

  return (
    <>
      <div
        style={{
          fontFamily: 'var(--typography-font-family-primary, monospace)',
          color: 'var(--color-cga-amber)',
          padding: 32,
          minHeight: 320,
        }}
      >
        <h1 style={{ fontSize: 28, marginBottom: 12 }}>C:\&gt; SYSTEM READY</h1>
        <p style={{ maxWidth: '52ch', lineHeight: 1.4 }}>
          The monitor just turned on: an amber line ignited across the center, the raster opened
          from it, and a warm phosphor glow settled — about 650ms, then out of the way.
        </p>
        <button
          type="button"
          onClick={() => setGeneration((g) => g + 1)}
          style={{
            marginTop: 16,
            background: 'none',
            border: '1px solid var(--color-cga-amber)',
            color: 'var(--color-cga-amber)',
            fontFamily: 'inherit',
            padding: '6px 12px',
            cursor: 'pointer',
          }}
        >
          [ REBOOT ]
        </button>
      </div>
      <RetroEffects key={generation} boot scanlines glow flicker={false} />
    </>
  );
};

export const BootSequence: Story = {
  render: () => <BootDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'The CGA monitor turn-on (DMNC-1047): pass `boot` to play a ~650ms launch sequence once on mount — ignition line → raster opens → warm glow settles. Skipped entirely under prefers-reduced-motion. Intended as the portfolio-wide first-load pattern: consumers already mounting RetroEffects in their layout add the one prop.',
      },
    },
  },
};

const SessionGatedBootDemo: React.FC = () => {
  // A stable per-session key so remounting the canvas (HMR, story switch) does
  // not replay. The CLEAR + REMOUNT button wipes the flag to demo a fresh visit.
  const STORAGE_KEY = 'eidotter:retro-boot-story';
  const [generation, setGeneration] = React.useState(0);

  const clearAndReplay = () => {
    try {
      window.sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setGeneration((g) => g + 1);
  };

  return (
    <>
      <div
        style={{
          fontFamily: 'var(--typography-font-family-primary, monospace)',
          color: 'var(--color-cga-amber)',
          padding: 32,
          minHeight: 320,
        }}
      >
        <h1 style={{ fontSize: 32, marginBottom: 16 }}>C:\&gt; ONCE PER VISIT</h1>
        <p style={{ maxWidth: '52ch', lineHeight: 1.4, marginBottom: 24 }}>
          With <code>boot bootOnce</code> the turn-on plays on the first load of a tab and is
          suppressed on every later mount — SPA route changes and full-reload navigation alike.
          Remounting the canvas will <em>not</em> replay it. Use the button to clear the session
          flag and simulate a brand-new visit.
        </p>
        <Button variant="secondary" onPress={clearAndReplay}>
          [ CLEAR + REMOUNT ]
        </Button>
      </div>
      <RetroEffects
        key={generation}
        boot
        bootOnce
        bootStorageKey={STORAGE_KEY}
        scanlines
        glow
        flicker={false}
      />
    </>
  );
};

export const SessionGatedBoot: Story = {
  render: () => <SessionGatedBootDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Add `bootOnce` to gate the boot sequence to once per browser tab/session (sessionStorage). It plays on the first load and is suppressed on all in-site navigation — SPA route changes AND MPA full-reload navigation — so opening a blog post or switching pages within a site does not replay it. A new tab/visit replays it; a hard refresh does not. `bootStorageKey` overrides the flag key (e.g. to force a replay). Falls back to playing if storage is unavailable.',
      },
    },
  },
};
