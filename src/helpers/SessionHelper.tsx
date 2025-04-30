import {User} from '../features/user/userTypes';
import {CryptoHelper} from './index';

class SessionHelper {
  _accessToken;
  _userCacheObject;
  getAccessToken = (user: User) => {
    if (this._accessToken) {
      return this._accessToken;
    }

    if (user && user?.accessToken) {
      try {
        this._accessToken = CryptoHelper.decryptString(user?.accessToken);
        return this._accessToken;
      } catch (error) {
        // NotificationsHelper.topicUnsubscribe();
        // NotificationsHelper.setBadgeCount(0);
        // DataHelper.getStore().dispatch(logout());
        // BackgroundLocationHelper.unMount();
        // CalendarEventsHelper.removeAllEvents();
        // this.clearUserDataOnLogout();
        return undefined;
      }
    }

    return undefined;
  };

  isUserAuthenticated = (user: User) => {
    if (this.getAccessToken(user)) {
      return true;
    }

    return false;
  };
}
export default new SessionHelper();
