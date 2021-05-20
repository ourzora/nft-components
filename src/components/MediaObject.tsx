import { useState, useCallback, Fragment } from "react";
import { useNFTContent } from "@zoralabs/nft-hooks";

import { useMediaContext } from "../context/useMediaContext";
import { MediaRendererProps, RendererRecord } from "../content-components";

type MetadataIsh = {
  mimeType: string;
  name: string;
  description: string;
};

type MediaObjectProps = {
  uri: string;
  metadata: MetadataIsh;
  isFullPage?: boolean;
};

export const MediaObject = ({
  uri,
  metadata,
  isFullPage = false,
}: MediaObjectProps) => {
  const { content } = useNFTContent(uri, metadata.mimeType);
  const { getStyles, mediaRenderers } = useMediaContext();

  const [mediaError, setMediaErrorMessage] = useState<undefined | string>();
  const [mediaLoaded, setMediaLoaded] = useState<boolean>(false);
  const setMediaError = useCallback((error) => {
    setMediaErrorMessage(error.description || "Error loading content");
  }, []);

  const getMediaObjectTag = () => {
    const renderMediaConfig = (mediaRenderer: RendererRecord) => {
      const mediaObject: MediaRendererProps = {
        objectProps: {
          ...getStyles("mediaObject", { mediaLoaded, isFullPage }),
          src: uri,
          alt: metadata.description,
          onError: setMediaError,
          onLoad: () => setMediaLoaded(true),
        },
        mediaLoaded,
        media: content,
      };

      const RendererComponent = mediaRenderer.renderer;
      return {
        hasLoader: mediaRenderer.hasLoader,
        mediaTag: <RendererComponent {...mediaObject} />,
      };
    };
    const handleMimePrefix = (prefix: string) => {
      const keysToMatch = Object.keys(mediaRenderers)
        .filter((renderKey) => renderKey.startsWith(prefix))
        .sort(([rendererKeyA, rendererKeyB]) =>
          rendererKeyA.length > rendererKeyB.length ? 1 : -1
        );
      const mediaRendererKey =
        keysToMatch.find((key) =>
          `${prefix}${content?.mimeType}`.startsWith(key)
        ) || "unknown";
      return mediaRenderers[mediaRendererKey];
    };

    // Returns in loading state
    if (!content) {
      return {
        hasLoader: true,
        mediaTag: null,
      };
    }

    // Handles text content types
    if (content.type === "text") {
      return renderMediaConfig(handleMimePrefix("text:"));
    }

    // Loading error rendering
    if (mediaError) {
      return renderMediaConfig(mediaRenderers["error"]);
    }

    // Render content with a URI
    return renderMediaConfig(handleMimePrefix("uri:"));
  };

  const { hasLoader, mediaTag } = getMediaObjectTag();
  return (
    <Fragment>
      {mediaTag}
      {hasLoader && (
        <div {...getStyles("mediaLoader", { mediaLoaded, isFullPage })}>
          <span>Loading...</span>
        </div>
      )}
    </Fragment>
  );
};
