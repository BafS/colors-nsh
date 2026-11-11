import { Text, View } from "nsh";
import { Select } from "nsh/base";
import { titleBar } from "nsh/desktop";
import { hueTitle } from "./color";
import { type PaletteId, paletteIds, palettes } from "./palettes";

/** nsh.json `window.titleBar.height`; the bar's height off desktops, where `titleBar()` is all 0. */
const TITLE_BAR_HEIGHT = 28;

const PALETTE_ITEMS = paletteIds.map((id) => ({ value: id, title: palettes[id].name }));

function Switch(props: {
  items: { value: string; title: string }[];
  value: string;
  label: string;
  onChange: (value: string) => void;
}) {
  return (
    <Select
      items={props.items}
      value={props.value}
      onChange={({ value }) => value !== null && props.onChange(value)}
      accessibilityLabel={props.label}
      offset={4}
      popupClass="min-w-24 max-h-96 rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md"
      backdropClass="bg-black/40"
      itemClass="rounded px-2 py-1 text-xs line-clamp-1 selected:bg-muted focus:bg-accent focus:text-accent-foreground"
      trigger={
        <View class="flex-row items-center gap-1 rounded px-1.5 py-0.5 hover:bg-accent active:bg-accent">
          <Text class="line-clamp-1 text-[11px] text-muted-foreground">
            {props.items.find((item) => item.value === props.value)?.title ?? props.value}
          </Text>
          <Text class="text-[9px] text-muted-foreground">▾</Text>
        </View>
      }
    />
  );
}

export function Header(props: {
  palette: PaletteId;
  hue: string;
  onPaletteChange: (id: PaletteId) => void;
  onHueChange: (hue: string) => void;
}) {
  const hueItems = () => Object.keys(palettes[props.palette].hues).map((hue) => ({ value: hue, title: hueTitle(hue) }));
  return (
    <View
      desktop={{ windowDrag: true }}
      class="flex-row items-center gap-2"
      style={{
        height: titleBar().height || TITLE_BAR_HEIGHT,
        paddingLeft: titleBar().left + 2,
        paddingRight: titleBar().right + 6,
      }}
    >
      <View class="flex-1 flex-row">
        <Switch items={hueItems()} value={props.hue} label="Hue" onChange={props.onHueChange} />
      </View>
      <Switch
        items={PALETTE_ITEMS}
        value={props.palette}
        label="Palette"
        onChange={(value) => props.onPaletteChange(value as PaletteId)}
      />
    </View>
  );
}
