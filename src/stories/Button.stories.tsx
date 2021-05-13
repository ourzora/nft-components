import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Button, ButtonProps } from '../components/Button';

export default {
  title: 'Base/Button',
  component: Button,
  argTypes: {
  },
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const PrimaryLink = Template.bind({});
PrimaryLink.args = {
  primary: true,
  href: 'http://ourzora.co',
  children: 'Go to Zora',
};

export const PrimaryButton = Template.bind({});
PrimaryButton.args = {
  primary: true,
  onClick: () => {alert('Clicked')},
  children: 'Click me',
};

export const Secondary = Template.bind({});
Secondary.args = {
  primary: false,
  onClick: () => {alert('Clicked')},
  children: 'More info',
};
