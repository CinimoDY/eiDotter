'use client';

import React, { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
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

export const TextScramble = forwardRef<HTMLSpanElement, TextScrambleProps>(({
  children,
  speed,
  characters,
  delay,
  className,
  ...props
}, ref) => {
  const { text, isScrambling } = useTextScramble(children, {
    speed,
    characters,
    delay,
  });

  return (
    <span
      ref={ref}
      className={cn(
        'eidotter-text-scramble',
        isScrambling && 'eidotter-text-scramble--scrambling',
        className,
      )}
      {...props}
    >
      {text}
    </span>
  );
});

TextScramble.displayName = 'TextScramble';
