import { MediaRendererProps } from ".";

export const Video = ({
  objectProps: { onLoad, ...props },
}: MediaRendererProps) => {
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
