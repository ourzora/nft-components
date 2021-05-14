/** @jsx jsx */
import { jsx } from "@emotion/react";

import { MediaFull } from "./MediaFull";
import { useMediaContext } from "../context/useMediaContext";
import { ProofAuthenticity } from "./ProofAuthenticity";
import { NFTDataProvider } from "../context/NFTDataProvider";
import { AuctionInfo } from "./AuctionInfo";
import { BidHistory } from "./BidHistory";
import { CreatorEquity } from "./CreatorEquity";
import { MediaInfo } from "./MediaInfo";

type NFTFullPageProps = {
  id: string;
  showBids?: boolean;
  showAuthenticity?: boolean;
};

export const NFTFullPage = ({ id, showBids = true, showAuthenticity = true }: NFTFullPageProps) => {
  const { getStyles } = useMediaContext();

  return (
    <NFTDataProvider id={id}>
      <div {...getStyles("fullPage")}>
        <MediaFull />
        <div {...getStyles("fullPageDataGrid")}>
          <MediaInfo />
          {showBids && <AuctionInfo />}
          {showAuthenticity && <ProofAuthenticity />}
          {showBids && <BidHistory />}
          {showBids && <CreatorEquity />}
        </div>
      </div>
    </NFTDataProvider>
  );
};
