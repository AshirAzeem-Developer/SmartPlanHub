import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import useStyles from './style';

const FilterButtons = () => {
  const {styles, sizes, colors} = useStyles();
  return (
    <ScrollView
      horizontal
      contentContainerStyle={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: sizes.HEIGHT * 0.02,
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
      showsHorizontalScrollIndicator={false}>
      <TouchableOpacity style={styles.button}>
        <Text>Best Match</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text>Price: Low to High</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text>Service Type</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text>Location</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text>Price Range</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text>Rating</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default FilterButtons;
