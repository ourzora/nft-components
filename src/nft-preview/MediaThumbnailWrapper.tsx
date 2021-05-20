import { useContext } from "react";

import { NFTDataContext } from "../context/NFTDataProvider";
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
  const auctionStatus = nft.data?.auction.status;

  return (
    <div
      {...getStyles("cardOuter", { hasClickEvent: !!onClick, auctionStatus })}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
