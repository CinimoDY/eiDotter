// swift-tools-version: 5.9

import PackageDescription

let package = Package(
    name: "EiDotter",
    platforms: [
        .iOS(.v17),
        .macOS(.v14),
        .tvOS(.v17),
    ],
    products: [
        .library(name: "EiDotterTokens", targets: ["EiDotterTokens"]),
        .library(name: "EiDotterUI", targets: ["EiDotterUI"]),
    ],
    targets: [
        .target(
            name: "EiDotterTokens",
            path: "Sources/EiDotterTokens"
        ),
        .target(
            name: "EiDotterUI",
            dependencies: ["EiDotterTokens"],
            path: "Sources/EiDotterUI"
        ),
    ]
)
