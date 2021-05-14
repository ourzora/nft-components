import { useContext } from "react";
import { Strings } from "../constants/strings";
import { MediaContext, ThemeType } from "./MediaContext";

export function useMediaContext() {
  const mediaContext = useContext(MediaContext);

  const getStyles = (
    themeKey: keyof ThemeType["styles"],
    flags: any = {}
  ): any => {
    if (!(themeKey in mediaContext.style.styles)) {
      throw new Error(
        `"${themeKey}" not found in [${Object.keys(
          mediaContext.style.styles
        ).join(", ")}]`
      );
    }
    return {
      className: `zora-${themeKey}`,
      css: mediaContext.style.styles[themeKey](mediaContext.style.theme, flags),
    };
  };

  const getString = (stringName: keyof typeof Strings) => {
    // TODO(iain): Add formatting logic
    return Strings[stringName];
  };

  return { ...mediaContext, getString, getStyles };
}
