import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { InlineExpand } from './InlineExpand';
import type { InlineExpandSource } from './InlineExpand';

describe('InlineExpand', () => {
  const defaultProps = {
    children: 'trigger text',
    content: 'expanded content',
  };

  describe('rendering', () => {
    it('renders trigger text', () => {
      render(<InlineExpand {...defaultProps} />);
      expect(screen.getByRole('button')).toHaveTextContent('trigger text');
    });

    it('renders as a native button element', () => {
      render(<InlineExpand {...defaultProps} />);
      expect(screen.getByRole('button').tagName).toBe('BUTTON');
    });

    it('has type="button" to prevent form submission', () => {
      render(<InlineExpand {...defaultProps} />);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    });

    it('renders [+] indicator when collapsed', () => {
      render(<InlineExpand {...defaultProps} />);
      expect(screen.getByRole('button')).toHaveTextContent('[+]');
    });

    it('renders [-] indicator when expanded', () => {
      render(<InlineExpand {...defaultProps} defaultExpanded />);
      expect(screen.getByRole('button')).toHaveTextContent('[-]');
    });

    it('applies custom className', () => {
      const { container } = render(
        <InlineExpand {...defaultProps} className="custom-class" />
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('renders content in a region', () => {
      render(<InlineExpand {...defaultProps} defaultExpanded />);
      expect(screen.getByRole('region')).toBeInTheDocument();
    });

    // DMNC-1063 — content and sources must sit inside a single grid child so
    // grid-template-rows 0fr→1fr collapses the whole block with no height cap
    // (the old 500px max-height clipped tall content).
    it('wraps content and sources in a single grid-clip child', () => {
      const sources: InlineExpandSource[] = [{ title: 'Ref', url: 'https://example.com' }];
      const { container } = render(
        <InlineExpand {...defaultProps} defaultExpanded sources={sources} />,
      );
      const content = container.querySelector('.eidotter-inline-expand__content')!;
      expect(content.children).toHaveLength(1);
      const clip = content.children[0];
      expect(clip).toHaveClass('eidotter-inline-expand__content-clip');
      expect(clip.querySelector('.eidotter-inline-expand__inner')).toBeInTheDocument();
      expect(clip.querySelector('.eidotter-inline-expand__sources')).toBeInTheDocument();
    });
  });

  describe('uncontrolled mode', () => {
    it('defaults to collapsed', () => {
      render(<InlineExpand {...defaultProps} />);
      expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
    });

    it('respects defaultExpanded prop', () => {
      render(<InlineExpand {...defaultProps} defaultExpanded />);
      expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
    });

    it('toggles state on click', () => {
      render(<InlineExpand {...defaultProps} />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-expanded', 'false');
      fireEvent.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'true');
      fireEvent.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('calls onToggle when toggled', () => {
      const onToggle = jest.fn();
      render(<InlineExpand {...defaultProps} onToggle={onToggle} />);
      fireEvent.click(screen.getByRole('button'));
      expect(onToggle).toHaveBeenCalledWith(true);
    });
  });

  describe('controlled mode', () => {
    it('respects expanded prop', () => {
      render(<InlineExpand {...defaultProps} expanded={true} />);
      expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
    });

    it('respects expanded=false prop', () => {
      render(<InlineExpand {...defaultProps} expanded={false} />);
      expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
    });

    it('calls onToggle with next state when clicked', () => {
      const onToggle = jest.fn();
      render(<InlineExpand {...defaultProps} expanded={false} onToggle={onToggle} />);
      fireEvent.click(screen.getByRole('button'));
      expect(onToggle).toHaveBeenCalledWith(true);
    });

    it('calls onToggle with false when collapsing', () => {
      const onToggle = jest.fn();
      render(<InlineExpand {...defaultProps} expanded={true} onToggle={onToggle} />);
      fireEvent.click(screen.getByRole('button'));
      expect(onToggle).toHaveBeenCalledWith(false);
    });

    it('does not update internal state in controlled mode', () => {
      const onToggle = jest.fn();
      render(<InlineExpand {...defaultProps} expanded={false} onToggle={onToggle} />);
      fireEvent.click(screen.getByRole('button'));
      // Still false because controlled — parent didn't update
      expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('keyboard interaction', () => {
    it('collapses on Escape when expanded', () => {
      const onToggle = jest.fn();
      render(<InlineExpand {...defaultProps} defaultExpanded onToggle={onToggle} />);
      const button = screen.getByRole('button');
      fireEvent.keyDown(button.closest('.eidotter-inline-expand')!, { key: 'Escape' });
      expect(onToggle).toHaveBeenCalledWith(false);
    });

    it('does not collapse on Escape when already collapsed', () => {
      const onToggle = jest.fn();
      render(<InlineExpand {...defaultProps} onToggle={onToggle} />);
      const button = screen.getByRole('button');
      fireEvent.keyDown(button.closest('.eidotter-inline-expand')!, { key: 'Escape' });
      expect(onToggle).not.toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('has aria-expanded attribute', () => {
      render(<InlineExpand {...defaultProps} />);
      expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
    });

    it('has aria-controls linking trigger to content', () => {
      render(<InlineExpand {...defaultProps} />);
      const button = screen.getByRole('button');
      const controlsId = button.getAttribute('aria-controls');
      expect(controlsId).toBeTruthy();
      expect(screen.getByRole('region')).toHaveAttribute('id', controlsId);
    });

    it('indicator is hidden from screen readers', () => {
      render(<InlineExpand {...defaultProps} />);
      const indicator = screen.getByRole('button').querySelector('.eidotter-inline-expand__indicator');
      expect(indicator).toHaveAttribute('aria-hidden', 'true');
    });

    it('content has inert attribute when collapsed', () => {
      render(<InlineExpand {...defaultProps} />);
      // Note: JSDOM does not implement inert behavior — attribute presence is
      // verified here; behavioral enforcement requires browser-level testing
      expect(screen.getByRole('region')).toHaveAttribute('inert');
    });

    it('content does not have inert attribute when expanded', () => {
      render(<InlineExpand {...defaultProps} defaultExpanded />);
      expect(screen.getByRole('region')).not.toHaveAttribute('inert');
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
        <InlineExpand {...defaultProps} defaultExpanded className="extra" />
      );
      const root = container.firstChild;
      expect(root).toHaveClass('eidotter-inline-expand');
      expect(root).toHaveClass('eidotter-inline-expand--expanded');
      expect(root).toHaveClass('extra');
    });
  });

  describe('content rendering', () => {
    it('renders string content', () => {
      render(<InlineExpand {...defaultProps} defaultExpanded />);
      expect(screen.getByRole('region')).toHaveTextContent('expanded content');
    });

    it('renders ReactNode content', () => {
      render(
        <InlineExpand defaultExpanded content={<strong>rich content</strong>}>
          trigger
        </InlineExpand>
      );
      expect(screen.getByRole('region').querySelector('strong')).toHaveTextContent('rich content');
    });
  });

  describe('sources', () => {
    const testSources: InlineExpandSource[] = [
      { title: 'Wikipedia', url: 'https://en.wikipedia.org', favicon: 'https://en.wikipedia.org/favicon.ico' },
      { title: 'MDN', url: 'https://developer.mozilla.org' },
    ];

    it('renders nothing when sources is undefined', () => {
      render(<InlineExpand {...defaultProps} defaultExpanded />);
      expect(screen.getByRole('region').querySelector('.eidotter-inline-expand__sources')).toBeNull();
    });

    it('renders nothing when sources is empty', () => {
      render(<InlineExpand {...defaultProps} defaultExpanded sources={[]} />);
      expect(screen.getByRole('region').querySelector('.eidotter-inline-expand__sources')).toBeNull();
    });

    it('renders source links', () => {
      render(<InlineExpand {...defaultProps} defaultExpanded sources={testSources} />);
      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(2);
    });

    it('renders source titles', () => {
      render(<InlineExpand {...defaultProps} defaultExpanded sources={testSources} />);
      expect(screen.getByText('Wikipedia')).toBeInTheDocument();
      expect(screen.getByText('MDN')).toBeInTheDocument();
    });

    it('sets target and rel attributes on source links', () => {
      render(<InlineExpand {...defaultProps} defaultExpanded sources={testSources} />);
      const links = screen.getAllByRole('link');
      links.forEach(link => {
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
      const list = screen.getByRole('region').querySelector('[role="list"]');
      expect(list).toBeInTheDocument();
      const items = screen.getByRole('region').querySelectorAll('[role="listitem"]');
      expect(items).toHaveLength(2);
    });

    it('uses Google Favicons API when no favicon is provided', () => {
      render(<InlineExpand {...defaultProps} defaultExpanded sources={[testSources[1]]} />);
      const img = screen.getByRole('region').querySelector('.eidotter-inline-expand__source-favicon') as HTMLImageElement;
      expect(img).toBeInTheDocument();
      expect(img.src).toContain('google.com/s2/favicons');
      expect(img.src).toContain('developer.mozilla.org');
    });

    it('renders favicon when provided', () => {
      render(<InlineExpand {...defaultProps} defaultExpanded sources={[testSources[0]]} />);
      const favicon = screen.getByRole('region').querySelector('.eidotter-inline-expand__source-favicon') as HTMLImageElement;
      expect(favicon).toBeInTheDocument();
      expect(favicon).toHaveAttribute('src', 'https://en.wikipedia.org/favicon.ico');
      expect(favicon).toHaveAttribute('alt', '');
      expect(favicon).toHaveAttribute('decoding', 'async');
    });

    it('tries Google Favicons after primary favicon error', () => {
      render(<InlineExpand {...defaultProps} defaultExpanded sources={[testSources[0]]} />);
      const primaryImg = screen.getByRole('region').querySelector('.eidotter-inline-expand__source-favicon') as HTMLImageElement;
      expect(primaryImg.src).toBe('https://en.wikipedia.org/favicon.ico');
      fireEvent.error(primaryImg);
      // After primary error, Google Favicons should be the new src
      const googleImg = screen.getByRole('region').querySelector('.eidotter-inline-expand__source-favicon') as HTMLImageElement;
      expect(googleImg.src).toContain('google.com/s2/favicons');
      expect(googleImg.src).toContain('en.wikipedia.org');
    });

    it('shows [→] fallback when Google Favicons also fails', () => {
      render(<InlineExpand {...defaultProps} defaultExpanded sources={[testSources[0]]} />);
      const primaryImg = screen.getByRole('region').querySelector('.eidotter-inline-expand__source-favicon') as HTMLImageElement;
      fireEvent.error(primaryImg);
      const googleImg = screen.getByRole('region').querySelector('.eidotter-inline-expand__source-favicon') as HTMLImageElement;
      fireEvent.error(googleImg);
      const fallbackIcon = screen.getByRole('region').querySelector('.eidotter-inline-expand__source-icon');
      expect(fallbackIcon).toHaveTextContent('[→]');
      expect(fallbackIcon).toHaveAttribute('aria-hidden', 'true');
    });

    it('shows [→] when Google Favicons also fails for no-favicon source', () => {
      render(<InlineExpand {...defaultProps} defaultExpanded sources={[testSources[1]]} />);
      const googleImg = screen.getByRole('region').querySelector('.eidotter-inline-expand__source-favicon') as HTMLImageElement;
      fireEvent.error(googleImg);
      const fallbackIcon = screen.getByRole('region').querySelector('.eidotter-inline-expand__source-icon');
      expect(fallbackIcon).toHaveTextContent('[→]');
    });

    it('sanitizes javascript: URLs', () => {
      const maliciousSources: InlineExpandSource[] = [
        { title: 'Evil', url: 'javascript:alert(1)' },
      ];
      render(<InlineExpand {...defaultProps} defaultExpanded sources={maliciousSources} />);
      const link = screen.getByLabelText('Evil (opens external website)');
      expect(link).not.toHaveAttribute('href');
    });

    it('sanitizes javascript: favicon URLs by falling back to Google Favicons', () => {
      const maliciousSources: InlineExpandSource[] = [
        { title: 'Evil', url: 'https://example.com', favicon: 'javascript:alert(1)' },
      ];
      render(<InlineExpand {...defaultProps} defaultExpanded sources={maliciousSources} />);
      // Invalid favicon URL skips to Google Favicons API — no javascript: src ever set
      const img = screen.getByRole('region').querySelector('.eidotter-inline-expand__source-favicon') as HTMLImageElement;
      expect(img).toBeInTheDocument();
      expect(img.src).toContain('google.com/s2/favicons');
      expect(img.src).not.toContain('javascript');
    });
  });
});
