/* figcli render spec — Stat (DMNC-976 · U7). Track B (local) input.
 * Mirrors eiDotter Stat taxonomy: trend (up|down|neutral) × size (sm|md|lg) + a no-data state.
 * Trend colors: up=var:success, down=var:error, neutral=var:amber (per eiDotter Stat).
 * var: tokens from figcli/DOSBTS.design.md.
 *
 * Workflow: render → node to-component each Stat/* → sizes "Stat/..." --base md →
 * component combine into "Stat" with `trend` × `size` × `state` props.
 */
<Frame name="Stat" flex="row" gap={16} bg="var:bg" padding={16} wrap={true}>

  <Frame name="Stat/Up" flex="col" gap={1} items="start">
    <Text size={13} color="var:muted">TIME IN RANGE</Text>
    <Text size={28} color="var:amber">72%</Text>
    <Text size={13} color="var:success">↑ +4%</Text>
  </Frame>

  <Frame name="Stat/Down" flex="col" gap={1} items="start">
    <Text size={13} color="var:muted">AVG GLUCOSE</Text>
    <Text size={28} color="var:amber">141</Text>
    <Text size={13} color="var:error">↓ -8</Text>
  </Frame>

  <Frame name="Stat/Neutral" flex="col" gap={1} items="start">
    <Text size={13} color="var:muted">GMI</Text>
    <Text size={28} color="var:amber">6.8%</Text>
    <Text size={13} color="var:amber">→ 0</Text>
  </Frame>

  <Frame name="Stat/NoData" flex="col" gap={1} items="start">
    <Text size={13} color="var:muted">STD DEV</Text>
    <Text size={28} color="var:muted">--</Text>
    <Text size={13} color="var:muted">no data</Text>
  </Frame>

</Frame>
