import { useState, useCallback, Fragment } from "react";
import { useNFTContent } from "@zoralabs/nft-hooks";

import { useMediaContext } from "../context/useMediaContext";
import { MediaRendererProps, RendererRecord } from "../content-components";

type MetadataIsh = {
  mimeType: string;
  name: string;
  description: string;

  // Only used for non-zora NFTs
  animation_url?: string;
  image?: string;
};

type MediaObjectProps = {
  contentURI?: string;
  a11yIdPrefix?: string;
  metadata: MetadataIsh;
  isFullPage?: boolean;
};

export const MediaObject = ({
  contentURI,
  metadata,
  a11yIdPrefix,
  isFullPage = false,
}: MediaObjectProps) => {
  const [mediaError, setMediaErrorMessage] = useState<undefined | string>();
  const [mediaLoaded, setMediaLoaded] = useState<boolean>(false);
  const [firstLoadFailed, setFirstLoadFailed] = useState<boolean>(false);

  const setMediaError = useCallback((error) => {
    if (!firstLoadFailed) {
      setFirstLoadFailed(true);
      return;
    }
    setMediaErrorMessage(error.description || "Error loading content");
  }, []);
  const getURI = () => {
    if (contentURI) {
      if (firstLoadFailed) {
        return [contentURI, metadata.mimeType];
      }
      // Replace main fleek instance for zora instance only with Zora NFTs
      return [contentURI.replace("ipfs.fleek.co", "zora.fleek.co"), metadata.mimeType];
    }
    if (metadata.animation_url && !firstLoadFailed) {
      return [metadata.animation_url, 'video'];
    }
    if (metadata.image) {
      return [metadata.image, 'image'];
    }
    return [undefined, undefined];
  };
  const [uri, contentType] = getURI();
  const { content } = useNFTContent(uri, contentType);
  const { getStyles, mediaRenderers } = useMediaContext();

  const getMediaObjectTag = () => {
    const renderMediaConfig = (mediaRenderer: RendererRecord) => {
      const mediaObject: MediaRendererProps = {
        objectProps: {
          ...getStyles("mediaObject", { mediaLoaded, isFullPage }),
          src: uri,
          alt: metadata.name,
          'aria-describedby': a11yIdPrefix ?? `${a11yIdPrefix}description`,
          onError: setMediaError,
          onLoad: () => setMediaLoaded(true),
        },
        isFullPage,
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
