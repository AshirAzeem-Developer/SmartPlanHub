import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import useStyles from './style';
import icons from '../../../assets/icons';
import CustomHeader from '../../../components/CustomHeader/CustomHeader';
import {screen} from '../../../utils/constants';

const RatingsAndReviewsScreen = () => {
  const {styles} = useStyles();
  const reviews = [
    {
      name: 'Ayesha Khan',
      rating: 5,
      comment:
        'Bohat zabardast photography thi! Hamari shaadi ke pal khoobsurti se capture kiye.',
      time: '2 days ago',
    },
    {
      name: 'Usman Raza',
      rating: 4,
      comment: 'Corporate event ki coverage bohat professional aur timely thi.',
      time: '1 Week Ago',
    },
    {
      name: 'Hina Fatima',
      rating: 5,
      comment: 'Portrait shoot ne meri expectations se zyada achha kaam kiya!',
      time: '2 weeks ago',
    },
  ];

  return (
    <>
      <CustomHeader showMenu />
      <View style={styles.header}>
        <Text style={styles.heading}>Ratings & Reviews</Text>
        <Text style={styles.subHeading}>Customer Feedback</Text>
        <Text style={styles.description}>Manage your reviews and ratings</Text>
      </View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingBottom: screen.height * 0.1,
        }}>
        <TouchableOpacity style={styles.overallRatingBtn}>
          <Image
            source={icons.STAR}
            style={{
              width: 20,
              height: 20,
              marginRight: 10,
              tintColor: '#fff',
            }}
          />
          <Text style={styles.overallRatingText}>Overall Rating</Text>
        </TouchableOpacity>

        <View style={styles.metricsContainer}>
          <View style={styles.metricBox}>
            <Text style={styles.metricValue}>4.8/5.0</Text>
            <Text style={styles.metricLabel}>Based on 156 reviews</Text>
          </View>
          <View style={styles.metricBox}>
            <Text style={[styles.metricValue, {color: '#4CAF50'}]}>92%</Text>
            <Text style={styles.metricLabel}>Review responses</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Recent Reviews</Text>

        {reviews.map((review, index) => (
          <View key={index} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewerName}>{review.name}</Text>
              <View style={styles.starsRow}>
                {[...Array(5)].map((_, i) => (
                  <Image
                    key={i}
                    source={icons.STAR}
                    style={{
                      width: 20,
                      height: 20,
                      marginRight: 5,
                      tintColor: i < review.rating ? '#FFD700' : '#E0E0E0',
                    }}
                  />
                ))}
              </View>
            </View>
            <Text style={styles.reviewText}>{review.comment}</Text>
            <Text style={styles.reviewTime}>{review.time}</Text>
          </View>
        ))}
      </ScrollView>
    </>
  );
};

export default RatingsAndReviewsScreen;
