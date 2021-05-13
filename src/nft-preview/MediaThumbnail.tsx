/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Fragment, useContext } from "react";

import { AddressView } from "../components/AddressView";
import { MediaObject } from "../components/MediaObject";
import { useMediaContext } from "../context/useMediaContext";
import { NFTDataContext } from "../context/NFTDataProvider";

export const MediaThumbnail = () => {
  const {
    nft: {data},
    metadata: {metadata},
  } = useContext(NFTDataContext);

  const { getStyles } = useMediaContext();

  const getContent = () => {
    if (metadata && data) {
      return {
        media: <MediaObject uri={data.nft.contentURI} metadata={metadata} />,
        title: metadata.name,
      };
    }
    return {
      media: <div {...getStyles("mediaLoader")}></div>,
      title: "...",
    };
  };

  const { media, title } = getContent();
  return (
    <Fragment>
      <div {...getStyles("cardMediaWrapper")}>{media}</div>
      <div {...getStyles("cardItemInfo")}>
        <div {...getStyles("cardTitle")}>{title}</div>
        <div>
          <span {...getStyles("textSubdued")}>Created by</span>{" "}
          <span>
            {data && <AddressView address={data.nft.creator.id} />}
          </span>
        </div>
      </div>
    </Fragment>
  );
};
