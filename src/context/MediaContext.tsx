import { createContext } from "react";
import { NetworkIDs, Networks } from "@zoralabs/nft-hooks";

import { Strings } from "../constants/strings";
import { Style } from "../constants/style";

export type ThemeType = typeof Style;

export type MediaContextType = {
  style: ThemeType;
  networkId: NetworkIDs;
  strings: typeof Strings;
};

export const MediaContext = createContext<MediaContextType>({
  networkId: Networks.MAINNET,
  style: Style,
  strings: Strings,
});
