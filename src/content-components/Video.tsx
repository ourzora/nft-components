import { Fragment, useCallback, useRef, useState } from "react";
import { MediaRendererProps } from ".";

export const Video = ({
  objectProps: { onLoad, ...props },
}: MediaRendererProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const video = useRef<HTMLVideoElement>(null);

  const togglePlay = useCallback(() => {
    if (!video.current) {
      return;
    }
    if (video.current.paused) {
      setIsPlaying(true);
      video.current.play();
    } else {
      setIsPlaying(false);
      video.current?.pause();
    }
  }, [video]);

  const toggleMute = useCallback(() => {
    if (!video.current) {
      return;
    }
    if (video.current.muted) {
      setIsMuted(false);
    } else {
      setIsMuted(true);
    }
  }, [video]);

  return (
    <Fragment>
      {video.current && (
        <div>
          <button onClick={togglePlay}>{isPlaying ? "Play" : "Pause"}</button>
          <button onClick={toggleMute}>{isMuted ? "Unmute" : "Mute"}</button>
        </div>
      )}
      <video
        preload="metadata"
        autoPlay={true}
        loop={true}
        muted={isMuted}
        {...props}
        onLoadedData={onLoad}
      ></video>
    </Fragment>
  );
};
