import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders correctly with default props', () => {
    render(<Button>Test Button</Button>);
    const button = screen.getByRole('button', { name: 'Test Button' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');
  });

  it('emits the stable eidotter-btn base class regardless of variant (DMNC-1112)', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('eidotter-btn');
    rerender(<Button variant="destructive">Destructive</Button>);
    expect(screen.getByRole('button')).toHaveClass('eidotter-btn');
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('eidotter-btn--primary');
    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('eidotter-btn--secondary');
    rerender(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole('button')).toHaveClass('eidotter-btn--ghost');
    rerender(<Button variant="link">Link</Button>);
    expect(screen.getByRole('button')).toHaveClass('eidotter-btn--link');
  });

  it('renders new V.37 variants', () => {
    const { rerender } = render(<Button variant="tertiary">Tertiary</Button>);
    expect(screen.getByRole('button')).toHaveClass('eidotter-btn--tertiary');
    rerender(<Button variant="destructive">Destructive</Button>);
    expect(screen.getByRole('button')).toHaveClass('eidotter-btn--destructive');
  });

  it('renders with V.37 size names', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
    for (const size of sizes) {
      const { unmount } = render(<Button size={size}>{size}</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
      unmount();
    }
  });

  it('supports backward-compatible size aliases', () => {
    const aliases = ['small', 'medium', 'large'] as const;
    for (const size of aliases) {
      const { unmount } = render(<Button size={size}>{size}</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
      unmount();
    }
  });

  it('handles different button types', () => {
    const { rerender } = render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
    rerender(<Button type="reset">Reset</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'reset');
  });

  it('handles disabled state', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('handles loading state', () => {
    render(<Button loading>Loading</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('data-loading', 'true');
    expect(screen.getByText('█')).toBeInTheDocument();
    expect(screen.getByText('█')).toHaveAttribute('aria-hidden', 'true');
  });

  it('does not set isPending when not loading', () => {
    render(<Button>Idle</Button>);
    const button = screen.getByRole('button');
    expect(button).not.toHaveAttribute('data-loading');
  });

  it('handles fullWidth prop', () => {
    render(<Button fullWidth>Full Width</Button>);
    expect(screen.getByRole('button').className).toContain('w-full');
  });

  it('handles iconOnly prop', () => {
    render(<Button iconOnly aria-label="Close">X</Button>);
    expect(screen.getByRole('button').className).toContain('aspect-square');
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const mockOnClick = jest.fn();
    render(<Button onClick={mockOnClick}>Clickable</Button>);
    await user.click(screen.getByRole('button'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('calls onPress when pressed', async () => {
    const user = userEvent.setup();
    const mockOnPress = jest.fn();
    render(<Button onPress={mockOnPress}>Pressable</Button>);
    await user.click(screen.getByRole('button'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('prefers onPress over onClick when both provided', async () => {
    const user = userEvent.setup();
    const mockOnPress = jest.fn();
    const mockOnClick = jest.fn();
    render(<Button onPress={mockOnPress} onClick={mockOnClick}>Both</Button>);
    await user.click(screen.getByRole('button'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup();
    const mockOnClick = jest.fn();
    render(<Button disabled onClick={mockOnClick}>Disabled</Button>);
    await user.click(screen.getByRole('button'));
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('does not call onClick when loading', async () => {
    const user = userEvent.setup();
    const mockOnClick = jest.fn();
    render(<Button loading onClick={mockOnClick}>Loading</Button>);
    await user.click(screen.getByRole('button'));
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('spreads additional props', () => {
    render(<Button aria-label="Custom" data-testid="btn">Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Custom');
    expect(button).toHaveAttribute('data-testid', 'btn');
  });

  it('sets data-variant attribute', () => {
    render(<Button variant="destructive">Delete</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'destructive');
  });

  it('shows loading content with reduced opacity', () => {
    render(<Button loading>Loading Button</Button>);
    const content = screen.getByText('Loading Button');
    // The parent span has opacity-70 when loading
    expect(content.closest('span')?.className).toContain('opacity-70');
  });

  it('forwards ref to the underlying button element', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref Button</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current?.tagName).toBe('BUTTON');
  });

  describe('Keyboard Navigation', () => {
    it('can be focused with keyboard', async () => {
      const user = userEvent.setup();
      render(<Button>Focusable</Button>);
      await user.tab();
      expect(screen.getByRole('button')).toHaveFocus();
    });

    it('can be activated with Enter', async () => {
      const user = userEvent.setup();
      const mockOnClick = jest.fn();
      render(<Button onClick={mockOnClick}>Activatable</Button>);
      await user.tab();
      await user.keyboard('{Enter}');
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('can be activated with Space', async () => {
      const user = userEvent.setup();
      const mockOnClick = jest.fn();
      render(<Button onClick={mockOnClick}>Activatable</Button>);
      await user.tab();
      await user.keyboard(' ');
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });
});
