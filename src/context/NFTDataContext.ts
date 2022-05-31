import { createContext } from "react";
import type {
  useNFTType,
} from "@zoralabs/nft-hooks";

export type NFTDataContext = useNFTType;


export const NFTDataContext = createContext<NFTDataContext>({
  data: undefined,
  currencyLoaded: false,
});
