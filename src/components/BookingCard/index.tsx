import React from 'react';
import {View, Text, Image, StyleSheet, ImageSourcePropType} from 'react-native';
import useStyles from './style';

interface BookingCardProps {
  service: string;
  vendor: string;
  date: string;
  image: ImageSourcePropType;
}

const BookingCard: React.FC<BookingCardProps> = ({
  service,
  vendor,
  date,
  image,
}) => {
  const {styles, sizes, colors} = useStyles();
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      <View>
        <Text style={styles.service}>{service}</Text>
        <Text style={styles.vendor}>{vendor}</Text>
        <Text style={styles.date}>Booked on {date}</Text>
      </View>
    </View>
  );
};

export default BookingCard;
