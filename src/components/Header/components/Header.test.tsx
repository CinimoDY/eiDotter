import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from './Header';

const items = [
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

describe('Header', () => {
  it('renders brandName as text', () => {
    render(<Header brandName="DMNC.TECH" items={items} />);
    expect(screen.getByText('DMNC.TECH')).toBeInTheDocument();
  });

  it('renders brandName as a link to "/" by default', () => {
    render(<Header brandName="SITE" items={items} />);
    const link = screen.getByText('SITE').closest('a');
    expect(link).toHaveAttribute('href', '/');
  });

  it('renders brandName with custom brandHref', () => {
    render(<Header brandName="SITE" brandHref="/home" items={items} />);
    const link = screen.getByText('SITE').closest('a');
    expect(link).toHaveAttribute('href', '/home');
  });

  it('renders children instead of brandName when provided', () => {
    render(
      <Header items={items}>
        <span data-testid="custom-brand">Custom Logo</span>
      </Header>,
    );
    expect(screen.getByTestId('custom-brand')).toBeInTheDocument();
  });

  it('renders navigation items', () => {
    render(<Header brandName="SITE" items={items} />);
    expect(screen.getAllByText('Projects').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Blog').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Contact').length).toBeGreaterThanOrEqual(1);
  });

  it('renders both desktop and mobile navs', () => {
    const { container } = render(<Header brandName="SITE" items={items} />);
    expect(container.querySelector('.eidotter-nav--desktop')).toBeInTheDocument();
    expect(container.querySelector('.eidotter-nav--mobile')).toBeInTheDocument();
  });

  it('passes activeHref to nav', () => {
    render(<Header brandName="SITE" items={items} activeHref="/blog" />);
    const activeLinks = document.querySelectorAll('.eidotter-nav__link--active');
    expect(activeLinks.length).toBeGreaterThan(0);
  });

  it('applies retro variant by default', () => {
    const { container } = render(<Header brandName="SITE" items={items} />);
    expect(container.querySelector('.eidotter-header--retro')).toBeInTheDocument();
  });

  it('applies modern variant', () => {
    const { container } = render(<Header brandName="SITE" items={items} variant="modern" />);
    expect(container.querySelector('.eidotter-header--modern')).toBeInTheDocument();
  });

  it('is sticky by default', () => {
    const { container } = render(<Header brandName="SITE" items={items} />);
    const header = container.querySelector('.eidotter-header');
    expect(header).toHaveClass('sticky');
  });

  it('removes sticky when sticky={false}', () => {
    const { container } = render(<Header brandName="SITE" items={items} sticky={false} />);
    const header = container.querySelector('.eidotter-header');
    expect(header).not.toHaveClass('sticky');
  });

  it('passes variant to nav components', () => {
    const { container } = render(<Header brandName="SITE" items={items} variant="modern" />);
    expect(container.querySelector('.eidotter-nav--modern')).toBeInTheDocument();
  });

  it('uses custom linkComponent for branding and nav', () => {
    const CustomLink = ({
      href,
      children,
      ...props
    }: {
      href: string;
      children: React.ReactNode;
      className?: string;
      onClick?: () => void;
    }) => (
      <span data-href={href} {...props}>
        {children}
      </span>
    );
    render(<Header brandName="SITE" items={items} linkComponent={CustomLink} />);
    const brandingLink = screen.getByText('SITE').closest('span');
    expect(brandingLink).toHaveAttribute('data-href', '/');
    const projectLinks = screen.getAllByText('Projects');
    expect(projectLinks[0].closest('span')).toHaveAttribute('data-href', '/projects');
  });

  it('renders as a header element with banner role', () => {
    render(<Header brandName="SITE" items={items} />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Header brandName="SITE" items={items} className="custom-class" />,
    );
    expect(container.querySelector('.eidotter-header')).toHaveClass('custom-class');
  });

  it('spreads HTML attributes', () => {
    render(<Header brandName="SITE" items={items} data-testid="my-header" />);
    expect(screen.getByTestId('my-header')).toBeInTheDocument();
  });

  it('renders mobile hamburger', () => {
    render(<Header brandName="SITE" items={items} />);
    expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
  });

  describe('brandHref safety', () => {
    it('falls back to "/" when brandHref uses an unsafe scheme', () => {
      render(<Header brandName="SITE" brandHref="javascript:alert(1)" items={items} />);
      const link = screen.getByText('SITE').closest('a');
      expect(link).toHaveAttribute('href', '/');
    });

    it('falls back to "/" through a custom linkComponent', () => {
      const CustomLink = ({
        href,
        children,
        ...props
      }: {
        href: string;
        children: React.ReactNode;
        className?: string;
        onClick?: () => void;
      }) => (
        <span data-href={href} {...props}>
          {children}
        </span>
      );
      render(
        <Header
          brandName="SITE"
          brandHref="javascript:alert(1)"
          items={items}
          linkComponent={CustomLink}
        />,
      );
      const brandingLink = screen.getByText('SITE').closest('span');
      expect(brandingLink).toHaveAttribute('data-href', '/');
    });
  });

  describe('context', () => {
    const contextCategories = [
      { key: 'work',  label: 'work',  icon: 'Check',  href: '/work' },
      { key: 'ideas', label: 'ideas', icon: 'Info',   href: '/ideas' },
      { key: 'misc',  label: 'misc',  icon: 'folder', href: '/misc' }, // unknown icon
    ];

    const CustomLink = ({
      href,
      children,
      ...props
    }: {
      href: string;
      children: React.ReactNode;
      className?: string;
      onClick?: () => void;
    }) => (
      <span data-href={href} {...props}>
        {children}
      </span>
    );

    let openSpy: jest.SpyInstance;
    beforeEach(() => {
      openSpy = jest
        .spyOn(window, 'open')
        .mockReturnValue({ focus: jest.fn() } as unknown as Window);
    });
    afterEach(() => {
      openSpy.mockRestore();
    });

    it('renders no context row and a single-row layout when context is absent', () => {
      const { container } = render(<Header brandName="SITE" items={items} />);
      expect(container.querySelector('.eidotter-header__context')).toBeNull();
      expect(container.querySelector('.eidotter-header__main')).toBeNull();
      const header = container.querySelector('.eidotter-header')!;
      const branding = container.querySelector('.eidotter-header__branding')!;
      expect(branding.parentElement).toBe(header); // direct child, no __main wrapper
    });

    it('treats an empty context (no categories, no returnTo) as absent', () => {
      const { container } = render(
        <Header brandName="SITE" items={items} context={{ categories: [] }} />,
      );
      expect(container.querySelector('.eidotter-header__context')).toBeNull();
      expect(container.querySelector('.eidotter-header__main')).toBeNull();
      const header = container.querySelector('.eidotter-header')!;
      expect(header).toHaveClass('items-center');
      expect(header).not.toHaveClass('flex-col');
    });

    it('renders a category link per category with hrefs, keys, and badges', () => {
      const { container } = render(
        <Header brandName="SITE" items={items} context={{ categories: contextCategories }} />,
      );
      expect(container.querySelectorAll('.eidotter-header__category')).toHaveLength(3);
      const workItem = container.querySelector('li[data-category-key="work"]');
      expect(workItem).toBeInTheDocument();
      const workLink = workItem!.querySelector('.eidotter-header__category')!;
      expect(workLink).toHaveAttribute('href', '/work');
      expect(workLink.querySelector('.eidotter-badge')).toBeInTheDocument();
    });

    it('renders an icon only for known icon names, label-only otherwise', () => {
      const { container } = render(
        <Header brandName="SITE" items={items} context={{ categories: contextCategories }} />,
      );
      const workItem = container.querySelector('li[data-category-key="work"]')!;
      const icon = workItem.querySelector('.eidotter-header__category-icon');
      expect(icon).toBeInTheDocument();
      expect(icon!.closest('[aria-hidden="true"]')).toBeInTheDocument();

      const miscItem = container.querySelector('li[data-category-key="misc"]')!;
      expect(miscItem.querySelector('.eidotter-header__category-icon')).toBeNull();
      // no empty aria-hidden wrapper span for the missing icon
      expect(miscItem.querySelector('[aria-hidden="true"]')).toBeNull();
      expect(miscItem.textContent).toContain('misc');
    });

    it('labels the categories nav landmark uniquely', () => {
      render(<Header brandName="SITE" items={items} context={{ categories: contextCategories }} />);
      expect(screen.getByRole('navigation', { name: 'Categories' })).toBeInTheDocument();
    });

    it('routes category links through a custom linkComponent', () => {
      const { container } = render(
        <Header
          brandName="SITE"
          items={items}
          linkComponent={CustomLink}
          context={{ categories: contextCategories }}
        />,
      );
      const workLink = container.querySelector('li[data-category-key="work"] .eidotter-header__category')!;
      expect(workLink.tagName).toBe('SPAN');
      expect(workLink).toHaveAttribute('data-href', '/work');
    });

    it('marks the active category with aria-current and the active class', () => {
      const { container } = render(
        <Header
          brandName="SITE"
          items={items}
          activeHref="/ideas"
          context={{ categories: contextCategories }}
        />,
      );
      const ideas = container.querySelector('li[data-category-key="ideas"] .eidotter-header__category')!;
      expect(ideas).toHaveAttribute('aria-current', 'page');
      expect(ideas).toHaveClass('eidotter-header__category--active');
      const work = container.querySelector('li[data-category-key="work"] .eidotter-header__category')!;
      expect(work).not.toHaveAttribute('aria-current');
    });

    it('renders the returnTo pill with an accessible name and href', () => {
      render(
        <Header
          brandName="SITE"
          items={items}
          context={{
            categories: contextCategories,
            returnTo: { label: 'Back to Rizomorf', href: '/home' },
          }}
        />,
      );
      const pill = screen.getByRole('link', { name: 'Back to Rizomorf' });
      expect(pill).toHaveAttribute('href', '/home');
    });

    it('uses linkComponent for the same-tab returnTo pill and never calls window.open', () => {
      const { container } = render(
        <Header
          brandName="SITE"
          items={items}
          linkComponent={CustomLink}
          context={{ categories: contextCategories, returnTo: { label: 'Back', href: '/home' } }}
        />,
      );
      const pill = container.querySelector('.eidotter-header__return')!;
      expect(pill.tagName).toBe('SPAN');
      expect(pill).toHaveAttribute('data-href', '/home');
      fireEvent.click(pill);
      expect(openSpy).not.toHaveBeenCalled();
    });

    it('renders the reuseTab pill as a real anchor, bypassing linkComponent', () => {
      const { container } = render(
        <Header
          brandName="SITE"
          items={items}
          linkComponent={CustomLink}
          context={{
            categories: contextCategories,
            returnTo: { label: 'Back', href: '#back', reuseTab: true },
          }}
        />,
      );
      const pill = container.querySelector('.eidotter-header__return')!;
      expect(pill.tagName).toBe('A');
    });

    it('opens the named tab on a plain reuseTab click and prevents default', () => {
      const focus = jest.fn();
      openSpy.mockReturnValue({ focus } as unknown as Window);
      const { container } = render(
        <Header
          brandName="SITE"
          items={items}
          context={{
            categories: contextCategories,
            returnTo: { label: 'Back', href: '#back', reuseTab: true },
          }}
        />,
      );
      const pill = container.querySelector('.eidotter-header__return')!;
      const notPrevented = fireEvent.click(pill);
      expect(openSpy).toHaveBeenCalledWith('#back', 'rizomorf-shell');
      expect(notPrevented).toBe(false); // default prevented
      expect(focus).toHaveBeenCalled();
    });

    it('lets modified clicks (ctrl) fall through to native new-tab behavior', () => {
      const { container } = render(
        <Header
          brandName="SITE"
          items={items}
          context={{
            categories: contextCategories,
            returnTo: { label: 'Back', href: '#back', reuseTab: true },
          }}
        />,
      );
      const pill = container.querySelector('.eidotter-header__return')!;
      const notPrevented = fireEvent.click(pill, { ctrlKey: true });
      expect(openSpy).not.toHaveBeenCalled();
      expect(notPrevented).toBe(true); // default NOT prevented
    });

    it('falls back to same-tab nav when the popup is blocked', () => {
      openSpy.mockReturnValue(null);
      const { container } = render(
        <Header
          brandName="SITE"
          items={items}
          context={{
            categories: contextCategories,
            returnTo: { label: 'Back', href: '#back', reuseTab: true },
          }}
        />,
      );
      const pill = container.querySelector('.eidotter-header__return')!;
      const notPrevented = fireEvent.click(pill);
      expect(openSpy).toHaveBeenCalledWith('#back', 'rizomorf-shell');
      expect(notPrevented).toBe(true); // not prevented → same-tab fallback
    });

    it('renders the context row under both variants', () => {
      const { container: retro } = render(
        <Header brandName="SITE" items={items} variant="retro" context={{ categories: contextCategories }} />,
      );
      expect(retro.querySelector('.eidotter-header--retro .eidotter-header__context')).toBeInTheDocument();
      const { container: modern } = render(
        <Header brandName="SITE" items={items} variant="modern" context={{ categories: contextCategories }} />,
      );
      expect(modern.querySelector('.eidotter-header--modern .eidotter-header__context')).toBeInTheDocument();
    });

    it('lays out as two rows (flex-col) while staying sticky', () => {
      const { container } = render(
        <Header brandName="SITE" items={items} context={{ categories: contextCategories }} />,
      );
      const header = container.querySelector('.eidotter-header')!;
      expect(header).toHaveClass('flex-col');
      expect(header).toHaveClass('sticky');
    });

    // --- isSafeHref guards (deviation from plan trap-14; consistent with #470) ---
    it('renders an unsafe category href as a non-anchor span', () => {
      const { container } = render(
        <Header
          brandName="SITE"
          items={items}
          context={{ categories: [{ key: 'x', label: 'x', icon: 'folder', href: 'javascript:alert(1)' }] }}
        />,
      );
      const link = container.querySelector('li[data-category-key="x"] .eidotter-header__category')!;
      expect(link.tagName).toBe('SPAN');
      expect(link).not.toHaveAttribute('href');
    });

    it('renders an unsafe returnTo href as a non-anchor span and never opens a tab', () => {
      const { container } = render(
        <Header
          brandName="SITE"
          items={items}
          context={{
            categories: contextCategories,
            returnTo: { label: 'Back', href: 'javascript:alert(1)', reuseTab: true },
          }}
        />,
      );
      const pill = container.querySelector('.eidotter-header__return')!;
      expect(pill.tagName).toBe('SPAN');
      fireEvent.click(pill);
      expect(openSpy).not.toHaveBeenCalled();
    });
  });
});
