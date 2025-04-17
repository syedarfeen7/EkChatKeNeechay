export type RootStackParamList = {
  Login: {
    countryCode: string;
    localeSettings: {
      currentLocale: string;
    };
  }; // No parameters expected for Login screen
  Register: undefined;
  SelectCountryCode: {
    title: string;
    onSubmit: (selectedCode: string) => void;
  };
  Verify: undefined;
};
export type AppNavigation = NativeStackNavigationProp<RootStackParamList>;
