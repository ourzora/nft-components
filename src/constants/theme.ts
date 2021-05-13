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

const SVG_PLAY_ARROW = '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M28 16C28 15.7 27.8 15.4 27.6 15.2L9.6 2.19998C9.3 1.99998 8.9 1.89998 8.5 2.09998C8.2 2.29998 8 2.59998 8 2.99998V29C8 29.4 8.2 29.7 8.5 29.9C8.7 30 8.8 30 9 30C9.2 30 9.4 29.9 9.6 29.8L27.6 16.8C27.8 16.6 28 16.3 28 16Z" fill="black"/> </svg>';

const SVG_PAUSE = '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M12 1H5C4.73478 1 4.48043 1.10536 4.29289 1.29289C4.10536 1.48043 4 1.73478 4 2V30C4 30.2652 4.10536 30.5196 4.29289 30.7071C4.48043 30.8946 4.73478 31 5 31H12C12.2652 31 12.5196 30.8946 12.7071 30.7071C12.8946 30.5196 13 30.2652 13 30V2C13 1.73478 12.8946 1.48043 12.7071 1.29289C12.5196 1.10536 12.2652 1 12 1Z" fill="black"/> <path d="M27 1H20C19.7348 1 19.4804 1.10536 19.2929 1.29289C19.1054 1.48043 19 1.73478 19 2V30C19 30.2652 19.1054 30.5196 19.2929 30.7071C19.4804 30.8946 19.7348 31 20 31H27C27.2652 31 27.5196 30.8946 27.7071 30.7071C27.8946 30.5196 28 30.2652 28 30V2C28 1.73478 27.8946 1.48043 27.7071 1.29289C27.5196 1.10536 27.2652 1 27 1Z" fill="black"/></svg>'

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
    mediaAudioButton: (
      _: typeof ThemeOptions,
      {playing}: any
    ) => ({
      padding: '30px',
      background: '#eee',
      border: 0,
      borderRadius: '200px',
      color: 'transparent',
      width: '30px',
      height: '30px',
      backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
        playing ? SVG_PAUSE : SVG_PLAY_ARROW
      )}")`,
      cursor: 'pointer',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      alignSelf: 'center',
      position: 'absolute',
      left: '50%',
      marginLeft: '-30px',
    })
  },
};
