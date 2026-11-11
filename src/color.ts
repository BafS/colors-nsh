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

export const COPY_FORMATS = ["hex", "rgb", "hsl", "oklch"] as const;
export type CopyFormat = (typeof COPY_FORMATS)[number];

export function isCopyFormat(value: unknown): value is CopyFormat {
  return COPY_FORMATS.includes(value as CopyFormat);
}

const round = (n: number, digits = 0) => {
  const r = Number(n.toFixed(digits));
  return Object.is(r, -0) ? 0 : r;
};

/** `#RRGGBB` written as CSS in `format`: `rgb(33 150 243)`, `hsl(207 90% 54%)`, `oklch(64.7% 0.157 251)`. */
export function formatColor(hex: string, format: CopyFormat): string {
  if (format === "hex") return hex;
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  if (format === "rgb") return `rgb(${r} ${g} ${b})`;
  if (format === "hsl") {
    const [rn, gn, bn] = [r / 255, g / 255, b / 255];
    const max = Math.max(rn, gn, bn);
    const min = Math.min(rn, gn, bn);
    const d = max - min;
    const l = (max + min) / 2;
    const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
    let h = 0;
    if (d !== 0) {
      if (max === rn) h = ((gn - bn) / d + 6) % 6;
      else if (max === gn) h = (bn - rn) / d + 2;
      else h = (rn - gn) / d + 4;
    }
    return `hsl(${round(h * 60) % 360} ${round(s * 100)}% ${round(l * 100)}%)`;
  }
  // OKLCH via Björn Ottosson's OKLab matrices.
  const [lr, lg, lb] = [1, 3, 5].map((i) => channel(hex, i));
  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  const C = Math.hypot(A, B);
  const H = C < 0.0005 ? 0 : ((Math.atan2(B, A) * 180) / Math.PI + 360) % 360;
  return `oklch(${round(L * 100, 1)}% ${round(C, 3)} ${round(H) % 360})`;
}
