/** @jsx jsx */
import { jsx } from "@emotion/react";

import { MediaObject } from "../components/MediaObject";

export const Audio = ({ mediaObject }: { mediaObject: MediaObject }) => {
  return <audio {...mediaObject} controls={true} />;
};
