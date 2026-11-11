import { signal, View } from "nsh";
import { Button } from "nsh/base";
import { hueTitle } from "./color";
import { baseShade, type Palette } from "./palettes";

const ROW_HEIGHT = 28;
const MAX_SIZE = 25;
const MIN_SIZE = 14;
/** Rail padding (`pt-1 pb-2`). */
const PADDING_Y = 12;

export function HueRail(props: { palette: Palette; selected: string; onSelect: (hue: string) => void }) {
  const hues = () => Object.keys(props.palette.hues);
  const railHeight = signal(Number.POSITIVE_INFINITY);
  // Circles shrink to fit every hue when the window is too short for full-size ones.
  const size = () =>
    Math.floor(Math.max(MIN_SIZE, Math.min(MAX_SIZE, (railHeight() - PADDING_Y) / hues().length)));
  return (
    <View class="w-[35px]" onLayout={(e) => railHeight.set(e.bounds.size.height)}>
      <View
        class="flex-1 items-center justify-around pt-1 pb-2"
        style={{ maxHeight: hues().length * ROW_HEIGHT }}
      >
        <Each of={hues()}>
          {(hue) => {
            const color = () => baseShade(props.palette.hues[hue()]);
            const selected = () => hue() === props.selected;
            return (
              <Button
                onPress={() => props.onSelect(hue())}
                selected={selected()}
                accessibilityLabel={hueTitle(hue())}
                class="items-center justify-center rounded-full border-2 active:opacity-60"
                style={{ width: size(), height: size(), borderColor: selected() ? color() : "transparent" }}
              >
                <View
                  class="rounded-full"
                  style={{ width: size() * 0.6, height: size() * 0.6, backgroundColor: color() }}
                />
              </Button>
            );
          }}
        </Each>
      </View>
    </View>
  );
}
