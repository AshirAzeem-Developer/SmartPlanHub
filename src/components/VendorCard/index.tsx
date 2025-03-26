import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

import {ImageSourcePropType} from 'react-native';
import useStyles from './style';

interface VendorCardProps {
  image: ImageSourcePropType;
  name: string;
  rating: number;
  onPress: () => void;
}

const VendorCard: React.FC<VendorCardProps> = ({
  image,
  name,
  rating,
  onPress,
}) => {
  const {styles, sizes} = useStyles();
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={image} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.rating}>⭐ {rating}</Text>
    </TouchableOpacity>
  );
};

export default VendorCard;
