import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer, defaultLegalLinks } from './Footer';

describe('Footer', () => {
  it('renders copyright and links', () => {
    render(
      <Footer
        copyright="2026 ACME Corp"
        links={[
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ]}
      />
    );

    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText(/2026 ACME Corp/)).toBeInTheDocument();
  });

  it('renders default legal links when no links prop passed', () => {
    render(<Footer copyright="2026 ACME Corp" />);

    expect(screen.getByText('Impressum')).toBeInTheDocument();
    expect(screen.getByText('Datenschutz')).toBeInTheDocument();
  });

  it('renders no links when empty array passed', () => {
    render(<Footer copyright="2026 ACME Corp" links={[]} />);

    expect(screen.queryByText('Impressum')).not.toBeInTheDocument();
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  it('renders external links with target and rel attributes', () => {
    render(
      <Footer links={[{ label: 'GitHub', href: 'https://github.com', external: true }]} />
    );

    const link = screen.getByText('GitHub');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders internal links without target/rel', () => {
    render(<Footer links={[{ label: 'Home', href: '/' }]} />);

    const link = screen.getByText('Home');
    expect(link).not.toHaveAttribute('target');
    expect(link).not.toHaveAttribute('rel');
  });

  it('renders with no props at all without crashing', () => {
    const { container } = render(<Footer />);

    expect(container.querySelector('footer')).toBeInTheDocument();
    // Should still show default links
    expect(screen.getByText('Impressum')).toBeInTheDocument();
  });

  it('renders children between separator and links', () => {
    render(
      <Footer copyright="2026 ACME Corp">
        <p>Custom content</p>
      </Footer>
    );

    expect(screen.getByText('Custom content')).toBeInTheDocument();
  });

  it('renders no middle-dot for single link', () => {
    const { container } = render(
      <Footer links={[{ label: 'Solo', href: '/solo' }]} />
    );

    expect(container.querySelector('.eidotter-footer__dot')).not.toBeInTheDocument();
  });

  it('renders middle-dots between multiple links', () => {
    const { container } = render(
      <Footer links={[
        { label: 'A', href: '/a' },
        { label: 'B', href: '/b' },
        { label: 'C', href: '/c' },
      ]} />
    );

    const dots = container.querySelectorAll('.eidotter-footer__dot');
    expect(dots).toHaveLength(2);
  });

  it('nav has aria-label', () => {
    render(<Footer />);

    expect(screen.getByRole('navigation', { name: 'Footer links' })).toBeInTheDocument();
  });

  it('middle dots are aria-hidden', () => {
    const { container } = render(
      <Footer links={[
        { label: 'A', href: '/a' },
        { label: 'B', href: '/b' },
      ]} />
    );

    const dot = container.querySelector('.eidotter-footer__dot');
    expect(dot).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies custom className', () => {
    const { container } = render(<Footer className="custom" />);
    expect(container.querySelector('footer')).toHaveClass('eidotter-footer', 'custom');
  });

  it('spreads additional HTML attributes', () => {
    const { container } = render(<Footer data-testid="site-footer" />);
    expect(container.querySelector('footer')).toHaveAttribute('data-testid', 'site-footer');
  });

  it('exports defaultLegalLinks constant', () => {
    expect(defaultLegalLinks).toHaveLength(2);
    expect(defaultLegalLinks[0].label).toBe('Impressum');
    expect(defaultLegalLinks[1].label).toBe('Datenschutz');
  });
});
