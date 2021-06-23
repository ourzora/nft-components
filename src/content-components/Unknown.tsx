import {
  RenderComponentType,
  RendererConfig,
  RenderingPreference,
  RenderRequest,
} from "./RendererConfig";

export const Unknown: RendererConfig = {
  getRenderingPreference: (request: RenderRequest) => {
    if (request.media.content?.type?.startsWith("text/")) {
      return RenderingPreference.LOW;
    }
    return RenderingPreference.INVALID;
  },

  render: ({ request, getStyles }: RenderComponentType) => (
    <div {...getStyles("mediaObjectMessage")}>
      {request.media.content?.type || "unknown"}
    </div>
  ),
};
