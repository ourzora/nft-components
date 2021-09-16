import { useContext } from "react";
import { css } from "@emotion/css";
import type { Strings } from "../constants/strings";
import { MediaContext, ThemeType } from "./MediaContext";

export function useMediaContext() {
  const mediaContext = useContext(MediaContext);

  const getStyles = (
    themeKey: keyof ThemeType["styles"]
  ): any => {
    if (!(themeKey in mediaContext.style.styles)) {
      throw new Error(
        `"${themeKey}" not found in [${Object.keys(
          mediaContext.style.styles
        ).join(", ")}]`
      );
    }
    // const styles = mediaContext.style.styles[themeKey]();
    return {
      className: `zora-${themeKey} ${css('')}`,
    };
  };

  const getString = (stringName: keyof typeof Strings) => {
    return mediaContext.strings[stringName];
  };

  return { ...mediaContext, getString, getStyles };
}
