import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Lightbox } from './Lightbox';
import { Button } from '../../Button/components/Button';

const SAMPLE_IMAGES = [
  { src: 'https://placehold.co/1200x800/000/ffb000?text=ONE',   alt: 'One',   caption: 'First image — Lightbox demo' },
  { src: 'https://placehold.co/1200x800/000/ffb000?text=TWO',   alt: 'Two',   caption: 'Second image' },
  { src: 'https://placehold.co/1200x800/000/ffb000?text=THREE', alt: 'Three', caption: 'Third image' },
];

const meta: Meta<typeof Lightbox> = {
  title: 'Components/Lightbox',
  component: Lightbox,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Lightbox>;

const LightboxDemo: React.FC<{ images: typeof SAMPLE_IMAGES; label: string }> = ({
  images,
  label,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>{label}</Button>
      <Lightbox images={images} isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export const Default: Story = {
  render: () => <LightboxDemo images={SAMPLE_IMAGES} label="OPEN LIGHTBOX" />,
};

export const SingleImage: Story = {
  render: () => <LightboxDemo images={[SAMPLE_IMAGES[0]]} label="OPEN SINGLE" />,
};

// Synthetic portrait image (inline SVG, no network): 600x1600 with a marker
// band at the very top, so a clipped top edge is visible in screenshots.
const portraitSvg = (label: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="1600" viewBox="0 0 600 1600">` +
      `<rect width="600" height="1600" fill="#000"/>` +
      `<rect width="600" height="120" fill="#ffb000"/>` +
      `<text x="300" y="80" font-family="monospace" font-size="56" text-anchor="middle" fill="#000">TOP EDGE</text>` +
      `<text x="300" y="820" font-family="monospace" font-size="72" text-anchor="middle" fill="#ffb000">${label}</text>` +
      `<rect y="1480" width="600" height="120" fill="#ffb000"/>` +
      `</svg>`,
  )}`;

const TALL_IMAGES = [
  {
    src: portraitSvg('PORTRAIT 1'),
    alt: 'Synthetic tall portrait placeholder, one',
    width: 600,
    height: 1600,
    caption:
      'A tall portrait figure with a long caption. Together with the prev/next row on phone widths it is taller than the dialog body, so the body scrolls; the TOP EDGE band must be reachable at scroll position 0.',
  },
  { src: portraitSvg('PORTRAIT 2'), alt: 'Synthetic tall portrait placeholder, two', width: 600, height: 1600, caption: 'Second portrait' },
];

const waitFor = async <T,>(get: () => T | null | undefined, timeout = 3000): Promise<T> => {
  const start = Date.now();
  for (;;) {
    const v = get();
    if (v) return v;
    if (Date.now() - start > timeout) throw new Error('TallPortrait: timed out waiting for the lightbox');
    await new Promise((r) => setTimeout(r, 50));
  }
};

/**
 * A figure taller than the dialog body (DMNC-1612). The body scrolls and the
 * figure starts at the body's content top, so the top of the image is never
 * above the scroll origin. The play function opens the lightbox and fails if
 * the figure's top edge sits above the body's padding at scrollTop 0. View it
 * at the phone375 viewport to see the scrolling case.
 */
export const TallPortrait: Story = {
  render: () => <LightboxDemo images={TALL_IMAGES} label="OPEN TALL PORTRAIT" />,
  play: async ({ canvasElement }) => {
    const trigger = await waitFor(() =>
      Array.from(canvasElement.querySelectorAll('button')).find((b) => b.textContent?.includes('OPEN TALL PORTRAIT')),
    );
    trigger.click();
    const body = await waitFor(() =>
      document.querySelector<HTMLElement>('.eidotter-lightbox__container > .eidotter-dialog__body'),
    );
    const figure = await waitFor(() => body.querySelector<HTMLElement>('.eidotter-lightbox__figure'));
    body.scrollTop = 0;
    const padTop = parseFloat(getComputedStyle(body).paddingTop) || 0;
    // offsetTop ignores the pop-in transform; the body is the offsetParent.
    if (figure.offsetTop < padTop - 0.5) {
      throw new Error(
        `TallPortrait: figure top is ${padTop - figure.offsetTop}px above the body's scroll origin (unreachable)`,
      );
    }
  },
};
