# Colors

A handy app for copying colors from your favourite palette: click a swatch to copy its hex, right-click for rgb, hsl
or oklch.

<p align="center"><img src="https://i.imgur.com/cxLGvC0.png" alt="Colors screenshot" width="320"></p>

A port of [Material-Colors-native](https://github.com/BafS/Material-Colors-native) (React Native macOS) to
[Native Shell](https://nsh.dev/): one TSX app that runs natively on macOS, and from the same code on Windows, Linux,
iOS, Android and the web. Heavily inspired by [MaterialColorsApp](https://github.com/romannurik/MaterialColorsApp).

Palettes: Material, Tailwind, Elementary, IBM, GitHub Primer, Radix, Atlassian and Nord.

## Develop

Install the `nsh` CLI (`curl -fsSL https://nsh.dev/install.sh | sh`), then:

```sh
nsh run            # macOS window, hot reload on save
nsh check          # type check
nsh test           # headless tests
nsh test --target macos   # the same tests in a real macOS window
```

## Package

```sh
nsh package --target macos   # .nsh/out/Colors.app (ad-hoc signed)
nsh package --target web     # .nsh/out/Colors/, a static site
```

## Palette licenses

Material: Apache-2.0, Google; Tailwind: MIT, Tailwind Labs; IBM: Apache-2.0, IBM Carbon; Primer: MIT, GitHub;
Radix: MIT, WorkOS; Atlassian: Apache-2.0, Atlassian; Nord: MIT, Arctic Ice Studio; Elementary:
[elementary brand colors](https://elementary.io/brand#color).
