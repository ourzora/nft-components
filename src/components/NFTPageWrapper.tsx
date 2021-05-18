import { NFTDataProvider } from "../context/NFTDataProvider";

export type NFTPageWrapperProps = {
  id: string;
  children: React.ReactNode;
};

export const NFTPageWrapper = ({ id, children }: NFTPageWrapperProps) => {
  return <NFTDataProvider id={id}>{children}</NFTDataProvider>;
};
