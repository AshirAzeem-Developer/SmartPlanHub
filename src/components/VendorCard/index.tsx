import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

import {ImageSourcePropType} from 'react-native';
import useStyles from './style';

interface VendorCardProps {
  image: ImageSourcePropType;
  name: string;
  rating: number;
}

const VendorCard: React.FC<VendorCardProps> = ({image, name, rating}) => {
  const {styles, sizes} = useStyles();
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.rating}>⭐ {rating}</Text>
    </View>
  );
};

export default VendorCard;
