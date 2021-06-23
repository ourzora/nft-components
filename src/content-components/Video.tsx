import { forwardRef, useCallback, useRef, useState } from "react";
import { MediaLoader, useMediaObjectProps } from "./MediaLoader";
import {
  RenderComponentType,
  RendererConfig,
  RenderingPreference,
  RenderRequest,
} from "./RendererConfig";

import { useSyncRef } from "../utils/useSyncRef";

export const VideoRenderer = forwardRef<HTMLVideoElement, RenderComponentType>(
  ({ getStyles, request }, ref) => {
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const video = useRef<HTMLVideoElement>(null);

    const uri =
      request.renderingContext === "FULL"
        ? request.media.animation?.uri || request.media.content?.uri
        : request.media.content?.uri || request.media.animation?.uri;

    const { props, loading, error } = useMediaObjectProps(uri, request);

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
      const elem = video.current;
      if (elem && elem.requestFullscreen) {
        elem.muted = false;
        setIsMuted(false);
        return elem.requestFullscreen();
      }
      return;
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
      <MediaLoader loading={loading} error={error}>
        {video.current && (
          <div
            {...getStyles("mediaVideoControls", {
              isFullPage: request.renderingContext === "FULL",
            })}
          >
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
          onLoadedData={props.onLoad}
        ></video>
      </MediaLoader>
    );
  }
);

export const Video: RendererConfig = {
  getRenderingPreference: (request: RenderRequest) => {
    if (request.media.animation?.type?.startsWith("video/")) {
      return RenderingPreference.PRIORITY;
    }
    if (request.media.content?.type?.startsWith("video/")) {
      return RenderingPreference.PRIORITY;
    }
    return RenderingPreference.INVALID;
  },
  render: VideoRenderer,
};
