import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import urlJoin from 'url-join';

import { useSignupMutation } from '@/api/hooks/useAuth';
import { thirdPartyAuthenticationBaseUrl } from '@/configs/config';

import { Typography } from '@/components/atoms/Typography';
import { PasswordInput } from '@/components/forms/base/PasswordInput';
import { TextInput } from '@/components/forms/base/TextInput';
import { Form } from '@/components/forms/core/Form';
import { Button } from '@/components/molecules/Button';

import { RegisterSchema, SignupSchemaType } from './schema';

export interface SignupFormProps {
  onSuccess?: () => void;
}

export const SignUpForm = ({ onSuccess }: SignupFormProps) => {
  const { t } = useTranslation();

  const signupMutation = useSignupMutation({
    onSuccess: onSuccess
  });

  const handleSubmit = (data: SignupSchemaType) => {
    signupMutation.mutate({
      email: data.email,
      password: data.password,
      firstname: data.firstname,
      lastname: data.lastname,
      companyName: data.companyName
    });
  };

  return (
    <div className="gap-8 flex flex-col">
      <Typography variant="h1">{t('authentication.newUser')}</Typography>
      <Form
        data-testid="register-form"
        schema={RegisterSchema}
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-96"
        render={({ formState }) => (
          <>
            <TextInput id="email" label={t('form.email')} type="email" />
            <PasswordInput id="password" label={t('form.password')} />
            <PasswordInput id="confirmPassword" label={t('form.confirmPassword')} />
            <div className="flex flex-row gap-4">
              <TextInput id="firstname" label={t('form.firstName')} />
              <TextInput id="lastname" label={t('form.lastName')} />
            </div>
            <TextInput id="companyName" label={t('form.companyName')} />

            <Button label={t('authentication.signup')} loading={signupMutation.isLoading} fullWidth disabled={!formState.isDirty} />
          </>
        )}
      />
      <span className="inline-flex justify-center">
        <Typography>{t('authentication.hasAccount')}</Typography>
        <Typography customColorClass="text-green-400">
          &nbsp;<Link to="/login">{t('authentication.login')}</Link>
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
