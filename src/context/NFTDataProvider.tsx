import {
  useNFT,
  useNFTType,
  useNFTMetadataType,
} from "@zoralabs/nft-hooks";

import { NFTDataContext } from "./NFTDataContext";

export type NFTDataProviderProps = {
  id: string;
  contract?: string;
  useBetaIndexer?: boolean;
  refreshInterval?: number;
  children: React.ReactNode;
  initialData?:
    | {
        nft?: useNFTType["data"];
        metadata?: useNFTMetadataType["metadata"];
      }
    | any;
};

export const NFTDataProvider = ({
  id,
  children,
  contract,
  refreshInterval,
  initialData,
  useBetaIndexer = false,
}: NFTDataProviderProps) => {
  const { nft: nftInitial } = initialData || {};
  if (nftInitial?.tokenData && !useBetaIndexer) {
    throw new Error(
      "useBetaIndexer={true} prop on NFTFull/NFTDataProvider/NFTPreview required when using indexer-style initialData"
    );
  }

  const nft = useNFT(contract, id, {
    loadCurrencyInfo: true,
    initialData: nftInitial,
    refreshInterval: refreshInterval,
  });

  console.log({contract, id, nft});

  return (
    <NFTDataContext.Provider value={nft}>
      {children}
    </NFTDataContext.Provider>
  );
};
