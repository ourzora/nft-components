import { Networks } from "@zoralabs/nft-hooks";

export const MEDIA_URL_BASE_BY_NETWORK = {
  [Networks.MAINNET]: "https://zora.co/",
  [Networks.RINKEBY]: null,
};

export const VIEW_ETHERSCAN_URL_BASE_BY_NETWORK = {
  [Networks.MAINNET]:
    "https://etherscan.io/token/0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7?a=",
  [Networks.RINKEBY]:
    "https://rinkeby.etherscan.io/token/0x7C2668BD0D3c050703CEcC956C11Bd520c26f7d4?a=",
};

export const ZORA_SITE_URL_BASE = "https://zora.co";
