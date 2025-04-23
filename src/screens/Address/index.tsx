import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Alert, Platform, Linking} from 'react-native';
import MapView, {Marker, Region} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Config from 'react-native-config';

const MapScreen = () => {
  const [region, setRegion] = useState<Region>({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [searchText, setSearchText] = useState();

  useEffect(() => {
    const checkLocationPermission = async () => {
      const permission =
        Platform.OS === 'android'
          ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
          : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

      const status = await check(permission);
      if (status === RESULTS.GRANTED) {
        setHasLocationPermission(true);
      } else {
        requestLocationPermission();
      }
    };
    checkLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    const permission =
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

    const status = await request(permission);
    if (status === RESULTS.GRANTED) {
      setHasLocationPermission(true);
    } else {
      Alert.alert(
        'Permission Required',
        'Please enable location permissions in settings to use this feature',
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Open Settings', onPress: () => Linking.openSettings()},
        ],
      );
    }
  };

  // Optional: Center on user's location if permission granted
  /*
  useEffect(() => {
    if (hasLocationPermission) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setRegion({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        },
        error => console.error(error),
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  }, [hasLocationPermission]);
  */

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        fetchDetails={true}
        onPress={(data, details = null) => {
          if (details?.geometry?.location) {
            setRegion({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
          }
        }}
        query={{
          key: Config.GOOGLE_MAPS_API_KEY,
          language: 'en',
        }}
        styles={{
          container: styles.searchContainer,
          textInput: styles.searchInput,
          listView: styles.listView,
          description: styles.description,
          row: styles.row,
        }}
        textInputProps={{
          value: searchText, // <- make sure searchText is always a string
          onChangeText: setSearchText,
        }}
        enablePoweredByContainer={false}
      />

      <MapView
        style={styles.map}
        region={region}
        showsUserLocation={hasLocationPermission}
        showsMyLocationButton={hasLocationPermission}>
        <Marker coordinate={region} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchContainer: {
    position: 'absolute',
    width: '90%',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
    zIndex: 1,
    top: 10,
    alignSelf: 'center',
  },
  searchInput: {
    height: 38,
    color: '#5d5d5d',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  listView: {
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  description: {
    fontSize: 14,
    color: '#5d5d5d',
  },
  row: {
    padding: 12,
    height: 50,
  },
});

export default MapScreen;
