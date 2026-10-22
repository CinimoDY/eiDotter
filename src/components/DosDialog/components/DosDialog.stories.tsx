import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DosDialog } from './DosDialog';
import type { DosDialogProps } from './DosDialog';
import { Button as AriaButton } from 'react-aria-components';
import { Button } from '../../Button/components/Button';
import { Icon } from '../../Icon/components/Icon';
import '../../Modal/components/Modal.css';
import { componentRegistry } from '@/components/registry';

const meta = {
  title: 'Components/DosDialog',
  component: DosDialog,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dos',
      values: [{ name: 'dos', value: '#000000' }],
    },
    projectMeta: componentRegistry['DosDialog'],
    docs: {
      description: {
        component:
          'The one overlay shell. CmdPalette chrome (brand border, amber glow, square corners, blurred scrim) with a dark title strip (yellow title, ▸ marker, dim-amber rule). Modal, Lightbox and CmdPalette are built on it. Use it directly for any overlay that is not one of those three.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placement: { control: 'inline-radio', options: ['center', 'top'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg', 'full'] },
    isDismissable: { control: 'boolean' },
  },
} satisfies Meta<typeof DosDialog>;

export default meta;
type Story = StoryObj<typeof DosDialog>;

type DemoProps = Omit<DosDialogProps, 'open' | 'onOpenChange'> & {
  label?: string;
  startOpen?: boolean;
};

const DialogDemo = ({ label = 'OPEN DIALOG', startOpen = false, children, ...props }: DemoProps) => {
  const [open, setOpen] = useState(startOpen);
  return (
    <>
      <Button onClick={() => setOpen(true)}>{label}</Button>
      <DosDialog open={open} onOpenChange={setOpen} {...props}>
        {children}
      </DosDialog>
    </>
  );
};

const CloseGlyph = ({ onPress }: { onPress: () => void }) => (
  <AriaButton className="eidotter-modal__close" onPress={onPress} aria-label="Close dialog">
    <Icon name="Close" size="S" />
  </AriaButton>
);

/** Title strip with the ▸ marker, body, and the default md width. */
export const Default: Story = {
  render: () => (
    <DialogDemo head={{ title: 'SYSTEM MESSAGE' }}>
      <p style={{ margin: 0, color: 'var(--color-cga-light-gray)' }}>
        C:\&gt; All drives checked. No errors found.
      </p>
    </DialogDemo>
  ),
};

/** Strip end slot carries the close control; footer gets the 1px rule. */
export const WithFooterAndClose: Story = {
  render: () => {
    const Demo = () => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button onClick={() => setOpen(true)}>OPEN DIALOG</Button>
          <DosDialog
            open={open}
            onOpenChange={setOpen}
            head={{ title: 'FORMAT A:', end: <CloseGlyph onPress={() => setOpen(false)} /> }}
            footer={
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                <Button variant="primary" onClick={() => setOpen(false)}>Proceed</Button>
              </div>
            }
          >
            <p style={{ margin: 0, color: 'var(--color-cga-light-gray)' }}>
              All data on drive A: will be lost. Proceed with format?
            </p>
          </DosDialog>
        </>
      );
    };
    return <Demo />;
  },
};

/** Top placement — CmdPalette's ~18vh anchor. */
export const TopPlacement: Story = {
  render: () => (
    <DialogDemo placement="top" size="lg" head={{ title: 'JUMP TO' }}>
      <p style={{ margin: 0, color: 'var(--color-cga-light-gray)' }}>Anchored near the top of the viewport.</p>
    </DialogDemo>
  ),
};

/** The shared width map: sm 24rem, md 30rem, lg 40rem, full. */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {(['sm', 'md', 'lg', 'full'] as const).map((size) => (
        <DialogDemo key={size} label={`SIZE ${size.toUpperCase()}`} size={size} head={{ title: `SIZE ${size}` }}>
          <p style={{ margin: 0, color: 'var(--color-cga-light-gray)' }}>size=&quot;{size}&quot;</p>
        </DialogDemo>
      ))}
    </div>
  ),
};

/** Strip without the ▸ marker. */
export const NoMarker: Story = {
  render: () => (
    <DialogDemo head={{ title: 'PLAIN STRIP', marker: false }}>
      <p style={{ margin: 0, color: 'var(--color-cga-light-gray)' }}>The marker is optional.</p>
    </DialogDemo>
  ),
};

/** Opens on load — for visual review of the chrome. */
export const OpenOnLoad: Story = {
  render: () => (
    <DialogDemo startOpen head={{ title: 'SYSTEM MESSAGE' }} footer={<span>F1 HELP · ESC CLOSE</span>}>
      <p style={{ margin: 0, color: 'var(--color-cga-light-gray)' }}>
        The shell: brand border, amber glow, title strip, body, footer rule.
      </p>
    </DialogDemo>
  ),
};
