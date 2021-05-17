import { NFTDataType } from "@zoralabs/nft-hooks";

enum AuctionStateInfo {
  SALE_LOADING,
  SALE_NONE,
  SALE_PERPETUAL,
  SALE_PERPETUAL_RESERVE,
  SALE_RESERVE_AUCTION_ACTIVE,
  SALE_RESERVE_LAST_15,
  SALE_RESERVE_AUCTION_FINISHED,
  SALE_RESERVE_AUCTION_PENDING,
}

export function getAuctionState(data?: NFTDataType): AuctionStateInfo {
  if (!data) {
    return AuctionStateInfo.SALE_LOADING;
  }

  if (data.auction.current.auctionType === "perpetual") {
    if (data.auction.current.reservePrice) {
      return AuctionStateInfo.SALE_PERPETUAL_RESERVE;
    }
    if (!data.auction.highestBid && data.pricing.reserve?.previousBids.length) {
      return AuctionStateInfo.SALE_RESERVE_AUCTION_FINISHED;
    }
    return AuctionStateInfo.SALE_PERPETUAL;
  }
  if (data.auction.current.auctionType === "reserve") {
    if (data.auction.current.likelyHasEnded) {
      return AuctionStateInfo.SALE_RESERVE_AUCTION_FINISHED;
    }
    if (data.auction.current.reserveMet) {
      return AuctionStateInfo.SALE_RESERVE_AUCTION_ACTIVE;
    }
    return AuctionStateInfo.SALE_RESERVE_AUCTION_PENDING;
  }

  return AuctionStateInfo.SALE_NONE;
}
