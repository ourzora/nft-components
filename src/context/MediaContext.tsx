import React, { useContext, createContext } from "react";
import { NetworkIDs, Networks, NFTFetchConfiguration } from "@zoralabs/nft-hooks";

import { Strings } from "../constants/strings";
import { Theme } from "../constants/theme";

export type ThemeType = typeof Theme;

export type MediaContextType = {
  theme: ThemeType;
  networkId: NetworkIDs;
  showBids: boolean;
  strings: typeof Strings;
};

export const MediaContext = createContext<MediaContextType>({
  networkId: Networks.MAINNET,
  showBids: true,
  theme: Theme,
  strings: Strings,
});

type MediaContextConfigurationProps = {
  networkId: NetworkIDs;
  children: React.ReactNode;
  theme?: any;
  showBids?: boolean;
  strings?: any;
};

export const MediaConfiguration = ({
  networkId,
  theme,
  children,
  strings,
  showBids,
}: MediaContextConfigurationProps) => {
  const superContext = useContext(MediaContext);

  const newContext = {
    theme: Object.assign({}, superContext.theme, theme),
    strings: Object.assign({}, superContext.strings, strings),
    networkId,
    showBids: showBids === undefined ? superContext.showBids : showBids,
  };

  return (
    <MediaContext.Provider value={newContext}>
      <NFTFetchConfiguration networkId={networkId}>
        {children}
      </NFTFetchConfiguration>
    </MediaContext.Provider>
  );
};
