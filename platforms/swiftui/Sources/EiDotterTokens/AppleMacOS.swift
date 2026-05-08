//
// AppleMacOS.swift
// AUTO-GENERATED — Do not edit manually
//
// Generated from: figma-snapshots/macos.json
// Run: npm run sync-figma-to-swift
//
// Source-of-truth lives in the eiDotter macOS DS Figma file. Edit there;
// re-snapshot via the figma-console MCP bridge plugin in a Claude session;
// re-run this script to regenerate.
//
// Stats: 44 aliased to Foundation, 23 literal RGBA, 0 skipped.
//

import SwiftUI

// MARK: - macOS Apple HIG (Tier 2)

public extension EiDotterColors {
    enum AppleMacOS {

        // MARK: Appearance
        public static let accentsRed = EiDotterColors.colorCgaRed  // Figma: Accents/Red
        public static let accentsOrange = EiDotterColors.colorCgaRed  // Figma: Accents/Orange
        public static let accentsYellow = EiDotterColors.colorCgaYellow  // Figma: Accents/Yellow
        public static let accentsGreen = EiDotterColors.colorCgaGreen  // Figma: Accents/Green
        public static let accentsMint = EiDotterColors.colorCgaGreen  // Figma: Accents/Mint
        public static let accentsTeal = EiDotterColors.colorCgaCyan  // Figma: Accents/Teal
        public static let accentsCyan = EiDotterColors.colorCgaCyan  // Figma: Accents/Cyan
        public static let accentsBlue = EiDotterColors.colorCgaBlue  // Figma: Accents/Blue
        public static let accentsIndigo = EiDotterColors.colorCgaBlue  // Figma: Accents/Indigo
        public static let accentsPurple = EiDotterColors.colorCgaMagenta  // Figma: Accents/Purple
        public static let accentsPink = EiDotterColors.colorCgaMagenta  // Figma: Accents/Pink
        public static let accentsBrown = EiDotterColors.colorCgaBrown  // Figma: Accents/Brown
        public static let fillsOpaquePrimary = Color(red: 0.000, green: 0.000, blue: 0.000, opacity: 0.100)  // Figma: Fills - Opaque/Primary (literal)
        public static let fillsOpaqueSecondary = Color(red: 0.000, green: 0.000, blue: 0.000, opacity: 0.080)  // Figma: Fills - Opaque/Secondary (literal)
        public static let fillsOpaqueTertiary = Color(red: 0.000, green: 0.000, blue: 0.000, opacity: 0.050)  // Figma: Fills - Opaque/Tertiary (literal)
        public static let fillsOpaqueQuaternary = Color(red: 0.000, green: 0.000, blue: 0.000, opacity: 0.030)  // Figma: Fills - Opaque/Quaternary (literal)
        public static let fillsOpaqueQuinary = Color(red: 0.000, green: 0.000, blue: 0.000, opacity: 0.020)  // Figma: Fills - Opaque/Quinary (literal)
        public static let fillsVibrantPrimary = EiDotterColors.colorCgaDarkGray  // Figma: Fills - Vibrant (Use Plus Lighter | Darker)/Primary
        public static let fillsVibrantSecondary = EiDotterColors.colorCgaDarkGray  // Figma: Fills - Vibrant (Use Plus Lighter | Darker)/Secondary
        public static let fillsVibrantTertiary = EiDotterColors.colorCgaBlack  // Figma: Fills - Vibrant (Use Plus Lighter | Darker)/Tertiary
        public static let fillsVibrantQuaternary = EiDotterColors.colorCgaBlack  // Figma: Fills - Vibrant (Use Plus Lighter | Darker)/Quaternary
        public static let fillsVibrantQuinary = EiDotterColors.colorCgaBlack  // Figma: Fills - Vibrant (Use Plus Lighter | Darker)/Quinary
        public static let labelsPrimary = Color(red: 0.000, green: 0.000, blue: 0.000, opacity: 0.850)  // Figma: Labels/Primary (literal)
        public static let labelsSecondary = Color(red: 0.000, green: 0.000, blue: 0.000, opacity: 0.500)  // Figma: Labels/Secondary (literal)
        public static let labelsTertiary = Color(red: 0.000, green: 0.000, blue: 0.000, opacity: 0.250)  // Figma: Labels/Tertiary (literal)
        public static let labelsQuaternary = Color(red: 0.000, green: 0.000, blue: 0.000, opacity: 0.100)  // Figma: Labels/Quaternary (literal)
        public static let labelsQuinary = Color(red: 0.000, green: 0.000, blue: 0.000, opacity: 0.050)  // Figma: Labels/Quinary (literal)
        public static let labelsWhite = EiDotterColors.colorCgaWhite  // Figma: Labels/White
        public static let labelsVibrantPrimary = EiDotterColors.colorCgaAmber  // Figma: Labels - Vibrant (Use Plus Lighter | Darker)/Primary
        public static let labelsVibrantSecondary = EiDotterColors.colorCgaLightGray  // Figma: Labels - Vibrant (Use Plus Lighter | Darker)/Secondary
        public static let labelsVibrantTertiary = EiDotterColors.colorCgaDarkGray  // Figma: Labels - Vibrant (Use Plus Lighter | Darker)/Tertiary
        public static let labelsVibrantQuaternary = EiDotterColors.colorCgaDarkGray  // Figma: Labels - Vibrant (Use Plus Lighter | Darker)/Quaternary
        public static let labelsVibrantQuinary = EiDotterColors.colorCgaDarkGray  // Figma: Labels - Vibrant (Use Plus Lighter | Darker)/Quinary
        public static let materialUltraThick = Color(red: 0.965, green: 0.965, blue: 0.965, opacity: 0.840)  // Figma: Material/Ultra Thick (literal)
        public static let materialThick = Color(red: 0.965, green: 0.965, blue: 0.965, opacity: 0.720)  // Figma: Material/Thick (literal)
        public static let materialMedium = Color(red: 0.965, green: 0.965, blue: 0.965, opacity: 0.600)  // Figma: Material/Medium (literal)
        public static let materialThin = Color(red: 0.965, green: 0.965, blue: 0.965, opacity: 0.480)  // Figma: Material/Thin (literal)
        public static let materialUltraThin = Color(red: 0.965, green: 0.965, blue: 0.965, opacity: 0.360)  // Figma: Material/Ultra Thin (literal)
        public static let graysBlack = EiDotterColors.colorCgaBlack  // Figma: Grays/Black
        public static let graysWhite = EiDotterColors.colorCgaWhite  // Figma: Grays/White
        public static let labelsSeximal = Color(red: 0.000, green: 0.000, blue: 0.000, opacity: 0.030)  // Figma: Labels/Seximal (literal)
        public static let graysGray = EiDotterColors.colorCgaDarkGray  // Figma: Grays/Gray
        public static let glyphsNeutralIdle = EiDotterColors.colorCgaLightGray  // Figma: Glyphs/Neutral - Idle
        public static let glyphsNeutralDisabled = EiDotterColors.colorCgaDarkGray  // Figma: Glyphs/Neutral - Disabled
        public static let glyphsPrimaryIdle = EiDotterColors.colorCgaAmber  // Figma: Glyphs/Primary - Idle
        public static let glyphsPrimaryDisabeld = Color(red: 1.000, green: 1.000, blue: 1.000, opacity: 0.500)  // Figma: Glyphs/Primary - Disabeld (literal)
        public static let accentsVibrantRed = EiDotterColors.colorCgaRed  // Figma: Accents - Vibrant/Red
        public static let accentsVibrantOrange = EiDotterColors.colorCgaRed  // Figma: Accents - Vibrant/Orange
        public static let accentsVibrantYellow = EiDotterColors.colorCgaYellow  // Figma: Accents - Vibrant/Yellow
        public static let accentsVibrantGreen = EiDotterColors.colorCgaGreen  // Figma: Accents - Vibrant/Green
        public static let accentsVibrantMint = EiDotterColors.colorCgaGreen  // Figma: Accents - Vibrant/Mint
        public static let accentsVibrantTeal = EiDotterColors.colorCgaCyan  // Figma: Accents - Vibrant/Teal
        public static let accentsVibrantCyan = EiDotterColors.colorCgaCyan  // Figma: Accents - Vibrant/Cyan
        public static let accentsVibrantBlue = EiDotterColors.colorCgaBlue  // Figma: Accents - Vibrant/Blue
        public static let accentsVibrantIndigo = EiDotterColors.colorCgaBlue  // Figma: Accents - Vibrant/Indigo
        public static let accentsVibrantPurple = EiDotterColors.colorCgaMagenta  // Figma: Accents - Vibrant/Purple
        public static let accentsVibrantPink = EiDotterColors.colorCgaMagenta  // Figma: Accents - Vibrant/Pink
        public static let accentsVibrantBrown = EiDotterColors.colorCgaBrown  // Figma: Accents - Vibrant/Brown
        public static let separatorVibrant = Color(red: 0.235, green: 0.235, blue: 0.263, opacity: 0.290)  // Figma: Separator/Vibrant (literal)
        public static let controlsTint = EiDotterColors.colorCgaAmber  // Figma: Controls/Tint
        public static let controlsDestructiveRed = EiDotterColors.colorCgaRed  // Figma: Controls/Destructive Red

        // MARK: Kit
        public static let componentFill = Color(red: 0.961, green: 0.961, blue: 0.961, opacity: 1.000)  // Figma: Component Fill (literal)
        public static let componentStroke = EiDotterColors.colorCgaBlue  // Figma: Component Stroke (via Component Stroke)
        public static let subcomponentFill = Color(red: 0.667, green: 0.667, blue: 0.667, opacity: 1.000)  // Figma: Subcomponent Fill (literal)
        public static let subcomponentStroke = Color(red: 0.000, green: 0.000, blue: 0.000, opacity: 0.400)  // Figma: Subcomponent Stroke (literal)
        public static let sectionFill = Color(red: 0.961, green: 0.961, blue: 0.961, opacity: 1.000)  // Figma: Section Fill (literal)
        public static let sectionStroke = Color(red: 0.000, green: 0.000, blue: 0.000, opacity: 0.400)  // Figma: Section Stroke (literal)
    }
}
