import { css } from "@emotion/css";

import { ThemeOptions, ThemeOptionsType } from "./theme";

export const Style = {
  theme: ThemeOptions,
  styles: {
    auctionHouseList: () => css``,
    cardLink: () => css``,
    cardHeader: () => css``,
    cardMediaWrapper: () => css``,
    cardItemInfo: () => css``,
    cardAuctionPricing: () => {},
    cardTitle: () => css``,
    fullPage: () => css``,
    fullMediaWrapper: () => css``,
    fullItemInfo: () => css``,
    fullTitle: () => css``,
    fullDescription: () => css``,
    fullOwnerAddress: () => css``,
    fullLabel: () => ``,
    fullPageHistoryItem: () => css``,
    fullPageHistoryItemDescription: () => css``,
    fullPageHistoryItemMeta: () => css``,
    fullPageHistoryTxnLink: () => css``,
    nftProposalMediaWrapper: () => css``,
    nftProposalInfoLayout: () => css``,
    nftProposalActionList: () => css``,
    nftProposalLabelWrapper: () => css``,
    nftProposalUserView: () => css``,
    nftProposalLabel: () => css``,
    fullPageHistoryItemDatestamp: () => css``,
    fullPageDataGrid: () => css``,
    infoContainer: () => css``,
    fullInfoSpacer: () => css``,
    fullInfoAuctionWrapper: () => ``,
    fullPlaceOfferButton: () => css``,
    fullInfoCreatorEquityContainer: () => css``,
    fullInfoProofAuthenticityContainer: () => css``,
    fullProofLink: () => css``,
    fullCreatorOwnerSection: () => css``,
    button: () => css``,
    textSubdued: () => css``,
    pricingAmount: () => css``,
    nftProposal: () => css``,
    nftProposalActions: () => css``,
    nftProposalAcceptedPill: () => css``,
    nftProposalTitle: () => css``,
    mediaLoader: () => css``,
    mediaObject: () => css``,
    mediaAudioWrapper: () => css``,
    mediaAudioWaveform: () => css``,
    mediaObjectMessage: () => css``,
    mediaContentText: () => css``,
    mediaPlayButton: () => css``,
    mediaVideoControls: () => css``,
    mediaFullscreenButton: () => css``,
    mediaMuteButton: () => css``,
    /* REQUIRE ARGS */
    nftProposalActionButton: (
      /* @ts-ignore */
      theme: ThemeOptionsType,
      { action }: { action: "approve" | "deny" }
    ) => css`
      ${action === "approve" && ``}
      ${action === "approve" && ``}
      ${action === "deny" && ``}
    `,
    cardOuter: (
      /* @ts-ignore */ 
      theme: ThemeOptionsType, { hasClickEvent }: any) => css`
      ${hasClickEvent
        ? ``
        : ""}
    `,
  },
};
