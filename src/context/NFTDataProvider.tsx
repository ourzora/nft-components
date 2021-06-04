import React from "react";
import {
  DataTransformers,
  useNFT,
  useNFTType,
  useNFTMetadataType,
} from "@zoralabs/nft-hooks";

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
    loading: !!nft.data,
    metadata: nft.data ? DataTransformers.openseaDataToMetadata(nft.data) : undefined,
  };

  return (
    <NFTDataContext.Provider value={{ nft, metadata }}>
      {children}
    </NFTDataContext.Provider>
  );
};
