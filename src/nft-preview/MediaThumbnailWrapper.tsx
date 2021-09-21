import { useContext } from "react";

import { NFTDataContext } from "../context/NFTDataContext";
import { useMediaContext } from "../context/useMediaContext";

export function useAuctionStatusSelector(pricingData: any) {
  console.log(pricingData)
  return `${pricingData?.auctionType} ${pricingData?.status}`
  /*
  
  This is logic used in the create auction house template - would be nice to add similar selectors to the cardOuter div.
  
  if (auctions && auctions.length) {
    const auction = auctions[0]
    // CHECK: Ended Date < Current Date
    const currentDate = new Date()
    const endedDate = auction.expiresAt !== null && new Date(auction.expiresAt)
    
    const unclaimed =
      endedDate !== false && endedDate.getTime() < currentDate.getTime()
      && auction.winner === null
    
    // CHECK: Has Auction Data
    const hasAuction = auction.bidEvents.length > 0 && auction.winner === null

    if (auction.bidEvents.length === 0) {
      return 'listed'
    } else if (hasAuction && !unclaimed) {
      return 'auction-live'
    } else if (hasAuction && unclaimed) {
      return 'unclaimed'
    } else if (auction.winner !== null && !unclaimed) {
      return 'ended'
    } 
  } else if (auctions === undefined) {
    return 'not-listed'
  } else {
    return 'not-listed'
  }
  */
}

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
  const auctionStatus = nft?.data?.pricing?.status;

  const LinkComponent = href ? "a" : "button";

  return (
    <div
      {...getStyles("cardOuter", { hasClickEvent: !!onClick, auctionStatus }, useAuctionStatusSelector(nft?.data?.pricing))}
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
