import React, { useState, useId, useRef } from 'react';
import './InlineExpand.css';

export interface InlineExpandProps {
  /**
   * Trigger text or element displayed inline — the clickable toggle
   */
  children: React.ReactNode;
  /**
   * Content revealed when expanded — accepts ReactNode for composability
   */
  content: React.ReactNode;
  /**
   * Whether the content is expanded on first render (uncontrolled mode)
   */
  defaultExpanded?: boolean;
  /**
   * Controlled expanded state — overrides internal state when provided
   */
  expanded?: boolean;
  /**
   * Called when the expand/collapse state changes
   */
  onToggle?: (isExpanded: boolean) => void;
  /**
   * Additional CSS class names
   */
  className?: string;
}

/**
 * Inline disclosure widget that reveals content when trigger text is clicked.
 *
 * Unlike Section/Accordion (block-level, bordered sections), InlineExpand is
 * designed for inline use within paragraphs and prose content.
 *
 * Features:
 * - Controlled and uncontrolled modes
 * - Native <button> trigger for full keyboard/screen reader support
 * - DOS-authentic styling with phosphor glow and CGA tokens
 * - WCAG 2.1 AA compliant
 *
 * Content stays in the DOM when collapsed (with visibility: hidden) to enable
 * smooth CSS transition exit animations. This differs from Section which
 * unmounts content on collapse via conditional rendering.
 */
export const InlineExpand: React.FC<InlineExpandProps> = ({
  children,
  content,
  defaultExpanded = false,
  expanded,
  onToggle,
  className = '',
  ...props
}) => {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const contentId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);

  const isControlled = expanded !== undefined;
  const isExpanded = isControlled ? expanded : internalExpanded;

  const handleToggle = () => {
    const next = !isExpanded;

    if (!isControlled) {
      setInternalExpanded(next);
    }

    onToggle?.(next);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === 'Escape' && isExpanded) {
      event.stopPropagation();
      handleToggle();
      triggerRef.current?.focus();
    }
  };

  const rootClasses = [
    'inline-expand',
    isExpanded && 'inline-expand--expanded',
    className,
  ].filter(Boolean).join(' ');

  return (
    <span className={rootClasses} onKeyDown={handleKeyDown} {...props}>
      <button
        ref={triggerRef}
        type="button"
        className="inline-expand__trigger"
        aria-expanded={isExpanded}
        aria-controls={contentId}
        onClick={handleToggle}
      >
        {children}
        <span className="inline-expand__indicator" aria-hidden="true">
          {isExpanded ? '[-]' : '[+]'}
        </span>
      </button>
      <span
        id={contentId}
        className="inline-expand__content"
        role="region"
      >
        <span className="inline-expand__inner">
          {content}
        </span>
      </span>
    </span>
  );
};
