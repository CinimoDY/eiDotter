import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { InlineExpand } from './InlineExpand';
import type { InlineExpandSource } from './InlineExpand';

// When expanded there are TWO buttons (trigger + trailing collapse control),
// so screen.getByRole('button') is ambiguous. Query the parts by class.
const trigger = (c: HTMLElement) =>
  c.querySelector('.eidotter-inline-expand__trigger') as HTMLElement;
const collapseControl = (c: HTMLElement) =>
  c.querySelector('.eidotter-inline-expand__collapse') as HTMLElement;
const contentEl = (c: HTMLElement) =>
  c.querySelector('.eidotter-inline-expand__content') as HTMLElement | null;
const root = (c: HTMLElement) =>
  c.querySelector('.eidotter-inline-expand') as HTMLElement;

describe('InlineExpand', () => {
  const defaultProps = {
    children: 'trigger text',
    content: 'expanded content',
  };

  describe('rendering', () => {
    it('renders trigger text', () => {
      const { container } = render(<InlineExpand {...defaultProps} />);
      expect(trigger(container)).toHaveTextContent('trigger text');
    });

    it('renders the trigger as a native button element', () => {
      render(<InlineExpand {...defaultProps} />);
      expect(screen.getByRole('button').tagName).toBe('BUTTON');
    });

    it('has type="button" to prevent form submission', () => {
      render(<InlineExpand {...defaultProps} />);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    });

    it('renders [+] indicator when collapsed', () => {
      const { container } = render(<InlineExpand {...defaultProps} />);
      expect(trigger(container)).toHaveTextContent('[+]');
    });

    it('renders [-] indicator when expanded', () => {
      const { container } = render(<InlineExpand {...defaultProps} defaultExpanded />);
      expect(trigger(container)).toHaveTextContent('[-]');
    });

    it('applies custom className to the outer span', () => {
      const { container } = render(
        <InlineExpand {...defaultProps} className="custom-class" />,
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  // Conditional render — content mounts on expand, unmounts on collapse, so it
  // occupies no inline space when closed. The inline model forces this: an
  // inline span with visibility:hidden would still reserve a paragraph-wide gap.
  describe('conditional render', () => {
    it('does not render content when collapsed', () => {
      const { container } = render(<InlineExpand {...defaultProps} />);
      expect(contentEl(container)).toBeNull();
      expect(screen.queryByText('expanded content')).not.toBeInTheDocument();
    });

    it('renders content when expanded', () => {
      const { container } = render(<InlineExpand {...defaultProps} defaultExpanded />);
      expect(contentEl(container)).toBeInTheDocument();
      expect(contentEl(container)).toHaveTextContent('expanded content');
    });

    // DMNC-1063 was the height-cap clipping bug; inline flow has no max-height,
    // and the grid/inner wrappers that carried it are gone entirely.
    it('has no grid/inner wrappers (inline flow, not a block)', () => {
      const { container } = render(<InlineExpand {...defaultProps} defaultExpanded />);
      expect(container.querySelector('.eidotter-inline-expand__content-clip')).toBeNull();
      expect(container.querySelector('.eidotter-inline-expand__inner')).toBeNull();
    });
  });

  describe('uncontrolled mode', () => {
    it('defaults to collapsed', () => {
      const { container } = render(<InlineExpand {...defaultProps} />);
      expect(trigger(container)).toHaveAttribute('aria-expanded', 'false');
    });

    it('respects defaultExpanded prop', () => {
      const { container } = render(<InlineExpand {...defaultProps} defaultExpanded />);
      expect(trigger(container)).toHaveAttribute('aria-expanded', 'true');
    });

    it('toggles state on trigger click', () => {
      const { container } = render(<InlineExpand {...defaultProps} />);
      expect(trigger(container)).toHaveAttribute('aria-expanded', 'false');
      fireEvent.click(trigger(container));
      expect(trigger(container)).toHaveAttribute('aria-expanded', 'true');
      fireEvent.click(trigger(container));
      expect(trigger(container)).toHaveAttribute('aria-expanded', 'false');
    });

    it('calls onToggle when toggled', () => {
      const onToggle = jest.fn();
      const { container } = render(
        <InlineExpand {...defaultProps} onToggle={onToggle} />,
      );
      fireEvent.click(trigger(container));
      expect(onToggle).toHaveBeenCalledWith(true);
    });
  });

  describe('controlled mode', () => {
    it('respects expanded prop', () => {
      const { container } = render(<InlineExpand {...defaultProps} expanded={true} />);
      expect(trigger(container)).toHaveAttribute('aria-expanded', 'true');
    });

    it('respects expanded=false prop', () => {
      const { container } = render(<InlineExpand {...defaultProps} expanded={false} />);
      expect(trigger(container)).toHaveAttribute('aria-expanded', 'false');
    });

    it('calls onToggle with next state when clicked', () => {
      const onToggle = jest.fn();
      const { container } = render(
        <InlineExpand {...defaultProps} expanded={false} onToggle={onToggle} />,
      );
      fireEvent.click(trigger(container));
      expect(onToggle).toHaveBeenCalledWith(true);
    });

    it('calls onToggle with false when collapsing via trigger', () => {
      const onToggle = jest.fn();
      const { container } = render(
        <InlineExpand {...defaultProps} expanded={true} onToggle={onToggle} />,
      );
      fireEvent.click(trigger(container));
      expect(onToggle).toHaveBeenCalledWith(false);
    });

    it('does not change rendered state in controlled mode', () => {
      const onToggle = jest.fn();
      const { container } = render(
        <InlineExpand {...defaultProps} expanded={false} onToggle={onToggle} />,
      );
      fireEvent.click(trigger(container));
      // Still collapsed because controlled — parent didn't update
      expect(trigger(container)).toHaveAttribute('aria-expanded', 'false');
      expect(contentEl(container)).toBeNull();
    });

    it('trailing control fires onToggle(false) but does not change the DOM when held expanded', () => {
      const onToggle = jest.fn();
      const { container } = render(
        <InlineExpand {...defaultProps} expanded={true} onToggle={onToggle} />,
      );
      fireEvent.click(collapseControl(container));
      expect(onToggle).toHaveBeenCalledWith(false);
      // Parent still holds expanded={true}, so content stays mounted
      expect(contentEl(container)).toBeInTheDocument();
    });
  });

  describe('trailing collapse control', () => {
    it('collapses the expansion', () => {
      const { container } = render(<InlineExpand {...defaultProps} defaultExpanded />);
      fireEvent.click(collapseControl(container));
      expect(trigger(container)).toHaveAttribute('aria-expanded', 'false');
      expect(contentEl(container)).toBeNull();
    });

    it('returns focus to the trigger on collapse', () => {
      const { container } = render(<InlineExpand {...defaultProps} defaultExpanded />);
      fireEvent.click(collapseControl(container));
      expect(trigger(container)).toHaveFocus();
    });

    it('has an accessible label', () => {
      const { container } = render(<InlineExpand {...defaultProps} defaultExpanded />);
      expect(collapseControl(container)).toHaveAttribute('aria-label', 'Collapse');
    });
  });

  describe('keyboard interaction', () => {
    it('collapses on Escape when expanded', () => {
      const onToggle = jest.fn();
      const { container } = render(
        <InlineExpand {...defaultProps} defaultExpanded onToggle={onToggle} />,
      );
      fireEvent.keyDown(root(container), { key: 'Escape' });
      expect(onToggle).toHaveBeenCalledWith(false);
    });

    it('does not collapse on Escape when already collapsed', () => {
      const onToggle = jest.fn();
      const { container } = render(
        <InlineExpand {...defaultProps} onToggle={onToggle} />,
      );
      fireEvent.keyDown(root(container), { key: 'Escape' });
      expect(onToggle).not.toHaveBeenCalled();
    });

    it('Escape from inside the expansion collapses and refocuses the trigger', () => {
      const { container } = render(<InlineExpand {...defaultProps} defaultExpanded />);
      act(() => {
        collapseControl(container).focus();
      });
      fireEvent.keyDown(root(container), { key: 'Escape' });
      expect(trigger(container)).toHaveAttribute('aria-expanded', 'false');
      expect(trigger(container)).toHaveFocus();
    });
  });

  describe('accessibility', () => {
    it('trigger has aria-expanded', () => {
      const { container } = render(<InlineExpand {...defaultProps} />);
      expect(trigger(container)).toHaveAttribute('aria-expanded', 'false');
    });

    it('outer span is a polite live region', () => {
      const { container } = render(<InlineExpand {...defaultProps} />);
      expect(container.firstChild).toHaveAttribute('aria-live', 'polite');
    });

    it('content span carries data-ai-skip="true"', () => {
      const { container } = render(<InlineExpand {...defaultProps} defaultExpanded />);
      expect(contentEl(container)).toHaveAttribute('data-ai-skip', 'true');
    });

    it('both trigger and trailing control reference the content id', () => {
      const { container } = render(<InlineExpand {...defaultProps} defaultExpanded />);
      const id = contentEl(container)!.getAttribute('id');
      expect(id).toBeTruthy();
      expect(trigger(container)).toHaveAttribute('aria-controls', id!);
      expect(collapseControl(container)).toHaveAttribute('aria-controls', id!);
    });

    it('indicator is hidden from screen readers', () => {
      const { container } = render(<InlineExpand {...defaultProps} />);
      const indicator = trigger(container).querySelector(
        '.eidotter-inline-expand__indicator',
      );
      expect(indicator).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('class composition', () => {
    it('applies eidotter-inline-expand--expanded class when expanded', () => {
      const { container } = render(<InlineExpand {...defaultProps} defaultExpanded />);
      expect(container.firstChild).toHaveClass('eidotter-inline-expand--expanded');
    });

    it('does not apply eidotter-inline-expand--expanded when collapsed', () => {
      const { container } = render(<InlineExpand {...defaultProps} />);
      expect(container.firstChild).not.toHaveClass('eidotter-inline-expand--expanded');
    });

    it('combines base and custom classes', () => {
      const { container } = render(
        <InlineExpand {...defaultProps} defaultExpanded className="extra" />,
      );
      const el = container.firstChild;
      expect(el).toHaveClass('eidotter-inline-expand');
      expect(el).toHaveClass('eidotter-inline-expand--expanded');
      expect(el).toHaveClass('extra');
    });
  });

  describe('content rendering', () => {
    it('renders string content', () => {
      const { container } = render(<InlineExpand {...defaultProps} defaultExpanded />);
      expect(contentEl(container)).toHaveTextContent('expanded content');
    });

    it('renders ReactNode content', () => {
      const { container } = render(
        <InlineExpand defaultExpanded content={<strong>rich content</strong>}>
          trigger
        </InlineExpand>,
      );
      expect(contentEl(container)!.querySelector('strong')).toHaveTextContent(
        'rich content',
      );
    });
  });

  describe('sources', () => {
    const testSources: InlineExpandSource[] = [
      { title: 'Wikipedia', url: 'https://en.wikipedia.org', favicon: 'https://en.wikipedia.org/favicon.ico' },
      { title: 'MDN', url: 'https://developer.mozilla.org' },
    ];

    it('renders nothing when sources is undefined', () => {
      const { container } = render(<InlineExpand {...defaultProps} defaultExpanded />);
      expect(container.querySelector('.eidotter-inline-expand__sources')).toBeNull();
    });

    it('renders nothing when sources is empty', () => {
      const { container } = render(
        <InlineExpand {...defaultProps} defaultExpanded sources={[]} />,
      );
      expect(container.querySelector('.eidotter-inline-expand__sources')).toBeNull();
    });

    it('renders source links', () => {
      render(<InlineExpand {...defaultProps} defaultExpanded sources={testSources} />);
      expect(screen.getAllByRole('link')).toHaveLength(2);
    });

    // Favicon-only cluster: the title is no longer visible text — it moves to
    // the native `title` tooltip and the link's aria-label.
    it('exposes source titles via title attribute + aria-label, not visible text', () => {
      render(<InlineExpand {...defaultProps} defaultExpanded sources={testSources} />);
      expect(screen.getByLabelText('Wikipedia (opens external website)')).toHaveAttribute(
        'title',
        'Wikipedia',
      );
      expect(screen.getByLabelText('MDN (opens external website)')).toHaveAttribute(
        'title',
        'MDN',
      );
      expect(screen.queryByText('Wikipedia')).not.toBeInTheDocument();
    });

    it('sets target and rel attributes on source links', () => {
      render(<InlineExpand {...defaultProps} defaultExpanded sources={testSources} />);
      screen.getAllByRole('link').forEach((link) => {
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });

    it('sets accessible aria-label on source links', () => {
      render(<InlineExpand {...defaultProps} defaultExpanded sources={testSources} />);
      expect(screen.getByLabelText('Wikipedia (opens external website)')).toBeInTheDocument();
      expect(screen.getByLabelText('MDN (opens external website)')).toBeInTheDocument();
    });

    it('renders sources with list semantics', () => {
      render(<InlineExpand {...defaultProps} defaultExpanded sources={testSources} />);
      expect(screen.getByRole('list')).toBeInTheDocument();
      expect(screen.getAllByRole('listitem')).toHaveLength(2);
    });

    it('uses Google Favicons API when no favicon is provided', () => {
      const { container } = render(
        <InlineExpand {...defaultProps} defaultExpanded sources={[testSources[1]]} />,
      );
      const img = container.querySelector(
        '.eidotter-inline-expand__source-favicon',
      ) as HTMLImageElement;
      expect(img).toBeInTheDocument();
      expect(img.src).toContain('google.com/s2/favicons');
      expect(img.src).toContain('developer.mozilla.org');
    });

    it('renders favicon when provided', () => {
      const { container } = render(
        <InlineExpand {...defaultProps} defaultExpanded sources={[testSources[0]]} />,
      );
      const favicon = container.querySelector(
        '.eidotter-inline-expand__source-favicon',
      ) as HTMLImageElement;
      expect(favicon).toBeInTheDocument();
      expect(favicon).toHaveAttribute('src', 'https://en.wikipedia.org/favicon.ico');
      expect(favicon).toHaveAttribute('alt', '');
      expect(favicon).toHaveAttribute('decoding', 'async');
    });

    it('tries Google Favicons after primary favicon error', () => {
      const { container } = render(
        <InlineExpand {...defaultProps} defaultExpanded sources={[testSources[0]]} />,
      );
      const primaryImg = container.querySelector(
        '.eidotter-inline-expand__source-favicon',
      ) as HTMLImageElement;
      expect(primaryImg.src).toBe('https://en.wikipedia.org/favicon.ico');
      fireEvent.error(primaryImg);
      const googleImg = container.querySelector(
        '.eidotter-inline-expand__source-favicon',
      ) as HTMLImageElement;
      expect(googleImg.src).toContain('google.com/s2/favicons');
      expect(googleImg.src).toContain('en.wikipedia.org');
    });

    it('shows [→] fallback when Google Favicons also fails', () => {
      const { container } = render(
        <InlineExpand {...defaultProps} defaultExpanded sources={[testSources[0]]} />,
      );
      const primaryImg = container.querySelector(
        '.eidotter-inline-expand__source-favicon',
      ) as HTMLImageElement;
      fireEvent.error(primaryImg);
      const googleImg = container.querySelector(
        '.eidotter-inline-expand__source-favicon',
      ) as HTMLImageElement;
      fireEvent.error(googleImg);
      const fallbackIcon = container.querySelector(
        '.eidotter-inline-expand__source-icon',
      );
      expect(fallbackIcon).toHaveTextContent('[→]');
      expect(fallbackIcon).toHaveAttribute('aria-hidden', 'true');
    });

    it('shows [→] when Google Favicons also fails for no-favicon source', () => {
      const { container } = render(
        <InlineExpand {...defaultProps} defaultExpanded sources={[testSources[1]]} />,
      );
      const googleImg = container.querySelector(
        '.eidotter-inline-expand__source-favicon',
      ) as HTMLImageElement;
      fireEvent.error(googleImg);
      const fallbackIcon = container.querySelector(
        '.eidotter-inline-expand__source-icon',
      );
      expect(fallbackIcon).toHaveTextContent('[→]');
    });

    it('sanitizes javascript: URLs', () => {
      const maliciousSources: InlineExpandSource[] = [
        { title: 'Evil', url: 'javascript:alert(1)' },
      ];
      render(
        <InlineExpand {...defaultProps} defaultExpanded sources={maliciousSources} />,
      );
      const link = screen.getByLabelText('Evil (opens external website)');
      expect(link).not.toHaveAttribute('href');
    });

    it('sanitizes javascript: favicon URLs by falling back to Google Favicons', () => {
      const maliciousSources: InlineExpandSource[] = [
        { title: 'Evil', url: 'https://example.com', favicon: 'javascript:alert(1)' },
      ];
      const { container } = render(
        <InlineExpand {...defaultProps} defaultExpanded sources={maliciousSources} />,
      );
      const img = container.querySelector(
        '.eidotter-inline-expand__source-favicon',
      ) as HTMLImageElement;
      expect(img).toBeInTheDocument();
      expect(img.src).toContain('google.com/s2/favicons');
      expect(img.src).not.toContain('javascript');
    });
  });
});
