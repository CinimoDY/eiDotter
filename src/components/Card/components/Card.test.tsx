import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('renders children correctly', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('renders with title when provided', () => {
    render(<Card title="Test Title">Content</Card>);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders without a strip when no title is provided', () => {
    const { container } = render(<Card>Content only</Card>);
    expect(container.querySelector('.eidotter-window__strip')).not.toBeInTheDocument();
  });

  it('renders footer when provided', () => {
    render(<Card footer={<span>Footer text</span>}>Content</Card>);
    expect(screen.getByText('Footer text')).toBeInTheDocument();
  });

  it('sits on the DosWindow chrome: title in the strip, footer in the window footer', () => {
    const { container } = render(
      <Card title="Report" footer={<span>Footer text</span>}>Body</Card>,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveClass('eidotter-window', 'eidotter-card');
    expect(screen.getByText('Report')).toHaveClass('eidotter-window__title');
    expect(screen.getByText('Report').closest('.eidotter-window__strip')).toBeInTheDocument();
    expect(screen.getByText('Footer text').closest('.eidotter-window__footer')).toBeInTheDocument();
    expect(screen.getByText('Body').closest('.eidotter-window__body')).toBeInTheDocument();
  });

  it('applies default variant class', () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.firstChild).toHaveClass('eidotter-card', 'eidotter-card--default');
  });

  it('applies elevated variant class', () => {
    const { container } = render(<Card variant="elevated">Content</Card>);
    expect(container.firstChild).toHaveClass('eidotter-card--elevated');
  });

  it('applies glow variant class', () => {
    const { container } = render(<Card variant="glow">Content</Card>);
    expect(container.firstChild).toHaveClass('eidotter-card--glow');
  });

  it('applies bordered variant class', () => {
    const { container } = render(<Card variant="bordered">Content</Card>);
    expect(container.firstChild).toHaveClass('eidotter-card--bordered');
  });

  it('applies interactive variant class', () => {
    const { container } = render(<Card variant="interactive">Content</Card>);
    expect(container.firstChild).toHaveClass('eidotter-card--interactive');
  });

  it('applies minimal variant class', () => {
    const { container } = render(<Card variant="minimal">Content</Card>);
    expect(container.firstChild).toHaveClass('eidotter-card--minimal');
  });

  it('applies callout variant class', () => {
    const { container } = render(<Card variant="callout">Content</Card>);
    expect(container.firstChild).toHaveClass('eidotter-card--callout');
  });

  it('merges custom className', () => {
    const { container } = render(<Card className="custom-class">Content</Card>);
    expect(container.firstChild).toHaveClass('eidotter-card', 'custom-class');
  });

  it('passes through additional props', () => {
    const { container } = render(<Card data-testid="test-card">Content</Card>);
    expect(container.firstChild).toHaveAttribute('data-testid', 'test-card');
  });

  it('forwards ref to the root element', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Card ref={ref}>Content</Card>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
