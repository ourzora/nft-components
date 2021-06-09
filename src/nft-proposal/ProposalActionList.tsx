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
        <Fragment>
          <button onClick={onAccept}>approve</button>
          <button onClick={onDeny}>reject</button>
        </Fragment>
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
        <div>
          <div {...getStyles("fullLabel")}>{getString("RESERVE_PRICE")}</div>
          <div {...getStyles("fullOwnerAddress")}>
            {data?.pricing.reserve?.reservePrice !== undefined && (
              <PricingString pricing={data.pricing.reserve.reservePrice} showUSD={false} />
            )}
          </div>
        </div>

        <div>
          <div {...getStyles("fullLabel")}>
            {getString("PROPOSAL_CURATOR_SHARE")}
          </div>
          <div {...getStyles("fullOwnerAddress")}>
            {data?.pricing.reserve && data.pricing.reserve.curatorFeePercentage}
            %
          </div>
        </div>
      {getActions()}
    </div>
  );
};
