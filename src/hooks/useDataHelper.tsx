import {useSelector} from 'react-redux';
import {RootState} from '../app/store';

export const useDataHelper = () => {
  const user = useSelector((state: RootState) => state.user.data);

  const isMerchant = () => {
    if (user && user?.isDefaultOperator) {
      return true;
    }

    return false;
  };
  const getUserName = (currentLocale: string) => {
    if (currentLocale === 'en') {
      return user && user.fullName !== 'N/A' ? user.fullName : '';
    } else {
      if (
        user?.arabicName &&
        user.arabicName.length > 0 &&
        user.arabicName !== 'N/A'
      ) {
        return user.arabicName;
      } else {
        return user?.fullName &&
          user.fullName.length > 0 &&
          user.fullName !== 'N/A'
          ? user.fullName
          : '';
      }
    }
  };

  const getUser = () => {
    return user;
  };
  return {
    isMerchant,
    getUserName,
    getUser,
  };
};
