/* figcli render spec — Glucose Hero (DMNC-976 · U7). Track B (local) input.
 *
 * The single most-looked-at element in the app. MANDATORY glucose-state variants —
 * without them, screen assembly (U8) would invent thresholds and the screens diverge.
 *
 * var: tokens come from figcli/DOSBTS.design.md (imported in U5).
 * Glucose threshold NUMBERS below are placeholders — CONFIRM the real in-range /
 * low / high / critical thresholds from DOSBTS AmberTheme/state code before final
 * render; do not invent medical values.
 *
 * GLOW FLOOR: the Hero must carry the 3-layer CRT phosphor glow (radius 2@0.6 /
 * 6@0.3 / 12@0.15). `glow` prop syntax is pinned against figcli src/ in U1.
 *
 * Workflow: render this sheet → `node to-component` each Hero/* frame →
 * `component combine` into one "Glucose Hero" component with a `state` variant prop.
 */
<Frame name="GlucoseHero" flex="row" gap={24} bg="var:bg" padding={24} wrap={true}>

  <Frame name="Hero/InRange" flex="col" gap={2} items="start">
    <Text size={60} color="var:success" glow="phosphor">128</Text>
    <Text size={15} color="var:muted">mg/dL · → stable</Text>
  </Frame>

  <Frame name="Hero/Low" flex="col" gap={2} items="start">
    <Text size={60} color="var:error" glow="phosphor">58</Text>
    <Text size={15} color="var:muted">mg/dL · ↘ falling</Text>
  </Frame>

  <Frame name="Hero/High" flex="col" gap={2} items="start">
    <Text size={60} color="var:error" glow="phosphor">214</Text>
    <Text size={15} color="var:muted">mg/dL · ↗ rising</Text>
  </Frame>

  <Frame name="Hero/CriticalLow" flex="col" gap={2} items="start">
    <Text size={60} color="var:error" glow="phosphor-strong">44</Text>
    <Text size={15} color="var:error">mg/dL · LOW · ↓↓</Text>
  </Frame>

  <Frame name="Hero/CriticalHigh" flex="col" gap={2} items="start">
    <Text size={60} color="var:error" glow="phosphor-strong">301</Text>
    <Text size={15} color="var:error">mg/dL · HIGH · ↑↑</Text>
  </Frame>

  <Frame name="Hero/Stale" flex="col" gap={2} items="start">
    <Text size={60} color="var:muted">--</Text>
    <Text size={15} color="var:muted">no signal · 12 MIN AGO</Text>
  </Frame>

</Frame>
