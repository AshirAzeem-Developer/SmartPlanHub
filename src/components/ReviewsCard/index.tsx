import React from 'react';
import {View, Text, Image, StyleSheet, ImageSourcePropType} from 'react-native';
import useStyles from './style';

interface ReviewCardProps {
  id: string;
  reviewer: string;
  review: string;
  date: string;
  image: ImageSourcePropType;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  id,
  review,
  reviewer,
  date,
  image,
}) => {
  const {styles} = useStyles();
  return (
    <View style={styles.card} key={id}>
      <Image source={image} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.comment}>{review}</Text>
        <Text style={styles.reviewer}>- {reviewer}</Text>
        <Text style={styles.date}>Booked on {date}</Text>
      </View>
    </View>
  );
};

export default ReviewCard;
