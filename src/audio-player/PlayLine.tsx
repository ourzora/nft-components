const PlayLine = (props: any) => {
  const { trackProgress, trackDuration } = props;
  const currentPercentage = trackDuration
    ? `${(trackProgress / trackDuration) * 100}%`
    : "0%";
  const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #39393F), color-stop(${currentPercentage}, #D6C7C0))
  `;

  return (
    <input
      type="range"
      value={trackProgress}
      step="1"
      min="0"
      max={trackDuration ? trackDuration : `${trackDuration}`}
      // readOnly={true}
      // onChange={(e) => onScrub(e.target.value)}
      // onMouseUp={onScrubEnd}
      // onKeyUp={onScrubEnd}
      className="h-[6px] p-0 w-full rounded-none bg-background-dark  cursor-pointer mb-4 webkitNone playLine"
      style={{ background: trackStyling }}
    />
  );
};

export default PlayLine;
