import {
  Fragment,
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
  forwardRef,
} from "react";
import { useSyncRef } from "../utils/useSyncRef";
import { MediaLoader, useMediaObjectProps } from "./MediaLoader";
import {
  RenderComponentType,
  RendererConfig,
  RenderingPreference,
  RenderRequest,
} from "./RendererConfig";

type FakeWaveformCanvasProps = {
  audioRef: any;
};

const FakeWaveformCanvas = ({ audioRef }: FakeWaveformCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [width, setWidth] = useState<undefined | number>();
  const updateWidth = useCallback(() => {
    const newWidth =
      canvasRef.current?.parentElement?.getBoundingClientRect()?.width;
    if (newWidth && newWidth !== width) {
      setWidth(newWidth);
    }
  }, [canvasRef.current]);

  useEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, [updateWidth]);

  useEffect(() => {
    updateCanvasLines();
    const updateInterval = setInterval(updateCanvasLines, 1000);
    return () => clearInterval(updateInterval);
  }, [width]);

  const seekAudio: MouseEventHandler<HTMLCanvasElement> = useCallback(
    (evt) => {
      if (audioRef.current && canvasRef.current && width) {
        const position =
          (evt.clientX - canvasRef.current.getBoundingClientRect().left) /
          width;
        audioRef.current.currentTime = position * audioRef.current.duration;
        audioRef.current.play();
        updateCanvasLines();
      }
    },
    [audioRef.current, width]
  );

  const height = 200;
  const updateCanvasLines = useCallback(() => {
    if (canvasRef.current && width && audioRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (!context) {
        return;
      }
      context.clearRect(0, 0, width, height);

      for (let i = 0; i < width; i += 5) {
        const sinRnd = Math.sin(i) * 10000;
        const lineHeight = Math.floor(
          Math.min(
            Math.sin((i / width) * 0.2) +
              2 * (sinRnd - Math.floor(sinRnd)) * 40,
            height
          )
        );
        if (
          audioRef.current.currentTime / audioRef.current.duration >
          i / width
        ) {
          context.fillStyle = "#333";
        } else {
          context.fillStyle = "#999";
        }
        context.fillRect(i, (height - lineHeight) / 2, 2, lineHeight);
      }
    }
  }, [canvasRef.current, audioRef.current, width]);

  return (
    <canvas ref={canvasRef} height={height} width={width} onClick={seekAudio} />
  );
};

export const AudioRenderer = forwardRef<HTMLAudioElement, RenderComponentType>(
  ({ request, getStyles, a11yIdPrefix }, ref) => {
    const { props, loading, error } = useMediaObjectProps(
      request.media.content?.uri || request.media.animation?.uri,
      request,
      a11yIdPrefix
    );

    const audioRef = useRef<HTMLAudioElement>(null);
    useSyncRef(audioRef, ref);
    const [playing, setPlaying] = useState<boolean>(false);
    const wrapper = useRef<HTMLDivElement>();

    const togglePlay: MouseEventHandler<HTMLAudioElement> = useCallback(
      (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        if (audioRef.current) {
          if (playing) {
            audioRef.current.pause();
          } else {
            audioRef.current.play();
          }
        }
      },
      [audioRef.current, playing]
    );

    useEffect(() => {
      if (!audioRef.current) {
        return;
      }
      if (playing) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }, [audioRef.current, playing]);

    const playingText = playing ? "Pause" : "Play";

    return (
      <MediaLoader loading={loading} error={error}>
        <div ref={wrapper} {...getStyles("mediaAudioWrapper")}>
          {!loading && (
            <Fragment>
              <button
                aria-live="polite"
                onClick={togglePlay}
                title={playingText}
                {...getStyles("mediaPlayButton", { playing })}
              >
                {playingText}
              </button>
              <div {...getStyles("mediaAudioWaveform")}>
                <FakeWaveformCanvas audioRef={audioRef} />
              </div>
            </Fragment>
          )}
          <audio
            loop={true}
            ref={audioRef}
            preload="auto"
            playsInline
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            {...props}
            onLoadedData={props.onLoad}
            onCanPlayThrough={props.onLoad}
            onLoad={undefined}
          />
        </div>
      </MediaLoader>
    );
  }
);

export const Audio: RendererConfig = {
  getRenderingPreference(request: RenderRequest) {
    if (request.media.content?.type?.startsWith("audio")) {
      return RenderingPreference.PRIORITY;
    }
    if (request.media.animation?.type?.startsWith("audio")) {
      return RenderingPreference.PRIORITY;
    }
    return RenderingPreference.INVALID;
  },
  render: AudioRenderer,
};
