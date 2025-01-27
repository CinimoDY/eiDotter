import React from 'react';
import './Link.css';
import { OpenInNewIcon } from './icons/OpenInNew';

export interface LinkProps {
  /**
   * The text to display in the link
   */
  children: React.ReactNode;
  /**
   * Optional CSS class name
   */
  className?: string;
  /**
   * The URL the link points to
   */
  href: string;
  /**
   * Whether the link should open in a new tab
   */
  openInNew?: boolean;
  /**
   * Whether the link is disabled
   */
  disabled?: boolean;
  /**
   * Optional click handler
   */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const Link: React.FC<LinkProps> = ({
  children,
  className,
  href,
  openInNew = true,
  disabled = false,
  onClick,
}) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  return (
    <a 
      className={`link link--s ${className || ''}`}
      href={href}
      target={openInNew ? '_blank' : undefined}
      rel={openInNew ? 'noopener noreferrer' : undefined}
      onClick={handleClick}
      aria-disabled={disabled}
    >
      <span className="link__label">{children}</span>
      {openInNew && (
        <span className="link__icon">
          <OpenInNewIcon />
        </span>
      )}
    </a>
  );
};

export default Link; 