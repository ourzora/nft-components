import React from 'react';
import {NFTFullPage} from '../nft-full/NFTFullPage';
import { Story, Meta } from '@storybook/react';

export default {
  title: 'Example/NFTFull',
  component: NFTFullPage,
  argTypes: {
  },
} as Meta;

const Template: Story<typeof NFTFullPage> = (args) => <NFTFullPage {...args} />;

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
