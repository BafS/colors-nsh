import { elementary } from "./elementary";
import { material } from "./material";
import { tailwind } from "./tailwind";
import type { Palette, Shades } from "./types";

export type { Palette, Shades } from "./types";

export const palettes = { material, tailwind, elementary } satisfies Record<string, Palette>;

export type PaletteId = keyof typeof palettes;

export const DEFAULT_PALETTE: PaletteId = "material";

export const paletteIds = Object.keys(palettes) as PaletteId[];

export function isPaletteId(value: unknown): value is PaletteId {
  return typeof value === "string" && Object.hasOwn(palettes, value);
}

/** `hue` when `palette` has it, else the palette's first hue. */
export function resolveHue(palette: Palette, hue: string | null): string {
  if (hue !== null && Object.hasOwn(palette.hues, hue)) return hue;
  return Object.keys(palette.hues)[0];
}

/** The shade that stands for the hue in the hue rail. */
export function baseShade(shades: Shades): string {
  return shades["500"] ?? Object.values(shades)[0];
}
