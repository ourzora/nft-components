import { useState, useCallback, Fragment } from "react";
import { useNFTContent } from "@zoralabs/nft-hooks";

import { useMediaContext } from "../context/useMediaContext";

// MediaTypes
import { Video } from "../content-components/Video";
import { Image } from "../content-components/Image";
import { Audio } from "../content-components/Audio";
import { Text } from "../content-components/Text";
import { Unknown } from "../content-components/Unknown";

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

export type MediaObject = {
  css: any;
  className: string;
  src: string;
  alt: string;
  onError: () => void;
  onLoad: () => void;
};


export const MediaObject = ({
  uri,
  metadata,
  isFullPage = false,
}: MediaObjectProps) => {
  const { content } = useNFTContent(uri, metadata.mimeType);
  const { getStyles } = useMediaContext();

  const [mediaError, setMediaErrorMessage] = useState<undefined | string>();
  const [mediaLoaded, setMediaLoaded] = useState<boolean>(false);
  const setMediaError = useCallback((error) => {
    setMediaErrorMessage(error.description || "Error loading content");
  }, []);

  const getMediaObjectTag = () => {
    if (!content) {
      return {
        hasLoader: false,
        mediaTag: <span {...getStyles("mediaObjectMessage")}>Loading</span>,
      };
    }

    if (content.type === "text") {
      return { hasLoader: false, mediaTag: <Text content={content.text} /> };
    }

    if (mediaError) {
      return {
        hasLoader: false,
        mediaTag: (
          <span {...getStyles("mediaObjectMessage")}>
            Error loading content
          </span>
        ),
      };
    }

    const mediaObject: MediaObject = {
      ...getStyles("mediaObject", { mediaLoaded, isFullPage }),
      src: uri,
      alt: metadata.description,
      onError: setMediaError,
      onLoad: () => setMediaLoaded(true),
    };

    if (metadata.mimeType.startsWith("image/")) {
      return { hasLoader: true, mediaTag: <Image mediaObject={mediaObject} /> };
    }

    if (metadata.mimeType.startsWith("video/")) {
      return { hasLoader: true, mediaTag: <Video mediaObject={mediaObject} /> };
    }

    if (metadata.mimeType.startsWith("audio/")) {
      return {
        hasLoader: true,
        mediaTag: <Audio mediaObject={mediaObject} mediaLoaded={mediaLoaded} />,
      };
    }

    return {
      hasLoader: false,
      mediaTag: <Unknown mimeType={metadata.mimeType} />,
    };
  };

  const { hasLoader, mediaTag } = getMediaObjectTag();
  return (
    <Fragment>
      {mediaTag}
      {hasLoader && (
        <div {...getStyles("mediaLoader", { mediaLoaded })}>
          <span>Loading...</span>
        </div>
      )}
    </Fragment>
  );
};
