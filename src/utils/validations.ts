import i18n from '../i18n';
import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  phone: Yup.string()
    .required(i18n.t('validations.phoneNumber'))
    .matches(/^[0-9]{10}$/, i18n.t('validations.phoneNumberInvalid')),
});
export const registerSchema = Yup.object().shape({
  firstName: Yup.string().required(i18n.t('validations.firstName')),
  lastName: Yup.string().required(i18n.t('validations.lastName')),
  email: Yup.string().email(),
  phoneNumber: Yup.string()
    .required(i18n.t('validations.phoneNumber'))
    .matches(/^[0-9]{10}$/, i18n.t('validations.phoneNumberInvalid')),
  termsAccepted: Yup.boolean()
    .oneOf([true], i18n.t('validations.terms'))
    .required(i18n.t('validations.terms')),
});
export const otpSchema = Yup.object().shape({
  otp1: Yup.string().required('Required').max(1, 'Only one digit'),
  otp2: Yup.string().required('Required').max(1, 'Only one digit'),
  otp3: Yup.string().required('Required').max(1, 'Only one digit'),
  otp4: Yup.string().required('Required').max(1, 'Only one digit'),
  otp5: Yup.string().required('Required').max(1, 'Only one digit'),
});
