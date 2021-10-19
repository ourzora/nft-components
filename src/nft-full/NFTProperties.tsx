import { Fragment, useContext } from "react";
import { useNFTMetadata } from "@zoralabs/nft-hooks";
import { useMediaContext } from "../context/useMediaContext";
import { NFTDataContext } from "../context/NFTDataContext";
import { InfoContainer } from "./InfoContainer";

export const NFTProperties = () => {
  const {
    nft: { data },
  } = useContext(NFTDataContext);
  const { metadata } = useNFTMetadata(data && data?.nft?.metadataURI);
  const { getStyles } = useMediaContext();

  const getContent = () => {
    console.log(metadata)
    console.log(data)
    
    if (data && "openseaInfo" in data) {
      return (
        <InfoContainer titleString={'PROPERTIES_TITLE'}>
          <div {...getStyles("propertiesGrid")}>
            {/* @ts-ignore */
              data?.openseaInfo?.traits && data?.openseaInfo?.traits.map((attribute: any, index: number) => {
              return (
                <div
                  {...getStyles("propertiesItem")}
                  key={`${data?.nft?.tokenId}${index}`}
                >
                  {attribute?.trait_type && <span {...getStyles("fullLabel")}>{attribute?.trait_type}</span>}
                  {attribute?.value && <span>{attribute?.value}</span>}
                </div>
              )
            })}
          </div>
        </InfoContainer>
      )
    } else {
      return <Fragment/>
    }
  };

  return data ? getContent() : null
};
