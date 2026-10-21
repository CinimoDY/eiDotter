/** @jest-environment node */
import { resolveBand } from './resolveBand';
import type { Band } from './types';

const bands: Band[] = [
  { from: 0, to: 40, tone: 'critical', label: 'Sample band A' },
  { from: 40, to: 90, tone: 'success', label: 'Sample band B' },
  { from: 160, to: Infinity, tone: 'warning', label: 'Sample band C' },
];

describe('resolveBand', () => {
  it('includes the lower bound', () => {
    expect(resolveBand(40, bands).label).toBe('Sample band B');
  });

  it('excludes the upper bound', () => {
    expect(resolveBand(90, bands).label).toBeUndefined();
    expect(resolveBand(40, bands).tone).toBe('success');
  });

  it('first match wins on overlap', () => {
    const overlap: Band[] = [
      { from: 0, to: 100, tone: 'info', label: 'first' },
      { from: 50, to: 150, tone: 'warning', label: 'second' },
    ];
    expect(resolveBand(75, overlap).label).toBe('first');
  });

  it('returns neutral with no label in a gap', () => {
    expect(resolveBand(120, bands)).toEqual({ tone: 'neutral' });
  });

  it('returns neutral with no bands or an unknown value', () => {
    expect(resolveBand(5, undefined)).toEqual({ tone: 'neutral' });
    expect(resolveBand(5, [])).toEqual({ tone: 'neutral' });
    expect(resolveBand(null, bands)).toEqual({ tone: 'neutral' });
    expect(resolveBand(NaN, bands)).toEqual({ tone: 'neutral' });
  });

  it('matches on the unrounded value (99.6 stays below target)', () => {
    const target: Band[] = [
      { from: 0, to: 100, tone: 'warning', label: 'Sample below target' },
      { from: 100, to: Infinity, tone: 'success', label: 'Sample on target' },
    ];
    expect(resolveBand(99.6, target).label).toBe('Sample below target');
  });

  describe('unit mismatch warning', () => {
    let warn: jest.SpyInstance;
    beforeEach(() => {
      warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    });
    afterEach(() => warn.mockRestore());

    it('warns once and still resolves', () => {
      const mm: Band[] = [{ from: 0, to: 10, tone: 'info', label: 'x', unit: 'a' }];
      expect(resolveBand(5, mm, 'b').tone).toBe('info');
      expect(resolveBand(5, mm, 'b').tone).toBe('info');
      expect(warn).toHaveBeenCalledTimes(1);
    });

    it('does not warn when units match', () => {
      const same: Band[] = [{ from: 0, to: 10, tone: 'info', label: 'x', unit: 'kg' }];
      resolveBand(5, same, 'kg');
      expect(warn).not.toHaveBeenCalled();
    });
  });
});
