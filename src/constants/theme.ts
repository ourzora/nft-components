const pricingLayout = (theme: typeof Theme["theme"]) => ({
  display: "grid",
  gridAutoFlow: 'column',
  gridTemplateRows: 'auto auto',
  padding: theme.textBlockPadding,
  borderTop: theme.borderStyle,
});

const ThemeOptions = {
  // Overall height and width for media
  width: 330,
  height: 330,

  // Text overview
  textBlockPadding: "10px 15px",
  borderStyle: "2px solid #e6e6e6",
  linkColor: "#000",

  // Font settings
  bodyFont: {
    fontFamily: "Inter",
    fontWeight: 400,
  },

  titleFont: {
    fontFamily: "Inter",
    fontWeight: 600,
  },

  buttonColor: {
    primaryBackground: '#333',
    primaryText: '#fff',
    background: '#eee',
    text: '#000',
  },

  defaultBorderRadius: 4,

  // Font size base for grid view
  fontSizePreview: 14,

  // Font size base for full view page
  fontSizeFull: 16,
  lineSpacing: 24,
};

const SVG_NEXT_ICON =
  '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><title>arrow-top-right</title><g stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" fill="currentColor" stroke="currentColor"><line fill="none" stroke-miterlimit="10" x1="2" y1="22" x2="22" y2="2" stroke-linecap="butt"></line> <polyline fill="none" stroke="currentColor" stroke-miterlimit="10" points="12,2 22,2 22,12 "></polyline></g></svg>';

export const Theme = {
  theme: ThemeOptions,
  styles: {
    // Styles for preview card
    cardOuter: (theme: typeof ThemeOptions, { hasClickEvent }: any) => ({
      cursor: hasClickEvent ? "pointer" : undefined,
      backgroundColor: "white",
      borderRadius: `${theme.defaultBorderRadius}px`,
      border: theme.borderStyle,
      margin: 15,
      width: `${theme.width}px`,
      fontSize: `${theme.fontSizePreview}px`,
      lineHeight: `${theme.lineSpacing}px`,
      ...theme.bodyFont,
      transition: "transform 0.1s ease-in-out",
      "&:active": {
        transform: "scale(.98)",
      },
    }),
    cardHeader: (theme: typeof ThemeOptions) => ({
      padding: theme.textBlockPadding,
      ...theme.titleFont,
    }),
    cardMediaWrapper: (theme: typeof ThemeOptions) => ({
      width: theme.width,
      height: theme.height,
      display: "flex",
      overflow: "hidden",
      position: "relative",
    }),
    cardItemInfo: (theme: typeof ThemeOptions) => ({
      padding: theme.textBlockPadding,
      borderTop: theme.borderStyle,
    }),
    cardAuctionPerpetual: (theme: typeof ThemeOptions) => ({
      ...pricingLayout(theme),
    }),
    cardAuctionReserveActive: (theme: typeof ThemeOptions) => ({
      background: "#000",
      color: "#fff",
      ...pricingLayout(theme),
    }),
    cardAuctionReservePending: (theme: typeof ThemeOptions) => ({
      background: "#e6e6e6",
      ...pricingLayout(theme),
    }),
    cardTitle: (theme: typeof ThemeOptions) => ({
      maxWidth: theme.width - 30,
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      ...theme.titleFont,
    }),

    // Styles for full-page view
    fullPage: (theme: typeof ThemeOptions) => ({
      ...theme.bodyFont,
    }),
    fullMediaWrapper: (_: typeof ThemeOptions) => ({
      overflow: "hidden",
      margin: "5%",
    }),
    fullItemInfo: (_: typeof ThemeOptions) => ({}),
    fullTitle: (_: typeof ThemeOptions) => ({
      fontSize: "30px",
      margin: "20px 0",
    }),
    fullDescription: (theme: typeof ThemeOptions) => ({
      fontSize: theme.fontSizeFull,
      margin: "10px 0",
    }),
    fullOwnerAddress: (theme: typeof ThemeOptions) => ({
      fontSize: theme.fontSizeFull,
      ...theme.titleFont,
    }),
    fullLabel: (theme: typeof ThemeOptions) => ({
      textTransform: "uppercase",
      fontSize: "14px",
      opacity: 0.5,
      ...theme.bodyFont,
    }),
    fullProofAuthenticitySection: (theme: typeof ThemeOptions) => ({
      border: theme.borderStyle,
      borderRadius: `${theme.defaultBorderRadius}px`,
      margin: "20px 20px 20px 0",
      position: "relative",
    }),
    fullAuthenticityLabel: (_: typeof ThemeOptions) => ({
      padding: "20px",
    }),
    fullProofLink: (theme: typeof ThemeOptions) => ({
      display: "block",
      textDecoration: "none",
      color: theme.linkColor,
      padding: "20px",
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

    // Generic styles
    button: (theme: typeof ThemeOptions, {primary}: any) => ({
      background: primary ? theme.buttonColor.primaryBackground : theme.buttonColor.background, 
      color: primary ? theme.buttonColor.primaryText : theme.buttonColor.text,
      borderRadius: `${theme.defaultBorderRadius}px`,
      padding: '11px',
      font: 'inherit',
      textDecoration: 'none',
      margin: '0',
      border: '0',
      cursor: 'pointer',
      display: 'inline-block',
      ...theme.bodyFont,
      transition: "transform 0.1s ease-in-out",
      "&:active": {
        transform: "scale(.98)",
      }, 
    }),
    textSubdued: (theme: typeof ThemeOptions) => ({
      opacity: "0.5",
      ...theme.bodyFont,
    }),
    pricingAmount: (theme: typeof ThemeOptions) => ({
      ...theme.titleFont,
    }),
    mediaLoader: (_: typeof ThemeOptions, { mediaLoaded }: any) => ({
      display: "flex",
      minHeight: "100%",
      minWidth: "100%",
      justifyContent: "center",
      alignItems: "center",
      opacity: mediaLoaded ? 0 : 1,
      transition: "0.1s ease-out opacity",
    }),
    mediaObject: (
      _: typeof ThemeOptions,
      { mediaLoaded, isFullPage }: any
    ) => ({
      opacity: mediaLoaded ? 1 : 0,
      transition: "0.2s ease-in opacity",
      minHeight: isFullPage ? undefined : "100%",
      maxHeight: isFullPage ? "70vh" : undefined,
      minWidth: isFullPage ? undefined : "100%",
      display: "block",
      margin: "0 auto",
      flexShrink: "1",
    }),
  },
};
