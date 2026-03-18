import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TimelineEntry } from './TimelineEntry';

describe('TimelineEntry', () => {
  it('renders date and title', () => {
    render(<TimelineEntry date="Mar 18, 2026" title="Test Entry" />);
    expect(screen.getByText('Mar 18, 2026')).toBeInTheDocument();
    expect(screen.getByText('Test Entry')).toBeInTheDocument();
  });

  it('renders type badge', () => {
    render(<TimelineEntry date="Mar 18, 2026" title="Test" type="project" />);
    expect(screen.getByText('PROJECT')).toBeInTheDocument();
  });

  it('renders tags', () => {
    render(<TimelineEntry date="Mar 18, 2026" title="Test" tags={['foo', 'bar']} />);
    expect(screen.getByText('#foo #bar')).toBeInTheDocument();
  });

  it('expands on click when has children', () => {
    render(
      <TimelineEntry date="Mar 18, 2026" title="Test">
        <p>Expanded content</p>
      </TimelineEntry>
    );
    expect(screen.queryByText('Expanded content')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Expanded content')).toBeInTheDocument();
  });

  it('does not render as button when no children', () => {
    const { container } = render(<TimelineEntry date="Mar 18, 2026" title="Test" />);
    expect(container.querySelector('[role="button"]')).not.toBeInTheDocument();
  });

  it('respects defaultExpanded', () => {
    render(
      <TimelineEntry date="Mar 18, 2026" title="Test" defaultExpanded>
        <p>Already visible</p>
      </TimelineEntry>
    );
    expect(screen.getByText('Already visible')).toBeInTheDocument();
  });
});
