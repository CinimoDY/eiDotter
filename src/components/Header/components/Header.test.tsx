import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { readFileSync } from 'fs';
import { join } from 'path';
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
    const brandingLink = screen.getByText('SITE').closest('[data-href]');
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
      const brandingLink = screen.getByText('SITE').closest('[data-href]');
      expect(brandingLink).toHaveAttribute('data-href', '/');
    });
  });

  describe('brand (DMNC-1584)', () => {
    it('defaults to the lockup: decorative Logo svg + uppercase name in the brand link', () => {
      const { container } = render(<Header brandName="SITE" items={items} />);
      const link = container.querySelector('.eidotter-header__branding')!;
      const logo = link.querySelector('svg.eidotter-logo');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('aria-hidden', 'true');
      const name = link.querySelector('.eidotter-header__brand-name')!;
      expect(name).toHaveTextContent('SITE');
      expect(name).toHaveClass('uppercase');
      // accessible name is just the site name, not "eiDotter SITE"
      expect(screen.getByRole('link', { name: 'SITE' })).toBe(link);
    });

    it('brand="mark" renders the Mark + name text', () => {
      const { container } = render(<Header brandName="SITE" brand="mark" items={items} />);
      const link = container.querySelector('.eidotter-header__branding')!;
      expect(link.querySelector('.eidotter-mark')).toBeInTheDocument();
      expect(link.querySelector('svg.eidotter-logo')).toBeNull();
      expect(link.querySelector('.eidotter-header__brand-name')).toHaveTextContent('SITE');
    });

    it('brand="text" renders the name as plain text only', () => {
      const { container } = render(<Header brandName="SITE" brand="text" items={items} />);
      const link = container.querySelector('.eidotter-header__branding')!;
      expect(link.querySelector('svg')).toBeNull();
      expect(link.querySelector('.eidotter-mark')).toBeNull();
      expect(link.querySelector('.eidotter-header__brand-name')).toBeNull();
      expect(link.textContent).toBe('SITE');
    });

    it('children win over brand', () => {
      const { container } = render(
        <Header brandName="SITE" brand="mark" items={items}>
          <span data-testid="custom-brand">Custom</span>
        </Header>,
      );
      const link = container.querySelector('.eidotter-header__branding')!;
      expect(screen.getByTestId('custom-brand')).toBeInTheDocument();
      expect(link.querySelector('.eidotter-mark')).toBeNull();
      expect(link.querySelector('svg.eidotter-logo')).toBeNull();
      expect(link).not.toHaveTextContent('SITE');
    });
  });

  describe('end slot (DMNC-1584)', () => {
    it('renders nothing extra (no actions wrapper) when end is absent', () => {
      const { container } = render(<Header brandName="SITE" items={items} />);
      expect(container.querySelector('.eidotter-header__end')).toBeNull();
      expect(container.querySelector('.eidotter-header__actions')).toBeNull();
    });

    it('treats falsy end (false, empty string) like no end', () => {
      const { container: base } = render(<Header brandName="SITE" items={items} />);
      const { container: off } = render(<Header brandName="SITE" items={items} end={false} />);
      const { container: empty } = render(<Header brandName="SITE" items={items} end="" />);
      const norm = (el: HTMLElement) => el.innerHTML.replace(/_r_[0-9a-z]+_/g, '_r_');
      expect(norm(off)).toBe(norm(base));
      expect(norm(empty)).toBe(norm(base));
      expect(off.querySelector('.eidotter-header__end')).toBeNull();
    });

    it('renders end exactly once, between the desktop nav and the MENU trigger', () => {
      const { container } = render(
        <Header brandName="SITE" items={items} end={<button type="button">TOGGLE</button>} />,
      );
      expect(screen.getAllByRole('button', { name: 'TOGGLE' })).toHaveLength(1);
      const actions = container.querySelector('.eidotter-header__actions')!;
      const kids = Array.from(actions.children);
      const desktop = kids.findIndex((el) => el.classList.contains('eidotter-nav--desktop'));
      const end = kids.findIndex((el) => el.classList.contains('eidotter-header__end'));
      const mobile = kids.findIndex((el) => el.classList.contains('eidotter-nav--mobile'));
      // desktop nav is hidden <768px and the MENU trigger ≥768px, so this one
      // DOM order yields "nav · end" on desktop and "end · MENU" on mobile.
      expect(desktop).toBeGreaterThanOrEqual(0);
      expect(end).toBe(desktop + 1);
      expect(mobile).toBe(end + 1);
      // brand stays first, outside the actions group
      expect(container.querySelector('.eidotter-header')!.firstElementChild)
        .toHaveClass('eidotter-header__branding');
    });

    it('works with the context row layout', () => {
      const { container } = render(
        <Header
          brandName="SITE"
          items={items}
          end={<span data-testid="end">E</span>}
          context={{ categories: [{ key: 'a', label: 'a', icon: 'Info', href: '/a' }] }}
        />,
      );
      expect(container.querySelector('.eidotter-header__main .eidotter-header__end'))
        .toContainElement(screen.getByTestId('end'));
    });
  });

  describe('empty items (DMNC-1611)', () => {
    it('renders no nav landmark and no MENU trigger when items is empty', () => {
      const { container } = render(<Header brandName="SITE" items={[]} />);
      expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
      expect(container.querySelector('nav')).toBeNull();
      expect(container.querySelector('.eidotter-nav--desktop')).toBeNull();
      expect(container.querySelector('.eidotter-nav--mobile')).toBeNull();
      expect(screen.queryByRole('button', { name: /menu/i })).not.toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'SITE' })).toBeInTheDocument();
    });

    it('keeps the end slot when items is empty', () => {
      const { container } = render(
        <Header brandName="SITE" items={[]} end={<button type="button">TOGGLE</button>} />,
      );
      expect(screen.getByRole('button', { name: 'TOGGLE' })).toBeInTheDocument();
      const actions = container.querySelector('.eidotter-header__actions')!;
      expect(Array.from(actions.children).map((el) => el.className)).toEqual([
        expect.stringContaining('eidotter-header__end'),
      ]);
    });

    it('still renders the nav when items are present', () => {
      const { container } = render(<Header brandName="SITE" items={items} />);
      expect(container.querySelector('.eidotter-nav--desktop')).not.toBeNull();
      expect(container.querySelector('.eidotter-nav--mobile')).not.toBeNull();
    });
  });

  describe('end slot clipping (DMNC-1611)', () => {
    // jsdom has no layout; the rendered proof is the "End slot – Switch glow at
    // phone width" story. This pins the CSS contract the story relies on.
    const css = readFileSync(join(__dirname, 'Header.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
    const supports = css.match(/@supports\s*\(overflow:\s*clip\)\s*\{\s*\.eidotter-header__end\s*\{([^}]*)\}/);

    it('clips only the inline axis where overflow: clip is supported', () => {
      expect(supports).not.toBeNull();
      const body = supports![1];
      expect(body).toMatch(/overflow-x:\s*clip/);
      expect(body).toMatch(/overflow-y:\s*visible/);
    });

    it('bleeds the inline clip box far enough for a 12px glow and a 2px+2px focus ring, without moving layout', () => {
      const body = supports![1];
      const pad = body.match(/padding:\s*0\s+(\d+)px/);
      const margin = body.match(/margin:\s*0\s+-(\d+)px/);
      expect(pad).not.toBeNull();
      expect(margin).not.toBeNull();
      expect(Number(pad![1])).toBeGreaterThanOrEqual(12);
      expect(margin![1]).toBe(pad![1]);
    });
  });

  describe('skip link (DMNC-1584)', () => {
    it('is absent by default', () => {
      const { container } = render(<Header brandName="SITE" items={items} />);
      expect(container.querySelector('.eidotter-header__skip')).toBeNull();
    });

    it('renders as the first, first-focusable child when skipLinkTarget is set', () => {
      const { container } = render(<Header brandName="SITE" items={items} skipLinkTarget="#main" />);
      const header = container.querySelector('.eidotter-header')!;
      const skip = screen.getByRole('link', { name: /skip to content/i });
      expect(skip).toHaveAttribute('href', '#main');
      expect(skip).toHaveClass('eidotter-header__skip');
      expect(header.firstElementChild).toBe(skip);
      expect(header.querySelector('a[href], button')).toBe(skip);
    });

    it('renders no skip anchor for an unsafe target', () => {
      const { container } = render(
        <Header brandName="SITE" items={items} skipLinkTarget="javascript:alert(1)" />,
      );
      expect(container.querySelector('.eidotter-header__skip')).toBeNull();
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

  describe('brand wrap (0.42)', () => {
    const css = readFileSync(join(__dirname, 'Header.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
    const rule = (selector: string) => {
      const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const m = css.match(new RegExp(`(?:^|\\})\\s*${escaped}\\s*\\{([^}]*)\\}`));
      return m ? m[1] : null;
    };

    it('never ellipsizes or forces one line on the brand name', () => {
      expect(css).not.toMatch(/text-overflow:\s*ellipsis/);
      const name = rule('.eidotter-header__brand-name');
      expect(name).not.toBeNull();
      expect(name).not.toMatch(/white-space:\s*nowrap/);
      expect(name).not.toMatch(/overflow:\s*hidden/);
      expect(name).toMatch(/overflow-wrap:\s*break-word/);
    });

    it('lets the brand shrink (wrap) before the right-hand group', () => {
      const branding = rule('.eidotter-header__branding');
      const actions = rule('.eidotter-header__actions');
      const shrink = (body: string | null) => Number(body!.match(/flex:\s*0\s+(\d+)\s+auto/)![1]);
      expect(shrink(branding)).toBeGreaterThan(shrink(actions));
    });

    it('floors the brand at its longest word, so a single-word brand never splits (DMNC-1617)', () => {
      // No fixed character floor and no overflow-wrap: anywhere (which lowers
      // min-content to one character): the automatic minimum is the word.
      expect(css).not.toMatch(/overflow-wrap:\s*anywhere/);
      expect(rule('.eidotter-header__branding--icon')).toBeNull();
      expect(rule('.eidotter-header__brand-name')).not.toMatch(/min-width/);
    });

    it('top-aligns the icon beside a wrapped name', () => {
      const { container } = render(<Header brandName="DOMINIC KENNEDY" items={items} />);
      expect(container.querySelector('.eidotter-header__branding')).toHaveClass('items-start');
    });
  });

  describe('brandCollapse (0.42)', () => {
    it('is off by default: no collapse class, name visible', () => {
      const { container } = render(<Header brandName="SITE" items={items} />);
      expect(container.querySelector('header')).not.toHaveClass('eidotter-header--collapse-mark');
    });

    it('brandCollapse="mark" adds the container class and keeps the name as the accessible name', () => {
      const { container } = render(<Header brandName="SITE" brandCollapse="mark" items={items} />);
      expect(container.querySelector('header')).toHaveClass('eidotter-header--collapse-mark');
      const link = screen.getByRole('link', { name: 'SITE' });
      expect(link.querySelector('.eidotter-header__brand-name')).toHaveTextContent('SITE');
    });

    it('works with brand="mark"', () => {
      const { container } = render(<Header brandName="SITE" brand="mark" brandCollapse="mark" items={items} />);
      expect(container.querySelector('header')).toHaveClass('eidotter-header--collapse-mark');
      expect(container.querySelector('.eidotter-mark')).toBeInTheDocument();
    });

    it('is ignored for text brands and custom children (nothing to collapse to)', () => {
      const { container: text } = render(<Header brandName="SITE" brand="text" brandCollapse="mark" items={items} />);
      expect(text.querySelector('header')).not.toHaveClass('eidotter-header--collapse-mark');
      const { container: kids } = render(
        <Header brandCollapse="mark" items={items}><span>Custom</span></Header>,
      );
      expect(kids.querySelector('header')).not.toHaveClass('eidotter-header--collapse-mark');
    });

    it('hides the name visually (not display:none) below 480px of header width', () => {
      const css = readFileSync(join(__dirname, 'Header.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
      expect(css).toMatch(/\.eidotter-header--collapse-mark\s*\{\s*container:\s*eidotter-header\s*\/\s*inline-size;/);
      const block = css.match(/@container eidotter-header \(width < 480px\)\s*\{([\s\S]*)\}\s*$/);
      expect(block).not.toBeNull();
      expect(block![1]).toMatch(/clip-path:\s*inset\(50%\)/);
      expect(block![1]).not.toMatch(/display:\s*none/);
    });
  });

  describe('rule (0.42)', () => {
    it('keeps the rule by default', () => {
      const { container } = render(<Header brandName="SITE" items={items} />);
      expect(container.querySelector('header')).not.toHaveClass('eidotter-header--no-rule');
    });

    it('rule={false} adds the no-rule class, which removes both the border and the glow', () => {
      const { container } = render(<Header brandName="SITE" items={items} rule={false} />);
      expect(container.querySelector('header')).toHaveClass('eidotter-header--no-rule');
      const css = readFileSync(join(__dirname, 'Header.css'), 'utf8');
      const body = css.match(/\.eidotter-header\.eidotter-header--no-rule\s*\{([^}]*)\}/)![1];
      expect(body).toMatch(/border-bottom:\s*0/);
      expect(body).toMatch(/box-shadow:\s*none/);
    });
  });

  describe('layout (0.42)', () => {
    it('defaults to inline with the pre-0.42 DOM (brand and nav are direct children)', () => {
      const { container } = render(<Header brandName="SITE" items={items} />);
      const header = container.querySelector('header')!;
      expect(header).not.toHaveClass('eidotter-header--stacked');
      expect(header.firstElementChild).toHaveClass('eidotter-header__branding');
      expect(container.querySelector('.eidotter-header__main')).toBeNull();
      expect(container.querySelector('.eidotter-header__inner')).toBeNull();
    });

    it('stacked: brand row on top, desktop nav on its own row below it', () => {
      const { container } = render(
        <Header brandName="SITE" items={items} layout="stacked" end={<button type="button">TOGGLE</button>} />,
      );
      const header = container.querySelector('header')!;
      expect(header).toHaveClass('eidotter-header--stacked', 'flex-col');
      const rows = Array.from(header.children);
      expect(rows[0]).toHaveClass('eidotter-header__main');
      expect(rows[1]).toHaveClass('eidotter-nav--desktop', 'eidotter-header__nav-row');
      // end + MENU stay on the brand row
      const main = rows[0];
      expect(main.querySelector('.eidotter-header__end')).toContainElement(screen.getByRole('button', { name: 'TOGGLE' }));
      expect(main.querySelector('.eidotter-nav--mobile')).toBeInTheDocument();
      expect(main.querySelector('.eidotter-nav--desktop')).toBeNull();
      // one desktop nav, one MENU
      expect(container.querySelectorAll('.eidotter-nav--desktop')).toHaveLength(1);
      expect(container.querySelectorAll('.eidotter-nav--mobile')).toHaveLength(1);
    });

    it('stacked with no items renders no nav row', () => {
      const { container } = render(<Header brandName="SITE" items={[]} layout="stacked" />);
      expect(container.querySelector('nav')).toBeNull();
    });

    it('stacked keeps the context row below the nav row', () => {
      const { container } = render(
        <Header
          brandName="SITE"
          items={items}
          layout="stacked"
          context={{ categories: [{ key: 'a', label: 'a', icon: 'Info', href: '/a' }] }}
        />,
      );
      const rows = Array.from(container.querySelector('header')!.children);
      expect(rows.map((r) => r.classList.contains('eidotter-header__main') ? 'main'
        : r.classList.contains('eidotter-nav--desktop') ? 'nav'
          : r.classList.contains('eidotter-header__context') ? 'context' : 'other'))
        .toEqual(['main', 'nav', 'context']);
    });
  });

  describe('contained (0.42)', () => {
    it('true wraps the rows in a centred inner column; the header keeps padding and sticky', () => {
      const { container } = render(<Header brandName="SITE" items={items} contained />);
      const header = container.querySelector('header')!;
      expect(header).toHaveClass('eidotter-header--contained', 'sticky', 'px-4');
      expect(header).not.toHaveClass('flex');
      const inner = header.querySelector(':scope > .eidotter-header__inner')!;
      expect(inner).toHaveClass('flex', 'items-center', 'justify-between');
      expect(inner.firstElementChild).toHaveClass('eidotter-header__branding');
      expect(header.style.getPropertyValue('--eidotter-header-max')).toBe('');
    });

    it('a string sets the column width through --eidotter-header-max and merges consumer style', () => {
      const { container } = render(
        <Header brandName="SITE" items={items} contained="72rem" style={{ color: 'inherit' }} />,
      );
      const header = container.querySelector('header')!;
      expect(header.style.getPropertyValue('--eidotter-header-max')).toBe('72rem');
      expect(header.style.color).toBe('inherit');
    });

    it('a blank string is treated as off', () => {
      const { container } = render(<Header brandName="SITE" items={items} contained="  " />);
      expect(container.querySelector('.eidotter-header__inner')).toBeNull();
    });

    it('keeps the skip link outside the inner column, as the first child', () => {
      const { container } = render(<Header brandName="SITE" items={items} contained skipLinkTarget="#main" />);
      expect(container.querySelector('header')!.firstElementChild).toHaveClass('eidotter-header__skip');
    });

    it('composes with stacked and the context row', () => {
      const { container } = render(
        <Header
          brandName="SITE"
          items={items}
          contained
          layout="stacked"
          context={{ categories: [{ key: 'a', label: 'a', icon: 'Info', href: '/a' }] }}
        />,
      );
      const inner = container.querySelector('.eidotter-header__inner')!;
      expect(inner).toHaveClass('flex-col');
      expect(inner.querySelector(':scope > .eidotter-header__main')).toBeInTheDocument();
      expect(inner.querySelector(':scope > .eidotter-nav--desktop')).toBeInTheDocument();
      expect(inner.querySelector(':scope > .eidotter-header__context')).toBeInTheDocument();
    });
  });
});
