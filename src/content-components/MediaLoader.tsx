import React, { useState } from "react";
import type { RenderRequest } from "./RendererConfig";

function getNormalizedURI(uri: string) {
  if (uri.startsWith("ipfs://")) {
    return uri.replace("ipfs://", "https://ipfs.io/ipfs/");
  }
  if (uri.startsWith("arweave://")) {
    return uri.replace("arweave://", "https://arweave.net/");
  }
  return uri;
}

export function useMediaObjectProps({
  uri,
  request,
  a11yIdPrefix,
  getStyles,
}: {
  uri: string | undefined;
  request: RenderRequest;
  a11yIdPrefix?: string;
  getStyles: any;
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  return {
    loading,
    error,
    props: {
      "aria-describedby": `${a11yIdPrefix}description`,
      alt: request.metadata.name || request.metadata.description,
      onLoad: () => setLoading(false),
      // TODO(iain): Update Error
      onError: () => setError("Error loading"),
      src: uri ? getNormalizedURI(uri) : uri,
      ...getStyles("mediaObject", {
        mediaLoaded: !loading,
        isFullPage: request.renderingContext === "FULL"
      }),
    },
  };
}

export const MediaLoader = ({
  getStyles,
  children,
  loading,
  error,
}: {
  getStyles: any;
  children: React.ReactNode;
  loading: boolean;
  error: string | undefined;
}) => {
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
