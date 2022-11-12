import { Networks } from "@zoralabs/nft-hooks";

import { MediaConfiguration } from "./context/MediaConfiguration";
import * as MediaRenderers from "./content-components";
import * as RendererConfigTypes from "./content-components/RendererConfig";
import { NFTDataProvider } from "./context/NFTDataProvider";
import { MediaObject } from "./components/MediaObject";
import { NFTDataContext } from "./context/NFTDataContext";
import { NFTPreview, PreviewComponents } from "./nft-preview";
import { NFTFullPage, FullComponents } from "./nft-full";
import AudioPlayer from "./audio-player/AudioPlayer";
import {
  DispatchPlayerContext,
  PlayerContext,
} from "./context/player.context";
import {
  playerReducer,
  playerInitialState
} from "./reducers/player.reducer"

export {
  // Audio Player
  AudioPlayer,
  DispatchPlayerContext,
  PlayerContext,
  playerReducer,
  playerInitialState, 
  // Constant list of all networks
  Networks,
  // Contextual wrapper component for media configuration
  MediaConfiguration,
  // Media rendering component
  // Preview thumbnail renderer
  NFTPreview,
  PreviewComponents,
  // Full Page renderer
  NFTFullPage,
  FullComponents,
  // Generic data wrapper
  NFTDataProvider,
  // Data context for fetching NFT info with custom components
  NFTDataContext,
  MediaObject,
  // Renderers and default array for configuration
  MediaRenderers,
  RendererConfigTypes,
};
