/** Shade name ("500", "a100", ...) to `#RRGGBB`, in display order. */
export type Shades = Readonly<Record<string, string>>;

export interface Palette {
  readonly name: string;
  readonly source?: string;
  /** The shade that stands for each hue in the hue rail (default "500", else the first). */
  readonly base?: string;
  /** Hue name ("red", "light-blue", ...) to its shades, in display order. */
  readonly hues: Readonly<Record<string, Shades>>;
}
