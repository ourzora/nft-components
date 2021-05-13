# @zoralabs/nft-components

## NFT Components

(index):
These components allow for drop-in rendering of NFTs. They work on the frontend and do not need any server-side components. These components are aware of both ongoing auctions and the perpetual markets for zNFTs, integrating latest bid information and other relevant marketplace information. They also handle most all of the same media types that the Zora marketplace natively handles (audio, video, image, and text). The components can be modified as needed and should be used as a prototype look and feel. Under the hood, they use the @zoralabs/nft-hooks library to retrieve data, if more customization is needed for the look and feel of the components the underlying data can be retrieved directly.

This API is still under development and is not released yet

These components allow for drop-in rendering of NFTs. They work on the frontend and do not need any server-side components. These components are aware of both ongoing auctions and the perpetual markets for zNFTs, integrating latest bid information and other relevant marketplace information. They also handle most all of the same media types that the Zora marketplace natively handles (audio, video, image, and text). The components can be modified as needed and should be used as a prototype look and feel. Under the hood, they use the @zoralabs/nft-hooks library to retrieve data, if more customization is needed for the look and feel of the components the underlying data can be retrieved directly.

Install:
`yarn add @zoralabs/nft-components`

Example:
```ts
import {MediaRenderer} from "@zoralabs/nft-components";

function MyNFTPage() {
  const NFTIds = ["10", "2", "4"];
  
  const items = NFTIds.map((nftID) => <MediaRenderer id={nftID} />;
  
  return (
    <div>
      <h2>My NFTs</h2>
      {items}
    </div>
  );
}
```