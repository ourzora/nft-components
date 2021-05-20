import { MediaObjectProps } from ".";

export const Video = ({
  objectProps: { onLoad, ...props },
}: MediaObjectProps) => {
  return (
    <video
      preload="metadata"
      autoPlay={true}
      loop={true}
      muted={true}
      {...props}
      onLoadedData={onLoad}
    ></video>
  );
};
