import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Lightbox } from './Lightbox';

const images = [
  { src: '/a.png', alt: 'A' },
  { src: '/b.png', alt: 'B' },
  { src: '/c.png', alt: 'C' },
];

describe('Lightbox', () => {
  it('renders nothing when isOpen is false', () => {
    render(<Lightbox images={images} isOpen={false} onClose={() => {}} />);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('renders the initial image when isOpen is true', () => {
    render(<Lightbox images={images} isOpen={true} onClose={() => {}} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'A' })).toBeInTheDocument();
  });

  it('honors initialIndex', () => {
    render(<Lightbox images={images} isOpen={true} initialIndex={2} onClose={() => {}} />);
    expect(screen.getByRole('img', { name: 'C' })).toBeInTheDocument();
  });

  it('calls onClose when the close button is pressed', () => {
    const onClose = jest.fn();
    render(<Lightbox images={images} isOpen={true} onClose={onClose} />);
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
