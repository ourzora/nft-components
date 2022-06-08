import { Story, Meta } from "@storybook/react";
import { NFTFullPage } from "../nft-full/NFTFullPage";
import { MediaConfiguration } from "../context/MediaConfiguration";
import { Networks, Strategies } from "@zoralabs/nft-hooks";

export default {
  title: "Renderer/NFTFull",
  component: NFTFullPage,
} as Meta;

const strategy = new Strategies.ZDKFetchStrategy(Networks.MAINNET);

const Template: Story<typeof NFTFullPage> = (args) => {
  // const strategy = new Strategies.ZDKAlphaFetchStrategy('1', 'https://api.zora.co/graphql');
  return (
  <MediaConfiguration
    networkId={(args as any).testnet ? Networks.RINKEBY : Networks.MAINNET}
    strategy={strategy}
  >
    {/* @ts-ignore */}
    <NFTFullPage {...args} />
  </MediaConfiguration>
  );
};

export const Image = Template.bind({});
Image.args = {
  id: "3366",
  contract: "0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7",
  config: {
    showPerpetual: false,
  },
  refreshInterval: 5000,
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
  id: "3092",
  contract: "0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7",
};

export const Text = Template.bind({});
Text.args = {
  id: "3079",
  contract: "0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7",
};

export const PDF = Template.bind({});
PDF.args = {
  id: "3327",
  contract: "0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7",
};

export const HTML = Template.bind({});
HTML.args = {
  id: "3609",
  contract: "0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7",
};

export const VideoCustom = Template.bind({});
VideoCustom.args = {
  id: "1",
  contract: "0x9edb1d313cfeb24a71cd3619ede76b41f7909c20",
};

export const NonZoraImage = Template.bind({});
NonZoraImage.args = {
  id: "5683",
  useBetaIndexer: true,
  contract: "0xb7F7F6C52F2e2fdb1963Eab30438024864c313F6",
};

export const ArtBlocks = Template.bind({});
ArtBlocks.args = {
  id: "83000067",
  contract: "0x152eee3dcc5526efd646e9b45c9a9672bffcc097",
  testnet: true,
};

export const ModelViewer = Template.bind({});
ModelViewer.args = {
  id: "3591",
  testnet: true,
};

export const CryptoKitty = Template.bind({});
CryptoKitty.args = {
  id: "556",
  contract: "0x06012c8cf97bead5deae237070f9587f8e7a266d",
};

export const CryptovoxelsParcel = Template.bind({});
CryptovoxelsParcel.args = {
  id: "10",
  contract: "0x79986aF15539de2db9A5086382daEdA917A9CF0C",
};
