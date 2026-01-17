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

    it('does not render children when collapsed', () => {
      render(<Section title="Title">Hidden Content</Section>);
      expect(screen.queryByText('Hidden Content')).not.toBeInTheDocument();
    });

    it('renders header as button', () => {
      render(<Section title="Title">Content</Section>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('toggle behavior', () => {
    it('expands when clicked', () => {
      render(<Section title="Title">Content</Section>);
      expect(screen.queryByText('Content')).not.toBeInTheDocument();
      fireEvent.click(screen.getByRole('button'));
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('collapses when clicked while expanded', () => {
      render(<Section title="Title" defaultExpanded>Content</Section>);
      expect(screen.getByText('Content')).toBeInTheDocument();
      fireEvent.click(screen.getByRole('button'));
      expect(screen.queryByText('Content')).not.toBeInTheDocument();
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
      expect(screen.queryByText('Content')).not.toBeInTheDocument();
    });

    it('starts expanded when defaultExpanded is true', () => {
      render(<Section title="Title" defaultExpanded>Content</Section>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('updates when defaultExpanded prop changes', () => {
      const { rerender } = render(<Section title="Title" defaultExpanded={false}>Content</Section>);
      expect(screen.queryByText('Content')).not.toBeInTheDocument();
      rerender(<Section title="Title" defaultExpanded={true}>Content</Section>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  describe('state classes', () => {
    it('applies expanded class when expanded', () => {
      render(<Section title="Title" defaultExpanded>Content</Section>);
      const section = document.querySelector('.section');
      expect(section).toHaveClass('section--expanded');
    });

    it('applies hover class when isHovered', () => {
      render(<Section title="Title" isHovered>Content</Section>);
      const section = document.querySelector('.section');
      expect(section).toHaveClass('section--hover');
    });

    it('applies active class when isActive', () => {
      render(<Section title="Title" isActive>Content</Section>);
      const section = document.querySelector('.section');
      expect(section).toHaveClass('section--active');
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
      expect(document.querySelector('.accordion-fill')).toBeInTheDocument();
    });

    it('renders empty when no sections', () => {
      render(<AccordionFill sections={[]} />);
      expect(document.querySelector('.accordion-fill')).toBeInTheDocument();
      expect(screen.queryAllByRole('button').length).toBe(0);
    });
  });

  describe('defaultExpandedIndex', () => {
    it('starts with all collapsed by default', () => {
      render(<AccordionFill sections={defaultSections} />);
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
      expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
      expect(screen.queryByText('Content 3')).not.toBeInTheDocument();
    });

    it('expands section at defaultExpandedIndex', () => {
      render(<AccordionFill sections={defaultSections} defaultExpandedIndex={1} />);
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
      expect(screen.getByText('Content 2')).toBeInTheDocument();
      expect(screen.queryByText('Content 3')).not.toBeInTheDocument();
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
      expect(screen.getByText('Content 1')).toBeInTheDocument();
      fireEvent.click(screen.getByText('Section 1'));
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
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
