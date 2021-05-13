import React, { useContext, createContext } from "react";
import { NetworkIDs, Networks, NFTFetchConfiguration } from "@zoralabs/nft-hooks";

import { MEDIA_URL_BASE_BY_NETWORK } from "../constants/media-urls";
import { Strings } from "../constants/strings";
import { Theme } from "../constants/theme";

type GetMediaViewUrlType = (
  authorAddress: string,
  mediaId: string
) => string | undefined;

export type ThemeType = typeof Theme;

export type MediaContextType = {
  getMediaViewUrl: GetMediaViewUrlType;
  theme: ThemeType;
  networkId: NetworkIDs;
  showBids: boolean;
  strings: typeof Strings;
};

const getZoraMediaViewUrlByNetwork = (
  networkId: NetworkIDs
): GetMediaViewUrlType => {
  const urlBase = MEDIA_URL_BASE_BY_NETWORK[networkId];
  return (authorAddress: string, mediaId: string) =>
    [urlBase, authorAddress, mediaId].join("/");
};

const MainNetworkDefaultMediaViewUrl = getZoraMediaViewUrlByNetwork(
  Networks.MAINNET
);

export const MediaContext = createContext<MediaContextType>({
  getMediaViewUrl: MainNetworkDefaultMediaViewUrl,
  networkId: Networks.MAINNET,
  showBids: true,
  theme: Theme,
  strings: Strings,
});

type MediaContextConfigurationProps = {
  networkId: NetworkIDs;
  children: React.ReactNode;
  getMediaViewUrl?: GetMediaViewUrlType;
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
  getMediaViewUrl,
}: MediaContextConfigurationProps) => {
  const superContext = useContext(MediaContext);

  if (
    !getMediaViewUrl ||
    superContext.getMediaViewUrl === MainNetworkDefaultMediaViewUrl
  ) {
    getMediaViewUrl = getZoraMediaViewUrlByNetwork(networkId);
  }

  const newContext = {
    getMediaViewUrl,
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
