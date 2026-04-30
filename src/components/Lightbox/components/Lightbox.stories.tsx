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

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <Button onClick={() => setOpen(true)}>OPEN LIGHTBOX</Button>
        <Lightbox images={SAMPLE_IMAGES} isOpen={open} onClose={() => setOpen(false)} />
      </div>
    );
  },
};

export const SingleImage: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <Button onClick={() => setOpen(true)}>OPEN SINGLE</Button>
        <Lightbox images={[SAMPLE_IMAGES[0]]} isOpen={open} onClose={() => setOpen(false)} />
      </div>
    );
  },
};
