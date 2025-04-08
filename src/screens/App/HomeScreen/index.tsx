import React from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import SearchBar from '../../../components/SearchBar';
import FilterButtons from '../../../components/FilterButtons';
import VendorCard from '../../../components/VendorCard';
import BookingCard from '../../../components/BookingCard';
import images from '../../../assets/images';
import {screen} from '../../../utils/constants';
import useStyles from './style';
import {NavigationProp} from '@react-navigation/native';
import icons from '../../../assets/icons';
import {setIsLoggedIn} from '../../../store/reducer/user';
import {useDispatch} from 'react-redux';

const vendors = [
  {
    id: '1',
    image: images.DUMMY_VENDOR,
    name: 'John’s Home Renovations',
    rating: 4.8,
    onPress: () => {},
  },
  {
    id: '2',
    image: images.DUMMY_VENDOR,
    name: 'Evergreen Landscaping',
    rating: 4.5,
    onPress: () => {},
  },
  {
    id: '3',
    image: images.DUMMY_VENDOR,
    name: 'TechFix IT Solutions',
    rating: 4.7,
    onPress: () => {},
  },
  {
    id: '4',
    image: images.DUMMY_VENDOR,
    name: 'Starlight Event Planners',
    rating: 4.3,
    onPress: () => {},
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

interface HomeScreenProps {
  navigation: NavigationProp<any>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const {styles} = useStyles();
  const dispatch = useDispatch();
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          dispatch(setIsLoggedIn(false));
        }}>
        <Image
          source={icons.LOGOUT}
          style={{
            width: 24,
            height: 24,
            marginLeft: screen.width * 0.05,
            marginTop: screen.height * 0.05,
            tintColor: '#000',
          }}
        />
      </TouchableOpacity>
      <ScrollView style={styles.container}>
        <SearchBar />
        <FilterButtons />

        <Text style={styles.heading}>Welcome</Text>

        <Text style={styles.subHeading}>Featured Vendors</Text>
        <FlatList
          data={vendors}
          renderItem={({item}) => (
            <VendorCard
              onPress={() => {
                navigation.navigate('VendorProfile');
              }}
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
    </>
  );
};

export default HomeScreen;
