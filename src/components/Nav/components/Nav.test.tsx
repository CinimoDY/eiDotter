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
    expect(blogLink).toHaveAttribute('aria-current', 'page');
    expect(screen.getByText('Projects')).not.toHaveAttribute('aria-current');
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

  // DMNC-1061 — overlay a11y
  describe('overlay accessibility', () => {
    it('panel is inert when closed and not inert when open', () => {
      render(<MobileNav items={items} />);
      const panel = screen.getByLabelText('Mobile navigation');
      expect(panel).toHaveAttribute('inert');
      fireEvent.click(screen.getByLabelText('Open menu'));
      expect(panel).not.toHaveAttribute('inert');
    });

    it('moves focus to the close button when opened', () => {
      render(<MobileNav items={items} />);
      fireEvent.click(screen.getByLabelText('Open menu'));
      expect(document.querySelector('.eidotter-nav__close')).toHaveFocus();
    });

    it('restores focus to the MENU trigger when closed', () => {
      render(<MobileNav items={items} />);
      fireEvent.click(screen.getByLabelText('Open menu'));
      fireEvent.click(document.querySelector('.eidotter-nav__close') as HTMLElement);
      expect(screen.getByLabelText('Open menu')).toHaveFocus();
    });

    it('traps Tab from the last focusable back to the first', () => {
      render(<MobileNav items={items} />);
      fireEvent.click(screen.getByLabelText('Open menu'));
      const panel = screen.getByLabelText('Mobile navigation');
      const links = panel.querySelectorAll('a');
      (links[links.length - 1] as HTMLElement).focus();
      fireEvent.keyDown(panel, { key: 'Tab' });
      expect(document.querySelector('.eidotter-nav__close')).toHaveFocus();
    });

    it('traps Shift+Tab from the first focusable to the last', () => {
      render(<MobileNav items={items} />);
      fireEvent.click(screen.getByLabelText('Open menu'));
      const panel = screen.getByLabelText('Mobile navigation');
      (document.querySelector('.eidotter-nav__close') as HTMLElement).focus();
      fireEvent.keyDown(panel, { key: 'Tab', shiftKey: true });
      const links = panel.querySelectorAll('a');
      expect(links[links.length - 1]).toHaveFocus();
    });

    it('marks the active link with aria-current in the panel', () => {
      render(<MobileNav items={items} activeHref="/blog" />);
      expect(screen.getByText('Blog')).toHaveAttribute('aria-current', 'page');
      expect(screen.getByText('Projects')).not.toHaveAttribute('aria-current');
    });
  });
});

describe('Nav', () => {
  it('renders both mobile and desktop navs', () => {
    const { container } = render(<Nav items={items} />);
    expect(container.querySelector('.eidotter-nav--mobile')).toBeInTheDocument();
    expect(container.querySelector('.eidotter-nav--desktop')).toBeInTheDocument();
  });
});
