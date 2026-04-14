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
    const CustomLink = ({ href, children, ...props }: { href: string; children: React.ReactNode; className?: string; onClick?: () => void }) => (
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
    const trigger = screen.getByRole('button', { name: 'Toggle navigation' });
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveClass('eidotter-nav__menu-trigger');
    expect(trigger).toHaveTextContent('MENU');
  });

  it('opens and closes panel via trigger and close button', () => {
    render(<MobileNav items={items} />);
    const trigger = screen.getByRole('button', { name: 'Toggle navigation' });
    fireEvent.click(trigger);
    expect(screen.getByLabelText('Mobile navigation')).toHaveClass('eidotter-nav__panel--open');

    const closeBtn = screen.getByRole('button', { name: 'Close navigation panel' });
    fireEvent.click(closeBtn);
    expect(screen.getByLabelText('Mobile navigation')).not.toHaveClass('eidotter-nav__panel--open');
  });

  it('renders items inside panel', () => {
    render(<MobileNav items={items} />);
    fireEvent.click(screen.getByRole('button', { name: 'Toggle navigation' }));
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
  });

  it('closes panel when clicking overlay', () => {
    render(<MobileNav items={items} />);
    fireEvent.click(screen.getByRole('button', { name: 'Toggle navigation' }));
    const overlay = document.querySelector('.eidotter-nav__overlay');
    expect(overlay).toBeInTheDocument();
    fireEvent.click(overlay!);
    expect(screen.getByLabelText('Mobile navigation')).not.toHaveClass('eidotter-nav__panel--open');
  });

  it('closes panel on Escape key', () => {
    render(<MobileNav items={items} />);
    fireEvent.click(screen.getByRole('button', { name: 'Toggle navigation' }));
    expect(screen.getByLabelText('Mobile navigation')).toHaveClass('eidotter-nav__panel--open');
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.getByLabelText('Mobile navigation')).not.toHaveClass('eidotter-nav__panel--open');
  });

  it('Escape key is a no-op when panel is closed', () => {
    render(<MobileNav items={items} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.getByLabelText('Mobile navigation')).not.toHaveClass('eidotter-nav__panel--open');
  });

  it('closes panel when clicking a nav item', () => {
    render(<MobileNav items={items} />);
    fireEvent.click(screen.getByRole('button', { name: 'Toggle navigation' }));
    expect(screen.getByLabelText('Mobile navigation')).toHaveClass('eidotter-nav__panel--open');
    fireEvent.click(screen.getByText('Projects'));
    expect(screen.getByLabelText('Mobile navigation')).not.toHaveClass('eidotter-nav__panel--open');
  });

  it('panel has aria-controls linking trigger to panel', () => {
    render(<MobileNav items={items} />);
    const trigger = screen.getByRole('button', { name: 'Toggle navigation' });
    expect(trigger).toHaveAttribute('aria-controls', 'eidotter-mobile-nav-panel');
    expect(screen.getByLabelText('Mobile navigation')).toHaveAttribute('id', 'eidotter-mobile-nav-panel');
  });

  it('toggles aria-expanded on trigger', () => {
    render(<MobileNav items={items} />);
    const trigger = screen.getByRole('button', { name: 'Toggle navigation' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('panel has aria-hidden and inert when closed', () => {
    render(<MobileNav items={items} />);
    const panel = screen.getByLabelText('Mobile navigation');
    expect(panel).toHaveAttribute('aria-hidden', 'true');
    expect(panel).toHaveAttribute('inert');

    fireEvent.click(screen.getByRole('button', { name: 'Toggle navigation' }));
    expect(panel).toHaveAttribute('aria-hidden', 'false');
    expect(panel).not.toHaveAttribute('inert');
  });

  it('marks active item', () => {
    render(<MobileNav items={items} activeHref="/blog" />);
    fireEvent.click(screen.getByRole('button', { name: 'Toggle navigation' }));
    expect(screen.getByText('Blog')).toHaveClass('eidotter-nav__link--active');
  });

  it('uses custom linkComponent with onClick forwarding', () => {
    const CustomLink = ({ href, children, onClick: handleClick, ...props }: { href: string; children: React.ReactNode; className?: string; onClick?: () => void }) => (
      <span data-href={href} onClick={handleClick} {...props}>{children}</span>
    );
    render(<MobileNav items={items} linkComponent={CustomLink} />);
    fireEvent.click(screen.getByRole('button', { name: 'Toggle navigation' }));
    fireEvent.click(screen.getByText('Projects'));
    // Panel should close via the onClick={close} forwarded through linkComponent
    expect(screen.getByLabelText('Mobile navigation')).not.toHaveClass('eidotter-nav__panel--open');
  });

  it('overlay is not rendered when panel is closed', () => {
    render(<MobileNav items={items} />);
    expect(document.querySelector('.eidotter-nav__overlay')).toBeNull();
  });
});

describe('Nav', () => {
  it('renders both mobile and desktop navs', () => {
    const { container } = render(<Nav items={items} />);
    expect(container.querySelector('.eidotter-nav--mobile')).toBeInTheDocument();
    expect(container.querySelector('.eidotter-nav--desktop')).toBeInTheDocument();
  });
});
