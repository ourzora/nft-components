# 💅 @zoralabs/nft-components

Zora's NFT components allow you to easily create your own gallery or auction house with zNFT infrastructure.

This library provides the front-end display components to compliment `@zoralabs/nft-hooks`.

This library works alongside the Zora [auction house](https://zora.mirror.xyz/9mQ9AeJK84USTnQ9eBY4Sc7s1bi0N8RoZd3Oy4q82FM) ([code](https://github.com/ourzora/auction-house)) allows for DAOs and individuals to run their own decentralized auction house. Currently, only zNFTs are supported by this library but plans are to add in support for arbitary NFTs.

✨ [view docs on storybook](https://ourzora.github.io/nft-components) →

## NFT Components

These components allow for drop-in rendering of NFTs. They work on the frontend and do not need any server-side components. These components are aware of both ongoing auctions and the perpetual markets for zNFTs, integrating latest bid information and other relevant marketplace information. They also handle most all of the same media types that the Zora marketplace natively handles (audio, video, image, and text). The components can be modified as needed and should be used as a prototype look and feel. Under the hood, they use the @zoralabs/nft-hooks library to retrieve data, if more customization is needed for the look and feel of the components the underlying data can be retrieved directly.

### Main components:

- [NFTPreview](https://ourzora.github.io/nft-components?path=/docs/renderer-nftpreview--image)
  - Used to render a zNFT preview thumbnail
- [NFTFullPage](https://ourzora.github.io/nft-components?path=/docs/renderer-nftfull--image)
  - Used to render a zNFT full page component
- [NFTPageWrapper](https://ourzora.github.io/nft-components?path=/story/renderer-nftpagewrapper--page)
  - Used to compose a custom set of zNFT components
- [MediaConfiguration](https://ourzora.github.io/nft-components?path=/story/renderer-mediaconfiguration--page)
  - Configure the text, theme, and network settings for the zNFT.
- [AuctionHouseList](https://ourzora.github.io/nft-components?path=/docs/renderer-auctionhouselist--images)
  - Load a list of auctions for a given curator

### Key Features:

- [Server-side rendering](https://ourzora.github.io/nft-components?path=/story/about-serverrendering--page)
- [Customizable theming / styling](https://ourzora.github.io/nft-components?path=/story/theming-previewcomponent--preview-card)
- [Customizable information ordering / display](https://ourzora.github.io/nft-components?path=/story/renderer-about--page)
- [Updatable media rendering](https://ourzora.github.io/nft-components?path=/story/about-customcomponentdocs--page)

### Quickstart

1. Install package:
```bash
yarn add @zoralabs/nft-components
```

2. Render a ZNFT Thumbnail:

```tsx
import { NFTPreview } from "@zoralabs/nft-components";

export const Page = () => <NFTPreview id="3002" />;
```

3. Render a ZNFT Full page:

```tsx
import { NFTFullPage } from "@zoralabs/nft-components";

export const Page = () => <NFTFullPage id="3002" />;
```
