import { useNFTContentType } from "@zoralabs/nft-hooks";
import { useMediaContext } from "../context/useMediaContext";

export const Text = ({ media }: { media: useNFTContentType["content"] }) => {
  const { getStyles } = useMediaContext();
  return (
    <div {...getStyles("mediaContentText")}>
      {media?.type === "text" ? media.text : ""}
    </div>
  );
};
