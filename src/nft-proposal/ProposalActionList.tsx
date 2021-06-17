import { Fragment, useContext } from "react";
import { useMediaContext } from "../context/useMediaContext";
import { NFTDataContext } from "../context/NFTDataContext";
import { PricingString } from "../utils/PricingString";

export type ProposalActionListProps = {
  onAccept?: () => void;
  onDeny?: () => void;
};

export const ProposalActionList = ({
  onAccept,
  onDeny,
}: ProposalActionListProps) => {
  const {
    nft: { data },
  } = useContext(NFTDataContext);
  const { getStyles, getString } = useMediaContext();

  const getActions = () => {
    if (data?.pricing.reserve?.approved === false) {
      return (
        <div {...getStyles("nftProposalActions")}>
          <button
            {...getStyles("nftProposalActionButton", { action: "approve" })}
            onClick={onAccept}
          >
            approve
          </button>
          <button
            {...getStyles("nftProposalActionButton", { action: "deny" })}
            onClick={onDeny}
          >
            reject
          </button>
        </div>
      );
    }
    if (data?.pricing.reserve?.approved) {
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
    <div {...getStyles("nftProposalActionList")}>
      <div {...getStyles("nftProposalLabelWrapper")}>
        <div {...getStyles("nftProposalLabel")}>
          {getString("RESERVE_PRICE")}
        </div>
        <div {...getStyles("fullOwnerAddress")}>
          {data?.pricing.reserve?.reservePrice !== undefined && (
            <PricingString
              pricing={data.pricing.reserve.reservePrice}
              showUSD={false}
            />
          )}
        </div>
      </div>

      <div {...getStyles("nftProposalLabelWrapper")}>
        <div {...getStyles("nftProposalLabel")}>
          {getString("PROPOSAL_CURATOR_SHARE")}
        </div>
        <div {...getStyles("fullOwnerAddress")}>
          {data?.pricing.reserve && data.pricing.reserve.curatorFeePercentage}%
        </div>
      </div>
      {getActions()}
    </div>
  );
};
