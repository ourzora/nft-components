import React, { useContext, createContext } from "react";
import { NetworkIDs, Networks, NFTFetchConfiguration } from "@zoralabs/nft-hooks";
import {merge} from 'merge-anything';

import { Strings } from "../constants/strings";
import { Theme } from "../constants/theme";

export type ThemeType = typeof Theme;

export type MediaContextType = {
  style: ThemeType;
  networkId: NetworkIDs;
  showBids: boolean;
  strings: typeof Strings;
};

export const MediaContext = createContext<MediaContextType>({
  networkId: Networks.MAINNET,
  showBids: true,
  style: Theme,
  strings: Strings,
});

type MediaContextConfigurationProps = {
  networkId?: NetworkIDs;
  children: React.ReactNode;
  style?: any;
  showBids?: boolean;
  strings?: any;
};

export const MediaConfiguration = ({
  networkId = Networks.MAINNET,
  style = {},
  children,
  strings = {},
  showBids,
}: MediaContextConfigurationProps) => {
  const superContext = useContext(MediaContext);

  const newContext = {
    style: merge(superContext.style, style),
    strings: merge(superContext.strings, strings),
    networkId,
    showBids: showBids === undefined ? superContext.showBids : showBids,
  };
  console.log({style, superStyle: superContext.style})

  return (
    <MediaContext.Provider value={newContext}>
      <NFTFetchConfiguration networkId={networkId}>
        {children}
      </NFTFetchConfiguration>
    </MediaContext.Provider>
  );
};
