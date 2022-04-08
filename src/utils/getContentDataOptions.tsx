import type { NFTObject } from "@zoralabs/nft-hooks";

export const defaultGetContentData = (nft: NFTObject) => {
  return {
    contentURI: nft.nft?.contentURI as string,
    metadata: nft.metadata,
    contract: nft.nft?.contract?.address,
    tokenId: nft.nft?.tokenId,
  };
};

export type GetContentDataType = {
  getContentData?: (nft: NFTObject) => {
    contentURI?: string;
    metadata?: any;
    contract?: any;
    tokenId?: any;
  };
};
