/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useContext } from "react";

import { NFTDataContext } from "../context/NFTDataProvider";
import { AddressView } from "../components/AddressView";
import { useMediaContext } from "../context/useMediaContext";

export const MediaInfo = () => {
  const { getStyles, getString } = useMediaContext();
  const {
    nft: { data },
    metadata: { metadata, error },
  } = useContext(NFTDataContext);

  const getContent = () => {
    if (metadata && data) {
      return {
        title: metadata.name,
        description: metadata.description,
      };
    }
    if (error) {
      return {
        title: "?",
        description: "?",
      };
    }
    return {
      title: "...",
      description: "...",
    };
  };

  const { title, description } = getContent();
  return (
    <div {...getStyles("fullItemInfo")}>
      <div {...getStyles("fullTitle")}>{title}</div>
      <div {...getStyles("fullDescription")}>{description}</div>
      <div {...getStyles("fullCreatorOwnerSection")}>
        <div {...getStyles("fullLabel")}>{getString("CREATOR")}</div>
        <div {...getStyles("fullOwnerAddress")}>
          {data ? <AddressView address={data.nft.creator.id} /> : " "}
        </div>
        <div {...getStyles("fullLabel")}>{getString("OWNER")}</div>
        <div {...getStyles("fullOwnerAddress")}>
          {data ? <AddressView address={data.nft.owner.id} /> : " "}
        </div>
      </div>
    </div>
  );
};
