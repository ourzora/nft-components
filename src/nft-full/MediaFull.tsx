/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useContext } from "react";

import { NFTDataContext } from "../context/NFTDataProvider";
import { AddressView } from "../components/AddressView";
import { MediaObject } from "../components/MediaObject";
import { useMediaContext } from "../context/useMediaContext";
import { Loader } from "../components/Loader";

export const MediaFull = () => {
  const { getStyles, getString } = useMediaContext();
  const {
    nft: { data },
    metadata: { metadata, error },
  } = useContext(NFTDataContext);

  const getContent = () => {
    if (metadata && data) {
      return {
        media: (
          <MediaObject
            isFullPage={true}
            uri={data.nft.contentURI}
            metadata={metadata}
          />
        ),
        title: metadata.name,
        description: metadata.description,
      };
    }
    if (error) {
      return {
        media: <div {...getStyles("mediaLoader")}>error fetching...</div>,
        title: "?",
        description: "?",
      };
    }
    return {
      media: <div {...getStyles("mediaLoader")}>loading...</div>,
      title: "...",
      description: "...",
    };
  };

  const { media, title, description } = getContent();
  return (
    <div {...getStyles("fullPage")}>
      <div {...getStyles("fullMediaWrapper")}>{media}</div>
      <div {...getStyles("fullItemInfo")}>
        <div {...getStyles("fullTitle")}>{title}</div>
        <div {...getStyles("fullDescription")}>{description}</div>
        <div>
          <div {...getStyles("fullLabel")}>{getString("CREATOR")}</div>
          {data ? (
            <div {...getStyles("fullOwnerAddress")}>
              <AddressView address={data.nft.creator.id} />
            </div>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
};
