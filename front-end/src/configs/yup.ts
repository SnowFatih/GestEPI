import * as yup from 'yup';

yup.addMethod<yup.StringSchema>(yup.string, 'emptyAsUndefined', function () {
  return this.transform((value) => value || undefined);
});

yup.addMethod<yup.StringSchema>(yup.string, 'emptyAsNull', function () {
  return this.transform((value) => value || null);
});

export default yup;
