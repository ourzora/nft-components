import { createContext } from "react";
import { Strings } from "../constants/strings";
import { Style } from "../constants/style";

export type ThemeType = typeof Style;

export type MediaContextType = {
  style: ThemeType;
  strings: typeof Strings;
};

export const MediaContext = createContext<MediaContextType>({
  style: Style,
  strings: Strings,
});
