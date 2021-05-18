import { useContext } from "react";
import { css } from "@emotion/css";
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
    const styles = mediaContext.style.styles[themeKey](
      mediaContext.style.theme,
      flags
    );
    return {
      className: `zora-${themeKey} ${css(styles)}`,
    };
  };

  const getString = (stringName: keyof typeof Strings) => {
    // TODO(iain): Add formatting logic
    return Strings[stringName];
  };

  return { ...mediaContext, getString, getStyles };
}
