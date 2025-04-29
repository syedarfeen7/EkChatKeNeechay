import {Weekdays} from '../../controls/WeekDaysTimings';
import {FileType} from '../../types/file';

export interface AuthState {
  isFetching: boolean;
  failure: boolean;
  errorMessage: string;
  isAuthenticated: boolean;
  response: object;
}

export interface LoginPayload {
  phoneNumber: string;
  userType: string;
}

export interface OTPVerification {
  username: string;
  password: string;
  userType: string;
}

export interface RegisterProvider {
  englishName: string;
  arabicName: string;
  englishDescription: string;
  arabicDescription: string;
  logo: string;
  officePhone?: string;
  mobilePhone?: string;
  adminEmail: string;
  headOfficeAddress: string;
  weekdays: Weekdays;
  paymentMethods: string[];
  documents: {
    legalAgreementDoc: FileType | null;
    businessAgreementDoc: FileType | null;
    iqamaDoc: FileType | null;
  };
  location?: number[];
  isMerchantApp: boolean;
}
