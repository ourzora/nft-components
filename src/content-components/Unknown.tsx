import { MediaRendererProps } from ".";
import { useMediaContext } from "../context/useMediaContext";

export const Unknown = ({ media }: MediaRendererProps) => {
  const { getStyles } = useMediaContext();
  return <div {...getStyles("mediaObjectMessage")}>{media?.mimeType}</div>;
};
