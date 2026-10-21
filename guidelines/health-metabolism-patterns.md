# Health and Metabolism Patterns

A design-from catalogue of the patterns behind eidotter's health and metabolism component family. It is written so a designer or a SwiftUI developer can build each pattern without reading any React code. Words and source links only: no third-party images are stored here.

Two bodies of prior art feed it. SCUM's metabolism screen (a survival game) shows reserves, digestion, vitals, and body composition at a glance. Diabetes and health apps (Nightscout, AndroidAPS, Loop, the AGP report, Garmin, Whoop, Oura) supply the time dimension SCUM lacks. Research detail lives in the personal knowledge base, one page per pattern; this guideline links to those pages instead of repeating them.

- Primary sources: [SCUM wiki, Metabolism](https://scum.wiki.gg/wiki/Metabolism), [SCUM 0.6.0 dev post](https://devtrackers.gg/scum/p/d78dcdd3-scum-hellriders-update-0-6-0-37324), [Nightscout main interface](https://wearenotwaiting.readthedocs.io/en/latest/Nightscout/EN/Understanding%20your%20site/main-user-interface.html), [AndroidAPS screens](https://androidaps.readthedocs.io/en/3.2/DailyLifeWithAaps/AapsScreens.html), [AGP and time-in-range consensus](https://pmc.ncbi.nlm.nih.gov/articles/PMC6973648/).
- Knowledge base: sources page `wiki/sources/2026-10-21-scum-metabolism-ui-patterns`; pattern pages under `wiki/patterns/` (named per section below).

## Ground rules

1. **No medical defaults.** Bands, targets, thresholds, and clinical copy are props the consumer supplies. A pattern here shows a value against a target the consumer defines; it never ships a number of its own.
2. **Colour is never the only signal.** Every tone pairs with a fill pattern or glyph plus a text label.
3. **Quiet by default.** Status changes are shown, not announced with motion or flashing.
4. **Components stay presentational.** Modelling (absorption, decay) belongs to the consumer; the component draws what it is given.

Status key: components marked "planned" are specified in the health metabolism plan and arrive with that release; "deferred" patterns have no component yet.

---

## Ring gauge

**Encodes.** One bounded quantity as a share of a whole, with a dominant percent and the absolute value underneath.

**SCUM example.** A circular arc on a dark disc with a large percent and a smaller absolute value beneath (a percent over a calorie figure, a percent over a millilitre figure). Arc colour follows role: blue for fluid and energy, green for muscle, amber for fat, red for blood.

**Health-app counterpart.** Garmin Body Battery and the Whoop and Oura 0-100 scores: one ring or bar, one number, a tier label.

**Component.** `Gauge` (planned), wrapping `ProgressRing` for the arc.

**DOS rendering.** A quantised ring of discrete segments, not a smooth arc. The printed number is authoritative; the ring is an approximation. Tone shows as a segment rhythm plus a status glyph and text, since a ring cannot take a hatch fill.

Knowledge base: `wiki/patterns/ring-gauge`.

## Reserve meter with optimal tick

**Encodes.** A stock measured against a target level, where the target is marked on the bar and the stock can sit above or below it.

**SCUM example.** Narrow vertical bars for protein, carbs, fat, and similar reserves: gram label above, name below, fill height as reserve against optimal, a tick or outline marking the optimal level.

**Health-app counterpart.** Intake against goal tiles; a measured percentage beside its target tick in time-in-range reports.

**Component.** `Meter` (planned), single bar, vertical or horizontal, optional tick or range.

**DOS rendering.** Block-character fill with a distinct tick glyph; the label sits beside or above the bar, never on the fill.

Knowledge base: `wiki/patterns/reserve-meter`.

## Micro-meter grid

**Encodes.** Many small quantities at once, so that outliers stand out by position and repetition.

**SCUM example.** A dense grid of short segmented bars, each with a one-to-three character label (A, B1, Ca, Mg) and a percent, in two rows.

**Health-app counterpart.** Contributor lists under a readiness score (sleep, resting heart rate, activity balance).

**Component.** `MeterGroup` (planned), laying `Meter` out as a row or grid with an optional shared scale.

**DOS rendering.** Fixed-width cells on the character grid; strict alignment does the work. Abbreviate labels rather than widening cells.

Knowledge base: `wiki/patterns/micro-meter-grid`.

## Stacked range bar

**Encodes.** Ordered parts that sum to a whole, with length equal to share (for example, time spent in each band).

**SCUM example.** The stomach and intestine bars split into solid-food and liquid portions within one container.

**Health-app counterpart.** The AGP time-in-range bar: ordered bands from low to high, length equal to percent of time, targets shown beside it.

**Component.** `RangeBar` (planned): segments with tone, pattern, label, percent, optional duration, optional target tick and legend.

**DOS rendering.** One row of fill characters. Distinguish segments by glyph density plus a label, never hue alone. Any clinical palette arrives from the consumer, not from eidotter.

Knowledge base: `wiki/patterns/stacked-range-bar`.

## Series bars with goal

**Encodes.** A short series (days, weeks) compared with a goal line.

**SCUM example.** None direct; SCUM shows only live values, not history (a gap the diabetes side fills).

**Health-app counterpart.** Weekly or quarterly trend bars with a goal line; Garmin's per-hour charge and drain timeline.

**Component.** `SeriesBars` (planned): vertical bars, optional goal line, tone by consumer-supplied threshold.

**DOS rendering.** Stepped block columns with a goal-line row. Label the sample count.

Knowledge base: `wiki/patterns/series-bars`.

## On-board decay strip

**Encodes.** How much of something is still active and how it falls away over time.

**SCUM example.** Digestion as a process over time (stomach, then intestine, then colon or bladder), with absorption only at one stage. SCUM draws it as stages, not as a curve.

**Health-app counterpart.** Carbs on board and insulin on board in AndroidAPS, Nightscout, and Loop: a current value plus a projected decline to zero, one distinct colour per substance, a "now" line, a dimmed forecast region.

**Component.** `DecayStrip` (planned): renders consumer-supplied samples; no absorption or action model lives in eidotter.

**DOS rendering.** Past as filled blocks, future as dimmed blocks, a now marker, stepped rather than smooth. Show the model assumptions the consumer provides.

Knowledge base: `wiki/patterns/on-board-decay-strip`.

## Items in progress

**Encodes.** Each recent item still being processed, with its own progress.

**SCUM example.** Per-item rings under the digestion row, one per food still digesting (an apple, a raw egg), each with a percent, drawn in amber.

**Health-app counterpart.** Active meal and insulin events listed with remaining share, instead of one pooled total.

**Component.** No dedicated component. Compose small `Gauge` or `Meter` rows. The stage-to-stage pipeline view is deferred: it reads as game metaphor rather than teaching aid.

**DOS rendering.** A short list, newest first, each row label plus percent plus fill. Cap the list length.

Knowledge base: `wiki/patterns/items-in-progress`.

## Vitals tile and strip

**Encodes.** Several live measurements side by side: label, unit, large value, small secondary value.

**SCUM example.** The ICU-style monitor tiles: heart rate, blood pressure, oxygen saturation, respiration, temperature, each with a glyph, a unit, a large number, and a small secondary reading.

**Health-app counterpart.** The persistent glucose, insulin-on-board, and carbs-on-board trio; Nightscout pills.

**Component.** `Stat` extended with optional `unit`, `note`, and `target` slots, plus `VitalsStrip` (both planned). VitalsStrip renders its own tiles so it stays server-safe.

**DOS rendering.** Bracketed tiles on the character grid, value dominant, unit and note small. Escalate tone only through a pattern and a label.

Knowledge base: `wiki/patterns/vitals-tile-and-strip`.

## Glance strip

**Encodes.** The few values worth keeping on screen at all times.

**SCUM example.** An always-on HUD strip: a grey figure plus four icon rings with percents (health, stamina, fullness, hydration).

**Health-app counterpart.** A compact glucose, insulin-on-board, and carbs-on-board row. Loop removed separate readouts once the forecast curve carried the same information, a hint to keep the glance set small.

**Component.** `VitalsStrip` in a compact arrangement (planned); no separate component.

**DOS rendering.** One line of bracketed values. Stale data is shown by a prop-driven staleness marker, not by animation.

Knowledge base: `wiki/patterns/glance-strip`.

## Current/max pair

**Encodes.** A quantity and its ceiling together, so headroom is visible without a bar.

**SCUM example.** Two-column label and value rows: teeth 32/32, blood volume, stamina, gear weight against carry capacity, speeds.

**Health-app counterpart.** Sensor wear against the sufficiency requirement in a report header; a count against its minimum.

**Component.** The `formatValue` formatter (planned), used by Gauge, Meter, and Stat. It handles locale-correct percent, decimal comma, true minus sign, and current/max pairs.

**DOS rendering.** Right-aligned monospace numbers with a slash; units after the pair.

Knowledge base: `wiki/patterns/current-max-pair`.

## Body composition list

**Encodes.** Slow-moving composition in absolute units, where drift matters more than level.

**SCUM example.** Label, mini bar, and value rows for bone, blood, fat, and muscle mass. Change is visible only as the numbers moving; SCUM draws no history.

**Health-app counterpart.** Weight or body-fat trend as context beside glucose data. A delta arrow beside each row is an addition not present in SCUM.

**Component.** `MeterGroup` with a shared scale (planned). The mannequin or body figure is deferred as treatment-status or game metaphor.

**DOS rendering.** Aligned rows of label, short bar, value, and an optional signed delta glyph.

Knowledge base: `wiki/patterns/body-composition-list`.

## Named condition at a hard threshold

**Encodes.** A hard floor or ceiling that produces a named state, not only a colour change.

**SCUM example.** Energy deficiency and water deficiency at zero percent, with named conditions rather than graded colour bands.

**Health-app counterpart.** A labelled low-state, not just a number turning red. The consumer owns every threshold and every word of clinical copy.

**Component.** Status text and glyph on `Gauge` and `Meter`, resolved from consumer-supplied bands (first match wins, lower bound inclusive, upper bound exclusive, gaps resolve to neutral). The condition kanban is deferred as treatment status.

**DOS rendering.** A short uppercase state label beside the value, with a glyph. No flashing.

Knowledge base: `wiki/patterns/named-condition-threshold`.

## Over-capacity penalty

**Encodes.** Exceeding the whole has a cost, so over-range is shown as risk and not as success.

**SCUM example.** Reserves above 100 percent drain faster or fill the next stage faster; overload from carried weight shows as explicit penalty rows.

**Health-app counterpart.** Stacked or overlapping active amounts shown as a risk, and above-range time shown as its own band.

**Component.** The overflow marker on `Gauge`, and values past max on `Meter`, with the true value in the text and `aria-valuetext` while the ring or fill caps at its maximum.

**DOS rendering.** An overflow glyph at the end of the fill, plus a text note. The printed value is always the true value.

Knowledge base: `wiki/patterns/over-capacity-penalty`.

---

## Anti-patterns

- **Unlabelled rows with no effect.** SCUM's roughly thirty fields plus many micronutrient rows are readable only through strict alignment and repetition, and many carry no decision; players report not knowing whether they matter. Show an indicator only if it informs a decision, and show source data for what the user logs.
- **Hue-only coding.** A CGA-style palette has few hues, and red against green fails for many viewers. Pair every tone with a fill pattern or glyph and a text label.
- **Alert flashing.** Alarm fatigue is a leading reason people stop using glucose monitoring. Glow and flicker are never tied to alert state; quiet is the default.
- **Clinical defaults in a library.** No band edges, targets, or medical copy ship in eidotter. Consumers supply them, and the component states only what it was given.
- **Estimates shown as facts.** Modelled values (on-board amounts) are labelled as model-dependent, with their assumptions visible.
- **Dosing instructions.** These components display state. They never tell anyone what to take or do.
