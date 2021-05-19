import {NFTFullPage} from '../nft-full/NFTFullPage';
import { Story, Meta } from '@storybook/react';

export default {
  title: 'Renderer/NFTFull',
  component: NFTFullPage,
} as Meta;

// @ts-ignore
const Template: Story<typeof NFTFullPage> = (args) => <NFTFullPage {...args} />;

export const Image = Template.bind({});
Image.args = {
  id: '3102',
};

export const Video = Template.bind({});
Video.args = {
  id: '2411',
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