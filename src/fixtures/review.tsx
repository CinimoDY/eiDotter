/**
 * FIXTURE ONLY, illustrative. Placeholder "screenshots" and copy for the
 * Bench / PageShell stories (Templates/ReviewPage). No real screenshots and no
 * real project names: everything is "Example". Not exported from the package.
 */
import React from 'react';

export interface FixtureScreenProps {
  /** Desktop (1280 wide) or phone (390 wide) canvas. */
  kind: 'desktop' | 'phone';
  /** Before draws the dimmer, denser layout; after the tidied one. */
  state: 'before' | 'after';
  /** Accessible description of the placeholder image. */
  label: string;
}

const fill = (token: string): React.CSSProperties => ({ fill: `var(${token})` });
const stroke = (token: string): React.CSSProperties => ({
  fill: 'none',
  stroke: `var(${token})`,
  strokeWidth: 2,
});

/**
 * A tall wireframe page drawn in theme tokens, so it re-themes with the story
 * and scrolls inside a Bench frame like a full-page screenshot would.
 */
export function FixtureScreen({ kind, state, label }: FixtureScreenProps) {
  const phone = kind === 'phone';
  const w = phone ? 390 : 1280;
  const h = phone ? 1400 : 1500;
  const pad = phone ? 16 : 48;
  const after = state === 'after';
  const cols = phone ? 1 : 3;
  const gap = phone ? 12 : 24;
  const cardW = (w - pad * 2 - gap * (cols - 1)) / cols;
  const cardH = phone ? 150 : 180;
  const cards = Array.from({ length: phone ? 5 : 6 }, (_, i) => ({
    x: pad + (i % cols) * (cardW + gap),
    y: (phone ? 420 : 470) + Math.floor(i / cols) * (cardH + gap),
  }));
  const textLines = Array.from({ length: phone ? 8 : 6 }, (_, i) => i);

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={w}
      height={h}
      role="img"
      aria-label={label}
      preserveAspectRatio="xMidYMin meet"
    >
      <rect x="0" y="0" width={w} height={h} style={fill('--color-semantic-background-primary')} />
      {/* header band: the before state draws its bottom rule */}
      <rect x={pad} y={phone ? 20 : 28} width={phone ? 150 : 220} height={phone ? 22 : 28} style={fill('--color-semantic-text-brand')} />
      <rect x={w - pad - (phone ? 56 : 360)} y={phone ? 24 : 34} width={phone ? 56 : 360} height={phone ? 14 : 16} style={fill('--color-semantic-border-brand-dim')} />
      {!after && (
        <rect x="0" y={phone ? 64 : 84} width={w} height="2" style={fill('--color-semantic-border-brand')} />
      )}
      {/* hero title and lead */}
      <rect x={pad} y={phone ? 110 : 140} width={phone ? 300 : 620} height={phone ? 40 : 56} style={fill(after ? '--color-semantic-text-accent' : '--color-semantic-text-muted')} />
      {textLines.slice(0, phone ? 5 : 3).map((i) => (
        <rect key={`lead-${i}`} x={pad} y={(phone ? 175 : 225) + i * (phone ? 26 : 34)} width={(phone ? 340 : 860) - (i % 2) * (phone ? 60 : 180)} height={phone ? 12 : 14} style={fill('--color-semantic-text-primary')} opacity={0.55} />
      ))}
      {/* card grid */}
      {cards.map((c, i) => (
        <g key={`card-${i}`}>
          <rect x={c.x} y={c.y} width={cardW} height={cardH} style={after ? stroke('--color-semantic-border-brand') : fill('--color-semantic-background-secondary')} />
          <rect x={c.x + 14} y={c.y + 16} width={cardW * 0.5} height={phone ? 16 : 20} style={fill('--color-semantic-text-accent')} />
          <rect x={c.x + 14} y={c.y + (phone ? 50 : 60)} width={cardW - 28} height="10" style={fill('--color-semantic-text-primary')} opacity={0.45} />
          <rect x={c.x + 14} y={c.y + (phone ? 72 : 84)} width={(cardW - 28) * 0.7} height="10" style={fill('--color-semantic-text-primary')} opacity={0.45} />
        </g>
      ))}
      {/* footer */}
      <rect x={pad} y={h - (phone ? 70 : 80)} width={phone ? 200 : 320} height="12" style={fill('--color-semantic-text-muted')} />
    </svg>
  );
}

export const REVIEW_FIXTURE_NOTE = 'FIXTURE ONLY, illustrative';
