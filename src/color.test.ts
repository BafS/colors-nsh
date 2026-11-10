import { describe, expect, test } from "nsh/test";
import { DARK_TEXT, hueTitle, LIGHT_TEXT, luminance, textColorOn } from "./color";

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
