import { NFTDataType } from "@zoralabs/nft-hooks";
import React, { useContext } from "react";

import { useMediaContext } from "../context/useMediaContext";
import { NFTDataContext } from "../context/NFTDataProvider";
import { InfoContainer } from "./InfoContainer";

export const CreatorEquity = () => {
  const {
    nft: { data },
  } = useContext(NFTDataContext);
  const {getStyles} = useMediaContext();

  const getContent = (nft: NFTDataType["nft"]) => (
    <React.Fragment>
        {Math.floor(nft.creatorBidSharePercentage)}%
    </React.Fragment>
  );

  return (
    <InfoContainer titleString="CREATOR_EQUITY">
      <div {...getStyles("fullInfoCreatorEquityContainer")}>
        {data && getContent(data.nft)}
      </div>
    </InfoContainer>
  );
};
