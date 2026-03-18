//
// Extensions.swift
// Convenience extensions for eiDotter token usage in SwiftUI
//

import SwiftUI

public extension View {
    /// Apply the eiDotter DOS background
    func dosBackground() -> some View {
        self.background(EiDotterColors.colorCgaBlack)
    }

    /// Apply phosphor glow as a shadow
    func phosphorGlow(color: Color = EiDotterColors.colorCgaAmber, radius: CGFloat = 4) -> some View {
        self.shadow(color: color.opacity(0.6), radius: radius)
    }
}

public extension Font {
    /// eiDotter primary monospace font at a given size
    static func dos(size: CGFloat) -> Font {
        .custom("JetBrains Mono", size: size)
    }
}

public extension ShapeStyle where Self == Color {
    /// CGA amber — the primary text/accent color
    static var cgaAmber: Color { EiDotterColors.colorCgaAmber }

    /// CGA black — the primary background color
    static var cgaBlack: Color { EiDotterColors.colorCgaBlack }
}
