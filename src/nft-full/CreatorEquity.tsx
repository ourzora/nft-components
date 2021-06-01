import { NFTDataType } from "@zoralabs/nft-hooks";
import React, { useContext } from "react";

import { useMediaContext } from "../context/useMediaContext";
import { NFTDataContext } from "../context/NFTDataContext";
import { InfoContainer } from "./InfoContainer";

export const CreatorEquity = () => {
  const {
    nft: { data },
  } = useContext(NFTDataContext);
  const {getStyles} = useMediaContext();

  if (!data || !('zoraNFT' in data)) {
    return <React.Fragment />;
  }

  const getContent = (zoraNFT: NFTDataType["zoraNFT"]) => (
    <React.Fragment>
        {Math.floor(zoraNFT.creatorBidSharePercentage)}%
    </React.Fragment>
  );

  return (
    <InfoContainer titleString="CREATOR_EQUITY">
      <div {...getStyles("fullInfoCreatorEquityContainer")}>
        {data && getContent(data.zoraNFT)}
      </div>
    </InfoContainer>
  );
};
