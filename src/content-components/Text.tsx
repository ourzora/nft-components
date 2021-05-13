/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useMediaContext } from "../context/useMediaContext";

export const Text = ({
  content,
}: {
  content: string;
}) => {
  const { getStyles } = useMediaContext();
  return <div {...getStyles("mediaContentText")}>{content}</div>;
};
