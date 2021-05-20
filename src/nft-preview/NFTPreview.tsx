import { PricingComponent } from "./PricingComponent";
import {
  NFTPageWrapper,
  NFTPageWrapperProps,
} from "../components/NFTPageWrapper";

import { MediaThumbnailWrapper } from "./MediaThumbnailWrapper";
import { MediaThumbnail } from "./MediaThumbnail";
import { Fragment } from "react";

export type NFTPreviewProps = {
  onClick?: (evt: React.MouseEvent<HTMLElement>) => void;
  children?: React.ReactNode;
  showBids?: boolean;
} & Omit<NFTPageWrapperProps, "children">;

export const NFTPreview = ({
  onClick = undefined,
  showBids = true,
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
        {showBids && <PricingComponent />}
      </Fragment>
    );
  };

  return (
    <NFTPageWrapper {...wrapperProps}>
      <MediaThumbnailWrapper onClick={onClick}>
        {getChildren()}
      </MediaThumbnailWrapper>
    </NFTPageWrapper>
  );
};
