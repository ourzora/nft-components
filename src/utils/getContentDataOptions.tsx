import type { NFTObject } from "@zoralabs/nft-hooks";

export const defaultGetContentData = (nft: NFTObject) => {
  return {
    contentURI: nft.nft?.contentURI as string,
    metadata: nft.metadata,
  };
};

export type GetContentDataType = {
  getContentData?: (
    nft: NFTObject,
  ) => { contentURI?: string, metadata?: any };
};