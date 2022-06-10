import React, { useContext } from "react";
import {
  NetworkIDs,
  NFTFetchConfiguration,
} from "@zoralabs/nft-hooks";
import deepmerge from "deepmerge";

import type { Strings } from "../constants/strings";
import type { RecursivePartial } from "../utils/RecursivePartial";
import type { RendererConfig } from "../content-components/RendererConfig";
import { MediaRendererDefaults } from "../content-components";
import { MediaContext, ThemeType } from "./MediaContext";
import type { NFTStrategy } from "@zoralabs/nft-hooks/dist/strategies";

type MediaContextConfigurationProps = {
  /**
   * NetworkID to set. Use Networks export to set constant. Default is mainnet.
   */
  networkId?: NetworkIDs;
  children: React.ReactNode;
  /**
   * Style configuration object. Contains both a theme and styles. Theme are generic settings for rendering styles.Style configuration object. Contains both a theme and styles.
   * Theme are generic settings for rendering styles.
   * Styles are raw emotion css-in-js styles for more fine-grained display settings.
   */
  style?: RecursivePartial<ThemeType>;
  /**
   * List of content strings.
   */
  strings?: Partial<typeof Strings>;
  /**
   * List of renderers.
   */
  renderers?: RendererConfig[];
  strategy?: NFTStrategy,
};

export const MediaConfiguration = ({
  networkId,
  strategy,
  style = {},
  children,
  strings = {},
  renderers,
}: MediaContextConfigurationProps) => {
  const superContext = useContext(MediaContext);

  const newNetworkId = networkId || superContext.networkId;

  if (!renderers) {
    renderers = MediaRendererDefaults;
  }

  let newContext = {
    // TODO(iain): Fix typing
    style: deepmerge(superContext.style, style) as ThemeType,
    strings: deepmerge(superContext.strings, strings),
    renderers,
    networkId: newNetworkId,
  };

  return (
    <MediaContext.Provider value={newContext}>
      <NFTFetchConfiguration strategy={strategy} networkId={newNetworkId}>
        {children}
      </NFTFetchConfiguration>
    </MediaContext.Provider>
  );
};
