import { Fragment, useContext } from "react";

import { ZORA_SITE_URL_BASE } from "../constants/media-urls";
import { useMediaContext } from "../context/useMediaContext";
import { Button } from "../components/Button";
import { NFTDataContext } from "../context/NFTDataContext";
import { AuctionType } from "@zoralabs/nft-hooks";

type PlaceOfferButtonProps = {
  allowOffer?: boolean;
};

export const PlaceOfferButton = ({ allowOffer }: PlaceOfferButtonProps) => {
  const { nft } = useContext(NFTDataContext);
  const { getString, getStyles } = useMediaContext();

  if (!nft.data) {
    return <Fragment />;
  }

  // Disable offer functionality if not a zora NFT or if offers are disabled
  if (
    (allowOffer === false || !('zoraNFT' in nft.data)) &&
    nft.data.pricing.auctionType !== AuctionType.RESERVE
  ) {
    return <Fragment />;
  }

  return (
    <div {...getStyles("fullPlaceOfferButton")}>
      <Button
        primary={true}
        href={[
          ZORA_SITE_URL_BASE,
          nft.data.nft.creator,
          nft.data.nft.tokenId,
          nft.data.pricing.auctionType === AuctionType.RESERVE
            ? "auction/bid"
            : "bid",
        ].join("/")}
      >
        {getString(
          nft.data.pricing.auctionType === AuctionType.RESERVE
            ? "PLACE_BID"
            : "PLACE_OFFER"
        )}
      </Button>
    </div>
  );
};
