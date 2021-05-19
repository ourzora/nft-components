import { useMediaContext } from "../context/useMediaContext";
import { ProofAuthenticity } from "./ProofAuthenticity";
import { MediaFull } from "./MediaFull";
import { AuctionInfo } from "./AuctionInfo";
import { BidHistory } from "./BidHistory";
import { CreatorEquity } from "./CreatorEquity";
import { MediaInfo } from "./MediaInfo";
import {
  NFTPageWrapper,
  NFTPageWrapperProps,
} from "../components/NFTPageWrapper";
import { PlaceOfferButton } from "./PlaceOfferButton";

type NFTFullPageProps = {
  showBids?: boolean;
  showAuthenticity?: boolean;
} & NFTPageWrapperProps;

export const NFTFullPage = ({
  showBids = true,
  showAuthenticity = true,
  ...wrapperProps
}: NFTFullPageProps) => {
  const { getStyles } = useMediaContext();

  return (
    <NFTPageWrapper {...wrapperProps}>
      <div {...getStyles("fullPage")}>
        <MediaFull />
        <div {...getStyles("fullPageDataGrid")}>
          <MediaInfo />
          <PlaceOfferButton />
          {showBids && <AuctionInfo />}
          {showAuthenticity && <ProofAuthenticity />}
          {showBids && <BidHistory />}
          {showBids && <CreatorEquity />}
        </div>
      </div>
    </NFTPageWrapper>
  );
};
