import i18n from '../i18n';
import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  phone: Yup.string()
    .required(i18n.t('validations.phoneNumber'))
    .matches(/^[0-9]{9}$/, i18n.t('validations.phoneNumberInvalid')),
});
