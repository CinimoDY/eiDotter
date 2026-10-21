/** @jest-environment node */
import { formatValue, PLACEHOLDER } from './formatValue';

describe('formatValue', () => {
  it('formats thousands and decimals per locale', () => {
    expect(formatValue(1234.5, { locale: 'de' }).text).toBe('1.234,5');
    expect(formatValue(1234.5, { locale: 'en' }).text).toBe('1,234.5');
  });

  it('defaults to en', () => {
    expect(formatValue(1234.5).text).toBe('1,234.5');
  });

  it('formats percent with locale spacing', () => {
    expect(formatValue(93, { locale: 'de', percent: true }).text).toBe('93 %');
    expect(formatValue(93, { locale: 'en', percent: true }).text).toBe('93%');
  });

  it('renders a current/max pair with unit', () => {
    expect(formatValue(2, { max: 19, unit: 'kg' }).text).toBe('2/19 kg');
  });

  it('uses the real minus sign for negatives', () => {
    expect(formatValue(-2.4).text).toBe('−2.4');
    expect(formatValue(-2.4, { locale: 'de' }).text).toBe('−2,4');
  });

  it('adds an explicit plus when signed', () => {
    expect(formatValue(2.4, { signed: true }).text).toBe('+2.4');
  });

  it.each([null, undefined, NaN, Infinity, -Infinity])(
    'treats %p as unknown',
    (v) => {
      expect(formatValue(v)).toEqual({ text: PLACEHOLDER, status: 'unknown' });
    },
  );

  it('reports ok status for known values', () => {
    expect(formatValue(5).status).toBe('ok');
  });

  it('rounds half away from zero at display time only', () => {
    expect(formatValue(99.6, { locale: 'de', digits: 1 }).text).toBe('99,6');
    expect(formatValue(99.6, { locale: 'de', digits: 0 }).text).toBe('100');
    expect(formatValue(2.5, { digits: 0 }).text).toBe('3');
    expect(formatValue(-2.5, { digits: 0 }).text).toBe('−3');
  });
});

describe('formatValue formatter cache', () => {
  it('returns identical text for repeated calls with the same options', () => {
    const a = formatValue(1234.5, { locale: 'de', digits: 1, signed: true });
    const b = formatValue(1234.5, { locale: 'de', digits: 1, signed: true });
    expect(b).toEqual(a);
    expect(formatValue(93, { percent: true }).text).toBe(formatValue(93, { percent: true }).text);
  });

  it('does not mix up formatters that differ in one option', () => {
    expect(formatValue(5, { digits: 0 }).text).toBe('5');
    expect(formatValue(5, { digits: 2 }).text).toBe('5.00');
    expect(formatValue(5, { signed: true }).text).toBe('+5');
    expect(formatValue(5).text).toBe('5');
    expect(formatValue(5, { percent: true }).text).toBe('5%');
    expect(formatValue(5, { locale: 'de', digits: 2 }).text).toBe('5,00');
  });

  it('still throws a RangeError for an invalid locale, every time', () => {
    expect(() => formatValue(1, { locale: 'not_a_locale!' })).toThrow(RangeError);
    expect(() => formatValue(1, { locale: 'not_a_locale!' })).toThrow(RangeError);
  });

  it('keeps working after the cache cap (64 formatters) is exceeded and evicted', () => {
    const locales = ['en', 'de', 'fr', 'ja'];
    const keys = new Set<string>();
    expect(() => {
      for (const locale of locales) {
        for (let digits = 0; digits <= 20; digits++) {
          for (const signed of [false, true]) {
            formatValue(1.5, { locale, digits, signed });
            keys.add(`${locale}|${digits}|${signed}`);
          }
        }
      }
    }).not.toThrow();
    // 4 locales x 21 digit counts x 2 sign modes = 168 unique formatters, well past the cap.
    expect(keys.size).toBeGreaterThan(64);
    // The first key created was evicted along the way; it must still format correctly.
    expect(formatValue(1.5, { locale: 'en', digits: 0 }).text).toBe('2');
    expect(formatValue(1.5, { locale: 'en', digits: 2 }).text).toBe('1.50');
    expect(formatValue(1.5, { locale: 'de', digits: 1, signed: true }).text).toBe('+1,5');
  });
});
