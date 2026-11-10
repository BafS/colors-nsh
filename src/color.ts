export const LIGHT_TEXT = "#FFFFFF";
export const DARK_TEXT = "#111111";

function channel(hex: string, offset: number): number {
  const c = parseInt(hex.slice(offset, offset + 2), 16) / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

/** WCAG relative luminance of `#RRGGBB`, 0 (black) to 1 (white). */
export function luminance(hex: string): number {
  return 0.2126 * channel(hex, 1) + 0.7152 * channel(hex, 3) + 0.0722 * channel(hex, 5);
}

function contrast(a: number, b: number): number {
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

/** The text color, light or dark, with the higher WCAG contrast on `background`. */
export function textColorOn(background: string): string {
  const l = luminance(background);
  return contrast(l, luminance(LIGHT_TEXT)) >= contrast(l, luminance(DARK_TEXT)) ? LIGHT_TEXT : DARK_TEXT;
}

/** "light-blue" → "Light blue". */
export function hueTitle(hue: string): string {
  const words = hue.replaceAll("-", " ");
  return words.charAt(0).toUpperCase() + words.slice(1);
}
