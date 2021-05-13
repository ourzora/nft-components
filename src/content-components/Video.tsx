/** @jsx jsx */
import { jsx } from "@emotion/react";

import { MediaObject } from "../components/MediaObject";

export const Video = ({
  mediaObject: { onLoad, ...mediaObject },
}: {
  mediaObject: MediaObject;
}) => {
  return (
    <video
      preload="metadata"
      autoPlay={true}
      loop={true}
      muted={true}
      {...mediaObject}
      onLoadedData={onLoad}
    ></video>
  );
};
