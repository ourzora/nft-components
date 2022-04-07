import React, { useContext } from "react";

import { useMediaContext } from "../context/useMediaContext";
import { NFTDataContext } from "../context/NFTDataContext";
import { InfoContainer } from "./InfoContainer";
import { AddressView } from "../components/AddressView";
import type { StyleProps } from "../utils/StyleTypes";

export const CreatorEquity = ({ className }: StyleProps) => {
  const { data } = useContext(NFTDataContext);
  const { getStyles, getString } = useMediaContext();

  const getContent = (bidSharePercentage: number) => (
    <React.Fragment>{Math.floor(bidSharePercentage)}%</React.Fragment>
  );

  const activeAuction = data?.markets?.find(
    (market) => market.status === "active" && market.type === "Auction"
  );

  return (
    <>
      {/* TODO Fix media {media { ownerBidShare creatorBidShare prevOwnerBidShare }} */}
      {/* {data && data.rawData["zoraNFT"] in data && data.zoraNFT && (
        <InfoContainer titleString="CREATOR_EQUITY" className={className}>
          <div {...getStyles("fullInfoCreatorEquityContainer")}>
            {getContent(data.zoraNFT?.creatorBidSharePercentage)}
          </div>
        </InfoContainer>
      )} */}
      {activeAuction &&
        activeAuction.raw.curatorFeePercentage &&
        activeAuction.raw.curatorFeePercentage > 0 ? (
          <InfoContainer titleString="CURATOR_FEE" className={className}>
            <div {...getStyles("fullInfoCuratorFeeContainer")}>
              <span>
                {getContent(activeAuction.raw.curatorFeePercentage)}{" "}
                {getString("CURATOR_PROCEEDS_DESC")}
              </span>
              {activeAuction.raw.curatorAddress && (
                <>
                  &nbsp;
                  <AddressView address={activeAuction.raw.curatorAddress} />
                </>
              )}
            </div>
          </InfoContainer>
        ) : <></>}
    </>
  );
};
