import { merge } from "merge-anything";
import { Style } from "../style";

export const DarkTheme = merge(Style, {
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
  style: {
      
  }
}) as any;
