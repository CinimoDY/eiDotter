import React from 'react';
import { render, screen } from '@testing-library/react';
import { SectionHeading } from './SectionHeading';

describe('SectionHeading', () => {
  it('renders the title in an h3', () => {
    render(<SectionHeading title="Documents" />);
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Documents');
  });

  it('applies uppercase + stable hook class', () => {
    render(<SectionHeading title="Documents" />);
    const h = screen.getByRole('heading', { level: 3 });
    expect(h).toHaveClass('uppercase');
    expect(h).toHaveClass('eidotter-section-heading');
  });

  it('renders a trailing count in parentheses', () => {
    render(<SectionHeading title="Open actions" count={9} />);
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Open actions (9)');
  });

  it('omits the count when not provided', () => {
    render(<SectionHeading title="Open actions" />);
    expect(screen.getByRole('heading', { level: 3 }).textContent).toBe('Open actions');
  });

  it('applies tone colour classes', () => {
    const { rerender } = render(<SectionHeading title="X" tone="default" />);
    expect(screen.getByRole('heading', { level: 3 })).toHaveClass('text-dos-text-primary');
    rerender(<SectionHeading title="X" tone="error" />);
    expect(screen.getByRole('heading', { level: 3 })).toHaveClass('text-dos-error');
    rerender(<SectionHeading title="X" tone="warning" />);
    expect(screen.getByRole('heading', { level: 3 })).toHaveClass('text-dos-warning');
    rerender(<SectionHeading title="X" tone="info" />);
    expect(screen.getByRole('heading', { level: 3 })).toHaveClass('text-dos-info');
  });

  it('renders children after the title', () => {
    render(
      <SectionHeading title="X">
        <span data-testid="child">child</span>
      </SectionHeading>,
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('merges a custom className', () => {
    render(<SectionHeading title="X" className="custom-class" />);
    expect(screen.getByRole('heading', { level: 3 })).toHaveClass('custom-class');
  });
});
