import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CmdPalette, type CmdPaletteItem } from './CmdPalette';
import { Button } from '../../Button/components/Button';
import { componentRegistry } from '@/components/registry';

const commandItems: CmdPaletteItem[] = [
  { id: 'dir',   label: 'DIR',   hint: 'LIST FILES',   keywords: ['ls', 'listing'] },
  { id: 'mem',   label: 'MEM',   hint: 'SHOW MEMORY',  keywords: ['memory', 'free'] },
  { id: 'ver',   label: 'VER',   hint: 'VERSION',      keywords: ['version'] },
  { id: 'help',  label: 'HELP',  hint: 'OPEN HELP',    keywords: ['?', 'man', 'documentation'] },
  { id: 'cls',   label: 'CLS',   hint: 'CLEAR SCREEN', keywords: ['clear'] },
  { id: 'tree',  label: 'TREE',  hint: 'SHOW TREE',    keywords: ['directory'] },
  { id: 'copy',  label: 'COPY',  hint: 'COPY FILE',    keywords: ['cp'] },
  { id: 'move',  label: 'MOVE',  hint: 'MOVE FILE',    keywords: ['mv', 'rename'] },
  { id: 'del',   label: 'DEL',   hint: 'DELETE FILE',  keywords: ['rm', 'remove'] },
  { id: 'exit',  label: 'EXIT',  hint: 'QUIT SHELL',   keywords: ['quit', 'bye'] },
];

const meta = {
  title: 'Components/CmdPalette',
  component: CmdPalette,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dos',
      values: [{ name: 'dos', value: '#020003' }],
    },
    projectMeta: componentRegistry['CmdPalette'],
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CmdPalette>;

export default meta;
type Story = StoryObj<typeof CmdPalette>;

const Harness: React.FC<{
  initialOpen?: boolean;
  items?: CmdPaletteItem[];
  renderItem?: React.ComponentProps<typeof CmdPalette>['renderItem'];
  hotkey?: React.ComponentProps<typeof CmdPalette>['hotkey'];
  footerHint?: React.ComponentProps<typeof CmdPalette>['footerHint'];
}> = ({
  initialOpen = false,
  items = commandItems,
  renderItem,
  hotkey = 'mod+k',
  footerHint,
}) => {
  const [open, setOpen] = useState(initialOpen);
  const [lastSelected, setLastSelected] = useState<string>('(none)');
  const wired = items.map(i => ({
    ...i,
    onSelect: (it: CmdPaletteItem) => setLastSelected(it.id),
  }));
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--color-semantic-background-primary)',
      color: 'var(--color-semantic-text-primary)',
      fontFamily: 'var(--typography-font-family-primary)',
      padding: '32px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    }}>
      <Button onClick={() => setOpen(true)}>OPEN COMMAND PALETTE</Button>
      <p style={{ fontSize: '14px' }}>Hotkey: {hotkey ? String(hotkey) : 'disabled'}</p>
      <p style={{ fontSize: '14px' }}>Last selected: <strong>{lastSelected}</strong></p>
      <CmdPalette
        open={open}
        onOpenChange={setOpen}
        items={wired}
        renderItem={renderItem}
        hotkey={hotkey}
        footerHint={footerHint}
      />
    </div>
  );
};

export const Basic: Story = {
  render: () => <Harness />,
};

export const WithHints: Story = {
  render: () => <Harness initialOpen />,
};

export const CustomItemRenderer: Story = {
  render: () => (
    <Harness
      initialOpen
      renderItem={(item, isSelected) => (
        <span
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <span style={{ display: 'inline-flex', gap: '8px' }}>
            <span style={{ color: 'var(--color-cga-amber)' }}>{isSelected ? '▶' : '◦'}</span>
            <strong>{item.label}</strong>
            <span style={{ color: 'var(--color-cga-brown)' }}>· {item.keywords?.join(', ') || '—'}</span>
          </span>
          <span style={{ color: 'var(--color-cga-amber-dim)' }}>{item.hint}</span>
        </span>
      )}
    />
  ),
};

export const DisabledHotkey: Story = {
  render: () => <Harness hotkey={false} />,
};

export const CustomFooter: Story = {
  render: () => (
    <Harness
      initialOpen
      footerHint={<span>⌘K · TYPE TO SEARCH · ENTER TO EXECUTE</span>}
    />
  ),
};
