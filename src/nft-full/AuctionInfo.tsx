import { useMemo, Fragment, useContext } from "react";

import { PricingString } from "../utils/PricingString";
import { AddressView } from "../components/AddressView";
import {
  CountdownDisplay,
  DurationDisplay,
} from "../components/CountdownDisplay";
import { NFTDataContext } from "../context/NFTDataContext";
import { useMediaContext } from "../context/useMediaContext";
import { InfoContainer, InfoContainerProps } from "./InfoContainer";
import type { StyleProps } from "../utils/StyleTypes";
import {
  AuctionLike,
  AUCTION_SOURCE_TYPES,
  FIXED_PRICE_MARKET_SOURCES,
  MARKET_INFO_STATUSES,
} from "@zoralabs/nft-hooks/dist/types";

type AuctionInfoProps = {
  showPerpetual?: boolean;
  showFindersFee?: boolean;
} & StyleProps;

export const AuctionInfo = ({
  showPerpetual = true,
  showFindersFee = true,
  className,
}: AuctionInfoProps) => {
  const { data } = useContext(NFTDataContext);
  const { getStyles, getString } = useMediaContext();

  const reserveAuction = useMemo(
    () =>
      data?.markets?.find(
        (market) =>
          market.source === AUCTION_SOURCE_TYPES.ZORA_RESERVE_V2 &&
          market.status !== MARKET_INFO_STATUSES.CANCELED
      ),
    [data?.markets]
  ) as undefined | AuctionLike;

  const perpetualAsk = useMemo(
    () =>
      data?.markets?.find(
        (market) => market.source === FIXED_PRICE_MARKET_SOURCES.ZNFT_PERPETUAL
      ),
    [data?.markets]
  );

  const newAsk = useMemo(
    () =>
      data?.markets?.find(
        (market) => market.source === FIXED_PRICE_MARKET_SOURCES.ZORA_ASK_V3
      ),
    [data?.markets]
  );

  const AuctionInfoWrapper = ({
    children,
    ...containerArgs
  }: InfoContainerProps) => (
    <InfoContainer {...containerArgs} className={className}>
      {children}
    </InfoContainer>
  );

  if (!data?.nft) {
    return <Fragment />;
  }

  if (showPerpetual && perpetualAsk) {
    return (
      <Fragment>
        {perpetualAsk && (
          <AuctionInfoWrapper titleString="LIST_PRICE">
            <PricingString pricing={perpetualAsk.amount} />
          </AuctionInfoWrapper>
        )}
        <AuctionInfoWrapper titleString="OPEN_OFFERS">
          Be the first one to bid on this piece!
        </AuctionInfoWrapper>
      </Fragment>
    );
  }

  if (newAsk) {
    return (
      <Fragment>
        {newAsk && (
          <AuctionInfoWrapper titleString="CURRENT_PRICE">
            <PricingString pricing={newAsk.amount} />
            {showFindersFee && (
              <Fragment>
                <div
                  {...getStyles("fullInfoSpacer", undefined, { width: 15 })}
                />
                <div {...getStyles("fullLabel")}>
                  {getString("FINDERS_FEE")}
                </div>
                {`${Math.floor(parseInt(newAsk.raw.findersFeeBps, 10) / 100)}%`}
              </Fragment>
            )}
          </AuctionInfoWrapper>
        )}
        {reserveAuction && reserveAuction.status === "active" && (
          <AuctionInfoWrapper titleString="RESERVE_PRICE">
            <PricingString pricing={reserveAuction.amount} />
          </AuctionInfoWrapper>
        )}
      </Fragment>
    );
  }

  if (reserveAuction && reserveAuction.status === "complete") {
    return (
      <AuctionInfoWrapper className={className} titleString="AUCTION_SOLD_FOR">
        <div {...getStyles("fullInfoAuctionPricing")}>
          <PricingString pricing={reserveAuction.amount} />
        </div>
        <div {...getStyles("fullInfoSpacer", undefined, { width: 15 })} />
        <div {...getStyles("fullLabel")}>{getString("WINNER")}</div>
        <AddressView address={reserveAuction.currentBid!.creator} />
      </AuctionInfoWrapper>
    );
  }

  if (reserveAuction && reserveAuction.status === "active") {
    return (
      <AuctionInfoWrapper titleString="AUCTION_ENDS">
        {reserveAuction.endsAt && (
          <div {...getStyles("pricingAmount")}>
            <CountdownDisplay to={reserveAuction.endsAt?.timestamp} />
          </div>
        )}
        <div {...getStyles("fullInfoSpacer")} />
        <div {...getStyles("fullLabel")}>{getString("HIGHEST_BID")}</div>
        <div {...getStyles("fullInfoAuctionPricing")}>
          <PricingString pricing={reserveAuction.amount} />
        </div>
        <div {...getStyles("fullInfoSpacer")} />
        <div {...getStyles("fullLabel")}>{getString("BIDDER")}</div>
        <AddressView address={reserveAuction.currentBid!.creator} />
      </AuctionInfoWrapper>
    );
  }

  if (!reserveAuction && !perpetualAsk) {
    return <Fragment />;
  }

  return (
    <AuctionInfoWrapper
      titleString={reserveAuction ? "RESERVE_PRICE" : "LIST_PRICE"}
    >
      <div {...getStyles("pricingAmount")}>
        {perpetualAsk?.amount && (
          <div>
            <PricingString pricing={perpetualAsk.amount} />
          </div>
        )}
        {reserveAuction && (
          <>
            <div {...getStyles("fullInfoAuctionPricing")}>
              <PricingString pricing={reserveAuction.amount} />
            </div>
            <div>
              <div {...getStyles("fullInfoSpacer")} />
              <div {...getStyles("fullLabel")}>
                {getString("AUCTION_PENDING_DURATION")}
              </div>
              <DurationDisplay duration={reserveAuction.duration} />
            </div>
          </>
        )}
      </div>
    </AuctionInfoWrapper>
  );
};
