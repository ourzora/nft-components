import { AuctionType, PricingInfo } from "@zoralabs/nft-hooks";
import React, { useContext } from "react";

import { AddressView } from "../components/AddressView";
import { CountdownDisplay } from "../components/CountdownDisplay";
import { NFTDataContext } from "../context/NFTDataProvider";
import { useMediaContext } from "../context/useMediaContext";
import { InfoContainer } from "./InfoContainer";

export const AuctionInfo = () => {
  const { nft } = useContext(NFTDataContext);
  const { getStyles, getString } = useMediaContext();

  const getPricingString = (pricing: PricingInfo) => (
    <React.Fragment>
      {pricing.prettyAmount} {pricing.currency.symbol}
      {pricing.computedValue && (
        <span {...getStyles("textSubdued")}>
          {" "}
          ${parseInt(pricing.computedValue?.inUSD, 10).toString()}
        </span>
      )}
    </React.Fragment>
  );

  if (!nft.data?.auction.current.reservePrice) {
    return (
      <InfoContainer titleString="OPEN_OFFERS">
        Be the first one to bid on this piece!
      </InfoContainer>
    );
  }

  const auctionInfo = nft.data.auction;
  if (
    !auctionInfo.current.likelyHasEnded &&
    auctionInfo.current.endingAt &&
    auctionInfo.highestBid
  ) {
    return (
      <InfoContainer titleString="AUCTION_ENDS">
        <CountdownDisplay to={auctionInfo.current.endingAt} />
        <div style={{ height: "20px" }} />
        <div {...getStyles("fullLabel")}>{getString("HIGHEST_BID")}</div>
        {getPricingString(auctionInfo.highestBid?.pricing)}
        <div style={{ height: "20px" }} />
        <div {...getStyles("fullLabel")}>{getString("BIDDER")}</div>
        <AddressView address={auctionInfo.highestBid?.placedBy} />
      </InfoContainer>
    );
  }

  if (!nft.data.auction.highestBid && nft.data.pricing.reserve?.previousBids.length) {
    const highestPreviousBid = nft.data.pricing.reserve.previousBids[0];
    return (
      <InfoContainer titleString="AUCTION_SOLD_FOR">
        {getPricingString(highestPreviousBid.pricing)}
        <div {...getStyles("fullInfoSpacer", { width: 15 })} />
        <div {...getStyles("fullLabel")}>{getString("WINNER")}</div>
        <AddressView address={highestPreviousBid.bidder.id} />
      </InfoContainer>
    );
  }

  return (
    <InfoContainer
      titleString={
        nft.data.auction.current.auctionType === AuctionType.PERPETUAL
          ? "LIST_PRICE"
          : "RESERVE_PRICE"
      }
    >
      <div {...getStyles("pricingAmount")}>
        {nft.data.auction.current.reservePrice
          ? getPricingString(nft.data.auction.current.reservePrice)
          : " "}
      </div>
    </InfoContainer>
  );
};
