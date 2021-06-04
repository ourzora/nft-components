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
  href?: string,
  children?: React.ReactNode;
  showBids?: boolean;
} & Omit<NFTPageWrapperProps, "children">;

export const NFTPreview = ({
  onClick = undefined,
  href = undefined,
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
      <MediaThumbnailWrapper onClick={onClick} href={href}>
        {getChildren()}
      </MediaThumbnailWrapper>
    </NFTPageWrapper>
  );
};
