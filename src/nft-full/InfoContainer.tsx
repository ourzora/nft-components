/** @jsx jsx */
import { jsx } from "@emotion/react";
import React from "react";

import { Strings } from "../constants/strings";
import { useMediaContext } from "../context/useMediaContext";

type InfoContainerProps = {
  children: React.ReactNode;
  titleString: keyof typeof Strings;
};

export const InfoContainer = ({
  children,
  titleString,
}: InfoContainerProps) => {
  const { getStyles, getString } = useMediaContext();

  return (
    <div {...getStyles("fullProofAuthenticitySection")}>
      <div {...getStyles("fullLabel")}>{getString(titleString)}</div>
      {children}
    </div>
  );
};
