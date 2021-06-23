import React from "react";
import { useMediaContext } from "src/context/useMediaContext";

export enum RenderingPreference {
  INVALID = -1,
  FALLBACK = 0,
  LOW = 1,
  NORMAL = 2,
  PRIORITY = 3,
}

export type MediaUriType = {
  uri: string;
  type?: string;
};

export type RenderRequest = {
  media: {
    // from zora content uri
    content?: MediaUriType;
    image?: MediaUriType;
    // from metadata.animation_url
    animation?: MediaUriType;
  };
  metadata: any;
  renderingContext: "PREVIEW" | "FULL";
};

export type RenderComponentType = {
  request: RenderRequest;
  getString: any;
  getStyles: any;
};

export interface RendererConfig {
  getRenderingPreference(request: RenderRequest): RenderingPreference;
  render: React.FunctionComponent<RenderComponentType>;
}

// export class Audio extends RendererConfig {
//   getRenderingPreference(request: RenderRequest) {
//     if (request.media.content?.type?.startsWith("audio")) {
//       return RenderingPreference.PRIORITY;
//     }
//     if (request.media.animation?.type?.startsWith("audio")) {
//       return RenderingPreference.PRIORITY;
//     }
//     return RenderingPreference.INVALID;
//   }
//   render() {
//     return [];
//   }
// }
