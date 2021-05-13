import React, { useContext } from "react";
import { NFTDataType } from "@zoralabs/nft-hooks";

import { MediaContext } from "../context/MediaContext";

type ViewLinkProps = {
  id: string;
  nftData: NFTDataType["nft"];
};

export const ViewLink = ({ id, nftData }: ViewLinkProps) => {
  const { strings, getMediaViewUrl } = useContext(MediaContext);

  const mediaViewUrl = getMediaViewUrl(id, nftData.owner.id);
  if (mediaViewUrl) {
    return <a href={mediaViewUrl}>{strings.VIEW_MEDIA}</a>;
  }
  return null;
};
