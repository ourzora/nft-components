import { NFTPreview, NFTPreviewProps } from "../nft-preview/NFTPreview";
import { Story, Meta } from "@storybook/react";
import { MediaConfiguration } from "../context/MediaConfiguration";
import { Networks } from "@zoralabs/nft-hooks";

export default {
  title: "Renderer/NFTPreview",
  component: NFTPreview,
} as Meta;

const Template: Story<NFTPreviewProps> = (args) => (
  <MediaConfiguration
    networkId={(args as any).testnet ? Networks.RINKEBY : Networks.MAINNET}
  >
    <NFTPreview {...args} />
  </MediaConfiguration>
);

export const Image = Template.bind({});
Image.args = {
  id: "3366",
  contract: "0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7",
};

export const Video = Template.bind({});
Video.args = {
  id: "2411",
  contract: "0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7",
};

export const GIF = Template.bind({});
GIF.args = {
  id: "2671",
  contract: "0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7",
};

export const Audio = Template.bind({});
Audio.args = {
  id: "2563",
  contract: "0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7",
};

export const Text = Template.bind({});
Text.args = {
  id: "3079",
  contract: "0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7",
};

export const NonZoraImage = Template.bind({});
NonZoraImage.args = {
  id: "5683",
  contract: "0xb7f7f6c52f2e2fdb1963eab30438024864c313f6",
};
