/** @jsx jsx */
import { jsx } from "@emotion/react";

import { MediaThumbnail } from "./MediaThumbnail";
import { PricingComponent } from "../components/PricingComponent";
import { useMediaContext } from "../context/useMediaContext";
import { NFTDataProvider } from "../context/NFTDataProvider";
import { MediaThumbnailWrapper } from "./MediaThumbnailWrapper";

export type NFTPreviewProps = {
  id: string;
  style?: any;
  onClick?: (evt: React.MouseEvent<HTMLElement>) => void;
  showBids?: boolean;
};

export const NFTPreview = ({
  id,
  onClick = undefined,
  showBids: showBidsLocal,
}: NFTPreviewProps) => {
  const { showBids } = useMediaContext();

  return (
    <NFTDataProvider id={id}>
      <MediaThumbnailWrapper onClick={onClick}>
        <MediaThumbnail />
        {(showBidsLocal === undefined ? showBids : showBidsLocal) && (
          <PricingComponent />
        )}
      </MediaThumbnailWrapper>
    </NFTDataProvider>
  );
};
