import React from "react";
import {
  DataTransformers,
  useNFT,
  useNFTType,
  useNFTMetadataType,
  useNFTMetadata,
} from "@zoralabs/nft-hooks";

import { NFTDataContext } from "./NFTDataContext";
import {
  OpenseaNFTDataType,
  ZNFTDataType,
} from "@zoralabs/nft-hooks/dist/fetcher/AuctionInfoTypes";

export type NFTDataProviderProps = {
  id: string;
  contract: string;
  refreshInterval?: number;
  children: React.ReactNode;
  initialData?: {
    nft?: useNFTType["data"];
    metadata?: useNFTMetadataType["metadata"];
  };
};

let isZNFT = (p: any): p is ZNFTDataType => p && !!p.zoraNFT;
let isOpensea = (p: any): p is OpenseaNFTDataType => p && !!p.openseaInfo;

export const NFTDataProvider = ({
  id,
  children,
  contract,
  refreshInterval,
  initialData,
}: NFTDataProviderProps) => {
  const { nft: nftInitial } = initialData || {};
  const nft = useNFT(contract, id, {
    loadCurrencyInfo: true,
    initialData: nftInitial,
    refreshInterval: refreshInterval,
  });
  const fetchedMetadata = useNFTMetadata(
    isZNFT(nft.data) ? nft.data?.nft.metadataURI : undefined,
    initialData?.metadata
  );
  const openseaMetadata = isOpensea(nft.data)
    ? {
        loading: !!nft.data,
        metadata: nft.data
          ? DataTransformers.openseaDataToMetadata(nft.data)
          : undefined,
      }
    : undefined;

  const metadata = openseaMetadata || fetchedMetadata;

  return (
    <NFTDataContext.Provider value={{ nft, metadata }}>
      {children}
    </NFTDataContext.Provider>
  );
};
