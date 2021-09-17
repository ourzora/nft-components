import React, { useContext } from "react";

import { useMediaContext } from "../context/useMediaContext";
import { NFTDataContext } from "../context/NFTDataContext";
import { InfoContainer } from "./InfoContainer";
import { AddressView } from "../components/AddressView";

export const CreatorEquity = () => {
  const {
    nft: { data },
  } = useContext(NFTDataContext);
  const { getStyles, getString } = useMediaContext();

  const getContent = (bidSharePercentage: number) => (
    <React.Fragment>{Math.floor(bidSharePercentage)}%</React.Fragment>
  );

  return (
    <>
      {data && "zoraNFT" in data && data.zoraNFT && (
        <InfoContainer titleString="CREATOR_EQUITY">
          <div {...getStyles("fullInfoCreatorEquityContainer")}>
            {getContent(data.zoraNFT?.creatorBidSharePercentage)}
          </div>
        </InfoContainer>
      )}
      {data && data.pricing.reserve && data.pricing.reserve?.curatorFeePercentage > 0 && (
        <InfoContainer titleString="CURATOR_FEE">
          <div {...getStyles("fullInfoCuratorFeeContainer")}>
            <p>{getContent(data.pricing.reserve?.curatorFeePercentage)} {getString('CURATOR_PROCEEDS_DESC')}</p>
            <p>
              <AddressView address={data.pricing.reserve.curator.id} />
            </p>
          </div>
        </InfoContainer>
      )}
    </>
  );
};
