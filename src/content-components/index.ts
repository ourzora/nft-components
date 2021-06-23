import { Text } from "./Text";
import { HTML } from "./HTML";
import { Image } from "./Image";
import { Video } from "./Video";
import { Audio } from "./Audio";
import { Unknown } from "./Unknown";
import * as RendererConfigTypes from "./RendererConfig";

const MediaRendererDefaults = [Audio, Text, HTML, Image, Video, Unknown];

export {
  Text,
  HTML,
  Image,
  Video,
  Audio,
  Unknown,
  RendererConfigTypes,
  MediaRendererDefaults,
};
