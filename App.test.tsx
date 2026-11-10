import { describe, expect, open, test } from "nsh/test";

const desktop = { platform: "macos", width: 340, height: 620, clock: {} } as const;

describe("swatches", () => {
  test("pressing a swatch copies its hex and confirms it until the confirmation times out", async () => {
    const app = await open("./App.tsx", desktop);
    await app.press("label:Copy 500 #F44336");
    expect(app.clipboard()).toBe("#F44336");
    expect(app.shows("text:Copied")).toBe(true);
    expect(app.shows("text:#F44336")).toBe(false);

    await app.clock!.runFor(1500);
    expect(app.shows("text:Copied")).toBe(false);
    expect(app.shows("text:#F44336")).toBe(true);
  });
});

describe("hues", () => {
  test("pressing a hue shows its shades and title", async () => {
    const app = await open("./App.tsx", desktop);
    expect(app.texts()).toContain("Red");
    await app.press("role:button[Teal]");
    expect(app.texts()).toContain("Teal");
    expect(app.shows("text:#009688")).toBe(true);
    expect(app.shows("text:#F44336")).toBe(false);
  });
});

describe("palettes", () => {
  test("switching palette keeps a hue both have and saves the choice", async () => {
    const app = await open("./App.tsx", desktop);
    await app.press("role:button[Orange]");
    await app.press("label:Palette");
    await app.press("text:Elementary");
    expect(app.texts()).toContain("Orange");
    expect(app.shows("text:#F37329")).toBe(true);
    expect(app.storage().palette).toBe("elementary");
  });

  test("switching to a palette without the hue falls back to its first hue", async () => {
    const app = await open("./App.tsx", desktop);
    await app.press("role:button[Indigo]");
    await app.press("label:Palette");
    await app.press("text:Elementary");
    expect(app.texts()).toContain("Strawberry");
  });

  test("opens on the saved palette", async () => {
    const app = await open("./App.tsx", { ...desktop, storage: { palette: "elementary" } });
    expect(app.texts()).toContain("Strawberry");
    expect(app.shows("text:#C6262E")).toBe(true);
  });

  test("ignores a saved palette it does not know", async () => {
    const app = await open("./App.tsx", { ...desktop, storage: { palette: "nope" } });
    expect(app.texts()).toContain("Red");
  });
});
