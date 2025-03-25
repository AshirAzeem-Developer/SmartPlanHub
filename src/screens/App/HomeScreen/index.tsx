import React from 'react';
import {View, ScrollView, Text, StyleSheet, FlatList} from 'react-native';
import SearchBar from '../../../components/SearchBar';
import FilterButtons from '../../../components/FilterButtons';
import VendorCard from '../../../components/VendorCard';
import BookingCard from '../../../components/BookingCard';
import images from '../../../assets/images';
import {screen} from '../../../utils/constants';
import useStyles from './style';

const vendors = [
  {
    id: '1',
    image: images.DUMMY_VENDOR,
    name: 'John’s Home Renovations',
    rating: 4.8,
  },
  {
    id: '2',
    image: images.DUMMY_VENDOR,
    name: 'Evergreen Landscaping',
    rating: 4.5,
  },
  {
    id: '3',
    image: images.DUMMY_VENDOR,
    name: 'TechFix IT Solutions',
    rating: 4.7,
  },
  {
    id: '4',
    image: images.DUMMY_VENDOR,
    name: 'Starlight Event Planners',
    rating: 4.3,
  },
];

const bookings = [
  {
    id: '1',
    service: 'Interior Painting',
    vendor: 'John’s Home Renovations',
    date: 'May 1, 2024',
    image: images.VENDOR,
  },
  {
    id: '2',
    service: 'Garden Makeover',
    vendor: 'Evergreen Landscaping',
    date: 'April 30, 2024',
    image: images.VENDOR,
  },
];

const HomeScreen = () => {
  const {styles} = useStyles();
  return (
    <ScrollView style={styles.container}>
      <SearchBar />
      <FilterButtons />

      <Text style={styles.heading}>Welcome</Text>

      <Text style={styles.subHeading}>Featured Vendors</Text>
      <FlatList
        data={vendors}
        renderItem={({item}) => (
          <VendorCard
            image={item.image}
            name={item.name}
            rating={item.rating}
          />
        )}
        keyExtractor={item => item.id}
        numColumns={2}
      />

      <Text style={styles.subHeading}>Recent Bookings</Text>
      <FlatList
        contentContainerStyle={{paddingBottom: screen.height * 0.15}}
        data={bookings}
        renderItem={({item}) => (
          <BookingCard
            service={item.service}
            vendor={item.vendor}
            date={item.date}
            image={item.image}
          />
        )}
        keyExtractor={item => item.id}
      />
    </ScrollView>
  );
};

export default HomeScreen;
