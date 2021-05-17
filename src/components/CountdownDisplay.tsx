import React, { useCallback, useEffect, useState } from "react";

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

function padAndJoin(numbers: number[], join: string) {
  return numbers
    .map((number) => number.toString())
    .map((number) => (number.length === 1 ? `0${number}` : number))
    .join(join);
}

export const CountdownDisplay = (props: CountdownDisplayProps) => {
  const getTimeLeft = (to: number, from: number) => {
    if (!from) {
      return null;
    }
    return {
      d: Math.floor((to - from) / (3600 * 24)),
      h: Math.floor((to - from) / 3600) % 24,
      m: Math.floor(((to - from) / 60) % 60),
      s: Math.floor((to - from) % 60),
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
      getNumber(props.from || new Date().getTime() / 1000)
    )
  );
  const updateTimeLeft = useCallback(() => {
    setTimeLeft(
      getTimeLeft(
        getNumber(props.to),
        getNumber(props.from || new Date().getTime() / 1000)
      )
    );
  }, [props.to, props.from]);

  useEffect(() => {
    const checkTimeout = setInterval(updateTimeLeft, 1000);
    return () => {
      clearInterval(checkTimeout);
    };
  });
  return (
    <React.Fragment>
      {timeLeft &&
        `${timeLeft.d ? `${timeLeft.d} days ` : ""}${padAndJoin(
          [timeLeft.h, timeLeft.m, timeLeft.s],
          ":"
        )}`}
    </React.Fragment>
  );
};
