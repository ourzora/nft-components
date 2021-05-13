import { useContext } from "react";
import { Strings } from "../constants/strings";
import { MediaContext, ThemeType } from "./MediaContext";

export function useMediaContext() {
  const mediaContext = useContext(MediaContext);

  const getStyles = (
    themeKey: keyof ThemeType["styles"],
    flags: any = {}
  ): any => {
    if (!(themeKey in mediaContext.theme.styles)) {
      throw new Error(
        `"${themeKey}" not found in [${Object.keys(
          mediaContext.theme.styles
        ).join(", ")}]`
      );
    }
    return {
      className: `zora-${themeKey}`,
      css: mediaContext.theme.styles[themeKey](mediaContext.theme.theme, flags),
    };
  };

  const getString = (stringName: keyof typeof Strings) => {
    // TODO(iain): Add formatting logic
    return Strings[stringName];
  };

  return { ...mediaContext, getString, getStyles };
}
