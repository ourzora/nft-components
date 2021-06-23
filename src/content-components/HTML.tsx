import {
  RenderComponentType,
  RendererConfig,
  RenderingPreference,
  RenderRequest,
} from "./RendererConfig";

const HTMLRenderer = ({ request, getStyles }: RenderComponentType) => (
  <div {...getStyles("mediaContentText")}>
    <iframe
      style={{border: 0}}
      width="800"
      height="800"
      src={request.media.content?.uri || request.media.animation?.uri}
    ></iframe>
  </div>
);

export const HTML: RendererConfig = {
  getRenderingPreference(request: RenderRequest) {
    if (
      request.media.content?.type?.startsWith("text/html") ||
      request.media.content?.type?.startsWith("application/pdf") ||
      request.media.animation?.type?.startsWith("text/html")
    ) {
      return request.renderingContext === "FULL"
        ? RenderingPreference.PRIORITY
        : RenderingPreference.LOW;
    }
    return RenderingPreference.INVALID;
  },
  render: HTMLRenderer,
};
