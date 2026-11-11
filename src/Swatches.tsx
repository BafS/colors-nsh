import { Clipboard, cleanup, createAnimatedValue, effect, Scroll, signal, Text, View } from "nsh";
import { Button, ContextMenu, MenuItem } from "nsh/base";
import { COPY_FORMATS, type CopyFormat, formatColor, textColorOn } from "./color";
import type { Shades } from "./palettes";

export const COPIED_MS = 1200;

export function Swatches(props: {
  hue: string;
  shades: Shades;
  copyFormat: CopyFormat;
  onCopyFormatChange: (format: CopyFormat) => void;
}) {
  // One value drives opacity and scaleY, sprung from 0.6 like the original's
  // `Animated.spring({ tension: 80, friction: 8.5 })` (RN's origami conversion).
  const entrance = createAnimatedValue(1);
  const copied = signal<string | null>(null);

  effect(() => {
    props.hue;
    entrance.set(0.6);
    entrance.spring(1, { stiffness: 375, damping: 26.5 });
  });

  effect(() => {
    if (copied() === null) return;
    const timer = setTimeout(() => copied.set(null), COPIED_MS);
    cleanup(() => clearTimeout(timer));
  });

  const copy = async (hex: string, format = props.copyFormat) => {
    await Clipboard.writeText(formatColor(hex, format));
    copied.set(hex);
  };

  const copyAs = (hex: string, format: CopyFormat) => {
    props.onCopyFormatChange(format);
    void copy(hex, format);
  };

  return (
    <Scroll class="flex-1" contentClass="grow">
      <View
        class="flex-1 px-2.5 pt-[3px] pb-[5px]"
        style={{ opacity: entrance, transform: [{ scaleY: entrance }], transformOrigin: "top" }}
      >
        <Each of={Object.entries(props.shades)} key={([shade]) => shade}>
          {(entry) => {
            const shade = () => entry()[0];
            const hex = () => entry()[1];
            const ink = () => textColorOn(hex());
            return (
              <ContextMenu
                class="m-px min-h-8 max-h-16 flex-1"
                popupClass="min-w-44 rounded-md border border-border bg-popover p-1 shadow-md"
                trigger={
                  <Button
                    onPress={() => copy(hex())}
                    accessibilityLabel={`Copy ${shade().toUpperCase()} ${hex()}`}
                    class="flex-1 flex-row items-center justify-between rounded-sm px-2.5 active:opacity-40"
                    style={{ backgroundColor: hex() }}
                  >
                    <Text class="text-[11px]" style={{ color: ink() }}>
                      {shade().toUpperCase()}
                    </Text>
                    <Text class="font-mono text-[11px]" style={{ color: ink() }}>
                      {copied() === hex() ? "Copied" : hex()}
                    </Text>
                  </Button>
                }
              >
                {COPY_FORMATS.map((format) => (
                  <MenuItem
                    onSelect={() => copyAs(hex(), format)}
                    class="flex-row items-center rounded px-2 py-1 hover:bg-accent focus:bg-accent"
                  >
                    <Text class="font-mono text-[11px] text-foreground">{formatColor(hex(), format)}</Text>
                  </MenuItem>
                ))}
              </ContextMenu>
            );
          }}
        </Each>
      </View>
    </Scroll>
  );
}
