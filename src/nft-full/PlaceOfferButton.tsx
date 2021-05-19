import { Fragment, useContext } from "react";

import { ZORA_SITE_URL_BASE } from "../constants/media-urls";
import { useMediaContext } from "../context/useMediaContext";
import { Button } from "../components/Button";
import { NFTDataContext } from "../context/NFTDataProvider";

export const PlaceOfferButton = () => {
  const { nft } = useContext(NFTDataContext);
  const { getString } = useMediaContext();

  if (!nft.data) {
    return <Fragment />;
  }
  return (
    <div>
      <Button
        primary={true}
        href={[
          ZORA_SITE_URL_BASE,
          nft.data?.nft.creator.id,
          nft.data.nft.id,
          "bid",
        ].join("/")}
      >
        {getString("PLACE_BID")}
      </Button>
    </div>
  );
};
