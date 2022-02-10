import { Fragment, useContext, useMemo } from "react";

import { AddressView } from "../components/AddressView";
import { NFTDataContext } from "../context/NFTDataContext";
import { useMediaContext } from "../context/useMediaContext";
import { InfoContainer } from "./InfoContainer";
import type { StyleProps } from "../utils/StyleTypes";
import type {
  AuctionLike,
  CurrencyValue,
  FixedPriceLike,
} from "@zoralabs/nft-hooks/dist/backends/NFTInterface";
import { PricingString } from "../utils/PricingString";

const dateFromTimestamp = (timestamp: number) => new Date(timestamp * 1000);

const formatDate = (timestamp: number) =>
  dateFromTimestamp(timestamp).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

type BidHistoryProps = {
  showPerpetual?: boolean;
} & StyleProps;

type MarketDataListType = {
  activityDescription: string;
  actor: string;
  createdAt: number;
  transactionHash: string | null;
  pricing: CurrencyValue | undefined;
};

export const BidHistory = ({
  showPerpetual = true,
  className,
}: BidHistoryProps) => {
  const { data } = useContext(NFTDataContext);
  const { getString, getStyles, style } = useMediaContext();

  const processedData = useMemo(() => {
    if (!data?.nft) {
      return [];
    }
    const bidEvents: MarketDataListType[] = [];
    if (data.nft?.minted && data.nft.minted?.at?.timestamp) {
      bidEvents.push({
        activityDescription: getString("BID_HISTORY_MINTED"),
        actor: data.nft.minted.minter!,
        createdAt: data.nft.minted.at.timestamp,
        transactionHash: data.nft.minted.at.transactionHash,
        pricing: undefined,
      });
    }
    data.markets?.forEach((market) => {
      if (market.type === "Auction") {
        const typedAuction = market as AuctionLike;
        if (typedAuction.cancelledAt) {
          bidEvents.push({
            activityDescription: getString("BID_HISTORY_CANCELLED"),
            actor: typedAuction.createdBy!,
            createdAt: typedAuction.finishedAt!.timestamp,
            transactionHash: null,
            pricing: undefined,
          });
        }
        if (typedAuction.winner) {
          bidEvents.push({
            activityDescription: getString("AUCTION_SOLD_FOR"),
            actor: typedAuction.winner,
            createdAt: typedAuction.finishedAt!.timestamp,
            transactionHash: null,
            pricing: typedAuction.amount,
          });
        }
        typedAuction.bids.forEach((bid) =>
          bidEvents.push({
            activityDescription: getString("BID_HISTORY_BID"),
            createdAt: bid.created.timestamp,
            actor: bid.creator,
            transactionHash: bid.created.transactionHash,
            pricing: bid.amount,
          })
        );
      }
      if (market.type === "FixedPrice") {
        if (market.side === "ask") {
          bidEvents.push({
            activityDescription: getString("HISTORY_ASK_PRICE"),
            createdAt: market.createdAt.timestamp,
            actor: market.createdBy!,
            transactionHash: market.createdAt.transactionHash,
            pricing: market.amount,
          });
        }
        if (market.side === "offer") {
          bidEvents.push({
            activityDescription: getString("HISTORY_OFFER_PRICE"),
            createdAt: market.createdAt.timestamp,
            actor: market.createdBy!,
            transactionHash: market.createdAt.transactionHash,
            pricing: market.amount,
          });
        }
      }
    });
    return bidEvents;
  }, [data?.markets]);

  if (!processedData.length) {
    return <Fragment />;
  }

  const pastBids = processedData
    .sort((bidA, bidB) => (bidA.createdAt > bidB.createdAt ? -1 : 1))
    .map((bidItem) => (
      <li
        {...getStyles("fullPageHistoryItem")}
        key={`${bidItem.actor}-${bidItem.createdAt}`}
      >
        <div {...getStyles("fullPageHistoryItemDescription")}>
          <div {...getStyles("fullPageHistoryItemDescriptionCopy")}>
            <AddressView address={bidItem.actor} />
            &nbsp;
            <span {...getStyles("pricingAmount")}>
              {bidItem.activityDescription}{" "}
              {bidItem.pricing && <PricingString pricing={bidItem.pricing} />}
            </span>
          </div>
          {bidItem.transactionHash && style.theme.showTxnLinks && (
            <a
              {...getStyles("fullPageHistoryTxnLink")}
              href={`https://etherscan.io/tx/${bidItem.transactionHash}`}
              target="_blank"
              rel="noreferrer"
            >
              {getString("BID_HISTORY_VIEW_TRANSACTION")}
            </a>
          )}
        </div>
        {bidItem.createdAt && (
          <div {...getStyles("fullPageHistoryItemMeta")}>
            <time
              dateTime={dateFromTimestamp(bidItem.createdAt).toISOString()}
              {...getStyles("fullPageHistoryItemDatestamp")}
            >
              {formatDate(bidItem.createdAt)}
            </time>
          </div>
        )}
      </li>
    ));

  return (
    <InfoContainer titleString="NFT_HISTORY" className={className}>
      <ol {...getStyles("fullPageHistoryList")}>{pastBids}</ol>
    </InfoContainer>
  );
};
