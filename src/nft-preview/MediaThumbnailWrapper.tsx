import { useContext } from "react";

import { NFTDataContext } from "../context/NFTDataContext";
import { useMediaContext } from "../context/useMediaContext";

export const MediaThumbnailWrapper = ({
  children,
  onClick,
  href,
}: {
  children: React.ReactNode;
  onClick?: (evt: React.MouseEvent<HTMLElement>) => void;
  href?: string;
}) => {
  const { getStyles } = useMediaContext();

  const { nft } = useContext(NFTDataContext);
  const auctionStatus = nft.data?.pricing.status;

  const LinkComponent = href ? 'a' : 'button';

  return (
    <div
      {...getStyles("cardOuter", { hasClickEvent: !!onClick, auctionStatus })}
    >
      {(href || onClick) && (
        <LinkComponent {...getStyles("cardLink")} href={href} onClick={onClick}>
          View NFT
        </LinkComponent>
      )}
      {children}
    </div>
  );
};
