import { resample, toMs } from './resample';

const MIN = 60_000;
const FROM = Date.UTC(2026, 0, 1, 12, 0);
const TO = FROM + 120 * MIN;

describe('resample', () => {
  it('turns twelve samples over a two-hour window into 24 cells with the expected means', () => {
    // One sample every 10 minutes: cell 2k holds sample k, cell 2k+1 is empty.
    const samples = Array.from({ length: 12 }, (_, k) => ({
      t: FROM + k * 10 * MIN,
      remaining: 1 - k / 12,
    }));
    const cells = resample(samples, { from: FROM, to: TO }, 24);
    expect(cells).toHaveLength(24);
    cells.forEach((cell, i) => {
      expect(cell.start).toBe(FROM + i * 5 * MIN);
      expect(cell.end).toBe(FROM + (i + 1) * 5 * MIN);
      expect(cell.value).toBeCloseTo(1 - Math.floor(i / 2) / 12);
    });
  });

  it('averages every sample that falls in a cell span', () => {
    const samples = [
      { t: FROM, remaining: 0.9 },
      { t: FROM + 1 * MIN, remaining: 0.8 },
      { t: FROM + 4 * MIN, remaining: 0.4 },
    ];
    const [first] = resample(samples, { from: FROM, to: TO }, 24);
    expect(first.value).toBeCloseTo(0.7);
  });

  it('carries the nearest earlier sample into empty cells, and null before any sample', () => {
    const samples = [
      { t: FROM + 11 * MIN, remaining: 0.6 },
      { t: FROM + 14 * MIN, remaining: 0.4 },
    ];
    const cells = resample(samples, { from: FROM, to: TO }, 24);
    expect(cells[0].value).toBeNull();
    expect(cells[1].value).toBeNull();
    expect(cells[2].value).toBeCloseTo(0.5);
    expect(cells[3].value).toBe(0.4);
    expect(cells[23].value).toBe(0.4);
  });

  it('carries a sample from before the window into the leading cells', () => {
    const cells = resample([{ t: FROM - 30 * MIN, remaining: 0.9 }], { from: FROM, to: TO }, 4);
    expect(cells.map((c) => c.value)).toEqual([0.9, 0.9, 0.9, 0.9]);
  });

  it('puts a sample at the window end into the last cell', () => {
    const cells = resample(
      [
        { t: FROM, remaining: 1 },
        { t: TO, remaining: 0 },
      ],
      { from: FROM, to: TO },
      4,
    );
    expect(cells[3].value).toBe(0);
  });

  it('accepts ISO strings and ignores samples whose remaining is not finite', () => {
    const iso = (ms: number) => new Date(ms).toISOString();
    const cells = resample(
      [
        { t: iso(FROM), remaining: 0.5 },
        { t: iso(FROM + MIN), remaining: NaN },
      ],
      { from: iso(FROM), to: iso(TO) },
      24,
    );
    expect(cells[0].value).toBe(0.5);
    expect(cells[0].start).toBe(FROM);
  });

  it('does not depend on sample order', () => {
    const ordered = [
      { t: FROM, remaining: 1 },
      { t: FROM + 30 * MIN, remaining: 0.5 },
      { t: FROM + 90 * MIN, remaining: 0.1 },
    ];
    const window = { from: FROM, to: TO };
    expect(resample([...ordered].reverse(), window, 12)).toEqual(resample(ordered, window, 12));
  });
});

describe('toMs', () => {
  it('passes epoch ms through and parses ISO strings', () => {
    expect(toMs(FROM)).toBe(FROM);
    expect(toMs(new Date(FROM).toISOString())).toBe(FROM);
  });
});
