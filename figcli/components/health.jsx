/* figcli render spec — health metabolism family (DMNC-1572 · U10). Track B (local) input.
 * Mirrors eiDotter Gauge, Meter, RangeBar, SeriesBars, DecayStrip, VitalsStrip.
 * Canonical Figma sets: eiDotter Web DS, page "Health". This file is the DOSBTS re-skin.
 * var: tokens from figcli/DOSBTS.design.md only. Sharp corners (rounded=0).
 *
 * Tone -> colour + pattern (colour is never the only signal):
 *   neutral=var:amber outline · info=var:info solid █ · success=var:success dither ▒
 *   warning=var:amber-dark hatch ▓ · critical=var:error dotted ░ + ▲ glyph
 * Text never sits on a patterned fill.
 *
 * Thresholds, bands, targets and goals are PLACEHOLDERS ({TARGET}, {GOAL}, {BAND_*}).
 * Confirm real values from DOSBTS state code before the final render. Do not invent.
 *
 * Workflow: render → node to-component each named Component/State frame →
 * component combine per component prefix (Gauge/*, Meter/*, …).
 */
<Frame name="Health" flex="col" gap={24} bg="var:bg" padding={16}>

  {/* Gauge — ring with dominant percent, secondary value, provenance tag */}
  <Frame name="Gauge" flex="row" gap={16} wrap={true}>
    <Frame name="Gauge/Ok" flex="col" gap={4} items="center">
      <Frame name="Ring" w={104} h={104} rounded={52} stroke="var:info" strokeWidth={13} flex="col" items="center" justify="center">
        <Text size={28} color="var:amber">62%</Text>
        <Text size={13} color="var:muted">620</Text>
      </Frame>
      <Text size={15} color="var:amber">SAMPLE A</Text>
    </Frame>
    <Frame name="Gauge/Critical" flex="col" gap={4} items="center">
      <Frame name="Ring" w={104} h={104} rounded={52} stroke="var:error" strokeWidth={13} flex="col" items="center" justify="center">
        <Text size={28} color="var:amber">62%</Text>
      </Frame>
      <Text size={15} color="var:error">▲ SAMPLE A</Text>
    </Frame>
    <Frame name="Gauge/Loading" flex="col" gap={4} items="center">
      <Frame name="Ring" w={104} h={104} rounded={52} stroke="var:muted" strokeWidth={13} flex="col" items="center" justify="center">
        <Text size={13} color="var:muted">░░░</Text>
      </Frame>
      <Text size={15} color="var:amber">SAMPLE A</Text>
    </Frame>
    <Frame name="Gauge/Stale" flex="col" gap={4} items="center">
      <Frame name="Ring" w={104} h={104} rounded={52} stroke="var:muted" strokeWidth={13} flex="col" items="center" justify="center">
        <Text size={28} color="var:amber-dark">62%</Text>
      </Frame>
      <Text size={15} color="var:amber">SAMPLE A · stale</Text>
    </Frame>
    <Frame name="Gauge/Unknown" flex="col" gap={4} items="center">
      <Frame name="Ring" w={104} h={104} rounded={52} stroke="var:muted" strokeWidth={13} flex="col" items="center" justify="center">
        <Text size={28} color="var:muted">--</Text>
      </Frame>
      <Text size={15} color="var:amber">SAMPLE A</Text>
    </Frame>
    <Frame name="Gauge/Provenance" flex="col" gap={4} items="center">
      <Frame name="Ring" w={104} h={104} rounded={52} stroke="var:success" strokeWidth={13} flex="col" items="center" justify="center">
        <Text size={28} color="var:amber">62%</Text>
      </Frame>
      <Frame name="Tag" flex="row" stroke="var:border" rounded={0} padding={4}><Text size={13} color="var:amber">estimated</Text></Frame>
    </Frame>
  </Frame>

  {/* Meter — vertical reserve bar, value above, label below, optimal tick at {TARGET} */}
  <Frame name="Meter" flex="row" gap={16} items="end">
    <Frame name="Meter/Info" flex="col" gap={4} items="center">
      <Text size={13} color="var:amber">62</Text>
      <Frame name="Track" w={12} h={96} stroke="var:border" rounded={0} flex="col" justify="end">
        <Rectangle name="Fill" bg="var:info" w={12} h={60} />
      </Frame>
      <Text size={13} color="var:amber">R1</Text>
    </Frame>
    <Frame name="Meter/Success" flex="col" gap={4} items="center">
      <Text size={13} color="var:amber">62</Text>
      <Frame name="Track" w={12} h={96} stroke="var:border" rounded={0} flex="col" justify="end">
        <Text name="Fill" size={13} color="var:success">▒{"\n"}▒{"\n"}▒{"\n"}▒</Text>
      </Frame>
      <Text size={13} color="var:amber">R2</Text>
    </Frame>
    <Frame name="Meter/Warning" flex="col" gap={4} items="center">
      <Text size={13} color="var:amber">62</Text>
      <Frame name="Track" w={12} h={96} stroke="var:border" rounded={0} flex="col" justify="end">
        <Text name="Fill" size={13} color="var:amber-dark">▓{"\n"}▓{"\n"}▓{"\n"}▓</Text>
      </Frame>
      <Text size={13} color="var:amber">R3</Text>
    </Frame>
    <Frame name="Meter/Critical" flex="col" gap={4} items="center">
      <Text size={13} color="var:amber">62</Text>
      <Frame name="Track" w={12} h={96} stroke="var:border" rounded={0} flex="col" justify="end">
        <Text name="Fill" size={13} color="var:error">░{"\n"}░{"\n"}░{"\n"}░</Text>
      </Frame>
      <Text size={13} color="var:error">▲ R4</Text>
    </Frame>
    <Frame name="Meter/OptimalTick" flex="col" gap={4} items="center">
      <Text size={13} color="var:amber">62</Text>
      <Frame name="Track" w={12} h={96} stroke="var:border" rounded={0} flex="col" justify="end">
        <Rectangle name="Tick" bg="var:amber" w={20} h={2} />
        <Rectangle name="Fill" bg="var:info" w={12} h={60} />
      </Frame>
      <Text size={13} color="var:muted">tick = {"{TARGET}"}</Text>
    </Frame>
  </Frame>

  {/* RangeBar — stacked bands with share labels beside, target tick, legend */}
  <Frame name="RangeBar/Vertical" flex="row" gap={16}>
    <Frame name="Track" flex="col" gap={0} w={24} h={192} stroke="var:border" rounded={0}>
      <Rectangle name="Band/Critical" bg="var:error" w={24} h={8} />
      <Rectangle name="Band/Warning" bg="var:amber-dark" w={24} h={21} />
      <Rectangle name="Band/Success" bg="var:success" w={24} h={111} />
      <Rectangle name="Band/Info" bg="var:info" w={24} h={37} />
      <Rectangle name="Band/Neutral" stroke="var:amber" w={24} h={15} />
    </Frame>
    <Frame name="Legend" flex="col" gap={4}>
      <Text size={13} color="var:error">░ {"{BAND_A}"} 4% 1 h</Text>
      <Text size={13} color="var:amber-dark">▓ {"{BAND_B}"} 11% 3 h</Text>
      <Text size={13} color="var:success">▒ {"{BAND_C}"} 58% 14 h</Text>
      <Text size={13} color="var:info">█ {"{BAND_D}"} 19% 4 h</Text>
      <Text size={13} color="var:amber">□ {"{BAND_E}"} 8% 2 h</Text>
      <Text size={13} color="var:muted">target ≥ {"{TARGET}"}</Text>
    </Frame>
  </Frame>

  {/* SeriesBars — per-period bars, dashed goal line at {GOAL}, gap as -- */}
  <Frame name="SeriesBars/WithGoal" flex="col" gap={4}>
    <Frame name="Plot" flex="row" gap={16} items="end" h={160}>
      <Rectangle name="Bar/D1" bg="var:info" w={32} h={67} />
      <Rectangle name="Bar/D2" bg="var:success" w={32} h={102} />
      <Rectangle name="Bar/D3" bg="var:success" w={32} h={125} />
      <Rectangle name="Bar/D4" bg="var:info" w={32} h={77} />
      <Rectangle name="Bar/D5" bg="var:error" w={32} h={147} />
      <Text name="Bar/D6" size={13} color="var:muted">--</Text>
      <Rectangle name="Bar/D7" bg="var:success" w={32} h={112} />
      <Text size={13} color="var:amber">goal {"{GOAL}"}</Text>
    </Frame>
    <Text size={13} color="var:muted">D1   D2   D3   D4   D5   D6   D7</Text>
  </Frame>

  {/* DecayStrip — stepped block cells, now marker, dimmed future, provenance */}
  <Frame name="DecayStrip/Default" flex="col" gap={8}>
    <Frame name="Item" flex="row" gap={8} items="center">
      <Text size={15} color="var:amber">SAMPLE A</Text>
      <Text size={15} color="var:amber">42% remaining</Text>
      <Frame name="Tag" flex="row" stroke="var:border" rounded={0} padding={4}><Text size={13} color="var:amber">estimated</Text></Frame>
    </Frame>
    <Frame name="Strip" flex="row" gap={8} items="center">
      <Text size={13} color="var:muted">1:00 PM</Text>
      <Text size={15} color="var:info">██████▓▓▓▓▓</Text>
      <Text size={15} color="var:amber">|</Text>
      <Text size={15} color="var:muted">▒▒▒▒▒▒▒░░░░░</Text>
      <Text size={13} color="var:muted">3:15 PM</Text>
    </Frame>
  </Frame>

  {/* VitalsStrip — monitor tiles; pair value as text */}
  <Frame name="VitalsStrip" flex="row" gap={16} wrap={true}>
    <Frame name="VitalsStrip/Ok" flex="col" gap={4} bg="var:card" stroke="var:border" rounded={0} padding={8} w={168}>
      <Text size={13} color="var:muted">SAMPLE A</Text>
      <Text size={28} color="var:amber">64</Text>
      <Text size={13} color="var:muted">{"{BAND_B}"}</Text>
    </Frame>
    <Frame name="VitalsStrip/Pair" flex="col" gap={4} bg="var:card" stroke="var:border" rounded={0} padding={8} w={168}>
      <Text size={13} color="var:muted">SAMPLE B</Text>
      <Text size={28} color="var:amber">124/78</Text>
      <Text size={13} color="var:muted">{"{BAND_B}"}</Text>
    </Frame>
    <Frame name="VitalsStrip/Critical" flex="col" gap={4} bg="var:card" stroke="var:error" rounded={0} padding={8} w={168}>
      <Text size={13} color="var:error">▲ SAMPLE C</Text>
      <Text size={28} color="var:amber">64</Text>
      <Text size={13} color="var:muted">{"{BAND_A}"}</Text>
    </Frame>
    <Frame name="VitalsStrip/Stale" flex="col" gap={4} bg="var:card" stroke="var:border" rounded={0} padding={8} w={168}>
      <Text size={13} color="var:muted">SAMPLE D</Text>
      <Text size={28} color="var:amber-dark">64</Text>
      <Text size={13} color="var:muted">stale</Text>
    </Frame>
    <Frame name="VitalsStrip/Unknown" flex="col" gap={4} bg="var:card" stroke="var:border" rounded={0} padding={8} w={168}>
      <Text size={13} color="var:muted">SAMPLE E</Text>
      <Text size={28} color="var:muted">--</Text>
      <Text size={13} color="var:muted">unknown</Text>
    </Frame>
  </Frame>

</Frame>
