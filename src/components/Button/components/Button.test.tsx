import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders correctly with default props', () => {
    render(<Button>Test Button</Button>);
    
    const button = screen.getByRole('button', { name: 'Test Button' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('button', 'button--primary', 'button--medium');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('button--primary');

    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('button--secondary');

    rerender(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole('button')).toHaveClass('button--ghost');

    rerender(<Button variant="link">Link</Button>);
    expect(screen.getByRole('button')).toHaveClass('button--link');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Button size="small">Small</Button>);
    expect(screen.getByRole('button')).toHaveClass('button--small');

    rerender(<Button size="medium">Medium</Button>);
    expect(screen.getByRole('button')).toHaveClass('button--medium');

    rerender(<Button size="large">Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('button--large');
  });

  it('handles different button types', () => {
    const { rerender } = render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');

    rerender(<Button type="reset">Reset</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'reset');

    rerender(<Button type="button">Button</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('handles disabled state correctly', () => {
    const mockOnClick = jest.fn();
    render(<Button disabled onClick={mockOnClick}>Disabled</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('button--disabled');
    expect(button).toHaveAttribute('aria-disabled', 'true');

    fireEvent.click(button);
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('handles loading state correctly', () => {
    const mockOnClick = jest.fn();
    render(<Button loading onClick={mockOnClick}>Loading</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('button--loading');
    expect(button).toHaveAttribute('aria-disabled', 'true');
    
    // Should show loading indicator
    expect(screen.getByText('█')).toBeInTheDocument();
    expect(screen.getByText('█')).toHaveAttribute('aria-hidden', 'true');

    fireEvent.click(button);
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('handles fullWidth prop correctly', () => {
    render(<Button fullWidth>Full Width</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('button--full-width');
  });

  it('calls onClick handler when clicked', async () => {
    const user = userEvent.setup();
    const mockOnClick = jest.fn();
    render(<Button onClick={mockOnClick}>Clickable</Button>);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith(expect.any(Object));
  });

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup();
    const mockOnClick = jest.fn();
    render(<Button disabled onClick={mockOnClick}>Disabled</Button>);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('does not call onClick when loading', async () => {
    const user = userEvent.setup();
    const mockOnClick = jest.fn();
    render(<Button loading onClick={mockOnClick}>Loading</Button>);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('applies custom className correctly', () => {
    render(<Button className="custom-class">Custom</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
    expect(button).toHaveClass('button'); // Should also have base class
  });

  it('spreads additional props correctly', () => {
    render(<Button aria-label="Custom Label" data-testid="custom-button">Button</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Custom Label');
    expect(button).toHaveAttribute('data-testid', 'custom-button');
  });

  it('has proper accessibility attributes', () => {
    render(<Button disabled>Disabled Button</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  it('shows loading content correctly', () => {
    render(<Button loading>Loading Button</Button>);
    
    const content = screen.getByText('Loading Button');
    expect(content).toHaveClass('button__content--loading');
  });

  describe('Keyboard Navigation', () => {
    it('can be focused with keyboard', async () => {
      const user = userEvent.setup();
      render(<Button>Focusable</Button>);
      
      const button = screen.getByRole('button');
      await user.tab();
      
      expect(button).toHaveFocus();
    });

    it('can be activated with Enter key', async () => {
      const user = userEvent.setup();
      const mockOnClick = jest.fn();
      render(<Button onClick={mockOnClick}>Activatable</Button>);
      
      const button = screen.getByRole('button');
      await user.tab();
      await user.keyboard('{Enter}');
      
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('can be activated with Space key', async () => {
      const user = userEvent.setup();
      const mockOnClick = jest.fn();
      render(<Button onClick={mockOnClick}>Activatable</Button>);
      
      const button = screen.getByRole('button');
      await user.tab();
      await user.keyboard(' ');
      
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });
});