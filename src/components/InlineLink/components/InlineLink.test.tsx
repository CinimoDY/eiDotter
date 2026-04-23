import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InlineLink } from './InlineLink';

describe('InlineLink', () => {
  it('renders an anchor with the given href and label', () => {
    render(<InlineLink href="/about">About</InlineLink>);
    const link = screen.getByRole('link', { name: /about/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/about');
  });

  it('shows the default trailing glyph `▸`', () => {
    render(<InlineLink href="/x">Go</InlineLink>);
    expect(screen.getByText('▸')).toBeInTheDocument();
  });

  it('hides the glyph when showGlyph=false', () => {
    render(<InlineLink href="/x" showGlyph={false}>Go</InlineLink>);
    expect(screen.queryByText('▸')).toBeNull();
  });

  it('external variant swaps glyph to `↗` and adds safe rel/target', () => {
    render(<InlineLink href="https://example.com" external>Site</InlineLink>);
    const link = screen.getByRole('link', { name: /site/i });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(screen.getByText('↗')).toBeInTheDocument();
    expect(link).toHaveClass('eidotter-ilink--external');
  });

  it('explicit target/rel override the external defaults', () => {
    render(
      <InlineLink href="https://example.com" external target="_self" rel="nofollow">
        Site
      </InlineLink>,
    );
    const link = screen.getByRole('link', { name: /site/i });
    expect(link).toHaveAttribute('target', '_self');
    expect(link).toHaveAttribute('rel', 'nofollow');
  });

  it('consumer-supplied target="_blank" auto-applies safe rel (tabnabbing guard)', () => {
    render(
      <InlineLink href="https://example.com" target="_blank">
        Implicit external
      </InlineLink>,
    );
    const link = screen.getByRole('link', { name: /implicit external/i });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    // No `external` prop — glyph stays as default `▸`, not `↗`
    expect(screen.getByText('▸')).toBeInTheDocument();
  });

  it('fires onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(
      <InlineLink href="#" onClick={onClick}>
        Click
      </InlineLink>,
    );
    await user.click(screen.getByRole('link'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('merges custom className', () => {
    render(<InlineLink href="#" className="extra">Go</InlineLink>);
    expect(screen.getByRole('link')).toHaveClass('extra');
  });

  it('forwards ref to the anchor element', () => {
    const ref = React.createRef<HTMLAnchorElement>();
    render(<InlineLink href="#" ref={ref}>Go</InlineLink>);
    expect(ref.current?.tagName).toBe('A');
  });

  describe('Keyboard', () => {
    it('is focusable via Tab', async () => {
      const user = userEvent.setup();
      render(<InlineLink href="#">Go</InlineLink>);
      await user.tab();
      expect(screen.getByRole('link')).toHaveFocus();
    });
  });
});
