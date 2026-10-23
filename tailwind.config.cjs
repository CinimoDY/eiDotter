// Content scanning lives in src/styles/tailwind.css (@source), not here:
// a `content` glob in a v4 @config is additive and cannot exclude stories
// or tests, which must not reach dist/eidotter.css.
module.exports = {
  presets: [require('./tailwind.preset.cjs')],
};
