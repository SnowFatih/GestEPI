import * as yup from 'yup';

export const RegisterSchema = yup.object({
  email: yup.string().trim().required(),
  password: yup.string().trim().required(),
  confirmPassword: yup
    .string()
    .trim()
    .required()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
  firstname: yup.string().trim().required(),
  lastname: yup.string().trim().required(),
  companyName: yup.string().trim().required()
});

export type SignupSchemaType = yup.InferType<typeof RegisterSchema>;
