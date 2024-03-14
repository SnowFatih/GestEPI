import React from 'react';

import { AuthContext, initialContext } from '@/contexts/auth';
import { render, screen } from '@/utils/testUtils';

import { LoginForm } from './LoginForm';

describe('<LoginForm />', () => {
  test('should display a blank login form', async () => {
    const { findByTestId } = render(<LoginForm />);

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
        <LoginForm />
      </AuthContext.Provider>
    );

    const error = await screen.getByTestId('login-form-error');
    expect(error).toHaveTextContent('error text');
  });
});
