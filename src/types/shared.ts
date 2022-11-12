export enum ReleaseType {
  "LimitedEdition" = "LimitedEdition",
  "Crescendo" = "Crescendo",
  "Staked NFTs" = "Staked NFTs",
}

export type ArtistPayload = {
  _id?: string;
  address: string | any;
  username: string;
  email?: string;
  artistName: string;
  releases?: Array<ProjectPayload>
  coverPhoto: string;
  primaryGenre: string;
  secondaryGenre: string;
  labelStatus: string;
  monthlyListeners: string;
  totalStreams: string;
  about: string;
  subheader: string;
  socials: SocialLinks;
  osRelease: string;
  verified: boolean;
  crescendo: boolean;
}

export type SocialLinks = {
  instagram?: string;
  spotify?: string;
  twitter?: string;
  discord?: string;
  website?: string;
  lens?: string;
}

export type ProjectPayload = {
  _id?: string
  artist?: ArtistPayload;
  image: string;
  nft: string;
  artist1?: string;
  project: string;
  song2?: string;
  song2title?: string;
  number: number;
  date: string;
  osRelease: string;
  artistAbout: string;
  artistAbout2?: string;
  instagram: string;
  instagram2?: string;
  spotify: string;
  spotify2?: string;
  twitter: string;
  twitter2?: string;
  verified: boolean;
  verified2?: boolean;
  period: string;
  spotifySong: string;
  streams: string;
  contract_address: string;
  percent_listed: string;
  mint_price: string;
  collection_quantity: number | string;
  type: ReleaseType;
  website?: string;
  discord?: string;
  stakeContract?: string;
  communityToken?: string;
  tokenTracker?: string;
  stakingReward?: string;
  benefitThreshold1?: string;
  benefitThreshold2?: string;
  benefitThreshold3?: string;
  benefitThreshold4?: string;
  benefit1?: string;
  benefit2?: string;
  benefit3?: string;
  benefit4?: string;
  song?: string;
  songUrl: string;
  songUrl2?: String;
  first_increment?: number;
  second_increment?: number;
  take_rate?: number;
  contractJson?: string;
  stakingContractJson?: string;
};

interface GenericRelease {
  songName: String;
  image: String;
  nft: String;
  artist1: String;
  project: String;
  number: Number;
  date: String;
  osRelease: String;
  artistAbout: String;
  instagram: String;
  spotify: String;
  twitter: String;
  verified: Boolean;
  period: String;
  spotifySong: String;
  streams: String;
  contractAddress: String;
  percentListed: String;
  mintPrice: String;
  collectionQuantity: String;
  songUrl: String;
}

export interface LimitedEditionRelease extends GenericRelease {
  type: "LimitedEdition";
}

export interface CrescendoRelease extends GenericRelease {
  discord: String;
  firstIncrement: Number;
  secondIncrement: Number;
  takeRate: Number;
  type: "Crescendo";
}

export interface StakingRelease extends GenericRelease {
  discord: String;
  stakeContract: String;
  communityToken: String;
  tokenTracker: String;
  stakingReward: String;
  benefitThreshold1: String;
  benefit1: String;
  benefitThreshold2: String;
  benefit2: String;
  benefitThreshold3: String;
  benefit3: String;
  benefitThreshold4: String;
  benefit4: String;
  type: "Staking";
}
