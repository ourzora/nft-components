import { css } from "@emotion/css";

import { SVG_NEXT_ICON, SVG_PAUSE, SVG_PLAY_ARROW } from "./svg-icons";
import { ThemeOptions, ThemeOptionsType } from "./theme";

const pricingLayout = (theme: ThemeOptionsType) => css`
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: auto auto;
  grid-auto-column: 1fr;
  padding: ${theme.textBlockPadding};
  border-top: ${theme.borderStyle};
`;

export const Style = {
  theme: ThemeOptions,
  styles: {
    auctionHouseList: (_: ThemeOptionsType) => css`
      display: flex;
      flex-wrap: wrap;
    `,
    // Styles for preview card
    cardOuter: (theme: ThemeOptionsType, { hasClickEvent }: any) => css`
      ${hasClickEvent ? "cursor: pointer;" : ""}
      background: ${theme.previewCard.background};
      overflow: hidden;
      border-radius: ${theme.defaultBorderRadius}px;
      border: ${theme.borderStyle};
      margin: 15px;
      width: ${theme.previewCard.width};
      line-height: ${theme.lineSpacing}px;
      ${theme.bodyFont}
      transition: transform 0.1s ease-in-out;
      &:active {
        transform: scale(0.98);
      }
    `,
    cardHeader: (theme: ThemeOptionsType) => css`
      padding: ${theme.textBlockPadding};
      ${theme.titleFont}
    `,
    cardMediaWrapper: (theme: ThemeOptionsType) => css`
      width: ${theme.previewCard.width};
      height: ${theme.previewCard.height};
      display: flex;
      overflow: hidden;
      position: relative;
      justify-content: center;
    `,
    cardItemInfo: (theme: ThemeOptionsType) => css`
      padding: ${theme.textBlockPadding};
      border-top: ${theme.borderStyle};
    `,
    cardAuctionPricing: (
      theme: ThemeOptionsType,
      {
        type,
      }: {
        type: "perpetual" | "reserve-active" | "reserve-pending" | "unknown";
      }
    ) => {
      const getActiveStyle = () => {
        switch (type) {
          case "reserve-active":
            return `
              background: #000;
              color: #fff;
            `;
          case "reserve-pending":
            return `
              background: #e6e6e6; 
            `;
          case "unknown":
          case "perpetual":
            return ``;
        }
      };
      return css`
        display: grid;
        grid-auto-flow: column;
        grid-template-rows: auto auto;
        grid-auto-column: 1fr;
        padding: ${theme.textBlockPadding};
        border-top: ${theme.borderStyle};
        ${getActiveStyle()}
      `;
    },
    cardTitle: (theme: ThemeOptionsType) => css`
      max-width: calc(${theme.previewCard.width} - 30px),
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      ${theme.titleFont}
    `,
    // Styles for full-page view
    fullPage: (theme: ThemeOptionsType) => theme.bodyFont,
    fullMediaWrapper: (_: ThemeOptionsType) => css`
      margin: 5%;
      position: relative;
    `,
    fullItemInfo: (_: ThemeOptionsType) => css``,
    fullTitle: (_: ThemeOptionsType) => css`
      font-size: 30px;
      margin: 20px 0;
    `,
    fullDescription: (theme: ThemeOptionsType) => css`
      font-size: ${theme.fontSizeFull};
      margin: 10px 0;
    `,
    fullOwnerAddress: (theme: ThemeOptionsType) => [
      css`
        font-size: ${theme.fontSizeFull};
      `,
      theme.titleFont,
    ],
    fullLabel: (theme: ThemeOptionsType) => [
      css`
        text-transform: uppercase;
        font-size: 14px;
        margin-bottom: 5px;
        opacity: 0.5;
      `,
      theme.bodyFont,
    ],
    fullPageHistoryItem: (theme: ThemeOptionsType) => [
      css`
        margin-top: 14px;
        display: flex;
        flex-direction: column;
        font-weight: 300;
      `,
      theme.bodyFont,
    ],
    fullPageHistoryItemDatestamp: (theme: ThemeOptionsType) => [
      css`
        font-size: 12px;
        padding-top: 2px;
        opacity: 0.5;
      `,
      theme.bodyFont,
    ],
    fullPageDataGrid: (_: ThemeOptionsType) => css`
      display: grid;
      grid-gap: 20px;
    `,
    infoContainer: (theme: ThemeOptionsType, { bottomPadding }: any) =>
      css`
        border: ${theme.borderStyle};
        border-radius: ${theme.defaultBorderRadius}px;
        padding: 20px 20px ${bottomPadding ? "20px" : 0};
        position: relative;
      `,
    fullInfoSpacer: (_: any, { height = 15 }: { height: number }) => css`
      height: ${height}px;
    `,
    fullInfoAuctionWrapper: () => ``,
    fullPlaceOfferButton: (_: any) => css``,
    fullInfoCreatorEquityContainer: (_: any) => css`
      margin-top: 15px;
    `,
    fullInfoProofAuthenticityContainer: (_: any) => css`
      margin-top: 15px;
    `,
    fullProofLink: (theme: ThemeOptionsType) => css`
      display: block;
      text-decoration: none;
      color: ${theme.linkColor};
      padding: 20px;
      margin: 0 -20px;
      border-top: ${theme.borderStyle};

      :hover {
        background-color: #f2f2f2;
      }
      :after {
        content: " ";
        width: 14px;
        height: 14px;
        opacity: 0.5;
        background-image: url("data:image/svg+xml,${encodeURIComponent(
          SVG_NEXT_ICON
        )}");
        color: #eee;
        right: 20px;
        position: absolute;
      }
    `,
    fullCreatorOwnerSection: (theme: ThemeOptionsType) => [
      pricingLayout(theme),
      css`
        border-top: 0;
      `,
    ],
    // Generic styles
    button: (theme: ThemeOptionsType, { primary }: any) => css`
      background: ${primary
        ? theme.buttonColor.primaryBackground
        : theme.buttonColor.background};
      color: ${primary
        ? theme.buttonColor.primaryText
        : theme.buttonColor.text};
      border-radius: ${theme.defaultBorderRadius}px;
      padding: 11px;
      font: inherit;
      text-decoration: none;
      margin: 0;
      border: 0;
      cursor: pointer;
      display: inline-block;
      transition: transform 0.1s ease-in-out;
      &:active {
        transform: scale(0.98);
      }
    `,
    textSubdued: (theme: ThemeOptionsType) => [
      css`
        opacity: 0.5;
      `,
      theme.bodyFont,
    ],
    pricingAmount: (theme: ThemeOptionsType) => theme.titleFont,
    mediaLoader: (_: ThemeOptionsType, { mediaLoaded, isFullPage }: any) => css`
      pointer-events: none;
      ${isFullPage ? "min-height: 40vh;" : ""}
      width: 100%;
      justify-content: center;
      align-items: center;
      opacity: ${mediaLoaded ? "0" : "1"};
      display: flex;
      transition: 0.2s ease-out opacity;
      align-content: center;
      justify-items: center;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      ${isFullPage && !mediaLoaded
        ? `
      &:after {
        content: " ";
        ${isFullPage ? "height: 30vh" : ""}
      }
      `
        : ""}
    `,
    mediaObject: (_: ThemeOptionsType, { mediaLoaded, isFullPage }: any) => css`
      opacity: ${mediaLoaded ? "1" : "0"};
      transition: 0.2s ease-in opacity;
      ${isFullPage ? "max-height: 70vh;" : ""}
      ${isFullPage ? "max-width: 100%;" : ""}
      display: block;
      margin: 0 auto;
      flex-shrink: 1;
    `,
    mediaAudioWrapper: (_: ThemeOptionsType) => css`
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 100%;
    `,
    mediaAudioWaveform: (_: ThemeOptionsType) => css`
      width: 100%;
      cursor: pointer;
    `,
    mediaObjectMessage: (_: ThemeOptionsType) => css`
      align-self: center;
    `,
    mediaContentText: (theme: ThemeOptionsType) => [
      css`
        white-space: pre;
        text-align: left;
        padding: 20px;
        width: 100%;
      `,
      theme.mediaContentFont,
    ],
    mediaAudioButton: (_: ThemeOptionsType, { playing }: any) => css`
      padding: 30px;
      margin-top: 50px;
      background: #eee;
      border: 0;
      border-radius: 200px;
      color: transparent;
      width: 30px;
      height: 30px;
      background-image: url("data:image/svg+xml,${encodeURIComponent(
        playing ? SVG_PAUSE : SVG_PLAY_ARROW
      )}");
      cursor: pointer;
      background-repeat: no-repeat;
      background-position: center;
    `,
  },
};
