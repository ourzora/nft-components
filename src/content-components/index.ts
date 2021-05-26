import { Text } from "./Text";
import { LoadingError } from "./LoadingError";
import { Image } from "./Image";
import { Video } from "./Video";
import { Audio } from "./Audio";
import { Unknown } from "./Unknown";
import { useNFTContentType } from "@zoralabs/nft-hooks";

export type MediaRendererProps = {
  objectProps: {
    className: string;
    src: string;
    alt: string;
    onError: () => void;
    onLoad: () => void;
  };
  media: useNFTContentType["content"];
  mediaLoaded: boolean;
};

export type MediaRendererComponent = (
  mediaProps: MediaRendererProps
) => JSX.Element;

export type RendererRecord = {
  renderer: MediaRendererComponent;
  hasLoader?: boolean;
};
export type MediaRenderersType = Record<string, RendererRecord>;

// Standard is (text/uri/unknown):(mime type partial)
// Records are sorted from most to least specific mime type when matching
export const DefaultMediaRenderers: MediaRenderersType = {
  "text:": {
    renderer: Text,
    hasLoader: false,
  },
  error: {
    renderer: LoadingError,
    hasLoader: false,
  },
  unknown: {
    renderer: Unknown,
    hasLoader: false,
  },
  "uri:image": {
    renderer: Image,
    hasLoader: true,
  },
  "uri:video": {
    renderer: Video,
    hasLoader: true,
  },
  "uri:audio": {
    renderer: Audio,
    hasLoader: true,
  },
};
