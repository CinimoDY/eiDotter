import React from 'react';
import { render, screen } from '@testing-library/react';
import { Logo } from './Logo';
import { Wordmark } from './Wordmark';
import { BrandLockup } from './BrandLockup';

describe('Logo', () => {
  it('renders with default size', () => {
    const { container } = render(<Logo />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '32');
    expect(svg).toHaveAttribute('height', '32');
  });

  it('applies custom size', () => {
    const { container } = render(<Logo size={64} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '64');
    expect(svg).toHaveAttribute('height', '64');
  });

  it('renders with accessible title by default', () => {
    render(<Logo />);
    expect(screen.getByRole('img', { name: 'eiDotter' })).toBeInTheDocument();
  });

  it('can be decorative when title is empty', () => {
    const { container } = render(<Logo title="" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).not.toHaveAttribute('role');
  });

  it('applies glow class by default', () => {
    const { container } = render(<Logo />);
    expect(container.querySelector('.eidotter-logo--glow')).toBeInTheDocument();
  });

  it('omits glow class when disabled', () => {
    const { container } = render(<Logo glow={false} />);
    expect(container.querySelector('.eidotter-logo--glow')).not.toBeInTheDocument();
  });
});

describe('Wordmark', () => {
  it('renders eiDotter with split prefix/body', () => {
    const { container } = render(<Wordmark />);
    expect(container.querySelector('.eidotter-wordmark__prefix')).toHaveTextContent('ei');
    expect(container.querySelector('.eidotter-wordmark__body')).toHaveTextContent('Dotter');
  });

  it('has accessible label', () => {
    render(<Wordmark />);
    expect(screen.getByLabelText('eiDotter')).toBeInTheDocument();
  });

  it('applies glow class by default', () => {
    const { container } = render(<Wordmark />);
    expect(container.querySelector('.eidotter-wordmark--glow')).toBeInTheDocument();
  });
});

describe('BrandLockup', () => {
  it('renders logo + wordmark by default', () => {
    const { container } = render(<BrandLockup />);
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(container.querySelector('.eidotter-wordmark')).toBeInTheDocument();
  });

  it('iconOnly hides wordmark', () => {
    const { container } = render(<BrandLockup iconOnly />);
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(container.querySelector('.eidotter-wordmark')).not.toBeInTheDocument();
  });

  it('wordmarkOnly hides logo', () => {
    const { container } = render(<BrandLockup wordmarkOnly />);
    expect(container.querySelector('svg')).not.toBeInTheDocument();
    expect(container.querySelector('.eidotter-wordmark')).toBeInTheDocument();
  });

  it('exposes lockup with accessible label', () => {
    render(<BrandLockup />);
    expect(screen.getByRole('img', { name: 'eiDotter' })).toBeInTheDocument();
  });
});
