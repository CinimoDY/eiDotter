import React from 'react';
import { Typography } from '../components/Typography/components/Typography';

export default {
  title: 'Figma Components/Typography',
  component: Typography,
};

const Template = (args) => <Typography {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Sample Typography',
}; 