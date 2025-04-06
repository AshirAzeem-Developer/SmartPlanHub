import React from 'react';
import {View, TextInput, StyleSheet, Image} from 'react-native';
import icons from '../../assets/icons';

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search by service, location..."
        style={styles.input}
      />
      <Image source={icons.SEARCH_ICON} style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 15,
  },
  input: {flex: 1, padding: 15},
  icon: {
    marginLeft: 5,
    width: 20,
    height: 20,
  },
});

export default SearchBar;
