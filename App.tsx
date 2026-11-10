import { computed, mount, signal, Storage, View } from "nsh";
import { isAvailable, Window } from "nsh/desktop";
import { hueTitle } from "./src/color";
import { Header, TITLE_BAR_HEIGHT } from "./src/Header";
import { HueRail } from "./src/HueRail";
import { DEFAULT_PALETTE, isPaletteId, type PaletteId, palettes, resolveHue } from "./src/palettes";
import { Swatches } from "./src/Swatches";

export const PALETTE_KEY = "palette";

if (isAvailable) {
  Window.setTitle("Material Colors");
  Window.setTitleBar({ style: "hidden", height: TITLE_BAR_HEIGHT });
  Window.setFrame({ size: { width: 340, height: 620 } });
}

function App() {
  const paletteId = signal<PaletteId | null>(null);
  const chosenHue = signal<string | null>(null);

  Storage.getItem(PALETTE_KEY).then(
    (saved) => paletteId.set(isPaletteId(saved) ? saved : DEFAULT_PALETTE),
    () => paletteId.set(DEFAULT_PALETTE),
  );

  const choosePalette = (id: PaletteId) => {
    paletteId.set(id);
    void Storage.setItem(PALETTE_KEY, id);
  };

  return (
    <View class="flex-1 bg-background pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
      <If when={paletteId()}>
        {(id) => {
          const palette = () => palettes[id()];
          const hue = computed(() => resolveHue(palette(), chosenHue()));
          return (
            <>
              <Header title={hueTitle(hue())} palette={id()} onPaletteChange={choosePalette} />
              <View class="flex-1 flex-row">
                <HueRail palette={palette()} selected={hue()} onSelect={(next) => chosenHue.set(next)} />
                <View class="flex-1 border-l border-border">
                  <Swatches hue={hue()} shades={palette().hues[hue()]} />
                </View>
              </View>
            </>
          );
        }}
      </If>
    </View>
  );
}

mount(App);
