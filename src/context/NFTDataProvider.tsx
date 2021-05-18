import React from "react";
import {
  useNFT,
  useNFTMetadata,
  useNFTType,
  useNFTMetadataType,
} from "@zoralabs/nft-hooks";

type NFTDataProviderProps = {
  id: string;
  children: React.ReactNode;
  initialData?: {
    nft?: useNFTType["data"];
    metadata?: useNFTMetadataType["metadata"];
  };
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

export const NFTDataProvider = ({
  id,
  children,
  initialData,
}: NFTDataProviderProps) => {
  const { nft: nftInitial, metadata: metadataInitial } = initialData || {};
  const nft = useNFT(id, { loadCurrencyInfo: true, initialData: nftInitial });
  const metadata = useNFTMetadata(nft.data?.nft.metadataURI, metadataInitial);

  return (
    <NFTDataContext.Provider value={{ nft, metadata }}>
      {children}
    </NFTDataContext.Provider>
  );
};
