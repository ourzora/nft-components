/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useContext } from "react";

import { getAuctionState } from "../components/getAuctionState";
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
  const auctionState = getAuctionState(nft.data);

  return (
    <div
      {...getStyles("cardOuter", { hasClickEvent: !!onClick, auctionState })}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
