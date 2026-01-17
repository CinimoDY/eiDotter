import React from 'react';
import { render, screen } from '@testing-library/react';
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
      const separators = document.querySelectorAll('.breadcrumb__separator');
      expect(separators.length).toBeGreaterThan(0);
      expect(separators[0].textContent).toBe('/');
    });

    it('uses custom separator', () => {
      render(<Breadcrumb trail={defaultTrail} currentLabel="Details" separator=">" />);
      const separators = document.querySelectorAll('.breadcrumb__separator');
      expect(separators[0].textContent).toBe('>');
    });

    it('separator has aria-hidden', () => {
      render(<Breadcrumb trail={defaultTrail} currentLabel="Details" />);
      const separators = document.querySelectorAll('.breadcrumb__separator');
      separators.forEach(sep => {
        expect(sep).toHaveAttribute('aria-hidden', 'true');
      });
    });
  });

  describe('back arrow', () => {
    it('shows back arrow on last trail item by default', () => {
      render(<Breadcrumb trail={defaultTrail} currentLabel="Details" />);
      const backArrow = document.querySelector('.breadcrumb__back-arrow');
      expect(backArrow).toBeInTheDocument();
    });

    it('hides back arrow when showBackArrow is false', () => {
      render(<Breadcrumb trail={defaultTrail} currentLabel="Details" showBackArrow={false} />);
      const backArrow = document.querySelector('.breadcrumb__back-arrow');
      expect(backArrow).not.toBeInTheDocument();
    });

    it('back arrow has aria-hidden', () => {
      render(<Breadcrumb trail={defaultTrail} currentLabel="Details" />);
      const backArrow = document.querySelector('.breadcrumb__back-arrow');
      expect(backArrow).toHaveAttribute('aria-hidden', 'true');
    });

    it('back arrow appears on last trail item only', () => {
      render(<Breadcrumb trail={defaultTrail} currentLabel="Details" />);
      const backArrows = document.querySelectorAll('.breadcrumb__back-arrow');
      expect(backArrows.length).toBe(1);
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
      const links = document.querySelectorAll('.breadcrumb__link');
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
      const list = document.querySelector('.breadcrumb__list');
      expect(list?.tagName).toBe('OL');
    });
  });

  describe('empty trail', () => {
    it('renders only current label when trail is empty', () => {
      render(<Breadcrumb trail={[]} currentLabel="Only Page" />);
      expect(screen.getByText('Only Page')).toBeInTheDocument();
      const links = document.querySelectorAll('.breadcrumb__link');
      expect(links.length).toBe(0);
    });

    it('does not render separator before current when no trail', () => {
      render(<Breadcrumb trail={[]} currentLabel="Only Page" />);
      const separators = document.querySelectorAll('.breadcrumb__separator');
      expect(separators.length).toBe(0);
    });
  });

  describe('class composition', () => {
    it('applies current item class', () => {
      render(<Breadcrumb currentLabel="Current" />);
      const currentItem = screen.getByText('Current').closest('li');
      expect(currentItem).toHaveClass('breadcrumb__item--current');
    });

    it('trail items have item class', () => {
      render(<Breadcrumb trail={defaultTrail} currentLabel="Details" />);
      const items = document.querySelectorAll('.breadcrumb__item');
      expect(items.length).toBeGreaterThan(1);
    });
  });
});
