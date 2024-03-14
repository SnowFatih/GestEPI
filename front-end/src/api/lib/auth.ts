import axios from 'axios';

export type TokenResponse = {
  token: string;
};

export type LoginParams = {
  email: string;
  password: string;
};

export const loginRequest = async ({ email, password }: LoginParams): Promise<TokenResponse> => {
  const { data } = await axios.post('/authenticate/login', {
    email,
    password
  });
  return data;
};

export type SignupParams = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  companyName?: string;
};

export const signupRequest = async ({ email, firstname, lastname, password, companyName }: SignupParams): Promise<void> => {
  await axios.post('/authenticate/signup/request', {
    email,
    password,
    firstname,
    lastname,
    companyName
  });
};

export type SignupValidationParams = {
  token: string;
};

export const signupValidationRequest = async ({ token }: SignupValidationParams): Promise<TokenResponse> => {
  const { data } = await axios.post('/authenticate/signup/validation', {
    token
  });
  return data;
};
