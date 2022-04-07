import { Fragment, useContext } from "react";

import { NFTDataContext } from "../context/NFTDataContext";
import { AddressView } from "../components/AddressView";
import { useMediaContext } from "../context/useMediaContext";
import type { StyleProps } from "../utils/StyleTypes";

type MediaInfoProps = {
  a11yIdPrefix?: string;
} & StyleProps;

export const MediaInfo = ({ a11yIdPrefix, className }: MediaInfoProps) => {
  const { getStyles, getString, style } = useMediaContext();
  const { data } = useContext(NFTDataContext);

  const getContent = () => {
    if (data?.metadata) {
      return {
        title: data.metadata.name,
        description: data.metadata.description,
      };
    }
    return {
      title: "...",
      description: "...",
    };
  };

  const { title, description } = getContent();
  return (
    <div {...getStyles("fullItemInfo", className)}>
      <h2 {...getStyles("fullTitle")}>{title}</h2>
      <div id={`${a11yIdPrefix}description`} {...getStyles("fullDescription")}>
        {description}
      </div>
      {!style.theme.showCreator && !style.theme.showOwner ? (
        <Fragment />
      ) : (
        <dl {...getStyles("fullCreatorOwnerSection")}>
          {data?.nft?.minted.address && style.theme.showCreator && (
            <Fragment>
              <dt {...getStyles("fullLabel")}>{getString("CREATOR")}</dt>
              <dd {...getStyles("fullOwnerAddress")}>
                <AddressView address={data.nft.minted.address} />
              </dd>
            </Fragment>
          )}
          {data?.nft?.owner && style.theme.showOwner && (
            <Fragment>
              <dt {...getStyles("fullLabel")}>{getString("OWNER")}</dt>
              <dd {...getStyles("fullOwnerAddress")}>
                <AddressView address={data.nft.owner.address} />
              </dd>
            </Fragment>
          )}
        </dl>
      )}
    </div>
  );
};
