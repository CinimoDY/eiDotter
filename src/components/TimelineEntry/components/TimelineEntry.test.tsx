import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TimelineItem } from './TimelineEntry';

describe('TimelineItem', () => {
  it('renders date and title', () => {
    render(<TimelineItem date="Mar 18, 2026" title="Test Entry" />);
    expect(screen.getByText('Mar 18, 2026')).toBeInTheDocument();
    expect(screen.getByText('Test Entry')).toBeInTheDocument();
  });

  it('renders type badge', () => {
    render(<TimelineItem date="Mar 18, 2026" title="Test" type="project" />);
    expect(screen.getByText('PROJECT')).toBeInTheDocument();
  });

  it('renders tags without truncation', () => {
    render(<TimelineItem date="Mar 18, 2026" title="Test" tags={['foo', 'bar', 'baz', 'qux']} />);
    expect(screen.getByText('#foo #bar #baz #qux')).toBeInTheDocument();
  });

  it('expands on click when has children', () => {
    render(
      <TimelineItem date="Mar 18, 2026" title="Test">
        <p>Expanded content</p>
      </TimelineItem>
    );
    expect(screen.queryByText('Expanded content')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Expanded content')).toBeInTheDocument();
  });

  it('expands on Space key', () => {
    render(
      <TimelineItem date="Mar 18, 2026" title="Test">
        <p>Space content</p>
      </TimelineItem>
    );
    fireEvent.keyDown(screen.getByRole('button'), { key: ' ' });
    expect(screen.getByText('Space content')).toBeInTheDocument();
  });

  it('does not render as button when no children', () => {
    const { container } = render(<TimelineItem date="Mar 18, 2026" title="Test" />);
    expect(container.querySelector('[role="button"]')).not.toBeInTheDocument();
  });

  it('respects defaultExpanded', () => {
    render(
      <TimelineItem date="Mar 18, 2026" title="Test" defaultExpanded>
        <p>Already visible</p>
      </TimelineItem>
    );
    expect(screen.getByText('Already visible')).toBeInTheDocument();
  });
});
