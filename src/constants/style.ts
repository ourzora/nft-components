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
      width: ${theme.previewCard.width}px;
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
      width: ${theme.previewCard.width}px;
      height: ${theme.previewCard.height}px;
      display: flex;
      overflow: hidden;
      position: relative;
      justify-content: center;
    `,
    cardItemInfo: (theme: ThemeOptionsType) => css`
      padding: ${theme.textBlockPadding};
      border-top: ${theme.borderStyle};
    `,
    cardAuctionPerpetual: (theme: ThemeOptionsType) => pricingLayout(theme),
    cardAuctionReserveActive: (theme: ThemeOptionsType) => [
      css`
        background: #000;
        color: #fff;
      `,
      pricingLayout(theme),
    ],
    cardAuctionReservePending: (theme: ThemeOptionsType) => [
      css`
        background: #e6e6e6;
      `,
      pricingLayout(theme),
    ],
    cardTitle: (theme: ThemeOptionsType) => css`
      max-width: ${theme.previewCard.width - 30},
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
        margin: 14px 0;
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
    mediaLoader: (_: ThemeOptionsType, { mediaLoaded }: any) => css`
      pointer-events: none;
      min-height: 30vh;
      width: 100%;
      justify-content: center;
      align-items: center;
      display: ${mediaLoaded ? 'none' : 'flex'};
      align-content: center;
      justify-items: center;
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
      align-self: center;
      position: absolute;
      left: 50%;
      margin-left: -30px;
     `,
  },
};
