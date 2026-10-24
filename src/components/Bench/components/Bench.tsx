import React, { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import { DosWindow } from '../../DosWindow';
import './Bench.css';

export interface BenchPane {
  /** Pane label (`Before`, `After · 390`, …), uppercase in the label row. */
  label: React.ReactNode;
  /** Pane body, usually a screenshot `<img>` (rendered block, full width). */
  content: React.ReactNode;
  /** `after` paints the label in the accent colour. Default `neutral`. */
  tone?: 'before' | 'after' | 'neutral';
  /**
   * `desktop` (default): the scroll frame fills the pane. `phone`: a 390px
   * frame centred with 12px of padding around it.
   */
  frame?: 'desktop' | 'phone';
  /**
   * Accessible name of the pane's scroll frame. Defaults to
   * "<title>, <label>" when both are strings, else the label when it is a
   * string, else "Scrollable pane".
   */
  frameLabel?: string;
}

export interface BenchProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Strip title, rendered as a heading after DosWindow's `▸` marker. */
  title: React.ReactNode;
  /** Heading level of the title. Default `3` (inside a `PageSection` h2). */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
  /** Status chips (`Badge`s), right-aligned in the strip; they wrap. */
  chips?: React.ReactNode;
  /** One muted line under the strip, above the panes. */
  note?: React.ReactNode;
  /** One pane renders full width; two or more sit side by side in pairs. */
  panes: BenchPane[];
  /** Scroll-frame max height, any CSS length. Default `640px` (520px when stacked). */
  maxHeight?: string;
  className?: string;
}

const toneClasses: Record<NonNullable<BenchPane['tone']>, string> = {
  before: 'eidotter-bench__pane--before',
  after: 'eidotter-bench__pane--after',
  neutral: 'eidotter-bench__pane--neutral',
};

function frameName(pane: BenchPane, title: React.ReactNode): string {
  if (pane.frameLabel) return pane.frameLabel;
  if (typeof pane.label === 'string') {
    return typeof title === 'string' ? `${title}, ${pane.label}` : pane.label;
  }
  return 'Scrollable pane';
}

/**
 * Bench: a compare unit on DosWindow (0.42). Title strip with chips, an
 * optional note, then panes side by side (before | after) separated by a 1px
 * gap the grid background paints, so no divider elements. Each pane has an
 * uppercase label row and a keyboard-scrollable frame. Below 760px of bench
 * width the panes stack.
 *
 * Server-safe and presentational. Ref forwards to the DosWindow root.
 */
export const Bench = forwardRef<HTMLDivElement, BenchProps>(({
  title,
  headingLevel = 3,
  chips,
  note,
  panes,
  maxHeight,
  className,
  style,
  ...rest
}, ref) => {
  const Heading = `h${headingLevel}` as 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  const hasChips = chips != null && chips !== false && chips !== '';
  const hasNote = note != null && note !== false && note !== '';
  const height = maxHeight?.trim();
  const mergedStyle = height
    ? { ...style, '--eidotter-bench-max-height': height } as React.CSSProperties
    : style;

  return (
    <DosWindow
      ref={ref}
      className={cn('eidotter-bench', className)}
      style={mergedStyle}
      title={<Heading className="eidotter-bench__title">{title}</Heading>}
      controls={hasChips ? <div className="eidotter-bench__chips">{chips}</div> : undefined}
      {...rest}
    >
      {hasNote && <p className="eidotter-bench__note">{note}</p>}
      <div
        className={cn(
          'eidotter-bench__panes',
          panes.length === 1 && 'eidotter-bench__panes--single',
        )}
      >
        {panes.map((pane, i) => {
          const frame = (
            <div
              className={cn(
                'eidotter-bench__frame',
                pane.frame === 'phone' && 'eidotter-bench__frame--phone',
              )}
              // Scroll containers must be keyboard-reachable (WCAG 2.1.1; the
              // ChatHistory lesson). role=group carries the name without
              // adding a landmark per pane.
              tabIndex={0}
              role="group"
              aria-label={frameName(pane, title)}
            >
              {pane.content}
            </div>
          );
          return (
            <div
              key={i}
              className={cn('eidotter-bench__pane', toneClasses[pane.tone ?? 'neutral'])}
            >
              <div className="eidotter-bench__label">{pane.label}</div>
              {pane.frame === 'phone'
                ? <div className="eidotter-bench__phone">{frame}</div>
                : frame}
            </div>
          );
        })}
      </div>
    </DosWindow>
  );
});

Bench.displayName = 'Bench';
