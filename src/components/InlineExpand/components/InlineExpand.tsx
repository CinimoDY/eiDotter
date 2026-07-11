'use client';

import React, { useState, useId, useRef } from 'react';
import { Button as AriaButton } from 'react-aria-components';
import { cn } from '../../../utils/cn';
import { isSafeUrl } from '../../../utils/isSafeUrl';
import './InlineExpand.css';

function getGoogleFaviconUrl(sourceUrl: string): string | null {
  try {
    const { hostname } = new URL(sourceUrl);
    return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(hostname)}&sz=32`;
  } catch {
    return null;
  }
}

export interface InlineExpandSource {
  /** Link text displayed as accessible label */
  title: string;
  /** URL — must be a valid absolute URL (http, https, or mailto) */
  url: string;
  /** Optional favicon URL. Falls back to Google Favicons API for the domain, then to a [→] text icon. */
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
 * Content is conditionally rendered — it mounts on expand and unmounts on
 * collapse (like Section), so it occupies no inline space when closed. The
 * expanded text continues the trigger's line with a marker-pen highlight per
 * wrapped fragment; a trailing collapse control and a compact favicon-only
 * sources cluster follow the last word. Reveal is an in-place opacity fade.
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
  // Tracks the current fallback stage per source URL:
  // undefined = try primary; 'google' = primary failed, try Google Favicons; 'icon' = both failed
  const [faviconFallbacks, setFaviconFallbacks] = useState<Record<string, 'google' | 'icon'>>({});
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

  // The trailing [-] control unmounts when it collapses the content; return
  // focus to the trigger so a keyboard/screen-reader user isn't dropped to
  // <body>. Routes through handleToggle so controlled mode still works.
  const handleCollapseFromTrailing = () => {
    handleToggle();
    triggerRef.current?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === 'Escape' && isExpanded) {
      event.stopPropagation();
      handleToggle();
      triggerRef.current?.focus();
    }
  };

  return (
    <span
      className={cn(
        'eidotter-inline-expand',
        isExpanded && 'eidotter-inline-expand--expanded',
        className,
      )}
      aria-live="polite"
      onKeyDown={handleKeyDown}
      {...props}
    >
      <AriaButton
        ref={triggerRef}
        className="eidotter-inline-expand__trigger"
        aria-expanded={isExpanded}
        aria-controls={contentId}
        onPress={handleToggle}
      >
        {children}
        <span className="eidotter-inline-expand__indicator" aria-hidden="true">
          {isExpanded ? '[-]' : '[+]'}
        </span>
      </AriaButton>
      {isExpanded && (
        <>
          {/* Literal space: the expansion continues the trigger's line and must
              not abut the trigger's last character. */}
          {' '}
          <span
            id={contentId}
            className="eidotter-inline-expand__content"
            data-ai-skip="true"
          >
            {content}
            <AriaButton
              className="eidotter-inline-expand__collapse"
              aria-expanded={true}
              aria-controls={contentId}
              aria-label="Collapse"
              onPress={handleCollapseFromTrailing}
            >
              [-]
            </AriaButton>
            {sources.length > 0 && (
              <span className="eidotter-inline-expand__sources" role="list">
                {sources.map((source) => (
                  <span key={source.url} className="eidotter-inline-expand__source-item" role="listitem">
                    <a
                      href={isSafeUrl(source.url) ? source.url : undefined}
                      className="eidotter-inline-expand__source-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      title={source.title}
                      aria-label={`${source.title} (opens external website)`}
                    >
                      {(() => {
                        const stage = faviconFallbacks[source.url];
                        if (stage === 'icon') {
                          return <span className="eidotter-inline-expand__source-icon" aria-hidden="true">[→]</span>;
                        }
                        const hasPrimary = !!source.favicon && isSafeUrl(source.favicon);
                        if (!stage && hasPrimary) {
                          return (
                            <img
                              className="eidotter-inline-expand__source-favicon"
                              src={source.favicon}
                              alt=""
                              width={16}
                              height={16}
                              decoding="async"
                              onError={() => setFaviconFallbacks(prev => ({ ...prev, [source.url]: 'google' }))}
                            />
                          );
                        }
                        const googleUrl = getGoogleFaviconUrl(source.url);
                        if (googleUrl) {
                          return (
                            <img
                              className="eidotter-inline-expand__source-favicon"
                              src={googleUrl}
                              alt=""
                              width={16}
                              height={16}
                              decoding="async"
                              onError={() => setFaviconFallbacks(prev => ({ ...prev, [source.url]: 'icon' }))}
                            />
                          );
                        }
                        return <span className="eidotter-inline-expand__source-icon" aria-hidden="true">[→]</span>;
                      })()}
                    </a>
                  </span>
                ))}
              </span>
            )}
          </span>
        </>
      )}
    </span>
  );
};
