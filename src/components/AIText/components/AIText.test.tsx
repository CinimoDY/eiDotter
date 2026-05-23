import React from 'react';
import { render, screen } from '@testing-library/react';
import { AIText } from './AIText';

describe('AIText', () => {
  it('renders children', () => {
    render(<AIText>some AI prose</AIText>);
    expect(screen.getByText('some AI prose')).toBeInTheDocument();
  });

  it('applies the eidotter-ai-text class', () => {
    const { container } = render(<AIText>x</AIText>);
    const span = container.querySelector('.eidotter-ai-text');
    expect(span).not.toBeNull();
  });

  it('includes a screen-reader-only label', () => {
    render(<AIText>x</AIText>);
    expect(screen.getByText('AI-assisted:')).toBeInTheDocument();
    expect(screen.getByText('AI-assisted:')).toHaveClass('sr-only');
  });

  it('sets a default title attribute', () => {
    const { container } = render(<AIText>x</AIText>);
    const span = container.querySelector('.eidotter-ai-text');
    expect(span).toHaveAttribute('title', 'AI-assisted text — being rewritten');
  });

  it('accepts a custom title', () => {
    const { container } = render(<AIText title="custom hover">x</AIText>);
    expect(container.querySelector('.eidotter-ai-text')).toHaveAttribute('title', 'custom hover');
  });

  it('merges custom className', () => {
    const { container } = render(<AIText className="extra-class">x</AIText>);
    const span = container.querySelector('.eidotter-ai-text');
    expect(span).toHaveClass('extra-class');
  });
});
