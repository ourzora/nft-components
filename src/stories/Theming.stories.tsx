import React from "react";
import { NFTPreview, NFTPreviewProps } from "../nft-preview/NFTPreview";
import { Story, Meta } from "@storybook/react";

import { merge } from "merge-anything";
import { Theme } from "../constants/theme";
import { MediaConfiguration } from "../context/MediaContext";
import { NFTFullPage } from "../nft-full/NFTFullPage";

type ThemeProps = {
  style: Partial<typeof Theme>;
  showFull: boolean;
  id: string;
};

const DemoComponent = ({ id, style, showFull }: ThemeProps) => (
  <MediaConfiguration style={style}>
    {showFull ? <NFTFullPage id={id} /> : <NFTPreview id={id} />}
  </MediaConfiguration>
);

export default {
  title: "Theming/PreviewComponent",
  component: DemoComponent,
  argTypes: {},
} as Meta;

const Template: Story<ThemeProps> = DemoComponent;

const { theme: themeDefault } = Theme;

export const PreviewCard = Template.bind({});
PreviewCard.args = {
  id: "3102",
  style: {
    theme: merge(themeDefault, {
      bodyFont: {
        fontFamily: "courier new",
        fontWeight: 500,
      },
      titleFont: {
        fontFamily: "courier new",
        fontWeight: 500,
      },
    }),
  },
};

export const FullPage = Template.bind({});
FullPage.args = {
  id: "3112",
  showFull: true,
  style: {
    theme: merge(themeDefault, {
      bodyFont: {
        fontFamily: "courier new",
        fontWeight: 500,
      },
      titleFont: {
        fontFamily: "courier new",
        fontWeight: 500,
      },
    }),
  },
};