import {Weekdays} from '../../controls/WeekDaysTimings';
import {FileType} from '../../types/file';

export interface FormValues {
  englishName: string;
  arabicName: string;
  englishDescription: string;
  arabicDescription: string;
  image: FileType | null;
  officePhone: string;
  mobilePhone: string;
  adminEmail: string;
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
