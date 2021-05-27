import { forwardRef } from "react";
import { MediaRendererProps } from ".";

export const Image = forwardRef<HTMLImageElement, MediaRendererProps>(
  ({ objectProps }, ref) => {
    return <img ref={ref} {...objectProps} />;
  }
);
