import React, { useContext } from "react";

import { useMediaContext } from "../context/useMediaContext";
import { NFTDataContext } from "../context/NFTDataContext";
import { InfoContainer } from "./InfoContainer";

export const CreatorEquity = () => {
  const {
    nft: { data },
  } = useContext(NFTDataContext);
  const { getStyles } = useMediaContext();

  const getContent = (bidSharePercentage: number) => (
    <React.Fragment>{Math.floor(bidSharePercentage)}%</React.Fragment>
  );

  return (
    <InfoContainer titleString="CREATOR_EQUITY">
      <div {...getStyles("fullInfoCreatorEquityContainer")}>
        {data &&
          "zoraNFT" in data &&
          getContent(data.zoraNFT.creatorBidSharePercentage)}
      </div>
    </InfoContainer>
  );
};
