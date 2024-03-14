import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { HiX } from 'react-icons/hi';

import { Button } from './index';

export default {
  title: 'molecules/Button',
  component: Button
} as Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  render: () => (
    <div className="gap-5 flex flex-col">
      <Button color="primary" label="Primary Color" />
      <Button color="primary" label="With icon" icon={<HiX />} />
      <Button color="secondary" label="Secondary Color" />
      <Button color="neutral" label="Neutral Color" />
      <Button color="alert" label="Alert Color" />
    </div>
  )
};

export const Loading: Story = {
  args: {
    label: 'Label Text',
    loading: true
  }
};
export const Disabled: Story = {
  args: { label: 'Label Text', disabled: true }
};
