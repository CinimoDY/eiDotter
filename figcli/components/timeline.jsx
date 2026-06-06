/* figcli render spec — Event Marker Lane + IOB chip + Stale indicator (DMNC-976 · U7).
 * Track B input. var: tokens from figcli/DOSBTS.design.md.
 * Workflow: render → node to-component each named frame → combine into per-component sets.
 */
<Frame name="Timeline" flex="col" gap={16} bg="var:bg" padding={16}>

  {/* Event Marker Lane — 32px lane above the glucose chart. SF Symbol-style glyphs. */}
  <Frame name="EventLane/Empty" w={320} h={32} stroke="var:muted" rounded={0}>
    <Text size={13} color="var:muted">no events</Text>
  </Frame>
  <Frame name="EventLane/Single" flex="row" gap={24} w={320} h={32} items="center">
    <Text size={17} color="var:amber">◇</Text>{/* meal (diamond) */}
    <Text size={17} color="var:info">|</Text>{/* insulin */}
    <Text size={17} color="var:success">⬤</Text>{/* exercise */}
  </Frame>
  <Frame name="EventLane/Grouped" flex="row" gap={24} w={320} h={32} items="center">
    <Frame name="Group" flex="row" gap={2} items="center">
      <Text size={17} color="var:amber">◯</Text>{/* group (circle) */}
      <Text size={13} color="var:muted">3× 45g</Text>
    </Frame>
  </Frame>

  {/* IOB chip — zero / active / predicted */}
  <Frame name="IOB" flex="row" gap={8}>
    <Frame name="IOB/Zero" stroke="var:muted" rounded={0} padding={4}><Text size={13} color="var:muted">IOB 0.0U</Text></Frame>
    <Frame name="IOB/Active" stroke="var:info" rounded={0} padding={4}><Text size={13} color="var:info">IOB 2.1U</Text></Frame>
    <Frame name="IOB/Predicted" stroke="var:info" rounded={0} padding={4}><Text size={13} color="var:info">IOB 2.1U → 1.4U</Text></Frame>
  </Frame>

  {/* Stale-data indicator — 5–14min amber, ≥15min red (ties to Hero/Stale) */}
  <Frame name="Stale" flex="row" gap={8}>
    <Frame name="Stale/Warn" rounded={0} padding={2}><Text size={13} color="var:amber">8 MIN AGO</Text></Frame>
    <Frame name="Stale/Error" rounded={0} padding={2}><Text size={13} color="var:error">22 MIN AGO</Text></Frame>
  </Frame>

</Frame>
