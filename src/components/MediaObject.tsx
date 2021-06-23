import { useState, useEffect } from "react";
import { useNFTContent } from "@zoralabs/nft-hooks";

import { useMediaContext } from "../context/useMediaContext";
import { MediaRendererDefaultTable } from "../content-components";
import {
  RendererConfig,
  RenderRequest,
} from "../content-components/RendererConfig";

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
  metadata: MetadataIsh;
  isFullPage?: boolean;
};

export const MediaObject = ({
  contentURI,
  metadata,
  isFullPage = false,
}: MediaObjectProps) => {
  const mediaType = useNFTContent(metadata.animation_url);
  const [renderingInfo, setRenderingInfo] = useState<RendererConfig>();
  const { getStyles, getString } = useMediaContext();

  const request: RenderRequest = {
    media: {
      // from zora content uri
      content: contentURI
        ? {
            uri: contentURI,
            // TODO(iain): Clean up for catalog.works
            type: metadata.mimeType || (metadata as any).body?.mimeType,
          }
        : undefined,
      image: metadata.image
        ? {
            uri: metadata.image,
            type: "image/",
          }
        : undefined,
      // from metadata.animation_url
      animation: metadata.animation_url
        ? {
            uri: metadata.animation_url,
            type: mediaType.content?.mimeType,
          }
        : undefined,
    },
    metadata,
    renderingContext: isFullPage ? "FULL" : "PREVIEW",
  };

  useEffect(() => {
    const sortedRenderers = MediaRendererDefaultTable.sort((a, b) =>
      a.getRenderingPreference(request) > b.getRenderingPreference(request)
        ? -1
        : 1
    );
    console.log(sortedRenderers);
    setRenderingInfo(sortedRenderers[0]);
  }, [metadata, contentURI, mediaType.content]);

  if (renderingInfo) {
    const RenderingComponent = renderingInfo.render;
    return (
      <RenderingComponent
        getStyles={getStyles}
        getString={getString}
        request={request}
      />
    );
  }

  return <span>hai</span>;
};
