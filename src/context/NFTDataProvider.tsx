import { useNFT } from "@zoralabs/nft-hooks";

import { NFTDataContext } from "./NFTDataContext";

export type NFTDataProviderProps = {
  id: string;
  contract: string;
  children: React.ReactNode;
  options?: any;
  marketOptions?: any;
};

export const NFTDataProvider = ({
  id,
  children,
  contract,
  options = {},
  marketOptions = {},
}: NFTDataProviderProps) => {
  const nft = useNFT(contract, id, options, marketOptions);

  return (
    <NFTDataContext.Provider value={nft}>{children}</NFTDataContext.Provider>
  );
};
