/**
 * DOSBTS amber `DESIGN.md` generator (Track A of the DOSBTS Figma design system, DMNC-976).
 *
 * Emits `figcli/DOSBTS.design.md` — a Markdown file whose machine-readable
 * `json design-tokens` block figcli ingests via `tokens import-design-md` to create
 * the amber Figma variable collection in `DOSBTS_fig`.
 *
 * Sourcing: eidotter contributes *structure* (the 8px spacing grid + DOS radius scale
 * from `web.tokens.json`); DOSBTS contributes *values* via DOSBTS_OVERRIDES. eidotter's
 * own CGA primitives are amber-monochromed (green/red/cyan resolve to browns), so the
 * literal CGA glucose-status colors a CGM display needs (#00AA00/#AA0000/#00AAAA) are
 * defined in the override map, NOT read from eidotter tokens.
 *
 * Standalone on purpose — NOT wired into `style-dictionary.config.mjs`, which would
 * pollute eidotter's published token set and trip the CI token-freshness guard.
 *
 * Run: `npm run export-figcli-design-md` (ts-node).
 */
import * as fs from 'fs';
import * as path from 'path';

export interface DesignTokens {
  meta: { source: string };
  color: Record<string, string>;
  radius: Record<string, string>;
  typography: { fontFamily: string; size: Record<string, number> };
  spacing: Record<string, string>;
}

export interface TokenSources {
  web: Record<string, unknown>;
}

// Resolve from cwd (repo root under `npm run`, ts-node, and jest) so the module works
// in both ESM (ts-node, package "type":"module") and CJS (ts-jest) without __dirname.
const TOKENS_DIR = path.resolve(process.cwd(), 'src/tokens');
const OUTPUT = path.resolve(process.cwd(), 'figcli/DOSBTS.design.md');

/**
 * figcli ingests the fenced block whose info string is exactly `json design-tokens`.
 * Pin this against figcli `src/` during Track-B U1; kept as a single constant so the
 * schema is a one-line change if figcli's expected shape differs.
 */
export const FIGCLI_FENCE = 'json design-tokens';

/**
 * DOSBTS AmberTheme values (authoritative source: DOSBTS `AmberTheme.swift` /
 * `docs/design-system.md`). Transcribe here when those values change.
 */
export const DOSBTS_OVERRIDES = {
  color: {
    bg: '#0A0A0A',
    card: '#1B1917',
    amber: '#FFB000',
    'amber-dark': '#CC8C00',
    'amber-light': '#FFD580',
    muted: '#594F47',
    border: '#594F47',
    'text-primary': '#FFB000',
    'text-secondary': '#CC8C00',
    'text-muted': '#594F47',
    white: '#AAAAAA',
    success: '#00AA00', // in-range glucose (literal CGA green)
    error: '#AA0000', // out-of-range glucose (literal CGA red)
    info: '#00AAAA', // sensor / info (literal CGA cyan)
  },
  typography: {
    fontFamily: 'SF Mono, ui-monospace, monospace',
    // DOSBTS iOS point sizes (DOSTypography.swift) — the Figma must match the app, not
    // eidotter's rem web scale.
    size: {
      hero: 60,
      title: 28,
      header: 22,
      body: 17,
      'body-small': 15,
      button: 15,
      caption: 13,
      data: 17,
    },
  },
};

export function loadSources(): TokenSources {
  const read = (file: string) =>
    JSON.parse(fs.readFileSync(path.join(TOKENS_DIR, file), 'utf8'));
  return { web: read('web.tokens.json') };
}

/** Flatten a DTCG dimension group (`{ key: { $value } }`) to `{ key: value }`. Fail loud. */
function flattenDimension(
  group: Record<string, unknown> | undefined,
  label: string,
): Record<string, string> {
  if (!group || typeof group !== 'object') {
    throw new Error(`Missing required eidotter source group: ${label}`);
  }
  const out: Record<string, string> = {};
  for (const [key, leaf] of Object.entries(group)) {
    if (key.startsWith('$')) continue;
    const value = (leaf as { $value?: unknown })?.$value;
    if (typeof value === 'string') out[key] = value;
  }
  if (Object.keys(out).length === 0) {
    throw new Error(`Empty eidotter source group: ${label}`);
  }
  return out;
}

export function buildDesignTokens(sources: TokenSources): DesignTokens {
  const web = (sources?.web ?? {}) as Record<string, unknown>;
  const spacing = flattenDimension(web.spacing as Record<string, unknown>, 'spacing');
  const radius = flattenDimension(web.borderRadius as Record<string, unknown>, 'radius');
  return {
    meta: { source: 'DOSBTS / eiDotter Amber' },
    color: { ...DOSBTS_OVERRIDES.color },
    radius,
    typography: {
      fontFamily: DOSBTS_OVERRIDES.typography.fontFamily,
      size: { ...DOSBTS_OVERRIDES.typography.size },
    },
    spacing,
  };
}

export function renderDesignMd(tokens: DesignTokens): string {
  const json = JSON.stringify(tokens, null, 2);
  return `# DOSBTS — eiDotter Amber \`DESIGN.md\`

**Generated** by \`scripts/figcli/export-design-md.ts\` — do not hand-edit. Re-run
\`npm run export-figcli-design-md\` after changing DOSBTS AmberTheme values.

Source: \`${tokens.meta.source}\` · figcli variable-collection name.

## How figcli consumes this

With Figma Desktop open on \`DOSBTS_fig\` and figcli connected in **Safe mode** (never Yolo):

\`\`\`bash
node /path/to/figma-cli/src/index.js tokens import-design-md figcli/DOSBTS.design.md
\`\`\`

This creates color/radius/typography variables. **Spacing is not created by figcli's
import** — add the spacing variables via the figma-console MCP (\`figma_batch_create_variables\`)
from the same block. See \`figcli/README.md\`.

Glucose-status colors are **literal CGA** (\`success #00AA00\` in-range, \`error #AA0000\`
out-of-range, \`info #00AAAA\` sensor) — sourced from the DOSBTS override map, because
eidotter's own CGA primitives are amber-monochromed.

## Machine-readable tokens

\`\`\`${FIGCLI_FENCE}
${json}
\`\`\`
`;
}

export function main(): void {
  const tokens = buildDesignTokens(loadSources());
  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, renderDesignMd(tokens));
  console.log(
    `Wrote ${path.relative(process.cwd(), OUTPUT)} — ` +
      `${Object.keys(tokens.color).length} colors, ` +
      `${Object.keys(tokens.spacing).length} spacing, ` +
      `${Object.keys(tokens.radius).length} radius, ` +
      `${Object.keys(tokens.typography.size).length} type sizes`,
  );
}

// ESM/CJS-safe "run when invoked directly" guard (no require.main / import.meta).
const entry = process.argv[1] ? path.basename(process.argv[1]).replace(/\.[cm]?[jt]s$/, '') : '';
if (entry === 'export-design-md') {
  main();
}
