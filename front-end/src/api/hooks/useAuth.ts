import { useMutation, useQueryClient } from 'react-query';

import { LoginParams, loginRequest, SignupParams, signupRequest, SignupValidationParams, signupValidationRequest, TokenResponse } from '../lib/auth';
import { ErrorResponse } from '../lib/types';

export const useLoginMutation = ({ onSuccess }: { onSuccess?: (response: TokenResponse, params: LoginParams) => void }) => {
  const queryClient = useQueryClient();
  return useMutation<TokenResponse, ErrorResponse, LoginParams>(loginRequest, {
    onSuccess: (data, params) => {
      queryClient.removeQueries();
      if (onSuccess) {
        onSuccess(data, params);
      }
    }
  });
};

export const useSignupMutation = ({ onSuccess }: { onSuccess?: (response: void, params: SignupParams) => void }) => {
  const queryClient = useQueryClient();
  return useMutation<void, ErrorResponse, SignupParams>(signupRequest, {
    onSuccess: (data, params) => {
      queryClient.removeQueries();
      if (onSuccess) {
        onSuccess(data, params);
      }
    }
  });
};

export const useSignupValidationMutation = ({ onSuccess }: { onSuccess?: (response: TokenResponse, params: SignupValidationParams) => void }) => {
  const queryClient = useQueryClient();
  return useMutation<TokenResponse, ErrorResponse, SignupValidationParams>(signupValidationRequest, {
    onSuccess: (data, params) => {
      queryClient.removeQueries();
      if (onSuccess) {
        onSuccess(data, params);
      }
    }
  });
};
