import { Meta } from '@storybook/react';
import React from 'react';

import { PublicLayout } from './PublicLayout';

export default {
  title: 'templates/PublicLayout',
  component: PublicLayout
} as Meta;

export const Base = (): JSX.Element => <PublicLayout title="Test" description="Lorem ipsum xxxx xxxx xxxx" />;
