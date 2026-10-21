import type { ValueStatus } from './types';

export const PLACEHOLDER = '--';

const MINUS = '−';

export interface FormatValueOptions {
  /** BCP 47 locale. Default `en`. */
  locale?: string;
  /** Fixed fraction digits. Omit for the locale default. */
  digits?: number;
  /** Treat `value` as a percentage (93 -> "93%"). */
  percent?: boolean;
  /** Render "value/max" when set. */
  max?: number | null;
  unit?: string;
  /** Prefix positive values with "+". */
  signed?: boolean;
}

export interface FormattedValue {
  text: string;
  status: Extract<ValueStatus, 'ok' | 'unknown'>;
}

function isKnown(v: number | null | undefined): v is number {
  return typeof v === 'number' && Number.isFinite(v);
}

/**
 * The one number formatter for the family. Rounds half away from zero at
 * display time only (Intl's default rounding mode is half-expand); callers match bands on the raw value (KTD9).
 * Unknown input (null, NaN, +/-Infinity) yields the placeholder.
 */
export function formatValue(
  value: number | null | undefined,
  options: FormatValueOptions = {},
): FormattedValue {
  if (!isKnown(value)) return { text: PLACEHOLDER, status: 'unknown' };

  const { locale = 'en', digits, percent, max, unit, signed } = options;
  const base: Intl.NumberFormatOptions = {
    ...(digits !== undefined && {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    }),
  };

  const fmt = (n: number, withSign: boolean) =>
    new Intl.NumberFormat(locale, {
      ...base,
      ...(percent && { style: 'unit', unit: 'percent' }),
      ...(withSign && { signDisplay: 'exceptZero' }),
    } as Intl.NumberFormatOptions)
      .format(n)
      .replace('-', MINUS);

  let text = fmt(value, !!signed);
  if (isKnown(max)) text += `/${fmt(max, false)}`;
  if (unit) text += ` ${unit}`;
  return { text, status: 'ok' };
}
