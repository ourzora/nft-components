import { Story, Meta } from "@storybook/react";
import { NFTFullPage } from "../nft-full/NFTFullPage";
import {MediaConfiguration} from "../context/MediaConfiguration";
import { Networks } from "@zoralabs/nft-hooks";

export default {
  title: "Renderer/NFTFull",
  component: NFTFullPage,
} as Meta;

const Template: Story<typeof NFTFullPage> = (args) => (
  <MediaConfiguration networkId={(args as any).testnet ? Networks.RINKEBY : Networks.MAINNET}>
    {/* @ts-ignore */}
    <NFTFullPage {...args} />
  </MediaConfiguration>
);

export const Image = Template.bind({});
Image.args = {
  id: "2662",
  testnet: true,
};

export const Video = Template.bind({});
Video.args = {
  id: "2411",
};

export const GIF = Template.bind({});
GIF.args = {
  id: "2671",
};

export const Audio = Template.bind({});
Audio.args = {
  id: "3092",
};

export const Text = Template.bind({});
Text.args = {
  id: "3079",
};

export const NonZoraImage = Template.bind({});
NonZoraImage.args = {
  id: "5683",
  contract: "0xb7f7f6c52f2e2fdb1963eab30438024864c313f6",
};

export const CryptoKitty = Template.bind({});
CryptoKitty.args = {
  id: "556",
  contract: "0x06012c8cf97bead5deae237070f9587f8e7a266d",
};
