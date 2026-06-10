import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import '../../styles/tokens.css';

const meta = {
  title: 'Design System/Color Tokens',
  parameters: {
    layout: 'fullscreen',
    // Deliberately renders the full palette incl. low-contrast entries — excluded from the axe CI gate (DMNC-1011, per the 2026-05-05 baseline's noise filter).
    a11y: { disable: true },
    backgrounds: {
      default: 'dos',
      values: [
        { name: 'dos', value: '#000000' },
        { name: 'light', value: '#AAAAAA' },
      ],
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const ColorSwatch = ({
  name,
  value,
  cssVar,
  description
}: {
  name: string;
  value: string;
  cssVar: string;
  description?: string;
}) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '8px 0',
    borderBottom: '1px solid #333'
  }}>
    <div
      style={{
        width: '64px',
        height: '64px',
        backgroundColor: value,
        border: '2px solid #555',
        flexShrink: 0,
      }}
      title={value}
    />
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{
        color: '#FFFFFF',
        fontFamily: 'monospace',
        fontSize: '14px',
        fontWeight: 'bold'
      }}>
        {name}
      </div>
      <div style={{
        color: '#AAAAAA',
        fontFamily: 'monospace',
        fontSize: '12px',
        marginTop: '4px'
      }}>
        {cssVar}
      </div>
      <div style={{
        color: '#55FFFF',
        fontFamily: 'monospace',
        fontSize: '14px',
        marginTop: '4px'
      }}>
        {value}
      </div>
      {description && (
        <div style={{
          color: '#555555',
          fontFamily: 'monospace',
          fontSize: '11px',
          marginTop: '4px'
        }}>
          {description}
        </div>
      )}
    </div>
  </div>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: '32px' }}>
    <h2 style={{
      color: '#FFFF55',
      fontFamily: 'monospace',
      fontSize: '16px',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      borderBottom: '2px solid #FFFF55',
      paddingBottom: '8px',
      marginBottom: '16px'
    }}>
      {title}
    </h2>
    {children}
  </div>
);

// Amber Monochrome Primitive Colors (DEFAULT) - EDIT THESE VALUES IN base.tokens.json
const cgaPrimitives = [
  { name: 'black', value: '#020003', cssVar: '--color-cga-black', description: 'Amber mono - darkest' },
  { name: 'blue', value: '#2C1203', cssVar: '--color-cga-blue', description: 'Amber monochrome' },
  { name: 'green', value: '#411F06', cssVar: '--color-cga-green', description: 'Amber monochrome' },
  { name: 'cyan', value: '#552D0A', cssVar: '--color-cga-cyan', description: 'Amber monochrome' },
  { name: 'red', value: '#65360C', cssVar: '--color-cga-red', description: 'Amber monochrome' },
  { name: 'magenta', value: '#713E0D', cssVar: '--color-cga-magenta', description: 'Amber monochrome' },
  { name: 'brown', value: '#5F340E', cssVar: '--color-cga-brown', description: 'Amber monochrome' },
  { name: 'lightGray', value: '#B87C1A', cssVar: '--color-cga-light-gray', description: 'Amber monochrome' },
  { name: 'darkGray', value: '#010103', cssVar: '--color-cga-dark-gray', description: 'Amber mono - near black' },
  { name: 'brightBlue', value: '#C38A23', cssVar: '--color-cga-bright-blue', description: 'Amber monochrome' },
  { name: 'brightGreen', value: '#CB9529', cssVar: '--color-cga-bright-green', description: 'Amber monochrome' },
  { name: 'brightCyan', value: '#D4A030', cssVar: '--color-cga-bright-cyan', description: 'Amber monochrome' },
  { name: 'brightRed', value: '#DCA934', cssVar: '--color-cga-bright-red', description: 'Amber monochrome' },
  { name: 'brightMagenta', value: '#DDB030', cssVar: '--color-cga-bright-magenta', description: 'Amber monochrome' },
  { name: 'yellow', value: '#E5B936', cssVar: '--color-cga-yellow', description: 'Amber mono - accent' },
  { name: 'white', value: '#BA8225', cssVar: '--color-cga-white', description: 'Amber monochrome' },
];

const amberColors = [
  { name: 'amber', value: '#FFB000', cssVar: '--color-cga-amber', description: 'P3 phosphor amber (602nm)' },
  { name: 'amberBright', value: '#FDCA9F', cssVar: '--color-cga-amber-bright', description: 'P3 phosphor amber bright' },
  { name: 'amberDim', value: '#9A5700', cssVar: '--color-cga-amber-dim', description: 'P3 phosphor amber dim' },
];

export const PrimitiveColors: Story = {
  render: () => (
    <div style={{ padding: '24px', maxWidth: '800px' }}>
      <h1 style={{
        color: '#FFFFFF',
        fontFamily: 'monospace',
        fontSize: '24px',
        marginBottom: '8px'
      }}>
        Primitive Color Tokens
      </h1>
      <p style={{
        color: '#AAAAAA',
        fontFamily: 'monospace',
        fontSize: '12px',
        marginBottom: '32px'
      }}>
        Edit in: <code style={{ color: '#55FFFF' }}>src/tokens/base.tokens.json</code> → then run <code style={{ color: '#55FF55' }}>npm run build-tokens</code>
      </p>

      <Section title="Amber Monochrome Palette (Default)">
        {cgaPrimitives.map((color) => (
          <ColorSwatch key={color.name} {...color} />
        ))}
      </Section>

      <Section title="Amber Phosphor Extension">
        {amberColors.map((color) => (
          <ColorSwatch key={color.name} {...color} />
        ))}
      </Section>
    </div>
  ),
};

// CGA Mode 4 Palette 0 - Green/Red/Yellow/Black (Early PC games)
const cgaMode4P0 = [
  { name: 'black', value: '#000000', cssVar: '--color-cga-black', description: 'Background' },
  { name: 'green', value: '#00FF00', cssVar: '--color-cga-green', description: 'Primary' },
  { name: 'red', value: '#FF0000', cssVar: '--color-cga-red', description: 'Secondary' },
  { name: 'yellow', value: '#FFFF00', cssVar: '--color-cga-yellow', description: 'Accent' },
];

// CGA Mode 4 Palette 1 - Cyan/Magenta/White/Black (Commander Keen era)
const cgaMode4P1 = [
  { name: 'black', value: '#000000', cssVar: '--color-cga-black', description: 'Background' },
  { name: 'cyan', value: '#00FFFF', cssVar: '--color-cga-cyan', description: 'Primary' },
  { name: 'magenta', value: '#FF00FF', cssVar: '--color-cga-magenta', description: 'Secondary' },
  { name: 'white', value: '#FFFFFF', cssVar: '--color-cga-white', description: 'Accent' },
];

// CGA Mode 5 - Cyan/Red/White/Black (Composite monitor mode)
const cgaMode5 = [
  { name: 'black', value: '#000000', cssVar: '--color-cga-black', description: 'Background' },
  { name: 'cyan', value: '#00FFFF', cssVar: '--color-cga-cyan', description: 'Primary' },
  { name: 'red', value: '#FF0000', cssVar: '--color-cga-red', description: 'Secondary' },
  { name: 'white', value: '#FFFFFF', cssVar: '--color-cga-white', description: 'Accent' },
];

export const CGAMode4Palette0: Story = {
  render: () => (
    <div style={{ padding: '24px', maxWidth: '800px' }}>
      <h1 style={{
        color: '#00FF00',
        fontFamily: 'monospace',
        fontSize: '24px',
        marginBottom: '8px'
      }}>
        CGA Mode 4 - Palette 0
      </h1>
      <p style={{
        color: '#FFFF00',
        fontFamily: 'monospace',
        fontSize: '12px',
        marginBottom: '32px'
      }}>
        Green/Red/Yellow/Black • Early PC games aesthetic
      </p>

      <Section title="4-Color Palette">
        {cgaMode4P0.map((color) => (
          <ColorSwatch key={color.name} {...color} />
        ))}
      </Section>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '4px',
        maxWidth: '400px',
        marginTop: '24px'
      }}>
        {cgaMode4P0.map((color) => (
          <div
            key={color.name}
            style={{
              aspectRatio: '1',
              backgroundColor: color.value,
              border: '2px solid #333',
            }}
            title={`${color.name}: ${color.value}`}
          />
        ))}
      </div>
    </div>
  ),
};

export const CGAMode4Palette1: Story = {
  render: () => (
    <div style={{ padding: '24px', maxWidth: '800px' }}>
      <h1 style={{
        color: '#00FFFF',
        fontFamily: 'monospace',
        fontSize: '24px',
        marginBottom: '8px'
      }}>
        CGA Mode 4 - Palette 1
      </h1>
      <p style={{
        color: '#FF00FF',
        fontFamily: 'monospace',
        fontSize: '12px',
        marginBottom: '32px'
      }}>
        Cyan/Magenta/White/Black • Commander Keen era
      </p>

      <Section title="4-Color Palette">
        {cgaMode4P1.map((color) => (
          <ColorSwatch key={color.name} {...color} />
        ))}
      </Section>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '4px',
        maxWidth: '400px',
        marginTop: '24px'
      }}>
        {cgaMode4P1.map((color) => (
          <div
            key={color.name}
            style={{
              aspectRatio: '1',
              backgroundColor: color.value,
              border: '2px solid #333',
            }}
            title={`${color.name}: ${color.value}`}
          />
        ))}
      </div>
    </div>
  ),
};

export const CGAMode5: Story = {
  render: () => (
    <div style={{ padding: '24px', maxWidth: '800px' }}>
      <h1 style={{
        color: '#00FFFF',
        fontFamily: 'monospace',
        fontSize: '24px',
        marginBottom: '8px'
      }}>
        CGA Mode 5
      </h1>
      <p style={{
        color: '#FF0000',
        fontFamily: 'monospace',
        fontSize: '12px',
        marginBottom: '32px'
      }}>
        Cyan/Red/White/Black • Composite monitor mode
      </p>

      <Section title="4-Color Palette">
        {cgaMode5.map((color) => (
          <ColorSwatch key={color.name} {...color} />
        ))}
      </Section>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '4px',
        maxWidth: '400px',
        marginTop: '24px'
      }}>
        {cgaMode5.map((color) => (
          <div
            key={color.name}
            style={{
              aspectRatio: '1',
              backgroundColor: color.value,
              border: '2px solid #333',
            }}
            title={`${color.name}: ${color.value}`}
          />
        ))}
      </div>
    </div>
  ),
};

// Grid view for quick comparison
export const ColorGrid: Story = {
  render: () => (
    <div style={{ padding: '24px' }}>
      <h1 style={{
        color: '#FFFFFF',
        fontFamily: 'monospace',
        fontSize: '24px',
        marginBottom: '24px'
      }}>
        Amber Monochrome Grid
      </h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(8, 1fr)',
        gap: '4px',
        maxWidth: '600px'
      }}>
        {cgaPrimitives.map((color) => (
          <div key={color.name} style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '100%',
                aspectRatio: '1',
                backgroundColor: color.value,
                border: '2px solid #333',
              }}
              title={`${color.name}: ${color.value}`}
            />
            <div style={{
              color: '#AAAAAA',
              fontFamily: 'monospace',
              fontSize: '9px',
              marginTop: '4px',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {color.name}
            </div>
          </div>
        ))}
      </div>

      <h2 style={{
        color: '#FFB000',
        fontFamily: 'monospace',
        fontSize: '16px',
        marginTop: '32px',
        marginBottom: '16px'
      }}>
        Amber Extension
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '4px',
        maxWidth: '225px'
      }}>
        {amberColors.map((color) => (
          <div key={color.name} style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '100%',
                aspectRatio: '1',
                backgroundColor: color.value,
                border: '2px solid #333',
              }}
              title={`${color.name}: ${color.value}`}
            />
            <div style={{
              color: '#AAAAAA',
              fontFamily: 'monospace',
              fontSize: '9px',
              marginTop: '4px',
            }}>
              {color.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};
