import { Text, View } from "nsh";
import { Select } from "nsh/base";
import { titleBar } from "nsh/desktop";
import { type PaletteId, paletteIds, palettes } from "./palettes";

export const TITLE_BAR_HEIGHT = 28;

const PALETTE_ITEMS = paletteIds.map((id) => ({ value: id, title: palettes[id].name }));

export function Header(props: { title: string; palette: PaletteId; onPaletteChange: (id: PaletteId) => void }) {
  return (
    <View
      desktop={{ windowDrag: true }}
      class="flex-row items-center gap-2 border-b border-border"
      style={{
        height: titleBar().height || TITLE_BAR_HEIGHT,
        paddingLeft: titleBar().left + 8,
        paddingRight: titleBar().right + 6,
      }}
    >
      <Text class="flex-1 line-clamp-1 text-[11px] text-muted-foreground">
        {props.title}
      </Text>
      <Select
        items={PALETTE_ITEMS}
        value={props.palette}
        onChange={({ value }) => value !== null && props.onPaletteChange(value as PaletteId)}
        accessibilityLabel="Palette"
        offset={4}
        popupClass="min-w-24 rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md"
        backdropClass="bg-black/40"
        itemClass="rounded px-2 py-1 text-xs line-clamp-1 selected:bg-muted focus:bg-accent focus:text-accent-foreground"
        trigger={
          <View class="flex-row items-center gap-1 rounded px-1.5 py-0.5 hover:bg-accent active:bg-accent">
            <Text class="text-[11px] text-muted-foreground">{palettes[props.palette].name}</Text>
            <Text class="text-[9px] text-muted-foreground">▾</Text>
          </View>
        }
      />
    </View>
  );
}
