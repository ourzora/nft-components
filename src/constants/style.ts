import { SVG_NEXT_ICON, SVG_PAUSE, SVG_PLAY_ARROW } from "./svg-icons";
import { ThemeOptions, ThemeOptionsType } from "./theme";

const pricingLayout = (theme: ThemeOptionsType) => ({
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateRows: "auto auto",
  gridAutoColumns: "1fr",
  padding: theme.textBlockPadding,
  borderTop: theme.borderStyle,
});

export const Style = {
  theme: ThemeOptions,
  styles: {
    auctionHouseList: (_: ThemeOptionsType) => ({
      display: "flex",
      flexWrap: "wrap",
    }),
    // Styles for preview card
    cardOuter: (theme: ThemeOptionsType, { hasClickEvent }: any) => ({
      cursor: hasClickEvent ? "pointer" : undefined,
      background: theme.previewCard.background,
      overflow: "hidden",
      borderRadius: `${theme.defaultBorderRadius}px`,
      border: theme.borderStyle,
      margin: 15,
      width: `${theme.previewCard.width}px`,
      lineHeight: `${theme.lineSpacing}px`,
      ...theme.bodyFont,
      transition: "transform 0.1s ease-in-out",
      "&:active": {
        transform: "scale(.98)",
      },
    }),
    cardHeader: (theme: ThemeOptionsType) => ({
      padding: theme.textBlockPadding,
      ...theme.titleFont,
    }),
    cardMediaWrapper: (theme: ThemeOptionsType) => ({
      width: theme.previewCard.width,
      height: theme.previewCard.height,
      display: "flex",
      overflow: "hidden",
      position: "relative",
      justifyContent: "center",
    }),
    cardItemInfo: (theme: ThemeOptionsType) => ({
      padding: theme.textBlockPadding,
      borderTop: theme.borderStyle,
    }),
    cardAuctionPerpetual: (theme: ThemeOptionsType) => ({
      ...pricingLayout(theme),
    }),
    cardAuctionReserveActive: (theme: ThemeOptionsType) => ({
      background: "#000",
      color: "#fff",
      ...pricingLayout(theme),
    }),
    cardAuctionReservePending: (theme: ThemeOptionsType) => ({
      background: "#e6e6e6",
      ...pricingLayout(theme),
    }),
    cardTitle: (theme: ThemeOptionsType) => ({
      maxWidth: theme.previewCard.width - 30,
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      ...theme.titleFont,
    }),

    // Styles for full-page view
    fullPage: (theme: ThemeOptionsType) => ({
      ...theme.bodyFont,
    }),
    fullMediaWrapper: (_: ThemeOptionsType) => ({
      margin: "5%",
      position: "relative",
    }),
    fullItemInfo: (_: ThemeOptionsType) => ({}),
    fullTitle: (_: ThemeOptionsType) => ({
      fontSize: "30px",
      margin: "20px 0",
    }),
    fullDescription: (theme: ThemeOptionsType) => ({
      fontSize: theme.fontSizeFull,
      margin: "10px 0",
    }),
    fullOwnerAddress: (theme: ThemeOptionsType) => ({
      fontSize: theme.fontSizeFull,
      ...theme.titleFont,
    }),
    fullLabel: (theme: ThemeOptionsType) => ({
      textTransform: "uppercase",
      fontSize: "14px",
      marginBottom: "5px",
      opacity: 0.5,
      ...theme.bodyFont,
    }),
    fullPageHistoryItem: (theme: ThemeOptionsType) => ({
      margin: "14px 0",
      display: "flex",
      flexDirection: "column",
      ...theme.bodyFont,
      fontWeight: 300,
    }),
    fullPageHistoryItemDatestamp: (theme: ThemeOptionsType) => ({
      ...theme.bodyFont,
      fontSize: "12px",
      paddingTop: "2px",
      opacity: 0.5,
    }),
    fullPageDataGrid: (_: ThemeOptionsType) => ({
      display: "grid",
      gridGap: "20px",
    }),
    infoContainer: (theme: ThemeOptionsType, { bottomPadding }: any) => ({
      border: theme.borderStyle,
      borderRadius: `${theme.defaultBorderRadius}px`,
      padding: `20px 20px ${bottomPadding ? "20px" : 0}`,
      position: "relative",
    }),
    fullProofLink: (theme: ThemeOptionsType) => ({
      display: "block",
      textDecoration: "none",
      color: theme.linkColor,
      padding: "20px",
      margin: "0 -20px",
      borderTop: theme.borderStyle,
      ":hover": {
        backgroundColor: "#f2f2f2",
      },
      ":after": {
        content: '" "',
        width: "14px",
        height: "14px",
        opacity: 0.5,
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
          SVG_NEXT_ICON
        )}")`,
        color: "#eee",
        right: "20px",
        position: "absolute",
      },
    }),
    fullCreatorOwnerSection: (theme: ThemeOptionsType) => ({
      ...pricingLayout(theme),
      borderTop: 0,
    }),

    // Generic styles
    button: (theme: ThemeOptionsType, { primary }: any) => ({
      background: primary
        ? theme.buttonColor.primaryBackground
        : theme.buttonColor.background,
      color: primary ? theme.buttonColor.primaryText : theme.buttonColor.text,
      borderRadius: `${theme.defaultBorderRadius}px`,
      padding: "11px",
      font: "inherit",
      textDecoration: "none",
      margin: "0",
      border: "0",
      cursor: "pointer",
      display: "inline-block",
      ...theme.bodyFont,
      transition: "transform 0.1s ease-in-out",
      "&:active": {
        transform: "scale(.98)",
      },
    }),
    textSubdued: (theme: ThemeOptionsType) => ({
      opacity: "0.5",
      ...theme.bodyFont,
    }),
    pricingAmount: (theme: ThemeOptionsType) => ({
      ...theme.titleFont,
    }),
    mediaLoader: (_: ThemeOptionsType, { mediaLoaded }: any) => ({
      position: "absolute",
      pointerEvents: "none",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      justifyContent: "center",
      alignItems: "center",
      opacity: mediaLoaded ? 0 : 1,
      transition: "0.1s ease-out opacity",
      display: "flex",
      alignContent: "center",
      justifyItems: "center",
    }),
    mediaObject: (_: ThemeOptionsType, { mediaLoaded, isFullPage }: any) => ({
      opacity: mediaLoaded ? 1 : 0,
      transition: "0.2s ease-in opacity",
      maxHeight: isFullPage ? "70vh" : undefined,
      maxWidth: isFullPage ? "100%" : undefined,
      display: "block",
      margin: "0 auto",
      flexShrink: "1",
    }),
    mediaObjectMessage: (_: ThemeOptionsType) => ({
      alignSelf: "center",
    }),
    mediaContentText: (theme: ThemeOptionsType) => ({
      whiteSpace: "pre",
      textAlign: "left",
      padding: "20px",
      width: "100%",
      ...theme.mediaContentFont,
    }),
    mediaAudioButton: (_: ThemeOptionsType, { playing }: any) => ({
      padding: "30px",
      background: "#eee",
      border: 0,
      borderRadius: "200px",
      color: "transparent",
      width: "30px",
      height: "30px",
      backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
        playing ? SVG_PAUSE : SVG_PLAY_ARROW
      )}")`,
      cursor: "pointer",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      alignSelf: "center",
      position: "absolute",
      left: "50%",
      marginLeft: "-30px",
    }),
  },
};
