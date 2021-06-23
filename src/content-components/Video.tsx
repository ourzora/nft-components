import {
  forwardRef,
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { useSyncRef } from "../utils/useSyncRef";
import { MediaRendererProps } from ".";
import { useMediaContext } from "../context/useMediaContext";
import { useA11yIdPrefix } from "../utils/useA11yIdPrefix";

export const Video = forwardRef<HTMLVideoElement, MediaRendererProps>(
  ({ objectProps: { onLoad, ...props }, isFullPage }, ref) => {
    const { getString, getStyles } = useMediaContext();
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const video = useRef<HTMLVideoElement>(null);

    const controlAriaId = useA11yIdPrefix("video-renderer");

    useSyncRef(video, ref);

    useEffect(() => {
      const fullScreenCallback = () => {
        setIsFullScreen(!!document.fullscreenElement);
      };
      document.addEventListener("fullscreenchange", fullScreenCallback);
      return () => {
        document.removeEventListener("fullscreenchange", fullScreenCallback);
      };
    }, []);

    const togglePlay = useCallback(() => {
      if (!video.current) {
        return;
      }
      if (video.current.paused) {
        video.current.play();
      } else {
        video.current?.pause();
      }
    }, [video]);

    const openFullscreen = useCallback(() => {
      const elem = video.current;
      if (elem && elem.requestFullscreen) {
        setIsMuted(false);
        return elem.requestFullscreen();
      }

      // Thank Apple for this one :(. Needed for iOS
      // @ts-ignore
      if (elem && elem.webkitSetPresentationMode) {
        setIsMuted(false);
        // @ts-ignore
        return elem.webkitSetPresentationMode("fullscreen");
      }
      return;
    }, [video]);

    const onCanPlay = useCallback(() => {
      setIsPlaying(!video.current?.paused);
    }, []);

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

    const playingText = isPlaying
      ? getString("VIDEO_CONTROLS_PAUSE")
      : getString("VIDEO_CONTROLS_PLAY");

    return (
      <Fragment>
        {video.current && (
          <div
            aria-label={getString("VIDEO_CONTROLS_LABEL")}
            id={controlAriaId}
            tabIndex="0"
            // @ts-ignore Blur is kinda invalid but okay to be unsafe here.
            onMouseOut={(evt) => evt.target.blur()}
            {...getStyles("mediaVideoControls", { isFullPage })}
          >
            <button
              {...getStyles("mediaFullscreenButton")}
              aria-pressed={isFullScreen ? "true" : "false"}
              onClick={openFullscreen}
              title={getString("VIDEO_CONTROLS_FULLSCREEN")}
            >
              {getString("VIDEO_CONTROLS_FULLSCREEN")}
            </button>
            <button
              {...getStyles("mediaPlayButton", { playing: isPlaying })}
              aria-live="polite"
              onClick={togglePlay}
              title={playingText}
            >
              {playingText}
            </button>
            <button
              {...getStyles("mediaMuteButton", { muted: isMuted })}
              onClick={toggleMute}
              aria-pressed={isMuted ? "false" : "true"}
            >
              {getString("VIDEO_CONTROLS_MUTE")}
            </button>
          </div>
        )}
        <video
          {...props}
          aria-controls={controlAriaId}
          autoPlay
          controls={isFullScreen}
          loop
          muted={isMuted}
          onCanPlayThrough={onCanPlay}
          onEnded={playLoop}
          onLoadedData={onLoad}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          playsInline
          preload="metadata"
          ref={video}
        ></video>
      </Fragment>
    );
  }
);
