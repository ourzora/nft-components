import React, { useContext } from "react";

import { useMediaContext } from "../context/useMediaContext";
import { NFTDataContext } from "../context/NFTDataContext";
import { InfoContainer } from "./InfoContainer";
import { AddressView } from "src/components/AddressView";

export const CreatorEquity = () => {
  const {
    nft: { data },
  } = useContext(NFTDataContext);
  const { getStyles, getString } = useMediaContext();

  const getContent = (bidSharePercentage: number) => (
    <React.Fragment>{Math.floor(bidSharePercentage)}%</React.Fragment>
  );

  if (!data || !("zoraNFT" in data) || !data.zoraNFT) {
    return <React.Fragment />;
  }

  return (
    <>
      <InfoContainer titleString="CREATOR_EQUITY">
        <div {...getStyles("fullInfoCreatorEquityContainer")}>
          {getContent(data.zoraNFT?.creatorBidSharePercentage)}
        </div>
      </InfoContainer>
      {data.pricing.reserve && data.pricing.reserve?.curatorFeePercentage > 0 && (
        <InfoContainer titleString="CURATOR_FEE">
          <div {...getStyles("fullInfoCuratorFeeContainer")}>
            <p>{getContent(data.pricing.reserve?.curatorFeePercentage)}</p>
            <p>
              {getString("CURATOR_ADDRESS_TEXT")}{" "}
              <AddressView address={data.pricing.reserve.curator.id} />
            </p>
          </div>
        </InfoContainer>
      )}
    </>
  );
};
