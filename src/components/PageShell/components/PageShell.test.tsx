import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { readFileSync } from 'fs';
import { join } from 'path';
import { PageShell } from './PageShell';
import { PageSection } from './PageSection';
import { Header } from '../../Header';

const css = readFileSync(join(__dirname, 'PageShell.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');

describe('PageShell', () => {
  it('renders children inside a main landmark within the centred column', () => {
    const { container } = render(<PageShell><p>Body</p></PageShell>);
    const root = container.firstElementChild!;
    expect(root).toHaveClass('eidotter-page-shell');
    const column = root.querySelector(':scope > .eidotter-page-shell__column')!;
    const main = screen.getByRole('main');
    expect(column).toContainElement(main);
    expect(main).toHaveTextContent('Body');
  });

  it('contentAs="div" renders no main landmark (for layouts that already have one)', () => {
    render(<PageShell contentAs="div"><p>Body</p></PageShell>);
    expect(screen.queryByRole('main')).not.toBeInTheDocument();
    expect(screen.getByText('Body').parentElement).toHaveClass('eidotter-page-shell__content');
  });

  it('puts contentId on the content element (skip-link target)', () => {
    render(<PageShell contentId="content"><p>Body</p></PageShell>);
    expect(screen.getByRole('main')).toHaveAttribute('id', 'content');
  });

  it('contentId makes the content focusable by script, so a skip link moves focus (DMNC-1617)', () => {
    render(<PageShell contentId="content"><p>Body</p></PageShell>);
    const main = screen.getByRole('main');
    expect(main).toHaveAttribute('tabindex', '-1');
    main.focus();
    expect(main).toHaveFocus();
  });

  it('without contentId the content is not focusable', () => {
    render(<PageShell><p>Body</p></PageShell>);
    expect(screen.getByRole('main')).not.toHaveAttribute('tabindex');
  });

  it('places header and footer inside the column, around the content', () => {
    const { container } = render(
      <PageShell header={<div data-testid="hdr" />} footer={<div data-testid="ftr" />}>
        <p>Body</p>
      </PageShell>,
    );
    const column = container.querySelector('.eidotter-page-shell__column')!;
    const kids = Array.from(column.children).map((el) => el.className);
    expect(kids).toEqual([
      'eidotter-page-shell__header',
      'eidotter-page-shell__content',
      'eidotter-page-shell__footer',
    ]);
    expect(screen.getByTestId('hdr').parentElement).toHaveClass('eidotter-page-shell__header');
    expect(screen.getByTestId('ftr').parentElement).toHaveClass('eidotter-page-shell__footer');
  });

  it('a Header in the header slot keeps its banner role (it is outside main)', () => {
    render(
      <PageShell header={<Header brandName="EXAMPLE" items={[]} layout="stacked" rule={false} />}>
        <p>Body</p>
      </PageShell>,
    );
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('omits empty slots', () => {
    const { container } = render(<PageShell header={false} footer={null}><p>Body</p></PageShell>);
    expect(container.querySelector('.eidotter-page-shell__header')).toBeNull();
    expect(container.querySelector('.eidotter-page-shell__footer')).toBeNull();
  });

  it('maxWidth sets --eidotter-page-shell-max and merges consumer style', () => {
    const { container } = render(<PageShell maxWidth="960px" style={{ color: 'inherit' }} />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.style.getPropertyValue('--eidotter-page-shell-max')).toBe('960px');
    expect(root.style.color).toBe('inherit');
  });

  it('defaults the column to 1240px', () => {
    expect(css).toMatch(/max-width:\s*var\(--eidotter-page-shell-max,\s*1240px\)/);
  });

  it('forwards ref and spreads attributes to the root', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<PageShell ref={ref} data-testid="shell" className="extra" />);
    expect(ref.current).toBe(screen.getByTestId('shell'));
    expect(ref.current).toHaveClass('eidotter-page-shell', 'extra');
  });

  describe('intro', () => {
    const intro = {
      eyebrow: 'Example · fixture',
      title: 'Example review',
      lead: 'Lead paragraph.',
      meta: <><span>Branch: <b>example</b></span><span>Captured: <b>today</b></span></>,
      toc: [
        { href: '#findings', label: 'Findings' },
        { href: '#numbers', label: 'Measured' },
      ],
    };

    it('renders eyebrow, an h1 title, lead and meta in order', () => {
      const { container } = render(<PageShell intro={intro} />);
      const header = container.querySelector('.eidotter-page-shell__intro')!;
      expect(header.tagName).toBe('HEADER');
      expect(screen.getByRole('heading', { level: 1, name: 'Example review' })).toBeInTheDocument();
      expect(Array.from(header.children).map((el) => el.className)).toEqual([
        'eidotter-page-shell__eyebrow',
        'eidotter-page-shell__title',
        'eidotter-page-shell__lead',
        'eidotter-page-shell__meta',
        'eidotter-page-shell__toc',
      ]);
    });

    it('the intro header is inside main (scoped to it, so not a second banner)', () => {
      // jsdom's role mapping ignores the main scoping; the real-browser axe
      // gate covers landmark rules. Pin the structure here.
      const { container } = render(<PageShell intro={intro} />);
      const introHeader = container.querySelector('.eidotter-page-shell__intro')!;
      expect(screen.getByRole('main')).toContainElement(introHeader as HTMLElement);
    });

    it('renders the TOC as a labelled nav of chip links', () => {
      render(<PageShell intro={intro} />);
      const nav = screen.getByRole('navigation', { name: 'On this page' });
      const links = within(nav).getAllByRole('link');
      expect(links.map((a) => a.getAttribute('href'))).toEqual(['#findings', '#numbers']);
      expect(links[0]).toHaveClass('eidotter-page-shell__toc-link');
    });

    it('tocLabel names the nav', () => {
      render(<PageShell intro={{ ...intro, tocLabel: 'Surfaces' }} />);
      expect(screen.getByRole('navigation', { name: 'Surfaces' })).toBeInTheDocument();
    });

    it('renders an unsafe TOC href as a plain span', () => {
      render(<PageShell intro={{ title: 'T', toc: [{ href: 'javascript:alert(1)', label: 'Bad' }] }} />);
      expect(screen.queryByRole('link', { name: 'Bad' })).not.toBeInTheDocument();
      expect(screen.getByText('Bad').tagName).toBe('SPAN');
    });

    it('renders only the title when nothing else is given', () => {
      const { container } = render(<PageShell intro={{ title: 'Only' }} />);
      expect(container.querySelector('.eidotter-page-shell__intro')!.children).toHaveLength(1);
      expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
    });
  });

  describe('inherits the page (DMNC-1617)', () => {
    const root = css.match(/\.eidotter-page-shell\s*\{([^}]*)\}/)![1];

    it('paints no ground', () => {
      expect(root).not.toMatch(/background/);
    });

    it('sets no font family, size or line-height on the root', () => {
      expect(root).not.toMatch(/font-family|font-size|line-height/);
    });

    it('column and content tracks can shrink below their children\'s min-content', () => {
      for (const sel of ['column', 'content']) {
        const body = css.match(new RegExp(`\\.eidotter-page-shell__${sel}\\s*\\{([^}]*)\\}`))![1];
        expect(body).toMatch(/grid-template-columns:\s*minmax\(0,\s*1fr\)/);
      }
    });
  });

  describe('no extra lines', () => {
    it('declares no borders on the shell, column, intro or sections (TOC chips only)', () => {
      const rules = Array.from(css.matchAll(/([^{}]+)\{([^}]*)\}/g))
        .filter(([, , body]) => /border(-top|-bottom|-left|-right)?\s*:/.test(body))
        .map(([, sel]) => sel.trim());
      for (const sel of rules) {
        expect(sel).toMatch(/toc-link/);
      }
    });
  });
});

describe('PageSection', () => {
  it('renders a section with an h2 title by default', () => {
    render(<PageSection title="Findings"><p>x</p></PageSection>);
    const heading = screen.getByRole('heading', { level: 2, name: 'Findings' });
    expect(heading).toHaveClass('eidotter-page-section__title');
    expect(heading.closest('section')).toHaveClass('eidotter-page-section');
  });

  it('headingLevel changes the heading element', () => {
    render(<PageSection title="Sub" headingLevel={3} />);
    expect(screen.getByRole('heading', { level: 3, name: 'Sub' })).toBeInTheDocument();
  });

  it('with an id, labels the section by its heading (a named region and a TOC target)', () => {
    const { container } = render(<PageSection id="findings" title="Findings" />);
    const section = container.querySelector('section')!;
    expect(section).toHaveAttribute('id', 'findings');
    expect(section).toHaveAttribute('aria-labelledby', 'findings-heading');
    expect(screen.getByRole('region', { name: 'Findings' })).toBe(section);
  });

  it('without a title renders no heading and no aria-labelledby', () => {
    const { container } = render(<PageSection id="x"><p>x</p></PageSection>);
    expect(container.querySelector('h2')).toBeNull();
    expect(container.querySelector('section')).not.toHaveAttribute('aria-labelledby');
  });

  it('forwards ref and lets consumer aria props win', () => {
    const ref = React.createRef<HTMLElement>();
    render(<PageSection ref={ref} id="s" title="T" aria-labelledby="custom" />);
    expect(ref.current!.tagName).toBe('SECTION');
    expect(ref.current).toHaveAttribute('aria-labelledby', 'custom');
  });
});
