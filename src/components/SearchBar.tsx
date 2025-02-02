import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {SearchBar} from '@rneui/base';

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
        placeholder="type here..."
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
        searchIcon={{size: 20}}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0',
    height: 100,
    justifyContent: 'center',
  },
  searchContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  focusedInput: {
    borderColor: '#05c3de',
    borderWidth: 1,
    borderBottomWidth: 1,
  },
});

export default SearchBarComponent;
