import { useMediaContext } from "../context/useMediaContext";
import { ProofAuthenticity } from "./ProofAuthenticity";
import { MediaFull } from "./MediaFull";
import { AuctionInfo } from "./AuctionInfo";
import { BidHistory } from "./BidHistory";
import { CreatorEquity } from "./CreatorEquity";
import { MediaInfo } from "./MediaInfo";
import { PlaceOfferButton } from "./PlaceOfferButton";
import { Fragment } from "react";
import { NFTDataProvider, NFTDataProviderProps } from "src/context/NFTDataProvider";

type NFTFullPageProps = Omit<NFTDataProviderProps, "children"> & {
  children?: React.ReactNode;
  config?: {
    allowOffer?: boolean;
    showPerpetual?: boolean;
  };
};

export const NFTFullPage = ({
  children,
  config,
  ...wrapperProps
}: NFTFullPageProps) => {
  const { getStyles } = useMediaContext();
  const allowOffer = config?.allowOffer;
  const showPerpetual = config?.showPerpetual;

  const getChildren = () => {
    if (children) {
      return children;
    }

    return (
      <Fragment>
        <MediaFull />
        <div {...getStyles("fullPageDataGrid")}>
          <MediaInfo />
          <PlaceOfferButton allowOffer={allowOffer} />
          <AuctionInfo showPerpetual={showPerpetual} />
          <ProofAuthenticity />
          <BidHistory showPerpetual={showPerpetual} />
          <CreatorEquity />
        </div>
      </Fragment>
    );
  };

  return (
    <NFTDataProvider {...wrapperProps}>
      <div {...getStyles("fullPage")}>{getChildren()}</div>
    </NFTDataProvider>
  );
};
