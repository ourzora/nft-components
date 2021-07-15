import { Fragment, useContext } from "react";

import { PricingString } from "../utils/PricingString";
import { AddressView } from "../components/AddressView";
import { NFTDataContext } from "../context/NFTDataContext";
import { useMediaContext } from "../context/useMediaContext";
import { InfoContainer } from "./InfoContainer";

const dateFromTimestamp = (timestamp: string) =>
  new Date(parseInt(timestamp, 10) * 1000);

const formatDate = (timestamp: string) =>
  dateFromTimestamp(timestamp).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

type BidHistoryProps = {
  showPerpetual?: boolean;
};

export const BidHistory = ({ showPerpetual = true }: BidHistoryProps) => {
  const { nft } = useContext(NFTDataContext);
  const { getString, getStyles } = useMediaContext();

  const getPastBids = () => {
    const { data } = nft;
    if (!data || !data.nft) {
      return <Fragment />;
    }

    const currentBid = data.pricing.reserve?.currentBid
      ? [data.pricing.reserve?.currentBid]
      : [];
    const eventsList = [
      ...(showPerpetual ? data.pricing.perpetual.bids : []),
      ...(data.pricing.reserve?.previousBids || []),
      ...currentBid,
    ].map((bid) => ({
      activityDescription: getString("BID_HISTORY_BID"),
      actor: bid.bidder.id,
      pricing: <PricingString pricing={bid.pricing} showUSD={false} />,
      createdAt: bid.createdAtTimestamp,
    }));

    if (
      data.pricing.reserve?.createdAtTimestamp &&
      // Only show approved auction listings
      data.pricing.reserve?.approvedTimestamp
    ) {
      eventsList.push({
        activityDescription: getString("BID_HISTORY_LISTED"),
        pricing: <Fragment />,
        actor: data.pricing.reserve.tokenOwner.id,
        // TODO(iain): Update to the timestamp when approved
        createdAt: data.pricing.reserve.approvedTimestamp,
      });
    }

    if (
      data.pricing &&
      data.pricing.reserve &&
      data.pricing.reserve.current.likelyHasEnded &&
      (data.pricing.reserve.status === "Active" ||
        data.pricing.reserve.status === "Finished")
    ) {
      const highestBid =
        data.pricing.reserve.currentBid || data.pricing.reserve.previousBids[0];
      eventsList.push({
        activityDescription: getString("BID_HISTORY_WON_AUCTION"),
        pricing: <Fragment />,
        actor: highestBid.bidder.id,
        createdAt: data.pricing.reserve.expectedEndTimestamp,
      });
    }

    if ("zoraNFT" in data && data.zoraNFT.createdAtTimestamp) {
      eventsList.push({
        activityDescription: getString("BID_HISTORY_MINTED"),
        pricing: <Fragment />,
        actor: data.nft.creator || "",
        createdAt: data.zoraNFT.createdAtTimestamp,
      });
    }

    if ("openseaInfo" in data) {
      eventsList.push({
        activityDescription: getString("BID_HISTORY_MINTED"),
        pricing: <Fragment />,
        actor: data.openseaInfo.creator.address,
        createdAt: null,
      });
    }

    return eventsList
      .sort((bidA, bidB) => (bidA.createdAt > bidB.createdAt ? -1 : 1))
      .map((bidItem) => (
        <li {...getStyles("fullPageHistoryItem")} key={`${bidItem.actor}-${bidItem.createdAt}`}>
          <div>
            <span {...getStyles("pricingAmount")}>
              <AddressView address={bidItem.actor} />{" "}
            </span>
            {bidItem.activityDescription} {bidItem.pricing}
          </div>
          {bidItem.createdAt && (
            <time
              dateTime={dateFromTimestamp(bidItem.createdAt).toISOString()}
              {...getStyles("fullPageHistoryItemDatestamp")}
            >
              {formatDate(bidItem.createdAt)}
            </time>
          )}
        </li>
      ));
  };

  return (
    <InfoContainer titleString="NFT_HISTORY">
      <ol style={{ padding: 0 }}>{getPastBids()}</ol>
    </InfoContainer>
  );
};
