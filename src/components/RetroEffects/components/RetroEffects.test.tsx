import React from 'react';
import { render } from '@testing-library/react';
import { RetroEffects } from './RetroEffects';

describe('RetroEffects', () => {
  describe('rendering', () => {
    it('renders with default props', () => {
      render(<RetroEffects />);
      const container = document.querySelector('.retro-effects');
      expect(container).toBeInTheDocument();
    });

    it('has aria-hidden for decorative content', () => {
      render(<RetroEffects />);
      const container = document.querySelector('.retro-effects');
      expect(container).toHaveAttribute('aria-hidden', 'true');
    });

    it('applies custom className', () => {
      render(<RetroEffects className="custom-class" />);
      const container = document.querySelector('.retro-effects');
      expect(container).toHaveClass('custom-class');
    });
  });

  describe('scanlines effect', () => {
    it('renders scanlines by default', () => {
      render(<RetroEffects />);
      const scanlines = document.querySelector('.retro-effects__scanlines');
      expect(scanlines).toBeInTheDocument();
    });

    it('renders scanlines when enabled', () => {
      render(<RetroEffects scanlines />);
      const scanlines = document.querySelector('.retro-effects__scanlines');
      expect(scanlines).toBeInTheDocument();
    });

    it('does not render scanlines when disabled', () => {
      render(<RetroEffects scanlines={false} />);
      const scanlines = document.querySelector('.retro-effects__scanlines');
      expect(scanlines).not.toBeInTheDocument();
    });
  });

  describe('glow effect', () => {
    it('renders glow by default', () => {
      render(<RetroEffects />);
      const glow = document.querySelector('.retro-effects__glow');
      expect(glow).toBeInTheDocument();
    });

    it('renders glow when enabled', () => {
      render(<RetroEffects glow />);
      const glow = document.querySelector('.retro-effects__glow');
      expect(glow).toBeInTheDocument();
    });

    it('does not render glow when disabled', () => {
      render(<RetroEffects glow={false} />);
      const glow = document.querySelector('.retro-effects__glow');
      expect(glow).not.toBeInTheDocument();
    });
  });

  describe('flicker effect', () => {
    it('renders flicker by default', () => {
      render(<RetroEffects />);
      const flicker = document.querySelector('.retro-effects__flicker');
      expect(flicker).toBeInTheDocument();
    });

    it('renders flicker when enabled', () => {
      render(<RetroEffects flicker />);
      const flicker = document.querySelector('.retro-effects__flicker');
      expect(flicker).toBeInTheDocument();
    });

    it('does not render flicker when disabled', () => {
      render(<RetroEffects flicker={false} />);
      const flicker = document.querySelector('.retro-effects__flicker');
      expect(flicker).not.toBeInTheDocument();
    });
  });

  describe('intensity', () => {
    it('applies default intensity', () => {
      render(<RetroEffects />);
      const container = document.querySelector('.retro-effects') as HTMLElement;
      expect(container.style.getPropertyValue('--retro-intensity')).toBe('1');
    });

    it('applies custom intensity', () => {
      render(<RetroEffects intensity={0.5} />);
      const container = document.querySelector('.retro-effects') as HTMLElement;
      expect(container.style.getPropertyValue('--retro-intensity')).toBe('0.5');
    });

    it('applies zero intensity', () => {
      render(<RetroEffects intensity={0} />);
      const container = document.querySelector('.retro-effects') as HTMLElement;
      expect(container.style.getPropertyValue('--retro-intensity')).toBe('0');
    });
  });

  describe('effect combinations', () => {
    it('renders all effects when all are enabled', () => {
      render(<RetroEffects scanlines glow flicker />);
      expect(document.querySelector('.retro-effects__scanlines')).toBeInTheDocument();
      expect(document.querySelector('.retro-effects__glow')).toBeInTheDocument();
      expect(document.querySelector('.retro-effects__flicker')).toBeInTheDocument();
    });

    it('renders no effects when all are disabled', () => {
      render(<RetroEffects scanlines={false} glow={false} flicker={false} />);
      expect(document.querySelector('.retro-effects__scanlines')).not.toBeInTheDocument();
      expect(document.querySelector('.retro-effects__glow')).not.toBeInTheDocument();
      expect(document.querySelector('.retro-effects__flicker')).not.toBeInTheDocument();
    });

    it('renders only scanlines when others are disabled', () => {
      render(<RetroEffects scanlines glow={false} flicker={false} />);
      expect(document.querySelector('.retro-effects__scanlines')).toBeInTheDocument();
      expect(document.querySelector('.retro-effects__glow')).not.toBeInTheDocument();
      expect(document.querySelector('.retro-effects__flicker')).not.toBeInTheDocument();
    });

    it('renders only glow when others are disabled', () => {
      render(<RetroEffects scanlines={false} glow flicker={false} />);
      expect(document.querySelector('.retro-effects__scanlines')).not.toBeInTheDocument();
      expect(document.querySelector('.retro-effects__glow')).toBeInTheDocument();
      expect(document.querySelector('.retro-effects__flicker')).not.toBeInTheDocument();
    });

    it('renders only flicker when others are disabled', () => {
      render(<RetroEffects scanlines={false} glow={false} flicker />);
      expect(document.querySelector('.retro-effects__scanlines')).not.toBeInTheDocument();
      expect(document.querySelector('.retro-effects__glow')).not.toBeInTheDocument();
      expect(document.querySelector('.retro-effects__flicker')).toBeInTheDocument();
    });
  });

  describe('class composition', () => {
    it('combines all classes correctly', () => {
      render(<RetroEffects className="extra" />);
      const container = document.querySelector('.retro-effects');
      expect(container).toHaveClass('retro-effects');
      expect(container).toHaveClass('extra');
    });
  });
});
