import { forwardRef } from "react";
import { MediaLoader, useMediaObjectProps } from "./MediaLoader";
import {
  RenderComponentType,
  RendererConfig,
  RenderingPreference,
  RenderRequest,
} from "./RendererConfig";

export const ImageRenderer = forwardRef<HTMLImageElement, RenderComponentType>(
  ({ request, a11yIdPrefix }, ref) => {
    const { props, loading, error } = useMediaObjectProps(
      request.media.content?.uri || request.media.image?.uri,
      request,
      a11yIdPrefix
    );

    return (
      <MediaLoader loading={loading} error={error}>
        <img ref={ref} {...props} />
      </MediaLoader>
    );
  }
);
export const Image: RendererConfig = {
  getRenderingPreference: (request: RenderRequest) => {
    if (request.media.image) {
      if (request.media.animation) {
        return RenderingPreference.LOW;
      }
      return RenderingPreference.NORMAL;
    }
    if (request.media.content?.type?.startsWith("image/")) {
      return RenderingPreference.NORMAL;
    }
    return RenderingPreference.INVALID;
  },
  render: ImageRenderer,
};
