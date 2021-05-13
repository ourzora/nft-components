import React from 'react';
import {NFTFullPage} from '../nft-full/NFTFullPage';
import { Story, Meta } from '@storybook/react';

export default {
  title: 'Renderer/NFTFull',
  component: NFTFullPage,
  argTypes: {
  },
} as Meta;

const Template: Story<typeof NFTFullPage> = (args) => <NFTFullPage {...args} />;

export const Image = Template.bind({});
Image.args = {
  id: '332',
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