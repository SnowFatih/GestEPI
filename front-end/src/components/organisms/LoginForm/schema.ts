import * as yup from 'yup';

export const LoginSchema = yup.object({
  email: yup.string().trim().required(),
  password: yup.string().trim().required()
});

export type LoginSchemaType = yup.InferType<typeof LoginSchema>;
