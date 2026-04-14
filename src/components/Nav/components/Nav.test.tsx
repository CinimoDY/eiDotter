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

  it('renders items in a list', () => {
    render(<DesktopNav items={items} />);
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
    expect(list.querySelectorAll('li')).toHaveLength(3);
  });

  it('marks active item', () => {
    render(<DesktopNav items={items} activeHref="/blog" />);
    const blogLink = screen.getByText('Blog');
    expect(blogLink).toHaveClass('eidotter-nav__link--active');
  });

  it('applies retro variant by default', () => {
    const { container } = render(<DesktopNav items={items} />);
    expect(container.querySelector('.eidotter-nav--retro')).toBeInTheDocument();
  });

  it('applies modern variant', () => {
    const { container } = render(<DesktopNav items={items} variant="modern" />);
    expect(container.querySelector('.eidotter-nav--modern')).toBeInTheDocument();
  });

  it('uses custom linkComponent', () => {
    const CustomLink = ({ href, children, ...props }: { href: string; children: React.ReactNode; className?: string }) => (
      <span data-href={href} {...props}>{children}</span>
    );
    render(<DesktopNav items={items} linkComponent={CustomLink} />);
    const link = screen.getByText('Projects');
    expect(link.closest('span')).toHaveAttribute('data-href', '/projects');
  });
});

describe('MobileNav', () => {
  it('renders MENU trigger button', () => {
    render(<MobileNav items={items} />);
    const trigger = screen.getByLabelText('Open menu');
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveClass('eidotter-nav__menu-trigger');
    expect(trigger).toHaveTextContent('MENU');
  });

  it('opens and closes panel via trigger and close button', () => {
    render(<MobileNav items={items} />);
    fireEvent.click(screen.getByLabelText('Open menu'));
    expect(screen.getByLabelText('Mobile navigation')).toHaveClass('eidotter-nav__panel--open');

    const panelClose = document.querySelector('.eidotter-nav__close') as HTMLElement;
    fireEvent.click(panelClose);
    expect(screen.getByLabelText('Mobile navigation')).not.toHaveClass('eidotter-nav__panel--open');
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
    const overlay = document.querySelector('.eidotter-nav__overlay');
    expect(overlay).toBeInTheDocument();
    fireEvent.click(overlay!);
    expect(screen.getByLabelText('Mobile navigation')).not.toHaveClass('eidotter-nav__panel--open');
  });

  it('closes panel on Escape key', () => {
    render(<MobileNav items={items} />);
    fireEvent.click(screen.getByLabelText('Open menu'));
    expect(screen.getByLabelText('Mobile navigation')).toHaveClass('eidotter-nav__panel--open');
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.getByLabelText('Mobile navigation')).not.toHaveClass('eidotter-nav__panel--open');
  });

  it('panel has aria-controls linking trigger to panel', () => {
    render(<MobileNav items={items} />);
    const trigger = screen.getByLabelText('Open menu');
    expect(trigger).toHaveAttribute('aria-controls', 'eidotter-mobile-nav-panel');
    expect(screen.getByLabelText('Mobile navigation')).toHaveAttribute('id', 'eidotter-mobile-nav-panel');
  });
});

describe('Nav', () => {
  it('renders both mobile and desktop navs', () => {
    const { container } = render(<Nav items={items} />);
    expect(container.querySelector('.eidotter-nav--mobile')).toBeInTheDocument();
    expect(container.querySelector('.eidotter-nav--desktop')).toBeInTheDocument();
  });
});
