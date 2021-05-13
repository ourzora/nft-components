/** @jsx jsx */
import { jsx } from "@emotion/react";

export const Unknown = ({
  mimeType,
}: {
  mimeType: string;
}) => {
  return <div>{mimeType}</div>;
};
