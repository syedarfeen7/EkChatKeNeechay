import {useSelector} from 'react-redux';
import {RootState} from '../app/store';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types/navigation';
import {useNavigation} from '@react-navigation/native';
import {useDataHelper} from './index';

type NavigationProp = StackNavigationProp<RootStackParamList>;

export const useNavigationHook = () => {
  const user = useSelector((state: RootState) => state.user.data);
  const navigation = useNavigation<NavigationProp>();
  const {isMerchant} = useDataHelper();

  const redirectToDashboard = () => {
    if (isMerchant()) {
      navigation.navigate('sp_dashboard', {
        type: 'reset',
      });
    } else {
      navigation.navigate('so_dashboard', {
        type: 'reset',
      });
    }
  };

  return {
    redirectToDashboard,
  };
};
