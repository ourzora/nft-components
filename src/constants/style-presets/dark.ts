import { css } from "@emotion/css";
import { AuctionStateInfo } from "@zoralabs/nft-hooks";
import { ThemeOptionsType } from "../theme";

export const DarkTheme = {
  theme: {
    previewCard: {
      height: 420,
    },
    titleFont: {
      fontFamily: "courier",
      color: "#fff",
      fontWeight: 400,
      fontSize: "14px",
    },
    bodyFont: {
      fontFamily: "courier",
      color: "#fff",
      fontWeight: 300,
      fontSize: "14px",
    },

    borderStyle: "0",
    lineSpacing: 28,
  },
  styles: {
    cardOuter: (
      theme: ThemeOptionsType,
      { hasClickEvent, auctionStatus }: any
    ) => {
      const getBackground = () => {
        switch (auctionStatus) {
          case AuctionStateInfo.RESERVE_AUCTION_ACTIVE:
            return css`
              background: linear-gradient(
                  180deg,
                  rgba(255, 255, 255, 0.5) 0%,
                  rgba(255, 255, 255, 0) 100%
                ),
                #696969;
            `;
          case AuctionStateInfo.RESERVE_AUCTION_LAST_15:
            return css`
              background: linear-gradient(
                  0deg,
                  rgba(0, 0, 0, 0.5),
                  rgba(0, 0, 0, 0.5)
                ),
                linear-gradient(180deg, #adf500 68.97%, #b88a61 100%);
            `;
          case AuctionStateInfo.PERPETUAL_ASK:
          case AuctionStateInfo.RESERVE_AUCTION_PENDING:
          default:
            return css`
              background: linear-gradient(
                  180deg,
                  rgba(255, 255, 255, 0.5) 0%,
                  rgba(255, 255, 255, 0) 100%
                ),
                #696969;
            `;
        }
      };

      return css`
        ${hasClickEvent ? "cursor: pointer;" : ""}
        overflow: hidden;
        ${getBackground()}
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
      `;
    },
  },
};
