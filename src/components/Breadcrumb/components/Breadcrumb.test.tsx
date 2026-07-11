import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Breadcrumb } from './Breadcrumb';

describe('Breadcrumb', () => {
  const defaultTrail = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
  ];

  describe('rendering', () => {
    it('renders with current label only', () => {
      render(<Breadcrumb currentLabel="Current Page" />);
      expect(screen.getByText('Current Page')).toBeInTheDocument();
    });

    it('renders trail items', () => {
      render(<Breadcrumb trail={defaultTrail} currentLabel="Details" />);
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Products')).toBeInTheDocument();
      expect(screen.getByText('Details')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Breadcrumb currentLabel="Page" className="custom-class" />);
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('custom-class');
    });

    it('renders as nav element', () => {
      render(<Breadcrumb currentLabel="Page" />);
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('renders trail items as links', () => {
      render(<Breadcrumb trail={defaultTrail} currentLabel="Details" />);
      const homeLink = screen.getByText('Home').closest('a');
      expect(homeLink).toHaveAttribute('href', '/');
      const productsLink = screen.getByText('Products').closest('a');
      expect(productsLink).toHaveAttribute('href', '/products');
    });

    it('current item is not a link', () => {
      render(<Breadcrumb trail={defaultTrail} currentLabel="Details" />);
      const currentItem = screen.getByText('Details');
      expect(currentItem.closest('a')).toBeNull();
    });
  });

  describe('separator', () => {
    it('uses default separator', () => {
      render(<Breadcrumb trail={defaultTrail} currentLabel="Details" />);
      const separators = document.querySelectorAll('[aria-hidden="true"]');
      const sepTexts = Array.from(separators).filter(el => el.textContent === '/');
      expect(sepTexts.length).toBeGreaterThan(0);
    });

    it('uses custom separator', () => {
      render(<Breadcrumb trail={defaultTrail} currentLabel="Details" separator=">" />);
      const separators = document.querySelectorAll('[aria-hidden="true"]');
      const sepTexts = Array.from(separators).filter(el => el.textContent === '>');
      expect(sepTexts.length).toBeGreaterThan(0);
    });

    it('separator has aria-hidden', () => {
      render(<Breadcrumb trail={defaultTrail} currentLabel="Details" />);
      const separators = document.querySelectorAll('[aria-hidden="true"]');
      const sepTexts = Array.from(separators).filter(el => el.textContent === '/');
      sepTexts.forEach(sep => {
        expect(sep).toHaveAttribute('aria-hidden', 'true');
      });
    });
  });

  describe('back arrow', () => {
    it('shows back arrow on last trail item by default', () => {
      render(<Breadcrumb trail={defaultTrail} currentLabel="Details" />);
      expect(screen.getByText('<')).toBeInTheDocument();
    });

    it('hides back arrow when showBackArrow is false', () => {
      render(<Breadcrumb trail={defaultTrail} currentLabel="Details" showBackArrow={false} />);
      expect(screen.queryByText('<')).not.toBeInTheDocument();
    });

    it('back arrow has aria-hidden', () => {
      render(<Breadcrumb trail={defaultTrail} currentLabel="Details" />);
      expect(screen.getByText('<')).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('custom link component', () => {
    it('uses custom link component when provided', () => {
      const CustomLink: React.FC<{ href: string; className?: string; children: React.ReactNode }> =
        ({ href, className, children }) => (
          <a href={href} className={className} data-custom="true">
            {children}
          </a>
        );

      render(
        <Breadcrumb
          trail={defaultTrail}
          currentLabel="Details"
          linkComponent={CustomLink}
        />
      );

      const customLinks = document.querySelectorAll('[data-custom="true"]');
      expect(customLinks.length).toBe(2);
    });

    it('falls back to anchor when no link component provided', () => {
      render(<Breadcrumb trail={defaultTrail} currentLabel="Details" />);
      const links = document.querySelectorAll('.eidotter-breadcrumb__link');
      expect(links[0].tagName).toBe('A');
    });
  });

  describe('accessibility', () => {
    it('has aria-label on nav', () => {
      render(<Breadcrumb currentLabel="Page" />);
      expect(screen.getByLabelText('Breadcrumb')).toBeInTheDocument();
    });

    it('current item has aria-current="page"', () => {
      render(<Breadcrumb trail={defaultTrail} currentLabel="Details" />);
      const currentItem = screen.getByText('Details').closest('li');
      expect(currentItem).toHaveAttribute('aria-current', 'page');
    });

    it('trail items do not have aria-current', () => {
      render(<Breadcrumb trail={defaultTrail} currentLabel="Details" />);
      const homeItem = screen.getByText('Home').closest('li');
      expect(homeItem).not.toHaveAttribute('aria-current');
    });

    it('renders as ordered list', () => {
      render(<Breadcrumb trail={defaultTrail} currentLabel="Details" />);
      const nav = screen.getByRole('navigation');
      const list = nav.querySelector('ol');
      expect(list).toBeInTheDocument();
    });
  });

  describe('empty trail', () => {
    it('renders only current label when trail is empty', () => {
      render(<Breadcrumb trail={[]} currentLabel="Only Page" />);
      expect(screen.getByText('Only Page')).toBeInTheDocument();
      const links = document.querySelectorAll('.eidotter-breadcrumb__link');
      expect(links.length).toBe(0);
    });

    it('does not render separator before current when no trail', () => {
      render(<Breadcrumb trail={[]} currentLabel="Only Page" />);
      const separators = document.querySelectorAll('[aria-hidden="true"]');
      const sepTexts = Array.from(separators).filter(el => el.textContent === '/');
      expect(sepTexts.length).toBe(0);
    });
  });

  describe('onClick support', () => {
    it('renders trail item with onClick as a button, not an anchor', () => {
      const handleClick = jest.fn();
      const trail = [{ label: 'Back', onClick: handleClick }];
      render(<Breadcrumb trail={trail} currentLabel="Details" />);
      const button = screen.getByText('Back').closest('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('eidotter-breadcrumb__link');
      expect(screen.getByText('Back').closest('a')).toBeNull();
    });

    it('fires onClick callback when button trail item is clicked', () => {
      const handleClick = jest.fn();
      const trail = [{ label: 'Back', onClick: handleClick }];
      render(<Breadcrumb trail={trail} currentLabel="Details" />);
      const button = screen.getByText('Back').closest('button')!;
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('trail items with href still render as anchor tags', () => {
      const trail = [{ href: '/home', label: 'Home' }];
      render(<Breadcrumb trail={trail} currentLabel="Details" />);
      const anchor = screen.getByText('Home').closest('a');
      expect(anchor).toBeInTheDocument();
      expect(anchor).toHaveAttribute('href', '/home');
    });

    it('onClick takes precedence over href', () => {
      const handleClick = jest.fn();
      const trail = [{ href: '/home', label: 'Home', onClick: handleClick }];
      render(<Breadcrumb trail={trail} currentLabel="Details" />);
      const button = screen.getByText('Home').closest('button');
      expect(button).toBeInTheDocument();
      expect(screen.getByText('Home').closest('a')).toBeNull();
    });
  });

  describe('class composition', () => {
    it('current item has aria-current page', () => {
      render(<Breadcrumb currentLabel="Current" />);
      const currentItem = screen.getByText('Current').closest('li');
      expect(currentItem).toHaveAttribute('aria-current', 'page');
    });

    it('nav has eidotter-breadcrumb class', () => {
      render(<Breadcrumb trail={defaultTrail} currentLabel="Details" />);
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('eidotter-breadcrumb');
    });
  });

  describe('href safety', () => {
    it('renders the label without an anchor when href uses an unsafe scheme', () => {
      const trail = [{ href: 'javascript:alert(1)', label: 'Danger' }];
      render(<Breadcrumb trail={trail} currentLabel="Details" showBackArrow={false} />);
      expect(screen.getByText('Danger')).toBeInTheDocument();
      expect(screen.queryByRole('link', { name: 'Danger' })).not.toBeInTheDocument();
      expect(screen.getByText('Danger').closest('a')).toBeNull();
    });

    it('renders a safe relative href as a normal link (regression guard)', () => {
      const trail = [{ href: '/projects', label: 'Projects' }];
      render(<Breadcrumb trail={trail} currentLabel="Details" showBackArrow={false} />);
      const link = screen.getByRole('link', { name: 'Projects' });
      expect(link).toHaveAttribute('href', '/projects');
    });

    it('drops the anchor for an unsafe href through a custom linkComponent', () => {
      const CustomLink: React.FC<{ href: string; className?: string; children: React.ReactNode }> =
        ({ href, className, children }) => (
          <a href={href} className={className} data-custom="true">
            {children}
          </a>
        );
      const trail = [{ href: 'javascript:alert(1)', label: 'Danger' }];
      render(
        <Breadcrumb trail={trail} currentLabel="Details" linkComponent={CustomLink} showBackArrow={false} />,
      );
      expect(screen.getByText('Danger')).toBeInTheDocument();
      expect(document.querySelectorAll('[data-custom="true"]').length).toBe(0);
    });
  });
});
