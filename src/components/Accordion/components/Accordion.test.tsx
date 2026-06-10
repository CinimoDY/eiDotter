import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Section } from './Section';
import { AccordionFill } from './AccordionFill';

describe('Section', () => {
  describe('rendering', () => {
    it('renders with title', () => {
      render(<Section title="Test Section">Content</Section>);
      expect(screen.getByText('Test Section')).toBeInTheDocument();
    });

    it('renders children when expanded', () => {
      render(<Section title="Title" defaultExpanded>Expanded Content</Section>);
      expect(screen.getByText('Expanded Content')).toBeInTheDocument();
    });

    it('hides children when collapsed via inert and CSS', () => {
      render(<Section title="Title">Hidden Content</Section>);
      const content = document.querySelector('.eidotter-section__content');
      expect(content).toBeInTheDocument();
      expect(content).toHaveAttribute('inert');
    });

    it('wraps children in the grid-row inner element (DMNC-928)', () => {
      render(<Section title="Title" defaultExpanded>Tall Content</Section>);
      const inner = document.querySelector(
        '.eidotter-section__content > .eidotter-section__content-inner',
      );
      expect(inner).toBeInTheDocument();
      expect(inner).toHaveTextContent('Tall Content');
    });

    it('renders header as button', () => {
      render(<Section title="Title">Content</Section>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('toggle behavior', () => {
    it('expands when clicked', () => {
      render(<Section title="Title">Content</Section>);
      const content = document.querySelector('.eidotter-section__content');
      expect(content).toHaveAttribute('inert');
      fireEvent.click(screen.getByRole('button'));
      expect(content).not.toHaveAttribute('inert');
    });

    it('collapses when clicked while expanded', () => {
      render(<Section title="Title" defaultExpanded>Content</Section>);
      const content = document.querySelector('.eidotter-section__content');
      expect(content).not.toHaveAttribute('inert');
      fireEvent.click(screen.getByRole('button'));
      expect(content).toHaveAttribute('inert');
    });

    it('calls onToggle with new state', () => {
      const onToggle = jest.fn();
      render(<Section title="Title" onToggle={onToggle}>Content</Section>);
      fireEvent.click(screen.getByRole('button'));
      expect(onToggle).toHaveBeenCalledWith(true);
      fireEvent.click(screen.getByRole('button'));
      expect(onToggle).toHaveBeenCalledWith(false);
    });
  });

  describe('defaultExpanded', () => {
    it('starts collapsed by default', () => {
      render(<Section title="Title">Content</Section>);
      const content = document.querySelector('.eidotter-section__content');
      expect(content).toHaveAttribute('inert');
    });

    it('starts expanded when defaultExpanded is true', () => {
      render(<Section title="Title" defaultExpanded>Content</Section>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('updates when defaultExpanded prop changes', () => {
      const { rerender } = render(<Section title="Title" defaultExpanded={false}>Content</Section>);
      const content = document.querySelector('.eidotter-section__content');
      expect(content).toHaveAttribute('inert');
      rerender(<Section title="Title" defaultExpanded={true}>Content</Section>);
      expect(content).not.toHaveAttribute('inert');
    });
  });

  describe('state classes', () => {
    it('applies expanded class when expanded', () => {
      render(<Section title="Title" defaultExpanded>Content</Section>);
      const section = document.querySelector('.eidotter-section');
      expect(section).toHaveClass('eidotter-section--expanded');
    });

    it('applies hover class when isHovered', () => {
      render(<Section title="Title" isHovered>Content</Section>);
      const section = document.querySelector('.eidotter-section');
      expect(section).toHaveClass('eidotter-section--hover');
    });

    it('applies active class when isActive', () => {
      render(<Section title="Title" isActive>Content</Section>);
      const section = document.querySelector('.eidotter-section');
      expect(section).toHaveClass('eidotter-section--active');
    });
  });

  describe('accessibility', () => {
    it('has aria-expanded false when collapsed', () => {
      render(<Section title="Title">Content</Section>);
      expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
    });

    it('has aria-expanded true when expanded', () => {
      render(<Section title="Title" defaultExpanded>Content</Section>);
      expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
    });

    it('updates aria-expanded on toggle', () => {
      render(<Section title="Title">Content</Section>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-expanded', 'false');
      fireEvent.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });
  });
});

describe('AccordionFill', () => {
  const defaultSections = [
    { title: 'Section 1', content: 'Content 1' },
    { title: 'Section 2', content: 'Content 2' },
    { title: 'Section 3', content: 'Content 3' },
  ];

  describe('rendering', () => {
    it('renders all section titles', () => {
      render(<AccordionFill sections={defaultSections} />);
      expect(screen.getByText('Section 1')).toBeInTheDocument();
      expect(screen.getByText('Section 2')).toBeInTheDocument();
      expect(screen.getByText('Section 3')).toBeInTheDocument();
    });

    it('renders in accordion-fill container', () => {
      render(<AccordionFill sections={defaultSections} />);
      expect(document.querySelector('.eidotter-accordion-fill')).toBeInTheDocument();
    });

    it('renders empty when no sections', () => {
      render(<AccordionFill sections={[]} />);
      expect(document.querySelector('.eidotter-accordion-fill')).toBeInTheDocument();
      expect(screen.queryAllByRole('button').length).toBe(0);
    });
  });

  describe('defaultExpandedIndex', () => {
    it('starts with all collapsed by default', () => {
      render(<AccordionFill sections={defaultSections} />);
      const contents = document.querySelectorAll('.eidotter-section__content');
      contents.forEach(content => {
        expect(content).toHaveAttribute('inert');
      });
    });

    it('expands section at defaultExpandedIndex', () => {
      render(<AccordionFill sections={defaultSections} defaultExpandedIndex={1} />);
      const contents = document.querySelectorAll('.eidotter-section__content');
      expect(contents[0]).toHaveAttribute('inert');
      expect(contents[1]).not.toHaveAttribute('inert');
      expect(contents[2]).toHaveAttribute('inert');
    });

    it('expands first section when defaultExpandedIndex is 0', () => {
      render(<AccordionFill sections={defaultSections} defaultExpandedIndex={0} />);
      expect(screen.getByText('Content 1')).toBeInTheDocument();
    });
  });

  describe('toggle behavior', () => {
    it('clicking section expands it', () => {
      render(<AccordionFill sections={defaultSections} />);
      fireEvent.click(screen.getByText('Section 1'));
      expect(screen.getByText('Content 1')).toBeInTheDocument();
    });

    it('clicking expanded section collapses it', () => {
      render(<AccordionFill sections={defaultSections} defaultExpandedIndex={0} />);
      const content = document.querySelectorAll('.eidotter-section__content')[0];
      expect(content).not.toHaveAttribute('inert');
      fireEvent.click(screen.getByText('Section 1'));
      expect(content).toHaveAttribute('inert');
    });

    it('multiple sections can be expanded independently', () => {
      render(<AccordionFill sections={defaultSections} />);
      fireEvent.click(screen.getByText('Section 1'));
      fireEvent.click(screen.getByText('Section 2'));
      // Each section manages its own state
      expect(screen.getByText('Content 1')).toBeInTheDocument();
      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });
  });
});
