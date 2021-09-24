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

function getMediaDimensions(uri: string | undefined, request: any) {

  const returnMediaType = () => {
    if (request.image !== undefined) {
      return 'image'
    } else if (request.animation !== undefined) {
      return 'video'
    } else if (request.content !== undefined) {
      console.log(request.content.type)
      return request.content.type.split('/')[0]
    } else {
      return null
    }
  }

  if (returnMediaType() === 'image' && uri !== undefined) {
    const image = new Image()
          image.src = uri ? getNormalizedURI(uri) : uri
    
    return {
      height: image.naturalHeight,
      width: image.naturalWidth
    }
  } else {
    return null
  }
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
  const [mediaDimensions, setMediaDimensions] = useState<any>(null)

  return {
    loading,
    error,
    props: {
      "aria-describedby": `${a11yIdPrefix}description`,
      alt: request.metadata.name || request.metadata.description,
      /* TODO(dain): 
        Want to add an inline style tag to the parent div of the image or video that sets a css variable for the aspect ratio:

        <div class="zora-cardMediaWrapper" style="--proportion: calc(dimensions.height / dimensions.width);">
          <img>
        </div>

        this variable can then be referenced in the .zora-cardMediaWrapper selector rules.

        .zora-cardMediaWrapper {
          width: 100%;
          height: 0;
          overflow-y: visible;
          padding-bottom: var(--proportion);
        }

      */
      dimensions: mediaDimensions,
      onLoad: () => {
        setLoading(false)
        setMediaDimensions(getMediaDimensions(uri, request.media))
      },
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
