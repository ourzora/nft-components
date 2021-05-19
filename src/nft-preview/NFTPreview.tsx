import { PricingComponent } from "./PricingComponent";
import { useMediaContext } from "../context/useMediaContext";
import {
  NFTPageWrapper,
  NFTPageWrapperProps,
} from "../components/NFTPageWrapper";

import { MediaThumbnailWrapper } from "./MediaThumbnailWrapper";
import { MediaThumbnail } from "./MediaThumbnail";

export type NFTPreviewProps = {
  onClick?: (evt: React.MouseEvent<HTMLElement>) => void;
  showBids?: boolean;
} & Omit<NFTPageWrapperProps, 'children'>;

export const NFTPreview = ({
  onClick = undefined,
  showBids: showBidsLocal,
  ...wrapperProps
}: NFTPreviewProps) => {
  const { showBids } = useMediaContext();

  return (
    <NFTPageWrapper {...wrapperProps}>
      <MediaThumbnailWrapper onClick={onClick}>
        <MediaThumbnail />
        {(showBidsLocal === undefined ? showBids : showBidsLocal) && (
          <PricingComponent />
        )}
      </MediaThumbnailWrapper>
    </NFTPageWrapper>
  );
};
