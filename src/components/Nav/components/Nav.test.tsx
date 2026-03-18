import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Nav, DesktopNav, MobileNav } from './Nav';

const items = [
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

describe('DesktopNav', () => {
  it('renders all nav items', () => {
    render(<DesktopNav items={items} />);
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('marks active item', () => {
    render(<DesktopNav items={items} activeHref="/blog" />);
    const blogLink = screen.getByText('Blog');
    expect(blogLink).toHaveClass('nav__link--active');
  });

  it('applies retro variant by default', () => {
    const { container } = render(<DesktopNav items={items} />);
    expect(container.querySelector('.nav--retro')).toBeInTheDocument();
  });

  it('applies modern variant', () => {
    const { container } = render(<DesktopNav items={items} variant="modern" />);
    expect(container.querySelector('.nav--modern')).toBeInTheDocument();
  });

  it('uses custom LinkComponent', () => {
    const CustomLink = ({ href, children, ...props }: { href: string; children: React.ReactNode; className?: string }) => (
      <span data-href={href} {...props}>{children}</span>
    );
    render(<DesktopNav items={items} LinkComponent={CustomLink} />);
    const link = screen.getByText('Projects');
    expect(link.closest('span')).toHaveAttribute('data-href', '/projects');
  });
});

describe('MobileNav', () => {
  it('renders hamburger button', () => {
    render(<MobileNav items={items} />);
    expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
  });

  it('opens and closes panel', () => {
    render(<MobileNav items={items} />);
    const hamburger = screen.getByLabelText('Open menu');
    fireEvent.click(hamburger);
    expect(screen.getByLabelText('Mobile navigation')).toHaveClass('nav__panel--open');

    const closeButtons = screen.getAllByLabelText('Close menu');
    const panelClose = closeButtons.find(el => el.classList.contains('nav__close'))!;
    fireEvent.click(panelClose);
    expect(screen.getByLabelText('Mobile navigation')).not.toHaveClass('nav__panel--open');
  });

  it('renders items inside panel', () => {
    render(<MobileNav items={items} />);
    fireEvent.click(screen.getByLabelText('Open menu'));
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
  });

  it('closes panel when clicking overlay', () => {
    render(<MobileNav items={items} />);
    fireEvent.click(screen.getByLabelText('Open menu'));
    const overlay = document.querySelector('.nav__overlay');
    expect(overlay).toBeInTheDocument();
    fireEvent.click(overlay!);
    expect(screen.getByLabelText('Mobile navigation')).not.toHaveClass('nav__panel--open');
  });
});

describe('Nav', () => {
  it('renders both mobile and desktop navs', () => {
    const { container } = render(<Nav items={items} />);
    expect(container.querySelector('.nav--mobile')).toBeInTheDocument();
    expect(container.querySelector('.nav--desktop')).toBeInTheDocument();
  });
});
