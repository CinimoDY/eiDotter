/**
 * Tests for the content-provenance utility-CSS API (src/styles/provenance.css).
 *
 * Provenance is a pure-CSS primitive — no React component ships here.
 * These tests verify the HTML attribute contract that the CSS selectors target:
 *   [data-provenance="ai-draft"]  per-paragraph marker
 *   [data-ai-block]               whole-section wrapper
 *   [data-ai-skip="true"]         opt-out escape hatch
 *   code/kbd/samp/pre             code-legibility reset inside ai-draft regions
 *
 * CSS is mocked (identity-obj-proxy) in this environment; tests confirm that
 * the attributes callers must set are correctly reflected in the DOM — the
 * prerequisite for the CSS rules to fire in a real browser.
 *
 * See DMNC-884 (Phase 1), DMNC-946 (gradient restyle), DMNC-1013 (this coverage).
 */
import React from 'react';
import { render } from '@testing-library/react';

// ─── per-paragraph: data-provenance="ai-draft" ───────────────────────────────

describe('data-provenance="ai-draft" per-paragraph contract', () => {
  it('attribute is present on a marked <p>', () => {
    const { container } = render(<p data-provenance="ai-draft">Draft</p>);
    expect(container.querySelector('[data-provenance="ai-draft"]')).not.toBeNull();
  });

  it('attribute value is exactly "ai-draft"', () => {
    const { container } = render(<p data-provenance="ai-draft">Draft</p>);
    const el = container.querySelector('[data-provenance="ai-draft"]');
    expect(el?.getAttribute('data-provenance')).toBe('ai-draft');
  });

  it('attribute applies to a <li> element', () => {
    const { container } = render(
      <ul>
        <li data-provenance="ai-draft">AI item</li>
      </ul>,
    );
    const el = container.querySelector('[data-provenance="ai-draft"]');
    expect(el?.tagName).toBe('LI');
  });

  it('attribute applies to a <blockquote> element', () => {
    const { container } = render(
      <blockquote data-provenance="ai-draft">AI quote</blockquote>,
    );
    const el = container.querySelector('[data-provenance="ai-draft"]');
    expect(el?.tagName).toBe('BLOCKQUOTE');
  });

  it('paragraphs without the attribute carry no data-provenance', () => {
    const { container } = render(<p>Human text</p>);
    expect(container.querySelector('[data-provenance]')).toBeNull();
  });

  it('only "ai-draft" triggers the marker — other values are no-ops', () => {
    const { container } = render(<p data-provenance="human">Human text</p>);
    // Not matched by the ai-draft selector
    expect(container.querySelector('[data-provenance="ai-draft"]')).toBeNull();
    // But the attribute itself is present at the value the caller set
    expect(container.querySelector('[data-provenance="human"]')).not.toBeNull();
  });

  it('multiple paragraphs can each carry the attribute independently', () => {
    const { container } = render(
      <div>
        <p data-provenance="ai-draft">First draft</p>
        <p>Revised</p>
        <p data-provenance="ai-draft">Second draft</p>
      </div>,
    );
    expect(container.querySelectorAll('[data-provenance="ai-draft"]')).toHaveLength(2);
  });

  it('text content is preserved on the marked element', () => {
    const { container } = render(
      <p data-provenance="ai-draft">Preserved content</p>,
    );
    expect(container.querySelector('[data-provenance="ai-draft"]')?.textContent).toBe(
      'Preserved content',
    );
  });
});

// ─── whole-section: data-ai-block ────────────────────────────────────────────

describe('data-ai-block whole-section mode', () => {
  it('attribute is present on the wrapper element', () => {
    const { container } = render(
      <article data-ai-block>
        <p>Prose</p>
      </article>,
    );
    expect(container.querySelector('[data-ai-block]')).not.toBeNull();
  });

  it('prose children are accessible inside the wrapper', () => {
    const { container } = render(
      <article data-ai-block>
        <h2>Heading</h2>
        <p>Paragraph</p>
      </article>,
    );
    const wrapper = container.querySelector('[data-ai-block]');
    expect(wrapper?.querySelector('h2')?.textContent).toBe('Heading');
    expect(wrapper?.querySelector('p')?.textContent).toBe('Paragraph');
  });

  it('all targeted prose element types render inside the wrapper', () => {
    const { container } = render(
      <article data-ai-block>
        <h1>h1</h1>
        <h2>h2</h2>
        <h3>h3</h3>
        <p>p</p>
        <ul>
          <li>li</li>
        </ul>
        <blockquote>bq</blockquote>
        <strong>strong</strong>
        <em>em</em>
      </article>,
    );
    const wrapper = container.querySelector('[data-ai-block]');
    expect(wrapper?.querySelector('h1')).not.toBeNull();
    expect(wrapper?.querySelector('h2')).not.toBeNull();
    expect(wrapper?.querySelector('h3')).not.toBeNull();
    expect(wrapper?.querySelector('p')).not.toBeNull();
    expect(wrapper?.querySelector('li')).not.toBeNull();
    expect(wrapper?.querySelector('blockquote')).not.toBeNull();
    expect(wrapper?.querySelector('strong')).not.toBeNull();
    expect(wrapper?.querySelector('em')).not.toBeNull();
  });

  it('wrapper does not carry data-provenance itself', () => {
    const { container } = render(<article data-ai-block><p>x</p></article>);
    const wrapper = container.querySelector('[data-ai-block]');
    expect(wrapper?.hasAttribute('data-provenance')).toBe(false);
  });
});

// ─── opt-out: data-ai-skip="true" ────────────────────────────────────────────

describe('data-ai-skip="true" opt-out', () => {
  it('attribute is present on the skip wrapper inside a data-ai-block section', () => {
    const { container } = render(
      <article data-ai-block>
        <p>Marked</p>
        <div data-ai-skip="true">
          <p>Exempt</p>
        </div>
      </article>,
    );
    expect(container.querySelector('[data-ai-skip="true"]')).not.toBeNull();
  });

  it('attribute value is exactly "true"', () => {
    const { container } = render(
      <div data-ai-skip="true"><p>x</p></div>,
    );
    expect(
      container.querySelector('[data-ai-skip]')?.getAttribute('data-ai-skip'),
    ).toBe('true');
  });

  it('content inside the skip wrapper renders and is readable', () => {
    const { container } = render(
      <article data-ai-block>
        <div data-ai-skip="true">
          <p>Exempt paragraph</p>
        </div>
      </article>,
    );
    expect(container.querySelector('[data-ai-skip="true"]')?.textContent).toContain(
      'Exempt paragraph',
    );
  });

  it('skip attribute can be placed directly on a data-provenance element', () => {
    const { container } = render(
      <p data-provenance="ai-draft" data-ai-skip="true">Override</p>,
    );
    const el = container.querySelector('[data-provenance="ai-draft"][data-ai-skip="true"]');
    expect(el).not.toBeNull();
  });

  // DMNC-1314: a skip element nested INSIDE a provenance paragraph. The CSS
  // resets it to a concrete body colour (not `inherit`, which would resolve to
  // the ancestor's `transparent`). CSS is mocked here, so assert the DOM
  // contract the new selector `[data-provenance="ai-draft"] [data-ai-skip]`
  // targets: the skip span is a descendant of the ai-draft paragraph.
  it('skip element nested inside a data-provenance="ai-draft" paragraph is queryable', () => {
    const { container } = render(
      <p data-provenance="ai-draft">
        Marked prose <span data-ai-skip="true">exempt inline span</span> more marked prose.
      </p>,
    );
    const skip = container.querySelector(
      '[data-provenance="ai-draft"] [data-ai-skip="true"]',
    );
    expect(skip).not.toBeNull();
    expect(skip?.textContent).toBe('exempt inline span');
  });

  it('skip wrapper sits alongside marked and unmarked siblings', () => {
    const { container } = render(
      <article data-ai-block>
        <p>Marked</p>
        <div data-ai-skip="true">
          <p>Exempt</p>
        </div>
        <p>Marked again</p>
      </article>,
    );
    expect(container.querySelectorAll('p')).toHaveLength(3);
    expect(container.querySelector('[data-ai-skip="true"]')).not.toBeNull();
  });
});

// ─── code legibility reset ────────────────────────────────────────────────────
// provenance.css resets -webkit-text-fill-color on code/kbd/samp/pre so glyphs
// stay visible. Tests confirm the elements and their text survive rendering.

describe('code-element legibility inside ai-draft regions', () => {
  it('<code> inside data-provenance="ai-draft" retains its text content', () => {
    const { container } = render(
      <p data-provenance="ai-draft">
        Run <code>npm install</code> first.
      </p>,
    );
    const code = container.querySelector('code');
    expect(code).not.toBeNull();
    expect(code?.textContent).toBe('npm install');
  });

  it('<kbd> inside data-provenance="ai-draft" retains its text content', () => {
    const { container } = render(
      <p data-provenance="ai-draft">
        Press <kbd>Ctrl+C</kbd>.
      </p>,
    );
    expect(container.querySelector('kbd')?.textContent).toBe('Ctrl+C');
  });

  it('<samp> inside data-provenance="ai-draft" retains its text content', () => {
    const { container } = render(
      <p data-provenance="ai-draft">
        Output: <samp>OK</samp>
      </p>,
    );
    expect(container.querySelector('samp')?.textContent).toBe('OK');
  });

  it('<pre> inside data-provenance="ai-draft" retains its text content', () => {
    // <pre> cannot be nested inside <p> (invalid HTML); use a block wrapper.
    const { container } = render(
      <div data-provenance="ai-draft">
        <pre>const x = 1;</pre>
      </div>,
    );
    expect(container.querySelector('pre')?.textContent).toBe('const x = 1;');
  });

  it('<code> inside data-ai-block retains its text content', () => {
    const { container } = render(
      <article data-ai-block>
        <p>
          See <code>src/styles/provenance.css</code>.
        </p>
      </article>,
    );
    expect(container.querySelector('code')?.textContent).toBe('src/styles/provenance.css');
  });

  it('code element directly carrying data-provenance="ai-draft" renders text', () => {
    const { container } = render(<code data-provenance="ai-draft">inline</code>);
    const el = container.querySelector('code[data-provenance="ai-draft"]');
    expect(el).not.toBeNull();
    expect(el?.textContent).toBe('inline');
  });
});
