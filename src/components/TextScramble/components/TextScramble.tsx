import React from 'react';
import { useTextScramble } from '../../../hooks/useTextScramble';
import './TextScramble.css';

export interface TextScrambleProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** The text to display with scramble effect */
  children: string;
  /** Milliseconds per character position (default: 40) */
  speed?: number;
  /** Character set to use for scramble effect */
  characters?: string;
  /** Milliseconds before scramble starts (default: 0) */
  delay?: number;
}

export const TextScramble: React.FC<TextScrambleProps> = ({
  children,
  speed,
  characters,
  delay,
  className = '',
  ...props
}) => {
  const { text, isScrambling } = useTextScramble(children, {
    speed,
    characters,
    delay,
  });

  // Cannot use cn() here — tailwind-merge treats 'text-scramble' as a Tailwind
  // text-* utility and strips it when 'text-scramble--scrambling' is present.
  // Tracked in DMNC-630 (Tailwind-first migration will eliminate BEM classes).
  const classes = [
    'text-scramble',
    isScrambling && 'text-scramble--scrambling',
    className,
  ].filter(Boolean).join(' ');

  return (
    <span className={classes} {...props}>
      {text}
    </span>
  );
};
