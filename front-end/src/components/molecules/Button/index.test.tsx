import React from 'react';

import { render, screen } from '@/utils/testUtils';

import { Button } from './Button';

describe('<Button />', () => {
  test('should display a button with label', async () => {
    render(<Button label="label" />);
    const component = await screen.getByRole('button');

    expect(component).toHaveTextContent('label');
  });

  test('should display a button with spinner', async () => {
    render(<Button label="label" loading />);
    await screen.getByTestId('spinner');
  });
});
