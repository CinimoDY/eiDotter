import React, { FC } from 'react';
import { InfoBox } from 'pixelarticons/react/InfoBox';
import { WarningDiamond } from 'pixelarticons/react/WarningDiamond';
import { SquareAlert } from 'pixelarticons/react/SquareAlert';
import { Check } from 'pixelarticons/react/Check';
import { ChevronUp } from 'pixelarticons/react/ChevronUp';
import { ChevronDown } from 'pixelarticons/react/ChevronDown';
import { WindowFrame } from 'pixelarticons/react/WindowFrame';
import { Minus } from 'pixelarticons/react/Minus';
import { Expand } from 'pixelarticons/react/Expand';
import { Plus } from 'pixelarticons/react/Plus';
import { cn } from '../../../utils/cn';
import './Icon.css';

type PixelIcon = FC<React.SVGProps<SVGSVGElement>>;

/**
 * Custom pixel-art X mark — pixelarticons v2 has no standalone close/X glyph.
 * Matches pixelarticons' style: 24×24 viewBox, fill-based single path,
 * currentColor inheritance, 2×2 unit "pixels" on the grid.
 */
const PixelX: PixelIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M5 5h2v2H5zM7 7h2v2H7zM9 9h2v2H9zM11 11h2v2h-2zM13 13h2v2h-2zM15 15h2v2h-2zM17 17h2v2h-2zM17 5h2v2h-2zM15 7h2v2h-2zM13 9h2v2h-2zM9 13h2v2H9zM7 15h2v2H7zM5 17h2v2H5z" />
  </svg>
);

// 12 public icon names mapping to 11 unique pixelarticons components.
// Done and Check both map to the Check component intentionally — consumers
// can use either semantic name for a checkmark glyph.
//
// Non-obvious mappings:
// - 'Close' → custom PixelX component: pixelarticons v2 has no standalone
//   X/close glyph, so we draw a pixel-art X mark matching their style
//   (24×24 viewBox, fill-based single path, 2×2 unit pixels).
// - 'Cancel' → pixelarticons Minus: this name carries Terminal-window semantics
//   (cancel/minimize control), rendered as a minus glyph matching DOS window
//   chrome. A future release may rename this to 'Minimize' for clarity.
// - 'App' → pixelarticons WindowFrame: used for the Terminal window icon.
const ICON_MAP = {
  'Info':         InfoBox,
  'Warning':      WarningDiamond,
  'Error':        SquareAlert,
  'Done':         Check,
  'Check':        Check,
  'Close':        PixelX,         // custom pixel-art X mark (pixelarticons has no X glyph)
  'Chevron Up':   ChevronUp,
  'Chevron Down': ChevronDown,
  'App':          WindowFrame,
  'Cancel':       Minus,          // window minimize control, not abort
  'Fullscreen':   Expand,
  'Add':          Plus,
} satisfies Record<string, PixelIcon>;

export type IconName = keyof typeof ICON_MAP;

export type IconSize = 'L' | 'S';

const SIZE_MAP: Record<IconSize, number> = { L: 56, S: 24 };

export interface IconProps {
  /** The name of the icon to display */
  name: IconName;
  /** Size of the icon */
  size?: IconSize;
  /** Optional CSS class name */
  className?: string;
  /** Optional click handler */
  onClick?: () => void;
  /** Optional color override */
  color?: string;
  /** Optional role for accessibility */
  role?: 'button';
  /** Accessible label override */
  'aria-label'?: string;
}

/**
 * Icon component backed by pixelarticons (MIT licensed).
 * Renders inline SVG with proper viewBox scaling at any size.
 * The DOS pixel aesthetic matches eidotter's design language.
 */
export const Icon: FC<IconProps> = ({
  name,
  size = 'L',
  className = '',
  onClick,
  color,
  role,
  'aria-label': ariaLabel,
}) => {
  // Runtime defense against JS consumers or dynamically-cast names.
  // TypeScript users are already constrained to IconName by IconProps.
  const IconComponent = (ICON_MAP as Record<string, PixelIcon | undefined>)[name];
  if (!IconComponent) return null;

  const pixelSize = SIZE_MAP[size];

  return (
    <span
      className={cn('icon', role && 'icon--button', className)}
      onClick={onClick}
      role={role}
      aria-label={ariaLabel || `${name} icon`}
      style={color ? { color } : undefined}
    >
      <IconComponent
        width={pixelSize}
        height={pixelSize}
        className="icon__svg"
      />
    </span>
  );
};
