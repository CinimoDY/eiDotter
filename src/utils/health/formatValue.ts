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

/** True only for a finite number; null, undefined, NaN and +/-Infinity are unknown. */
export function isKnown(v: unknown): v is number {
  return typeof v === 'number' && Number.isFinite(v);
}

const MAX_CACHED_FORMATTERS = 64;
const formatters = new Map<string, Intl.NumberFormat>();

/** Memoised Intl.NumberFormat; a miss constructs, so an invalid locale still throws. */
function getFormatter(
  locale: string,
  digits: number | undefined,
  percent: boolean,
  signed: boolean,
): Intl.NumberFormat {
  const key = `${locale}|${digits ?? ''}|${percent}|${signed}|${percent ? 'percent' : ''}`;
  let nf = formatters.get(key);
  if (!nf) {
    nf = new Intl.NumberFormat(locale, {
      ...(digits !== undefined && {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
      }),
      ...(percent && { style: 'unit', unit: 'percent' }),
      ...(signed && { signDisplay: 'exceptZero' }),
    } as Intl.NumberFormatOptions);
    if (formatters.size >= MAX_CACHED_FORMATTERS) formatters.clear();
    formatters.set(key, nf);
  }
  return nf;
}

/**
 * The one number formatter for the family. Rounding happens at display time
 * only, half away from zero (Intl's default rounding mode is half-expand);
 * bands are always matched against the raw, unrounded value, never the
 * displayed text. Unknown input (null, NaN, +/-Infinity) yields the
 * placeholder (KTD9).
 */
export function formatValue(
  value: number | null | undefined,
  options: FormatValueOptions = {},
): FormattedValue {
  if (!isKnown(value)) return { text: PLACEHOLDER, status: 'unknown' };

  const { locale = 'en', digits, percent, max, unit, signed } = options;

  const fmt = (n: number, withSign: boolean) =>
    getFormatter(locale, digits, !!percent, withSign).format(n).replace('-', MINUS);

  let text = fmt(value, !!signed);
  if (isKnown(max)) text += `/${fmt(max, false)}`;
  if (unit) text += ` ${unit}`;
  return { text, status: 'ok' };
}
