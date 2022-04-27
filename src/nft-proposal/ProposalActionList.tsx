import { Fragment, useContext } from "react";
import { useMediaContext } from "../context/useMediaContext";
import { NFTDataContext } from "../context/NFTDataContext";
import { PricingString } from "../utils/PricingString";
import type { StyleProps } from "../utils/StyleTypes";
import {
  AuctionLike,
  AUCTION_SOURCE_TYPES,
  MARKET_INFO_STATUSES,
} from "@zoralabs/nft-hooks/dist/types";
import { useMemo } from "react";
import type { ReserveAuctionPartialFragment } from "@zoralabs/nft-hooks/dist/backends/zora-graph/zora-graph-types";

export type ProposalActionListProps = {
  onAccept?: () => void;
  onDeny?: () => void;
} & StyleProps;

/** @deprecated */
export const ProposalActionList = ({
  onAccept,
  onDeny,
  className,
}: ProposalActionListProps) => {
  const { data } = useContext(NFTDataContext);

  const reserveAuction = useMemo(
    () =>
      data?.markets?.find(
        (market) =>
          market.source === AUCTION_SOURCE_TYPES.ZORA_RESERVE_V2 &&
          market.status !== MARKET_INFO_STATUSES.CANCELED
      ),
    [data?.markets]
  ) as undefined | AuctionLike;

  const raw = reserveAuction?.raw as ReserveAuctionPartialFragment;

  console.log("reserveAuction", reserveAuction);

  const { getStyles, getString } = useMediaContext();

  const getActions = () => {
    if (!raw.approved) {
      return (
        <div {...getStyles("nftProposalActions")}>
          <button
            {...getStyles("nftProposalActionButton", undefined, {
              action: "approve",
            })}
            onClick={onAccept}
          >
            approve
          </button>
          <button
            {...getStyles("nftProposalActionButton", undefined, {
              action: "deny",
            })}
            onClick={onDeny}
          >
            reject
          </button>
        </div>
      );
    }
    if (raw.approved) {
      return (
        <div {...getStyles("nftProposalActions")}>
          <span {...getStyles("nftProposalAcceptedPill")}>
            {getString("PROPOSAL_ACCEPTED")}
          </span>
        </div>
      );
    }
    return <Fragment />;
  };

  return (
    <div {...getStyles("nftProposalActionList", className)}>
      <div {...getStyles("nftProposalLabelWrapper")}>
        <div {...getStyles("nftProposalLabel")}>
          {getString("RESERVE_PRICE")}
        </div>
        <div {...getStyles("fullOwnerAddress")}>
          {reserveAuction?.amount !== undefined && (
            <PricingString pricing={reserveAuction.amount} showUSD={false} />
          )}
        </div>
      </div>

      <div {...getStyles("nftProposalLabelWrapper")}>
        <div {...getStyles("nftProposalLabel")}>
          {getString("PROPOSAL_CURATOR_SHARE")}
        </div>
        <div {...getStyles("fullOwnerAddress")}>
          {reserveAuction?.amount && raw.curatorFeePercentage}%
        </div>
      </div>
      {getActions()}
    </div>
  );
};
