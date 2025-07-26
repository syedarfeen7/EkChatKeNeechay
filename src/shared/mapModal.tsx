import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import MapView, {Marker, MapPressEvent, Region} from 'react-native-maps';

type SearchResult = {
  lat: string;
  lon: string;
  display_name: string;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  onLocationSelect: (
    address: string,
    coordinates?: {lat: number; lng: number},
  ) => void;
};

const MapModal: React.FC<Props> = ({visible, onClose, onLocationSelect}) => {
  const [marker, setMarker] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [region, setRegion] = useState<Region>({
    latitude: 24.8607,
    longitude: 67.0011,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });
  const [selectedAddress, setSelectedAddress] = useState('');

  const handleMapPress = (e: MapPressEvent) => {
    const {latitude, longitude} = e.nativeEvent.coordinate;
    setMarker({latitude, longitude});
    setSelectedAddress(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
    reverseGeocode(latitude, longitude);
  };

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
      );
      const result = await response.json();
      if (result.display_name) {
        setSelectedAddress(result.display_name);
      }
    } catch (error) {
      console.error('Reverse geocoding error:', error);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery,
        )}&addressdetails=1`,
      );
      const results = await response.json();
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectResult = (result: SearchResult) => {
    const latitude = parseFloat(result.lat);
    const longitude = parseFloat(result.lon);

    setMarker({latitude, longitude});
    setSelectedAddress(result.display_name);
    setRegion({
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
    setSearchQuery(result.display_name);
    setSearchResults([]);
  };

  const handleConfirm = () => {
    if (marker) {
      onLocationSelect(selectedAddress, {
        lat: marker.latitude,
        lng: marker.longitude,
      });
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for a location"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          {isSearching && <ActivityIndicator style={styles.loadingIndicator} />}
        </View>

        {searchResults.length > 0 && (
          <View style={styles.resultsContainer}>
            <FlatList
              data={searchResults}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.resultItem}
                  onPress={() => handleSelectResult(item)}>
                  <Text style={styles.resultText}>{item.display_name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}

        <MapView
          style={styles.map}
          region={region}
          onRegionChangeComplete={setRegion}
          onPress={handleMapPress}>
          {marker && <Marker coordinate={marker} />}
        </MapView>

        <View style={styles.addressContainer}>
          <Text style={styles.addressText} numberOfLines={2}>
            {selectedAddress || 'Tap on map or search for a location'}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onClose} style={styles.button}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleConfirm}
            style={[styles.button, !marker && styles.disabledButton]}
            disabled={!marker}>
            <Text style={styles.buttonText}>Select</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  searchContainer: {
    zIndex: 1,
    position: 'absolute',
    top: 80,
    width: '100%',
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    marginHorizontal: 20,
    backgroundColor: '#ffffff',
    paddingRight: 40,
  },
  loadingIndicator: {
    position: 'absolute',
    right: 30,
    top: 15,
  },
  resultsContainer: {
    position: 'absolute',
    top: 150,
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    maxHeight: 250,
    zIndex: 2,
    elevation: 3,
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  resultText: {
    fontSize: 14,
  },
  map: {
    flex: 1,
    marginTop: 10,
  },
  addressContainer: {
    padding: 10,
    backgroundColor: 'white',
  },
  addressText: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: 'white',
  },
  button: {
    padding: 15,
    backgroundColor: '#4286f4',
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MapModal;
