import * as fixtures from './health';

/** Collect every string reachable from the fixture module's exports, keys included. */
function collectStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === 'string') out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => collectStrings(v, out));
  else if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) {
      out.push(k);
      collectStrings(v, out);
    }
  }
  return out;
}

const strings = collectStrings(fixtures);

describe('health fixtures', () => {
  it('exposes the dashboard fixtures this test guards', () => {
    expect(fixtures.fixtureDashboard).toBeDefined();
    expect(strings.length).toBeGreaterThan(20);
  });

  it('keeps the FIXTURE_NOTICE present', () => {
    expect(fixtures.FIXTURE_NOTICE).toBe('FIXTURE ONLY, illustrative');
    expect(fixtures.fixtureDashboard.notice).toBe(fixtures.FIXTURE_NOTICE);
  });

  it('contains no report field names', () => {
    const hits = strings.filter((s) => /gmiPct|sensorActivePct|timeInRangePct/i.test(s));
    expect(hits).toEqual([]);
  });

  it('labels every dashboard band as a sample band', () => {
    for (const seg of fixtures.fixtureDashboard.rangeSegments) {
      expect(seg.label).toMatch(/^Sample band [A-E]$/);
    }
  });
});
