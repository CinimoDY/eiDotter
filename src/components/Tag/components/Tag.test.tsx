import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Tag } from './Tag';
import { TagGroup } from './TagGroup';

describe('Tag', () => {
  // === Rendering ===

  it('renders with default props', () => {
    render(<Tag>label</Tag>);
    expect(screen.getByText('label')).toBeInTheDocument();
  });

  it('renders as a span element', () => {
    const { container } = render(<Tag>label</Tag>);
    expect(container.firstChild?.nodeName).toBe('SPAN');
  });

  it('applies default variant class', () => {
    const { container } = render(<Tag>label</Tag>);
    expect(container.firstChild).toHaveClass('eidotter-tag--default');
  });

  it('applies default size class', () => {
    const { container } = render(<Tag>label</Tag>);
    expect(container.firstChild).toHaveClass('eidotter-tag--medium');
  });

  it('applies custom className', () => {
    const { container } = render(<Tag className="custom">label</Tag>);
    expect(container.firstChild).toHaveClass('custom');
  });

  it('applies aria-label', () => {
    const { container } = render(<Tag aria-label="My tag">label</Tag>);
    expect(container.firstChild).toHaveAttribute('aria-label', 'My tag');
  });

  // === Variants ===

  describe('variants', () => {
    it('renders outlined variant', () => {
      const { container } = render(<Tag variant="outlined">label</Tag>);
      expect(container.firstChild).toHaveClass('eidotter-tag--outlined');
    });

    it('renders filled variant', () => {
      const { container } = render(<Tag variant="filled">label</Tag>);
      expect(container.firstChild).toHaveClass('eidotter-tag--filled');
    });
  });

  // === Sizes ===

  describe('sizes', () => {
    it('renders small size', () => {
      const { container } = render(<Tag size="small">label</Tag>);
      expect(container.firstChild).toHaveClass('eidotter-tag--small');
    });

    it('renders medium size', () => {
      const { container } = render(<Tag size="medium">label</Tag>);
      expect(container.firstChild).toHaveClass('eidotter-tag--medium');
    });
  });

  // === Custom color ===

  describe('color', () => {
    it('sets --tag-color CSS custom property', () => {
      const { container } = render(<Tag color="--color-cga-bright-cyan">label</Tag>);
      const tag = container.firstChild as HTMLElement;
      expect(tag.style.getPropertyValue('--tag-color')).toBe('var(--color-cga-bright-cyan)');
    });

    it('does not set --tag-color when color is not provided', () => {
      const { container } = render(<Tag>label</Tag>);
      const tag = container.firstChild as HTMLElement;
      expect(tag.getAttribute('style')).toBeNull();
    });
  });

  // === Selected state ===

  describe('selected', () => {
    it('applies selected class', () => {
      const { container } = render(<Tag selected>label</Tag>);
      expect(container.firstChild).toHaveClass('eidotter-tag--selected');
    });

    it('does not apply selected class by default', () => {
      const { container } = render(<Tag>label</Tag>);
      expect(container.firstChild).not.toHaveClass('eidotter-tag--selected');
    });

    it('sets aria-selected when selected', () => {
      const { container } = render(<Tag selected>label</Tag>);
      expect(container.firstChild).toHaveAttribute('aria-selected', 'true');
    });
  });

  // === Interactive (onClick) ===

  describe('interactive', () => {
    it('applies interactive class when onClick is provided', () => {
      const { container } = render(<Tag onClick={() => {}}>label</Tag>);
      expect(container.firstChild).toHaveClass('eidotter-tag--interactive');
    });

    it('sets role="button" when interactive', () => {
      const { container } = render(<Tag onClick={() => {}}>label</Tag>);
      expect(container.firstChild).toHaveAttribute('role', 'button');
    });

    it('sets tabIndex=0 when interactive', () => {
      const { container } = render(<Tag onClick={() => {}}>label</Tag>);
      expect(container.firstChild).toHaveAttribute('tabindex', '0');
    });

    it('calls onClick when clicked', () => {
      const handleClick = jest.fn();
      render(<Tag onClick={handleClick}>label</Tag>);
      fireEvent.click(screen.getByText('label').closest('.eidotter-tag')!);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not set role or tabIndex without onClick', () => {
      const { container } = render(<Tag>label</Tag>);
      expect(container.firstChild).not.toHaveAttribute('role');
      expect(container.firstChild).not.toHaveAttribute('tabindex');
    });
  });

  // === Closeable ===

  describe('closeable', () => {
    it('renders close button when closeable', () => {
      render(<Tag closeable onClose={() => {}}>label</Tag>);
      expect(screen.getByRole('button', { name: 'Remove label' })).toBeInTheDocument();
    });

    it('applies closeable class', () => {
      const { container } = render(<Tag closeable>label</Tag>);
      expect(container.firstChild).toHaveClass('eidotter-tag--closeable');
    });

    it('close button has [x] text', () => {
      render(<Tag closeable onClose={() => {}}>label</Tag>);
      expect(screen.getByRole('button', { name: 'Remove label' }).textContent).toBe('[x]');
    });

    it('close button has tabIndex=-1', () => {
      render(<Tag closeable onClose={() => {}}>label</Tag>);
      expect(screen.getByRole('button', { name: 'Remove label' })).toHaveAttribute('tabindex', '-1');
    });

    it('adds closing class when close button is clicked', () => {
      const handleClose = jest.fn();
      const { container } = render(<Tag closeable onClose={handleClose}>label</Tag>);
      fireEvent.click(screen.getByRole('button', { name: 'Remove label' }));
      expect(container.firstChild).toHaveClass('eidotter-tag--closing');
    });

    it('calls onClose after exit animation ends', () => {
      const handleClose = jest.fn();
      const { container } = render(<Tag closeable onClose={handleClose}>label</Tag>);
      fireEvent.click(screen.getByRole('button', { name: 'Remove label' }));
      expect(handleClose).not.toHaveBeenCalled();
      const tag = container.firstChild!;
      const event = document.createEvent('Event');
      event.initEvent('animationend', true, true);
      Object.defineProperty(event, 'animationName', { value: 'tag-exit' });
      act(() => {
        tag.dispatchEvent(event);
      });
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('does not propagate click from close button to tag onClick', () => {
      const handleClick = jest.fn();
      const handleClose = jest.fn();
      const { container } = render(<Tag onClick={handleClick} closeable onClose={handleClose}>label</Tag>);
      fireEvent.click(screen.getByRole('button', { name: 'Remove label' }));
      // Close triggers animation, not direct onClose
      expect(container.firstChild).toHaveClass('eidotter-tag--closing');
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not render close button when not closeable', () => {
      const { container } = render(<Tag>label</Tag>);
      expect(container.querySelector('.eidotter-tag__close')).not.toBeInTheDocument();
    });
  });

  // === Disabled ===

  describe('disabled', () => {
    it('applies disabled class', () => {
      const { container } = render(<Tag disabled>label</Tag>);
      expect(container.firstChild).toHaveClass('eidotter-tag--disabled');
    });

    it('sets aria-disabled', () => {
      const { container } = render(<Tag disabled>label</Tag>);
      expect(container.firstChild).toHaveAttribute('aria-disabled', 'true');
    });

    it('does not call onClick when disabled', () => {
      const handleClick = jest.fn();
      const { container } = render(<Tag disabled onClick={handleClick}>label</Tag>);
      fireEvent.click(container.firstChild!);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not apply interactive class when disabled with onClick', () => {
      const { container } = render(<Tag disabled onClick={() => {}}>label</Tag>);
      expect(container.firstChild).not.toHaveClass('eidotter-tag--interactive');
    });

    it('does not call onClose when disabled', () => {
      const handleClose = jest.fn();
      render(<Tag disabled closeable onClose={handleClose}>label</Tag>);
      const closeBtn = screen.getByRole('button', { name: 'Remove label' });
      fireEvent.click(closeBtn);
      expect(handleClose).not.toHaveBeenCalled();
    });
  });

  // === Keyboard interaction ===

  describe('keyboard', () => {
    it('triggers onClick on Enter key', () => {
      const handleClick = jest.fn();
      const { container } = render(<Tag onClick={handleClick}>label</Tag>);
      fireEvent.keyDown(container.firstChild!, { key: 'Enter' });
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('triggers onClick on Space key', () => {
      const handleClick = jest.fn();
      const { container } = render(<Tag onClick={handleClick}>label</Tag>);
      fireEvent.keyDown(container.firstChild!, { key: ' ' });
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('triggers closing animation on Delete key', () => {
      const handleClose = jest.fn();
      const { container } = render(<Tag closeable onClose={handleClose}>label</Tag>);
      fireEvent.keyDown(container.firstChild!, { key: 'Delete' });
      expect(container.firstChild).toHaveClass('eidotter-tag--closing');
    });

    it('triggers closing animation on Backspace key', () => {
      const handleClose = jest.fn();
      const { container } = render(<Tag closeable onClose={handleClose}>label</Tag>);
      fireEvent.keyDown(container.firstChild!, { key: 'Backspace' });
      expect(container.firstChild).toHaveClass('eidotter-tag--closing');
    });

    it('does not trigger keyboard actions when disabled', () => {
      const handleClick = jest.fn();
      const handleClose = jest.fn();
      const { container } = render(
        <Tag disabled onClick={handleClick} closeable onClose={handleClose}>label</Tag>
      );
      fireEvent.keyDown(container.firstChild!, { key: 'Enter' });
      fireEvent.keyDown(container.firstChild!, { key: 'Delete' });
      expect(handleClick).not.toHaveBeenCalled();
      expect(handleClose).not.toHaveBeenCalled();
    });

    it('does not trigger onClose on Delete when not closeable', () => {
      const handleClose = jest.fn();
      const { container } = render(<Tag onClose={handleClose}>label</Tag>);
      fireEvent.keyDown(container.firstChild!, { key: 'Delete' });
      expect(handleClose).not.toHaveBeenCalled();
    });
  });

  // === Close button aria-label with non-string children ===

  describe('close button aria-label', () => {
    it('uses "Remove tag" when children is not a string', () => {
      render(<Tag closeable onClose={() => {}}><span>icon</span></Tag>);
      expect(screen.getByRole('button', { name: 'Remove tag' })).toBeInTheDocument();
    });

    it('uses child text when children is a string', () => {
      render(<Tag closeable onClose={() => {}}>project</Tag>);
      expect(screen.getByRole('button', { name: 'Remove project' })).toBeInTheDocument();
    });
  });
});

describe('TagGroup', () => {
  it('renders children', () => {
    render(
      <TagGroup>
        <Tag>one</Tag>
        <Tag>two</Tag>
      </TagGroup>
    );
    expect(screen.getByText('one')).toBeInTheDocument();
    expect(screen.getByText('two')).toBeInTheDocument();
  });

  it('has role="group"', () => {
    render(<TagGroup aria-label="Tags"><Tag>one</Tag></TagGroup>);
    expect(screen.getByRole('group')).toBeInTheDocument();
  });

  it('applies aria-label', () => {
    render(<TagGroup aria-label="Categories"><Tag>one</Tag></TagGroup>);
    expect(screen.getByRole('group')).toHaveAttribute('aria-label', 'Categories');
  });

  it('applies default gap class', () => {
    const { container } = render(<TagGroup><Tag>one</Tag></TagGroup>);
    expect(container.firstChild).toHaveClass('tag-group--normal');
  });

  it('applies tight gap', () => {
    const { container } = render(<TagGroup gap="tight"><Tag>one</Tag></TagGroup>);
    expect(container.firstChild).toHaveClass('tag-group--tight');
  });

  it('applies loose gap', () => {
    const { container } = render(<TagGroup gap="loose"><Tag>one</Tag></TagGroup>);
    expect(container.firstChild).toHaveClass('tag-group--loose');
  });

  it('wraps by default', () => {
    const { container } = render(<TagGroup><Tag>one</Tag></TagGroup>);
    expect(container.firstChild).not.toHaveClass('tag-group--nowrap');
  });

  it('applies nowrap class when wrap is false', () => {
    const { container } = render(<TagGroup wrap={false}><Tag>one</Tag></TagGroup>);
    expect(container.firstChild).toHaveClass('tag-group--nowrap');
  });

  it('applies custom className', () => {
    const { container } = render(<TagGroup className="custom"><Tag>one</Tag></TagGroup>);
    expect(container.firstChild).toHaveClass('custom');
  });
});
