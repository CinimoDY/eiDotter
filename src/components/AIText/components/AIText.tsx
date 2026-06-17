import React from 'react';
import { cn } from '../../../utils/cn';
import '../../../styles/provenance.css';

export interface AITextProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

/**
 * Inline marker for AI-drafted prose. Renders a `<span>` with
 * `data-provenance="ai-draft"`, the canonical attribute set by the eidotter
 * provenance system (DMNC-884). The visual treatment — a static, theme-aware
 * magenta gradient clipped to the text ('AI writer' style; DMNC-946) — lives in
 * `src/styles/provenance.css` and is shared with the per-paragraph diff pipeline.
 *
 * For per-paragraph use inside MDX, prefer wrapping the paragraph directly:
 *   <p data-provenance="ai-draft">…</p>
 * The diff script (`mark-provenance.mjs`) unwraps that to plain `<p>` once
 * the paragraph drifts ≥40% from its AI baseline.
 *
 * This component is the inline ergonomic shortcut — useful for marking a
 * single phrase within otherwise-human prose, or for hand-authored MDX where
 * `<AIText>part of this paragraph</AIText>` reads more naturally than the
 * raw attribute.
 */
export const AIText: React.FC<AITextProps> = ({
  children,
  className,
  title = 'AI-assisted text — being rewritten',
}) => {
  return (
    <span
      data-provenance="ai-draft"
      className={cn('eidotter-ai-text', className)}
      title={title}
    >
      <span className="eidotter-ai-text__sr-only">AI-assisted: </span>
      {children}
    </span>
  );
};

AIText.displayName = 'AIText';
