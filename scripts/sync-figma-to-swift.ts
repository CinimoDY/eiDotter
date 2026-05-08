/**
 * sync-figma-to-swift — reverse pipeline: Figma variables → Swift extensions
 *
 * Reads:
 *   figma-snapshots/foundation-keys.json — foundation key → CGA name map
 *   figma-snapshots/ios.json             — eiDotter iOS DS variables
 *   figma-snapshots/macos.json           — eiDotter macOS DS variables
 *
 * Emits:
 *   platforms/swiftui/Sources/EiDotterTokens/AppleIOS.swift
 *   platforms/swiftui/Sources/EiDotterTokens/AppleMacOS.swift
 *
 * Each output file declares `EiDotterColors.AppleIOS` / `.AppleMacOS` enums
 * with camelCased Apple HIG names. COLOR variables that alias the Foundation
 * library resolve to the corresponding `EiDotterColors.colorCga*` constant.
 * Non-aliased COLOR variables (alpha-bearing fills, Materials, Liquid Glass)
 * fall back to the resolved RGBA literal in the collection's default mode.
 * Non-COLOR variables (FLOAT/STRING) are skipped — this file is colors-only.
 *
 * Why snapshots are the seam:
 *   The figma-console MCP runs as a desktop bridge plugin (WebSocket) and is
 *   not addressable from a Node process. Snapshots are committed and CI runs
 *   this script with deterministic input.
 */

import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const FOUNDATION_KEYS_PATH = resolve(ROOT, 'figma-snapshots/foundation-keys.json');

const SNAPSHOTS = [
  {
    label: 'iOS' as const,
    snapshot: resolve(ROOT, 'figma-snapshots/ios.json'),
    output: resolve(ROOT, 'platforms/swiftui/Sources/EiDotterTokens/AppleIOS.swift'),
  },
  {
    label: 'macOS' as const,
    snapshot: resolve(ROOT, 'figma-snapshots/macos.json'),
    output: resolve(ROOT, 'platforms/swiftui/Sources/EiDotterTokens/AppleMacOS.swift'),
  },
];

interface VariableAlias { type: 'VARIABLE_ALIAS'; id: string }
interface RGBA { r: number; g: number; b: number; a?: number }
interface ResolvedColor { type?: undefined; r: number; g: number; b: number; a?: number }
type ModeValue = VariableAlias | ResolvedColor | { type?: string; value?: unknown };

interface FigmaVariable {
  id: string;
  name: string;
  key: string;
  resolvedType: 'COLOR' | 'FLOAT' | 'STRING' | 'BOOLEAN';
  valuesByMode: Record<string, ModeValue>;
  variableCollectionId: string;
  scopes?: string[];
  resolvedValuesByMode?: Record<string, { value: RGBA | number | string | null; aliasTo?: string }>;
}

interface FigmaCollection {
  id: string;
  name: string;
  key: string;
  modes: Array<{ name: string; modeId: string }>;
  defaultModeId: string;
  variableIds: string[];
}

interface FigmaSnapshot {
  fileKey?: string;
  data: {
    variableCollections: FigmaCollection[];
    variables: FigmaVariable[];
  };
}

interface FoundationKeys {
  keys: Record<string, string>;
}

function camelCase(name: string): string {
  // Strip designer-hint parentheticals like "(Use Plus Lighter | Darker)" but
  // preserve semantic ones like "(Grouped)" that distinguish Apple HIG colors.
  const HINT_PARENS = /\((?:use [^)]*|deprecated|wip)\)/gi;
  return name
    .replace(HINT_PARENS, '')
    .split(/[/\s\-_]+/)
    .filter(Boolean)
    .map((part, i) => {
      const clean = part.replace(/[^a-zA-Z0-9]/g, '');
      if (!clean) return '';
      return i === 0 ? clean[0].toLowerCase() + clean.slice(1) : clean[0].toUpperCase() + clean.slice(1);
    })
    .join('');
}

function foundationNameToSwiftConstant(foundationName: string): string {
  // "color/cga/amber" → "colorCgaAmber"
  return camelCase(foundationName);
}

function rgbaToSwift({ r, g, b, a }: RGBA): string {
  const fmt = (n: number) => n.toFixed(3);
  return `Color(red: ${fmt(r)}, green: ${fmt(g)}, blue: ${fmt(b)}, opacity: ${fmt(a ?? 1)})`;
}

function extractFoundationKey(aliasId: string): string | null {
  const m = aliasId.match(/^VariableID:([a-f0-9]{40})\//);
  return m ? m[1] : null;
}

interface ResolvedAlias {
  kind: 'foundation' | 'literal' | 'unresolved';
  foundationName?: string;
  rgba?: RGBA;
  trail: string[]; // chain of variable names walked
}

function resolveAlias(
  startVar: FigmaVariable,
  modeId: string,
  variablesById: Map<string, FigmaVariable>,
  collectionsById: Map<string, FigmaCollection>,
  foundationKeys: Record<string, string>,
): ResolvedAlias {
  const trail: string[] = [];
  let current: FigmaVariable | undefined = startVar;
  let currentModeId = modeId;
  const visited = new Set<string>();

  while (current) {
    if (visited.has(current.id)) {
      return { kind: 'unresolved', trail: [...trail, `[cycle at ${current.name}]`] };
    }
    visited.add(current.id);
    trail.push(current.name);

    const value = current.valuesByMode[currentModeId];
    if (!value) return { kind: 'unresolved', trail };

    if ((value as VariableAlias).type === 'VARIABLE_ALIAS') {
      const aliasId = (value as VariableAlias).id;
      const fk = extractFoundationKey(aliasId);
      if (fk && foundationKeys[fk]) {
        return { kind: 'foundation', foundationName: foundationKeys[fk], trail };
      }
      // Same-file alias: walk into it.
      const next = variablesById.get(aliasId);
      if (!next) return { kind: 'unresolved', trail: [...trail, `[unknown ${aliasId}]`] };
      current = next;
      const collection = collectionsById.get(current.variableCollectionId);
      currentModeId = collection?.defaultModeId ?? currentModeId;
      continue;
    }

    if (value && 'r' in (value as object)) {
      return { kind: 'literal', rgba: value as RGBA, trail };
    }

    return { kind: 'unresolved', trail };
  }

  return { kind: 'unresolved', trail };
}

function generateSwift(
  snapshot: FigmaSnapshot,
  label: 'iOS' | 'macOS',
  foundationKeys: Record<string, string>,
): string {
  const enumName = label === 'iOS' ? 'AppleIOS' : 'AppleMacOS';
  const collectionsById = new Map<string, FigmaCollection>();
  for (const c of snapshot.data.variableCollections) collectionsById.set(c.id, c);
  const variablesById = new Map<string, FigmaVariable>();
  for (const v of snapshot.data.variables) variablesById.set(v.id, v);

  const lines: string[] = [];
  let aliased = 0;
  let literal = 0;
  let skipped = 0;
  const skippedNames: string[] = [];
  const seenNames = new Set<string>();

  // Group variables by collection for readable output ordering.
  const varsByCollection = new Map<string, FigmaVariable[]>();
  for (const v of snapshot.data.variables) {
    const arr = varsByCollection.get(v.variableCollectionId) ?? [];
    arr.push(v);
    varsByCollection.set(v.variableCollectionId, arr);
  }

  for (const collection of snapshot.data.variableCollections) {
    const vars = varsByCollection.get(collection.id) ?? [];
    const colorVars = vars.filter((v) => v.resolvedType === 'COLOR');
    if (colorVars.length === 0) continue;

    lines.push('');
    lines.push(`        // MARK: ${collection.name}`);

    for (const v of colorVars) {
      const swiftName = camelCase(v.name);
      if (!swiftName) {
        skipped++;
        skippedNames.push(`${v.name} (empty after camelCase)`);
        continue;
      }
      // De-dup: Figma allows two vars with the same camelCased shape (e.g. typo'd
      // "Disabeld" + "Disabled"). Keep the first; comment the duplicate so the
      // designer can rename in Figma.
      if (seenNames.has(swiftName)) {
        lines.push(`        // SKIP duplicate camelCase: ${v.name}`);
        skipped++;
        skippedNames.push(`${v.name} (duplicate camelCase: ${swiftName})`);
        continue;
      }
      seenNames.add(swiftName);

      const resolution = resolveAlias(v, collection.defaultModeId, variablesById, collectionsById, foundationKeys);
      if (resolution.kind === 'foundation') {
        const swiftConst = foundationNameToSwiftConstant(resolution.foundationName!);
        const trail = resolution.trail.length > 1 ? ` (via ${resolution.trail.slice(1, -1).join(' → ') || resolution.trail[0]})` : '';
        lines.push(`        public static let ${swiftName} = EiDotterColors.${swiftConst}  // Figma: ${v.name}${trail}`);
        aliased++;
      } else if (resolution.kind === 'literal') {
        lines.push(`        public static let ${swiftName} = ${rgbaToSwift(resolution.rgba!)}  // Figma: ${v.name} (literal)`);
        literal++;
      } else {
        lines.push(`        // SKIP unresolved: ${v.name} → ${resolution.trail.join(' → ')}`);
        skipped++;
        skippedNames.push(`${v.name} (${resolution.trail.join(' → ')})`);
      }
    }
  }

  const banner = `//
// ${enumName}.swift
// AUTO-GENERATED — Do not edit manually
//
// Generated from: figma-snapshots/${label.toLowerCase()}.json
// Run: npm run sync-figma-to-swift
//
// Source-of-truth lives in the eiDotter ${label} DS Figma file. Edit there;
// re-snapshot via the figma-console MCP bridge plugin in a Claude session;
// re-run this script to regenerate.
//
// Stats: ${aliased} aliased to Foundation, ${literal} literal RGBA, ${skipped} skipped.
//

import SwiftUI

// MARK: - ${label} Apple HIG (Tier 2)

public extension EiDotterColors {
    enum ${enumName} {
`;

  return banner + lines.join('\n') + '\n    }\n}\n';
}

function main() {
  if (!existsSync(FOUNDATION_KEYS_PATH)) {
    console.error(`[sync-figma-to-swift] Missing foundation key map: ${FOUNDATION_KEYS_PATH}`);
    process.exit(1);
  }
  const foundation = JSON.parse(readFileSync(FOUNDATION_KEYS_PATH, 'utf-8')) as FoundationKeys;

  let touched = 0;
  for (const { label, snapshot, output } of SNAPSHOTS) {
    if (!existsSync(snapshot)) {
      console.log(`[sync-figma-to-swift] ${label}: no snapshot at ${snapshot} — skipped.`);
      continue;
    }
    const data = JSON.parse(readFileSync(snapshot, 'utf-8')) as FigmaSnapshot;
    mkdirSync(dirname(output), { recursive: true });
    writeFileSync(output, generateSwift(data, label, foundation.keys));
    const colorCount = data.data.variables.filter((v) => v.resolvedType === 'COLOR').length;
    console.log(`[sync-figma-to-swift] ${label}: ${output} (${colorCount} color vars in snapshot)`);
    touched++;
  }
  if (touched === 0) {
    console.log('[sync-figma-to-swift] No snapshots present yet.');
  }
}

main();
