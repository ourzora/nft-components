import React from "react";
import { AuctionHouseList } from "../auction-house/AuctionHouseList";
import { Story, Meta } from "@storybook/react";
import {
  NetworkIDs,
  Networks,
  NFTFetchConfiguration,
} from "@zoralabs/nft-hooks";

type AuctionHouseArgs = {
  network: NetworkIDs;
  curatorId: string;
};

export default {
  title: "Renderer/AuctionHouseList",
  component: AuctionHouseList,
} as Meta;

const Template: Story<AuctionHouseArgs> = (args) => (
  <NFTFetchConfiguration networkId={args.network}>
    <AuctionHouseList onClick={(_, auction) => alert(`Clicked token ${auction.tokenId}`)} curatorIds={[args.curatorId]} />
  </NFTFetchConfiguration>
);

export const Image = Template.bind({});
Image.args = {
  network: Networks.RINKEBY,
  curatorId: "0x5ed25dcc8490809215cd0632492467bebc60b8d5",
};
