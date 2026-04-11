import React, { FC } from 'react';
import { InfoBox } from 'pixelarticons/react/InfoBox';
import { WarningDiamond } from 'pixelarticons/react/WarningDiamond';
import { SquareAlert } from 'pixelarticons/react/SquareAlert';
import { Check } from 'pixelarticons/react/Check';
import { Cancel } from 'pixelarticons/react/Cancel';
import { ChevronUp } from 'pixelarticons/react/ChevronUp';
import { ChevronDown } from 'pixelarticons/react/ChevronDown';
import { WindowFrame } from 'pixelarticons/react/WindowFrame';
import { Minus } from 'pixelarticons/react/Minus';
import { Expand } from 'pixelarticons/react/Expand';
import { Plus } from 'pixelarticons/react/Plus';
import { cn } from '../../../utils/cn';
import './Icon.css';

type PixelIcon = FC<React.SVGProps<SVGSVGElement>>;

const ICON_MAP: Record<string, PixelIcon> = {
  'Info': InfoBox,
  'Warning': WarningDiamond,
  'Error': SquareAlert,
  'Done': Check,
  'Check': Check,
  'Close': Cancel,
  'Chevron Up': ChevronUp,
  'Chevron Down': ChevronDown,
  'App': WindowFrame,
  'Cancel': Minus,
  'Fullscreen': Expand,
  'Add': Plus,
};

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
  const IconComponent = ICON_MAP[name as string];
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
