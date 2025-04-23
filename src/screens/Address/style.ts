import {Platform, StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.rowColor,
    marginHorizontal: Metrics.ratio(19),
    marginTop: Metrics.ratio(24),
    borderRadius: Metrics.ratio(5),
    elevation: 2,
    height: Metrics.ratio(200),
  },
  bg: {
    backgroundColor: Colors.primary,
  },
  title: {
    position: 'absolute',
    top: 10,
    left: 20,
    zIndex: 10,
    fontSize: 16,
    fontWeight: '600',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    elevation: 3,
  },
  map: {
    flex: 1,
    height: 100,
  },
  centerPinWrapper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -12,
    marginTop: -24,
  },
  pinIcon: {
    width: 24,
    height: 36,
    resizeMode: 'contain',
  },
  autocompleteWrapper: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 40,
    left: 10,
    right: 10,
    zIndex: 5,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 14,
  },
  recenterButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 25,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  recenterText: {
    fontSize: 20,
    color: '#000',
  },
});
export default styles;
