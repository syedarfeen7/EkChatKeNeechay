import i18n from '../i18n';
import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  phone: Yup.string()
    .required(i18n.t('validations.phoneNumber'))
    .matches(/^[0-9]{9}$/, i18n.t('validations.phoneNumberInvalid')),
});
export const registerSchema = Yup.object().shape({
  firstName: Yup.string().required(i18n.t('validations.firstName')),
  lastName: Yup.string().required(i18n.t('validations.lastName')),
  email: Yup.string().email(),
  phone: Yup.string()
    .required(i18n.t('validations.phoneNumber'))
    .matches(/^[0-9]{9}$/, i18n.t('validations.phoneNumberInvalid')),
});
