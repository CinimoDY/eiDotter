/* figcli render spec — DOS Button (DMNC-976 · U7). Track B (local) input.
 *
 * Two variants for DOSBTS (eiDotter's full set is 6×5; scope here is primary/ghost).
 * GLOW FLOOR: primary Button must carry the 3-layer CRT phosphor glow.
 * var: tokens from figcli/DOSBTS.design.md. Sharp corners (rounded=0). SF Mono via var.
 *
 * Workflow: render → node to-component each Btn/* → component combine into "DOS Button"
 * with `variant` (primary|ghost) × `state` (default|pressed|disabled|loading) props.
 */
<Frame name="DOSButton" flex="col" gap={12} bg="var:bg" padding={16}>

  {/* primary: amber fill, black text, 1px border */}
  <Frame name="Btn/Primary/Default" bg="var:amber" stroke="var:amber" rounded={0} padding={12} glow="phosphor">
    <Text size={15} color="var:bg">LOG MEAL</Text>
  </Frame>
  <Frame name="Btn/Primary/Pressed" bg="var:amber-dark" stroke="var:amber-dark" rounded={0} padding={12}>
    <Text size={15} color="var:bg">LOG MEAL</Text>
  </Frame>
  <Frame name="Btn/Primary/Disabled" bg="var:muted" stroke="var:muted" rounded={0} padding={12}>
    <Text size={15} color="var:bg">LOG MEAL</Text>
  </Frame>
  <Frame name="Btn/Primary/Loading" bg="var:amber" stroke="var:amber" rounded={0} padding={12}>
    <Text size={15} color="var:bg">···</Text>
  </Frame>

  {/* ghost: transparent fill, amber text, 1px amber border */}
  <Frame name="Btn/Ghost/Default" stroke="var:amber" rounded={0} padding={12}>
    <Text size={15} color="var:amber">ADD INSULIN</Text>
  </Frame>
  <Frame name="Btn/Ghost/Pressed" stroke="var:amber-dark" rounded={0} padding={12}>
    <Text size={15} color="var:amber-dark">ADD INSULIN</Text>
  </Frame>
  <Frame name="Btn/Ghost/Disabled" stroke="var:muted" rounded={0} padding={12}>
    <Text size={15} color="var:muted">ADD INSULIN</Text>
  </Frame>

</Frame>
