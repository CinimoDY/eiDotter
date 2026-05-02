import React from 'react';

/* German DDG / DSGVO boilerplate clauses — verbatim across portfolio surfaces.
 *
 * Each clause renders its own `<h2>` + body so consumers can drop them in any
 * order. Use inside a <LegalPage> body. The `eidotter-legal-page__basis`
 * class on small "Rechtsgrundlage" footnotes is styled by LegalPage.css.
 */

// ---------- Address (used by both Impressum and Datenschutz) ----------

export interface AddressBlockProps {
  /** Optional email shown after the address. When provided, rendered as a mailto link. */
  email?: string;
  /** Override the postal address. Defaults to the canonical Düsseldorf address. */
  address?: React.ReactNode;
  /** Override the legal name. Defaults to "Dominic Kennedy". */
  name?: string;
}

const DEFAULT_ADDRESS = (
  <>
    Haus-Endt-Str. 149A<br />
    40593 Düsseldorf<br />
    Deutschland
  </>
);

const DEFAULT_NAME = 'Dominic Kennedy';

/** Standalone postal address block — wrapped in `<address>`. */
export const AddressBlock: React.FC<AddressBlockProps> = ({
  email,
  address = DEFAULT_ADDRESS,
  name = DEFAULT_NAME,
}) => (
  <address>
    {name}<br />
    {address}
    {email && (
      <>
        <br />
        E-Mail: <a href={`mailto:${email}`}>{email}</a>
      </>
    )}
  </address>
);

// ---------- Impressum clauses ----------

/** § 5 DDG header + address. */
export const ImpressumAddress: React.FC<Omit<AddressBlockProps, 'email'>> = (props) => (
  <>
    <h2>Angaben gemäß § 5 DDG</h2>
    <AddressBlock {...props} />
  </>
);

/** "Kontakt" header + mailto link. */
export const ImpressumContact: React.FC<{ email: string }> = ({ email }) => (
  <>
    <h2>Kontakt</h2>
    <p>
      E-Mail: <a href={`mailto:${email}`}>{email}</a>
    </p>
  </>
);

/** § 18 Abs. 2 MStV responsibility block — short address (no country line). */
export const ImpressumResponsible: React.FC<{ name?: string }> = ({ name = DEFAULT_NAME }) => (
  <>
    <h2>Inhaltlich verantwortlich (§ 18 Abs. 2 MStV)</h2>
    <address>
      {name}<br />
      Haus-Endt-Str. 149A<br />
      40593 Düsseldorf
    </address>
  </>
);

/** §§ 7-10 DDG content liability disclaimer. */
export const ImpressumLiabilityContent: React.FC = () => (
  <>
    <h2>Haftung für Inhalte</h2>
    <p>
      Ich erstelle die Inhalte dieser Seiten mit größter Sorgfalt, übernehme jedoch
      keine Gewähr für Richtigkeit, Vollständigkeit oder Aktualität. Als Diensteanbieter
      bin ich gemäß § 7 Abs. 1 DDG für eigene Inhalte verantwortlich. Eine Pflicht zur
      Überwachung fremder Informationen besteht gemäß §§ 8–10 DDG nicht.
    </p>
  </>
);

/** External-link liability disclaimer. */
export const ImpressumLiabilityLinks: React.FC = () => (
  <>
    <h2>Haftung für Links</h2>
    <p>
      Diese Website verlinkt auf externe Seiten Dritter, auf deren Inhalte ich keinen
      Einfluss habe. Für verlinkte Inhalte haftet der jeweilige Anbieter. Eine
      dauerhafte Kontrolle ist ohne Anhaltspunkte für Rechtsverletzungen nicht zumutbar.
      Bei Bekanntwerden von Verstößen entferne ich solche Links umgehend.
    </p>
  </>
);

// ---------- Datenschutz clauses ----------

export interface DatenschutzControllerProps {
  /** Email address rendered as a mailto link inside the address block. */
  email: string;
  /** Override the legal name. Defaults to "Dominic Kennedy". */
  name?: string;
}

/** "Verantwortlicher" header + address with email. */
export const DatenschutzController: React.FC<DatenschutzControllerProps> = ({ email, name = DEFAULT_NAME }) => (
  <>
    <h2>Verantwortlicher</h2>
    <address>
      {name}<br />
      Haus-Endt-Str. 149A<br />
      40593 Düsseldorf, Deutschland<br />
      E-Mail: <a href={`mailto:${email}`}>{email}</a>
    </address>
  </>
);

/** Cloudflare hosting clause + Art. 6 Abs. 1 lit. f legal basis. */
export const DatenschutzHosting: React.FC = () => (
  <>
    <h2>Hosting</h2>
    <p>
      Cloudflare Pages stellt diese Website bereit. Beim Seitenaufruf erhebt Cloudflare
      automatisch technische Zugriffsdaten (darunter Ihre IP-Adresse), um die Seite
      auszuliefern.
    </p>
    <p className="eidotter-legal-page__basis">
      Anbieter: Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, USA.
      Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).
    </p>
  </>
);

export interface DatenschutzPostHogProps {
  /** Domain hosting the PostHog reverse-proxy (without protocol),
   * e.g. `e.dmnc.tech`. Defaults to `e.dmnc.tech`. */
  proxyHost?: string;
}

/** PostHog webanalytics clause — EU servers, reverse-proxied, no cookies. */
export const DatenschutzPostHog: React.FC<DatenschutzPostHogProps> = ({ proxyHost = 'e.dmnc.tech' }) => (
  <>
    <h2>Webanalyse — PostHog</h2>
    <p>
      Diese Website nutzt PostHog zur Analyse des Nutzungsverhaltens. PostHog läuft
      auf EU-Servern (eu.posthog.com). Die Datenübertragung erfolgt über einen
      Reverse-Proxy auf der Domain {proxyHost} — es besteht keine direkte
      Verbindung zu PostHog-Servern.
    </p>
    <p>
      Es werden <strong>keine Cookies</strong> gesetzt. PostHog speichert Daten
      ausschließlich im Arbeitsspeicher des Browsers (Session Memory). Personenbezogene
      Profile entstehen nicht, solange Sie sich nicht aktiv identifizieren.
    </p>
    <p>
      <strong>Session Recording:</strong> PostHog zeichnet anonymisierte
      Sitzungswiederholungen auf. Alle Eingabefelder werden automatisch maskiert.
    </p>
    <p className="eidotter-legal-page__basis">
      Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).
    </p>
  </>
);

/** Local Perfect DOS VGA 437 font clause. */
export const DatenschutzFonts: React.FC = () => (
  <>
    <h2>Schriftarten</h2>
    <p>
      Die Schriftart „Perfect DOS VGA 437“ wird lokal von diesem Server
      ausgeliefert. Es findet keine Verbindung zu externen Schriftarten-Diensten statt.
    </p>
  </>
);

/** SSL/TLS encryption clause. */
export const DatenschutzEncryption: React.FC = () => (
  <>
    <h2>Verschlüsselung</h2>
    <p>
      Diese Website nutzt SSL-/TLS-Verschlüsselung. Eine verschlüsselte Verbindung
      erkennen Sie am „https://“ in der Adresszeile Ihres Browsers.
    </p>
  </>
);

export interface DatenschutzRightsProps {
  /** Email for exercising data-subject rights. */
  email?: string;
  /** Override the supervisory authority. Defaults to NRW. */
  supervisoryAuthority?: React.ReactNode;
}

/** DSGVO Art. 15-21 rights list + Art. 77 supervisory-authority complaint clause. */
export const DatenschutzRights: React.FC<DatenschutzRightsProps> = ({
  email,
  supervisoryAuthority = 'die Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen',
}) => (
  <>
    <h2>Ihre Rechte</h2>
    <p>Die DSGVO gewährt Ihnen folgende Rechte:</p>
    <ul>
      <li>Auskunft (Art. 15)</li>
      <li>Berichtigung (Art. 16)</li>
      <li>Löschung (Art. 17)</li>
      <li>Einschränkung der Verarbeitung (Art. 18)</li>
      <li>Datenübertragbarkeit (Art. 20)</li>
      <li>Widerspruch (Art. 21)</li>
    </ul>
    {email && (
      <p>
        Zur Ausübung Ihrer Rechte genügt eine formlose E-Mail an{' '}
        <a href={`mailto:${email}`}>{email}</a>.
      </p>
    )}
    <p>
      Sie können sich bei einer Aufsichtsbehörde beschweren (Art. 77 DSGVO).
      Zuständig ist {supervisoryAuthority}.
    </p>
  </>
);
