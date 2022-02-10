import { AuctionType } from "@zoralabs/nft-hooks";
import React, { useMemo, Fragment, useContext } from "react";

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
import type { AuctionLike } from "@zoralabs/nft-hooks/dist/backends/NFTInterface";

type AuctionInfoProps = {
  showPerpetual?: boolean;
} & StyleProps;

export const AuctionInfo = ({
  showPerpetual = true,
  className,
}: AuctionInfoProps) => {
  const { data } = useContext(NFTDataContext);
  const { getStyles, getString } = useMediaContext();

  const reserveAuction = useMemo(
    () => data?.markets?.find((market) => market.source === "ZoraReserveV0"),
    [data?.markets]
  ) as undefined | AuctionLike;

  const perpetualAsk = useMemo(
    () => data?.markets?.find((market) => market.source === "ZNFTPerpetual"),
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

  if (reserveAuction && reserveAuction.status === "complete") {
    return (
      <AuctionInfoWrapper titleString="AUCTION_ENDS">
        <div {...getStyles("pricingAmount")}>
          <CountdownDisplay to={reserveAuction.endsAt!.timestamp} />
        </div>
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

  if (!reserveAuction || !perpetualAsk) {
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
