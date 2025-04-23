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
};
export type AppNavigation = NativeStackNavigationProp<RootStackParamList>;
