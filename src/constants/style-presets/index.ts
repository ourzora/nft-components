import { DarkTheme } from "./dark";
import { GalleryTheme } from "./gallery";

export type ThemePresetNames = 'Dark' | 'Gallery';

export const THEME_PRESETS: Record<ThemePresetNames, any> = {
  Dark: DarkTheme,
  Gallery: GalleryTheme,
};
