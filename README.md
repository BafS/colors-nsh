# Material Colors

Pick a Material or Elementary color and click it to copy its hex code.

A port of [Material-Colors-native](https://github.com/BafS/Material-Colors-native) (React Native macOS) to
[Native Shell](https://nsh.dev/): one TSX app that runs natively on macOS, and from the same code on Windows, Linux,
iOS, Android and the web. Heavily inspired by [MaterialColorsApp](https://github.com/romannurik/MaterialColorsApp).

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
nsh package --target macos   # .nsh/out/Material Colors.app (ad-hoc signed)
nsh package --target web     # .nsh/out/Material Colors/, a static site
```

## Layout

| Path | Role |
|---|---|
| `App.tsx` | Window setup, palette/hue state, saved palette (`Storage` key `palette`) |
| `src/Header.tsx` | Draggable title bar: hue title and palette `Select` |
| `src/HueRail.tsx` | Hue circles |
| `src/Swatches.tsx` | Shade rows: press to copy, entrance motion, scrolls when the window is too short |
| `src/color.ts` | WCAG text contrast, hue titles |
| `src/palettes/` | Palette data (Material: Apache-2.0, Google; Tailwind: MIT, Tailwind Labs) |
