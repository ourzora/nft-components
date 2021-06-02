import { forwardRef, Fragment, useCallback, useRef, useState } from "react";

import { useSyncRef } from "../utils/useSyncRef";
import { MediaRendererProps } from ".";
import { useMediaContext } from "../context/useMediaContext";

export const Video = forwardRef<HTMLVideoElement, MediaRendererProps>(
  ({ objectProps: { onLoad, ...props }, isFullPage }, ref) => {
    const { getStyles } = useMediaContext();
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const video = useRef<HTMLVideoElement>(null);
    useSyncRef(video, ref);

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

    const openFullscreen = useCallback(() => {
      const elem = video.current
      if (elem && elem.requestFullscreen) {
        elem.muted = false
        setIsMuted(false);
        return elem.requestFullscreen()
      }
      return
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

    const playLoop = useCallback(() => {
      if (!video.current) {
        return;
      }
      video.current.currentTime = 0;
    }, [video.current]);

    return (
      <Fragment>
        {video.current && (
          <div {...getStyles("mediaVideoControls", { isFullPage })}>
            <button
              {...getStyles("mediaFullscreenButton", { muted: isMuted })}
              onClick={openFullscreen}
            >
              {isMuted ? "Unmute" : "Mute"}
            </button>
            <button
              {...getStyles("mediaPlayButton", { playing: isPlaying })}
              onClick={togglePlay}
            >
              {isPlaying ? "Play" : "Pause"}
            </button>
            <button
              {...getStyles("mediaMuteButton", { muted: isMuted })}
              onClick={toggleMute}
            >
              {isMuted ? "Unmute" : "Mute"}
            </button>
          </div>
        )}
        <video
          preload="metadata"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          {...props}
          ref={video}
          onEnded={playLoop}
          onLoadedData={onLoad}
        ></video>
      </Fragment>
    );
  }
);
