//
// AppleIOS.swift
// AUTO-GENERATED — Do not edit manually
//
// Generated from: figma-snapshots/ios.json
// Run: npm run sync-figma-to-swift
//
// Source-of-truth lives in the eiDotter iOS DS Figma file. Edit there;
// re-snapshot via the figma-console MCP bridge plugin in a Claude session;
// re-run this script to regenerate.
//
// Stats: 57 aliased to Foundation, 27 literal RGBA, 0 skipped.
//

import SwiftUI

// MARK: - iOS Apple HIG (Tier 2)

public extension EiDotterColors {
    enum AppleIOS {

        // MARK: Colors
        public static let labelsSecondary = Color(red: 0.235, green: 0.235, blue: 0.263, opacity: 0.600)  // Figma: Labels/Secondary (literal)
        public static let accentsBlue = EiDotterColors.colorCgaBlue  // Figma: Accents/Blue
        public static let labelsPrimary = EiDotterColors.colorCgaAmber  // Figma: Labels/Primary
        public static let backgroundsPrimary = EiDotterColors.colorCgaBlack  // Figma: Backgrounds/Primary
        public static let fillsPrimary = Color(red: 0.471, green: 0.471, blue: 0.471, opacity: 0.200)  // Figma: Fills/Primary (literal)
        public static let separatorsOpaque = EiDotterColors.colorCgaDarkGray  // Figma: Separators/Opaque
        public static let labelsTertiary = Color(red: 0.235, green: 0.235, blue: 0.263, opacity: 0.300)  // Figma: Labels/Tertiary (literal)
        public static let labelsQuaternary = Color(red: 0.235, green: 0.235, blue: 0.263, opacity: 0.180)  // Figma: Labels/Quaternary (literal)
        public static let backgroundsTertiary = EiDotterColors.colorCgaDarkGray  // Figma: Backgrounds/Tertiary
        public static let backgroundsSecondary = EiDotterColors.colorCgaDarkGray  // Figma: Backgrounds/Secondary
        public static let backgroundsGroupedPrimary = EiDotterColors.colorCgaBlack  // Figma: Backgrounds (Grouped)/Primary
        public static let backgroundsGroupedSecondary = EiDotterColors.colorCgaDarkGray  // Figma: Backgrounds (Grouped)/Secondary
        public static let backgroundsGroupedTertiary = EiDotterColors.colorCgaDarkGray  // Figma: Backgrounds (Grouped)/Tertiary
        public static let accentsRed = EiDotterColors.colorCgaRed  // Figma: Accents/Red
        public static let accentsOrange = EiDotterColors.colorCgaRed  // Figma: Accents/Orange
        public static let accentsYellow = EiDotterColors.colorCgaYellow  // Figma: Accents/Yellow
        public static let accentsGreen = EiDotterColors.colorCgaGreen  // Figma: Accents/Green
        public static let accentsMint = EiDotterColors.colorCgaGreen  // Figma: Accents/Mint
        public static let accentsTeal = EiDotterColors.colorCgaCyan  // Figma: Accents/Teal
        public static let accentsCyan = EiDotterColors.colorCgaCyan  // Figma: Accents/Cyan
        public static let accentsBrown = EiDotterColors.colorCgaBrown  // Figma: Accents/Brown
        public static let accentsIndigo = EiDotterColors.colorCgaBlue  // Figma: Accents/Indigo
        public static let accentsPurple = EiDotterColors.colorCgaMagenta  // Figma: Accents/Purple
        public static let accentsPink = EiDotterColors.colorCgaMagenta  // Figma: Accents/Pink
        public static let graysBlack = EiDotterColors.colorCgaBlack  // Figma: Grays/Black
        public static let graysWhite = EiDotterColors.colorCgaWhite  // Figma: Grays/White
        public static let graysGray = EiDotterColors.colorCgaDarkGray  // Figma: Grays/Gray
        public static let graysGray2 = EiDotterColors.colorCgaDarkGray  // Figma: Grays/Gray 2
        public static let graysGray3 = EiDotterColors.colorCgaDarkGray  // Figma: Grays/Gray 3
        public static let graysGray4 = EiDotterColors.colorCgaDarkGray  // Figma: Grays/Gray 4
        public static let graysGray5 = EiDotterColors.colorCgaDarkGray  // Figma: Grays/Gray 5
        public static let graysGray6 = EiDotterColors.colorCgaBlack  // Figma: Grays/Gray 6
        public static let fillsSecondary = Color(red: 0.471, green: 0.471, blue: 0.502, opacity: 0.160)  // Figma: Fills/Secondary (literal)
        public static let fillsQuaternary = Color(red: 0.455, green: 0.455, blue: 0.502, opacity: 0.080)  // Figma: Fills/Quaternary (literal)
        public static let fillsTertiary = Color(red: 0.463, green: 0.463, blue: 0.502, opacity: 0.120)  // Figma: Fills/Tertiary (literal)
        public static let separatorsNonOpaque = Color(red: 0.000, green: 0.000, blue: 0.000, opacity: 0.120)  // Figma: Separators/Non-opaque (literal)
        public static let overlaysDefault = Color(red: 0.000, green: 0.000, blue: 0.000, opacity: 0.200)  // Figma: Overlays/Default (literal)
        public static let miscellaneousTabUnselected = EiDotterColors.colorCgaDarkGray  // Figma: Miscellaneous/Tab - Unselected
        public static let miscellaneousTextFieldBG = EiDotterColors.colorCgaDarkGray  // Figma: Miscellaneous/Text Field/BG
        public static let miscellaneousTextFieldOutline = Color(red: 0.235, green: 0.235, blue: 0.263, opacity: 0.290)  // Figma: Miscellaneous/Text Field/Outline (literal)
        public static let miscellaneousKeyboardsEmojiMic = Color(red: 0.133, green: 0.169, blue: 0.349, opacity: 0.630)  // Figma: Miscellaneous/Keyboards/Emoji + Mic (literal)
        public static let overlaysActivityViewController = Color(red: 0.000, green: 0.000, blue: 0.000, opacity: 0.200)  // Figma: Overlays/Activity View Controller (literal)
        public static let miscellaneousSidebarFillSelected = EiDotterColors.colorCgaAmber  // Figma: Miscellaneous/Sidebar/Fill - Selected
        public static let miscellaneousSidebarTextSelected = EiDotterColors.colorCgaBlack  // Figma: Miscellaneous/Sidebar/Text - Selected
        public static let miscellaneousSidebarShadowDragOver = Color(red: 0.000, green: 0.000, blue: 0.000, opacity: 0.200)  // Figma: Miscellaneous/Sidebar/Shadow - Drag Over (literal)
        public static let miscellaneousAlertOverlay = Color(red: 0.161, green: 0.161, blue: 0.227, opacity: 0.230)  // Figma: Miscellaneous/Alert - Overlay (literal)
        public static let separatorsVibrant = EiDotterColors.colorCgaDarkGray  // Figma: Separators/Vibrant
        public static let miscellaneousButtonsLabelDestructiveDisabled = Color(red: 1.000, green: 0.220, blue: 0.235, opacity: 0.500)  // Figma: Miscellaneous/Buttons/Label - Destructive - Disabled (literal)
        public static let miscellaneousButtonsBGDestructiveProminent = Color(red: 1.000, green: 0.220, blue: 0.235, opacity: 0.200)  // Figma: Miscellaneous/Buttons/BG - Destructive - Prominent (literal)
        public static let miscellaneousButtonsBGDestructive = Color(red: 1.000, green: 0.220, blue: 0.235, opacity: 0.140)  // Figma: Miscellaneous/Buttons/BG - Destructive (literal)
        public static let labelsVibrantPrimary = EiDotterColors.colorCgaAmber  // Figma: Labels - Vibrant/Primary
        public static let labelsVibrantSecondary = EiDotterColors.colorCgaLightGray  // Figma: Labels - Vibrant/Secondary
        public static let labelsVibrantTertiary = EiDotterColors.colorCgaDarkGray  // Figma: Labels - Vibrant/Tertiary
        public static let fillsVibrantPrimary = EiDotterColors.colorCgaDarkGray  // Figma: Fills - Vibrant/Primary
        public static let fillsVibrantSecondary = EiDotterColors.colorCgaDarkGray  // Figma: Fills - Vibrant/Secondary
        public static let fillsVibrantTertiary = EiDotterColors.colorCgaBlack  // Figma: Fills - Vibrant/Tertiary
        public static let labelsVibrantQuaternary = Color(red: 0.851, green: 0.851, blue: 0.851, opacity: 1.000)  // Figma: Labels - Vibrant/Quaternary (literal)
        public static let miscellaneousKeyboardsGlyphsPrimary = EiDotterColors.colorCgaLightGray  // Figma: Miscellaneous/Keyboards/Glyphs - Primary
        public static let miscellaneousKeyboardsKeys = EiDotterColors.colorCgaDarkGray  // Figma: Miscellaneous/Keyboards/Keys
        public static let miscellaneousKeyboardsGlyphsSecondary = EiDotterColors.colorCgaDarkGray  // Figma: Miscellaneous/Keyboards/Glyphs - Secondary
        public static let miscellaneousWindowGrabber = EiDotterColors.colorCgaAmber  // Figma: Miscellaneous/Window Grabber
        public static let miscellaneousSegmentedControlSelectedFill = EiDotterColors.colorCgaDarkGray  // Figma: Miscellaneous/Segmented Control - Selected Fill
        public static let backgroundsPrimaryElevated = EiDotterColors.colorCgaDarkGray  // Figma: Backgrounds/Primary - Elevated
        public static let backgroundsSecondaryElevated = EiDotterColors.colorCgaDarkGray  // Figma: Backgrounds/Secondary - Elevated
        public static let backgroundsTertiaryElevated = EiDotterColors.colorCgaLightGray  // Figma: Backgrounds/Tertiary - Elevated
        public static let backgroundsGroupedPrimaryElevated = EiDotterColors.colorCgaDarkGray  // Figma: Backgrounds (Grouped)/Primary - Elevated
        public static let backgroundsGroupedSecondaryElevated = EiDotterColors.colorCgaDarkGray  // Figma: Backgrounds (Grouped)/Secondary - Elevated
        public static let backgroundsGroupedTertiaryElevated = EiDotterColors.colorCgaLightGray  // Figma: Backgrounds (Grouped)/Tertiary - Elevated
        public static let labelsVibrantControlsTertiary = Color(red: 0.851, green: 0.851, blue: 0.851, opacity: 1.000)  // Figma: Labels - Vibrant - Controls/Tertiary (literal)
        public static let labelsVibrantControlsSecondary = EiDotterColors.colorCgaLightGray  // Figma: Labels - Vibrant - Controls/Secondary
        public static let labelsVibrantControlsPrimary = EiDotterColors.colorCgaAmber  // Figma: Labels - Vibrant - Controls/Primary
        public static let miscellaneousTabBarSelection = EiDotterColors.colorCgaAmber  // Figma: Miscellaneous/Tab Bar Selection
        public static let miscellaneousWindowControlsClose = EiDotterColors.colorCgaRed  // Figma: Miscellaneous/Window Controls/Close
        public static let miscellaneousWindowControlsMinimize = EiDotterColors.colorCgaAmber  // Figma: Miscellaneous/Window Controls/Minimize
        public static let miscellaneousWindowControlsMaximize = EiDotterColors.colorCgaGreen  // Figma: Miscellaneous/Window Controls/Maximize
        public static let miscellaneousWindowControlsButtonInactive = Color(red: 0.235, green: 0.235, blue: 0.263, opacity: 0.600)  // Figma: Miscellaneous/Window Controls/Button - Inactive (literal)
        public static let miscellaneousWindowControlsBGInactive = Color(red: 0.000, green: 0.000, blue: 0.000, opacity: 0.050)  // Figma: Miscellaneous/Window Controls/BG - Inactive (literal)
        public static let miscellaneousToggleAXLabelOff = Color(red: 0.702, green: 0.702, blue: 0.702, opacity: 1.000)  // Figma: Miscellaneous/Toggle/AX Label - Off (literal)

        // MARK: Kit
        public static let componentFill = Color(red: 0.961, green: 0.961, blue: 0.961, opacity: 1.000)  // Figma: Component Fill (literal)
        public static let componentStroke = EiDotterColors.colorCgaBlue  // Figma: Component Stroke (via Component Stroke)
        public static let subcomponentStroke = Color(red: 0.000, green: 0.000, blue: 0.000, opacity: 0.400)  // Figma: Subcomponent Stroke (literal)
        public static let subcomponentFill = Color(red: 0.667, green: 0.667, blue: 0.667, opacity: 1.000)  // Figma: Subcomponent Fill (literal)
        public static let sectionFill = Color(red: 0.961, green: 0.961, blue: 0.961, opacity: 1.000)  // Figma: Section Fill (literal)
        public static let sectionStroke = Color(red: 0.000, green: 0.000, blue: 0.000, opacity: 0.400)  // Figma: Section Stroke (literal)
    }
}
