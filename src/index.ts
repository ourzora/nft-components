import { Networks } from "@zoralabs/nft-hooks";
import { AuctionHouseList } from "./auction-house/AuctionHouseList";
import { NFTPreview, PreviewComponents } from "./nft-preview";
import { NFTFullPage, FullComponents } from "./nft-full";
import { MediaConfiguration } from "./context/MediaContext";
import { NFTDataContext } from "./context/NFTDataProvider";
import { NFTPageWrapper } from "./components/NFTPageWrapper";

export {
  // Constant list of all networks
  Networks,

  // Contextual wrapper component for media configuration
  MediaConfiguration,

  // Auction house helper for listing curated NFTs
  AuctionHouseList,

  // Media rendering component
  // Preview thumbnail renderer
  NFTPreview,
  PreviewComponents,

  // Full Page renderer
  NFTFullPage,
  FullComponents,

  // Generic data wrapper
  NFTPageWrapper,
  // Data context for fetching NFT info with custom components
  NFTDataContext,
};
