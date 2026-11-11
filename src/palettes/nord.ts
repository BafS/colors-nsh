import type { Palette } from "./types";

// Nord has four named groups instead of hue scales; each group is a hue, its colors the shades.
export const nord: Palette = {
  name: "Nord",
  source: "https://www.nordtheme.com/docs/colors-and-palettes",
  hues: {
    "polar-night": {
      "nord0": "#2E3440",
      "nord1": "#3B4252",
      "nord2": "#434C5E",
      "nord3": "#4C566A",
    },
    "snow-storm": {
      "nord4": "#D8DEE9",
      "nord5": "#E5E9F0",
      "nord6": "#ECEFF4",
    },
    frost: {
      "nord7": "#8FBCBB",
      "nord8": "#88C0D0",
      "nord9": "#81A1C1",
      "nord10": "#5E81AC",
    },
    aurora: {
      "nord11": "#BF616A",
      "nord12": "#D08770",
      "nord13": "#EBCB8B",
      "nord14": "#A3BE8C",
      "nord15": "#B48EAD",
    },
  },
};
