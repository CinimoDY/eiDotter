import React, { useState, useId, useRef } from 'react';
import { cn } from '../../../utils/cn';
import { isSafeUrl } from '../../../utils/isSafeUrl';
import './InlineExpand.css';

export interface InlineExpandSource {
  /** Link text displayed as accessible label */
  title: string;
  /** URL — must be a valid absolute URL (http, https, or mailto) */
  url: string;
  /** Optional favicon URL; falls back to generic link icon */
  favicon?: string;
}

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
   * Optional citation sources rendered after expanded content
   */
  sources?: InlineExpandSource[];
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
 * - Optional citation sources with favicons
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
  sources = [],
  className,
  ...props
}) => {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const [failedFavicons, setFailedFavicons] = useState<Set<string>>(new Set());
  const hasBeenExpanded = useRef(defaultExpanded);
  const contentId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);

  const isControlled = expanded !== undefined;
  const isExpanded = isControlled ? expanded : internalExpanded;

  if (isExpanded) {
    hasBeenExpanded.current = true;
  }

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

  const rootClasses = cn(
    'inline-expand',
    isExpanded && 'inline-expand--expanded',
    className,
  );

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
        inert={!isExpanded}
      >
        <span className="inline-expand__inner">
          {content}
        </span>
        {sources.length > 0 && (
          <span className="inline-expand__sources" role="list">
            {sources.map((source) => (
              <span key={source.url} className="inline-expand__source-item" role="listitem">
                <a
                  href={isSafeUrl(source.url) ? source.url : undefined}
                  className="inline-expand__source-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${source.title} (opens external website)`}
                >
                  {hasBeenExpanded.current && source.favicon && isSafeUrl(source.favicon) && !failedFavicons.has(source.url) ? (
                    <img
                      className="inline-expand__source-favicon"
                      src={source.favicon}
                      alt=""
                      width={16}
                      height={16}
                      decoding="async"
                      onError={() => setFailedFavicons(prev => new Set(prev).add(source.url))}
                    />
                  ) : (
                    <span className="inline-expand__source-icon" aria-hidden="true">[→]</span>
                  )}
                  <span className="inline-expand__source-title">{source.title}</span>
                </a>
              </span>
            ))}
          </span>
        )}
      </span>
    </span>
  );
};
