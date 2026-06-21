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
  // Tracks the current fallback stage per source URL:
  // undefined = try primary; 'google' = primary failed, try Google Favicons; 'icon' = both failed
  const [faviconFallbacks, setFaviconFallbacks] = useState<Record<string, 'google' | 'icon'>>({});
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

  return (
    <span
      className={cn(
        'eidotter-inline-expand',
        isExpanded && 'eidotter-inline-expand--expanded',
        className,
      )}
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
      <span
        id={contentId}
        className="eidotter-inline-expand__content"
        role="region"
        inert={!isExpanded}
      >
        {/* Single grid child so grid-template-rows 0fr→1fr collapses the whole
            block (both inner content and sources) without a height cap. */}
        <span className="eidotter-inline-expand__content-clip">
          <span className="eidotter-inline-expand__inner">
            {content}
          </span>
          {sources.length > 0 && (
            <span className="eidotter-inline-expand__sources" role="list">
              {sources.map((source) => (
              <span key={source.url} className="eidotter-inline-expand__source-item" role="listitem">
                <a
                  href={isSafeUrl(source.url) ? source.url : undefined}
                  className="eidotter-inline-expand__source-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${source.title} (opens external website)`}
                >
                  {(() => {
                    if (!hasBeenExpanded.current) {
                      return <span className="eidotter-inline-expand__source-icon" aria-hidden="true">[→]</span>;
                    }
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
                  <span className="eidotter-inline-expand__source-title">{source.title}</span>
                </a>
              </span>
              ))}
            </span>
          )}
        </span>
      </span>
    </span>
  );
};
