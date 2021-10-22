import { useMediaContext } from "../context/useMediaContext";
import { ProofAuthenticity } from "./ProofAuthenticity";
import { MediaFull } from "./MediaFull";
import { AuctionInfo } from "./AuctionInfo";
import { BidHistory } from "./BidHistory";
import { CreatorEquity } from "./CreatorEquity";
import { MediaInfo } from "./MediaInfo";
import { PlaceOfferButton } from "./PlaceOfferButton";
import {
  NFTDataProvider,
  NFTDataProviderProps,
} from "../context/NFTDataProvider";
import { useA11yIdPrefix } from "../utils/useA11yIdPrefix";
import type { StyleProps } from "../utils/StyleTypes";

type NFTFullPageProps = Omit<NFTDataProviderProps, "children"> & {
  children?: React.ReactNode;
  config?: {
    allowOffer?: boolean;
    showPerpetual?: boolean;
  };
} & StyleProps;

export const NFTFullPage = ({
  children,
  config,
  className,
  ...wrapperProps
}: NFTFullPageProps) => {
  const a11yIdPrefix = useA11yIdPrefix("media");
  const { getStyles } = useMediaContext();
  const allowOffer = config?.allowOffer;
  const showPerpetual = config?.showPerpetual;

  const getChildren = () => {
    if (children) {
      return children;
    }

    return (
      <>
        <MediaFull a11yIdPrefix={a11yIdPrefix} />
        <div {...getStyles("fullPageDataGrid")}>
          <MediaInfo a11yIdPrefix={a11yIdPrefix} />
          <PlaceOfferButton allowOffer={allowOffer} />
          <AuctionInfo showPerpetual={showPerpetual} />
          <ProofAuthenticity />
          <BidHistory showPerpetual={showPerpetual} />
          <CreatorEquity />
        </div>
      </>
    );
  };

  return (
    <NFTDataProvider {...wrapperProps}>
      <div {...getStyles("fullPage", className)}>{getChildren()}</div>
    </NFTDataProvider>
  );
};
