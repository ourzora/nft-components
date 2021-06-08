import {
  ZNFTDataProvider,
  ZNFTDataProviderProps,
} from "../context/ZNFTDataProvider";
import { NFTDataProvider } from "../context/NFTDataProvider";

export type NFTPageWrapperProps = ZNFTDataProviderProps & {
  contract?: string;
};

export const NFTPageWrapper = ({
  id,
  contract,
  initialData,
  refreshInterval,
  children,
}: NFTPageWrapperProps) => {
  if (contract) {
    return (
      <NFTDataProvider
        id={id}
        contract={contract}
        initialData={initialData}
        refreshInterval={refreshInterval}
      >
        {children}
      </NFTDataProvider>
    );
  }
  return (
    <ZNFTDataProvider
      id={id}
      initialData={initialData}
      refreshInterval={refreshInterval}
    >
      {children}
    </ZNFTDataProvider>
  );
};
