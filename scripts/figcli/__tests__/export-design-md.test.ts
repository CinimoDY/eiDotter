import * as fs from 'fs';
import {
  loadSources,
  buildDesignTokens,
  renderDesignMd,
  main,
} from '../export-design-md';

// Mock only the write side of fs; reads (loadSources) stay real.
jest.mock('fs', () => {
  const actual = jest.requireActual('fs');
  return { ...actual, mkdirSync: jest.fn(), writeFileSync: jest.fn() };
});

describe('DOSBTS figcli DESIGN.md export', () => {
  const tokens = buildDesignTokens(loadSources());

  test('names the figcli variable collection', () => {
    expect(tokens.meta.source).toBe('DOSBTS / eiDotter Amber');
  });

  test('includes every required token group', () => {
    expect(Object.keys(tokens)).toEqual(
      expect.arrayContaining(['meta', 'color', 'radius', 'typography', 'spacing']),
    );
    for (const key of ['bg', 'card', 'amber', 'muted', 'success', 'error', 'info']) {
      expect(tokens.color[key]).toBeDefined();
    }
    expect(tokens.spacing['4']).toBe('16px'); // eidotter 8px-grid structure
    expect(tokens.radius.none).toBe('0px');
    expect(tokens.typography.fontFamily).toMatch(/SF Mono/);
    expect(tokens.typography.size.hero).toBe(60); // DOSBTS glucose hero
  });

  test('uses DOSBTS amber/bg/card/muted values, not eidotter amber-mono', () => {
    expect(tokens.color.amber).toBe('#FFB000');
    expect(tokens.color.bg).toBe('#0A0A0A'); // not eidotter black #020003
    expect(tokens.color.card).toBe('#1B1917'); // not eidotter darkGray #010103
    expect(tokens.color.muted).toBe('#594F47');
  });

  test('glucose-status colors are literal CGA, not amber-mono browns', () => {
    expect(tokens.color.success).toBe('#00AA00'); // in-range — NOT #CB9529
    expect(tokens.color.error).toBe('#AA0000'); // out-of-range — NOT #DCA934
    expect(tokens.color.info).toBe('#00AAAA'); // sensor/info — NOT #D4A030
  });

  test('renders a parseable figcli design-tokens block', () => {
    const md = renderDesignMd(tokens);
    const match = md.match(/```json design-tokens\n([\s\S]*?)\n```/);
    expect(match).not.toBeNull();
    const parsed = JSON.parse(match![1]);
    expect(parsed.meta.source).toBe('DOSBTS / eiDotter Amber');
    expect(parsed.color.success).toBe('#00AA00');
  });

  test('fails loudly when sources or a required group are missing', () => {
    expect(() => buildDesignTokens(undefined as never)).toThrow(
      /missing required eidotter source group: spacing/i,
    );
    expect(() => buildDesignTokens({ web: {} } as never)).toThrow(/spacing/i);
  });

  test('throws when a source group has only DTCG metadata keys', () => {
    expect(() =>
      buildDesignTokens({
        web: { spacing: { $type: 'dimension' }, borderRadius: { none: { $value: '0px' } } },
      } as never),
    ).toThrow(/empty eidotter source group: spacing/i);
  });

  test('drops non-string $value leaves but keeps string ones', () => {
    const tokens = buildDesignTokens({
      web: {
        spacing: { '4': { $value: '16px' }, weird: { $value: 16 } },
        borderRadius: { none: { $value: '0px' } },
        typography: { fontSize: {} },
      },
    } as never);
    expect(tokens.spacing['4']).toBe('16px');
    expect(tokens.spacing.weird).toBeUndefined();
  });

  test('main() writes a parseable DESIGN.md to figcli/', () => {
    const write = fs.writeFileSync as jest.Mock;
    const mkdir = fs.mkdirSync as jest.Mock;
    write.mockClear();
    mkdir.mockClear();
    const log = jest.spyOn(console, 'log').mockImplementation(() => undefined);
    main();
    expect(mkdir).toHaveBeenCalledTimes(1);
    expect(write).toHaveBeenCalledTimes(1);
    const [outPath, content] = write.mock.calls[0];
    expect(String(outPath)).toMatch(/DOSBTS\.design\.md$/);
    const m = String(content).match(/```json design-tokens\n([\s\S]*?)\n```/);
    expect(m).not.toBeNull();
    expect(JSON.parse(m![1]).meta.source).toBe('DOSBTS / eiDotter Amber');
    log.mockRestore();
  });
});
