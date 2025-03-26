import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import useStyles from './style';

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  description,
}) => {
  const {styles} = useStyles();
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>{price}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

export default PricingCard;
