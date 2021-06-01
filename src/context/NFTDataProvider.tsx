import React from "react";
import { useNFT, useNFTType, useNFTMetadataType } from "@zoralabs/nft-hooks";

import { NFTDataContext } from "./NFTDataContext";

export type NFTDataProviderProps = {
  id: string;
  contract: string;
  children: React.ReactNode;
  initialData?: {
    nft?: useNFTType["data"];
    metadata?: useNFTMetadataType["metadata"];
  };
};

export const NFTDataProvider = ({
  id,
  children,
  contract,
  initialData,
}: NFTDataProviderProps) => {
  const { nft: nftInitial } = initialData || {};
  const nft = useNFT(contract, id, {
    loadCurrencyInfo: true,
    initialData: nftInitial,
  });
  const metadata = {
    loading: false,
    metadata: {
      name: nft.data?.openseaInfo.name,
      description: nft.data?.openseaInfo.description,
      image: nft.data?.openseaInfo.image_url,
      image_thumbnail_url: nft.data?.openseaInfo.image_thumbnail_url,
      animation_url: nft.data?.openseaInfo.animation_url,
    },
  };

  return (
    <NFTDataContext.Provider value={{ nft, metadata }}>
      {children}
    </NFTDataContext.Provider>
  );
};
