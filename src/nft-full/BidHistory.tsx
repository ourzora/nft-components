import { Fragment, useContext, useMemo } from "react";
import {
  AuctionLike,
  AUCTION_EVENT_TYPES,
  CurrencyValue,
  FIXED_SIDE_TYPES,
  MARKET_INFO_STATUSES,
  MARKET_TYPES,
  NormalizedEvent,
  TOKEN_TRANSFER_EVENT_CONTEXT_TYPES,
} from "@zoralabs/nft-hooks/dist/types";

import type { Strings } from "src/constants/strings";
import type { StyleProps } from "../utils/StyleTypes";

import { AddressView } from "../components/AddressView";
import { NFTDataContext } from "../context/NFTDataContext";
import { useMediaContext } from "../context/useMediaContext";
import { InfoContainer } from "./InfoContainer";
import { PricingString } from "../utils/PricingString";

const dateFromTimestamp = (timestamp: string) => {
  try {
    return new Date(timestamp);
  } catch (e) {
    return new Date();
  }
};

const formatDate = (timestamp: string) =>
  dateFromTimestamp(timestamp).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    year: "numeric",
    hour12: true,
  });

type BidHistoryProps = {
  showPerpetual?: boolean;
} & StyleProps;

type MarketDataListType = {
  activityDescription: string;
  actor: string;
  createdAt: string;
  transactionHash: string | null;
  toAddress?: string;
  pricing: CurrencyValue | undefined;
};

function v2AuctionEventToStringDescription(
  eventType: AUCTION_EVENT_TYPES
): keyof typeof Strings {
  if (eventType === AUCTION_EVENT_TYPES.AUCTION_APPROVED) {
    return "BID_HISTORY_AUCTION_APPROVED";
  }
  if (eventType === AUCTION_EVENT_TYPES.AUCTION_UPDATED) {
    return "BID_HISTORY_AUCTION_UPDATED";
  }
  if (eventType === AUCTION_EVENT_TYPES.AUCTION_BID) {
    return "BID_HISTORY_BID";
  }
  if (eventType === AUCTION_EVENT_TYPES.AUCTION_CREATED) {
    return "BID_HISTORY_CREATED_AUCTION";
  }
  if (eventType === AUCTION_EVENT_TYPES.AUCTION_CANCELLED) {
    return "BID_HISTORY_CANCELLED";
  }
  if (eventType === AUCTION_EVENT_TYPES.AUCTION_FINALIZED) {
    return "BID_HISTORY_WON_AUCTION";
  }
  return "BID_HISTORY_BID";
}

function getPricingFromEvent(nftEvent: any): any {
  return nftEvent.price
    ? ({
        eth: nftEvent.price.nativePrice
          ? {
              value: nftEvent.price.nativePrice.decimal,
            }
          : undefined,
        usd: nftEvent.price.usdcPrice
          ? {
              value: nftEvent.price.usdcPrice.decimal,
            }
          : undefined,
        amount: nftEvent.price.nativePrice
          ? {
              raw: nftEvent.price.nativePrice.raw,
              value: nftEvent.price.nativePrice.decimal,
              decimals: nftEvent.price.nativePrice.decimals,
            }
          : undefined,
        name: nftEvent.price.symbol,
        symbol: nftEvent.price.symbol,
      } as any)
    : undefined;
}

export const BidHistory = ({
  // @ts-ignore TS6196
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

    if (data.events) {
      data.events.forEach((nftEvent: NormalizedEvent) => {
        if (
          nftEvent.eventType ===
            TOKEN_TRANSFER_EVENT_CONTEXT_TYPES.TOKEN_TRANSFER_EVENT &&
          nftEvent.from !== "0x0000000000000000000000000000000000000000"
        ) {
          bidEvents.push({
            activityDescription: getString("BID_HISTORY_TRANSFER"),
            actor: nftEvent.from,
            toAddress: nftEvent.to,
            createdAt: nftEvent.at.timestamp,
            transactionHash: nftEvent.at.transactionHash || null,
            pricing: undefined,
          });
        }
        if (
          nftEvent.eventType ===
          TOKEN_TRANSFER_EVENT_CONTEXT_TYPES.TOKEN_MARKET_EVENT
        ) {
          if (
            nftEvent.event === AUCTION_EVENT_TYPES.AUCTION_BID ||
            nftEvent.event === AUCTION_EVENT_TYPES.AUCTION_CREATED ||
            nftEvent.event === AUCTION_EVENT_TYPES.AUCTION_APPROVED ||
            nftEvent.event === AUCTION_EVENT_TYPES.AUCTION_UPDATED ||
            nftEvent.event === AUCTION_EVENT_TYPES.AUCTION_CANCELLED ||
            nftEvent.event === AUCTION_EVENT_TYPES.AUCTION_FINALIZED
          ) {
            bidEvents.push({
              activityDescription: getString(
                v2AuctionEventToStringDescription(nftEvent.event)
              ),
              actor: nftEvent.sender,
              createdAt: nftEvent.at.timestamp,
              transactionHash: nftEvent.at.transactionHash || null,
              pricing: getPricingFromEvent(nftEvent),
            });
          }
        }
      });
    }

    if (data.nft?.minted?.address && data.nft.minted?.at?.timestamp) {
      bidEvents.push({
        activityDescription: getString("BID_HISTORY_MINTED"),
        actor: data.nft.minted.address,
        createdAt: data.nft.minted.at.timestamp,
        transactionHash: data.nft.minted.at.transactionHash || null,
        pricing: undefined,
      });
    }
    data.markets?.forEach((market) => {
      if (market.type === MARKET_TYPES.AUCTION) {
        const typedAuction = market as AuctionLike;
        if (typedAuction.canceledAt) {
          bidEvents.push({
            activityDescription: getString("BID_HISTORY_CANCELLED"),
            actor: typedAuction.createdBy!,
            createdAt: typedAuction.canceledAt.timestamp,
            transactionHash: typedAuction.canceledAt.transactionHash || null,
            pricing: undefined,
          });
        }
        if (typedAuction.winner && typedAuction.finishedAt) {
          bidEvents.push({
            activityDescription: getString("AUCTION_SOLD_FOR"),
            actor: typedAuction.winner,
            createdAt: typedAuction.finishedAt!.timestamp,
            transactionHash: typedAuction.finishedAt?.transactionHash || null,
            pricing: typedAuction.amount,
          });
        }
        typedAuction.bids.forEach((bid) =>
          bidEvents.push({
            activityDescription: getString("BID_HISTORY_BID"),
            createdAt: bid.created.timestamp,
            actor: bid.creator,
            transactionHash: bid.created.transactionHash || null,
            pricing: bid.amount,
          })
        );
      }
      if (market.type === MARKET_TYPES.FIXED_PRICE) {
        if (market.side === FIXED_SIDE_TYPES.ASK) {
          if (market.status === MARKET_INFO_STATUSES.ACTIVE) {
            bidEvents.push({
              activityDescription: getString("HISTORY_ASK_PRICE"),
              createdAt: market.createdAt.timestamp,
              actor: market.createdBy!,
              transactionHash: market.createdAt.transactionHash || null,
              pricing: market.amount,
            });
          }
          if (market.status === MARKET_INFO_STATUSES.CANCELED) {
            bidEvents.push({
              activityDescription: getString("HISTORY_ASK_CANCELLED"),
              createdAt:
                market.canceledAt?.timestamp || market.createdAt.timestamp,
              actor: market.createdBy!,
              transactionHash: market.canceledAt?.transactionHash || null,
              pricing: market.amount,
            });
          }
          if (market.status === MARKET_INFO_STATUSES.COMPLETE) {
            bidEvents.push({
              activityDescription: getString("HISTORY_ASK_FILLED"),
              createdAt: market.createdAt.timestamp,
              actor: market.createdBy!,
              transactionHash: market.createdAt.transactionHash || null,
              pricing: market.amount,
            });
          }
        }
        if (market.side === FIXED_SIDE_TYPES.OFFER) {
          bidEvents.push({
            activityDescription: getString("HISTORY_OFFER_PRICE"),
            createdAt: market.createdAt.timestamp,
            actor: market.createdBy!,
            transactionHash: market.createdAt.transactionHash || null,
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
    .sort((bidA, bidB) =>
      new Date(bidA.createdAt).getTime() < new Date(bidB.createdAt).getTime()
        ? 1
        : -1
    )
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
              {bidItem.toAddress && <AddressView address={bidItem.toAddress} />}
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
