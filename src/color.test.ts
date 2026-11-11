import { describe, expect, test } from "nsh/test";
import { DARK_TEXT, formatColor, hueTitle, LIGHT_TEXT, luminance, textColorOn } from "./color";

describe("textColorOn", () => {
  test("puts light text on dark shades and dark text on light ones", () => {
    expect(textColorOn("#000000")).toBe(LIGHT_TEXT);
    expect(textColorOn("#B71C1C")).toBe(LIGHT_TEXT); // red 900
    expect(textColorOn("#FFFFFF")).toBe(DARK_TEXT);
    expect(textColorOn("#FFEBEE")).toBe(DARK_TEXT); // red 50
  });

  test("reads the whole channel, not only its first digit", () => {
    expect(luminance("#0F0F0F")).toBeGreaterThan(luminance("#000000"));
  });
});

test("hueTitle capitalizes and spaces hyphenated hues", () => {
  expect(hueTitle("light-blue")).toBe("Light blue");
  expect(hueTitle("deep-orange-accent")).toBe("Deep orange accent");
});

describe("formatColor", () => {
  test("writes each format", () => {
    expect(formatColor("#2196F3", "hex")).toBe("#2196F3");
    expect(formatColor("#2196F3", "rgb")).toBe("rgb(33 150 243)");
    expect(formatColor("#2196F3", "hsl")).toBe("hsl(207 90% 54%)");
    expect(formatColor("#FF0000", "oklch")).toBe("oklch(62.8% 0.258 29)");
  });

  test("gives grays no hue or saturation", () => {
    expect(formatColor("#808080", "hsl")).toBe("hsl(0 0% 50%)");
    expect(formatColor("#FFFFFF", "oklch")).toBe("oklch(100% 0 0)");
  });
});
