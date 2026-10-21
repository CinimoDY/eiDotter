import type { Band, Tone } from './types';

export interface ResolvedBand {
  tone: Tone;
  label?: string;
  band?: Band;
}

const warned = new Set<string>();

function warnUnitMismatch(bands: Band[], valueUnit: string | undefined) {
  if (process.env.NODE_ENV === 'production' || !valueUnit) return;
  for (const b of bands) {
    if (b.unit && b.unit !== valueUnit) {
      const key = `${b.unit}|${valueUnit}`;
      if (warned.has(key)) continue;
      warned.add(key);
      console.warn(
        `[eidotter] Band unit "${b.unit}" differs from value unit "${valueUnit}".`,
      );
    }
  }
}

/**
 * First match wins; `from` inclusive, `to` exclusive; a gap, missing bands, or
 * an unknown value resolve to neutral with no label (KTD8). Pass the raw,
 * unrounded value (KTD9).
 */
export function resolveBand(
  value: number | null | undefined,
  bands: Band[] | undefined,
  valueUnit?: string,
): ResolvedBand {
  if (!bands || bands.length === 0) return { tone: 'neutral' };
  warnUnitMismatch(bands, valueUnit);
  if (typeof value !== 'number' || !Number.isFinite(value)) return { tone: 'neutral' };
  const band = bands.find((b) => value >= b.from && value < b.to);
  return band ? { tone: band.tone, label: band.label, band } : { tone: 'neutral' };
}
