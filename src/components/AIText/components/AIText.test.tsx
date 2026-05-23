import React from 'react';
import { render, screen } from '@testing-library/react';
import { AIText } from './AIText';

describe('AIText', () => {
  it('renders children', () => {
    render(<AIText>some AI prose</AIText>);
    expect(screen.getByText('some AI prose')).toBeInTheDocument();
  });

  it('emits the canonical data-provenance="ai-draft" attribute', () => {
    const { container } = render(<AIText>x</AIText>);
    const span = container.querySelector('[data-provenance="ai-draft"]');
    expect(span).not.toBeNull();
    expect(span?.tagName).toBe('SPAN');
  });

  it('includes a screen-reader-only "AI-assisted:" prefix', () => {
    render(<AIText>x</AIText>);
    expect(screen.getByText('AI-assisted:')).toBeInTheDocument();
    expect(screen.getByText('AI-assisted:')).toHaveClass('eidotter-ai-text__sr-only');
  });

  it('sets a default title attribute', () => {
    const { container } = render(<AIText>x</AIText>);
    expect(container.querySelector('[data-provenance="ai-draft"]')).toHaveAttribute(
      'title',
      'AI-assisted text — being rewritten',
    );
  });

  it('accepts a custom title', () => {
    const { container } = render(<AIText title="custom hover">x</AIText>);
    expect(container.querySelector('[data-provenance="ai-draft"]')).toHaveAttribute(
      'title',
      'custom hover',
    );
  });

  it('merges a custom className alongside the eidotter-ai-text base', () => {
    const { container } = render(<AIText className="extra-class">x</AIText>);
    const span = container.querySelector('[data-provenance="ai-draft"]');
    expect(span).toHaveClass('eidotter-ai-text', 'extra-class');
  });
});
