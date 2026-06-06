/* figcli render spec — CRT Card + feedback components (DMNC-976 · U7). Track B input.
 * crt-card is a VARIANT of eiDotter Card (.dosCard), not a new component.
 * var: tokens from figcli/DOSBTS.design.md. Sharp corners (rounded=0).
 * Workflow: render → node to-component each named frame → combine into per-component sets.
 */
<Frame name="CardsAndFeedback" flex="col" gap={16} bg="var:bg" padding={16}>

  {/* CRT Phosphor Card — Card variant; 1px amber-muted border, card bg, glow on container */}
  <Frame name="Card/Dos" flex="col" gap={8} bg="var:card" stroke="var:muted" rounded={0} padding={16} glow="phosphor">
    <Text size={22} color="var:amber">SENSOR</Text>
    <Text size={17} color="var:text-secondary">Libre 3 · 9 days left</Text>
  </Frame>

  {/* Badge — status color states */}
  <Frame name="Badge" flex="row" gap={8}>
    <Frame name="Badge/Success" bg="var:success" rounded={0} padding={4}><Text size={13} color="var:bg">IN RANGE</Text></Frame>
    <Frame name="Badge/Error" bg="var:error" rounded={0} padding={4}><Text size={13} color="var:bg">HIGH</Text></Frame>
    <Frame name="Badge/Info" bg="var:info" rounded={0} padding={4}><Text size={13} color="var:bg">SENSOR</Text></Frame>
    <Frame name="Badge/Amber" stroke="var:amber" rounded={0} padding={4}><Text size={13} color="var:amber">45g</Text></Frame>
  </Frame>

  {/* TIR / Progress bars — Time-in-Range stacked bar (green/amber/red segments) */}
  <Frame name="TIRBars" flex="row" gap={0} w={320} h={20}>
    <Rectangle name="TIR/Low" bg="var:error" w={48} h={20} />
    <Rectangle name="TIR/InRange" bg="var:success" w={224} h={20} />
    <Rectangle name="TIR/High" bg="var:error" w={48} h={20} />
  </Frame>

  {/* Alert — uniform dark bg, status-colored left accent */}
  <Frame name="Alert/Warning" flex="row" gap={8} bg="var:card" stroke="var:error" rounded={0} padding={12}>
    <Text size={17} color="var:error">⚠</Text>
    <Text size={15} color="var:text-primary">Stacking insulin — 2.1U still active</Text>
  </Frame>

</Frame>
