import type { NFTObject } from "@zoralabs/nft-hooks";
import React, { Fragment, useContext } from "react";

import { NFTDataContext } from "../context/NFTDataContext";
import {
  MEDIA_URL_BASE_BY_NETWORK,
  VIEW_ETHERSCAN_URL_BASE_BY_NETWORK,
} from "../constants/media-urls";
import { useMediaContext } from "../context/useMediaContext";
import { InfoContainer } from "./InfoContainer";
import type { StyleProps } from "../utils/StyleTypes";

const ProofLink = ({
  href,
  children,
  styles,
}: {
  href?: string;
  children: string;
  styles: any;
}) => (
  <a {...styles} href={href} target="_blank" rel="noreferrer">
    {children}
  </a>
);

export const ProofAuthenticity = ({ className }: StyleProps) => {
  const { data } = useContext(NFTDataContext);
  const { getString, getStyles, networkId } = useMediaContext();
  const linkStyles = getStyles("fullProofLink");

  const getContent = (nft: NFTObject) => {
    const infoURL = data?.nft?.contentURI;
    const infoUrlLabelText =
      infoURL?.includes("/ipfs/") || infoURL?.startsWith("ipfs://")
        ? "VIEW_IPFS"
        : "VIEW_METADATA";

    if (!nft.nft) {
      return <Fragment />;
    }

    return (
      <React.Fragment>
        <ProofLink
          styles={linkStyles}
          href={`${VIEW_ETHERSCAN_URL_BASE_BY_NETWORK[networkId]}${nft.nft?.contract.address}?a=${nft.nft?.tokenId}`}
        >
          {getString("ETHERSCAN_TXN")}
        </ProofLink>
        {infoURL && (
          <ProofLink styles={linkStyles} href={infoURL}>
            {getString(infoUrlLabelText)}
          </ProofLink>
        )}
        {data?.nft &&
          (data.rawData["zora-indexer"] ||
            data.nft?.contract.knownContract === "zora") && (
            <ProofLink
              styles={linkStyles}
              href={`${MEDIA_URL_BASE_BY_NETWORK[networkId]}collections/${
                nft.nft!.contract.address
              }/${nft.nft!.tokenId}`}
            >
              {getString("VIEW_ZORA")}
            </ProofLink>
          )}
      </React.Fragment>
    );
  };

  return (
    <InfoContainer
      titleString="PROOF_AUTHENTICITY"
      bottomPadding={false}
      className={className}
    >
      <div {...getStyles("fullInfoProofAuthenticityContainer")}>
        {data && getContent(data)}
      </div>
    </InfoContainer>
  );
};
