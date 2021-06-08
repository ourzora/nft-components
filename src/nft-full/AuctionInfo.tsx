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

interface AuctionInfoProps {
  showPerpetual?: boolean;
}

const { format } = new Intl.NumberFormat();

export const AuctionInfo = ({ showPerpetual = true }: AuctionInfoProps) => {
  const { nft } = useContext(NFTDataContext);
  const { getStyles, getString } = useMediaContext();

  // return <pre>{JSON.stringify(nft, null, 2)}</pre>

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
      {format(parseFloat(pricing.prettyAmount))} {pricing.currency.symbol}
      {pricing.computedValue && (
        <span {...getStyles("textSubdued")}>
          {" "}
          ${format(parseInt(pricing.computedValue?.inUSD, 10))}
        </span>
      )}
    </React.Fragment>
  );

  if (data.pricing.status === AuctionStateInfo.NO_PRICING) {
    return <React.Fragment />;
  }

  if (data.pricing.status === AuctionStateInfo.PERPETUAL_ASK && showPerpetual) {
    return (
      <Fragment>
        {data.pricing.perpetual.ask && (
          <AuctionInfoWrapper titleString="LIST_PRICE">
            {getPricingString(data.pricing.perpetual.ask.pricing)}
          </AuctionInfoWrapper>
        )}

        <AuctionInfoWrapper titleString="OPEN_OFFERS">
          Be the first one to bid on this piece!
        </AuctionInfoWrapper>
      </Fragment>
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
    data.pricing.reserve &&
    data.pricing.status === AuctionStateInfo.RESERVE_AUCTION_FINISHED
  ) {
    const highestPreviousBid = data.pricing.reserve.previousBids[0];
    return (
      <AuctionInfoWrapper titleString="AUCTION_SOLD_FOR">
        {getPricingString(highestPreviousBid.pricing)}
        <div {...getStyles("fullInfoSpacer", { width: 15 })} />
        <div {...getStyles("fullLabel")}>{getString("WINNER")}</div>
        <AddressView address={highestPreviousBid.bidder.id} />
      </AuctionInfoWrapper>
    );
  }

  if (
    showPerpetual &&
    data.pricing.auctionType === AuctionType.PERPETUAL &&
    data.pricing.perpetual.highestBid
  ) {
    return (
      <AuctionInfoWrapper titleString="HIGHEST_BID">
        {getPricingString(data.pricing.perpetual.highestBid?.pricing)}
      </AuctionInfoWrapper>
    );
  }

  if (!showPerpetual && data.pricing.auctionType === AuctionType.PERPETUAL) {
    return <Fragment />;
  }

  return (
    <AuctionInfoWrapper
      titleString={
        data.pricing.auctionType === AuctionType.PERPETUAL
          ? "LIST_PRICE"
          : "RESERVE_PRICE"
      }
    >
      <div {...getStyles("pricingAmount")}>
        {data.pricing.auctionType === AuctionType.PERPETUAL &&
          data.pricing.perpetual.ask &&
          getPricingString(data.pricing.perpetual.ask?.pricing)}
        {data.pricing.auctionType === AuctionType.RESERVE &&
          data.pricing.reserve?.reservePrice &&
          getPricingString(data.pricing.reserve.reservePrice)}
      </div>
    </AuctionInfoWrapper>
  );
};
