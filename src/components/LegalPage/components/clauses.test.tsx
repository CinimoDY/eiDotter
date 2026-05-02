import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  AddressBlock,
  ImpressumAddress,
  ImpressumContact,
  ImpressumResponsible,
  ImpressumLiabilityContent,
  ImpressumLiabilityLinks,
  DatenschutzController,
  DatenschutzHosting,
  DatenschutzPostHog,
  DatenschutzFonts,
  DatenschutzEncryption,
  DatenschutzRights,
} from './clauses';

describe('AddressBlock', () => {
  it('renders the canonical Düsseldorf address by default', () => {
    const { container } = render(<AddressBlock />);

    expect(container.querySelector('address')).toBeInTheDocument();
    expect(screen.getByText('Dominic Kennedy', { exact: false })).toBeInTheDocument();
    expect(screen.getByText(/Haus-Endt-Str\. 149A/)).toBeInTheDocument();
    expect(screen.getByText(/40593 Düsseldorf/)).toBeInTheDocument();
  });

  it('renders email as a mailto link when provided', () => {
    render(<AddressBlock email="hello@example.com" />);

    const link = screen.getByRole('link', { name: 'hello@example.com' });
    expect(link).toHaveAttribute('href', 'mailto:hello@example.com');
  });

  it('omits email line when no email prop given', () => {
    render(<AddressBlock />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});

describe('Impressum clauses', () => {
  it('ImpressumAddress renders the § 5 DDG header', () => {
    render(<ImpressumAddress />);
    expect(screen.getByRole('heading', { name: /§ 5 DDG/ })).toBeInTheDocument();
  });

  it('ImpressumContact renders a mailto link', () => {
    render(<ImpressumContact email="hello@dmnc.tech" />);
    const link = screen.getByRole('link', { name: 'hello@dmnc.tech' });
    expect(link).toHaveAttribute('href', 'mailto:hello@dmnc.tech');
  });

  it('ImpressumResponsible cites § 18 Abs. 2 MStV', () => {
    render(<ImpressumResponsible />);
    expect(screen.getByRole('heading', { name: /§ 18 Abs\. 2 MStV/ })).toBeInTheDocument();
  });

  it('ImpressumLiabilityContent cites §§ 7-10 DDG', () => {
    render(<ImpressumLiabilityContent />);
    expect(screen.getByText(/§§ 8–10 DDG/)).toBeInTheDocument();
  });

  it('ImpressumLiabilityLinks renders Haftung für Links heading', () => {
    render(<ImpressumLiabilityLinks />);
    expect(screen.getByRole('heading', { name: 'Haftung für Links' })).toBeInTheDocument();
  });
});

describe('Datenschutz clauses', () => {
  it('DatenschutzController renders the email as mailto', () => {
    render(<DatenschutzController email="hello@dmnc.tech" />);
    expect(screen.getByRole('link', { name: 'hello@dmnc.tech' })).toHaveAttribute(
      'href',
      'mailto:hello@dmnc.tech',
    );
  });

  it('DatenschutzHosting cites Cloudflare and Art. 6 Abs. 1 lit. f', () => {
    render(<DatenschutzHosting />);
    expect(screen.getAllByText(/Cloudflare/).length).toBeGreaterThan(0);
    expect(screen.getByText(/Art\. 6 Abs\. 1 lit\. f DSGVO/)).toBeInTheDocument();
  });

  it('DatenschutzPostHog defaults proxy host to e.dmnc.tech', () => {
    render(<DatenschutzPostHog />);
    expect(screen.getByText(/e\.dmnc\.tech/)).toBeInTheDocument();
  });

  it('DatenschutzPostHog accepts a custom proxy host', () => {
    render(<DatenschutzPostHog proxyHost="proxy.example.com" />);
    expect(screen.getByText(/proxy\.example\.com/)).toBeInTheDocument();
    expect(screen.queryByText(/e\.dmnc\.tech/)).not.toBeInTheDocument();
  });

  it('DatenschutzFonts mentions Flexi IBM VGA', () => {
    render(<DatenschutzFonts />);
    expect(screen.getByText(/Flexi IBM VGA True/)).toBeInTheDocument();
  });

  it('DatenschutzEncryption mentions SSL/TLS', () => {
    render(<DatenschutzEncryption />);
    expect(screen.getByText(/SSL-\/TLS-Verschlüsselung/)).toBeInTheDocument();
  });

  it('DatenschutzRights lists Art. 15-21', () => {
    render(<DatenschutzRights />);
    expect(screen.getByText(/Auskunft \(Art\. 15\)/)).toBeInTheDocument();
    expect(screen.getByText(/Widerspruch \(Art\. 21\)/)).toBeInTheDocument();
  });

  it('DatenschutzRights renders rights-exercise email when provided', () => {
    render(<DatenschutzRights email="hello@dmnc.tech" />);
    expect(screen.getByRole('link', { name: 'hello@dmnc.tech' })).toHaveAttribute(
      'href',
      'mailto:hello@dmnc.tech',
    );
  });

  it('DatenschutzRights omits the email paragraph when email is absent', () => {
    render(<DatenschutzRights />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('DatenschutzRights accepts a custom supervisory authority', () => {
    render(<DatenschutzRights supervisoryAuthority="the Bavarian DPA" />);
    expect(screen.getByText(/the Bavarian DPA/)).toBeInTheDocument();
    expect(screen.queryByText(/Nordrhein-Westfalen/)).not.toBeInTheDocument();
  });
});
