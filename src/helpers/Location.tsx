let location = {
  latitude: 21.5,
  longitude: 39.17,
  latitudeDelta: 0.015,
  longitudeDelta: 0.0121,
};

class LocaltionHelper {
  getLocation() {
    return location;
  }
}

export default new LocaltionHelper();
