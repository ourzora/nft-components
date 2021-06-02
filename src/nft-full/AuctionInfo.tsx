import {
  AuctionStateInfo,
  AuctionType,
  PricingInfo,
} from "@zoralabs/nft-hooks";
import React, { Fragment, useContext } from "react";

import { AddressView } from "../components/AddressView";
import { CountdownDisplay } from "../components/CountdownDisplay";
import { NFTDataContext } from "../context/NFTDataContext";
import { useMediaContext } from "../context/useMediaContext";
import { InfoContainer, InfoContainerProps } from "./InfoContainer";

export const AuctionInfo = () => {
  const { nft } = useContext(NFTDataContext);
  const { getStyles, getString } = useMediaContext();

  const AuctionInfoWrapper = ({
    children,
    ...containerArgs
  }: InfoContainerProps) => (
    <InfoContainer {...containerArgs}>
      <div {...getStyles("fullInfoAuctionWrapper")}>{children}</div>
    </InfoContainer>
  );

  if (!nft.data) {
    return <Fragment />;
  }

  const { data } = nft;

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

  if (data.pricing.status === AuctionStateInfo.NO_PRICING) {
    return <React.Fragment />;
  }

  if (
    data.pricing.status === AuctionStateInfo.PERPETUAL_ASK ||
    data.pricing.status === AuctionStateInfo.PERPETUAL_BID
  ) {
    return (
      <AuctionInfoWrapper titleString="OPEN_OFFERS">
        Be the first one to bid on this piece!
      </AuctionInfoWrapper>
    );
  }

  const reserve = data.pricing.reserve;
  if (
    reserve !== undefined &&
    !reserve.current.likelyHasEnded &&
    reserve.expectedEndTimestamp &&
    reserve.current.highestBid !== undefined
  ) {
    return (
      <AuctionInfoWrapper titleString="AUCTION_ENDS">
        <CountdownDisplay to={reserve.expectedEndTimestamp} />
        <div style={{ height: "20px" }} />
        <div {...getStyles("fullLabel")}>{getString("HIGHEST_BID")}</div>
        {getPricingString(reserve.current.highestBid?.pricing)}
        <div style={{ height: "20px" }} />
        <div {...getStyles("fullLabel")}>{getString("BIDDER")}</div>
        <AddressView address={reserve.current.highestBid?.placedBy} />
      </AuctionInfoWrapper>
    );
  }

  if (
    reserve !== undefined &&
    !reserve?.current.highestBid &&
    reserve.previousBids.length
  ) {
    const highestPreviousBid = reserve.previousBids[0];
    return (
      <AuctionInfoWrapper titleString="AUCTION_SOLD_FOR">
        {getPricingString(highestPreviousBid.pricing)}
        <div {...getStyles("fullInfoSpacer", { width: 15 })} />
        <div {...getStyles("fullLabel")}>{getString("WINNER")}</div>
        <AddressView address={highestPreviousBid.bidder.id} />
      </AuctionInfoWrapper>
    );
  }

  return (
    <AuctionInfoWrapper
      titleString={
        nft.data.pricing.auctionType === AuctionType.PERPETUAL
          ? "LIST_PRICE"
          : "RESERVE_PRICE"
      }
    >
      <div {...getStyles("pricingAmount")}>
        {data.pricing.auctionType === AuctionType.PERPETUAL &&
          data.pricing.perpetual.highestBid &&
          getPricingString(data.pricing.perpetual.highestBid?.pricing)}
        {data.pricing.auctionType === AuctionType.RESERVE &&
          data.pricing.reserve?.current.highestBid &&
          getPricingString(
            data.pricing.reserve.current.highestBid?.pricing
          )}{" "}
      </div>
    </AuctionInfoWrapper>
  );
};
