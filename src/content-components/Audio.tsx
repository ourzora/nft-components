import {
  Fragment,
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
  forwardRef,
} from "react";

import { useMediaContext } from "../context/useMediaContext";
import { useSyncRef } from "../utils/useSyncRef";
import { MediaRendererProps } from ".";

type FakeWaveformCanvasProps = {
  audioRef: any;
  setPlaying: (playing: boolean) => void;
};

const FakeWaveformCanvas = ({
  audioRef,
  setPlaying,
}: FakeWaveformCanvasProps) => {
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
        if (!audioRef.current.isPlaying) {
          audioRef.current.play();
        }
        setPlaying(true);
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

export const Audio = forwardRef<HTMLAudioElement, MediaRendererProps>(({
  objectProps: { onLoad, ...mediaObject },
  mediaLoaded,
}, ref) => {
  const { getStyles } = useMediaContext();
  const audioRef = useRef<HTMLAudioElement>(null);
  useSyncRef(audioRef, ref);
  const [playing, setPlaying] = useState<boolean>(false);
  const wrapper = useRef<HTMLDivElement>();

  const togglePlay: MouseEventHandler<HTMLAudioElement> = useCallback(
    (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      if (audioRef.current) {
        playing ? audioRef.current.pause() : audioRef.current.play();
        setPlaying(!playing);
      }
    },
    [audioRef, playing]
  );

  return (
    <div ref={wrapper} {...getStyles("mediaAudioWrapper")}>
      {mediaLoaded && (
        <Fragment>
          <button
            onClick={togglePlay}
            {...getStyles("mediaPlayButton", { playing })}
          >
            {playing ? "Pause" : "Play"}
          </button>
          <div {...getStyles("mediaAudioWaveform")}>
            <FakeWaveformCanvas audioRef={audioRef} setPlaying={setPlaying} />
          </div>
        </Fragment>
      )}
      <audio
        loop={true}
        ref={audioRef}
        style={{ display: "none" }}
        preload="auto"
        onLoadedData={onLoad}
        {...mediaObject}
      />
    </div>
  );
});
