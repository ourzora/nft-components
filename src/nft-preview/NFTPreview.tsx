import { PricingComponent } from "./PricingComponent";
import {
  NFTDataProvider,
  NFTDataProviderProps,
} from "../context/NFTDataProvider";

import { MediaThumbnailWrapper } from "./MediaThumbnailWrapper";
import { MediaThumbnail } from "./MediaThumbnail";
import { Fragment } from "react";

export type NFTPreviewProps = {
  onClick?: (evt: React.MouseEvent<HTMLElement>) => void;
  href?: string;
  children?: React.ReactNode;
  showBids?: boolean;
  showPerpetual?: boolean;
} & Omit<NFTDataProviderProps, "children">;

export const NFTPreview = ({
  onClick = undefined,
  href = undefined,
  showBids = true,
  showPerpetual = true,
  children,
  ...wrapperProps
}: NFTPreviewProps) => {
  const getChildren = () => {
    if (children) {
      return children;
    }
    return (
      <Fragment>
        <MediaThumbnail />
        {showBids && <PricingComponent showPerpetual={showPerpetual} />}
      </Fragment>
    );
  };

  return (
    <NFTDataProvider {...wrapperProps}>
      <MediaThumbnailWrapper onClick={onClick} href={href}>
        {getChildren()}
      </MediaThumbnailWrapper>
    </NFTDataProvider>
  );
};
