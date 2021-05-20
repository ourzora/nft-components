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
import { Fragment } from "react";

type NFTFullPageProps = Omit<NFTPageWrapperProps, "children"> & {
  children?: React.ReactNode;
};

export const NFTFullPage = ({
  children,
  ...wrapperProps
}: NFTFullPageProps) => {
  const { getStyles } = useMediaContext();

  const getChildren = () => {
    if (children) {
      return children;
    }

    return (
      <Fragment>
        <MediaFull />
        <div {...getStyles("fullPageDataGrid")}>
          <MediaInfo />
          <PlaceOfferButton />
          <AuctionInfo />
          <ProofAuthenticity />
          <BidHistory />
          <CreatorEquity />
        </div>
      </Fragment>
    );
  };

  return (
    <NFTPageWrapper {...wrapperProps}>
      <div {...getStyles("fullPage")}>{getChildren()}</div>
    </NFTPageWrapper>
  );
};
