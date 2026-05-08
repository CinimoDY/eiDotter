/**
 * sync-figma-to-swift — reverse pipeline: Figma variables → Swift extensions
 *
 * Scaffold for the Phase 3b/3c workflow that lifts iOS DS / macOS DS Figma
 * variables into Swift extensions on `EiDotterTokens`.
 *
 * Why this exists:
 *   The 4-tier token architecture treats web Tier-2 semantics as code-canonical
 *   (lives in src/tokens/web.tokens.json) and Apple Tier-2 semantics as
 *   Figma-canonical (lives in iOS DS / macOS DS Figma files using Apple HIG
 *   names like Labels/Primary, Backgrounds/Primary - Elevated, Liquid Glass/
 *   Frost, etc.). SwiftUI consumers get full coverage via these generated
 *   extensions whose values chain back to Tier-1 primitives in base.tokens.json.
 *
 * Pipeline:
 *   1. Designer/maintainer opens iOS DS or macOS DS in Figma desktop.
 *   2. In a Claude session with the figma-console MCP bridge plugin running,
 *      call `figma_get_variables` and save the JSON to:
 *        dist/figma-snapshots/ios.json
 *        dist/figma-snapshots/macos.json
 *      Commit the snapshots — they're the input artifact for this script.
 *   3. Run `npm run sync-figma-to-swift`. This script reads the snapshots
 *      and emits:
 *        platforms/swiftui/Sources/EiDotterTokens/AppleIOS.swift
 *        platforms/swiftui/Sources/EiDotterTokens/AppleMacOS.swift
 *      Each file declares Swift extensions with camelCased Apple HIG names
 *      whose values reference the Tier-1 EiDotterColors constants.
 *   4. CI runs this script with the committed snapshots; if the generated
 *      Swift drifts from the committed Apple{IOS,MacOS}.swift, CI fails.
 *      This is the freshness guard analogous to the build-tokens guard for
 *      web outputs.
 *
 * Why Node can't reach the figma-console MCP directly:
 *   The figma-console MCP runs as a Figma desktop bridge plugin over WebSocket
 *   (per CLAUDE.md). It is not addressable from a node process. Snapshots are
 *   the seam between the live Figma side and the deterministic CI build side.
 *   See ideation/2026-05-06-figma-source-audit.md for the audit that proved
 *   REST API is insufficient on Pro tier (Variables API is Enterprise-only).
 *
 * Status (Phase 1.11): scaffold only. Snapshot files don't exist yet — Phase
 * 3b/3c will produce them. Until then, this script exits 0 with a no-op message.
 * The full implementation lands when the first snapshot file appears.
 */

import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const SNAPSHOTS = [
  {
    label: 'iOS' as const,
    snapshot: resolve(ROOT, 'dist/figma-snapshots/ios.json'),
    output: resolve(ROOT, 'platforms/swiftui/Sources/EiDotterTokens/AppleIOS.swift'),
  },
  {
    label: 'macOS' as const,
    snapshot: resolve(ROOT, 'dist/figma-snapshots/macos.json'),
    output: resolve(ROOT, 'platforms/swiftui/Sources/EiDotterTokens/AppleMacOS.swift'),
  },
];

interface FigmaVariableSnapshot {
  // Shape captured by figma-console MCP `figma_get_variables` (verbosity=summary).
  // The actual schema is settled when the first real snapshot is produced in
  // Phase 3b/c — this interface will gain fields then.
  fileKey?: string;
  fileName?: string;
  data?: {
    overview?: { total_variables?: number; total_collections?: number };
    collections?: Array<{ id: string; name: string; modes?: Array<{ id: string; name: string }> }>;
    variable_names?: string[];
  };
}

function camelCase(name: string): string {
  // "Labels/Primary" → "labelsPrimary"
  // "Backgrounds/Primary - Elevated" → "backgroundsPrimaryElevated"
  // "Fills - Vibrant (Use Plus Lighter | Darker)/Primary" → "fillsVibrantPrimary"
  //   (parenthetical guidance dropped — it's a designer hint, not part of the name)
  return name
    .replace(/\([^)]*\)/g, '') // strip parenthetical guidance
    .split(/[/\s\-]+/)
    .filter(Boolean)
    .map((part, i) => (i === 0 ? part.toLowerCase() : part[0].toUpperCase() + part.slice(1).toLowerCase()))
    .join('')
    // Strip remaining non-alphanumerics
    .replace(/[^a-zA-Z0-9]/g, '');
}

function generateSwift(snapshot: FigmaVariableSnapshot, label: 'iOS' | 'macOS'): string {
  const enumName = label === 'iOS' ? 'AppleIOS' : 'AppleMacOS';
  const banner = `//
// ${enumName}.swift
// AUTO-GENERATED — Do not edit manually
//
// Generated from: dist/figma-snapshots/${label.toLowerCase()}.json
// Run: npm run sync-figma-to-swift
//
// Source-of-truth lives in the eiDotter ${label} DS Figma file. Edit there;
// re-snapshot via the figma-console MCP bridge plugin in a Claude session;
// re-run this script to regenerate.
//

import SwiftUI

// MARK: - ${label} Apple HIG (Tier 2)

public extension EiDotterColors {
    enum ${enumName} {
        // Generated names follow Apple HIG conventions, camelCased.
        // Values chain to Tier-1 primitives via Foundation library aliases
        // (the iOS DS / macOS DS Figma files subscribe to Foundation).
`;

  const lines: string[] = [];
  // Real implementation: walk snapshot.data.collections + variable resolution
  // to emit `static let labelsPrimary = EiDotterColors.colorCgaYellow` etc.
  // Phase 3b/3c sets up the snapshot schema; this scaffold lists the variable
  // names as comments so a maintainer can see the surface that's coming.
  const varNames = snapshot.data?.variable_names ?? [];
  if (varNames.length === 0) {
    lines.push('        // No variables in snapshot. Re-snapshot once eidotter overrides land.');
  } else {
    for (const name of varNames) {
      lines.push(`        // TODO Phase 3b/3c: static let ${camelCase(name)} = EiDotterColors.???  // Figma: ${name}`);
    }
  }

  return banner + lines.join('\n') + '\n    }\n}\n';
}

function main() {
  let touched = 0;
  for (const { label, snapshot, output } of SNAPSHOTS) {
    if (!existsSync(snapshot)) {
      console.log(`[sync-figma-to-swift] ${label}: no snapshot at ${snapshot} — skipped (Phase 3b/3c will produce it).`);
      continue;
    }
    const data = JSON.parse(readFileSync(snapshot, 'utf-8')) as FigmaVariableSnapshot;
    mkdirSync(dirname(output), { recursive: true });
    writeFileSync(output, generateSwift(data, label));
    console.log(`[sync-figma-to-swift] ${label}: ${output} updated (${data.data?.variable_names?.length ?? 0} variables).`);
    touched++;
  }
  if (touched === 0) {
    console.log('[sync-figma-to-swift] No snapshots present yet. This is expected before Phase 3b/3c.');
  }
}

main();
