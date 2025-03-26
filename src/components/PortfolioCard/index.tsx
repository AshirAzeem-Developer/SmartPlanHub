import React from 'react';
import {View, Text, Image, StyleSheet, ImageSourcePropType} from 'react-native';
import useStyles from './style';

interface PortfolioCardProps {
  image: ImageSourcePropType;
  name: string;
  rating: number;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({image, name, rating}) => {
  const {styles} = useStyles();
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} resizeMode="cover" />
      <Text
        style={{
          textAlign: 'left',
          marginVertical: 10,
          width: '80%',
        }}
        numberOfLines={2}>
        {name}
      </Text>
      <Text
        style={{
          width: '30%',
          position: 'absolute',
          right: 10,
          top: 10,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          padding: 5,
          borderRadius: 5,
          textAlign: 'center',
          marginRight: 10,
        }}>
        ⭐ {rating}
      </Text>
    </View>
  );
};

export default PortfolioCard;
