import React from 'react';
import {NFTPreview, NFTPreviewProps} from '../nft-preview/NFTPreview';
import { Story, Meta } from '@storybook/react';

export default {
  title: 'Example/NFTPreview',
  component: NFTPreview,
  argTypes: {
  },
} as Meta;

const Template: Story<NFTPreviewProps> = (args) => <NFTPreview {...args} />;

export const Image = Template.bind({});
Image.args = {
  id: '3663',
};

export const Video = Template.bind({});
Video.args = {
  id: '2662',
};

export const Large = Template.bind({});
Large.args = {
  id: '2671',
};
