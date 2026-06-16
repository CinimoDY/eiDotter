/**
 * Do not edit directly, this file was auto-generated.
 */

export const ColorCgaBlack = "#020003"; // Amber monochrome - darkest
export const ColorCgaBlue = "#2c1203"; // Amber monochrome
export const ColorCgaGreen = "#411f06"; // Amber monochrome
export const ColorCgaCyan = "#552d0a"; // Amber monochrome
export const ColorCgaRed = "#65360c"; // Amber monochrome
export const ColorCgaMagenta = "#713e0d"; // Amber monochrome
export const ColorCgaBrown = "#5f340e"; // Amber monochrome
export const ColorCgaLightGray = "#b87c1a"; // Amber monochrome
export const ColorCgaDarkGray = "#010103"; // Amber monochrome - near black
export const ColorCgaBrightBlue = "#c38a23"; // Amber monochrome
export const ColorCgaBrightGreen = "#cb9529"; // Amber monochrome
export const ColorCgaBrightCyan = "#d4a030"; // Amber monochrome
export const ColorCgaBrightRed = "#dca934"; // Amber monochrome
export const ColorCgaBrightMagenta = "#ddb030"; // Amber monochrome
export const ColorCgaYellow = "#e5b936"; // Amber monochrome - accent
export const ColorCgaWhite = "#ba8225"; // Amber monochrome
export const ColorCgaAmber = "#ffb000"; // P3 phosphor amber (602nm)
export const ColorCgaAmberBright = "#fdca9f"; // P3 phosphor amber bright
export const ColorCgaAmberDim = "#9a5700"; // P3 phosphor amber dim
export const ColorCgaAmberGlow = "#ffb00080"; // Amber glow at 50% opacity
export const ColorCgaRedGlow = "#ff555580"; // Red glow at 50% opacity
export const ColorCgaGreenGlow = "#55ff5580"; // Green glow at 50% opacity
export const ColorCgaCyanGlow = "#55ffff80"; // Cyan glow at 50% opacity
export const ColorCgaMagentaGlow = "#ff55ff80"; // Magenta glow at 50% opacity
export const ColorCgaBlueGlow = "#5555ff80"; // Blue glow at 50% opacity
export const ColorCgaWhiteGlow = "#fff5e080"; // Warm white glow at 50% opacity
export const ColorCgaTrueGreen = "#00aa00"; // True CGA green — functional success / in-range.
export const ColorCgaTrueRed = "#aa0000"; // True CGA red — functional error / out-of-range.
export const ColorCgaTrueCyan = "#00aaaa"; // True CGA cyan — functional info / sensor.
export const ColorCgaTrueWhite = "#ffffff"; // True CGA white — theme-invariant light foreground for functional fills (white-on-red destructive, white-on-green success). #FFFFFF on cga-true.red #AA0000 is ~5.9:1 (passes WCAG AA). DMNC-922.
export const ColorCgaTrueRedBright = "#ff5555"; // True CGA bright red — theme-invariant. The readable-as-TEXT-on-dark red (#FF5555 on the #020003 CRT bg passes AA, where the solid #AA0000 is only ~2.3:1). Use for error TEXT/icons on dark; use the solid `red` for fills. DMNC-922.
export const ColorSemanticTextAiDraft = "#ff1a8c"; // AI-drafted prose, not yet revised by human — Signalnoise hot pink. Brand-locked hex: same value across all themes so the AI marker is unmissable regardless of palette. Lives in base (T1) so all themes inherit it; the rest of color.semantic.* lives in web.tokens.json (T2).
export const ColorSemanticTextAiDraftGlow = "#ff1a8c80"; // Phosphor halo around AI-drafted prose. 50% rgba of the aiDraft hex; brand-locked alongside it. Used in text-shadow only; no Tailwind utility.
export const ColorSemanticTextPrimary = "#b87c1a";
export const ColorSemanticTextSecondary = "#020003";
export const ColorSemanticTextAccent = "#e5b936";
export const ColorSemanticTextDisabled = "#010103";
export const ColorSemanticTextMuted = "#9a5700"; // Muted supplementary text — timestamps, counts, footnotes. T10 handoff: dedicated amber-dim hex (in-family with primary), not brown; no opacity coupling.
export const ColorSemanticTextTertiary = "#9a5700"; // UTI-tier role (DMNC-922). Third-emphasis text; same value as `muted` for now — `muted` is retained as its DOS-semantic alias. New components should prefer the tier name.
export const ColorSemanticTextBrand = "#ffb000"; // UTI-tier role (DMNC-922). The honest phosphor-amber text role — the value ~30 components currently paint with as raw `--color-cga-amber`. The DMNC-1059 sweep migrates them here so amber text re-themes.
export const ColorSemanticTextOnBrand = "#020003"; // UTI-tier role (DMNC-922). Text/icon sitting on a brand-amber fill (e.g. primary button label).
export const ColorSemanticTextError = "#ff5555"; // UTI-tier functional role (DMNC-922). Bright honest red (#FF5555) — readable as error TEXT on the dark CRT background (the solid `cga-true.red` #AA0000 is only ~2.3:1 as text). For red FILLS use `background.error`/`border.error` (solid #AA0000).
export const ColorSemanticTextWarning = "#ffb000"; // UTI-tier functional role (DMNC-922). Warning = amber in the DOS palette (amber IS the caution hue); intentionally not a separate yellow.
export const ColorSemanticTextSuccess = "#00aa00"; // UTI-tier functional role (DMNC-922). Honest CGA green (#00AA00), theme-invariant.
export const ColorSemanticTextInfo = "#00aaaa"; // UTI-tier functional role (DMNC-922). Honest CGA cyan (#00AAAA), theme-invariant.
export const ColorSemanticTextWhite = "#ffffff"; // UTI-tier role (DMNC-922). Theme-invariant light foreground for functional/dark fills (e.g. white-on-red destructive button text). Not for body text on the dark CRT background.
export const ColorSemanticBackgroundPrimary = "#020003";
export const ColorSemanticBackgroundSecondary = "#010103";
export const ColorSemanticBackgroundAccent = "#ffb000";
export const ColorSemanticBackgroundTertiary = "#010103"; // UTI-tier role (DMNC-922). Third surface level; same value as `secondary` for now in the dark DOS theme — diverges in the light theme.
export const ColorSemanticBackgroundBrand = "#ffb000"; // UTI-tier role (DMNC-922). Amber fill surface (e.g. primary button background). Pair with `text.onBrand`.
export const ColorSemanticBackgroundError = "#aa0000"; // UTI-tier functional role (DMNC-922). Honest red solid fill for destructive controls (e.g. destructive button background). Pair with a light foreground.
export const ColorSemanticBackgroundSuccess = "#00aa00"; // UTI-tier functional role (DMNC-922). Honest green solid fill.
export const ColorSemanticBorderDefault = "#b87c1a";
export const ColorSemanticBorderFocus = "#e5b936";
export const ColorSemanticBorderHover = "#ba8225";
export const ColorSemanticBorderDisabled = "#010103";
export const ColorSemanticBorderBrand = "#ffb000"; // UTI-tier role (DMNC-922). Amber border (active/selected emphasis).
export const ColorSemanticBorderError = "#aa0000"; // UTI-tier functional role (DMNC-922). Honest red border for destructive/error controls.
export const ColorSemanticBorderSuccess = "#00aa00"; // UTI-tier functional role (DMNC-922). Honest green border.
export const ColorSemanticLinkDefault = "#d4a030";
export const ColorSemanticLinkHover = "#ba8225";
export const ColorSemanticLinkActive = "#552d0a";
export const ColorSemanticLinkVisited = "#713e0d";
export const ColorSemanticStatusSuccess = "#cb9529";
export const ColorSemanticStatusWarning = "#e5b936";
export const ColorSemanticStatusError = "#dca934";
export const ColorSemanticStatusInfo = "#d4a030";
export const ColorSemanticAlertInfo = "#1f2228"; // Warm dark blue for info alerts
export const ColorSemanticAlertSuccess = "#122010"; // Warm dark green for success alerts
export const ColorSemanticAlertWarning = "#352800"; // Dark amber for warning alerts
export const ColorSemanticAlertError = "#430500"; // Warm dark red for error alerts
export const TypographyFontFamilyPrimary = ["Perfect DOS VGA 437", "monospace"]; // Perfect DOS VGA 437 by Zeh Fernando (free-for-any-use; ships with bundled LICENSE.txt). Pixel-perfect-vector TTF — every glyph outline is axis-aligned, scales cleanly to any size. The `monospace` fallback preserves DOS aesthetic on @font-face failure.
export const TypographyFontFamilyFallback = ["monospace"]; // Bare `monospace` stack — fail-loud diagnostic counterpart to `primary`. Compose with `primary` when consumers want strict Perfect-DOS-or-nothing rendering.
export const TypographyFontSizeTextXs = "1.125rem"; // 18px — smallest body text
export const TypographyFontSizeTextSm = "1.25rem"; // 20px — secondary body text
export const TypographyFontSizeTextMd = "1.375rem"; // 22px — default body text
export const TypographyFontSizeTextLg = "1.5rem"; // 24px — large body text
export const TypographyFontSizeTextXl = "1.625rem"; // 26px — extra large body text
export const TypographyFontSizeDisplayXs = "1.875rem"; // 30px — smallest heading
export const TypographyFontSizeDisplaySm = "2.25rem"; // 36px — small heading
export const TypographyFontSizeDisplayMd = "2.625rem"; // 42px — medium heading
export const TypographyFontSizeDisplayLg = "3.5rem"; // 56px — large heading
export const TypographyFontSizeDisplayXl = "4.125rem"; // 66px — extra large heading
export const TypographyFontSizeDisplay2xl = "4.875rem"; // 78px — hero heading
export const TypographyFontWeightRegular = 400;
export const TypographyFontWeightSemibold = 400;
export const TypographyFontWeightBold = 400;
export const TypographyLineHeightTextXs = "1.125rem"; // 18px
export const TypographyLineHeightTextSm = "1.25rem"; // 20px
export const TypographyLineHeightTextMd = "1.5rem"; // 24px
export const TypographyLineHeightTextLg = "1.75rem"; // 28px
export const TypographyLineHeightTextXl = "1.875rem"; // 30px
export const TypographyLineHeightDisplayXs = "2rem"; // 32px
export const TypographyLineHeightDisplaySm = "2.375rem"; // 38px
export const TypographyLineHeightDisplayMd = "2.75rem"; // 44px
export const TypographyLineHeightDisplayLg = "3.75rem"; // 60px
export const TypographyLineHeightDisplayXl = "4.5rem"; // 72px
export const TypographyLineHeightDisplay2xl = "5.625rem"; // 90px
export const Spacing0 = "0px";
export const Spacing1 = "4px";
export const Spacing2 = "8px";
export const Spacing3 = "12px";
export const Spacing4 = "16px";
export const Spacing5 = "20px";
export const Spacing6 = "24px";
export const Spacing8 = "32px";
export const Spacing10 = "40px";
export const Spacing12 = "48px";
export const Spacing16 = "64px";
export const BorderRadiusNone = "0px";
export const BorderRadiusSm = "2px";
export const BorderRadiusBase = "4px";
export const BorderWidthThin = "1px";
export const BorderWidthMedium = "2px";
export const BorderWidthThick = "4px";
export const ShadowNone = {
  offsetX: "0px",
  offsetY: "0px",
  blur: "0px",
  spread: "0px",
  color: "#00000000",
};
export const ShadowDrop = {
  offsetX: "2px",
  offsetY: "2px",
  blur: "0px",
  spread: "0px",
  color: "#080500",
}; // Hard drop shadow, DOS window style (amber-warm near-black)
export const ShadowGlowXs = {
  offsetX: "0px",
  offsetY: "0px",
  blur: "8px",
  spread: "0px",
  color: "#FFB00080",
}; // Extra small phosphor glow (subtle hover)
export const ShadowGlowSm = {
  offsetX: "0px",
  offsetY: "0px",
  blur: "10px",
  spread: "0px",
  color: "#FFB00080",
}; // Small phosphor glow (button hover)
export const ShadowGlowMd = {
  offsetX: "0px",
  offsetY: "0px",
  blur: "20px",
  spread: "0px",
  color: "#FFB00080",
}; // Medium phosphor glow (container/card)
export const ShadowGlowLg = {
  offsetX: "0px",
  offsetY: "0px",
  blur: "30px",
  spread: "0px",
  color: "#FFB00080",
}; // Large phosphor glow (emphasis)
export const ShadowGlowXsRed = {
  offsetX: "0px",
  offsetY: "0px",
  blur: "8px",
  spread: "0px",
  color: "#FF555580",
}; // Extra small red phosphor glow
export const ShadowGlowSmRed = {
  offsetX: "0px",
  offsetY: "0px",
  blur: "10px",
  spread: "0px",
  color: "#FF555580",
}; // Small red phosphor glow
export const ShadowGlowMdRed = {
  offsetX: "0px",
  offsetY: "0px",
  blur: "20px",
  spread: "0px",
  color: "#FF555580",
}; // Medium red phosphor glow
export const ShadowGlowLgRed = {
  offsetX: "0px",
  offsetY: "0px",
  blur: "30px",
  spread: "0px",
  color: "#FF555580",
}; // Large red phosphor glow
export const ShadowGlowXsGreen = {
  offsetX: "0px",
  offsetY: "0px",
  blur: "8px",
  spread: "0px",
  color: "#55FF5580",
}; // Extra small green phosphor glow
export const ShadowGlowSmGreen = {
  offsetX: "0px",
  offsetY: "0px",
  blur: "10px",
  spread: "0px",
  color: "#55FF5580",
}; // Small green phosphor glow
export const ShadowGlowMdGreen = {
  offsetX: "0px",
  offsetY: "0px",
  blur: "20px",
  spread: "0px",
  color: "#55FF5580",
}; // Medium green phosphor glow
export const ShadowGlowLgGreen = {
  offsetX: "0px",
  offsetY: "0px",
  blur: "30px",
  spread: "0px",
  color: "#55FF5580",
}; // Large green phosphor glow
export const ShadowGlowXsCyan = {
  offsetX: "0px",
  offsetY: "0px",
  blur: "8px",
  spread: "0px",
  color: "#55FFFF80",
}; // Extra small cyan phosphor glow
export const ShadowGlowSmCyan = {
  offsetX: "0px",
  offsetY: "0px",
  blur: "10px",
  spread: "0px",
  color: "#55FFFF80",
}; // Small cyan phosphor glow
export const ShadowGlowMdCyan = {
  offsetX: "0px",
  offsetY: "0px",
  blur: "20px",
  spread: "0px",
  color: "#55FFFF80",
}; // Medium cyan phosphor glow
export const ShadowGlowLgCyan = {
  offsetX: "0px",
  offsetY: "0px",
  blur: "30px",
  spread: "0px",
  color: "#55FFFF80",
}; // Large cyan phosphor glow
export const ShadowGlowXsMagenta = {
  offsetX: "0px",
  offsetY: "0px",
  blur: "8px",
  spread: "0px",
  color: "#FF55FF80",
}; // Extra small magenta phosphor glow
export const ShadowGlowSmMagenta = {
  offsetX: "0px",
  offsetY: "0px",
  blur: "10px",
  spread: "0px",
  color: "#FF55FF80",
}; // Small magenta phosphor glow
export const ShadowGlowMdMagenta = {
  offsetX: "0px",
  offsetY: "0px",
  blur: "20px",
  spread: "0px",
  color: "#FF55FF80",
}; // Medium magenta phosphor glow
export const ShadowGlowLgMagenta = {
  offsetX: "0px",
  offsetY: "0px",
  blur: "30px",
  spread: "0px",
  color: "#FF55FF80",
}; // Large magenta phosphor glow
export const ShadowGlowXsBlue = {
  offsetX: "0px",
  offsetY: "0px",
  blur: "8px",
  spread: "0px",
  color: "#5555FF80",
}; // Extra small blue phosphor glow
export const ShadowGlowSmBlue = {
  offsetX: "0px",
  offsetY: "0px",
  blur: "10px",
  spread: "0px",
  color: "#5555FF80",
}; // Small blue phosphor glow
export const ShadowGlowMdBlue = {
  offsetX: "0px",
  offsetY: "0px",
  blur: "20px",
  spread: "0px",
  color: "#5555FF80",
}; // Medium blue phosphor glow
export const ShadowGlowLgBlue = {
  offsetX: "0px",
  offsetY: "0px",
  blur: "30px",
  spread: "0px",
  color: "#5555FF80",
}; // Large blue phosphor glow
export const ShadowGlowXsWhite = {
  offsetX: "0px",
  offsetY: "0px",
  blur: "8px",
  spread: "0px",
  color: "#FFFFFF80",
}; // Extra small white phosphor glow
export const ShadowGlowSmWhite = {
  offsetX: "0px",
  offsetY: "0px",
  blur: "10px",
  spread: "0px",
  color: "#FFFFFF80",
}; // Small white phosphor glow
export const ShadowGlowMdWhite = {
  offsetX: "0px",
  offsetY: "0px",
  blur: "20px",
  spread: "0px",
  color: "#FFFFFF80",
}; // Medium white phosphor glow
export const ShadowGlowLgWhite = {
  offsetX: "0px",
  offsetY: "0px",
  blur: "30px",
  spread: "0px",
  color: "#FFFFFF80",
}; // Large white phosphor glow
export const DurationInstant = "0ms";
export const DurationFast = "100ms";
export const DurationNormal = "200ms";
export const DurationSlow = "400ms";
export const DurationPowerOff = "400ms"; // CRT power-off animation
export const DurationPowerOn = "600ms"; // CRT power-on animation (phosphor warm-up)
export const Opacity0 = 0; // Fully transparent
export const Opacity10 = 0.1; // Subtle hover overlays
export const Opacity25 = 0.25; // Light overlays
export const Opacity50 = 0.5; // Disabled states, medium overlays
export const Opacity75 = 0.75; // Heavy overlays
export const Opacity80 = 0.8; // Modal backdrop
export const Opacity100 = 1; // Fully opaque
export const ZIndexBase = 0; // Default stacking context
export const ZIndexDropdown = 1000; // Dropdowns and popovers
export const ZIndexSticky = 1020; // Sticky headers and navs
export const ZIndexFixed = 1030; // Fixed position elements
export const ZIndexModal = 1040; // Modal dialogs
export const ZIndexPopover = 1050; // Popovers above modals
export const ZIndexTooltip = 1060; // Tooltips (topmost)
export const FocusRingWidth = "2px"; // Focus ring thickness
export const FocusRingOffset = "2px"; // Gap between element and ring
export const FocusRingColor = "#e5b936"; // Focus ring color (accent)
export const EffectsOverlay = "#080500cc"; // Modal/dialog backdrop overlay (amber-warm)
export const EffectsScanlineLight = "#ffb0000d"; // CRT scanline light band
export const EffectsScanlineDark = "#ffb00005"; // CRT scanline dark band
export const EffectsVignetteGlow = "#ffb0001f"; // Inner screen glow vignette
export const EffectsVignetteEdge = "#0805004d"; // Vignette edge darkening (amber-warm)
export const EffectsVignetteCorner = "#08050080"; // Vignette corner darkening (amber-warm)
export const EffectsScreenTint = "#ffb0001a"; // Subtle amber screen tint
export const EffectsDropShadow = "#08050080"; // Terminal window drop shadow (amber-warm)
export const EffectsPhosphorGlow = "#ffb0001f"; // Phosphor bloom/bleeding glow for CRT effects
export const EffectsBloomOuter = "#ffb0000d"; // Outer phosphor bloom layer (faint glow)
export const EffectsBloomCenter = "#ffb00008"; // Center phosphor bloom highlight
export const EffectsCrtBackground = "#060300"; // Dark warm-black for CRT screen (not pure black)
export const DimensionPlaceholder = "0px"; // Placeholder so the file is non-empty and parses. Remove when actual T3 tokens land.
export const EffectPhosphorIntensity = 1; // Overall phosphor brightness multiplier (0–1). Web: --retro-intensity CSS var; Apple: SwiftUI colorEffect shader uniform / Metal float.
export const EffectPhosphorPersistence = "200ms"; // How long a glow lingers after change (50–800ms). Web: animation duration on glow fade; Apple: SwiftUI .easeOut animation duration or SKShader trailing uniform. Phase 0i Niels-derived (time-based segmentation).
export const EffectPhosphorGlowRadius = "40px"; // Tight phosphor glow around lit pixels (8–120px). Web: box-shadow inset blur; Apple: SwiftUI .shadow(radius:) or CIBloom input radius. Note: Apple/web don't use identical units — see Phase 0i unit-conversion note.
export const EffectPhosphorBloomRadius = "80px"; // Soft phosphor halation extending outward (20–200px). Web: outer box-shadow inset blur; Apple: CIBloom larger pass.
export const EffectPhosphorBloomIntensity = 0.5; // Phosphor halation visibility (0–1). Web: bloom layer opacity; Apple: CIBloom input intensity.
export const EffectPhosphorFocusBlur = "0px"; // Slight defocus from imperfect electron beam convergence (0–4px). Default 0 = perfectly focused. Phase 0i Niels-derived (oscilloscope FOCUS knob). Web: backdrop filter blur; Apple: CIGaussianBlur input radius.
export const EffectScanlineIntensity = 0.6; // Scanline visibility (0–1). Web: scanline overlay opacity; Apple: SwiftUI shader UV-based dark-stripe modulation.
export const EffectScanlineLinePitch = "4px"; // Distance between scanlines (2–8px). Web: gradient repeat distance; Apple: shader UV period.
export const EffectScanlineScrollPeriod = "9000ms"; // Scanline drift cycle (2000–30000ms; 0 to disable). Web: animation duration; Apple: shader time-uniform multiplier.
export const EffectFlickerIntensity = 0.04; // Flicker visibility (0–0.1). Web: flicker layer opacity; Apple: shader sine-wave modulation amplitude.
export const EffectFlickerPeriod = "500ms"; // Flicker cycle (333–1000ms; >=333ms = 3Hz max for WCAG 2.3.1). Hard floor at 333ms enforced by build-time transform. Web: animation duration; Apple: time-uniform period.
export const EffectVignetteIntensity = 1; // Vignette visibility (0–1). Web: glow layer opacity; Apple: shader corner-darkening modulation.
export const EffectVignetteSpread = 0.2; // Vignette spread as fraction of viewport (0–0.5). Web: gradient stop position (50% = ratio of inner safe area); Apple: shader UV-distance threshold.
export const EffectWebScanlineLineWidth = "1px"; // Thin-line width in scanline gradient (web-only — Apple shader uses UV-fraction).
export const EffectWebScanlineScrollDistance = "12px"; // How far scanline overlay drifts before looping (web-only — Apple uses time-based UV scrolling).
export const EffectWebFlickerSteps = 4; // CSS steps() discretization (web-only — Apple shader is continuous).
export const EffectWebFlickerIntensityStatic = 0.03; // Non-animated reduced-motion fallback opacity (web-only — Apple uses runtime accessibilityDisplayShouldReduceMotion flag, not a token).
export const EffectWebBloomFadeStop = 0.6; // CSS radial-gradient stop where bloom transparency begins (web-only — CIBloom has no gradient-stop equivalent).
export const EffectWebVignetteGradientExtentX = 120; // CSS radial-gradient ellipse X size in % (web-only).
export const EffectWebVignetteGradientExtentY = 100; // CSS radial-gradient ellipse Y size in % (web-only).
export const EffectWebVignetteTransitionEdge = 0.8; // Outer-edge gradient stop where deepest vignette begins (web-only).
export const EffectWebPowerScalePreCollapse = 0.95; // CSS transform: scale() start during power-off (web-only).
export const EffectWebPowerScaleCollapseLine = 0.005; // Thin horizontal line mid-state during collapse (web-only).
export const EffectWebPowerBlurCollapse = "2px"; // CSS filter: blur() during collapse (web-only).
export const EffectWebPowerBlurWarmupStart = "4px"; // Warmup-start blur (web-only).
export const EffectWebPowerBlurWarmupMid = "2px"; // Warmup-mid blur (web-only).
export const EffectWebPowerBrightnessWarmupStart = 0.3; // Warmup-start CSS filter: brightness() (web-only).
export const EffectWebPowerBrightnessWarmupMid = 0.6; // Warmup-mid brightness (web-only).
export const EffectWebPowerDurationOff = "400ms"; // Web-only power-off animation duration. Apple platforms have own timing curves.
export const EffectWebPowerDurationOn = "600ms"; // Web-only power-on animation duration.
export const MotionDurationWarmup = "400ms"; // phosphor-warmup — CRT ignition brightness flicker on hover entry. Matches var(--duration-slow) at the Button call site.
export const MotionDurationEnergize = "150ms"; // phosphor-energize — brightness flash on press / check.
export const MotionDurationBlink = "1000ms"; // blink — cursor / indicator blink cycle (paired with the stepped easing).
export const MotionEasingWarmup = "ease-out"; // phosphor-warmup easing.
export const MotionEasingEnergize = "ease-out"; // phosphor-energize easing (runs forwards).
export const MotionEasingBlink = "step-end"; // blink easing — hard step, no interpolation (terminal cursor).
