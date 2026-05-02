import React from 'react';
import { render, screen } from '@testing-library/react';
import { LegalPage } from './LegalPage';

describe('LegalPage', () => {
  it('renders title, date, and body content', () => {
    render(
      <LegalPage title="Impressum" date="Stand: April 2026">
        <h2>Section</h2>
        <p>Body paragraph.</p>
      </LegalPage>
    );

    expect(screen.getByRole('heading', { level: 1, name: 'Impressum' })).toBeInTheDocument();
    expect(screen.getByText('Stand: April 2026')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Section' })).toBeInTheDocument();
    expect(screen.getByText('Body paragraph.')).toBeInTheDocument();
  });

  it('renders intro when provided', () => {
    render(
      <LegalPage title="Datenschutz" date="Stand: April 2026" intro="Lead paragraph.">
        <p>Body.</p>
      </LegalPage>
    );

    expect(screen.getByText('Lead paragraph.')).toBeInTheDocument();
  });

  it('does not render intro slot when omitted', () => {
    const { container } = render(
      <LegalPage title="Impressum" date="Stand: April 2026">
        <p>Body.</p>
      </LegalPage>
    );

    expect(container.querySelector('.eidotter-legal-page__intro')).not.toBeInTheDocument();
  });

  it('renders home slot when provided', () => {
    render(
      <LegalPage
        title="Impressum"
        date="Stand: April 2026"
        home={<a href="/">← Home</a>}
      >
        <p>Body.</p>
      </LegalPage>
    );

    expect(screen.getByRole('link', { name: '← Home' })).toBeInTheDocument();
  });

  it('does not render home wrapper when home slot is absent', () => {
    const { container } = render(
      <LegalPage title="Impressum" date="Stand: April 2026">
        <p>Body.</p>
      </LegalPage>
    );

    expect(container.querySelector('.eidotter-legal-page__home')).not.toBeInTheDocument();
  });

  it('applies custom className alongside the eidotter base class', () => {
    const { container } = render(
      <LegalPage title="Impressum" date="Stand: April 2026" className="custom-page">
        <p>Body.</p>
      </LegalPage>
    );

    const root = container.querySelector('.eidotter-legal-page');
    expect(root).toBeInTheDocument();
    expect(root).toHaveClass('custom-page');
  });

  it('spreads additional HTML attributes onto the wrapper', () => {
    const { container } = render(
      <LegalPage
        title="Impressum"
        date="Stand: April 2026"
        data-testid="legal-root"
      >
        <p>Body.</p>
      </LegalPage>
    );

    expect(container.querySelector('[data-testid="legal-root"]')).toBeInTheDocument();
  });

  it('wraps body in an <article> for semantics', () => {
    const { container } = render(
      <LegalPage title="Impressum" date="Stand: April 2026">
        <p>Body.</p>
      </LegalPage>
    );

    const article = container.querySelector('article');
    expect(article).toBeInTheDocument();
    expect(article).toContainHTML('<p>Body.</p>');
  });
});
