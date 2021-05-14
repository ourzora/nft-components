import React from "react";
import { useNFT, useNFTMetadata } from "@zoralabs/nft-hooks";
import { useNFTType } from "@zoralabs/nft-hooks/dist/src/hooks/useNFT";
import { useNFTMetadataType } from "@zoralabs/nft-hooks/dist/src/hooks/useNFTMetadata";

type NFTDataProviderProps = {
  id: string;
  children: React.ReactNode;
};

type NFTDataContext = {
  nft: useNFTType;
  metadata: useNFTMetadataType;
};

const DEFAULT_OBJECT = {
  loading: true,
  error: undefined,
};

export const NFTDataContext = React.createContext<NFTDataContext>({
  nft: { ...DEFAULT_OBJECT, currencyLoaded: false },
  metadata: { ...DEFAULT_OBJECT, metadata: undefined },
});

export const NFTDataProvider = ({ id, children }: NFTDataProviderProps) => {
  const nft = useNFT(id, true);
  const metadata = useNFTMetadata(nft.data?.nft.metadataURI);

  return (
    <NFTDataContext.Provider value={{ nft, metadata }}>
      {children}
    </NFTDataContext.Provider>
  );
};
