import { useContext } from "react";
import { css } from "@emotion/css";
import type { Strings } from "../constants/strings";
import { MediaContext, ThemeType } from "./MediaContext";
import camelCase from 'lodash/camelCase'

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

    const getUtilitySelectors = (flagsObject: any) => {
      let selectors: string[] = []
      
      if (Object.keys(flagsObject).length) {
        Object.entries(flagsObject).forEach((key) => {
          const objectType = typeof key[1]
          if (objectType === 'boolean' && key[1]) {
            selectors.push(`zora-${themeKey}--${key[0]}`)
          } else if (objectType === 'string') {
            selectors.push(`zora-${themeKey}__${key[0]}--${camelCase(key[1])}`)
          }
        })
      }
      
      return `${selectors.join(' ')}`
    }

    return {
      className: `zora-${themeKey} ${css(styles)} ${getUtilitySelectors(flags)}`,
    };
  };

  const getString = (stringName: keyof typeof Strings) => {
    return mediaContext.strings[stringName];
  };

  return { ...mediaContext, getString, getStyles };
}
