/**
 * Contract tests for `tailwind.preset.cjs` — the generated Tailwind preset.
 *
 * PR #282 consolidated three preset files into one auto-generated .cjs emitted
 * by Style Dictionary. These assertions pin the output shape so generator
 * changes don't silently drop tokens or alter the consumer-facing structure.
 *
 * If a test here fails, either the generator changed (expected — update the
 * assertion) or the source tokens moved out from under the preset (unexpected —
 * investigate why).
 */

// eslint-disable-next-line @typescript-eslint/no-require-imports
const preset = require('../../tailwind.preset.cjs') as {
  theme: {
    extend: {
      colors: Record<string, string>;
      fontFamily: Record<string, string[]>;
      fontSize: Record<string, string>;
      lineHeight: Record<string, string>;
      fontWeight: Record<string, string>;
      spacing: Record<string, string>;
      borderRadius: Record<string, string>;
      boxShadow: Record<string, string>;
    };
  };
  plugins: unknown[];
};

describe('tailwind.preset.cjs — top-level shape', () => {
  it('exports an object with theme.extend and plugins array', () => {
    expect(preset).toBeDefined();
    expect(preset.theme).toBeDefined();
    expect(preset.theme.extend).toBeDefined();
    expect(Array.isArray(preset.plugins)).toBe(true);
  });

  it('plugins array is populated (catches silent try/catch fallback to null)', () => {
    // The generator auto-registers tailwindcss-animate and tailwindcss-react-aria-components
    // via require-if-available. Both are devDependencies, so both should resolve in this repo.
    // Array.isArray alone passes even if both silently fell back to null — this assertion
    // catches the consumer-visible regression where plugins never reach Tailwind.
    expect(preset.plugins.length).toBeGreaterThanOrEqual(2);
  });

  it.each([
    'colors',
    'fontFamily',
    'fontSize',
    'lineHeight',
    'fontWeight',
    'spacing',
    'borderRadius',
    'boxShadow',
  ] as const)('theme.extend.%s is a non-empty object', (key) => {
    const value = preset.theme.extend[key];
    expect(typeof value).toBe('object');
    expect(Object.keys(value as object).length).toBeGreaterThan(0);
  });
});

describe('tailwind.preset.cjs — representative token spot-checks', () => {
  it('colors contains the CGA amber primary', () => {
    expect(preset.theme.extend.colors['cga-amber']).toBeDefined();
  });

  it('colors exposes dos-bg-primary as a CSS var reference for theme switching', () => {
    expect(preset.theme.extend.colors['dos-bg-primary']).toMatch(/var\(--color-semantic-background-primary\)/);
  });

  it('boxShadow includes the 24 colored glow tokens added in #282', () => {
    const shadows = preset.theme.extend.boxShadow;
    const glowKeys = Object.keys(shadows).filter((k) => /^dos-glow[A-Z]/.test(k));
    // 4 sizes (Xs, Sm, Md, Lg) × 6 colors (Red, Green, Cyan, Magenta, Blue, White) + 4 default amber = 28
    expect(glowKeys.length).toBeGreaterThanOrEqual(24);
  });

  it('boxShadow.dos-glowMdRed resolves to the expected CGA red glow', () => {
    expect(preset.theme.extend.boxShadow['dos-glowMdRed']).toBe('0px 0px 20px 0px #FF555580');
  });

  it('fontFamily.dos lists Flexi IBM VGA True', () => {
    expect(preset.theme.extend.fontFamily.dos).toEqual(expect.arrayContaining(['"Flexi IBM VGA True"']));
  });

  it('fontSize.dos-text-md is 1.375rem (22px)', () => {
    expect(preset.theme.extend.fontSize['dos-text-md']).toBe('1.375rem');
  });

  it('fontWeight.dos-regular is "400" (Flexi is single-weight)', () => {
    expect(preset.theme.extend.fontWeight['dos-regular']).toBe('400');
  });

  it('borderRadius caps at dos-base (4px) per eidotter style rules', () => {
    expect(preset.theme.extend.borderRadius['dos-base']).toBe('4px');
  });
});
