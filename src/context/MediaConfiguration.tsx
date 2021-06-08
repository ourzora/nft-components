import React, { useContext } from "react";
import {
  NetworkIDs,
  Networks,
  NFTFetchConfiguration,
} from "@zoralabs/nft-hooks";
import { merge } from "merge-anything";

import { Strings } from "../constants/strings";
import { MediaRenderersType } from "../content-components";

import { MediaContext, ThemeType } from "./MediaContext";

type MediaContextConfigurationProps = {
  /**
   * NetworkID to set. Use Networks export to set constant. Default is mainnet.
   */
  networkId?: NetworkIDs;
  children: React.ReactNode;
  /**
   * List of mediaRenderers configuration settings to add or replace media renderers.
   */
  mediaRenderers?: MediaRenderersType;
  /**
   * Style configuration object. Contains both a theme and styles. Theme are generic settings for rendering styles.Style configuration object. Contains both a theme and styles.
   * Theme are generic settings for rendering styles.
   * Styles are raw emotion css-in-js styles for more fine-grained display settings.
   */
  style?: Partial<ThemeType>;
  /**
   * List of content strings.
   */
  strings?: Partial<typeof Strings>;
};

export const MediaConfiguration = ({
  networkId = Networks.MAINNET,
  style = {},
  children,
  strings = {},
  mediaRenderers = {},
}: MediaContextConfigurationProps) => {
  const superContext = useContext(MediaContext);

  let newContext = {
    style: merge(superContext.style, style),
    strings: merge(superContext.strings, strings),
    mediaRenderers: merge(superContext.mediaRenderers, mediaRenderers),
    networkId,
  };

  return (
    <MediaContext.Provider value={newContext}>
      <NFTFetchConfiguration networkId={networkId}>
        {children}
      </NFTFetchConfiguration>
    </MediaContext.Provider>
  );
};
