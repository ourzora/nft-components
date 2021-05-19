import {
  NFTDataProvider,
  NFTDataProviderProps,
} from "../context/NFTDataProvider";

export type NFTPageWrapperProps = NFTDataProviderProps;

export const NFTPageWrapper = ({
  id,
  initialData,
  children,
}: NFTDataProviderProps) => {
  return (
    <NFTDataProvider id={id} initialData={initialData}>
      {children}
    </NFTDataProvider>
  );

};
