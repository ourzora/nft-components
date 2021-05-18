import { MediaObject } from "../components/MediaObject";

export const Image = ({ mediaObject }: { mediaObject: MediaObject }) => {
  return <img {...mediaObject} />;
};
