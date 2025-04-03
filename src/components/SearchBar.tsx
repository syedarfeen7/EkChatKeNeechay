import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {SearchBar} from '@rneui/base';
import Icon from 'react-native-vector-icons/Ionicons';

const IconComponent = Icon as unknown as React.FC<{
  name: string;
  size: number;
  style: object;
}>;

const SearchBarComponent = ({
  onSearch,
}: {
  onSearch: (query: string) => void;
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query); // Pass the query to parent component
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="search here..."
        onChangeText={handleSearch}
        value={searchQuery}
        lightTheme
        round
        autoCorrect={false}
        containerStyle={styles.searchContainer}
        inputContainerStyle={[
          styles.inputContainer,
          isFocused && styles.focusedInput,
        ]}
        searchIcon={false}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <IconComponent name="search" size={20} style={styles.searchIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: '#eb5d031a',
    height: 100,
    justifyContent: 'center',
    position: 'relative',
  },
  searchContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  inputContainer: {
    borderRadius: 30,
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 40,
  },
  focusedInput: {
    borderColor: '#ff801b0f',
    borderWidth: 1,
    borderBottomWidth: 1,
  },
  searchWrapper: {
    position: 'relative',
    width: '100%',
  },
  searchIcon: {
    position: 'absolute',
    right: 30,
    top: '50%',
    transform: [{translateY: -15}],
    backgroundColor: '#ff801bc7',
    width: 30,
    height: 30,
    lineHeight: 30,
    textAlign: 'center',
    borderRadius: 100,
    color: '#fff',
  },
});

export default SearchBarComponent;
