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

  it('shows the [ n / N ] counter as the strip title and the close control at its end', () => {
    render(<Lightbox images={images} isOpen={true} initialIndex={1} onClose={() => {}} />);
    const title = document.querySelector('.eidotter-dialog__title');
    expect(title).toHaveTextContent('[ 2 / 3 ]');
    expect(document.querySelector('.eidotter-dialog__end'))
      .toContainElement(screen.getByRole('button', { name: /close/i }));
    expect(document.querySelector('.eidotter-dialog')).toHaveClass('eidotter-dialog--full');
  });

  it('calls onClose when the close button is pressed', () => {
    const onClose = jest.fn();
    render(<Lightbox images={images} isOpen={true} onClose={onClose} />);
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe('Lightbox controls are IconButtons', () => {
  it('prev/next render pixel chevrons (svg), not text glyphs, and press to navigate', () => {
    const onIndexChange = jest.fn();
    render(<Lightbox images={images} isOpen={true} initialIndex={1} onClose={() => {}} onIndexChange={onIndexChange} />);
    const prev = screen.getByRole('button', { name: 'Previous image' });
    const next = screen.getByRole('button', { name: 'Next image' });
    for (const btn of [prev, next]) {
      expect(btn).toHaveClass('eidotter-icon-button', 'eidotter-lightbox__nav');
      expect(btn.querySelector('svg')).toBeInTheDocument();
      expect(btn.textContent?.trim()).toBe('');
    }
    fireEvent.click(next);
    expect(onIndexChange).toHaveBeenLastCalledWith(2);
  });

  it('places prev/next after the image and before the figcaption (phone row layout)', () => {
    const captioned = images.map((img) => ({ ...img, caption: `Caption ${img.alt}` }));
    render(<Lightbox images={captioned} isOpen={true} initialIndex={1} onClose={() => {}} />);
    const figure = document.querySelector('.eidotter-lightbox__figure') as HTMLElement;
    const kids = Array.from(figure.children);
    expect(kids[0]).toHaveClass('eidotter-lightbox__image');
    expect(kids[1]).toHaveAccessibleName('Previous image');
    expect(kids[2]).toHaveAccessibleName('Next image');
    // figcaption stays the figure's last child (HTML content model).
    expect(figure.lastElementChild?.tagName).toBe('FIGCAPTION');
    expect(figure.lastElementChild).toHaveTextContent('Caption B');
  });

  it('disables prev on the first image', () => {
    render(<Lightbox images={images} isOpen={true} initialIndex={0} onClose={() => {}} />);
    expect(screen.getByRole('button', { name: 'Previous image' })).toBeDisabled();
  });

  it('close is a 36px (md) IconButton', () => {
    render(<Lightbox images={images} isOpen={true} onClose={() => {}} />);
    const close = screen.getByRole('button', { name: 'Close lightbox' });
    expect(close).toHaveClass('eidotter-icon-button');
    expect(close).not.toHaveClass('eidotter-icon-button--window');
  });
});

describe('Lightbox keyboard navigation', () => {
  it('moves to the next image on ArrowRight', () => {
    const onIndexChange = jest.fn();
    render(<Lightbox images={images} isOpen={true} onClose={() => {}} onIndexChange={onIndexChange} />);
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(screen.getByRole('img', { name: 'B' })).toBeInTheDocument();
    expect(onIndexChange).toHaveBeenCalledWith(1);
  });

  it('moves to the previous image on ArrowLeft', () => {
    render(<Lightbox images={images} isOpen={true} initialIndex={2} onClose={() => {}} />);
    fireEvent.keyDown(window, { key: 'ArrowLeft' });
    expect(screen.getByRole('img', { name: 'B' })).toBeInTheDocument();
  });

  it('does not wrap past the last image', () => {
    const onIndexChange = jest.fn();
    render(<Lightbox images={images} isOpen={true} initialIndex={2} onClose={() => {}} onIndexChange={onIndexChange} />);
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(screen.getByRole('img', { name: 'C' })).toBeInTheDocument();
    expect(onIndexChange).not.toHaveBeenCalled();
  });

  it('does not wrap before the first image', () => {
    const onIndexChange = jest.fn();
    render(<Lightbox images={images} isOpen={true} initialIndex={0} onClose={() => {}} onIndexChange={onIndexChange} />);
    fireEvent.keyDown(window, { key: 'ArrowLeft' });
    expect(screen.getByRole('img', { name: 'A' })).toBeInTheDocument();
    expect(onIndexChange).not.toHaveBeenCalled();
  });
});

describe('Lightbox touch swipe', () => {
  function fireSwipe(target: Element, fromX: number, toX: number) {
    fireEvent.touchStart(target, { touches: [{ clientX: fromX, clientY: 100 }] });
    fireEvent.touchMove(target, { touches: [{ clientX: toX, clientY: 100 }] });
    fireEvent.touchEnd(target, { changedTouches: [{ clientX: toX, clientY: 100 }] });
  }

  it('swipes left to advance to the next image', () => {
    render(<Lightbox images={images} isOpen={true} onClose={() => {}} />);
    const fig = screen.getByRole('img', { name: 'A' });
    fireSwipe(fig, 200, 50);
    expect(screen.getByRole('img', { name: 'B' })).toBeInTheDocument();
  });

  it('swipes right to go back to the previous image', () => {
    render(<Lightbox images={images} isOpen={true} initialIndex={2} onClose={() => {}} />);
    const fig = screen.getByRole('img', { name: 'C' });
    fireSwipe(fig, 50, 200);
    expect(screen.getByRole('img', { name: 'B' })).toBeInTheDocument();
  });

  it('ignores tiny swipes below the threshold', () => {
    render(<Lightbox images={images} isOpen={true} onClose={() => {}} />);
    const fig = screen.getByRole('img', { name: 'A' });
    fireSwipe(fig, 200, 195);
    expect(screen.getByRole('img', { name: 'A' })).toBeInTheDocument();
  });
});
