import { useCallback, useRef, useState } from "react";

import { useMediaContext } from "../context/useMediaContext";
import { MediaRendererProps } from ".";

export const Audio = ({
  objectProps: { onLoad, ...mediaObject },
  mediaLoaded,
}: MediaRendererProps) => {
  const { getStyles } = useMediaContext();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState<boolean>(false);
  const togglePlay = useCallback(
    (evt: React.MouseEvent<HTMLAudioElement>) => {
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
    <div {...getStyles("mediaAudioWrapper")}>
      {mediaLoaded && (
        <button
          onClick={togglePlay}
          {...getStyles("mediaAudioButton", { playing })}
        >
          {playing ? "Pause" : "Play"}
        </button>
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
};
