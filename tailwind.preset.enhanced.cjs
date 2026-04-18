/**
 * Deprecated alias for `eidotter/tailwind.preset`.
 *
 * In v0.19.2, the base and enhanced presets were merged (#282). The single
 * `tailwind.preset` now includes all design tokens plus React Aria state
 * variants and the animate plugin. This file is a shim so existing consumers
 * don't break on upgrade; it will be removed in v0.21.0.
 *
 * Migration:
 *   - presets: [require('eidotter/tailwind.preset.enhanced')]
 *   + presets: [require('eidotter/tailwind.preset')]
 */

if (!globalThis.__eidotterEnhancedPresetDeprecationWarned) {
  globalThis.__eidotterEnhancedPresetDeprecationWarned = true;
  console.warn(
    "[eidotter] 'eidotter/tailwind.preset.enhanced' is deprecated since 0.19.2 " +
      "and will be removed in 0.21.0. Use 'eidotter/tailwind.preset' instead."
  );
}

module.exports = require('./tailwind.preset.cjs');
