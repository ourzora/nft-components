import { useContext } from "react";

import { NFTDataContext } from "../context/NFTDataContext";
import { MediaObject } from "../components/MediaObject";
import { useMediaContext } from "../context/useMediaContext";
import {
  defaultGetContentData,
  GetContentDataType,
} from "../utils/getContentDataOptions";
import type { StyleProps } from "../utils/StyleTypes";

type MediaFullProps = GetContentDataType & {
  a11yIdPrefix?: string;
} & StyleProps;

export const MediaFull = ({
  a11yIdPrefix,
  getContentData = defaultGetContentData,
  className,
}: MediaFullProps) => {
  const { getStyles } = useMediaContext();
  const {
    data,
    error
  } = useContext(NFTDataContext);

  const getContent = () => {
    if (data && data.metadata) {
      return (
        <MediaObject
          isFullPage={true}
          a11yIdPrefix={a11yIdPrefix}
          {...getContentData(data)}
        />
      );
    }
    if (!data && error) {
      return <div {...getStyles("mediaLoader")}>error fetching...</div>;
    }
    return <div {...getStyles("mediaLoader")}>loading...</div>;
  };

  const media = getContent();
  return <div {...getStyles("fullMediaWrapper", className)}>{media}</div>;
};
