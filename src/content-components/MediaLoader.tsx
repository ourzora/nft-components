import React, { useState } from "react";
import { useMediaContext } from "../context/useMediaContext";
import { RenderRequest } from "./RendererConfig";

export function useMediaObjectProps(
  uri: string | undefined,
  request: RenderRequest,
  a11yIdPrefix?: string
) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const { getStyles } = useMediaContext();

  return {
    loading,
    error,
    props: {
      "aria-describedby": `${a11yIdPrefix}description`,
      alt: request.metadata.name || request.metadata.description,
      onLoad: () => setLoading(false),
      // TODO(iain): Update Error
      onError: () => setError("Error loading"),
      src: uri,
      ...getStyles("mediaObject", {
        mediaLoaded: !loading,
        isFullPage: request.renderingContext === "FULL",
      }),
    },
  };
}

export const MediaLoader = ({
  children,
  loading,
  error,
}: {
  children: React.ReactNode;
  loading: boolean;
  error: string | undefined;
}) => {
  const { getStyles } = useMediaContext();

  if (!loading && !error) {
    return <React.Fragment>{children}</React.Fragment>;
  }
  if (error) {
    return (
      <React.Fragment>
        <span {...getStyles("mediaObjectMessage")}>Error loading content</span>
        {children}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <span {...getStyles("mediaLoader")}>Loading...</span>
      {children}
    </React.Fragment>
  );
};
