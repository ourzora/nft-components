import React from 'react';
import {NFTPreview, NFTPreviewProps} from '../nft-preview/NFTPreview';
import { Story, Meta } from '@storybook/react';

export default {
  title: 'Renderer/NFTPreview',
  component: NFTPreview,
  argTypes: {
  },
} as Meta;

const Template: Story<NFTPreviewProps> = (args) => <NFTPreview {...args} />;

export const Image = Template.bind({});
Image.args = {
  id: '3102',
};

export const Video = Template.bind({});
Video.args = {
  id: '2733',
};

export const GIF = Template.bind({});
GIF.args = {
  id: '2671',
};

export const Audio = Template.bind({});
Audio.args = {
  id: '2563',
};

export const Text = Template.bind({});
Text.args = {
  id: '3079',
};
