import { useContext } from "react";

import { NFTDataContext } from "../context/NFTDataContext";
import { useMediaContext } from "../context/useMediaContext";

export const MediaThumbnailWrapper = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: (evt: React.MouseEvent<HTMLElement>) => void;
}) => {
  const { getStyles } = useMediaContext();

  const { nft } = useContext(NFTDataContext);
  const auctionStatus = nft.data?.pricing.status;

  return (
    <div
      {...getStyles("cardOuter", { hasClickEvent: !!onClick, auctionStatus })}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
