import {Weekdays} from '../controls/WeekDaysTimings';

export type RootStackParamList = {
  Login: {
    countryCode: string;
    localeSettings: {
      currentLocale: string;
    };
  };
  RegisterProvider: undefined;
  SelectCountryCode: {
    title: string;
    onSubmit: (selectedCode: string) => void;
  };
  Verify: {
    phoneNumber: string;
  };
  CreateAddress: {
    addressText?: string;
    addressCoords?: {
      latitude: number;
      longitude: number;
    };
    onDone: (mapData: {
      address: string;
      latitude: number;
      longitude: number;
      label?: string;
    }) => void;
    isReadonly?: boolean;
    searchPlaceHolderText?: string;
  };
  ShopTimings: {
    weekdays: Weekdays;
    onSet: (updatedWeekdays: Weekdays) => void;
  };
  dashboard: undefined;
  sp_dashboard: {
    type: string;
  };
  so_dashboard: {
    type: string;
  };
  VideoPlayer: {
    lockOrientation: () => void;
    source: number;
    onBack: () => void;
  };
};

export type AppNavigation = NativeStackNavigationProp<RootStackParamList>;
