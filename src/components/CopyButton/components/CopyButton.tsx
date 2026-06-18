'use client';

import React, { useCallback, useRef, useState } from 'react';
import { cn } from '../../../utils/cn';

export interface CopyButtonProps {
  /** Text to copy to the clipboard. */
  value: string;
  /** Resting label (DOS aesthetic). @default '[cp]' */
  label?: string;
  /** Label shown briefly after a successful copy. @default '[OK]' */
  copiedLabel?: string;
  /** Accessible name + tooltip in the resting state. @default 'Copy to clipboard' */
  title?: string;
  /** Accessible name + tooltip after copying. @default 'Copied!' */
  copiedTitle?: string;
  /** Additional CSS class name. */
  className?: string;
}

/**
 * DOS-styled copy-to-clipboard button — shows `[cp]`, flips to `[OK]` for ~1.5s
 * after a successful copy. Uses the async Clipboard API with a `execCommand`
 * fallback. Ported from Steuerdash (DMNC-858); English default labels (was
 * German) and `text-dos-link` semantic roles.
 */
export const CopyButton: React.FC<CopyButtonProps> = ({
  value,
  label = '[cp]',
  copiedLabel = '[OK]',
  title = 'Copy to clipboard',
  copiedTitle = 'Copied!',
  className,
}) => {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const markCopied = useCallback(() => {
    setCopied(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 1500);
  }, []);

  const fallbackCopy = useCallback((): boolean => {
    const ta = document.createElement('textarea');
    ta.value = value;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      const ok = document.execCommand('copy');
      ta.remove();
      return ok;
    } catch {
      ta.remove();
      return false;
    }
  }, [value]);

  const copy = useCallback(() => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(value).then(markCopied).catch(() => {
        if (fallbackCopy()) markCopied();
      });
    } else if (fallbackCopy()) {
      markCopied();
    }
  }, [value, markCopied, fallbackCopy]);

  return (
    <button
      type="button"
      onClick={copy}
      title={copied ? copiedTitle : title}
      aria-label={copied ? copiedTitle : title}
      className={cn(
        'eidotter-copy-button',
        'font-dos text-dos-text-xs px-1',
        'text-dos-link hover:text-dos-link-hover cursor-pointer',
        className,
      )}
    >
      {copied ? copiedLabel : label}
    </button>
  );
};

CopyButton.displayName = 'CopyButton';
