import { useContext, useEffect, useState } from "react";
import {
  PlayerContext,
  DispatchPlayerContext,
} from "../context/player.context";
import {PauseIcon} from "./images/Pause";
import PlayIcon from "./images/Start";
import { PlayerActionType } from "../reducers/player.reducer";
import { useMediaContext } from "../context/useMediaContext";

type AudioPlayerProps = {
  audioSrc: string;
  callbackAfterPlay: () => void;
  mintButton?: any | object;
  crescendo?:object;
  stakeButton?: any;
  active: boolean;
  size: number;
  claimButton?: any | object;
};

const AudioPlayer = (props: AudioPlayerProps) => {
  const { audioSrc, callbackAfterPlay } = props;
  const { isPlaying, currentSongSrc } = useContext(PlayerContext);
  const playerDispatch = useContext(DispatchPlayerContext);
  const { getStyles } = useMediaContext();
  const [audio, setAudio] = useState(null as any);
  const [message, setMessage] = useState(false);

  const togglePlay = () => {
    playerDispatch({
      type: PlayerActionType.CHANGE_AUDIO_SRC,
      payload: audioSrc,
    });
    playerDispatch({ type: PlayerActionType.TOGGLE_PLAY });
    audio.play();
    callbackAfterPlay();
  };

  const togglePause = () => {
    if (isPlaying) {
      playerDispatch({ type: PlayerActionType.TOGGLE_PAUSE });
    }
    audio.pause();
  };

  const showMessage = () => {
    setMessage(!message);
  };

  useEffect(() => {
    setAudio(new Audio(audioSrc))
  },[audioSrc])

  return (
    <div>
      <div className="audio-player flex space-x-3 place-items-center mb-1">
        {props.active === true ? (
          isPlaying && audioSrc === currentSongSrc ? (
            <button {...getStyles("buttonTransparent")} onClick={togglePause}>
              <PauseIcon
                {...getStyles("playIcon")}
                width={props.size}
                height={props.size}
              />
            </button>
          ) : (
            <button {...getStyles("buttonTransparent")} onClick={togglePlay}>
              <PlayIcon
                {...getStyles("playIcon")}
                width={props.size}
                height={props.size}
              />
            </button>
          )
        ) : (
        <button className='relative' {...getStyles("buttonTransparent")} onClick={showMessage}>
          {message === true ?
          <div className="bg-background rounded-md text-sm absolute w-40 p-4 right-0 bottom-0 z-20 drop-shadow-md">
            This song has not been released to streaming platforms yet. Listening will begin 2 hours prior to mint!
          </div> : ""}
          <img height={56} width={56} src="./images/Start-Gray.png" /> 
        </button>
        )}

        {props.mintButton && props.mintButton}
        {props.stakeButton && props.stakeButton}
        {props.crescendo && props.crescendo}
        {props.claimButton && props.claimButton}
      </div>
    </div>
  );
};

export default AudioPlayer;
