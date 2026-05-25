import type { FC, SVGProps } from 'react';

export interface IconSvgProps extends SVGProps<SVGSVGElement> {
  /** Icon width/height (number → px, string → CSS length). Default 24. */
  size?: number | string;
  /** Accessible label. When provided, the svg renders role="img" with a <title>. */
  title?: string;
}

export type IconComponent = FC<IconSvgProps>;
