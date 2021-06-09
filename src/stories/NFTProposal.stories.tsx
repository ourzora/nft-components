import { Story, Meta } from "@storybook/react";
import { NFTFullPage } from "../nft-full/NFTFullPage";
import { MediaConfiguration } from "../context/MediaConfiguration";
import { Networks } from "@zoralabs/nft-hooks";
import { NFTProposal } from "../nft-proposal/NFTProposal";

export default {
  title: "Renderer/NFTProposal",
  component: NFTFullPage,
} as Meta;

const Template: Story<typeof NFTFullPage> = (args) => (
  <MediaConfiguration
    networkId={(args as any).testnet ? Networks.RINKEBY : Networks.MAINNET}
  >
    <NFTProposal
      id="3472"
      proposedByAddress="0x18C8dF1fb7FB44549F90d1C2BB1DC8b690CD0559"
    />
  </MediaConfiguration>
);

export const Image = Template.bind({});
Image.args = {
  id: "2732",
};
