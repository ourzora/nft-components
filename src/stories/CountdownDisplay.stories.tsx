import { Story, Meta } from "@storybook/react";

import {
  CountdownDisplay,
  CountdownDisplayProps,
} from "../components/CountdownDisplay";

export default {
  title: "Base/CountdownDisplay",
  component: CountdownDisplay,
  argTypes: {},
} as Meta;

const Template: Story<CountdownDisplayProps> = (args) => (
  <CountdownDisplay {...args} />
);

function toString(date: Date) {
  return Math.floor(date.getTime() / 1000).toString();
}

export const ToTime = Template.bind({});
const hours23 = new Date();
hours23.setHours(23);
ToTime.args = {
  to: Math.floor(hours23.getTime() / 1000).toString(),
};

export const FromTime = Template.bind({});
const hours2 = new Date();
hours2.setHours(2);
hours2.setMinutes(2);
hours2.setSeconds(0);
FromTime.args = {
  to: toString(hours23),
  from: toString(hours2),
};