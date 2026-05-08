//
// EiDotterTokens.swift
// AUTO-GENERATED — Do not edit manually
//
// Generated from: src/tokens/base.tokens.json
// Run: npm run build-tokens
//

import SwiftUI

// MARK: - Colors

public enum EiDotterColors {
    /// Amber monochrome - darkest
    public static let colorCgaBlack = Color(red: 0.008, green: 0.000, blue: 0.012, opacity: 1.000)
    /// Amber monochrome
    public static let colorCgaBlue = Color(red: 0.173, green: 0.071, blue: 0.012, opacity: 1.000)
    /// Amber monochrome
    public static let colorCgaGreen = Color(red: 0.255, green: 0.122, blue: 0.024, opacity: 1.000)
    /// Amber monochrome
    public static let colorCgaCyan = Color(red: 0.333, green: 0.176, blue: 0.039, opacity: 1.000)
    /// Amber monochrome
    public static let colorCgaRed = Color(red: 0.396, green: 0.212, blue: 0.047, opacity: 1.000)
    /// Amber monochrome
    public static let colorCgaMagenta = Color(red: 0.443, green: 0.243, blue: 0.051, opacity: 1.000)
    /// Amber monochrome
    public static let colorCgaBrown = Color(red: 0.373, green: 0.204, blue: 0.055, opacity: 1.000)
    /// Amber monochrome
    public static let colorCgaLightGray = Color(red: 0.722, green: 0.486, blue: 0.102, opacity: 1.000)
    /// Amber monochrome - near black
    public static let colorCgaDarkGray = Color(red: 0.004, green: 0.004, blue: 0.012, opacity: 1.000)
    /// Amber monochrome
    public static let colorCgaBrightBlue = Color(red: 0.765, green: 0.541, blue: 0.137, opacity: 1.000)
    /// Amber monochrome
    public static let colorCgaBrightGreen = Color(red: 0.796, green: 0.584, blue: 0.161, opacity: 1.000)
    /// Amber monochrome
    public static let colorCgaBrightCyan = Color(red: 0.831, green: 0.627, blue: 0.188, opacity: 1.000)
    /// Amber monochrome
    public static let colorCgaBrightRed = Color(red: 0.863, green: 0.663, blue: 0.204, opacity: 1.000)
    /// Amber monochrome
    public static let colorCgaBrightMagenta = Color(red: 0.867, green: 0.690, blue: 0.188, opacity: 1.000)
    /// Amber monochrome - accent
    public static let colorCgaYellow = Color(red: 0.898, green: 0.725, blue: 0.212, opacity: 1.000)
    /// Amber monochrome
    public static let colorCgaWhite = Color(red: 0.729, green: 0.510, blue: 0.145, opacity: 1.000)
    /// P3 phosphor amber (602nm)
    public static let colorCgaAmber = Color(red: 1.000, green: 0.690, blue: 0.000, opacity: 1.000)
    /// P3 phosphor amber bright
    public static let colorCgaAmberBright = Color(red: 0.992, green: 0.792, blue: 0.624, opacity: 1.000)
    /// P3 phosphor amber dim
    public static let colorCgaAmberDim = Color(red: 0.604, green: 0.341, blue: 0.000, opacity: 1.000)
    /// Amber glow at 50% opacity
    public static let colorCgaAmberGlow = Color(red: 1.000, green: 0.690, blue: 0.000, opacity: 0.502)
    /// Red glow at 50% opacity
    public static let colorCgaRedGlow = Color(red: 1.000, green: 0.333, blue: 0.333, opacity: 0.502)
    /// Green glow at 50% opacity
    public static let colorCgaGreenGlow = Color(red: 0.333, green: 1.000, blue: 0.333, opacity: 0.502)
    /// Cyan glow at 50% opacity
    public static let colorCgaCyanGlow = Color(red: 0.333, green: 1.000, blue: 1.000, opacity: 0.502)
    /// Magenta glow at 50% opacity
    public static let colorCgaMagentaGlow = Color(red: 1.000, green: 0.333, blue: 1.000, opacity: 0.502)
    /// Blue glow at 50% opacity
    public static let colorCgaBlueGlow = Color(red: 0.333, green: 0.333, blue: 1.000, opacity: 0.502)
    /// Warm white glow at 50% opacity
    public static let colorCgaWhiteGlow = Color(red: 1.000, green: 0.961, blue: 0.878, opacity: 0.502)
    /// AI-drafted prose, not yet revised by human — Signalnoise hot pink. Brand-locked hex: same value across all themes so the AI marker is unmissable regardless of palette. Lives in base (T1) so all themes inherit it; the rest of color.semantic.* lives in web.tokens.json (T2).
    public static let colorSemanticTextAiDraft = Color(red: 1.000, green: 0.102, blue: 0.549, opacity: 1.000)
    /// Phosphor halo around AI-drafted prose. 50% rgba of the aiDraft hex; brand-locked alongside it. Used in text-shadow only; no Tailwind utility.
    public static let colorSemanticTextAiDraftGlow = Color(red: 1.000, green: 0.102, blue: 0.549, opacity: 0.502)
    public static let colorSemanticTextPrimary = Color(red: 0.722, green: 0.486, blue: 0.102, opacity: 1.000)
    public static let colorSemanticTextSecondary = Color(red: 0.008, green: 0.000, blue: 0.012, opacity: 1.000)
    public static let colorSemanticTextAccent = Color(red: 0.898, green: 0.725, blue: 0.212, opacity: 1.000)
    public static let colorSemanticTextDisabled = Color(red: 0.004, green: 0.004, blue: 0.012, opacity: 1.000)
    /// Muted supplementary text — timestamps, counts, footnotes. T10 handoff: dedicated amber-dim hex (in-family with primary), not brown; no opacity coupling.
    public static let colorSemanticTextMuted = Color(red: 0.604, green: 0.341, blue: 0.000, opacity: 1.000)
    public static let colorSemanticBackgroundPrimary = Color(red: 0.008, green: 0.000, blue: 0.012, opacity: 1.000)
    public static let colorSemanticBackgroundSecondary = Color(red: 0.004, green: 0.004, blue: 0.012, opacity: 1.000)
    public static let colorSemanticBackgroundAccent = Color(red: 1.000, green: 0.690, blue: 0.000, opacity: 1.000)
    public static let colorSemanticBorderDefault = Color(red: 0.722, green: 0.486, blue: 0.102, opacity: 1.000)
    public static let colorSemanticBorderFocus = Color(red: 0.898, green: 0.725, blue: 0.212, opacity: 1.000)
    public static let colorSemanticBorderHover = Color(red: 0.729, green: 0.510, blue: 0.145, opacity: 1.000)
    public static let colorSemanticBorderDisabled = Color(red: 0.004, green: 0.004, blue: 0.012, opacity: 1.000)
    public static let colorSemanticLinkDefault = Color(red: 0.831, green: 0.627, blue: 0.188, opacity: 1.000)
    public static let colorSemanticLinkHover = Color(red: 0.729, green: 0.510, blue: 0.145, opacity: 1.000)
    public static let colorSemanticLinkActive = Color(red: 0.333, green: 0.176, blue: 0.039, opacity: 1.000)
    public static let colorSemanticLinkVisited = Color(red: 0.443, green: 0.243, blue: 0.051, opacity: 1.000)
    public static let colorSemanticStatusSuccess = Color(red: 0.796, green: 0.584, blue: 0.161, opacity: 1.000)
    public static let colorSemanticStatusWarning = Color(red: 0.898, green: 0.725, blue: 0.212, opacity: 1.000)
    public static let colorSemanticStatusError = Color(red: 0.863, green: 0.663, blue: 0.204, opacity: 1.000)
    public static let colorSemanticStatusInfo = Color(red: 0.831, green: 0.627, blue: 0.188, opacity: 1.000)
    /// Warm dark blue for info alerts
    public static let colorSemanticAlertInfo = Color(red: 0.122, green: 0.133, blue: 0.157, opacity: 1.000)
    /// Warm dark green for success alerts
    public static let colorSemanticAlertSuccess = Color(red: 0.071, green: 0.125, blue: 0.063, opacity: 1.000)
    /// Dark amber for warning alerts
    public static let colorSemanticAlertWarning = Color(red: 0.208, green: 0.157, blue: 0.000, opacity: 1.000)
    /// Warm dark red for error alerts
    public static let colorSemanticAlertError = Color(red: 0.263, green: 0.020, blue: 0.000, opacity: 1.000)
    /// Focus ring color (accent)
    public static let focusRingColor = Color(red: 0.898, green: 0.725, blue: 0.212, opacity: 1.000)
    /// Modal/dialog backdrop overlay (amber-warm)
    public static let effectsOverlay = Color(red: 0.031, green: 0.020, blue: 0.000, opacity: 0.800)
    /// CRT scanline light band
    public static let effectsScanlineLight = Color(red: 1.000, green: 0.690, blue: 0.000, opacity: 0.051)
    /// CRT scanline dark band
    public static let effectsScanlineDark = Color(red: 1.000, green: 0.690, blue: 0.000, opacity: 0.020)
    /// Inner screen glow vignette
    public static let effectsVignetteGlow = Color(red: 1.000, green: 0.690, blue: 0.000, opacity: 0.122)
    /// Vignette edge darkening (amber-warm)
    public static let effectsVignetteEdge = Color(red: 0.031, green: 0.020, blue: 0.000, opacity: 0.302)
    /// Vignette corner darkening (amber-warm)
    public static let effectsVignetteCorner = Color(red: 0.031, green: 0.020, blue: 0.000, opacity: 0.502)
    /// Subtle amber screen tint
    public static let effectsScreenTint = Color(red: 1.000, green: 0.690, blue: 0.000, opacity: 0.102)
    /// Terminal window drop shadow (amber-warm)
    public static let effectsDropShadow = Color(red: 0.031, green: 0.020, blue: 0.000, opacity: 0.502)
    /// Phosphor bloom/bleeding glow for CRT effects
    public static let effectsPhosphorGlow = Color(red: 1.000, green: 0.690, blue: 0.000, opacity: 0.122)
    /// Outer phosphor bloom layer (faint glow)
    public static let effectsBloomOuter = Color(red: 1.000, green: 0.690, blue: 0.000, opacity: 0.051)
    /// Center phosphor bloom highlight
    public static let effectsBloomCenter = Color(red: 1.000, green: 0.690, blue: 0.000, opacity: 0.031)
    /// Dark warm-black for CRT screen (not pure black)
    public static let effectsCrtBackground = Color(red: 0.024, green: 0.012, blue: 0.000, opacity: 1.000)
}

// MARK: - Spacing

public enum EiDotterSpacing {
    public static let sp1: CGFloat = 4
    public static let sp2: CGFloat = 8
    public static let sp3: CGFloat = 12
    public static let sp4: CGFloat = 16
    public static let sp5: CGFloat = 20
    public static let sp6: CGFloat = 24
    public static let sp8: CGFloat = 32
    public static let sp10: CGFloat = 40
    public static let sp12: CGFloat = 48
    public static let sp16: CGFloat = 64
}

// MARK: - Typography

public enum EiDotterTypography {
    public static let fontSizeTextXs: CGFloat = 18
    public static let fontSizeTextSm: CGFloat = 20
    public static let fontSizeTextMd: CGFloat = 22
    public static let fontSizeTextLg: CGFloat = 24
    public static let fontSizeTextXl: CGFloat = 26
    public static let fontSizeDisplayXs: CGFloat = 30
    public static let fontSizeDisplaySm: CGFloat = 36
    public static let fontSizeDisplayMd: CGFloat = 42
    public static let fontSizeDisplayLg: CGFloat = 56
    public static let fontSizeDisplayXl: CGFloat = 66
    public static let fontSizeDisplay2xl: CGFloat = 78
}

// MARK: - Effects (Tier 4 shared core)

public enum EiDotterEffects {
    /// Overall phosphor brightness multiplier (0–1). Web: --retro-intensity CSS var; Apple: SwiftUI colorEffect shader uniform / Metal float.
    public static let phosphorIntensity: Double = 1
    /// How long a glow lingers after change (50–800ms). Web: animation duration on glow fade; Apple: SwiftUI .easeOut animation duration or SKShader trailing uniform. Phase 0i Niels-derived (time-based segmentation).
    public static let phosphorPersistence: TimeInterval = 0.200
    /// Tight phosphor glow around lit pixels (8–120px). Web: box-shadow inset blur; Apple: SwiftUI .shadow(radius:) or CIBloom input radius. Note: Apple/web don't use identical units — see Phase 0i unit-conversion note.
    public static let phosphorGlowRadius: CGFloat = 40
    /// Soft phosphor halation extending outward (20–200px). Web: outer box-shadow inset blur; Apple: CIBloom larger pass.
    public static let phosphorBloomRadius: CGFloat = 80
    /// Phosphor halation visibility (0–1). Web: bloom layer opacity; Apple: CIBloom input intensity.
    public static let phosphorBloomIntensity: Double = 0.5
    /// Slight defocus from imperfect electron beam convergence (0–4px). Default 0 = perfectly focused. Phase 0i Niels-derived (oscilloscope FOCUS knob). Web: backdrop filter blur; Apple: CIGaussianBlur input radius.
    public static let phosphorFocusBlur: CGFloat = 0
    /// Scanline visibility (0–1). Web: scanline overlay opacity; Apple: SwiftUI shader UV-based dark-stripe modulation.
    public static let scanlineIntensity: Double = 0.6
    /// Distance between scanlines (2–8px). Web: gradient repeat distance; Apple: shader UV period.
    public static let scanlineLinePitch: CGFloat = 4
    /// Scanline drift cycle (2000–30000ms; 0 to disable). Web: animation duration; Apple: shader time-uniform multiplier.
    public static let scanlineScrollPeriod: TimeInterval = 9.000
    /// Flicker visibility (0–0.1). Web: flicker layer opacity; Apple: shader sine-wave modulation amplitude.
    public static let flickerIntensity: Double = 0.04
    /// Flicker cycle (333–1000ms; >=333ms = 3Hz max for WCAG 2.3.1). Hard floor at 333ms enforced by build-time transform. Web: animation duration; Apple: time-uniform period.
    public static let flickerPeriod: TimeInterval = 0.500
    /// Vignette visibility (0–1). Web: glow layer opacity; Apple: shader corner-darkening modulation.
    public static let vignetteIntensity: Double = 1
    /// Vignette spread as fraction of viewport (0–0.5). Web: gradient stop position (50% = ratio of inner safe area); Apple: shader UV-distance threshold.
    public static let vignetteSpread: Double = 0.2
}

