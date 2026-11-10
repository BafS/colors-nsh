import { View } from "nsh";
import { Button } from "nsh/base";
import { hueTitle } from "./color";
import { baseShade, type Palette } from "./palettes";

const ROW_HEIGHT = 28;

export function HueRail(props: { palette: Palette; selected: string; onSelect: (hue: string) => void }) {
  const hues = () => Object.keys(props.palette.hues);
  return (
    <View
      class="w-[35px] items-center justify-around pt-1 pb-2"
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
              class="size-[25px] items-center justify-center rounded-full border-2 active:opacity-60"
              style={{ borderColor: selected() ? color() : "transparent" }}
            >
              <View class="size-[15px] rounded-full" style={{ backgroundColor: color() }} />
            </Button>
          );
        }}
      </Each>
    </View>
  );
}
