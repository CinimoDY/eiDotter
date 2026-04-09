import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';

const items = [
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

describe('Header', () => {
  it('renders brandName as text', () => {
    render(<Header brandName="DMNC.TECH" items={items} />);
    expect(screen.getByText('DMNC.TECH')).toBeInTheDocument();
  });

  it('renders brandName as a link to "/" by default', () => {
    render(<Header brandName="SITE" items={items} />);
    const link = screen.getByText('SITE').closest('a');
    expect(link).toHaveAttribute('href', '/');
  });

  it('renders brandName with custom brandHref', () => {
    render(<Header brandName="SITE" brandHref="/home" items={items} />);
    const link = screen.getByText('SITE').closest('a');
    expect(link).toHaveAttribute('href', '/home');
  });

  it('renders children instead of brandName when provided', () => {
    render(
      <Header items={items}>
        <span data-testid="custom-brand">Custom Logo</span>
      </Header>,
    );
    expect(screen.getByTestId('custom-brand')).toBeInTheDocument();
  });

  it('renders navigation items', () => {
    render(<Header brandName="SITE" items={items} />);
    expect(screen.getAllByText('Projects').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Blog').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Contact').length).toBeGreaterThanOrEqual(1);
  });

  it('renders both desktop and mobile navs', () => {
    const { container } = render(<Header brandName="SITE" items={items} />);
    expect(container.querySelector('.eidotter-nav--desktop')).toBeInTheDocument();
    expect(container.querySelector('.eidotter-nav--mobile')).toBeInTheDocument();
  });

  it('passes activeHref to nav', () => {
    render(<Header brandName="SITE" items={items} activeHref="/blog" />);
    const activeLinks = document.querySelectorAll('.eidotter-nav__link--active');
    expect(activeLinks.length).toBeGreaterThan(0);
  });

  it('applies retro variant by default', () => {
    const { container } = render(<Header brandName="SITE" items={items} />);
    expect(container.querySelector('.eidotter-header--retro')).toBeInTheDocument();
  });

  it('applies modern variant', () => {
    const { container } = render(<Header brandName="SITE" items={items} variant="modern" />);
    expect(container.querySelector('.eidotter-header--modern')).toBeInTheDocument();
  });

  it('is sticky by default', () => {
    const { container } = render(<Header brandName="SITE" items={items} />);
    const header = container.querySelector('.eidotter-header');
    expect(header).toHaveClass('sticky');
  });

  it('removes sticky when sticky={false}', () => {
    const { container } = render(<Header brandName="SITE" items={items} sticky={false} />);
    const header = container.querySelector('.eidotter-header');
    expect(header).not.toHaveClass('sticky');
  });

  it('passes variant to nav components', () => {
    const { container } = render(<Header brandName="SITE" items={items} variant="modern" />);
    expect(container.querySelector('.eidotter-nav--modern')).toBeInTheDocument();
  });

  it('uses custom linkComponent for branding and nav', () => {
    const CustomLink = ({
      href,
      children,
      ...props
    }: {
      href: string;
      children: React.ReactNode;
      className?: string;
      onClick?: () => void;
    }) => (
      <span data-href={href} {...props}>
        {children}
      </span>
    );
    render(<Header brandName="SITE" items={items} linkComponent={CustomLink} />);
    const brandingLink = screen.getByText('SITE').closest('span');
    expect(brandingLink).toHaveAttribute('data-href', '/');
    const projectLinks = screen.getAllByText('Projects');
    expect(projectLinks[0].closest('span')).toHaveAttribute('data-href', '/projects');
  });

  it('renders as a header element with banner role', () => {
    render(<Header brandName="SITE" items={items} />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Header brandName="SITE" items={items} className="custom-class" />,
    );
    expect(container.querySelector('.eidotter-header')).toHaveClass('custom-class');
  });

  it('spreads HTML attributes', () => {
    render(<Header brandName="SITE" items={items} data-testid="my-header" />);
    expect(screen.getByTestId('my-header')).toBeInTheDocument();
  });

  it('renders mobile hamburger', () => {
    render(<Header brandName="SITE" items={items} />);
    expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
  });
});
