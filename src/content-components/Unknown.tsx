import { useMediaContext } from "../context/useMediaContext";

export const Unknown = ({ mimeType }: { mimeType: string }) => {
  const { getStyles } = useMediaContext();
  return <div {...getStyles("mediaObjectMessage")}>{mimeType}</div>;
};
