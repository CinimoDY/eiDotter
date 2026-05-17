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
