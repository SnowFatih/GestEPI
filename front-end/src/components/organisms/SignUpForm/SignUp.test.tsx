import React from 'react';

import { AuthContext, initialContext } from '@/contexts/auth';
import { render, screen } from '@/utils/testUtils';

import { SignUpForm } from './SignUpForm';

describe('<SignUpForm />', () => {
  test('should display a blank login form', async () => {
    const { findByTestId } = render(<SignUpForm />);

    const loginForm = await findByTestId('login-form');

    expect(loginForm).toHaveFormValues({
      username: '',
      password: ''
    });
  });

  test('should display login error', async () => {
    render(
      <AuthContext.Provider
        value={{
          ...initialContext,
          user: null
        }}
      >
        <SignUpForm />
      </AuthContext.Provider>
    );

    const error = await screen.getByTestId('sign-up-form-error');
    expect(error).toHaveTextContent('error text');
  });
});
