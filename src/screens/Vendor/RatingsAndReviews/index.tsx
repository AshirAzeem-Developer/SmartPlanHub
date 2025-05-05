import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import useStyles from './style';
import icons from '../../../assets/icons';
import CustomHeader from '../../../components/CustomHeader/CustomHeader';
import {screen} from '../../../utils/constants';
import api from '../../../utils/api';
import apiEndPoints from '../../../constants/apiEndPoints';
import {useSelector} from 'react-redux';
import {selectUserId} from '../../../store/reducer/user';

const RatingsAndReviewsScreen = () => {
  const {styles} = useStyles();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [totalReviews, setTotalReviews] = useState<number>(0);
  const [responseRate, setResponseRate] = useState<number | null>(null);

  const vendorId = useSelector(selectUserId); // Replace this dynamically as needed
  const truncateUserId = (id: string) => {
    if (id.length <= 15) return id;
    return `${id.substring(0, 6)}...${id.substring(id.length - 4)}`;
  };
  const calculateResponseRate = (reviewsData: any[]) => {
    const respondedCount = reviewsData.filter(
      r => r.response && r.response.trim() !== '',
    ).length;
    const rate = Math.round((respondedCount / reviewsData.length) * 100);
    setResponseRate(rate || 0);
  };

  const fetchReviews = async () => {
    try {
      const response = await api.get(
        apiEndPoints.GET_ALL_REVIEWS_OF_VENDOR(vendorId),
      );
      const apiReviews = response.data.data.reviews;
      setReviews(apiReviews);
      calculateResponseRate(apiReviews); // if you're calculating locally
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAverageRating = async () => {
    try {
      const response = await api.get(
        apiEndPoints.GET_AVERAGE_RATING_OF_VENDOR(vendorId),
      );
      if (response.data?.averageRating !== undefined) {
        setAverageRating(response.data.averageRating);
        setTotalReviews(response.data.totalReviews || 0);
      }
    } catch (error) {
      console.error('Error fetching average rating:', error);
    }
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Image
        key={i}
        source={icons.STAR}
        style={{
          width: 20,
          height: 20,
          marginRight: 5,
          tintColor: i < rating ? '#FFD700' : '#E0E0E0',
        }}
      />
    ));
  };

  useEffect(() => {
    fetchReviews();
    fetchAverageRating();
  }, []);

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
        <View style={styles.overallRatingCard}>
          <Text style={styles.overallRatingLabel}>Overall Rating</Text>
          <View style={styles.overallRatingRow}>
            {renderStars(averageRating || 0)}
            <Text style={styles.overallRatingValue}>
              {averageRating !== null ? `${averageRating}/5` : 'N/A'}
            </Text>
          </View>
          <Text style={styles.overallRatingCount}>
            {totalReviews} review{totalReviews === 1 ? '' : 's'}
          </Text>
        </View>

        <View style={styles.metricsContainer}>
          <View style={styles.metricBox}>
            <Text style={styles.metricValue}>
              {averageRating !== null ? `${averageRating}/5.0` : 'N/A'}
            </Text>
            <Text style={styles.metricLabel}>
              Based on {totalReviews} reviews
            </Text>
          </View>
          <View style={styles.metricBox}>
            <Text style={[styles.metricValue, {color: '#4CAF50'}]}>
              {responseRate !== null ? `${responseRate}%` : '...'}
            </Text>
            <Text style={styles.metricLabel}>Review responses</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Recent Reviews</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : reviews.length === 0 ? (
          <Text style={styles.reviewText}>No reviews found.</Text>
        ) : (
          reviews.map((review: any, index: number) => (
            <View key={index} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewerName}>
                  User ID: {truncateUserId(review.user)}
                </Text>
                <View style={styles.starsRow}>
                  {renderStars(review.rating)}
                </View>
              </View>
              <Text style={styles.reviewText}>
                {review.response || 'No comment provided.'}
              </Text>
              <Text style={styles.reviewTime}>
                {new Date(review.createdAt).toDateString()}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </>
  );
};

export default RatingsAndReviewsScreen;
