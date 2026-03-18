//
// DOSButton.swift
// eiDotter SwiftUI — primary variant proof-of-concept
//

import SwiftUI
import EiDotterTokens

public struct DOSButton: View {
    let title: String
    let action: () -> Void

    public init(_ title: String, action: @escaping () -> Void) {
        self.title = title
        self.action = action
    }

    public var body: some View {
        Button(action: action) {
            Text(title)
                .font(.dos(size: EiDotterTypography.fontSizeSm))
                .foregroundStyle(EiDotterColors.colorCgaBlack)
                .padding(.horizontal, EiDotterSpacing.sp4)
                .padding(.vertical, EiDotterSpacing.sp2)
                .frame(minHeight: EiDotterSpacing.sp8) // 32pt — matches medium size
                .background(EiDotterColors.colorCgaAmber)
                .clipShape(RoundedRectangle(cornerRadius: EiDotterSpacing.sp1)) // 4pt — matches rounded-dos-base
        }
        .buttonStyle(.plain)
    }
}

#Preview {
    VStack(spacing: 16) {
        DOSButton("RUN PROGRAM") {}
        DOSButton("CANCEL") {}
    }
    .padding()
    .dosBackground()
}
