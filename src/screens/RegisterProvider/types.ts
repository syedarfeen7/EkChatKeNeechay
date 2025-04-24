import {Weekdays} from '../../controls/WeekDaysTimings';

export interface FormValues {
  englishName: string;
  arabicName: string;
  englishDescription: string;
  arabicDescription: string;
  image: string;
  officePhone: string;
  mobilePhone: string;
  adminEmail: string;
  officeAddress: string;
  headOfficeAddress: string;
  weekdays: Weekdays;
  paymentMethods: string[];
  legalAgreement: {
    name: string;
    uri: string;
    type: string;
    size: number;
  } | null;
  businessAgreement: {
    name: string;
    uri: string;
    type: string;
    size: number;
  } | null;
  iqama: {
    name: string;
    uri: string;
    type: string;
    size: number;
  } | null;
}
