import { computed, mount, signal, Storage, View } from "nsh";
import { type CopyFormat, isCopyFormat } from "./src/color";
import { Header } from "./src/Header";
import { HueRail } from "./src/HueRail";
import { DEFAULT_PALETTE, isPaletteId, type PaletteId, palettes, resolveHue } from "./src/palettes";
import { Swatches } from "./src/Swatches";

export const PALETTE_KEY = "palette";
export const COPY_FORMAT_KEY = "copyFormat";

function App() {
  const paletteId = signal<PaletteId | null>(null);
  const chosenHue = signal<string | null>(null);
  const copyFormat = signal<CopyFormat>("hex");

  Storage.getItem(PALETTE_KEY).then(
    (saved) => paletteId.set(isPaletteId(saved) ? saved : DEFAULT_PALETTE),
    () => paletteId.set(DEFAULT_PALETTE),
  );
  Storage.getItem(COPY_FORMAT_KEY).then(
    (saved) => isCopyFormat(saved) && copyFormat.set(saved),
    () => {},
  );

  const choosePalette = (id: PaletteId) => {
    paletteId.set(id);
    void Storage.setItem(PALETTE_KEY, id);
  };

  const chooseCopyFormat = (format: CopyFormat) => {
    copyFormat.set(format);
    void Storage.setItem(COPY_FORMAT_KEY, format);
  };

  return (
    <View class="flex-1 bg-background pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
      <If when={paletteId()}>
        {(id) => {
          const palette = () => palettes[id()];
          const hue = computed(() => resolveHue(palette(), chosenHue()));
          return (
            <>
              <Header
                palette={id()}
                hue={hue()}
                onPaletteChange={choosePalette}
                onHueChange={(next) => chosenHue.set(next)}
              />
              <View class="flex-1 flex-row">
                <HueRail palette={palette()} selected={hue()} onSelect={(next) => chosenHue.set(next)} />
                <View class="flex-1 border-l border-border">
                  <Swatches
                    hue={hue()}
                    shades={palette().hues[hue()]}
                    copyFormat={copyFormat()}
                    onCopyFormatChange={chooseCopyFormat}
                  />
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
