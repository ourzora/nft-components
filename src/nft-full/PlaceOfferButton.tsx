import { Fragment, useContext } from "react";

import { ZORA_SITE_URL_BASE } from "../constants/media-urls";
import { useMediaContext } from "../context/useMediaContext";
import { Button } from "../components/Button";
import { NFTDataContext } from "../context/NFTDataContext";
import type { StyleProps } from "../utils/StyleTypes";

type PlaceOfferButtonProps = {
  allowOffer?: boolean;
} & StyleProps;

export const PlaceOfferButton = ({
  // @ts-ignore TS6133
  allowOffer,
  className,
}: PlaceOfferButtonProps) => {
  const { data } = useContext(NFTDataContext);
  const { getString, getStyles } = useMediaContext();

  if (!data?.nft) {
    return <Fragment />;
  }

  const nft = data.nft;

  const activeAuction = data.markets?.find(
    (market) => market.type === "Auction" && market.status === "active"
  );

  function getBidURLParts() {
    return [
      ZORA_SITE_URL_BASE,
      "collections",
      nft.contract.address,
      nft.tokenId,
      activeAuction ? "auction/bid" : "offer",
    ];
  }

  const bidURL = getBidURLParts()?.join("/");

  if (!bidURL) {
    return <Fragment />;
  }

  return (
    <div {...getStyles("fullPlaceOfferButton", className)}>
      <Button primary={true} href={bidURL}>
        {getString(activeAuction ? "PLACE_BID" : "PLACE_OFFER")}
      </Button>
    </div>
  );
};
