import { useCallback, useEffect, useState, Fragment } from "react";

export type CountdownDisplayProps = {
  from?: number | string;
  to: number | string;
};

function getNumber(time: number | string) {
  if (typeof time === "string") {
    return parseInt(time, 10);
  }
  return time;
}

// Counts down, does not support negative values
export const CountdownDisplay = (props: CountdownDisplayProps) => {
  const getTimeLeft = (to: number, from: number) => {
    if (!from) {
      return null;
    }
    const difference = to - from;
    const duration = difference > 0 ? difference : 0;

    return {
      d: Math.floor(duration / (3600 * 24)),
      h: Math.floor(duration / 3600) % 24,
      m: Math.floor((duration / 60) % 60),
      s: Math.floor(duration % 60),
    };
  };
  const [timeLeft, setTimeLeft] = useState<{
    d: number;
    h: number;
    m: number;
    s: number;
  } | null>(
    getTimeLeft(
      getNumber(props.to),
      getNumber(
        props.from === undefined ? new Date().getTime() / 1000 : props.from
      )
    )
  );
  const updateTimeLeft = useCallback(() => {
    setTimeLeft(
      getTimeLeft(
        getNumber(props.to),
        getNumber(
          props.from === undefined ? new Date().getTime() / 1000 : props.from
        )
      )
    );
  }, [props.to, props.from]);

  useEffect(() => {
    const checkTimeout = setInterval(updateTimeLeft, 1000);
    return () => {
      clearInterval(checkTimeout);
    };
  }, []);

  if (!timeLeft) {
    return <Fragment />;
  }

  const timeString = [
    [timeLeft.d, "d"],
    [timeLeft.h, "h"],
    [timeLeft.m, "m"],
    [timeLeft.s, "s"],
  ]
    .filter((n) => n !== null)
    .reduce((lastString, [number, postfix]) => {
      if (!lastString.length && number === 0) {
        return "";
      }
      return `${lastString} ${number}${postfix}`;
    }, "");
  return <Fragment>{timeString}</Fragment>;
};
