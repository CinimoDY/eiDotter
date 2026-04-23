import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import '../../styles/tokens.css';

/*
 * ============================================================================
 * Token Parity — side-by-side visual comparison between repo tokens and the
 * April-2026 design handoff ("eiDotter Design System-handoff").
 *
 * READ ME — NO TOKEN EDITS
 * This story is deliberately read-only. The "handoff proposed" columns render
 * values inline so the repo's tokens.css stays untouched. Use the visuals to
 * decide which (if any) divergence is worth adopting in a follow-up change.
 * ============================================================================
 */

const meta = {
  title: 'Design System/Token Parity (Handoff)',
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dos',
      values: [{ name: 'dos', value: '#020003' }],
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

/* ---------- styles shared across sections ---------- */

const sectionHeading: React.CSSProperties = {
  color: 'var(--color-cga-amber)',
  fontSize: '18px',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  margin: '32px 0 8px',
  textShadow: '0 0 4px rgba(255,176,0,0.5)',
};

const mutedText: React.CSSProperties = {
  color: 'var(--color-cga-brown)',
  fontSize: '12px',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  margin: '0 0 16px',
};

const colBody: React.CSSProperties = {
  color: 'var(--color-semantic-text-primary)',
  fontFamily: 'var(--typography-font-family-primary)',
};

const grid2: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
  gap: '16px',
};

const colCaption: React.CSSProperties = {
  fontSize: '11px',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  padding: '4px 8px',
  background: 'rgba(255,176,0,0.06)',
  color: 'var(--color-cga-amber)',
  border: '1px solid var(--color-cga-amber)',
  display: 'inline-block',
};

const labelPair: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  fontFamily: 'var(--typography-font-family-primary)',
  fontSize: '12px',
  color: 'var(--color-cga-brown)',
  marginTop: '4px',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
};

/* ---------- reusable comparison primitive ---------- */

const Divergence: React.FC<{
  code: string;
  title: string;
  summary: string;
  repoCaption: string;
  handoffCaption: string;
  children: [React.ReactNode, React.ReactNode];
}> = ({ code, title, summary, repoCaption, handoffCaption, children }) => {
  const [repo, handoff] = children;
  return (
    <section style={{ margin: '24px 0 40px' }}>
      <div style={sectionHeading}>
        <span style={{ color: 'var(--color-cga-yellow)' }}>{code}</span> · {title}
      </div>
      <p style={mutedText}>{summary}</p>
      <div style={grid2}>
        <div>
          <div style={colCaption}>REPO · {repoCaption}</div>
          <div style={{ marginTop: '8px' }}>{repo}</div>
        </div>
        <div>
          <div style={{ ...colCaption, borderColor: 'var(--color-cga-yellow)', color: 'var(--color-cga-yellow)' }}>
            HANDOFF · {handoffCaption}
          </div>
          <div style={{ marginTop: '8px' }}>{handoff}</div>
        </div>
      </div>
    </section>
  );
};

/* ---------- inline alert preview (no component dep to avoid theme coupling) ---------- */

const AlertPreview: React.FC<{ label: string; bg: string; fg: string; border: string; glyph: string }> = ({
  label, bg, fg, border, glyph,
}) => (
  <div style={{
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-start',
    padding: '10px 14px',
    background: bg,
    border: `2px solid ${border}`,
    color: fg,
    fontFamily: 'var(--typography-font-family-primary)',
  }}>
    <span style={{ fontSize: '18px' }} aria-hidden="true">{glyph}</span>
    <div>
      <div style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</div>
      <div style={{ fontSize: '12px', opacity: 0.85 }}>Sample alert body text for parity.</div>
    </div>
  </div>
);

/* ---------- overlay/vignette preview ---------- */

const OverlaySample: React.FC<{ overlay: string; edge: string; corner: string }> = ({ overlay, edge, corner }) => (
  <div style={{
    position: 'relative',
    height: '160px',
    background: `
      radial-gradient(ellipse at center, rgba(255,176,0,0.12) 0%, transparent 60%),
      ${overlay}
    `,
    border: '2px solid var(--color-cga-amber)',
  }}>
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      background: `radial-gradient(ellipse at center, transparent 50%, ${edge} 75%, ${corner} 100%)`,
    }} />
    <div style={{
      position: 'relative', padding: '24px',
      color: 'var(--color-cga-amber)',
      fontFamily: 'var(--typography-font-family-primary)',
      textShadow: '0 0 4px rgba(255,176,0,0.5)',
    }}>PROGRAM.EXE — OVERLAY + VIGNETTE</div>
  </div>
);

/* ---------- font-size scale preview ---------- */

const fontSample: React.CSSProperties = {
  fontFamily: 'var(--typography-font-family-primary)',
  color: 'var(--color-cga-amber)',
  lineHeight: 1.1,
  padding: '4px 0',
  borderBottom: '1px dashed var(--color-cga-brown)',
};

const SampleLine: React.FC<{ label: string; size: string; text?: string }> = ({ label, size, text = 'Aa CONFIG.SYS' }) => (
  <div style={fontSample}>
    <span style={{ fontSize: size }}>{text}</span>
    <span style={{
      marginLeft: '12px',
      color: 'var(--color-cga-brown)',
      fontSize: '10px',
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
    }}>{label}</span>
  </div>
);

/* ---------- line-height samples ---------- */

const lineHeightSample = (lh: string | number): React.CSSProperties => ({
  fontFamily: 'var(--typography-font-family-primary)',
  color: 'var(--color-cga-amber)',
  fontSize: '16px',
  lineHeight: typeof lh === 'string' ? lh : lh,
  background: 'rgba(255,176,0,0.04)',
  padding: '10px 12px',
  border: '1px dashed var(--color-cga-brown)',
});

const lhParagraph =
  'The terminal loaded successfully. Drive C: has only 640KB remaining. ' +
  'File not found. Press any key to continue. ' +
  'BAD COMMAND OR FILE NAME. Type HELP for a list of commands.';

/* ---------- .dos-* utility rendering (scoped inside the story via CSS string) ---------- */

const dosUtilitiesCss = `
  .parity-dos-hero     { font-family: var(--typography-font-family-primary); font-weight:400; font-size:4.875rem; line-height:5.625rem; color: var(--color-cga-yellow); text-transform:uppercase; text-shadow: 0 0 14px rgba(255,176,0,0.8); letter-spacing:0; }
  .parity-dos-h1       { font-family: var(--typography-font-family-primary); font-weight:400; font-size:3.75rem; line-height:4.5rem;  color: var(--color-cga-yellow); text-transform:uppercase; text-shadow: 0 0 8px rgba(255,176,0,0.7); }
  .parity-dos-h2       { font-family: var(--typography-font-family-primary); font-weight:400; font-size:3rem;    line-height:3.75rem; color: var(--color-cga-yellow); text-transform:uppercase; text-shadow: 0 0 8px rgba(255,176,0,0.7); }
  .parity-dos-h3       { font-family: var(--typography-font-family-primary); font-weight:400; font-size:2.25rem; line-height:2.75rem; color: var(--color-cga-yellow); text-transform:uppercase; text-shadow: 0 0 4px rgba(255,176,0,0.6); }
  .parity-dos-h4       { font-family: var(--typography-font-family-primary); font-weight:400; font-size:1.875rem; line-height:2.375rem; color: var(--color-cga-light-gray); text-transform:uppercase; }
  .parity-dos-h5       { font-family: var(--typography-font-family-primary); font-weight:400; font-size:1.5rem;  line-height:2rem;    color: var(--color-cga-light-gray); text-transform:uppercase; }
  .parity-dos-body     { font-family: var(--typography-font-family-primary); font-weight:400; font-size:1rem;    line-height:1.5rem;  color: var(--color-cga-light-gray); }
  .parity-dos-body-lg  { font-family: var(--typography-font-family-primary); font-weight:400; font-size:1.125rem; line-height:1.75rem; color: var(--color-cga-light-gray); }
  .parity-dos-caption  { font-family: var(--typography-font-family-primary); font-weight:400; font-size:0.875rem; line-height:1.25rem; color: #ffb000; text-transform:uppercase; }
  .parity-dos-micro    { font-family: var(--typography-font-family-primary); font-weight:400; font-size:0.75rem;  line-height:1.125rem; color: #ffb000; }
  .parity-dos-label    { font-family: var(--typography-font-family-primary); font-weight:400; font-size:0.875rem; line-height:1.25rem; color: var(--color-cga-yellow); text-transform:uppercase; }
  .parity-dos-code     { font-family: var(--typography-font-family-primary); font-weight:400; font-size:0.875rem; line-height:1.25rem; color: var(--color-cga-yellow); background: var(--color-semantic-background-secondary); padding: 0 4px; border: 1px solid var(--color-semantic-border-default); }
`;

/* ===========================================================================
 * STORIES
 * ========================================================================*/

export const AlertBackgrounds: Story = {
  render: () => (
    <div style={{ padding: '32px', ...colBody }}>
      <style>{dosUtilitiesCss}</style>
      <h1 style={{ ...sectionHeading, fontSize: '24px' }}>Alert Backgrounds · 3 shifts</h1>
      <p style={mutedText}>
        The handoff shifts alert backgrounds warmer (amber-leaning) on three of the four types.
        Warning is unchanged.
      </p>

      <Divergence
        code="T1"
        title="Alert · Info"
        summary="Handoff warms the info background from cool blue-gray to a warmer near-black."
        repoCaption="#1a2535"
        handoffCaption="#1f2228"
      >
        <>
          <AlertPreview label="Info" bg="#1a2535" fg="#55FFFF" border="#55FFFF" glyph="◆" />
          <div style={labelPair}><span>--color-semantic-alert-info</span><span>#1a2535</span></div>
        </>
        <>
          <AlertPreview label="Info" bg="#1f2228" fg="#55FFFF" border="#55FFFF" glyph="◆" />
          <div style={labelPair}><span>HANDOFF</span><span>#1f2228</span></div>
        </>
      </Divergence>

      <Divergence
        code="T2"
        title="Alert · Success"
        summary="Handoff raises success background slightly, keeping the warm amber tint."
        repoCaption="#0a2015"
        handoffCaption="#122010"
      >
        <>
          <AlertPreview label="Success" bg="#0a2015" fg="#55FF55" border="#55FF55" glyph="✓" />
          <div style={labelPair}><span>--color-semantic-alert-success</span><span>#0a2015</span></div>
        </>
        <>
          <AlertPreview label="Success" bg="#122010" fg="#55FF55" border="#55FF55" glyph="✓" />
          <div style={labelPair}><span>HANDOFF</span><span>#122010</span></div>
        </>
      </Divergence>

      <Divergence
        code="T3"
        title="Alert · Error"
        summary="Handoff amber-tints the error red (#430500 vs pure dark red #430000)."
        repoCaption="#430000"
        handoffCaption="#430500"
      >
        <>
          <AlertPreview label="Error" bg="#430000" fg="#FF5555" border="#FF5555" glyph="×" />
          <div style={labelPair}><span>--color-semantic-alert-error</span><span>#430000</span></div>
        </>
        <>
          <AlertPreview label="Error" bg="#430500" fg="#FF5555" border="#FF5555" glyph="×" />
          <div style={labelPair}><span>HANDOFF</span><span>#430500</span></div>
        </>
      </Divergence>

      <p style={mutedText}>
        Warning (#352800) matches in both — no change. Not rendered.
      </p>
    </div>
  ),
};

export const OverlayVignetteWarmth: Story = {
  render: () => (
    <div style={{ padding: '32px', ...colBody }}>
      <h1 style={{ ...sectionHeading, fontSize: '24px' }}>Overlay &amp; Vignette · Warm-black shift</h1>
      <p style={mutedText}>
        Modal backdrop + CRT vignette. Handoff uses a warm-black base (`rgba(8,5,0,…)`) instead of
        pure black. The difference is most visible at the vignette corners.
      </p>

      <Divergence
        code="T4–T6"
        title="Overlay + vignetteEdge + vignetteCorner"
        summary="Three rgba() tokens change together."
        repoCaption="rgba(0,0,0, .8/.3/.5)"
        handoffCaption="rgba(8,5,0, .8/.3/.5)"
      >
        <>
          <OverlaySample overlay="rgba(0,0,0,0.8)" edge="rgba(0,0,0,0.3)" corner="rgba(0,0,0,0.5)" />
          <div style={labelPair}><span>REPO</span><span>rgba(0,0,0,…)</span></div>
        </>
        <>
          <OverlaySample overlay="rgba(8,5,0,0.8)" edge="rgba(8,5,0,0.3)" corner="rgba(8,5,0,0.5)" />
          <div style={labelPair}><span>HANDOFF</span><span>rgba(8,5,0,…)</span></div>
        </>
      </Divergence>
    </div>
  ),
};

export const FontSizeScale: Story = {
  render: () => (
    <div style={{ padding: '32px', ...colBody }}>
      <h1 style={{ ...sectionHeading, fontSize: '24px' }}>Font Size Scale · 9 steps vs 11 steps</h1>
      <p style={mutedText}>
        Handoff extends the scale with a dedicated display tier (48 / 60 / 78px) and renames
        `base` → `md`. Adopting is a breaking change; breaking out here for a visual baseline.
      </p>

      <div style={grid2}>
        <div>
          <div style={colCaption}>REPO · 2xs..4xl (max 36px)</div>
          <div style={{ marginTop: '8px' }}>
            <SampleLine label="2xs 10px" size="0.625rem" />
            <SampleLine label="xs 12px"  size="0.75rem" />
            <SampleLine label="sm 14px"  size="0.875rem" />
            <SampleLine label="base 16px" size="1rem" />
            <SampleLine label="lg 18px"  size="1.125rem" />
            <SampleLine label="xl 20px"  size="1.25rem" />
            <SampleLine label="2xl 24px" size="1.5rem" />
            <SampleLine label="3xl 30px" size="1.875rem" />
            <SampleLine label="4xl 36px" size="2.25rem" />
          </div>
        </div>
        <div>
          <div style={{ ...colCaption, borderColor: 'var(--color-cga-yellow)', color: 'var(--color-cga-yellow)' }}>
            HANDOFF · text-xs..display-2xl (max 78px)
          </div>
          <div style={{ marginTop: '8px' }}>
            <SampleLine label="text-xs 12px"   size="0.75rem" />
            <SampleLine label="text-sm 14px"   size="0.875rem" />
            <SampleLine label="text-md 16px"   size="1rem" />
            <SampleLine label="text-lg 18px"   size="1.125rem" />
            <SampleLine label="text-xl 20px"   size="1.25rem" />
            <SampleLine label="display-xs 24px" size="1.5rem" />
            <SampleLine label="display-sm 30px" size="1.875rem" />
            <SampleLine label="display-md 36px" size="2.25rem" />
            <SampleLine label="display-lg 48px" size="3rem" />
            <SampleLine label="display-xl 60px" size="3.75rem" />
            <SampleLine label="display-2xl 78px" size="4.875rem" text="Aa CONFIG" />
          </div>
        </div>
      </div>
    </div>
  ),
};

export const LineHeightModel: Story = {
  render: () => (
    <div style={{ padding: '32px', ...colBody }}>
      <h1 style={{ ...sectionHeading, fontSize: '24px' }}>Line Height · ratio vs per-size</h1>
      <p style={mutedText}>
        Repo uses three ratios (1.2 / 1.5 / 1.8). Handoff uses absolute per-size line heights matching the Figma "Value" mode.
      </p>
      <div style={grid2}>
        <div>
          <div style={colCaption}>REPO · normal (1.5)</div>
          <p style={{ ...lineHeightSample(1.5), marginTop: '8px' }}>{lhParagraph}</p>
          <div style={colCaption}>REPO · tight (1.2)</div>
          <p style={{ ...lineHeightSample(1.2), marginTop: '8px' }}>{lhParagraph}</p>
          <div style={colCaption}>REPO · loose (1.8)</div>
          <p style={{ ...lineHeightSample(1.8), marginTop: '8px' }}>{lhParagraph}</p>
        </div>
        <div>
          <div style={{ ...colCaption, borderColor: 'var(--color-cga-yellow)', color: 'var(--color-cga-yellow)' }}>
            HANDOFF · --lh-text-md (24px / 16px = 1.5)
          </div>
          <p style={{ ...lineHeightSample('1.5rem'), marginTop: '8px' }}>{lhParagraph}</p>
          <div style={{ ...colCaption, borderColor: 'var(--color-cga-yellow)', color: 'var(--color-cga-yellow)' }}>
            HANDOFF · --lh-text-lg (28px / 18px ≈ 1.56)
          </div>
          <p style={{ ...lineHeightSample('1.75rem'), fontSize: '18px', marginTop: '8px' }}>{lhParagraph}</p>
          <div style={{ ...colCaption, borderColor: 'var(--color-cga-yellow)', color: 'var(--color-cga-yellow)' }}>
            HANDOFF · --lh-display-xs (32px / 24px ≈ 1.33)
          </div>
          <p style={{ ...lineHeightSample('2rem'), fontSize: '24px', marginTop: '8px' }}>{lhParagraph.slice(0, 90)}</p>
        </div>
      </div>
    </div>
  ),
};

export const MutedTextColor: Story = {
  render: () => (
    <div style={{ padding: '32px', ...colBody }}>
      <h1 style={{ ...sectionHeading, fontSize: '24px' }}>Muted Text Color · brown vs amber-at-opacity</h1>
      <p style={mutedText}>
        Repo uses a dimmer brown for muted text (--color-cga-brown #5F340E). The handoff collapses muted to full amber
        and expresses hierarchy via opacity / glow instead. Shifts every component that uses muted text.
      </p>
      <div style={grid2}>
        <div>
          <div style={colCaption}>REPO · muted = --color-cga-brown</div>
          <div style={{ padding: '16px', background: 'rgba(0,0,0,0.4)', marginTop: '8px', border: '1px dashed var(--color-cga-brown)' }}>
            <div style={{ color: 'var(--color-cga-amber)', fontSize: '16px' }}>PROGRAM.EXE</div>
            <div style={{ color: 'var(--color-cga-brown)', fontSize: '14px', marginTop: '4px' }}>Last modified 2026-04-23</div>
            <div style={{ color: 'var(--color-cga-brown)', fontSize: '12px', marginTop: '2px' }}>384 bytes free · 640KB remaining</div>
          </div>
        </div>
        <div>
          <div style={{ ...colCaption, borderColor: 'var(--color-cga-yellow)', color: 'var(--color-cga-yellow)' }}>
            HANDOFF · muted = amber at 50% opacity
          </div>
          <div style={{ padding: '16px', background: 'rgba(0,0,0,0.4)', marginTop: '8px', border: '1px dashed #ffb000' }}>
            <div style={{ color: '#ffb000', fontSize: '16px' }}>PROGRAM.EXE</div>
            <div style={{ color: '#ffb000', opacity: 0.5, fontSize: '14px', marginTop: '4px' }}>Last modified 2026-04-23</div>
            <div style={{ color: '#ffb000', opacity: 0.35, fontSize: '12px', marginTop: '2px' }}>384 bytes free · 640KB remaining</div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const FontWeights: Story = {
  render: () => (
    <div style={{ padding: '32px', ...colBody }}>
      <h1 style={{ ...sectionHeading, fontSize: '24px' }}>Font Weights · 3 weights vs single 400</h1>
      <p style={mutedText}>
        Repo ships regular/semibold/bold = 400/600/700 (fallbacks apply faux-bold for bitmap fonts).
        Handoff collapses all 8 Figma weight tokens to 400 — emphasis only via COLOR, UPPERCASE, or underline.
      </p>
      <div style={grid2}>
        <div>
          <div style={colCaption}>REPO · 400 / 600 / 700</div>
          <div style={{ marginTop: '8px', fontFamily: 'var(--typography-font-family-primary)', color: 'var(--color-cga-amber)' }}>
            <p style={{ fontWeight: 400, margin: 0 }}>Regular 400 — body copy</p>
            <p style={{ fontWeight: 600, margin: 0 }}>Semibold 600 — subheads</p>
            <p style={{ fontWeight: 700, margin: 0 }}>Bold 700 — emphasis</p>
          </div>
        </div>
        <div>
          <div style={{ ...colCaption, borderColor: 'var(--color-cga-yellow)', color: 'var(--color-cga-yellow)' }}>
            HANDOFF · all 400 (hierarchy via case + color)
          </div>
          <div style={{ marginTop: '8px', fontFamily: 'var(--typography-font-family-primary)', fontWeight: 400 }}>
            <p style={{ color: 'var(--color-cga-light-gray)', margin: 0 }}>Regular body — light-gray amber.</p>
            <p style={{ color: 'var(--color-cga-yellow)', margin: 0 }}>Accent copy — yellow, still 400.</p>
            <p style={{ color: 'var(--color-cga-amber)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
              EMPHASIS · UPPERCASE AMBER
            </p>
            <p style={{ color: 'var(--color-cga-amber)', textDecoration: 'underline', margin: 0 }}>
              Alt emphasis — underline only
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const DosUtilityClasses: Story = {
  render: () => (
    <div style={{ padding: '32px', ...colBody }}>
      <style>{dosUtilitiesCss}</style>
      <h1 style={{ ...sectionHeading, fontSize: '24px' }}>.dos-* Utility Classes · purely additive</h1>
      <p style={mutedText}>
        Handoff ships 12 presentational utility classes (`.dos-hero`, `.dos-h1`–`.dos-h5`, `.dos-body`, `.dos-body-lg`,
        `.dos-caption`, `.dos-micro`, `.dos-label`, `.dos-code`). None exist in the repo today. Adopting is additive —
        no breaking change.
      </p>
      <div style={{ background: 'rgba(0,0,0,0.4)', border: '2px dashed var(--color-cga-yellow)', padding: '24px', maxWidth: '900px' }}>
        <div className="parity-dos-hero" style={{ marginBottom: '8px' }}>Hero</div>
        <div className="parity-dos-h1" style={{ marginBottom: '4px' }}>.dos-h1 HEADLINE</div>
        <div className="parity-dos-h2" style={{ marginBottom: '4px' }}>.dos-h2 SECTION</div>
        <div className="parity-dos-h3" style={{ marginBottom: '4px' }}>.dos-h3 SUBSECTION</div>
        <div className="parity-dos-h4" style={{ marginBottom: '4px' }}>.dos-h4 GROUP</div>
        <div className="parity-dos-h5" style={{ marginBottom: '8px' }}>.dos-h5 LABEL</div>
        <p className="parity-dos-body">
          .dos-body — default body copy rendered at the handoff typography tokens.
          Drive C: has only 640KB remaining. Type HELP for command list.
        </p>
        <p className="parity-dos-body-lg">.dos-body-lg — slightly larger body, 18/28.</p>
        <div className="parity-dos-caption">.dos-caption small meta line</div>
        <div className="parity-dos-micro">.dos-micro — smallest readable size (12/18)</div>
        <div className="parity-dos-label" style={{ marginTop: '8px' }}>.dos-label FORM LABEL</div>
        <p>
          Inline code: <code className="parity-dos-code">C:\&gt; DIR /W</code>
        </p>
      </div>
    </div>
  ),
};

export const Overview: Story = {
  render: () => (
    <div style={{ padding: '32px', ...colBody }}>
      <h1 style={{ ...sectionHeading, fontSize: '28px' }}>Token Parity · Overview</h1>
      <p style={{ ...mutedText, maxWidth: '64ch' }}>
        This view summarizes the design handoff's divergences from the repo's current tokens.
        Nothing here changes any token value — the repo's `src/tokens/*.json` and
        `src/styles/tokens.css` are untouched. Use the sibling stories to inspect each divergence
        visually. Identical categories (CGA primitives, amber, color glows, spacing, radius,
        borders, shadows, motion) are omitted.
      </p>
      <table style={{
        marginTop: '16px',
        width: '100%',
        borderCollapse: 'collapse',
        fontFamily: 'var(--typography-font-family-primary)',
        fontSize: '14px',
        color: 'var(--color-cga-amber)',
      }}>
        <thead>
          <tr style={{ textAlign: 'left', color: 'var(--color-cga-yellow)' }}>
            <th style={{ padding: '8px', borderBottom: '1px solid var(--color-cga-amber)' }}>Code</th>
            <th style={{ padding: '8px', borderBottom: '1px solid var(--color-cga-amber)' }}>Token / concept</th>
            <th style={{ padding: '8px', borderBottom: '1px solid var(--color-cga-amber)' }}>Repo</th>
            <th style={{ padding: '8px', borderBottom: '1px solid var(--color-cga-amber)' }}>Handoff</th>
            <th style={{ padding: '8px', borderBottom: '1px solid var(--color-cga-amber)' }}>Blast radius</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['T1', 'alert.info bg',           '#1a2535',   '#1f2228',   'Low — Alert only'],
            ['T2', 'alert.success bg',        '#0a2015',   '#122010',   'Low — Alert only'],
            ['T3', 'alert.error bg',          '#430000',   '#430500',   'Low — Alert only'],
            ['T4', 'effects.overlay',         'rgba(0,0,0,.8)',  'rgba(8,5,0,.8)',  'Low — Modal backdrops'],
            ['T5', 'effects.vignetteEdge',    'rgba(0,0,0,.3)',  'rgba(8,5,0,.3)',  'Low — RetroEffects'],
            ['T6', 'effects.vignetteCorner',  'rgba(0,0,0,.5)',  'rgba(8,5,0,.5)',  'Low — RetroEffects'],
            ['T7', 'font-size scale',         '2xs..4xl (max 36)', 'text-xs..display-2xl (max 78)', 'High — breaking rename'],
            ['T8', 'line-height model',       'ratio 1.2/1.5/1.8', 'per-size rem',                 'Medium — additive possible'],
            ['T9', 'font-weights',            '400/600/700',       'all 400',                       'Medium — bitmap-only philosophy'],
            ['T10','--dos-text-muted',        '--color-cga-brown', '#ffb000 @ opacity',             'High — ripples across most components'],
            ['T11','.dos-* utility classes',  'none',              '12 classes (hero/h1-h5/body/etc.)', 'Low — additive'],
          ].map(([code, name, repo, handoff, risk]) => (
            <tr key={code as string}>
              <td style={{ padding: '6px 8px', borderBottom: '1px dashed var(--color-cga-brown)' }}>{code}</td>
              <td style={{ padding: '6px 8px', borderBottom: '1px dashed var(--color-cga-brown)' }}>{name}</td>
              <td style={{ padding: '6px 8px', borderBottom: '1px dashed var(--color-cga-brown)' }}>{repo}</td>
              <td style={{ padding: '6px 8px', borderBottom: '1px dashed var(--color-cga-brown)', color: 'var(--color-cga-yellow)' }}>{handoff}</td>
              <td style={{ padding: '6px 8px', borderBottom: '1px dashed var(--color-cga-brown)', color: 'var(--color-cga-brown)' }}>{risk}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
};
