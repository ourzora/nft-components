import { createContext } from "react";
import { NetworkIDs, Networks } from "@zoralabs/nft-hooks";

import { Strings } from "../constants/strings";
import { Style } from "../constants/style";
import {
  DefaultMediaRenderers,
  MediaRenderersType,
} from "../content-components";

export type ThemeType = typeof Style;

export type MediaContextType = {
  mediaRenderers: MediaRenderersType;
  style: ThemeType;
  networkId: NetworkIDs;
  strings: typeof Strings;
};

export const MediaContext = createContext<MediaContextType>({
  mediaRenderers: DefaultMediaRenderers,
  networkId: Networks.MAINNET,
  style: Style,
  strings: Strings,
});
