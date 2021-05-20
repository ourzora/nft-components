export const ThemeOptions = {
  // Overall height and width for media
  previewCard: {
    width: '330px',
    height: '330px',
    background: "transparent",
  },

  // Text overview
  textBlockPadding: "10px 15px",
  borderStyle: "2px solid #e6e6e6",
  linkColor: "#000",

  // Font settings
  bodyFont: `
    font-family: Inter, Helvetica;
    font-weight: 400;
  `,

  titleFont: `
    font-family: Inter, Helvetica;
    font-weight: 500;
  `,

  headerFont: `
    font-family: Inter, Helvetica;
    font-weight: 500;
  `,

  mediaContentFont: {
    fontFamily: "Times New Roman",
  },

  buttonColor: {
    primaryBackground: "#333",
    primaryText: "#fff",
    background: "#eee",
    text: "#000",
  },

  defaultBorderRadius: 4,

  // Font size base for full view page
  fontSizeFull: 16,

  lineSpacing: 24,
};

export type ThemeOptionsType = typeof ThemeOptions;
