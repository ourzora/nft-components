import {css} from '@emotion/css';

export const DarkTheme = {
  theme: {
    previewCard: {
      background:
        "linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 100%), #696969",
    },
    titleFont: {
      color: "#fff",
      fontWeight: 400,
      fontSize: '14px',
    },
    bodyFont: {
      color: "#fff",
      fontWeight: 300,
      fontSize: '14px',
    },

    borderStyle: "0",
    lineSpacing: 28,
  },
  styles: {
    cardItemInfo: () => (css`
      background: red; 
      padding: 20px;
    `)
  }
};
