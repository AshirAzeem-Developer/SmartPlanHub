import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setIsLoggedIn} from '../../../store/reducer/user';
import SearchBar from '../../../components/SearchBar';
import VendorCard from '../../../components/VendorCard';
import BookingCard from '../../../components/BookingCard';
import FilterDropdownButton from '../../../components/FilterButtons';
import CustomBidCard from '../../../components/CustomBidCard';
import GenericModal from '../../../components/Modal';
import CustomRequestModal from '../../../components/CustomServiceRequest';
import api from '../../../utils/api';
import apiEndPoints from '../../../constants/apiEndPoints';
import images from '../../../assets/images';
import icons from '../../../assets/icons';
import {screen} from '../../../utils/constants';
import useStyles from './style';

interface Vendor {
  _id: string;
  vendor: string;
  title: string;
  rate: number;
  description: string;
  availability: {
    day: string;
    startTime: string;
    endTime: string;
    _id: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

interface Booking {
  id: string;
  service: string;
  vendor: string;
  date: string;
  image: any;
}

interface HomeScreenProps {
  navigation: NavigationProp<any>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('');
  const [selectedRating, setSelectedRating] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [featuredVendors, setFeaturedVendors] = useState<Vendor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const {styles} = useStyles();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const res = await api.get(apiEndPoints.LOGOUT);
      console.log('Logout Response:', res.data);
      if (res.data.status === 'success') {
        dispatch(setIsLoggedIn(false));
      } else {
        console.log('Logout Failed:', res.data.message);
      }
    } catch (error) {
      console.log('Logout Error:', error);
    }
  };

  const GetFeaturedVendors = async () => {
    try {
      const response = await api.get(apiEndPoints.GET_ALL_VENDOR_SERVICES);
      setFeaturedVendors(response.data.services || []);
      console.log('This is the featured vendors', response.data.services);
    } catch (error) {
      console.error('Error fetching featured vendors:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const BASE_URL = 'http://192.168.0.102:3000';
  useEffect(() => {
    GetFeaturedVendors();
  }, []);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  const bookings: Booking[] = [
    {
      id: '1',
      service: 'Stage Decoration',
      vendor: 'Ali Decor & Events',
      date: 'May 1, 2024',
      image: images.Ali_Decor,
    },
    {
      id: '2',
      service: 'Catering Services',
      vendor: 'GreenLeaf Caterers',
      date: 'April 30, 2024',
      image: images.GreenLeaf,
    },
  ];

  return (
    <>
      <TouchableOpacity
        style={{
          marginTop: screen.height * 0.005,
        }}
        onPress={handleLogout}>
        <Image
          source={icons.LOGOUT}
          style={{
            width: 24,
            height: 24,
            marginLeft: screen.width * 0.05,
            marginTop: screen.height * 0.04,
            tintColor: '#000',
          }}
        />
      </TouchableOpacity>
      <ScrollView style={styles.container}>
        <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 10}}>
          <FilterDropdownButton
            label="Service Type"
            selectedValue={selectedService}
            options={[
              'Birthday Party',
              'Wedding',
              'Corporate Event',
              'Baby Shower',
              'Anniversary',
            ]}
            onSelect={(value: string) => setSelectedService(value)}
          />
          <FilterDropdownButton
            label="Location"
            selectedValue={selectedLocation}
            options={['Karachi', 'Lahore', 'Islamabad']}
            onSelect={(value: string) => setSelectedLocation(value)}
          />
          <FilterDropdownButton
            label="Price Range"
            selectedValue={selectedPriceRange}
            options={[
              '₨0 - ₨1000',
              '₨1001 - ₨2000',
              '₨2001 - ₨3000',
              '₨3001 - ₨5000',
              '₨5001+',
            ]}
            onSelect={(value: string) => setSelectedPriceRange(value)}
          />
          <FilterDropdownButton
            label="Rating"
            selectedValue={selectedRating}
            options={['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars']}
            onSelect={(value: string) => setSelectedRating(value)}
          />
        </View>

        <Text style={styles.heading}>Welcome</Text>
        <CustomBidCard
          type="Custom Bid"
          price="Start Bid"
          delivery=""
          isNegotiable={true}
          onPress={() => setIsModalVisible(true)}
        />

        <Text style={styles.subHeading}>Featured Vendors</Text>
        <FlatList
          data={featuredVendors}
          renderItem={({item}: any) => (
            <VendorCard
              onPress={() =>
                navigation.navigate('VendorProfile', {
                  vendorId: item.vendor,
                  vendorName: item.title,
                })
              }
              image={
                item?.gallery?.length > 0
                  ? {uri: `${BASE_URL}${item?.gallery[0].url}`}
                  : images.DUMMY_VENDOR
              }
              name={item?.title}
              rating={4.5} // Assuming a default rating
            />
          )}
          keyExtractor={item => item._id}
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
      <GenericModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}>
        <CustomRequestModal onClose={() => setIsModalVisible(false)} />
      </GenericModal>
    </>
  );
};

export default HomeScreen;
