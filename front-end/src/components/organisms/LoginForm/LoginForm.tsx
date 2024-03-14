import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import urlJoin from 'url-join';

import { useLoginMutation } from '@/api/hooks/useAuth';
import { TokenResponse } from '@/api/lib/auth';
import { thirdPartyAuthenticationBaseUrl } from '@/configs/config';

import { Typography } from '@/components/atoms/Typography';
import { PasswordInput } from '@/components/forms/base/PasswordInput';
import { TextInput } from '@/components/forms/base/TextInput';
import { Form } from '@/components/forms/core/Form';
import { Button } from '@/components/molecules/Button';

import { LoginSchema, LoginSchemaType } from './schema';

export interface LoginFormProps {
  onSuccess?: (data: TokenResponse) => void;
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { t } = useTranslation();

  const loginMutation = useLoginMutation({
    onSuccess
  });

  const handleSubmit = (data: LoginSchemaType) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="gap-8 flex flex-col">
      <Typography variant="h1">{t('authentication.hasAccount')}</Typography>
      <Form
        data-testid="login-form"
        schema={LoginSchema}
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-96"
        render={({ formState }) => (
          <>
            <TextInput id="email" label={t('form.email')} />
            <PasswordInput id="password" label={t('form.password')} />

            <Button label={t('authentication.login')} loading={loginMutation.isLoading} fullWidth disabled={!formState.isDirty} />
          </>
        )}
      />
      <span className="inline-flex justify-center">
        <Typography>{t('authentication.newUser')}</Typography>
        <Typography customColorClass="text-green-400">
          &nbsp;<Link to="/signup">{t('authentication.createAccount')}</Link>
        </Typography>
      </span>

      <hr />

      <Button
        fullWidth
        color="secondary"
        label={t('authentication.connect', { plugin: 'google' })}
        onClick={() => window.open(urlJoin(thirdPartyAuthenticationBaseUrl, 'google'), '_blank', 'width=700,height=800')}
      />
    </div>
  );
};
