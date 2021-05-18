import { NFTDataType } from "@zoralabs/nft-hooks";
import React, { useContext } from "react";

import { NFTDataContext } from "../context/NFTDataProvider";
import { InfoContainer } from "./InfoContainer";

export const CreatorEquity = () => {
  const {
    nft: { data },
  } = useContext(NFTDataContext);

  const getContent = (nft: NFTDataType["nft"]) => (
    <React.Fragment>
        {Math.floor(nft.creatorBidSharePercentage)}%
    </React.Fragment>
  );

  return (
    <InfoContainer titleString="CREATOR_EQUITY">
      <div css={{height: '15px'}} />
      {data && getContent(data.nft)}
    </InfoContainer>
  );
};
